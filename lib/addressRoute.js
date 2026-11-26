// lib/addressRoute.js — SERVER ONLY. Guards for our API routes that call
// limited outside services: /api/address/suggest (Nominatim, 1 request a
// second for the whole site) and /api/roof-estimate (Google Solar, daily
// cap).

// makeGuard({ limit, windowMs }) returns guard(request), which gives a
// reason string to refuse, or null to go ahead. Per visitor (IP), per
// server instance; each guard keeps its own count.
export function makeGuard({ limit, windowMs }) {
  const hits = new Map();
  return function guard(request) {
    // Only our own pages (browsers send Sec-Fetch-Site; scripts usually
    // don't, and fall under the per-visitor limit instead).
    const site = request.headers.get("sec-fetch-site");
    if (site && site !== "same-origin") return "cross_site";

    const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
    const now = Date.now();
    const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
    if (list.length >= limit) return "too_many";
    list.push(now);
    hits.set(ip, list);
    if (hits.size > 5000) hits.clear(); // keep memory bounded
    return null;
  };
}

// Typing an address takes a handful of lookups; this stops one visitor (or
// a script) using up the whole site's Nominatim allowance.
export const guardAddressRequest = makeGuard({ limit: 40, windowMs: 5 * 60 * 1000 });

export function unavailable(reason) {
  // 503 tells the calculator to switch to typed-address mode.
  return Response.json({ error: reason }, { status: 503, headers: { "Cache-Control": "no-store" } });
}

export function ok(body) {
  return Response.json(body, { headers: { "Cache-Control": "no-store" } });
}
