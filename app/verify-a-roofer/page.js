"use client";
// app/verify-a-roofer/page.js
//
// Per the site build brief: "Simple tool: two fields (roofer/business
// name, licence number if known), button labelled 'Check on the SA
// licence register' that opens [the government register] in a new tab...
// No fake 'checking...' animation — it's a shortcut to the real tool, not
// a proxy for it."
//
// CBS doesn't publish a public API, so this can't be a real live lookup —
// see the build note in verify-a-roofer-page-copy.docx for why. What it
// DOES do: copies whatever the person typed to the clipboard, then opens
// the real register in a new tab so they can paste it straight in. Small
// thing, but it's the honest version of "help", not a fake progress bar.
//
// Note: this file needs metadata exported from a server component, but
// the interactive form needs "use client" — so metadata lives in
// layout.js for this route segment (app/verify-a-roofer/layout.js),
// not here. See that file.

import { useState } from "react";
import Link from "next/link";
import { site } from "@/data/config";

const REGISTER_URL = "https://www.sa.gov.au/topics/business-and-trade/licensing/licence-check";

export default function VerifyARooferPage() {
  const [name, setName] = useState("");
  const [licenceNumber, setLicenceNumber] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCheck = async () => {
    const toCopy = [name, licenceNumber].filter(Boolean).join(" — ");
    if (toCopy && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(toCopy);
        setCopied(true);
      } catch {
        // Clipboard can fail (permissions, older browsers) — not fatal,
        // the register still opens either way.
      }
    }
    window.open(REGISTER_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen bg-paper px-5 py-16 md:py-24">
      <div className="mx-auto max-w-lg text-center">
        <span className="eyebrow text-clay">Free tool</span>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          Verify a Roofer
        </h1>
        <p className="mt-4 font-body leading-relaxed text-ink/70">
          Check any South Australian roofer&apos;s licence status, free — the same register we use
          before referring anyone.{" "}
          <Link href="/how-we-vet-our-roofers" className="font-semibold text-clay underline-offset-2 hover:underline">
            See everything else we check →
          </Link>
        </p>

        <div className="mt-8 rounded-2xl border border-mortar bg-white p-6 text-left shadow-sm md:p-8">
          <label htmlFor="va-name" className="block text-xs font-semibold text-ink/60">
            Roofer or business name
          </label>
          <input
            id="va-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Smith Roofing"
            className="mt-1 w-full rounded-lg border border-mortar bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-clay"
          />

          <label htmlFor="va-licence" className="mt-4 block text-xs font-semibold text-ink/60">
            Licence number (if you have it)
          </label>
          <input
            id="va-licence"
            value={licenceNumber}
            onChange={(e) => setLicenceNumber(e.target.value)}
            placeholder="Optional"
            className="mt-1 w-full rounded-lg border border-mortar bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-clay"
          />

          <button
            type="button"
            onClick={handleCheck}
            className="mt-6 w-full rounded-lg bg-clay px-6 py-3.5 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
          >
            Check on the SA licence register →
          </button>

          <p className="mt-3 text-center font-body text-xs text-ink/50">
            {copied
              ? "Copied — paste it into the search box on the page that just opened."
              : "Opens South Australia's official register in a new tab. We don't see or store what you search."}
          </p>
        </div>

        <p className="mt-8 font-body text-sm text-ink/50">
          Would rather skip the checking altogether?{" "}
          <Link href="/#contact" className="font-semibold text-clay underline-offset-2 hover:underline">
            Tell us your suburb
          </Link>{" "}
          and we&apos;ll match you with someone who&apos;s already passed every check, or{" "}
          <a href={site.phoneHref} className="font-semibold text-clay underline-offset-2 hover:underline">
            call {site.phoneDisplay}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
