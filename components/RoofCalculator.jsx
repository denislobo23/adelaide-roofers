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

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { normaliseAnswers, liveRange, ASBESTOS_RESTORE_MESSAGE, SLATE_PAINT_MESSAGE, RANGE_LABEL } from "@/lib/pricing";
import { suburbFromAddress, tidyAddress } from "@/lib/formatAddress";
import AddressSearch from "@/components/AddressSearch";
import { satelliteEmbedSrc } from "@/lib/satelliteEmbed";
import TrustStrip from "@/components/TrustStrip";

// Simple line icons (24×24, stroke = currentColor) for the job-type cards.
const JOB_ICONS = {
  // house roof with sparkle: restoration
  restoration: (
    <>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9.5h13V10" />
      <path d="M18.5 2.5v3M17 4h3" />
    </>
  ),
  // roof with arrows: replacement
  replacement: (
    <>
      <path d="M3 12 12 4.5 21 12" />
      <path d="M6 10.5V19h12v-8.5" />
      <path d="M9.5 15.5a2.6 2.6 0 0 1 4.6-1.4M14.5 13v1.6h-1.6" />
    </>
  ),
  // wrench: repairs
  repairs: (
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L4 16.8V20h3.2l5.3-5.3a4 4 0 0 0 5.2-5.4l-2.4 2.4-2.3-.6-.6-2.3z" />
  ),
  // water drop: leak
  leak: <path d="M12 3.5s-6 6.6-6 10.8a6 6 0 0 0 12 0C18 10.1 12 3.5 12 3.5z" />,
  // paint roller: painting
  painting: (
    <>
      <rect x="4" y="3.5" width="13" height="5" rx="1.2" />
      <path d="M17 6h2.5v4.5H11V14" />
      <rect x="9.5" y="14" width="3" height="6.5" rx="1" />
    </>
  ),
  // gutter + downpipe: gutters
  gutters: (
    <>
      <path d="M3 6h18l-1.5 4h-15z" />
      <path d="M16 10v7a3 3 0 0 0 3 3h1.5" />
    </>
  ),
};

const JOB_TYPES = [
  { v: "restoration", label: "Roof Restoration", note: "Clean, re-bed, re-point, re-coat" },
  { v: "replacement", label: "Roof Replacement", note: "Full re-roof or tile-to-metal conversion" },
  { v: "repairs", label: "Roof Repairs", note: "A specific problem, not a full job" },
  { v: "leak", label: "Roof Leak Repair", note: "Tracing and fixing an active leak" },
  { v: "painting", label: "Roof Painting / Re-Coating", note: "Sealing and refreshing the roof" },
  { v: "gutters", label: "Gutter Repairs", note: "Gutters and downpipes, priced together" },
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

// The answer each step needs before Continue is enabled. Nothing is
// preselected: every step starts unanswered.
const STEP_FIELD = {
  jobType: "jobType",
  size: "roofSizeM2",
  storeys: "storeys",
  material: "material",
  currentMaterial: "currentMaterial",
  desiredMaterial: "desiredMaterial",
  complexity: "complexity",
  repairAreas: "repairAreas",
  leakDuration: "leakDuration",
  gutterLength: "gutterLengthM",
};

const TYPICAL_ROOF_M2 = 200;
// Job types with a roof-size step, where a satellite size suggestion helps.
const SIZE_JOB_TYPES = ["restoration", "replacement", "painting"];
const TYPICAL_GUTTER_M = 25;

const MATERIALS = [
  { v: "colorbond", label: "Colorbond", note: "Coloured steel sheet", img: "/images/roof-materials/photo-colorbond.webp" },
  { v: "galvanised", label: "Galvanised steel", note: "Silver corrugated iron", img: "/images/roof-materials/material-galvanised.webp" },
  { v: "zincalume", label: "Zincalume", note: "Bright silver steel", img: "/images/roof-materials/material-zincalume.webp" },
  { v: "pressedMetal", label: "Pressed metal tiles", note: "Decramastic, stone-chip finish", img: "/images/roof-materials/photo-pressed-metal.webp" },
  { v: "concreteTile", label: "Concrete tile", note: "Most common in Adelaide", img: "/images/roof-materials/photo-concrete-tile.webp" },
  { v: "terracotta", label: "Terracotta tile", note: "Clay tiles, older homes", img: "/images/roof-materials/photo-terracotta.webp" },
  { v: "slate", label: "Slate", note: "Heritage homes, thin grey slates", img: "/images/roof-materials/photo-slate.webp" },
  { v: "asbestos", label: "Asbestos (fibro)", note: "Requires a licensed removalist", img: "/images/roof-materials/photo-asbestos.webp" },
];

function MaterialGrid({ value, onChange, exclude = [], allowNotSure = true }) {
  const options = MATERIALS.filter((m) => !exclude.includes(m.v));
  return (
    <div className="mt-5 grid grid-cols-2 gap-2.5">
      {options.map((o) => {
        const active = value === o.v;
        return (
          <button
            key={o.v}
            type="button"
            onClick={() => onChange(o.v)}
            aria-pressed={active}
            className={`group overflow-hidden rounded-xl border-2 bg-white text-left transition-all ${
              active ? "border-clay ring-2 ring-clay/30" : "border-mortar hover:border-clay/60"
            }`}
          >
            <span className="relative block aspect-[4/3] w-full overflow-hidden bg-mortar/40">
              <Image src={o.img} alt="" fill sizes="(min-width: 1024px) 190px, 45vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
              {active && (
                <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-clay text-white shadow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                </span>
              )}
            </span>
            <span className="block px-3 py-2">
              <span className="block text-sm font-semibold text-ink">{o.label}</span>
              <span className="block text-xs text-ink/55">{o.note}</span>
            </span>
          </button>
        );
      })}
      {allowNotSure && (
        <button
          type="button"
          onClick={() => onChange("notSure")}
          aria-pressed={value === "notSure"}
          className={`col-span-2 rounded-xl border-2 bg-white px-4 py-3 text-left transition-all ${
            value === "notSure" ? "border-clay ring-2 ring-clay/30" : "border-mortar hover:border-clay/60"
          }`}
        >
          <span className="block text-sm font-semibold text-ink">Not sure</span>
          <span className="block text-xs text-ink/55">We&apos;ll estimate using the most common Adelaide roof type</span>
        </button>
      )}
      {options.some((o) => o.v === "pressedMetal") && (
        <p className="col-span-2 text-[10px] text-ink/40">
          Pressed metal tile photo:{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Red_metal_tile_on_a_home.jpg" target="_blank" rel="noopener nofollow" className="underline">
            MetalJean
          </a>
          , CC BY 3.0, cropped.
        </p>
      )}
    </div>
  );
}

const money = (n) => `$${Math.round(n).toLocaleString("en-AU")}`;

// Side panel price: the range across every answer still to come, so it
// narrows as each step is answered (see liveRange in lib/pricing.js).
function LivePrice({ form, locked }) {
  const range = liveRange(form);
  const widest = liveRange({ jobType: form.jobType });
  if (!range) {
    return (
      <div className="mt-8 rounded-xl border-2 border-dashed border-mortar px-4 py-3 text-sm text-ink/60">
        Your price range appears here once you choose a job, and narrows with every answer.
      </div>
    );
  }
  const span = Math.max(widest.high - widest.low, 1);
  const left = ((range.low - widest.low) / span) * 100;
  const width = Math.max(((range.high - range.low) / span) * 100, 3);
  if (locked) {
    // Last step: the exact range is only sent by SMS/PDF after name + mobile.
    // The real figures are never put in the page, so the blur can't be undone.
    return (
      <div className="mt-8 rounded-xl border-2 border-clay/40 bg-paper px-4 py-3.5" aria-live="polite">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-clay">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          Your range is ready
        </div>
        <div className="mt-1 select-none font-display text-2xl font-extrabold tracking-tight text-ink blur-[7px]" aria-hidden="true">
          $0,000 – $00,000
        </div>
        <p className="mt-2 text-sm font-medium text-ink/80">
          Where should we text it, with the itemised breakdown?
        </p>
        <p className="mt-1 text-xs text-ink/55">Answer the last question, then add your name and mobile.</p>
      </div>
    );
  }
  const done = range.answered === range.total;
  return (
    <div className="mt-8 rounded-xl border-2 border-mortar bg-paper px-4 py-3.5" aria-live="polite">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink/55">
          {done ? "Your estimate" : "Your estimate so far"}
        </span>
        <span className="text-xs text-ink/50">
          {range.answered}/{range.total} answered
        </span>
      </div>
      <div className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink">
        {range.answered === 0 ? (
          <span className="text-base font-semibold text-ink/70">Answer a few questions to see your range</span>
        ) : (
          <>{money(range.low)} – {money(range.high)}</>
        )}
      </div>
      {range.answered > 0 && (
      <div className="relative mt-2.5 h-2 overflow-hidden rounded-full bg-mortar" aria-hidden="true">
        <div
          className="absolute inset-y-0 rounded-full bg-clay transition-all duration-500 ease-out"
          style={{ left: `${left}%`, width: `${width}%` }}
        />
      </div>
      )}
      <p className="mt-2 text-xs text-ink/55">
        {done ? RANGE_LABEL : "Narrows as you answer. " + RANGE_LABEL + "."}
      </p>
    </div>
  );
}

function PrimaryButton({ onClick, disabled, tone = "ink", children }) {
  const enabled =
    tone === "clay"
      ? "bg-clay font-bold text-ink hover:brightness-95"
      : "bg-ink font-semibold text-paper hover:bg-ink/85";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 rounded-lg px-6 py-3 tracking-tight transition-all ${
        disabled ? "cursor-not-allowed bg-ink/10 font-semibold text-ink/45" : enabled
      }`}
    >
      {children}
    </button>
  );
}

// true on lg screens (≥1024px), false below, null until known (client only).
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

export default function RoofCalculator() {
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const [stepIndex, setStepIndex] = useState(0);
  // Latest state of the address box: { text, pick, manualOk, typedSuburb }.
  const [addressBox, setAddressBox] = useState({ text: "", pick: null, manualOk: false });
  const [selectedCoords, setSelectedCoords] = useState(null);

  const [form, setForm] = useState({
    jobType: "",
    address: "",
    suburb: "",
    roofSizeM2: null,
    // True only if the customer tapped "Use … m²" on the satellite
    // suggestion and kept that size. Saved on the lead.
    roofSizeFromSatellite: false,
    storeys: "",
    material: "",
    currentMaterial: "",
    desiredMaterial: "",
    complexity: "",
    repairAreas: "",
    leakDuration: "",
    gutterLengthM: null,
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
        const address = tidyAddress(prefill.address);
        const suburb = prefill.suburb || suburbFromAddress(address);
        setForm((f) => ({ ...f, address, suburb }));
        setAddressBox({ text: address, pick: { address, suburb, lat: prefill.lat ?? null, lon: prefill.lon ?? null, exact: prefill.exact === true }, manualOk: false });
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
  const remaining = steps.length - 1 - stepIndex;
  const progressText =
    step === "address"
      ? "Takes about a minute"
      : !form.jobType
      ? "A few quick questions"
      : remaining > 1
      ? `${remaining} more questions`
      : remaining === 1
      ? "1 more question"
      : "Last question";
  // Before a job type is chosen we don't know the flow length; assume 6.
  const progressPct = Math.round(((stepIndex + 1) / (form.jobType ? steps.length : 6)) * 100);
  const field = STEP_FIELD[step];
  const canContinue = !field || (form[field] !== "" && form[field] !== null && form[field] !== undefined);

  const next = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const back = () => setStepIndex((i) => Math.max(i - 1, 0));
  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  // ── Satellite roof-size suggestion (Google Solar, via /api/roof-estimate) ──
  // Asked for once per picked address, only when OpenStreetMap had the
  // house number (so the point is the house) and the job has a size step.
  // It's only ever a suggestion: nothing is filled in until the customer
  // taps "Use … m²". No answer, an error or the switch being off simply
  // means no card. See docs/solar-autofill-plan.md.
  const pick = addressBox.pick;
  const solarKey = pick?.exact && pick.lat != null && pick.lon != null ? `${pick.lat},${pick.lon}` : null;
  const wantsSize = SIZE_JOB_TYPES.includes(form.jobType);
  const [roofSuggestion, setRoofSuggestion] = useState(null); // { key, areaM2, shape }
  const solarAsked = useRef(null);
  useEffect(() => {
    if (!solarKey || !wantsSize || solarAsked.current === solarKey) return;
    solarAsked.current = solarKey;
    const [lat, lon] = solarKey.split(",");
    fetch(`/api/roof-estimate?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`)
      .then((res) => (res.ok ? res.json() : {}))
      .then((d) => {
        if (d?.areaM2) setRoofSuggestion({ key: solarKey, areaM2: d.areaM2, shape: d.shape || null });
      })
      .catch(() => {});
  }, [solarKey, wantsSize]);
  // Only for the address currently picked.
  const suggestion = roofSuggestion && roofSuggestion.key === solarKey ? roofSuggestion : null;

  // Setting the size any other way clears the satellite flag, unless the
  // value is still exactly the suggested one.
  const setRoofSize = (m2, fromSatellite = false) =>
    setForm((f) => ({
      ...f,
      roofSizeM2: m2,
      roofSizeFromSatellite: fromSatellite || (f.roofSizeFromSatellite && m2 === f.roofSizeM2),
    }));

  const chooseJobType = (v) => {
    update("jobType", v);
  };

  const onAddressChange = useCallback((box) => {
    setAddressBox(box);
    setForm((f) => ({
      ...f,
      address: box.pick ? box.pick.address : tidyAddress(box.text),
      suburb: box.pick ? box.pick.suburb : box.typedSuburb || suburbFromAddress(box.text),
    }));
    setSelectedCoords(box.pick?.lat != null ? { lat: box.pick.lat, lon: box.pick.lon } : null);
  }, []);
  // Continue with a chosen suggestion, or (if the lookup is down or can't
  // find it) with the address as typed.
  const addressReady = !!addressBox.pick || addressBox.manualOk;

  const mapSrc = selectedCoords ? satelliteEmbedSrc(selectedCoords.lat, selectedCoords.lon) : null;

  const goToEstimatePage = () => {
    sessionStorage.setItem(
      "roofEstimateAnswers",
      JSON.stringify(normaliseAnswers({ ...form, address: tidyAddress(form.address) }))
    );
    router.push("/get-my-estimate");
  };

  const isLastStep = stepIndex === steps.length - 1;

  const inputClasses =
    "w-full rounded-lg border-2 border-mortar bg-white px-3.5 py-3 text-sm text-ink placeholder-ink/35 outline-none transition-all focus:border-clay";
  const optionBase = "w-full rounded-lg border-2 p-4 text-left transition-all";
  const optionActive = "border-clay bg-clay/10";
  const optionInactive = "border-mortar bg-white hover:border-clay/60";

  return (
    <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border-2 border-clay/50 bg-white shadow-2xl">
      <div className="grid min-h-[560px] lg:grid-cols-12">
        {/* ── LEFT: QUESTIONS PANEL ─────────────────── */}
        <div className="flex flex-col justify-between border-b border-mortar p-6 md:p-8 lg:col-span-5 lg:border-b-0 lg:border-r">
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-clay">{progressText}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-mortar">
                <div
                  className="h-full rounded-full bg-clay transition-all duration-500 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {isDesktop === false && mapSrc && (
              <div className="relative mb-5 h-36 overflow-hidden rounded-xl border-2 border-mortar bg-mortar/40">
                <iframe src={mapSrc} title="Your roof" className="absolute inset-0 h-full w-full border-0" />
                <span className="pointer-events-none absolute left-2 top-2 rounded-md bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink/60">
                  Your roof
                </span>
              </div>
            )}

            <div key={step} className="calc-step-in">

            {/* ── STEP: JOB TYPE ─────────────────────── */}
            {step === "jobType" && (
              <div>
                <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-ink">
                  What do you need done?
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
                      className={`${optionBase} flex items-center gap-3.5 ${form.jobType === o.v ? optionActive : optionInactive}`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                          form.jobType === o.v ? "bg-clay text-white" : "bg-paper text-clay"
                        }`}
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          {JOB_ICONS[o.v]}
                        </svg>
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-ink">{o.label}</span>
                        <span className="block text-xs text-ink/50">{o.note}</span>
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={back} className="rounded-lg border-2 border-mortar px-5 py-3 text-sm font-semibold text-ink/70 hover:border-clay/60">
                    ← Back
                  </button>
                  <PrimaryButton tone="clay" onClick={next} disabled={!canContinue}>
                    Continue →
                  </PrimaryButton>
                </div>
              </div>
            )}

            {/* ── STEP: ADDRESS ─────────────────────── */}
            {step === "address" && (
              <div>
                <h3 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink">
                  Where&apos;s the roof?
                </h3>
                <p className="mt-2 text-base text-ink/70">
                  Start with your address. We&apos;ll pull up a satellite view of your roof, then
                  ask a few quick questions for a price range.
                </p>

                <AddressSearch
                  className="mt-5"
                  initialText={addressBox.text}
                  initialPick={addressBox.pick}
                  onChange={onAddressChange}
                />

                <div className="mt-5 flex">
                  <PrimaryButton tone="clay" onClick={next} disabled={!addressReady}>
                    {addressReady
                      ? addressBox.pick
                        ? "That's my roof →"
                        : "Use this address →"
                      : "Pick your address from the list"}
                  </PrimaryButton>
                </div>
              </div>
            )}

            {/* ── STEP: SIZE ─────────────────────────── */}
            {step === "size" && (
              <div>
                <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-ink">
                  Roughly how big is your roof?
                </h3>
                <p className="mt-1.5 text-sm text-ink/60">
                  Not sure exactly? A rough guess is fine — this is an estimate, not a measurement.
                </p>
                {suggestion && (
                  <div className="mt-5 rounded-xl border-2 border-clay/40 bg-clay/5 p-4">
                    <p className="text-sm text-ink">
                      Satellite data suggests your roof is about{" "}
                      <strong className="font-extrabold">{suggestion.areaM2} m²</strong>
                    </p>
                    <button
                      type="button"
                      onClick={() => setRoofSize(suggestion.areaM2, true)}
                      className="mt-3 rounded-lg bg-clay px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:brightness-95"
                    >
                      Use {suggestion.areaM2} m²
                    </button>
                    <p className="mt-2 text-[11px] text-ink/50">Source: Includes solar data from Google</p>
                  </div>
                )}
                <div className="mt-6">
                  <input
                    type="range"
                    min={80}
                    max={500}
                    step={10}
                    value={form.roofSizeM2 ?? TYPICAL_ROOF_M2}
                    onChange={(e) => setRoofSize(Number(e.target.value))}
                    onClick={(e) => setRoofSize(Number(e.currentTarget.value))}
                    aria-label="Roof size in square metres"
                    className={`w-full accent-clay ${form.roofSizeM2 == null ? "opacity-50" : ""}`}
                  />
                  <div className="mt-2 text-center text-2xl font-extrabold text-ink">
                    {form.roofSizeM2 == null ? (
                      <span className="text-base font-semibold text-ink/45">Drag the slider to set your roof size</span>
                    ) : (
                      <>{form.roofSizeM2} m²</>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setRoofSize(TYPICAL_ROOF_M2)}
                    className="mx-auto mt-2 block text-xs font-semibold text-clay underline-offset-2 hover:underline"
                  >
                    Not sure? Use a typical {TYPICAL_ROOF_M2} m²
                  </button>
                  <p className="mt-1 text-center text-xs text-ink/45">
                    A typical 4-bedroom Adelaide home is around 220–260 m² of roof.
                  </p>
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={back} className="rounded-lg border-2 border-mortar px-5 py-3 text-sm font-semibold text-ink/70 hover:border-clay/60">
                    ← Back
                  </button>
                  <PrimaryButton onClick={next} disabled={!canContinue}>
                    Continue →
                  </PrimaryButton>
                </div>
              </div>
            )}

            {/* ── STEP: STOREYS ──────────────────────── */}
            {step === "storeys" && (
              <div>
                <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-ink">
                  Single or double storey?
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
                          : "border-mortar bg-white text-ink/80 hover:border-clay/60"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={back} className="rounded-lg border-2 border-mortar px-5 py-3 text-sm font-semibold text-ink/70 hover:border-clay/60">
                    ← Back
                  </button>
                  <PrimaryButton onClick={next} disabled={!canContinue}>
                    Continue →
                  </PrimaryButton>
                </div>
              </div>
            )}

            {/* ── STEP: MATERIAL ─────────────────────── */}
            {step === "material" && (
              <div>
                <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-ink">
                  What&apos;s your roof made of?
                </h3>
                <p className="mt-1.5 text-sm text-ink/60">
                  Check the satellite view{" "}
                  <span className="hidden lg:inline">on the right</span>
                  <span className="lg:hidden">above</span>: smooth, even panels usually mean metal; a
                  ridged pattern usually means tile.
                </p>
                <MaterialGrid value={form.material} onChange={(v) => update("material", v)} />
                {form.material === "slate" && form.jobType === "painting" && (
                  <p className="mt-3 rounded-lg border-2 border-clay/40 bg-clay/5 px-3.5 py-2.5 text-xs text-ink/70">
                    ⚠ {SLATE_PAINT_MESSAGE}
                  </p>
                )}
                {form.material === "asbestos" &&
                  (form.jobType === "restoration" || form.jobType === "painting") && (
                  <p className="mt-3 rounded-lg border-2 border-clay/40 bg-clay/5 px-3.5 py-2.5 text-xs text-ink/70">
                    ⚠ {ASBESTOS_RESTORE_MESSAGE}
                  </p>
                )}
                {form.material === "asbestos" &&
                  form.jobType !== "restoration" &&
                  form.jobType !== "painting" && (
                  <p className="mt-3 rounded-lg border-2 border-clay/40 bg-clay/5 px-3.5 py-2.5 text-xs text-ink/70">
                    ⚠ Asbestos roofing must be handled by a licensed removalist. This estimate is a
                    rough placeholder for planning purposes — your actual quote may vary more than
                    usual until a specialist has assessed the roof in person.
                  </p>
                )}
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={back} className="rounded-lg border-2 border-mortar px-5 py-3 text-sm font-semibold text-ink/70 hover:border-clay/60">
                    ← Back
                  </button>
                  <PrimaryButton onClick={next} disabled={!canContinue}>
                    Continue →
                  </PrimaryButton>
                </div>
              </div>
            )}

            {/* ── STEP: CURRENT MATERIAL (replacement only) ── */}
            {step === "currentMaterial" && (
              <div>
                <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-ink">
                  What&apos;s your roof made of right now?
                </h3>
                <p className="mt-1.5 text-sm text-ink/60">
                  Converting between materials (e.g. tile to metal) costs more than a like-for-like
                  swap, since the old roof needs to come off and the frame checked underneath.
                </p>
                <MaterialGrid value={form.currentMaterial} onChange={(v) => update("currentMaterial", v)} />
                {form.currentMaterial === "asbestos" && (
                  <p className="mt-3 rounded-lg border-2 border-clay/40 bg-clay/5 px-3.5 py-2.5 text-xs text-ink/70">
                    ⚠ Asbestos roofing must be removed by a licensed removalist, regardless of what
                    you&apos;re replacing it with. This estimate is a rough placeholder for planning
                    purposes — your actual quote may vary more than usual until a specialist has
                    assessed the roof in person.
                  </p>
                )}
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={back} className="rounded-lg border-2 border-mortar px-5 py-3 text-sm font-semibold text-ink/70 hover:border-clay/60">
                    ← Back
                  </button>
                  <PrimaryButton onClick={next} disabled={!canContinue}>
                    Continue →
                  </PrimaryButton>
                </div>
              </div>
            )}

            {/* ── STEP: DESIRED MATERIAL (replacement only) ── */}
            {step === "desiredMaterial" && (
              <div>
                <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-ink">
                  What do you want your new roof to be?
                </h3>
                <p className="mt-1.5 text-sm text-ink/60">
                  Staying with the same type of material (e.g. metal to metal) is usually the
                  simpler, more affordable option.
                </p>
                <MaterialGrid value={form.desiredMaterial} onChange={(v) => update("desiredMaterial", v)} exclude={["asbestos"]} allowNotSure={false} />
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={back} className="rounded-lg border-2 border-mortar px-5 py-3 text-sm font-semibold text-ink/70 hover:border-clay/60">
                    ← Back
                  </button>
                  <PrimaryButton onClick={next} disabled={!canContinue}>
                    Continue →
                  </PrimaryButton>
                </div>
              </div>
            )}

            {/* ── STEP: COMPLEXITY / SHAPE ───────────── */}
            {step === "complexity" && (
              <div>
                <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-ink">
                  Which shape is closest to your roof?
                </h3>
                <p className="mt-1.5 text-sm text-ink/60">
                  Take another look at the satellite view{" "}
                  <span className="hidden lg:inline">on the right</span>
                  <span className="lg:hidden">above</span> — more valleys, angles and levels mean
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
                        {suggestion?.shape === o.v && (
                          <span className="mt-1 inline-block rounded-full bg-ink/5 px-2 py-0.5 text-[11px] font-semibold text-ink/60">
                            Looks like this from satellite
                          </span>
                        )}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={back} className="rounded-lg border-2 border-mortar px-5 py-3 text-sm font-semibold text-ink/70 hover:border-clay/60">
                    ← Back
                  </button>
                  <PrimaryButton tone="clay" onClick={goToEstimatePage} disabled={!canContinue}>
                    See my estimate →
                  </PrimaryButton>
                </div>
              </div>
            )}

            {/* ── STEP: REPAIR AREAS (repairs only) ──── */}
            {step === "repairAreas" && (
              <div>
                <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-ink">
                  How many areas need repair?
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
                  <button type="button" onClick={back} className="rounded-lg border-2 border-mortar px-5 py-3 text-sm font-semibold text-ink/70 hover:border-clay/60">
                    ← Back
                  </button>
                  <PrimaryButton tone="clay" onClick={goToEstimatePage} disabled={!canContinue}>
                    See my estimate →
                  </PrimaryButton>
                </div>
              </div>
            )}

            {/* ── STEP: LEAK DURATION (leak only) ────── */}
            {step === "leakDuration" && (
              <div>
                <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-ink">
                  How long has this been happening?
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
                  <button type="button" onClick={back} className="rounded-lg border-2 border-mortar px-5 py-3 text-sm font-semibold text-ink/70 hover:border-clay/60">
                    ← Back
                  </button>
                  <PrimaryButton tone="clay" onClick={goToEstimatePage} disabled={!canContinue}>
                    See my estimate →
                  </PrimaryButton>
                </div>
              </div>
            )}

            {/* ── STEP: GUTTER LENGTH (gutters only) ─── */}
            {step === "gutterLength" && (
              <div>
                <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-ink">
                  Roughly how many metres of guttering?
                </h3>
                <p className="mt-1.5 text-sm text-ink/60">
                  Not sure? A typical single-storey Adelaide home has around 25–35 metres. The
                  price includes downpipes.
                </p>
                <div className="mt-6">
                  <input
                    type="range"
                    min={10}
                    max={80}
                    step={5}
                    value={form.gutterLengthM ?? TYPICAL_GUTTER_M}
                    onChange={(e) => update("gutterLengthM", Number(e.target.value))}
                    onClick={(e) => update("gutterLengthM", Number(e.currentTarget.value))}
                    aria-label="Gutter length in metres"
                    className={`w-full accent-clay ${form.gutterLengthM == null ? "opacity-50" : ""}`}
                  />
                  <div className="mt-2 text-center text-2xl font-extrabold text-ink">
                    {form.gutterLengthM == null ? (
                      <span className="text-base font-semibold text-ink/45">Drag the slider to set the length</span>
                    ) : (
                      <>{form.gutterLengthM} m</>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => update("gutterLengthM", TYPICAL_GUTTER_M)}
                    className="mx-auto mt-2 block text-xs font-semibold text-clay underline-offset-2 hover:underline"
                  >
                    Not sure? Use a typical {TYPICAL_GUTTER_M} m
                  </button>
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={back} className="rounded-lg border-2 border-mortar px-5 py-3 text-sm font-semibold text-ink/70 hover:border-clay/60">
                    ← Back
                  </button>
                  <PrimaryButton tone="clay" onClick={goToEstimatePage} disabled={!canContinue}>
                    See my estimate →
                  </PrimaryButton>
                </div>
              </div>
            )}
            </div>
          </div>
          {step !== "address" && <LivePrice form={form} locked={isLastStep && !!form.jobType} />}
        </div>

        {/* ── RIGHT: PERSISTENT MAP PANEL ────────────── */}
        <div className="relative hidden min-h-[320px] bg-teal-50 lg:col-span-7 lg:block lg:min-h-full">
          <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-lg border border-teal-100 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink/60">
            <span className="h-2 w-2 animate-pulse rounded-full bg-clay" />
            Live Satellite View
          </div>

          {mapSrc ? (
            isDesktop && <iframe src={mapSrc} loading="lazy" title="Your roof" className="absolute inset-0 h-full w-full border-0" />
          ) : (
            <>
              <Image src="/images/calculator-aerial-blur.webp" alt="" fill sizes="(min-width: 1024px) 600px, 1px" className="object-cover" priority />
              <div className="absolute inset-0 bg-ink/25" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-10 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BC5B3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <p className="max-w-xs rounded-lg bg-white/90 px-4 py-2 text-sm font-medium text-ink shadow">
                  Pick your address and your roof appears here from above.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <TrustStrip />
    </div>
  );
}
