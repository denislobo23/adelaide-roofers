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
// GA4 lead tracking: fires a `generate_lead` event once /api/send-estimate
// confirms success, mirroring the same fix already applied to ContactForm
// — previously calculator leads landed in Supabase/SMS/email but were
// invisible to GA4's Lead acquisition report.
//
// Pricing lives in lib/pricing.js (shared with /api/send-estimate).

import { useEffect, useState } from "react";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";
import { site } from "@/data/config";
import { estimateCost } from "@/lib/pricing";

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
        sendGAEvent("event", "generate_lead", {
          lead_source: "roof_calculator",
        });
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
