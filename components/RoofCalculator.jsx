"use client";
// components/RoofCalculator.jsx
//
// Interactive roof-price calculator — dark/teal theme, standalone page.
// BRANCHES by job type: the first question ("what do you need done?")
// determines which subsequent questions are asked, since size/shape don't
// matter for a leak repair or a gutter job the way they do for a full
// restoration or replacement.
//
// Ends by sending the visitor to /get-my-estimate, where Full Name +
// Mobile + Timeframe are MANDATORY before they see any figure. Answers
// (including jobType) are passed via sessionStorage.

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const JOB_TYPES = [
  { v: "restoration", label: "Roof Restoration", note: "Clean, re-bed, re-point, re-coat" },
  { v: "replacement", label: "Roof Replacement", note: "Full re-roof or tile-to-metal conversion" },
  { v: "repairs", label: "Roof Repairs", note: "A specific problem, not a full job" },
  { v: "leak", label: "Roof Leak Repair", note: "Tracing and fixing an active leak" },
  { v: "painting", label: "Roof Painting / Re-Coating", note: "Sealing and refreshing the roof" },
  { v: "gutters", label: "Gutter Repairs", note: "Gutters, downpipes and valleys" },
];

// Which questions each job type asks, after jobType and address.
const STEP_FLOWS = {
  restoration: ["size", "storeys", "material", "complexity"],
  replacement: ["size", "storeys", "currentMaterial", "desiredMaterial", "complexity"],
  painting: ["size", "storeys", "material", "complexity"],
  repairs: ["storeys", "material", "repairAreas"],
  leak: ["storeys", "material", "leakDuration"],
  gutters: ["storeys", "gutterLength"],
};

const REPAIR_AREA_OPTIONS = [
  { v: "one", label: "One area", note: "A single tile, flashing or small spot" },
  { v: "few", label: "A few areas", note: "2–3 separate spots" },
  { v: "many", label: "Several areas", note: "4 or more, or not sure yet" },
];

const LEAK_DURATION_OPTIONS = [
  { v: "just_noticed", label: "Just noticed it", note: "Started recently" },
  { v: "few_weeks", label: "A few weeks", note: "Been going for a little while" },
  { v: "months", label: "Months", note: "It's been ongoing" },
  { v: "recurring", label: "Keeps coming back", note: "Recurring, possibly worsening" },
];

function useDebouncedValue(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function RoofCalculator() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [addressQuery, setAddressQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const suggestionsBoxRef = useRef(null);
  const debouncedQuery = useDebouncedValue(addressQuery, 300);

  const [form, setForm] = useState({
    jobType: "",
    address: "",
    suburb: "",
    roofSizeM2: 200,
    storeys: "single",
    material: "colorbond",
    currentMaterial: "concreteTile",
    desiredMaterial: "colorbond",
    complexity: "gable",
    repairAreas: "one",
    leakDuration: "just_noticed",
    gutterLengthM: 25,
  });

  // If the visitor already entered their address in the hero's mini
  // calculator, skip straight past the address step here — no need to
  // make them type it twice.
  useEffect(() => {
    const raw = sessionStorage.getItem("heroPrefillAddress");
    if (!raw) return;
    try {
      const prefill = JSON.parse(raw);
      if (prefill.address) {
        setForm((f) => ({ ...f, address: prefill.address, suburb: prefill.suburb || "" }));
        setAddressQuery(prefill.address);
        if (prefill.lat && prefill.lon) {
          setSelectedCoords({ lat: prefill.lat, lon: prefill.lon });
        }
        setStepIndex(1); // steps[0] is "address" — jump to steps[1] ("jobType")
      }
    } catch (err) {
      console.error("Failed to read hero prefill address:", err);
    } finally {
      sessionStorage.removeItem("heroPrefillAddress");
    }
  }, []);

  // The full step list is dynamic: jobType + address are always first,
  // then whatever STEP_FLOWS says for the chosen job type.
  const steps = ["address", "jobType", ...(STEP_FLOWS[form.jobType] || [])];
  const step = steps[stepIndex];
  // Step numbers are DYNAMIC, not hardcoded per step name — because "size"
  // is step 3 on a restoration but "storeys" is step 3 on a repair. Always
  // derive the number from position in the current branch's step list.
  const stepNumber = stepIndex + 1;

  const next = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const back = () => setStepIndex((i) => Math.max(i - 1, 0));
  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const chooseJobType = (v) => {
    update("jobType", v);
  };

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
    update("address", item.display_name);
    // Nominatim's address breakdown doesn't always use "suburb" — different
    // areas get tagged as suburb/city_district/town depending on how OSM
    // has mapped that region, so fall back through the likely fields.
    const a = item.address || {};
    const suburb = a.suburb || a.city_district || a.town || a.city || a.municipality || "";
    update("suburb", suburb);
    setAddressQuery(item.display_name);
    setSelectedCoords({ lat: parseFloat(item.lat), lon: parseFloat(item.lon) });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const mapSrc = selectedCoords
    ? `https://maps.google.com/maps?q=${selectedCoords.lat},${selectedCoords.lon}&z=20&t=k&output=embed`
    : null;

  const goToEstimatePage = () => {
    sessionStorage.setItem("roofEstimateAnswers", JSON.stringify(form));
    router.push("/get-my-estimate");
  };

  const isLastStep = stepIndex === steps.length - 1;

  const inputClasses =
    "w-full rounded-lg border-2 border-teal-100 bg-white px-3.5 py-3 text-sm text-ink placeholder-ink/35 outline-none transition-all focus:border-clay";
  const optionBase = "w-full rounded-lg border-2 p-4 text-left transition-all";
  const optionActive = "border-clay bg-clay/10";
  const optionInactive = "border-teal-200 hover:border-clay/50";

  return (
    <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border-2 border-clay/50 bg-white shadow-2xl">
      <div className="grid min-h-[560px] lg:grid-cols-12">
        {/* ── LEFT: QUESTIONS PANEL ─────────────────── */}
        <div className="flex flex-col justify-between border-b border-teal-100 p-6 md:p-8 lg:col-span-5 lg:border-b-0 lg:border-r">
          <div>
            <div className="mb-6 flex items-center gap-1.5">
              {steps.map((s, i) => (
                <div
                  key={s + i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i <= stepIndex ? "bg-clay" : "bg-teal-100"
                  }`}
                />
              ))}
            </div>

            {/* ── STEP: JOB TYPE ─────────────────────── */}
            {step === "jobType" && (
              <div>
                <h3 className="text-xl font-bold tracking-tight text-ink">
                  <span className="text-clay">Step {stepNumber}:</span> Tell Us What You Need Done
                </h3>
                <p className="mt-1.5 text-sm text-ink/60">
                  This tells us which questions actually matter for your estimate.
                </p>
                <div className="mt-5 space-y-2.5">
                  {JOB_TYPES.map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => chooseJobType(o.v)}
                      className={`${optionBase} ${form.jobType === o.v ? optionActive : optionInactive}`}
                    >
                      <span className="block text-sm font-semibold text-ink">{o.label}</span>
                      <span className="block text-xs text-ink/50">{o.note}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={back} className="rounded-lg border-2 border-teal-100 px-5 py-3 text-sm font-semibold text-ink/70 hover:border-clay/50">
                    ← Back
                  </button>
                  <button
                    type="button"
                    disabled={!form.jobType}
                    onClick={next}
                    className={`flex-1 rounded-lg px-6 py-3 font-semibold tracking-tight transition-all ${
                      form.jobType
                        ? "bg-clay text-ink hover:brightness-95"
                        : "cursor-not-allowed bg-teal-100/70 text-ink/30"
                    }`}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP: ADDRESS ─────────────────────── */}
            {step === "address" && (
              <div>
                <h3 className="text-xl font-bold tracking-tight text-ink">
                  <span className="text-clay">Step {stepNumber}:</span> Identify Your Property Via Google Satellite
                </h3>

                <div ref={suggestionsBoxRef} className="relative">
                  <input
                    type="text"
                    value={addressQuery}
                    onChange={(e) => {
                      setAddressQuery(e.target.value);
                      update("address", e.target.value);
                      setSelectedCoords(null);
                    }}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    placeholder="Start typing your address…"
                    autoComplete="off"
                    className={`mt-4 ${inputClasses}`}
                  />

                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-48 overflow-y-auto rounded-lg border border-teal-100 bg-white shadow-2xl">
                      {suggestions.map((item) => (
                        <button
                          key={item.place_id}
                          type="button"
                          onClick={() => selectSuggestion(item)}
                          className="block w-full border-b border-teal-50 px-3.5 py-2.5 text-left text-sm text-ink/80 last:border-b-0 hover:bg-teal-50"
                        >
                          {item.display_name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  disabled={!mapSrc}
                  onClick={next}
                  className={`mt-6 w-full rounded-lg px-6 py-3 font-semibold tracking-tight transition-all ${
                    mapSrc
                      ? "bg-clay text-ink hover:brightness-95"
                      : "cursor-not-allowed bg-teal-100/70 text-ink/30"
                  }`}
                >
                  That&apos;s my roof →
                </button>
              </div>
            )}

            {/* ── STEP: SIZE ─────────────────────────── */}
            {step === "size" && (
              <div>
                <h3 className="text-xl font-bold tracking-tight text-ink">
                  <span className="text-clay">Step {stepNumber}:</span> Roughly how big is your roof?
                </h3>
                <p className="mt-1.5 text-sm text-ink/60">
                  Not sure exactly? A rough guess is fine — this is an estimate, not a measurement.
                </p>
                <div className="mt-6">
                  <input
                    type="range"
                    min={80}
                    max={500}
                    step={10}
                    value={form.roofSizeM2}
                    onChange={(e) => update("roofSizeM2", Number(e.target.value))}
                    className="w-full accent-clay"
                  />
                  <div className="mt-2 text-center text-2xl font-extrabold text-ink">
                    {form.roofSizeM2} m²
                  </div>
                  <p className="mt-1 text-center text-xs text-ink/45">
                    A typical 4-bedroom Adelaide home is around 220–260 m² of roof.
                  </p>
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={back} className="rounded-lg border-2 border-teal-100 px-5 py-3 text-sm font-semibold text-ink/70 hover:border-clay/50">
                    ← Back
                  </button>
                  <button type="button" onClick={next} className="flex-1 rounded-lg bg-ink px-6 py-3 font-semibold tracking-tight text-paper transition-all hover:bg-ink/85">
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP: STOREYS ──────────────────────── */}
            {step === "storeys" && (
              <div>
                <h3 className="text-xl font-bold tracking-tight text-ink">
                  <span className="text-clay">Step {stepNumber}:</span> Single or double storey?
                </h3>
                <p className="mt-1.5 text-sm text-ink/60">
                  Double storey usually costs more — scaffolding and access take longer.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    { v: "single", label: "Single storey" },
                    { v: "double", label: "Double storey" },
                  ].map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => update("storeys", o.v)}
                      className={`rounded-lg border-2 p-4 text-left text-sm font-medium transition-all ${
                        form.storeys === o.v
                          ? "border-clay bg-clay/10 text-ink"
                          : "border-teal-200 text-ink/70 hover:border-clay/50"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={back} className="rounded-lg border-2 border-teal-100 px-5 py-3 text-sm font-semibold text-ink/70 hover:border-clay/50">
                    ← Back
                  </button>
                  <button type="button" onClick={next} className="flex-1 rounded-lg bg-ink px-6 py-3 font-semibold tracking-tight text-paper transition-all hover:bg-ink/85">
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP: MATERIAL ─────────────────────── */}
            {step === "material" && (
              <div>
                <h3 className="text-xl font-bold tracking-tight text-ink">
                  <span className="text-clay">Step {stepNumber}:</span> What&apos;s your roof made of?
                </h3>
                <p className="mt-1.5 text-sm text-ink/60">
                  Take a look at the satellite view on the right — smooth, uniform panels usually
                  mean metal; a textured, ridged pattern usually means tile. Compare against the
                  reference photos below if you&apos;re still not sure.
                </p>
                <div className="mt-5 space-y-2.5">
                  {[
                    { v: "colorbond", label: "Colorbond (coloured steel)", note: "Lightest, typically most affordable", img: "/images/roof-materials/material-colorbond.webp" },
                    { v: "galvanised", label: "Galvanised steel", note: "Traditional silver corrugated metal roof", img: "/images/roof-materials/material-galvanised.webp" },
                    { v: "zincalume", label: "Zincalume", note: "Silver metal, more corrosion-resistant than galvanised", img: "/images/roof-materials/material-zincalume.webp" },
                    { v: "concreteTile", label: "Concrete tile", note: "The most common Adelaide roof type", img: "/images/roof-materials/material-concrete-tile.webp" },
                    { v: "terracotta", label: "Terracotta tile", note: "Traditional, often on older homes", img: "/images/roof-materials/material-terracotta.webp" },
                  ].map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => update("material", o.v)}
                      className={`${optionBase} flex items-center gap-3.5 ${form.material === o.v ? optionActive : optionInactive}`}
                    >
                      <span
                        className="h-14 w-14 shrink-0 rounded-md bg-teal-50 bg-cover bg-center"
                        style={{ backgroundImage: `url(${o.img})` }}
                      />
                      <span className="text-left">
                        <span className="block text-sm font-semibold text-ink">{o.label}</span>
                        <span className="block text-xs text-ink/50">{o.note}</span>
                      </span>
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => update("material", "notSure")}
                    className={`${optionBase} ${form.material === "notSure" ? optionActive : optionInactive}`}
                  >
                    <span className="block text-sm font-semibold text-ink">Not sure</span>
                    <span className="block text-xs text-ink/50">
                      We&apos;ll estimate using the most common Adelaide roof type
                    </span>
                  </button>
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={back} className="rounded-lg border-2 border-teal-100 px-5 py-3 text-sm font-semibold text-ink/70 hover:border-clay/50">
                    ← Back
                  </button>
                  <button type="button" onClick={next} className="flex-1 rounded-lg bg-ink px-6 py-3 font-semibold tracking-tight text-paper transition-all hover:bg-ink/85">
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP: CURRENT MATERIAL (replacement only) ── */}
            {step === "currentMaterial" && (
              <div>
                <h3 className="text-xl font-bold tracking-tight text-ink">
                  <span className="text-clay">Step {stepNumber}:</span> What&apos;s your roof made of right now?
                </h3>
                <p className="mt-1.5 text-sm text-ink/60">
                  Converting between materials (e.g. tile to metal) costs more than a like-for-like
                  swap, since the old roof needs to come off and the frame checked underneath.
                </p>
                <div className="mt-5 space-y-2.5">
                  {[
                    { v: "colorbond", label: "Colorbond (coloured steel)", note: "Lightest, typically most affordable", img: "/images/roof-materials/material-colorbond.webp" },
                    { v: "galvanised", label: "Galvanised steel", note: "Traditional silver corrugated metal roof", img: "/images/roof-materials/material-galvanised.webp" },
                    { v: "zincalume", label: "Zincalume", note: "Silver metal, more corrosion-resistant than galvanised", img: "/images/roof-materials/material-zincalume.webp" },
                    { v: "concreteTile", label: "Concrete tile", note: "The most common Adelaide roof type", img: "/images/roof-materials/material-concrete-tile.webp" },
                    { v: "terracotta", label: "Terracotta tile", note: "Traditional, often on older homes", img: "/images/roof-materials/material-terracotta.webp" },
                  ].map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => update("currentMaterial", o.v)}
                      className={`${optionBase} flex items-center gap-3.5 ${form.currentMaterial === o.v ? optionActive : optionInactive}`}
                    >
                      <span
                        className="h-14 w-14 shrink-0 rounded-md bg-teal-50 bg-cover bg-center"
                        style={{ backgroundImage: `url(${o.img})` }}
                      />
                      <span className="text-left">
                        <span className="block text-sm font-semibold text-ink">{o.label}</span>
                        <span className="block text-xs text-ink/50">{o.note}</span>
                      </span>
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => update("currentMaterial", "notSure")}
                    className={`${optionBase} ${form.currentMaterial === "notSure" ? optionActive : optionInactive}`}
                  >
                    <span className="block text-sm font-semibold text-ink">Not sure</span>
                    <span className="block text-xs text-ink/50">
                      We&apos;ll estimate using the most common Adelaide roof type
                    </span>
                  </button>
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={back} className="rounded-lg border-2 border-teal-100 px-5 py-3 text-sm font-semibold text-ink/70 hover:border-clay/50">
                    ← Back
                  </button>
                  <button type="button" onClick={next} className="flex-1 rounded-lg bg-ink px-6 py-3 font-semibold tracking-tight text-paper transition-all hover:bg-ink/85">
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP: DESIRED MATERIAL (replacement only) ── */}
            {step === "desiredMaterial" && (
              <div>
                <h3 className="text-xl font-bold tracking-tight text-ink">
                  <span className="text-clay">Step {stepNumber}:</span> What do you want your new roof to be?
                </h3>
                <p className="mt-1.5 text-sm text-ink/60">
                  Staying with the same type of material (e.g. metal to metal) is usually the
                  simpler, more affordable option.
                </p>
                <div className="mt-5 space-y-2.5">
                  {[
                    { v: "colorbond", label: "Colorbond (coloured steel)", note: "Lightest, typically most affordable", img: "/images/roof-materials/material-colorbond.webp" },
                    { v: "galvanised", label: "Galvanised steel", note: "Traditional silver corrugated metal roof", img: "/images/roof-materials/material-galvanised.webp" },
                    { v: "zincalume", label: "Zincalume", note: "Silver metal, more corrosion-resistant than galvanised", img: "/images/roof-materials/material-zincalume.webp" },
                    { v: "concreteTile", label: "Concrete tile", note: "The most common Adelaide roof type", img: "/images/roof-materials/material-concrete-tile.webp" },
                    { v: "terracotta", label: "Terracotta tile", note: "Traditional, often on older homes", img: "/images/roof-materials/material-terracotta.webp" },
                  ].map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => update("desiredMaterial", o.v)}
                      className={`${optionBase} flex items-center gap-3.5 ${form.desiredMaterial === o.v ? optionActive : optionInactive}`}
                    >
                      <span
                        className="h-14 w-14 shrink-0 rounded-md bg-teal-50 bg-cover bg-center"
                        style={{ backgroundImage: `url(${o.img})` }}
                      />
                      <span className="text-left">
                        <span className="block text-sm font-semibold text-ink">{o.label}</span>
                        <span className="block text-xs text-ink/50">{o.note}</span>
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={back} className="rounded-lg border-2 border-teal-100 px-5 py-3 text-sm font-semibold text-ink/70 hover:border-clay/50">
                    ← Back
                  </button>
                  <button type="button" onClick={next} className="flex-1 rounded-lg bg-ink px-6 py-3 font-semibold tracking-tight text-paper transition-all hover:bg-ink/85">
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP: COMPLEXITY / SHAPE ───────────── */}
            {step === "complexity" && (
              <div>
                <h3 className="text-xl font-bold tracking-tight text-ink">
                  <span className="text-clay">Step {stepNumber}:</span> Which shape is closest to your roof?
                </h3>
                <p className="mt-1.5 text-sm text-ink/60">
                  Take another look at the satellite view — more valleys, angles and levels mean
                  more labour, which is the biggest swing factor in most quotes.
                </p>
                <div className="mt-5 space-y-2.5">
                  {[
                    { v: "flat", tag: "Simple", label: "Flat or gently sloped roof", technical: "Skillion", img: "/images/roof-shapes/shape-flat-skillion.webp" },
                    { v: "gable", tag: "Simple", label: "A simple triangle-shaped roof", technical: "Gable", img: "/images/roof-shapes/shape-gable.webp" },
                    { v: "hip", tag: "Moderate", label: "A roof that slopes down on all four sides", technical: "Hip", img: "/images/roof-shapes/shape-hip.webp" },
                    { v: "dutchGable", tag: "Moderate to Complex", label: "A small peaked section on top of a sloped roof", technical: "Dutch Gable", img: "/images/roof-shapes/shape-dutch-gable.webp" },
                    { v: "multiLevel", tag: "Complex", label: "Multiple roof levels, angles or valleys", technical: "Complex / Multi-level", img: "/images/roof-shapes/shape-multi-level.webp" },
                  ].map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => update("complexity", o.v)}
                      className={`${optionBase} flex items-center gap-3.5 ${form.complexity === o.v ? optionActive : optionInactive}`}
                    >
                      <span
                        className="h-14 w-14 shrink-0 rounded-md bg-teal-50 bg-cover bg-center"
                        style={{ backgroundImage: `url(${o.img})` }}
                      />
                      <span className="text-left">
                        <span className="block text-sm font-semibold text-ink">
                          <span className="text-clay">{o.tag}</span> — {o.label}
                        </span>
                        <span className="block text-xs text-ink/50">{o.technical}</span>
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={back} className="rounded-lg border-2 border-teal-100 px-5 py-3 text-sm font-semibold text-ink/70 hover:border-clay/50">
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={goToEstimatePage}
                    className="flex-1 rounded-lg bg-clay px-6 py-3 font-bold tracking-tight text-ink transition-all hover:brightness-95"
                  >
                    See my estimate →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP: REPAIR AREAS (repairs only) ──── */}
            {step === "repairAreas" && (
              <div>
                <h3 className="text-xl font-bold tracking-tight text-ink">
                  <span className="text-clay">Step {stepNumber}:</span> How many areas need repair?
                </h3>
                <p className="mt-1.5 text-sm text-ink/60">
                  A rough count is fine — the roofer will confirm the exact scope on site.
                </p>
                <div className="mt-5 space-y-2.5">
                  {REPAIR_AREA_OPTIONS.map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => update("repairAreas", o.v)}
                      className={`${optionBase} ${form.repairAreas === o.v ? optionActive : optionInactive}`}
                    >
                      <span className="block text-sm font-semibold text-ink">{o.label}</span>
                      <span className="block text-xs text-ink/50">{o.note}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={back} className="rounded-lg border-2 border-teal-100 px-5 py-3 text-sm font-semibold text-ink/70 hover:border-clay/50">
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={goToEstimatePage}
                    className="flex-1 rounded-lg bg-clay px-6 py-3 font-bold tracking-tight text-ink transition-all hover:brightness-95"
                  >
                    See my estimate →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP: LEAK DURATION (leak only) ────── */}
            {step === "leakDuration" && (
              <div>
                <h3 className="text-xl font-bold tracking-tight text-ink">
                  <span className="text-clay">Step {stepNumber}:</span> How long has this been happening?
                </h3>
                <p className="mt-1.5 text-sm text-ink/60">
                  Helps the roofer judge urgency and how far the water may have spread.
                </p>
                <div className="mt-5 space-y-2.5">
                  {LEAK_DURATION_OPTIONS.map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => update("leakDuration", o.v)}
                      className={`${optionBase} ${form.leakDuration === o.v ? optionActive : optionInactive}`}
                    >
                      <span className="block text-sm font-semibold text-ink">{o.label}</span>
                      <span className="block text-xs text-ink/50">{o.note}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={back} className="rounded-lg border-2 border-teal-100 px-5 py-3 text-sm font-semibold text-ink/70 hover:border-clay/50">
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={goToEstimatePage}
                    className="flex-1 rounded-lg bg-clay px-6 py-3 font-bold tracking-tight text-ink transition-all hover:brightness-95"
                  >
                    See my estimate →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP: GUTTER LENGTH (gutters only) ─── */}
            {step === "gutterLength" && (
              <div>
                <h3 className="text-xl font-bold tracking-tight text-ink">
                  <span className="text-clay">Step {stepNumber}:</span> Roughly how many metres of guttering?
                </h3>
                <p className="mt-1.5 text-sm text-ink/60">
                  Not sure? A typical single-storey Adelaide home has around 25–35 metres.
                </p>
                <div className="mt-6">
                  <input
                    type="range"
                    min={10}
                    max={80}
                    step={5}
                    value={form.gutterLengthM}
                    onChange={(e) => update("gutterLengthM", Number(e.target.value))}
                    className="w-full accent-clay"
                  />
                  <div className="mt-2 text-center text-2xl font-extrabold text-ink">
                    {form.gutterLengthM} m
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={back} className="rounded-lg border-2 border-teal-100 px-5 py-3 text-sm font-semibold text-ink/70 hover:border-clay/50">
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={goToEstimatePage}
                    className="flex-1 rounded-lg bg-clay px-6 py-3 font-bold tracking-tight text-ink transition-all hover:brightness-95"
                  >
                    See my estimate →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: PERSISTENT MAP PANEL ────────────── */}
        <div className="relative min-h-[320px] bg-teal-50 lg:col-span-7 lg:min-h-full">
          <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-lg border border-teal-100 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink/60">
            <span className="h-2 w-2 animate-pulse rounded-full bg-clay" />
            Live Satellite View
          </div>

          {mapSrc ? (
            <iframe src={mapSrc} loading="lazy" title="Your roof" className="h-full w-full border-0" />
          ) : (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-2 px-8 text-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#BC5B3A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p className="text-sm text-ink/50">
                Enter your address to lock in the satellite view of your roof.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
