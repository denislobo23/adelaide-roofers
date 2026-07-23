// app/faq/page.js
import Link from "next/link";
import { site } from "@/data/config";
import CallButton from "@/components/CallButton";
import RidgeDivider from "@/components/RidgeDivider";

// Central FAQ hub — the deep, comprehensive set. Suburb pages carry their
// own 1-2 local questions and link back here rather than repeating this
// whole set (avoids 32 near-identical FAQ blocks, which risks Google
// treating them as duplicate content).
//
// Grouped into 6 themes so the page reads clearly and each section can
// carry its own internal links where a short FAQ answer naturally leads
// somewhere deeper (the calculator, a service page, an article).
//
// `topics` on each question is a lightweight tag set — not consumed by
// anything yet, but intended for a future shared "related content"
// component that surfaces relevant FAQs/articles/services by shared tag
// instead of hand-linking every pair individually.

const faqGroups = [
  {
    heading: "Cost & pricing",
    items: [
      {
        q: "How much does a roof replacement cost in Adelaide?",
        a: "It varies widely with roof size, pitch, material and access, so there's no single honest number. As a rough starting point, get a free itemised estimate using our calculator — it's not a substitute for an on-site quote, but it gives you a real ballpark in under two minutes.",
        topics: ["cost", "replacement"],
        link: { href: "/calculator", label: "Try the free calculator" },
      },
      {
        q: "Why do roofing quotes vary so much between contractors?",
        a: "Differences in materials, labour rates, how thoroughly the roofer inspects the job, and what's actually included (waste removal, warranty, access equipment) all affect price. A big gap between two quotes is worth asking about directly, not just picking the cheaper one.",
        topics: ["cost"],
      },
      {
        q: "Is a cheaper quote ever a red flag?",
        a: "It can be — unusually low quotes sometimes mean corners are being cut on materials, insurance, or licensing, or the price will change once work starts. It's not automatically a scam, but it's worth asking exactly what's included before accepting.",
        topics: ["cost", "trust"],
      },
      {
        q: "Does insurance ever cover roof replacement or repair?",
        a: "Sometimes — storm and sudden damage are often covered, while general wear-and-tear usually isn't. A roofer can document the damage and provide the evidence you'd need for a claim, but whether it's actually covered is between you and your insurer.",
        topics: ["cost", "insurance"],
      },
      {
        q: "Are there financing options for roofing work?",
        a: "Some contractors offer payment plans or financing for larger jobs like a full replacement, though it varies roofer to roofer. It's worth asking directly when you're matched with someone, since we don't arrange financing ourselves.",
        topics: ["cost"],
      },
    ],
  },
  {
    heading: "Licensing, insurance & trust",
    items: [
      {
        q: "Do I need a licensed roofer for small repairs, or just big jobs?",
        a: "Licensing requirements apply to building work generally, not just large jobs, though the rules vary by job type and value. The safer default is to only use licensed, insured roofers regardless of job size — which is exactly what we check before connecting you with someone.",
        topics: ["licensing", "trust"],
        link: { href: "/how-we-vet-our-roofers", label: "See how we vet our roofers" },
      },
      {
        q: "What's the difference between public liability and building indemnity insurance?",
        a: "Public liability covers injury or property damage caused during the work — say, a tile falling and damaging something below. Building indemnity insurance protects you if the roofer can't complete the job or fix defects later, for example if they go out of business. Both matter, and a properly insured roofer should hold each.",
        topics: ["licensing", "insurance", "trust"],
      },
      {
        q: "What happens if a roofer does bad work and won't fix it?",
        a: "A proper written warranty is your main protection here — it's why we only connect you with roofers who offer one. If you ever have a dispute with a roofer we've connected you with, let us know directly and we'll help however we can, though the contract for the work itself is between you and them.",
        topics: ["trust", "warranty"],
      },
      {
        q: "How long should a roofing warranty last, and what should it cover?",
        a: "It depends on the job — a small repair typically carries a shorter warranty than a full restoration or replacement, which can run for many years. What matters most is that it's written down and specific about what's covered, not just a verbal assurance.",
        topics: ["warranty", "trust"],
      },
      {
        q: "Can strata/body corporate properties use this service?",
        a: "Yes — tell us it's a strata or body corporate property when you get in touch, and we'll connect you with a roofer comfortable working with the approvals and communication that involves.",
        topics: ["process"],
      },
    ],
  },
  {
    heading: "Materials & roof types",
    items: [
      {
        q: "Colorbond vs tile — which lasts longer in Adelaide's climate?",
        a: "Both can last decades with proper maintenance. Colorbond is lighter and holds up very well, especially coastal grades in salt-exposed suburbs; tile is durable and quiet in rain but heavier. Which suits your home depends on the structure, budget and look you want.",
        topics: ["materials", "colorbond"],
        link: { href: "/services/colorbond-roofing", label: "More on Colorbond & metal roofing" },
      },
      {
        q: "How do I know if my roof has asbestos, and what do I do about it?",
        a: "Corrugated cement sheet roofing on a home built before the early 1980s is the main giveaway, though it isn't always obvious just by looking. Don't drill, cut or disturb it — a licensed asbestos removalist needs to handle any work involving it, by law in South Australia.",
        topics: ["materials", "asbestos"],
        link: { href: "/services/asbestos-roof-removal", label: "Read more on asbestos roof removal" },
      },
      {
        q: "Can I install solar panels on any roof type?",
        a: "Generally yes, though the installation approach differs by material — metal roofs are usually the most straightforward, while tile requires more careful mounting. If you're planning solar and a re-roof around the same time, it's worth doing the roof work first.",
        topics: ["materials", "solar"],
      },
      {
        q: "Are metal roofs noisy in the rain?",
        a: "Less than people expect, especially with proper insulation and sarking underneath — the perception of a loud tin roof mostly comes from older, uninsulated sheds rather than modern residential installs. A roofer can talk you through insulation options if noise is a concern.",
        topics: ["materials", "colorbond"],
      },
      {
        q: "Which roof types can be restored, and which must be replaced?",
        a: "Most tile and metal roofs can be restored if they're structurally sound and just weathered — cleaned, re-pointed and re-coated. Asbestos roofs aren't restored; if they need work, licensed removal and replacement is the only safe path.",
        topics: ["materials", "restoration"],
      },
    ],
  },
  {
    heading: "Timing & process",
    items: [
      {
        q: "How long does a full roof replacement actually take?",
        a: "Most residential replacements in Adelaide are completed within a few days, weather permitting. A good roofer keeps the home weather-sealed throughout, so you're never left exposed overnight.",
        topics: ["process", "replacement"],
      },
      {
        q: "Do I need council approval to replace my roof in SA?",
        a: "Like-for-like replacement is usually treated as maintenance and doesn't need approval. The main exception is heritage-listed properties or homes in a historic overlay, where changes to the roof's appearance can require council sign-off first.",
        topics: ["process", "council"],
      },
      {
        q: "What's the best time of year to get roofing work done in Adelaide?",
        a: "Most roof work can be done year-round, but drier months make scheduling more predictable since rain can pause certain jobs (particularly coating and painting). Booking ahead of storm season is also sensible if your roof needs attention.",
        topics: ["process"],
      },
      {
        q: "Can roofing work happen while I'm still living in the house?",
        a: "Yes, for the vast majority of jobs — repairs, restoration and most replacements don't require you to move out. Asbestos removal is the exception where a roofer or removalist may ask part of the property to be kept clear during the work itself.",
        topics: ["process"],
      },
      {
        q: "What happens if it rains during a roofing job?",
        a: "A properly run job keeps the roof weather-sealed at the end of each day specifically so rain isn't a problem, and coating/painting work simply pauses until conditions are right. It's a normal part of scheduling in Adelaide, not something to worry about.",
        topics: ["process"],
      },
      {
        q: "Will my property be damaged during the work, and who handles cleanup?",
        a: "Reputable roofers protect gardens and paths with tarps and remove all waste and offcuts once the job's done — it's standard practice, and worth confirming it's included when you get a quote.",
        topics: ["process"],
      },
      {
        q: "How often should I get my roof inspected?",
        a: "Roughly every two to three years for a roof with no known issues, or sooner after a major storm. Regular inspection catches small problems — a slipped tile, a cracked seal — before they turn into leaks and ceiling damage.",
        topics: ["process", "maintenance"],
      },
    ],
  },
  {
    heading: "Repairs vs bigger decisions",
    items: [
      {
        q: "How do I know if a leak means 'repair' or 'the whole roof is failing'?",
        a: "A single, findable source — a cracked tile, a failed flashing — is usually a straightforward repair. Recurring leaks from multiple spots, or leaks alongside widespread cracking or rust, are signs the roof itself may be past patching. A roofer can tell you honestly which category you're in.",
        topics: ["decision", "repair"],
        link: { href: "/blog/repair-vs-replace", label: "Take the repair vs replace quiz" },
      },
      {
        q: "What's the lifespan of each major roof type before replacement is unavoidable?",
        a: "As a rough guide: metal roofing commonly lasts 40-plus years, concrete and terracotta tile even longer with maintenance, while older asbestos roofing is generally well past its practical lifespan on most Adelaide homes still carrying it. Actual lifespan depends heavily on maintenance and exposure.",
        topics: ["decision", "materials"],
      },
      {
        q: "Is roof restoration actually worth it, or does it just delay the inevitable?",
        a: "For a structurally sound roof that's simply weathered, restoration genuinely extends its life for a fraction of replacement cost — it's not just cosmetic delay. It's the wrong call only when the tiles or sheets themselves are failing, in which case a roofer should say so honestly.",
        topics: ["decision", "restoration"],
        link: { href: "/blog/repair-vs-replace", label: "Take the repair vs replace quiz" },
      },
    ],
  },
  {
    heading: "Using this service specifically",
    items: [
      {
        q: "What happens after I submit the form on this site?",
        a: "We match your job and suburb to a local roofer who covers your area and pass your details on. They'll reach out directly to arrange a time to look at the roof and quote you — there's no call centre in between.",
        topics: ["how-it-works"],
      },
      {
        q: "Can I request quotes from more than one roofer?",
        a: "Yes — if you'd like to compare more than one quote, let us know when you get in touch and we'll do our best to connect you with more than one local roofer for your job.",
        topics: ["how-it-works"],
      },
      {
        q: "What if no roofer in my suburb is available?",
        a: "We'll connect you with the closest available roofer who covers your area rather than leaving you without an option. Coverage is genuinely metro-wide, so this is uncommon, but if it happens we'll be upfront about it.",
        topics: ["how-it-works"],
      },
      {
        q: "Is my information shared with multiple roofers, or just one?",
        a: "Only with the roofer(s) we actually connect you with for your specific enquiry — we don't sell or broadcast your details to a wider list of contractors.",
        topics: ["how-it-works", "privacy"],
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((g) =>
    g.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    }))
  ),
};

export const metadata = {
  title: `Roofing FAQs — Advice for Adelaide Homeowners | ${site.brand}`,
  description:
    "Honest answers to common roofing questions: cost, licensing, materials, asbestos, timing, repair vs replace, and how our free matching service works.",
  alternates: { canonical: `${site.url}/faq` },
  openGraph: {
    title: `Roofing FAQs — Advice for Adelaide Homeowners | ${site.brand}`,
    description:
      "Honest, plain-English answers to the roofing questions Adelaide homeowners ask most.",
    url: `${site.url}/faq`,
    type: "website",
  },
};

export default function FaqPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── INTRO ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-wrap px-5 py-20 md:py-24">
        <nav className="mb-4 font-body text-sm text-ink/50">
          <Link href="/" className="hover:text-clay">Home</Link>
          <span className="px-1.5">/</span>
          FAQs
        </nav>
        <span className="eyebrow text-clay">Roofing advice</span>
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-extrabold leading-[1.07] tracking-tight text-ink md:text-5xl">
          Roofing questions, answered straight.
        </h1>
        <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink/70">
          Honest, plain-English answers to the things Adelaide homeowners ask us most — from
          cost and licensing to asbestos and timing. No sales pitch, just useful information.
        </p>
      </section>

      <RidgeDivider />

      {/* ── FAQ GROUPS ─────────────────────────────────────── */}
      <section className="border-y border-mortar bg-white">
        <div className="mx-auto max-w-wrap px-5 py-16">
          {faqGroups.map((group) => (
            <div key={group.heading} className="mx-auto mb-14 max-w-3xl last:mb-0">
              <h2 className="mb-2 font-display text-2xl font-bold tracking-tight text-ink">
                {group.heading}
              </h2>
              <div className="divide-y divide-mortar">
                {group.items.map((f) => (
                  <div key={f.q} className="py-6 first:pt-4 last:pb-0">
                    <h3 className="font-display text-lg font-bold tracking-tight text-ink">{f.q}</h3>
                    <p className="mt-2.5 font-body leading-relaxed text-ink/70">{f.a}</p>
                    {f.link && (
                      <Link
                        href={f.link.href}
                        className="mt-3 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-clay hover:text-clay-deep"
                      >
                        {f.link.label} →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <p className="mx-auto mt-4 max-w-3xl font-body text-sm leading-relaxed text-ink/55">
            Looking for what roofs in your area typically need?{" "}
            <Link href="/services" className="font-semibold text-clay hover:text-clay-deep">
              See our roofing services
            </Link>{" "}
            or find your suburb from the{" "}
            <Link href="/#regions" className="font-semibold text-clay hover:text-clay-deep">
              home page
            </Link>.
          </p>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-wrap px-5 py-20 text-center">
        <h2 className="mx-auto max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Still got a question about your roof?
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-ink/65">
          Give us a call and we&apos;ll connect you with a local roofer who can help.
        </p>
        <div className="mt-7 flex justify-center">
          <CallButton />
        </div>
      </section>
    </main>
  );
}
