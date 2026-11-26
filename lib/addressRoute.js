// lib/addressRoute.js — SERVER ONLY. Guards for /api/address/suggest,
// which calls the shared, rate-limited Nominatim service.

// Per-visitor limit (per server instance): typing an address takes a
// handful of lookups; this stops one visitor (or a script) using up the
// whole site's 1-request-a-second Nominatim allowance.
const PER_IP_LIMIT = 40;
const PER_IP_WINDOW_MS = 5 * 60 * 1000;
const hits = new Map();

export function guardAddressRequest(request) {
  // Only our own pages (browsers send Sec-Fetch-Site; scripts usually don't,
  // and fall under the per-visitor limit instead).
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return "cross_site";

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < PER_IP_WINDOW_MS);
  if (list.length >= PER_IP_LIMIT) return "too_many";
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return null;
}

export function unavailable(reason) {
  // 503 tells the calculator to switch to typed-address mode.
  return Response.json({ error: reason }, { status: 503, headers: { "Cache-Control": "no-store" } });
}

export function ok(body) {
  return Response.json(body, { headers: { "Cache-Control": "no-store" } });
}
