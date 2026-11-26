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
// Styled to match the full calculator's first step: "Where's the roof?",
// a large address box with a pin, the blurred Adelaide aerial until an
// address is picked, solid buttons and the shared trust strip.

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { formatNominatimAddress, suburbOf } from "@/lib/formatAddress";
import TrustStrip from "@/components/TrustStrip";

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
    if (query.length < 4 || (selected && query === selected.address)) {
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
  }, [debouncedQuery, selected]);

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
    const address = formatNominatimAddress(item);
    setSelected({
      address,
      suburb: suburbOf(item),
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
    });
    setAddressQuery(address);
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
    <div className="overflow-hidden rounded-2xl border-2 border-clay/50 bg-white shadow-xl">
      <div className="p-6 md:p-8">
        <p className="text-xs font-semibold text-clay">Free roof price check · takes about a minute</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink">
          Where&apos;s the roof?
        </h2>
        <p className="mt-2 font-body text-base text-ink/70">
          Start with your address. We&apos;ll pull up a satellite view of your roof, then ask a few
          quick questions for a price range.
        </p>

        <div ref={suggestionsBoxRef} className="relative mt-5">
          <input
            type="text"
            value={addressQuery}
            onChange={(e) => {
              setAddressQuery(e.target.value);
              setSelected(null);
            }}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Start typing your address"
            autoComplete="off"
            aria-label="Your address"
            className="w-full rounded-xl border-2 border-ink/25 bg-white py-4 pl-12 pr-4 font-body text-lg text-ink shadow-sm outline-none transition-all placeholder:text-ink/40 focus:border-clay focus:ring-4 focus:ring-clay/15"
          />
          <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-clay" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-y-auto rounded-xl border-2 border-mortar bg-white shadow-xl">
              {suggestions.map((item) => (
                <button
                  key={item.place_id}
                  type="button"
                  onClick={() => selectSuggestion(item)}
                  className="block w-full border-b border-mortar/70 px-4 py-3 text-left font-body text-sm text-ink/85 last:border-b-0 hover:bg-paper"
                >
                  {formatNominatimAddress(item)}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-xl border-2 border-mortar bg-mortar/40">
          {mapSrc ? (
            <iframe src={mapSrc} loading="lazy" title="Your roof" className="absolute inset-0 h-full w-full border-0" />
          ) : (
            <>
              <Image src="/images/calculator-aerial-blur.webp" alt="" fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-ink/25" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#BC5B3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <p className="max-w-xs rounded-lg bg-white/90 px-4 py-2 font-body text-sm font-medium text-ink shadow">
                  Pick your address and your roof appears here from above.
                </p>
              </div>
            </>
          )}
        </div>

        <button
          type="button"
          disabled={!selected}
          onClick={continueToCalculator}
          className={`mt-5 w-full rounded-xl px-6 py-4 font-display text-lg font-bold tracking-tight transition-all ${
            selected
              ? "bg-clay text-white shadow-md hover:brightness-95"
              : "cursor-not-allowed bg-ink/10 text-ink/45"
          }`}
        >
          {selected ? "That's my roof →" : "Pick your address first"}
        </button>
      </div>
      <TrustStrip compact />
    </div>
  );
}
