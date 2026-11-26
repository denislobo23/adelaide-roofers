// lib/roofFromSolar.js
//
// Turns a Google Solar API buildingInsights response into a roof-size
// suggestion for the calculator, and (only in clear cases) a roof shape.
// No network calls, so every rule is unit-tested (scripts/estimate.test.mjs).
//
// Returns { areaM2, shape } or null. shape is "flat", "gable", "hip" or null.
// Nothing here is stored: the customer decides whether to use the size.

export const MIN_AREA_M2 = 80; // the size slider's range
export const MAX_AREA_M2 = 500;
export const MAX_DISTANCE_M = 25; // Google's building vs the address point
const OK_QUALITY = ["HIGH", "MEDIUM"];

const toRad = (d) => (d * Math.PI) / 180;

// Metres between two points (haversine).
export function distanceM(a, b) {
  const R = 6371000;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Smallest angle between two compass bearings (0–180).
const angleBetween = (a, b) => {
  const d = Math.abs(((a - b) % 360) + 360) % 360;
  return d > 180 ? 360 - d : d;
};

export function shapeFromSegments(segments) {
  const segs = (Array.isArray(segments) ? segments : [])
    .map((s) => ({ pitch: Number(s?.pitchDegrees), azimuth: Number(s?.azimuthDegrees), area: Number(s?.stats?.areaMeters2) }))
    .filter((s) => Number.isFinite(s.pitch) && Number.isFinite(s.azimuth) && s.area > 0)
    .sort((x, y) => y.area - x.area);
  if (!segs.length) return null;
  const total = segs.reduce((sum, s) => sum + s.area, 0);

  if (segs.every((s) => s.pitch < 10)) return "flat";

  // Gable: two main faces pointing opposite ways carry (almost) the whole roof.
  const [a, b] = segs;
  if (b && (a.area + b.area) / total >= 0.85 && Math.abs(angleBetween(a.azimuth, b.azimuth) - 180) <= 20) {
    return "gable";
  }

  // Hip: four main faces, each pointing a different way, about 90° apart.
  const four = segs.slice(0, 4);
  if (four.length === 4 && four.reduce((sum, s) => sum + s.area, 0) / total >= 0.85) {
    const bearings = four.map((s) => ((s.azimuth % 360) + 360) % 360).sort((x, y) => x - y);
    const gaps = bearings.map((x, i) => (i === 3 ? bearings[0] + 360 - x : bearings[i + 1] - x));
    if (gaps.every((g) => Math.abs(g - 90) <= 20)) return "hip";
  }

  return null; // Dutch gable, multi-level or untidy: no suggestion
}

export function roofFromInsights(data, point) {
  if (!data || typeof data !== "object") return null;
  if (!OK_QUALITY.includes(data.imageryQuality)) return null;

  const c = data.center;
  if (!c || !Number.isFinite(c.latitude) || !Number.isFinite(c.longitude)) return null;
  if (distanceM({ lat: c.latitude, lon: c.longitude }, point) > MAX_DISTANCE_M) return null;

  const raw = Number(data.solarPotential?.wholeRoofStats?.areaMeters2);
  // The measured area must itself be within the slider's range.
  if (!Number.isFinite(raw) || raw < MIN_AREA_M2 || raw > MAX_AREA_M2) return null;
  const areaM2 = Math.round(raw / 10) * 10;

  return { areaM2, shape: shapeFromSegments(data.solarPotential?.roofSegmentStats) };
}
