"use client";
// app/calculator/page.js
//
// Calculator page — recolored to match the light teal/clay theme now used
// inside RoofCalculator.jsx itself (previously dark slate/teal). Linked to
// from the home page hero + calculator pitch section.

import Link from "next/link";
import RoofCalculator from "@/components/RoofCalculator";

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-paper px-4 py-10 text-ink md:p-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink/60 hover:text-ink"
        >
          ← Back to Adelaide Roofers
        </Link>

        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-tight text-ink md:text-2xl">
            🏠 Instant Roof Estimate
          </h1>
          <p className="mt-2 text-sm text-ink/75 md:text-base">
            Free, no-obligation ballpark estimate for Adelaide homeowners.{" "}
            <span className="font-semibold text-clay">
              You&apos;ll get a detailed PDF texted straight to your phone at the end
            </span>{" "}
            — no charge, no catch.
          </p>
        </div>

        <RoofCalculator />
      </div>
    </main>
  );
}
