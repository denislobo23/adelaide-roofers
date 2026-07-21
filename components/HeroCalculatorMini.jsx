"use client";
// components/HeroCalculatorMini.jsx
//
// Compact address-entry card for the hero section. Reuses the same free
// Nominatim autocomplete + satellite map logic as the full calculator
// (components/RoofCalculator.jsx), but stays small — just the address
// step. Once an address is selected, hands off to /calculator with the
// address pre-filled via sessionStorage, so the visitor lands straight on
// the job-type question instead of re-entering their address.
//
// Colour pass #3: middle ground between the dark theme (too dark, two
// attempts didn't land) and matching the main site exactly (lost the
// tool's own identity). Light teal palette — teal-50/100/200 for
// surfaces, teal-800/900 for text — keeps this feeling like a distinct
// interactive tool without going dark-mode. Clay stays the one strong
// accent colour: the button, the icon, and every focus state.

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

function useDebouncedValue(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function HeroCalculatorMini() {
  const router = useRouter();
  const [addressQuery, setAddressQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selected, setSelected] = useState(null); // { address, suburb, lat, lon }
  const suggestionsBoxRef = useRef(null);
  const debouncedQuery = useDebouncedValue(addressQuery, 300);

  useEffect(() => {
    const query = debouncedQuery.trim();
    if (query.length < 4) {
      setSuggestions([]);
      return;
    }
    const controller = new AbortController();
    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
        query
      )}&countrycodes=au&limit=5`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(Array.isArray(data) ? data : []);
        setShowSuggestions(true);
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error("Address lookup failed:", err);
      });
    return () => controller.abort();
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (suggestionsBoxRef.current && !suggestionsBoxRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectSuggestion = (item) => {
    const a = item.address || {};
    const suburb = a.suburb || a.city_district || a.town || a.city || a.municipality || "";
    setSelected({
      address: item.display_name,
      suburb,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
    });
    setAddressQuery(item.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const mapSrc = selected
    ? `https://maps.google.com/maps?q=${selected.lat},${selected.lon}&z=20&t=k&output=embed`
    : null;

  const continueToCalculator = () => {
    sessionStorage.setItem(
      "heroPrefillAddress",
      JSON.stringify({
        address: selected.address,
        suburb: selected.suburb,
        lat: selected.lat,
        lon: selected.lon,
      })
    );
    router.push("/calculator");
  };

  return (
    <div className="rounded-2xl border-2 border-clay/50 bg-teal-50/50 p-6 shadow-xl md:p-8">
      <p className="mb-3 font-body text-base font-semibold text-ink/80 md:text-lg">
        <span className="text-clay">Step 1:</span> Bring Up The Satellite Image Of Your Roof
      </p>
      <div ref={suggestionsBoxRef} className="relative">
        <input
          type="text"
          value={addressQuery}
          onChange={(e) => {
            setAddressQuery(e.target.value);
            setSelected(null);
          }}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder="Start typing your address…"
          autoComplete="off"
          className="w-full rounded-xl border-2 border-teal-100 bg-white px-5 py-4 font-body text-base text-ink placeholder-ink/35 outline-none transition-all focus:border-clay"
        />

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-xl border border-teal-100 bg-white shadow-2xl">
            {suggestions.map((item) => (
              <button
                key={item.place_id}
                type="button"
                onClick={() => selectSuggestion(item)}
                className="block w-full border-b border-teal-50 px-4 py-3 text-left font-body text-sm text-ink/80 last:border-b-0 hover:bg-teal-50"
              >
                {item.display_name}
              </button>
            ))}
          </div>
        )}
      </div>

      {mapSrc ? (
        <div className="mt-4 aspect-[16/10] w-full overflow-hidden rounded-xl border border-teal-100">
          <iframe src={mapSrc} loading="lazy" title="Your roof" className="h-full w-full border-0" />
        </div>
      ) : (
        <div className="mt-4 flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-teal-100 bg-white/70 px-6 text-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-clay/60"
          >
            <path d="M3 11.5 12 4l9 7.5" />
            <path d="M6 10v9.5h12V10" />
            <circle cx="12" cy="14.5" r="2" />
          </svg>
          <p className="font-body text-xs text-ink/45">
            Your roof&apos;s satellite view will appear here once you enter an address
          </p>
        </div>
      )}

      <button
        type="button"
        disabled={!selected}
        onClick={continueToCalculator}
        className={`mt-5 w-full rounded-xl px-6 py-5 font-display text-lg font-bold tracking-tight transition-all ${
          selected
            ? "bg-clay text-white hover:brightness-95"
            : "cursor-not-allowed bg-teal-100/70 text-ink/30"
        }`}
      >
        Yes, That&apos;s My Roof! →
      </button>
      <p className="mt-3 text-center font-body text-xs text-ink/45">
        Free, no obligation — takes about a minute.
      </p>
    </div>
  );
}
