"use client";
// components/HeroCalculatorMini.jsx
//
// Compact address-entry card for the hero section. Uses the same address
// box (components/AddressSearch.jsx, OpenStreetMap lookup) and satellite map as
// the full calculator (components/RoofCalculator.jsx), but stays small —
// just the address step. Once an address is selected, hands off to /calculator with the
// address pre-filled via sessionStorage, so the visitor lands straight on
// the job-type question instead of re-entering their address.
//
// Styled to match the full calculator's first step: "Where's the roof?",
// a large address box with a pin, the blurred Adelaide aerial until an
// address is picked, solid buttons and the shared trust strip.

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { suburbFromAddress, tidyAddress } from "@/lib/formatAddress";
import AddressSearch from "@/components/AddressSearch";
import TrustStrip from "@/components/TrustStrip";

export default function HeroCalculatorMini() {
  const router = useRouter();
  // Latest state of the address box: { text, pick, manualOk, typedSuburb }.
  const [box, setBox] = useState({ text: "", pick: null, manualOk: false });
  const ready = !!box.pick || box.manualOk;

  const mapSrc =
    box.pick?.lat != null
      ? `https://maps.google.com/maps?q=${box.pick.lat},${box.pick.lon}&z=20&t=k&output=embed`
      : null;

  const continueToCalculator = () => {
    sessionStorage.setItem(
      "heroPrefillAddress",
      JSON.stringify(
        box.pick
          ? box.pick
          : {
              address: tidyAddress(box.text),
              suburb: box.typedSuburb || suburbFromAddress(box.text),
              lat: null,
              lon: null,
            }
      )
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

        <AddressSearch className="mt-5" onChange={setBox} />

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
          disabled={!ready}
          onClick={continueToCalculator}
          className={`mt-5 w-full rounded-xl px-6 py-4 font-display text-lg font-bold tracking-tight transition-all ${
            ready
              ? "bg-clay text-white shadow-md hover:brightness-95"
              : "cursor-not-allowed bg-ink/10 text-ink/45"
          }`}
        >
          {ready
            ? box.pick
              ? "That's my roof →"
              : "Use this address →"
            : "Pick your address first"}
        </button>
      </div>
      <TrustStrip compact />
    </div>
  );
}
