// app/page.js
//
// ⚠️ HOMEPAGE REBUILD PER adelaide-roofers-site-build-brief.md — DO NOT
// DEPLOY until the following pages exist, or these links 404:
//   /how-we-vet-our-roofers
//   /verify-a-roofer
//   /why-use-a-roofer-matching-service
//   /free-guide (gated ebook landing page)
//   /blog/tile-to-metal-roofing
//   /blog/roof-repair-cost-factors
//   /blog/roof-restoration-cost-adelaide
// See the resources grid + FAQ + ebook sections below — all live URLs are
// already pointed at their final intended paths so nothing needs revisiting
// once those pages are built.
//
// The FAQ section is self-contained (real <Link>s + its own JSON-LD schema)
// rather than routed through data/faqs.js + FaqList/FaqSchema, since those
// components' shape wasn't available to build against safely.
//
// Calculator section copy deliberately drops the brief's line "without
// giving up your phone number to find out" — /get-my-estimate requires
// name + mobile before revealing any number by design, so that claim
// would be false as shipped. Flag if you want the PRODUCT changed to
// match the copy instead.

import Link from "next/link";
import Image from "next/image";
import { regions } from "@/data/locations";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import RidgeDivider from "@/components/RidgeDivider";
import HeroCalculatorMini from "@/components/HeroCalculatorMini";
import ServicesSection from "@/components/ServicesSection";

export const metadata = {
  alternates: { canonical: site.url },
};

// ── FAQ DATA (self-contained — see note above) ─────────────────────────
const homeFaqs = [
  {
    q: "Is Adelaide Roofers a roofing company?",
    a: (
      <>
        No — we&apos;re a free matching service. South Australia&apos;s consumer regulator
        has a dedicated compliance team specifically targeting unlicensed building work,
        missing insurance, and misleading advertising in the building industry — a clear
        sign of how common these problems are. That&apos;s exactly why we built this
        service: we check licensing, confirm each roofer carries public liability,
        building indemnity insurance (BII), and workers compensation, and look at their
        track record — so you don&apos;t have to find out the hard way.{" "}
        <Link href="/how-we-vet-our-roofers" className="font-semibold text-clay underline-offset-2 hover:underline">
          Read how we vet roofers →
        </Link>
      </>
    ),
    aPlain:
      "No — we're a free matching service. We check licensing, confirm each roofer carries public liability, building indemnity insurance (BII), and workers compensation, and look at their track record before they join our network.",
  },
  {
    q: "Is it really free?",
    a: "Yes. We're paid by the roofer, not by you — there's nothing to pay us at any point.",
    aPlain: "Yes. We're paid by the roofer, not by you — there's nothing to pay us at any point.",
  },
  {
    q: "How much will my job cost?",
    a: (
      <>
        It depends on size, material, and condition —{" "}
        <Link href="/calculator" className="font-semibold text-clay underline-offset-2 hover:underline">
          try our free calculator
        </Link>{" "}
        for a real number in under two minutes, no phone call required.
      </>
    ),
    aPlain:
      "It depends on size, material, and condition — try our free calculator for a real number in under two minutes, no phone call required.",
  },
  {
    q: "How do I know if I need a repair or a full replacement?",
    a: (
      <>
        It depends how widespread the damage is and how old your roof is —{" "}
        <Link href="/calculator" className="font-semibold text-clay underline-offset-2 hover:underline">
          run the calculator either way
        </Link>{" "}
        for an instant estimate.
      </>
    ),
    aPlain:
      "It depends how widespread the damage is and how old your roof is — run the calculator either way for an instant estimate.",
  },
  {
    q: "Can I check a roofer's licence myself?",
    a: (
      <>
        Yes —{" "}
        <Link href="/verify-a-roofer" className="font-semibold text-clay underline-offset-2 hover:underline">
          use our free verify-a-roofer tool
        </Link>
        , the same register we use to vet our own network.
      </>
    ),
    aPlain: "Yes — use our free verify-a-roofer tool, the same register we use to vet our own network.",
  },
  {
    q: "What should I ask before hiring any roofer?",
    a: (
      <>
        More than we can fit here —{" "}
        <Link href="/free-guide" className="font-semibold text-clay underline-offset-2 hover:underline">
          get our free guide
        </Link>{" "}
        for the full list of questions and red flags to watch for.
      </>
    ),
    aPlain: "Get our free guide for the full list of questions and red flags to watch for.",
  },
  {
    q: "Which suburbs do you cover?",
    a: (
      <>
        Right across metropolitan Adelaide —{" "}
        <a href="#regions" className="font-semibold text-clay underline-offset-2 hover:underline">
          see the full suburb list
        </a>{" "}
        below.
      </>
    ),
    aPlain: "Right across metropolitan Adelaide — see the full suburb list below.",
  },
  {
    q: "What if I'm not happy with the roofer I'm matched with?",
    a: (
      <>
        Get in touch and we&apos;ll help sort it out —{" "}
        <a href="#contact" className="font-semibold text-clay underline-offset-2 hover:underline">
          contact us here
        </a>
        .
      </>
    ),
    aPlain: "Get in touch and we'll help sort it out — contact us via the form on this page.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.aPlain },
  })),
};

// ── RESOURCES / "LEARN BEFORE YOU CALL" GRID ────────────────────────────
const resourceCards = [
  {
    title: "How We Vet a Roofer",
    body: "What we actually check before any roofer joins our network — and how you can check one yourself, free.",
    href: "/how-we-vet-our-roofers",
  },
  {
    title: "Why Use a Roofer Matching Service?",
    body: "The real reason ringing around for quotes yourself is riskier than it looks.",
    href: "/why-use-a-roofer-matching-service",
  },
  {
    title: "Repair vs. Replace: Which Does Your Roof Need?",
    body: "A simple way to work out whether you need a $600 fix or a full replacement — plus a free instant estimate either way.",
    href: "/calculator",
  },
  {
    title: "What Actually Changes When You Go Tile-to-Metal",
    body: "Weight, solar compatibility, colour, and the one thing to check with your council first.",
    href: "/blog/tile-to-metal-roofing",
  },
  {
    title: "What Factors Affect the Cost of a Roof Repair",
    body: "Why two quotes for \"the same job\" can be thousands apart.",
    href: "/blog/roof-repair-cost-factors",
  },
  {
    title: "How Much Does Roof Restoration Cost in Adelaide?",
    body: "Real price ranges, and what changes the number for your home.",
    href: "/blog/roof-restoration-cost-adelaide",
  },
];

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero-home.webp)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/75 to-ink/40" aria-hidden="true" />
        <div className="relative mx-auto max-w-wrap px-5 py-20 md:py-28">
          <div className="reveal max-w-2xl text-paper">
            <span className="eyebrow text-clay">Roofing across metropolitan Adelaide</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Skip the guesswork. Get matched with a vetted local roofer.
            </h1>
            <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-paper/85">
              A new roof is a big purchase. We check licensing and insurance so you don&apos;t
              have to — then connect you with a roofer who actually works your suburb.
            </p>
            {/* Single CTA only, per brief — phone number lives in the persistent
                top bar (header), not here. */}
            <div className="mt-8">
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center rounded-xl bg-clay px-7 py-4 font-display text-lg font-bold tracking-tight text-ink transition hover:brightness-95"
              >
                Get an instant price estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE HELP ────────────────────────────────────── */}
      <section className="mx-auto max-w-wrap px-5 py-20">
        <span className="eyebrow text-clay">How we help</span>
        <h2 className="mt-2 max-w-4xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          There are over 100 roofers in Adelaide. The hard part is finding one you can trust.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {/* Card 1 — inverted colour to signal this is the lead point,
              not just one of three equal items */}
          <div className="group rounded-2xl bg-ink p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-clay text-ink">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M3 11.5 12 4l9 7.5" />
                <path d="M6 10v9.5h12V10" />
                <path d="M10 14.5l1.5 1.5L14.5 12" />
              </svg>
            </div>
            <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-paper">
              We take on the risk
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-paper/70">
              We check licensing, insurance, and track record before a roofer ever joins our
              network — so you don&apos;t have to.
            </p>
          </div>

          <div className="group rounded-2xl border border-mortar bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-clay hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-clay text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-ink">
              We match you locally
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-ink/65">
              A roofer who actually works your area, not the first ad that shows up.
            </p>
          </div>

          <div className="group rounded-2xl border border-mortar bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-clay hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-clay text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <rect x="5" y="3" width="14" height="18" rx="2" />
                <line x1="8" y1="7.5" x2="16" y2="7.5" />
                <line x1="8" y1="12" x2="8" y2="12" />
                <line x1="12" y1="12" x2="12" y2="12" />
                <line x1="16" y1="12" x2="16" y2="12" />
                <line x1="8" y1="15.5" x2="8" y2="15.5" />
                <line x1="12" y1="15.5" x2="12" y2="15.5" />
                <line x1="16" y1="15.5" x2="16" y2="15.5" />
              </svg>
            </div>
            <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-ink">
              We price it before you call
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-ink/65">
              Our free calculator gives you a real number in minutes, so you walk into every
              conversation already informed.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (chevron) — kept, slotted in ───────── */}
      <section id="how-it-works" className="mx-auto max-w-wrap px-5 pb-20 pt-6 md:pt-8">
        <span className="eyebrow text-clay">How it works</span>
        <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Three steps, no cost to you
        </h2>
        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
          {[
            {
              n: "1",
              t: "Tell us your suburb",
              d: "Call or fill in the form with your suburb and what's happening up top.",
              img: "/images/how-it-works/step-1-tell-us.webp",
            },
            {
              n: "2",
              t: "We connect you to the best local roofer",
              d: "We connect you with a vetted roofing contractor who works your part of Adelaide.",
              img: "/images/how-it-works/step-2-we-connect.webp",
            },
            {
              n: "3",
              t: "They take it from there",
              d: "The roofer contacts you to arrange a look and a quote. You deal with them directly.",
              img: "/images/how-it-works/step-3-they-take-over.webp",
            },
          ].map((s, i) => (
            <div key={s.n} className="relative flex h-full">
              <div className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-mortar bg-white transition hover:-translate-y-0.5 hover:border-clay hover:shadow-lg">
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.t}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-clay font-display text-base font-extrabold text-ink shadow-md">
                    {s.n}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold tracking-tight text-ink">{s.t}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink/65">{s.d}</p>
                </div>
              </div>
              {i < 2 && (
                <div
                  className="pointer-events-none absolute right-[-22px] top-[35%] z-10 hidden -translate-y-1/2 md:block"
                  aria-hidden="true"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#F5EFE6" stroke="#E2D6C3" />
                    <path d="M9 6l6 6-6 6" stroke="#BC5B3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CALCULATOR SECTION (3rd, before ebook) ──────────── */}
      <section className="mx-auto max-w-wrap px-5 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-start md:gap-16">
          <div>
            <span className="eyebrow text-clay">Know Before You Call</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              See what your job actually costs, before talking to a roofer.
            </h2>
            <p className="mt-4 font-body leading-relaxed text-ink/65">
              Enter your address, answer a few quick questions about your roof, and see how the
              price is built — no roofer, no obligation.
            </p>

            <ol className="mt-8 space-y-6">
              {[
                {
                  t: "Enter your address",
                  d: "See your roof on satellite imagery instantly.",
                },
                {
                  t: "Answer a few quick questions",
                  d: "Size, material, condition — takes about a minute.",
                },
                {
                  t: "Get your report",
                  d: "A detailed, itemised PDF sent as a download link straight to your phone, ready to save, share, or show a roofer on the spot.",
                },
              ].map((step, i) => (
                <li key={step.t} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-clay font-display text-sm font-extrabold text-ink">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display font-bold tracking-tight text-ink">{step.t}</p>
                    <p className="mt-1 font-body text-sm leading-relaxed text-ink/65">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <HeroCalculatorMini />
          </div>
        </div>
      </section>

      {/* ── REPAIR VS REPLACE (4th, new) ────────────────────── */}
      <section className="mx-auto max-w-wrap px-5 py-20 text-center">
        <h2 className="mx-auto max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Not sure if you need a repair or a full replacement?
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-ink/65">
          A few cracked tiles is a different problem to a roof that&apos;s leaking every winter.
          Answer a couple of quick questions and we&apos;ll point you in the right direction —
          then get an instant price estimate either way.
        </p>
        <div className="mt-7 flex justify-center">
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3.5 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
          >
            Check my roof →
          </Link>
        </div>
      </section>

      <RidgeDivider />

      {/* ── EBOOK (5th) ────────────────────────────────────── */}
      <section className="border-y border-mortar bg-paper">
        <div className="mx-auto max-w-wrap px-5 py-20">
          <div className="mx-auto grid max-w-3xl items-center gap-10 md:grid-cols-[200px_1fr]">
            <div className="mx-auto w-full max-w-[200px] md:mx-0">
              <Image
                src="/images/before-you-call-a-roofer-cover.jpg"
                alt="Before You Call a Roofer — the complete Adelaide homeowner's guide to getting a fair quote, finding a trustworthy roofer, and avoiding costly mistakes"
                width={765}
                height={1024}
                className="w-full rounded-lg shadow-xl"
              />
            </div>
            <div className="text-center md:text-left">
              <span className="eyebrow text-clay">Free 2026 Adelaide Roofing Buyer&apos;s Guide</span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
                Before You Call a Roofer
              </h2>
              <p className="mt-4 font-body text-ink/65">
                The complete Adelaide homeowner&apos;s guide to getting a fair quote, finding a
                trustworthy roofer, and avoiding costly mistakes. Free, straight to your inbox.
              </p>
              <div className="mt-7 flex justify-center md:justify-start">
                <Link
                  href="/free-guide"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-ink px-6 py-3.5 font-display font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
                >
                  Get the free guide →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES (6th) ───────────────────────────────────  */}
      <ServicesSection />

      {/* ── REGIONS — kept, slotted before the resources grid ── */}
      <section id="regions" className="border-y border-mortar bg-white">
        <div className="mx-auto max-w-wrap px-5 pt-12 pb-20 md:pt-14">
          <span className="eyebrow text-clay">Areas we cover</span>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Find your suburb
          </h2>
          <p className="mt-3 max-w-xl font-body text-ink/65">
            Adelaide Roofers covers suburbs right across the metro area. Choose your region to
            find your suburb.
          </p>
          <p className="mt-3 max-w-xl font-body text-sm text-ink/55">
            Don&apos;t see your suburb, or not sure which region you&apos;re in?{" "}
            <Link href="/calculator" className="font-semibold text-clay underline-offset-2 hover:underline">
              Use our roof calculator
            </Link>{" "}
            and we&apos;ll point you to a roofer who covers your area.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {Object.values(regions).map((r) => {
              const mapQuery = {
                "northern-suburbs": "Salisbury to Golden Grove, South Australia",
                "western-suburbs": "Port Adelaide to Glenelg, South Australia",
                "eastern-suburbs": "Burnside to Norwood, South Australia",
                "southern-suburbs": "Morphett Vale to Christies Beach, South Australia",
              }[r.slug];
              const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
                mapQuery
              )}&z=11&output=embed`;

              return (
                <Link
                  key={r.slug}
                  href={`/${r.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-mortar bg-paper transition hover:border-clay"
                >
                  <div className="relative aspect-[3/2] w-full overflow-hidden">
                    <iframe
                      src={mapSrc}
                      loading="lazy"
                      title={`Map of ${r.name}`}
                      className="pointer-events-none h-full w-full border-0"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="pointer-events-none absolute bottom-4 left-5 z-10">
                      <h3 className="font-display text-2xl font-bold tracking-tight text-paper">{r.name}</h3>
                      <p className="mt-1 font-body text-sm text-paper/80">
                        {r.suburbs.length} suburbs covered
                      </p>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="inline-block font-display text-sm font-semibold text-clay">
                      View suburbs →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── RESOURCES GRID — "Learn Before You Call" (7th, new) ──
          ⚠️ 5 of 6 cards link to pages that don't exist yet. See
          the file header comment for the full list. */}
      <section className="mx-auto max-w-wrap px-5 py-20">
        <span className="eyebrow text-clay">Learn before you call</span>
        <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Everything you need to know first
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resourceCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group block rounded-2xl border border-mortar bg-white p-6 transition hover:border-clay"
            >
              <h3 className="font-display text-base font-bold tracking-tight text-ink">
                {card.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink/65">{card.body}</p>
              <span className="mt-4 inline-block font-display text-sm font-semibold text-clay">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FAQ (8th, full rebuild) ──────────────────────────── */}
      <section className="border-t border-mortar bg-white">
        <div className="mx-auto max-w-wrap px-5 py-20">
          <span className="eyebrow text-clay">Common questions</span>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            How it works — common questions
          </h2>
          <div className="mt-10 divide-y divide-mortar border-y border-mortar">
            {homeFaqs.map((item) => (
              <div key={item.q} className="py-6">
                <h3 className="font-display text-base font-bold tracking-tight text-ink">
                  {item.q}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/65">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT (final section) ─────────────────────────── */}
      <section id="contact" className="mx-auto max-w-wrap px-5 py-20 text-center">
        <h2 className="mx-auto max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Roof leaking, or just looking tired?
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-ink/65">
          Tell us your suburb and what&apos;s going on with your roof, and we&apos;ll match you
          with a vetted local roofer.
        </p>
        <div className="mx-auto mt-8 max-w-lg text-left">
          <ContactForm />
        </div>
        <p className="mt-6 font-body text-sm text-ink/50">
          Prefer to talk it through first?{" "}
          <a href={site.phoneHref} className="font-semibold text-clay underline-offset-2 hover:underline">
            Call {site.phoneDisplay}
          </a>
        </p>
      </section>
    </main>
  );
}
