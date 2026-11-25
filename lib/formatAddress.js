// lib/formatAddress.js
//
// Turns OpenStreetMap (Nominatim) results into the way Australians write an
// address: "4 Tintern Crescent, Morphett Vale SA 5162" — no comma between
// the street number and the street name, no council or country.

const STATE_ABBR = {
  "South Australia": "SA",
  "New South Wales": "NSW",
  Victoria: "VIC",
  Queensland: "QLD",
  "Western Australia": "WA",
  Tasmania: "TAS",
  "Northern Territory": "NT",
  "Australian Capital Territory": "ACT",
};

export function suburbOf(item) {
  const a = item?.address || {};
  // Nominatim tags the locality as suburb/city_district/town/... depending on
  // how OSM mapped that area, so fall back through the likely fields.
  return a.suburb || a.city_district || a.town || a.village || a.city || a.municipality || "";
}

// Fixes a free-typed or display_name-style address: "4, Tintern Crescent"
// -> "4 Tintern Crescent". Also tidies stray spaces before commas.
export function tidyAddress(text) {
  if (!text) return "";
  return String(text)
    .trim()
    .replace(/^((?:unit\s+|lot\s+)?\d+[a-z]?(?:\s*[/-]\s*\d+[a-z]?)?)\s*,\s+/i, "$1 ")
    .replace(/\s+,/g, ",")
    .replace(/\s{2,}/g, " ");
}

export function formatNominatimAddress(item) {
  const a = item?.address || {};
  const street = [a.house_number, a.road].filter(Boolean).join(" ");
  const suburb = suburbOf(item);
  const state = STATE_ABBR[a.state] || a.state || "";
  const tail = [suburb, state, a.postcode].filter(Boolean).join(" ");
  const formatted = [street, tail].filter(Boolean).join(", ");
  // If OSM didn't give us a road, fall back to a tidied display name.
  return a.road ? formatted : tidyAddress(item?.display_name || formatted);
}
