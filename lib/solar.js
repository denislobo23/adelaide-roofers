// lib/solar.js — SERVER ONLY (reads GOOGLE_SOLAR_API_KEY).
//
// Google Solar API, buildingInsights:findClosest, used only to suggest a
// roof size to the customer (see docs/solar-autofill-plan.md). Off unless
// SOLAR_AUTOFILL_ENABLED=true. Adelaide only has MEDIUM-quality coverage,
// so requests ask for MEDIUM (the default, HIGH, finds nothing here).
// Nothing is cached or stored.

const URL_BASE = "https://solar.googleapis.com/v1/buildingInsights:findClosest";
const TIMEOUT_MS = 3000;

export const solarEnabled = (env = process.env) =>
  env.SOLAR_AUTOFILL_ENABLED === "true" && Boolean(env.GOOGLE_SOLAR_API_KEY);

// Returns the parsed response, or null for "no data" (404) or any failure.
export async function findClosestBuilding(lat, lon) {
  const url = new URL(URL_BASE);
  url.search = new URLSearchParams({
    "location.latitude": String(lat),
    "location.longitude": String(lon),
    requiredQuality: "MEDIUM",
    key: process.env.GOOGLE_SOLAR_API_KEY,
  }).toString();
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS), cache: "no-store" });
    if (!res.ok) {
      if (res.status !== 404) console.error("Solar API error:", res.status);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error("Solar API unavailable:", err?.name === "TimeoutError" ? "timeout" : "network");
    return null;
  }
}
