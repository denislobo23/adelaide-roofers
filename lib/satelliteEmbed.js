// lib/satelliteEmbed.js
//
// The satellite view of the customer's roof shown in both calculators.
// Uses the official Google Maps Embed API (place mode: satellite, pin on the
// address) with NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY. That key is public by
// design: it's restricted in Google Cloud to our domains and to the Maps
// Embed API only. Without a key (local builds, or if it's ever removed),
// falls back to the old keyless maps.google.com embed so the map still shows.

export const SATELLITE_ZOOM = 20;

// `key` is passed in only by tests; the app uses the build-time env var.
// (process.env.NEXT_PUBLIC_… must be written out in full for Next.js to
// inline it into the browser bundle.)
export function satelliteEmbedSrc(lat, lon, key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY) {
  if (lat == null || lon == null || !Number.isFinite(Number(lat)) || !Number.isFinite(Number(lon))) return null;
  const q = `${Number(lat)},${Number(lon)}`;
  if (key) {
    const params = new URLSearchParams({ key, q, zoom: String(SATELLITE_ZOOM), maptype: "satellite" });
    return `https://www.google.com/maps/embed/v1/place?${params}`;
  }
  return `https://maps.google.com/maps?q=${q}&z=${SATELLITE_ZOOM}&t=k&output=embed`;
}
