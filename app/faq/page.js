// app/faq/page.js
import Link from "next/link";
import { site } from "@/data/config";
import CallButton from "@/components/CallButton";
import RidgeDivider from "@/components/RidgeDivider";

// Buyer-education FAQs — general roofing advice, answered honestly from a
// referral-service point of view. (Suburb pages carry their own local FAQs.)
const adviceFaqs = [
  {
    q: "How do I know if my roof needs attention?",
    a: "Common signs are water stains on ceilings, damp patches after rain, cracked or slipped tiles, rust on metal roofs, crumbling mortar along the ridge caps, and gutters that overflow. If you can see any of these — or your roof simply hasn't been looked at in 10-plus years — it's worth having a local roofer take a look before a small issue becomes a big one.",
  },
  {
    q: "Should I repair, restore, or replace my roof?",
    a: "It depends on the roof's condition, not its age alone. A few broken tiles or a single leak usually just needs a repair. A structurally sound roof that's weathered and faded is often a good candidate for restoration (clean, re-point, re-coat). Replacement is for roofs that are widely cracked, rusted through, or beyond economical repair. A good roofer will tell you honestly which category you're in — and the roofers we connect you with quote on what the roof actually needs, not the biggest job.",
  },
  {
    q: "What should I ask before hiring a roofer?",
    a: "Ask whether they're licensed and insured, whether the quote is fixed and in writing, what warranty they offer on workmanship, and whether they'll itemise what's included. It's also fair to ask for recent local examples of similar work. As a referral service we can't speak for every contractor in Adelaide, but we aim to connect you with roofers who are comfortable answering all of the above.",
  },
  {
    q: "How much does roof work cost in Adelaide?",
    a: "It varies widely with the roof's size, pitch, material and condition. As a rough guide, a restoration on a standard single-storey tiled home commonly falls in the mid-to-high four-figure range, while repairs can be far less and full replacements considerably more. Treat any figure online as a ballpark only — accurate pricing needs an on-site look, which the roofer we connect you with will provide.",
  },
  {
    q: "Tile or metal (Colorbond) — which is better?",
    a: "Both are good; it comes down to the home and your priorities. Tile is durable, quiet in rain and suits many heritage and traditional homes. Metal (like Colorbond) is lighter, quick to install, and performs well — especially coastal grades in salt-exposed suburbs. When re-roofing, a local roofer can advise which suits your home, budget and area.",
  },
  {
    q: "How long does roof work take?",
    a: "A minor repair is often a few hours to a day. A full restoration on a typical home usually takes a few days, depending on size, weather and how much prep the roof needs. Re-roofing takes longer again. Weather is the main variable in Adelaide — roofers won't rush a job in the rain, and that's a good thing.",
  },
  {
    q: "Do I need council approval for roof work?",
    a: "For most homes, like-for-like repairs and restoration are treated as maintenance and don't need approval. The exception is heritage-listed properties or homes within a historic or character overlay, where changes affecting the roof's appearance can require council approval. If your home is older or in a heritage area, it's worth checking with your council first — several of our suburb pages note where this commonly applies.",
  },
  {
    q: "Is roof restoration actually worth it?",
    a: "For a structurally sound roof that's just weathered, usually yes. Restoration re-seals and protects the roof and refreshes its appearance for a fraction of the cost of replacement, and can add years to its life. It's not worth it if the tiles or sheets themselves are failing — in which case a roofer should tell you honestly that replacement is the better spend.",
  },
  {
    q: "Can roofers work around my solar panels?",
    a: "Yes — most roofers can work around existing solar panels for repairs, restoration or re-roofing, and many also fit mesh around panels to keep pests out. For a full re-roof, panels sometimes need to be temporarily removed and refitted (usually by a solar specialist), so it's worth mentioning your panels up front so the roofer can plan for it.",
  },
  {
    q: "How do I avoid dodgy roofers?",
    a: "Be wary of anyone who door-knocks claiming they 'noticed damage,' pressures you to decide on the spot, asks for large upfront cash payments, or won't put the quote in writing. Stick to licensed, insured roofers who give written, itemised quotes and a workmanship warranty. Connecting you with reputable local roofers — so you don't have to vet strangers yourself — is the whole reason Adelaide Roofers exists.",
  },
  {
    q: "How does Adelaide Roofers work, and is it free?",
    a: "It's free for homeowners. You tell us your suburb and what's happening with your roof, and we connect you with a local roofing contractor who covers your area. They arrange a time, assess the roof and quote you directly — you deal with them, not us. We don't carry out roofing work ourselves; we're the introduction to a trusted local roofer.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: adviceFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const metadata = {
  title: `Roofing FAQs — Advice for Adelaide Homeowners | ${site.brand}`,
  description:
    "Honest answers to common roofing questions: repair vs replace, what to ask a roofer, costs, tile vs metal, council approval, and how to avoid dodgy operators.",
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
          &ldquo;does my roof actually need work?&rdquo; to &ldquo;how do I avoid a dodgy
          operator?&rdquo; No sales pitch, just useful information.
        </p>
      </section>

      <RidgeDivider />

      {/* ── FAQ LIST ───────────────────────────────────────── */}
      <section className="border-y border-mortar bg-white">
        <div className="mx-auto max-w-wrap px-5 py-16">
          <div className="mx-auto max-w-3xl divide-y divide-mortar">
            {adviceFaqs.map((f) => (
              <div key={f.q} className="py-6 first:pt-0 last:pb-0">
                <h2 className="font-display text-lg font-bold tracking-tight text-ink">{f.q}</h2>
                <p className="mt-2.5 font-body leading-relaxed text-ink/70">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl font-body text-sm leading-relaxed text-ink/55">
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
