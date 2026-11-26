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

const STATE_RE = /\s+(?:SA|NSW|VIC|QLD|WA|TAS|NT|ACT)(?:\s+\d{4})?$/i;

// "4 Tintern Crescent, Morphett Vale SA 5162" -> "Morphett Vale".
// Also handles a hand-typed "4 Tintern Cres, Morphett Vale".
export function suburbFromAddress(text) {
  const parts = String(text || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (parts.length < 2) return "";
  return parts[parts.length - 1].replace(STATE_RE, "").replace(/\s+\d{4}$/, "").trim();
}

// OpenStreetMap often knows the street but not the house number, so a
// suggestion can come back as "King William Street, Adelaide SA 5000" for
// "128 King William Street". When the chosen suggestion has no number, put
// the one the customer typed back in front, so the lead has the full
// address: "128 King William Street, Adelaide SA 5000". Handles "12A",
// "3/14" and "Unit 3 14".
const TYPED_NUMBER = /^\s*((?:(?:unit|u|lot)\s*)?\d+[a-z]?(?:\s*[/-]\s*\d+[a-z]?)?(?:\s+\d+[a-z]?)?)(?=[\s,])/i;

export function withTypedNumber(address, typed) {
  if (!address || /^\s*(?:(?:unit|u|lot)\s*)?\d/i.test(address)) return address;
  const m = String(typed || "").match(TYPED_NUMBER);
  return m ? `${m[1].replace(/\s*([/-])\s*/, "$1").replace(/\s+/g, " ")} ${address}` : address;
}

// A hand-typed address is good enough to continue with if it has a street
// number and a few words, e.g. "4 Tintern Cres Morphett Vale".
export function looksLikeAddress(text) {
  const t = String(text || "").trim();
  return t.length >= 10 && /\d/.test(t) && /[a-z]{3,}/i.test(t) && t.split(/[\s,]+/).length >= 3;
}
