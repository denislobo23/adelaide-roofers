// app/free-guide/page.js
//
// Ebook landing page. The email capture form below is UI only for now;
// it does NOT submit anywhere yet. Tomorrow's task: wire handleSubmit to
// Kit's API (add subscriber, tag "ebook-guide"), then reveal the instant
// download link on success (per the earlier decision — Kit sends the
// welcome email, but we also show the download immediately since the PDF
// itself isn't the scarce thing, the email address is).
//
// Ebook file already exists in the repo at ebook/before-you-call-a-roofer.pdf
// — needs to be moved to /public or Supabase Storage before the download
// link can go live. Not done as part of today's copy pass.
//
// Cover image: public/images/before-you-call-a-roofer-cover.jpg
// (photographic 3D mockup, not the earlier SVG illustration — swapped in
// once the real asset existed).

import Image from "next/image";
import { site } from "@/data/config";
import EbookCaptureForm from "@/components/EbookCaptureForm";

export const metadata = {
  title: "Free Guide: Before You Call a Roofer | Adelaide Roofers",
  description:
    "The complete Adelaide homeowner's guide to getting a fair quote, finding a trustworthy roofer, and avoiding costly mistakes.",
  alternates: { canonical: `${site.url}/free-guide` },
};

const CONTENTS = [
  "The three main roofing materials — their pros, cons, lifespan, and which is best for your home",
  "How roofing quotes are really calculated so you can spot overpriced or suspicious estimates",
  "What happens on installation day, from preparation through to final inspection",
  "Repair, restore or replace? A simple framework to help you make the right decision",
  "The subcontractor question that many homeowners forget to ask — and why it matters",
  "What your warranty actually covers, including the common mistakes that can void it",
  "Real Adelaide roofing price ranges for 2026, so you know what you should expect to pay",
  "A 60-second pre-signing checklist to review before accepting any roofing quote",
];

export default function FreeGuidePage() {
  return (
    <main className="min-h-screen bg-paper">
      <section className="mx-auto max-w-wrap px-5 py-20 md:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[280px_1fr] md:gap-14">
          {/* ── COVER IMAGE ────────────────────────────────── */}
          <div className="mx-auto w-full max-w-[280px] md:sticky md:top-24 md:mx-0">
            <Image
              src="/images/before-you-call-a-roofer-cover.jpg"
              alt="Before You Call a Roofer — the complete Adelaide homeowner's guide to getting a fair quote, finding a trustworthy roofer, and avoiding costly mistakes"
              width={765}
              height={1024}
              className="w-full rounded-lg"
              priority
            />
          </div>

          {/* ── PITCH + CONTENTS + FORM ────────────────────── */}
          <div>
            <span className="eyebrow text-clay">Free 2026 Adelaide Roofing Buyer&apos;s Guide</span>
            <h1 className="mt-3 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-ink md:text-4xl">
              Before You Call a Roofer
            </h1>
            <p className="mt-5 font-body leading-relaxed text-ink/70">
              Buying a new roof or restoring an existing one can cost thousands of dollars. One
              wrong decision can leave you paying far more than you should — or dealing with
              problems that surface years later.
            </p>
            <p className="mt-4 font-body leading-relaxed text-ink/70">
              This free guide shows Adelaide homeowners how to compare quotes with confidence,
              choose the right roofing contractor, and avoid the expensive mistakes that catch
              many people out.
            </p>

            <h2 className="mt-8 font-display text-sm font-bold uppercase tracking-wider text-ink/50">
              Inside You&apos;ll Discover
            </h2>
            <ul className="mt-4 space-y-3">
              {CONTENTS.map((item) => (
                <li key={item} className="flex gap-3 font-body text-sm leading-relaxed text-ink/75">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 h-4 w-4 shrink-0 text-clay"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            {/* ── EMAIL CAPTURE ────────────────────────────── */}
            <div className="mt-10 max-w-md rounded-2xl border-2 border-clay/50 bg-white p-6 shadow-xl md:p-8">
              <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                Download Your Free Copy Today
              </h3>
              <p className="mt-1.5 font-body text-sm text-ink/60">
                Enter your email below and we&apos;ll send the 2026 Adelaide Roofing Buyer&apos;s
                Guide straight to your inbox. It&apos;s completely free and could save you
                thousands on your next roofing project.
              </p>

              <div className="mt-5">
                <EbookCaptureForm />
              </div>

              <p className="mt-4 text-center font-body text-xs text-ink/45">
                No spam. No sales pressure. Just practical advice to help you make an informed
                decision.
              </p>
            </div>

            <p className="mt-6 font-body text-sm text-ink/50">
              Would rather just get a price?{" "}
              <a
                href="/calculator"
                className="font-semibold text-clay underline-offset-2 hover:underline"
              >
                Try the free calculator
              </a>{" "}
              instead.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
