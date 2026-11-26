// lib/nominatim.js — SERVER ONLY.
//
// Address suggestions from OpenStreetMap's public Nominatim service. The
// browser calls /api/address/suggest, which calls this, so we can follow
// the Nominatim usage policy (operations.osmfoundation.org/policies/nominatim):
//  - an absolute maximum of 1 request per second for the whole site, so
//    calls are paced below (per server instance);
//  - a User-Agent identifying the site (stock library ones get blocked);
//  - cache results on our side, so a repeated query costs nothing;
//  - show "© OpenStreetMap contributors" (components/AddressCredit.jsx).
// Suggestions are South Australian addresses only (searched inside SA's
// bounding box, then filtered by state). Customers elsewhere can still type
// their address by hand.
// Nominatim can block or withdraw access at any time; the calculator then
// lets the customer type the address by hand.

import { formatNominatimAddress, suburbOf } from "./formatAddress.js";

const SEARCH_URL = "https://nominatim.openstreetmap.org/search";
const USER_AGENT = "AdelaideRoofers/1.0 (+https://adelaideroofers.com.au)";
const TIMEOUT_MS = 4000;
const MIN_GAP_MS = 1000;
// South Australia's borders: 129°E to 141°E, 26°S to the coast (~38.1°S).
const SA_VIEWBOX = "129,-25.99,141,-38.1";
export const MAX_QUERY_LENGTH = 120;

export class LookupUnavailable extends Error {
  constructor(reason) {
    super(reason);
    this.reason = reason;
  }
}

// ── Pacing: one call at a time, at least 1 s apart ────────────────────────
// A call that would wait more than ~2 s fails as "busy" (the customer keeps
// typing, or carries on with the address as typed).
let nextSlot = 0;
async function takeSlot() {
  const now = Date.now();
  const at = Math.max(now, nextSlot);
  if (at - now > 2000) throw new LookupUnavailable("busy");
  nextSlot = at + MIN_GAP_MS;
  if (at > now) await new Promise((r) => setTimeout(r, at - now));
}

// ── Cache: same query, same answer, for a day (an hour if nothing found) ─
const CACHE_MS = 24 * 60 * 60 * 1000;
const EMPTY_CACHE_MS = 60 * 60 * 1000;
const cache = new Map();
const cacheKey = (q) => q.toLowerCase().replace(/[\s,]+/g, " ").trim();

// ── Parsing (pure; tested in scripts/estimate.test.mjs) ──────────────────
export function parseResults(data) {
  if (!Array.isArray(data)) return [];
  const seen = new Set();
  const out = [];
  for (const item of data) {
    const a = item?.address || {};
    if (a.state !== "South Australia" && a["ISO3166-2-lvl4"] !== "AU-SA") continue;
    const lat = parseFloat(item?.lat);
    const lon = parseFloat(item?.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue;
    const address = formatNominatimAddress(item);
    if (!address || seen.has(address)) continue;
    seen.add(address);
    // exact: OpenStreetMap has this house number, so lat/lon is the house
    // itself (not just somewhere on the street). Only exact picks are used
    // for a satellite roof-size suggestion.
    out.push({ id: String(item.place_id ?? out.length), address, suburb: suburbOf(item), lat, lon, exact: Boolean(a.house_number) });
  }
  return out.slice(0, 5);
}

export async function suggestAddresses(query) {
  const q = query.slice(0, MAX_QUERY_LENGTH);
  const key = cacheKey(q);
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < (hit.results.length ? CACHE_MS : EMPTY_CACHE_MS)) return hit.results;

  await takeSlot();
  const url = new URL(SEARCH_URL);
  url.search = new URLSearchParams({
    format: "jsonv2",
    addressdetails: "1",
    countrycodes: "au",
    limit: "5",
    viewbox: SA_VIEWBOX,
    bounded: "1",
    q,
  }).toString();
  let res;
  try {
    res = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
        Referer: "https://adelaideroofers.com.au/",
        "Accept-Language": "en-AU,en",
      },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
  } catch (err) {
    throw new LookupUnavailable(err?.name === "TimeoutError" ? "timeout" : "network");
  }
  if (res.status === 429) throw new LookupUnavailable("rate_limited");
  if (res.status === 403) throw new LookupUnavailable("blocked");
  if (!res.ok) throw new LookupUnavailable(`upstream_${res.status}`);
  let data;
  try {
    data = await res.json();
  } catch {
    throw new LookupUnavailable("bad_response");
  }
  const results = parseResults(data);
  if (cache.size > 2000) cache.clear(); // keep memory bounded
  cache.set(key, { at: Date.now(), results });
  return results;
}
