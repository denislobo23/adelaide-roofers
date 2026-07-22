"use client";
// app/get-my-estimate/page.js
//
// Reached from /calculator. Reads the roof answers from sessionStorage,
// then REQUIRES Full Name + Mobile + Timeframe. On submit, calls
// /api/send-estimate which generates the PDF, uploads it, and texts the
// link. The screen NEVER reveals the estimate figures — a fake number
// gets nothing, exactly as designed. Only a "check your phone" holding
// state is shown on success.
//
// Added: optional "email me a copy too" capture on the success screen,
// deliberately AFTER submission — not on the form itself — so it can't
// cost any conversion on the actual estimate flow. Saves via
// /api/save-email, matched back to this exact lead by ref_number.
//
// ⚠️ Pricing calculation below is still PLACEHOLDER — see the shared
// logic notes in lib/estimateBreakdown.js. Once Wally's real rates are
// captured, only the rate tables need updating.

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/data/config";

const FULL_JOB_PRICING = {
  baseRatePerM2: 45,
  storeyMultiplier: { single: 1, double: 1.35 },
  complexityMultiplier: { flat: 1, gable: 1.05, hip: 1.2, dutchGable: 1.35, multiLevel: 1.5 },
  materialMultiplier: { colorbond: 1, galvanised: 0.9, zincalume: 0.95, concreteTile: 1.15, terracotta: 1.3, notSure: 1.15 },
  minimumJob: 3200,
  jobTypeFactor: { restoration: 1, replacement: 1.6, painting: 0.55 },
  // Replacement-specific: converting BETWEEN material types (e.g. tile to
  // metal) costs more than a like-for-like swap, since the old roof has to
  // come off and the frame/battens checked before the new material goes on.
  sameTypeConversionFactor: 1, // metal→metal, or tile→tile (any tile combo)
  crossTypeConversionFactor: 1.3, // tile→metal or metal→tile
  conservativeMargin: 1.15, // INTERNAL ONLY — never shown to the customer
};

// "notSure" is treated as tile for conversion purposes, since concrete tile
// is the most common Adelaide roof type.
function materialGroup(material) {
  return ["colorbond", "galvanised", "zincalume"].includes(material) ? "metal" : "tile";
}

const REPAIR_PRICING = {
  baseByAreaCount: { one: 450, few: 950, many: 1800 },
  storeyMultiplier: { single: 1, double: 1.3 },
  materialMultiplier: { colorbond: 1, galvanised: 0.9, zincalume: 0.95, concreteTile: 1.1, terracotta: 1.2, notSure: 1.1 },
  minimumJob: 350,
  conservativeMargin: 1.15,
};

const LEAK_PRICING = {
  baseByDuration: { just_noticed: 400, few_weeks: 550, months: 750, recurring: 950 },
  storeyMultiplier: { single: 1, double: 1.3 },
  materialMultiplier: { colorbond: 1, galvanised: 0.9, zincalume: 0.95, concreteTile: 1.1, terracotta: 1.2, notSure: 1.1 },
  minimumJob: 350,
  conservativeMargin: 1.15,
};

const GUTTER_PRICING = {
  baseRatePerMetre: 55,
  storeyMultiplier: { single: 1, double: 1.25 },
  minimumJob: 900,
  conservativeMargin: 1.15,
};

function rangeFrom(total) {
  const low = Math.round((total * 0.85) / 100) * 100;
  const high = Math.round((total * 1.15) / 100) * 100;
  return { low, high };
}

function estimateCost(answers) {
  const { jobType } = answers;

  if (jobType === "repairs") {
    const raw =
      REPAIR_PRICING.baseByAreaCount[answers.repairAreas] *
      REPAIR_PRICING.storeyMultiplier[answers.storeys] *
      REPAIR_PRICING.materialMultiplier[answers.material] *
      REPAIR_PRICING.conservativeMargin;
    return rangeFrom(Math.max(raw, REPAIR_PRICING.minimumJob));
  }

  if (jobType === "leak") {
    const raw =
      LEAK_PRICING.baseByDuration[answers.leakDuration] *
      LEAK_PRICING.storeyMultiplier[answers.storeys] *
      LEAK_PRICING.materialMultiplier[answers.material] *
      LEAK_PRICING.conservativeMargin;
    return rangeFrom(Math.max(raw, LEAK_PRICING.minimumJob));
  }

  if (jobType === "gutters") {
    const raw =
      answers.gutterLengthM *
      GUTTER_PRICING.baseRatePerMetre *
      GUTTER_PRICING.storeyMultiplier[answers.storeys] *
      GUTTER_PRICING.conservativeMargin;
    return rangeFrom(Math.max(raw, GUTTER_PRICING.minimumJob));
  }

  const jobFactor = FULL_JOB_PRICING.jobTypeFactor[jobType] ?? 1;

  if (jobType === "replacement") {
    const conversionFactor =
      materialGroup(answers.currentMaterial) === materialGroup(answers.desiredMaterial)
        ? FULL_JOB_PRICING.sameTypeConversionFactor
        : FULL_JOB_PRICING.crossTypeConversionFactor;

    const raw =
      answers.roofSizeM2 *
      FULL_JOB_PRICING.baseRatePerM2 *
      FULL_JOB_PRICING.storeyMultiplier[answers.storeys] *
      FULL_JOB_PRICING.complexityMultiplier[answers.complexity] *
      FULL_JOB_PRICING.materialMultiplier[answers.desiredMaterial] *
      conversionFactor *
      jobFactor *
      FULL_JOB_PRICING.conservativeMargin;
    return rangeFrom(Math.max(raw, FULL_JOB_PRICING.minimumJob));
  }

  const raw =
    answers.roofSizeM2 *
    FULL_JOB_PRICING.baseRatePerM2 *
    FULL_JOB_PRICING.storeyMultiplier[answers.storeys] *
    FULL_JOB_PRICING.complexityMultiplier[answers.complexity] *
    FULL_JOB_PRICING.materialMultiplier[answers.material] *
    jobFactor *
    FULL_JOB_PRICING.conservativeMargin;
  return rangeFrom(Math.max(raw, FULL_JOB_PRICING.minimumJob));
}

const TIMEFRAME_OPTIONS = [
  { v: "immediately", label: "Immediately / ASAP" },
  { v: "few_weeks", label: "Within the next few weeks" },
  { v: "1_3_months", label: "In the next 1–3 months" },
  { v: "exploring", label: "Just exploring, no rush" },
];

export default function GetMyEstimatePage() {
  const [answers, setAnswers] = useState(null);
  const [form, setForm] = useState({ name: "", mobile: "", timeframe: "" });
  const [status, setStatus] = useState("form"); // form | sending | sent | sms_failed | error
  const [refNumber, setRefNumber] = useState(null);

  // Optional post-submit email capture — entirely separate from the main
  // form's status, since it can't block or interfere with the estimate
  // the customer already successfully got.
  const [emailCapture, setEmailCapture] = useState({ email: "", status: "idle" }); // idle | saving | saved | error

  useEffect(() => {
    const raw = sessionStorage.getItem("roofEstimateAnswers");
    if (raw) setAnswers(JSON.parse(raw));
  }, []);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim() || !form.timeframe) {
      setStatus("error");
      return;
    }
    setStatus("sending");

    const estimate = estimateCost(answers);

    try {
      const res = await fetch("/api/send-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name: form.name, mobile: form.mobile },
          answers,
          estimate,
          timeframe: form.timeframe,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setRefNumber(data.refNumber || null);
        setStatus("sent");
      } else if (data.reason === "sms_failed") {
        setStatus("sms_failed");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Failed to submit estimate request:", err);
      setStatus("error");
    }
  };

  const handleEmailCapture = async (e) => {
    e.preventDefault();
    if (!emailCapture.email.trim() || !refNumber) return;
    setEmailCapture((s) => ({ ...s, status: "saving" }));
    try {
      const res = await fetch("/api/save-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refNumber, email: emailCapture.email }),
      });
      const data = await res.json();
      setEmailCapture((s) => ({ ...s, status: data.success ? "saved" : "error" }));
    } catch (err) {
      console.error("Failed to save email:", err);
      setEmailCapture((s) => ({ ...s, status: "error" }));
    }
  };

  if (!answers) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-paper px-5 py-24 text-center">
        <div>
          <h1 className="text-2xl font-bold text-ink">Let&apos;s start with your roof</h1>
          <p className="mt-3 text-ink/70">
            We couldn&apos;t find your answers — head back and use the calculator first.
          </p>
          <Link
            href="/calculator"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3.5 font-bold tracking-tight text-ink transition-all hover:brightness-95"
          >
            Go to the calculator
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-paper px-5 py-16 md:py-24">
      <div className="mx-auto max-w-lg">
        {status === "sent" ? (
          <div className="rounded-2xl border-2 border-clay/50 bg-white p-6 text-center shadow-2xl md:p-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-clay/10 text-clay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-ink">Check your phone</h1>
            <p className="mt-3 text-ink/70">
              We&apos;ve texted <span className="font-semibold text-ink">{form.mobile}</span>{" "}
              with the link to your full estimate for <span className="text-ink">{answers.address}</span>,
              including the itemised breakdown.
            </p>
            <p className="mt-4 text-sm text-ink/50">
              Didn&apos;t get it? Call us on{" "}
              <a href={site.phoneHref} className="font-semibold text-clay">{site.phoneDisplay}</a>{" "}
              and we&apos;ll help directly.
            </p>

            {/* Optional email capture — only shown if we actually have a
                ref_number to attach it to. */}
            {refNumber && (
              <div className="mt-6 border-t border-teal-100 pt-6 text-left">
                {emailCapture.status === "saved" ? (
                  <p className="text-center text-sm text-clay">
                    Done — a copy will also come through by email.
                  </p>
                ) : (
                  <form onSubmit={handleEmailCapture} className="space-y-2.5">
                    <label htmlFor="capture-email" className="block text-center text-sm text-ink/70">
                      Want a copy emailed too, for safekeeping?
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="capture-email"
                        type="email"
                        value={emailCapture.email}
                        onChange={(e) =>
                          setEmailCapture((s) => ({ ...s, email: e.target.value }))
                        }
                        placeholder="you@example.com"
                        className="min-w-0 flex-1 rounded-lg border-2 border-teal-100 bg-white px-3.5 py-2.5 text-sm text-ink placeholder-ink/35 outline-none transition-all focus:border-clay"
                      />
                      <button
                        type="submit"
                        disabled={emailCapture.status === "saving" || !emailCapture.email.trim()}
                        className="shrink-0 rounded-lg bg-clay px-4 py-2.5 text-sm font-semibold text-ink transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {emailCapture.status === "saving" ? "Sending…" : "Send"}
                      </button>
                    </div>
                    {emailCapture.status === "error" && (
                      <p className="text-center text-xs text-rose-600">
                        Couldn&apos;t save that — the text with your estimate still went through fine.
                      </p>
                    )}
                    <p className="text-center text-xs text-ink/50">Optional — totally fine to skip.</p>
                  </form>
                )}
              </div>
            )}

            <Link
              href="/"
              className="mt-6 inline-block text-sm font-medium text-ink/60 hover:text-ink"
            >
              ← Back to Adelaide Roofers
            </Link>
          </div>
        ) : status === "sms_failed" ? (
          <div className="rounded-2xl border-2 border-clay/50 bg-white p-6 text-center shadow-2xl md:p-8">
            <h1 className="text-2xl font-bold tracking-tight text-ink">
              We couldn&apos;t reach that number
            </h1>
            <p className="mt-3 text-ink/70">
              We&apos;ve saved your details, but the text to <span className="text-ink">{form.mobile}</span>{" "}
              didn&apos;t go through. Please check the number, or call us directly and we&apos;ll
              sort it out.
            </p>
            <a
              href={site.phoneHref}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3.5 font-bold tracking-tight text-ink transition-all hover:brightness-95"
            >
              Call {site.phoneDisplay}
            </a>
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-clay/50 bg-white p-6 shadow-2xl md:p-8">
            <h1 className="text-2xl font-bold tracking-tight text-ink">
              Where should we send your estimate?
            </h1>
            <p className="mt-2 text-sm text-ink/70">
              Enter your details and we&apos;ll text you a link where you can download a
              detailed breakdown of the estimate, including material costs.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-ink/70">
                  Full Name <span className="text-clay">*</span>
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="mt-1 w-full rounded-lg border-2 border-teal-100 bg-white px-3.5 py-3 text-sm text-ink placeholder-ink/35 outline-none transition-all focus:border-clay"
                />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-xs font-semibold text-ink/70">
                  Mobile <span className="text-clay">*</span>
                </label>
                <input
                  id="mobile"
                  type="tel"
                  required
                  value={form.mobile}
                  onChange={(e) => update("mobile", e.target.value)}
                  className="mt-1 w-full rounded-lg border-2 border-teal-100 bg-white px-3.5 py-3 text-sm text-ink placeholder-ink/35 outline-none transition-all focus:border-clay"
                />
              </div>

              <div>
                <label htmlFor="timeframe" className="block text-xs font-semibold text-ink/70">
                  When do you want to begin? <span className="text-clay">*</span>
                </label>
                <select
                  id="timeframe"
                  required
                  value={form.timeframe}
                  onChange={(e) => update("timeframe", e.target.value)}
                  className="mt-1 w-full rounded-lg border-2 border-teal-100 bg-white px-3.5 py-3 text-sm text-ink outline-none transition-all focus:border-clay"
                >
                  <option value="" disabled>
                    Select a timeframe…
                  </option>
                  {TIMEFRAME_OPTIONS.map((o) => (
                    <option key={o.v} value={o.v}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {status === "error" && (
                <p className="text-sm text-rose-600">
                  Something went wrong sending your estimate. Please check your details and try
                  again, or call us on {site.phoneDisplay}.
                </p>
              )}

              <p className="text-xs text-ink/50">
                We use your data solely to send you this estimate and connect you with a vetted
                local roofer. We will never share your details with anyone else.
              </p>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-lg bg-clay px-6 py-3.5 font-bold tracking-tight text-ink transition-all hover:brightness-95 disabled:opacity-60"
              >
                {status === "sending" ? "Sending your estimate…" : "Get My Estimate"}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
