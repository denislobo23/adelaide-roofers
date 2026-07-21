"use client";
// components/ArticleSidebar.jsx
//
// Sticky sidebar for long-form article pages (how-we-vet-our-roofers,
// why-use-a-roofer-matching-service, the 3 blog posts). Deliberately does
// NOT embed the live calculator widget — that was built for a roomy
// 2-column homepage section and would feel cramped in a narrow article
// margin. Instead: two lightweight static cards (ebook cover, calculator
// teaser) that both link out to the real thing. Stays visible while
// scrolling a long article, instead of the only CTA being one link at
// the very bottom that most readers never reach.

import Link from "next/link";
import Image from "next/image";

export default function ArticleSidebar() {
  return (
    <aside className="h-fit space-y-5 md:sticky md:top-24">
      {/* Calculator teaser */}
      <div className="rounded-2xl border-2 border-clay/50 bg-white p-5 shadow-lg">
        <h3 className="font-display text-base font-bold tracking-tight text-ink">
          Know before you call
        </h3>
        <p className="mt-1.5 font-body text-sm leading-relaxed text-ink/65">
          Get a real, itemised roof estimate in under two minutes.
        </p>
        <Link
          href="/calculator"
          className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-clay px-4 py-2.5 font-display text-sm font-bold tracking-tight text-ink transition hover:brightness-95"
        >
          Try the free calculator →
        </Link>
      </div>

      {/* Ebook teaser */}
      <div className="rounded-2xl border border-mortar bg-white p-5 shadow-lg">
        <Link href="/free-guide" className="block">
          <Image
            src="/images/before-you-call-a-roofer-cover.jpg"
            alt="Before You Call a Roofer — free Adelaide homeowner's guide"
            width={765}
            height={1024}
            className="w-full rounded-lg"
          />
        </Link>
        <h3 className="mt-4 font-display text-base font-bold tracking-tight text-ink">
          Before You Call a Roofer
        </h3>
        <p className="mt-1.5 font-body text-sm leading-relaxed text-ink/65">
          The free guide to a fair quote, a trustworthy roofer, and avoiding costly mistakes.
        </p>
        <Link
          href="/free-guide"
          className="mt-4 inline-flex w-full items-center justify-center rounded-lg border-2 border-ink px-4 py-2.5 font-display text-sm font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
        >
          Get the free guide →
        </Link>
      </div>
    </aside>
  );
}
