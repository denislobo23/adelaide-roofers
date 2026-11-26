// lib/rankSuggestions.js
//
// Puts address suggestions in the suburb the customer typed first.
// Nominatim can list "128 King William Street, Kent Town" above
// "128 King William Street, Adelaide" even when the customer typed
// "... Adelaide". We work out which typed words aren't part of the street
// (or a number, street type, state or postcode): those are the suburb.
//
// rankSuggestions(list, typed) returns:
//   suggestions   matching suburb first, otherwise in Nominatim's order
//   typedSuburb   the suburb the customer typed ("Glenelg"), or ""
//   offerTyped    true when they typed a suburb and no suggestion is in it:
//                 the box then offers "Use exactly what I typed" first

const STREET_TYPES = new Set(
  (
    "street st road rd avenue ave av crescent cres cr drive dr court ct place pl terrace tce " +
    "parade pde highway hwy lane ln boulevard blvd bvd close cl grove gr gv way circuit cct " +
    "square sq esplanade esp walk wk mews track trk rise row"
  ).split(" ")
);
const IGNORE = new Set(["sa", "south", "australia", "unit", "u", "lot", "flat", "apartment", "apt"]);

const words = (s) =>
  String(s || "")
    .split(/[\s,/]+/)
    .map((w) => w.trim())
    .filter(Boolean);

function typedSuburbOf(list, typed) {
  // Words used in the street part ("128 King William Street") of any suggestion.
  const streetWords = new Set();
  for (const s of list) for (const w of words(String(s.address).split(",")[0])) streetWords.add(w.toLowerCase());
  const isStreetWord = (w) => [...streetWords].some((sw) => sw === w || sw.startsWith(w));
  return words(typed)
    .filter((w) => {
      const l = w.toLowerCase();
      return !/\d/.test(l) && !IGNORE.has(l) && !STREET_TYPES.has(l) && !isStreetWord(l);
    })
    .join(" ");
}

function suburbMatches(suburb, typedSuburb) {
  const s = String(suburb || "").toLowerCase();
  const t = typedSuburb.toLowerCase();
  return Boolean(s && t) && (s === t || s.startsWith(t) || t.includes(s));
}

const titleCase = (s) => s.replace(/\b([a-z])/g, (c) => c.toUpperCase());

export function rankSuggestions(list, typed) {
  const suggestions = Array.isArray(list) ? list : [];
  const raw = typedSuburbOf(suggestions, typed);
  if (!raw) return { suggestions, typedSuburb: "", offerTyped: false };
  const matching = suggestions.filter((s) => suburbMatches(s.suburb, raw));
  const rest = suggestions.filter((s) => !matching.includes(s));
  return {
    suggestions: [...matching, ...rest],
    typedSuburb: /[a-z]/.test(raw) && raw === raw.toLowerCase() ? titleCase(raw) : raw,
    offerTyped: suggestions.length > 0 && matching.length === 0,
  };
}
