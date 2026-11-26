"use client";
// components/AddressSearch.jsx
//
// The address box used by the full calculator and the homepage/suburb/
// service mini calculator. Suggestions come from OpenStreetMap (Nominatim)
// through our own /api/address/suggest route, which keeps to Nominatim's
// usage policy (1 request a second, identified, cached).
//
// If the lookup is down, busy, or can't find the address, the customer can
// carry on with the address as typed. The calculator never gets stuck on
// this step.
//
// Suggestions in the suburb the customer typed come first. If they typed
// a suburb and no suggestion is in it, "Use exactly what I typed" is
// offered at the top of the list (lib/rankSuggestions.js).
//
// Reports every change to the parent through onChange({ text, pick,
// manualOk, typedSuburb }):
//   pick         { address, suburb, lat, lon, exact } once a suggestion is
//                chosen; exact is true only if OpenStreetMap had the house
//                number (not when we put the typed number back)
//   manualOk     true when the typed text can be used without a suggestion
//   typedSuburb  the suburb in the typed text, if we could tell ("" if not)

import { useEffect, useRef, useState } from "react";

import { looksLikeAddress, withTypedNumber } from "@/lib/formatAddress";
import { rankSuggestions } from "@/lib/rankSuggestions";
import AddressCredit from "@/components/AddressCredit";

// Wait for a pause in typing, so one customer sends roughly one lookup.
const DEBOUNCE_MS = 450;

function useDebouncedValue(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function AddressSearch({ initialText = "", initialPick = null, onChange, className = "" }) {
  const [text, setText] = useState(initialText);
  const [pick, setPick] = useState(initialPick);
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | ok | empty | down
  // From the last lookup: the suburb typed, and whether to offer the typed text.
  const [typedInfo, setTypedInfo] = useState({ typedSuburb: "", offerTyped: false });
  const [typedChosen, setTypedChosen] = useState(false);
  const boxRef = useRef(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const debounced = useDebouncedValue(text, DEBOUNCE_MS);

  const manualOk =
    !pick && (typedChosen || ((status === "down" || status === "empty") && looksLikeAddress(text)));
  const typedSuburb = typedInfo.typedSuburb;

  useEffect(() => {
    onChangeRef.current?.({ text, pick, manualOk, typedSuburb });
  }, [text, pick, manualOk, typedSuburb]);

  useEffect(() => {
    const query = debounced.trim();
    if (query.length < 4 || (pick && query === pick.address)) {
      setSuggestions([]);
      return;
    }
    const controller = new AbortController();
    fetch(`/api/address/suggest?q=${encodeURIComponent(query)}`, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`lookup ${res.status}`);
        const ranked = rankSuggestions((await res.json()).suggestions || [], query);
        setSuggestions(ranked.suggestions);
        setTypedInfo({ typedSuburb: ranked.typedSuburb, offerTyped: ranked.offerTyped });
        setStatus(ranked.suggestions.length ? "ok" : "empty");
        setOpen(true);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error("Address lookup unavailable:", err.message);
        setSuggestions([]);
        setStatus("down");
      });
    return () => controller.abort();
  }, [debounced, pick]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const choose = (item) => {
    // Keep the customer's house number if OpenStreetMap only knows the street.
    const address = withTypedNumber(item.address, text);
    const exact = Boolean(item.exact) && address === item.address;
    setPick({ address, suburb: item.suburb, lat: item.lat, lon: item.lon, exact });
    setText(address);
    setSuggestions([]);
    setOpen(false);
  };

  return (
    <div className={className}>
      <div ref={boxRef} className="relative">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setPick(null);
            setTypedChosen(false);
          }}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder="Start typing your address"
          autoComplete="off"
          aria-label="Your address"
          className="w-full rounded-xl border-2 border-ink/25 bg-white py-4 pl-12 pr-4 font-body text-lg text-ink shadow-sm outline-none transition-all placeholder:text-ink/40 focus:border-clay focus:ring-4 focus:ring-clay/15"
        />
        <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-clay" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>

        {open && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-y-auto rounded-xl border-2 border-mortar bg-white shadow-xl">
            {typedInfo.offerTyped && (
              <button
                type="button"
                onClick={() => {
                  setTypedChosen(true);
                  setOpen(false);
                }}
                className="block w-full border-b border-mortar/70 bg-paper/60 px-4 py-3 text-left font-body text-sm text-ink/85 hover:bg-paper"
              >
                <span className="font-semibold">Use exactly what I typed:</span> {text.trim()}
              </button>
            )}
            {suggestions.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => choose(item)}
                className="block w-full border-b border-mortar/70 px-4 py-3 text-left font-body text-sm text-ink/85 last:border-b-0 hover:bg-paper"
              >
                {withTypedNumber(item.address, text)}
              </button>
            ))}
          </div>
        )}
      </div>

      {!pick && status === "down" && (
        <p className="mt-2 font-body text-sm text-ink/70" role="status">
          Address search isn&apos;t available right now. Type your full address (number, street
          and suburb) and carry on.
        </p>
      )}
      {!pick && status === "empty" && text.trim().length >= 4 && (
        <p className="mt-2 font-body text-sm text-ink/70" role="status">
          No match yet. Keep typing, or if your address isn&apos;t listed, check it and carry on
          with it as typed.
        </p>
      )}
      <AddressCredit />
    </div>
  );
}
