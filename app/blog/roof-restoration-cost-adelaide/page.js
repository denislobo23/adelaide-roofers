// app/blog/roof-restoration-cost-adelaide/page.js
// Featured image: public/images/service-roof-restoration.webp (existing library image, no generation needed)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";
import RoofCalculator from "@/components/RoofCalculator";
import ArticleMeta from "@/components/ArticleMeta";
import { articleMetadata } from "@/lib/articleMetadata";
import ArticleFaq from "@/components/ArticleFaq";
import ArticleSources from "@/components/ArticleSources";
import ArticleKeyPoints from "@/components/ArticleKeyPoints";

const IMAGE_ALT =
  "Roofer in hi-vis working along a ridge of a charcoal tile hip roof on a single-storey cream brick home, with a ladder at the side";

export const metadata = articleMetadata({
  slug: "roof-restoration-cost-adelaide",
  title: "Roof Restoration Cost in Adelaide: 2026 Price Guide | Adelaide Roofers",
  description:
    "Roof restoration cost in Adelaide: $4,500–$8,000 incl. GST for a typical tile roof. 2026 guide ranges, a worked example and quote red flags.",
  image: "/images/service-roof-restoration.webp",
  imageAlt: IMAGE_ALT,
});

const HEADLINE = "How Much Does Roof Restoration Cost in Adelaide?";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Resources", item: `${site.url}/#resources` },
    {
      "@type": "ListItem",
      position: 3,
      name: HEADLINE,
      item: `${site.url}/blog/roof-restoration-cost-adelaide`,
    },
  ],
};

// Typical guide ranges, 2026, all including GST.
const TIERS = [
  [
    "Clean and recoat only",
    "Roof in good shape, no ridge work",
    "$3,500 to $5,000",
  ],
  [
    "Full tile restoration",
    "About 200 m² single-storey concrete tile: clean, replace broken tiles, ridge re-bed and repoint, sealer plus 2 coats",
    "$4,500 to $8,000",
  ],
  [
    "Metal / Colorbond restoration",
    "Rust treatment, screws, flashings, coating",
    "$3,500 to $7,000",
  ],
  [
    "Double-storey, terracotta, steep or complex roofs",
    "Extra access, scaffold, care or detailing",
    "$7,500 to $12,000+",
  ],
];

// Illustrative worked example. Unit rates are typical guide figures, 2026,
// shown before GST so the GST line is visible. Not a quote.
const EXAMPLE_ROWS = [
  ["Clean, sealer and 2 topcoats", "200 m² × $22 per m²", 4400],
  ["Ridge caps re-bedded and repointed", "70 caps × $25 per cap", 1750],
  ["Broken tiles replaced", "20 tiles × $15 per tile", 300],
  ["Skip bin for debris and old mortar", "1 × $330", 330],
];
const EXAMPLE_SUBTOTAL = EXAMPLE_ROWS.reduce((t, r) => t + r[2], 0);
const EXAMPLE_GST = Math.round(EXAMPLE_SUBTOTAL * 0.1);
const EXAMPLE_TOTAL = EXAMPLE_SUBTOTAL + EXAMPLE_GST;
const EXAMPLE_RIDGE = EXAMPLE_ROWS[1][2];
const money = (n) => `$${n.toLocaleString("en-AU")}`;

const TILE_STEPS = [
  "Inspect the roof and replace cracked or broken tiles.",
  "Clean off dirt, moss and lichen, usually with a pressure cleaner.",
  "Re-bed and re-point the ridge capping, or re-point only if the bedding is still sound.",
  "Seal or prime the tiles, then apply the topcoats.",
  "Clear the gutters and check the valleys and flashings.",
];

const PRICE_DRIVERS = [
  ["Roof size", "More area means more cleaning, coating and labour. The rough guide is $25 to $40 per m², including GST."],
  ["Tile, terracotta or metal", "Concrete tile is the usual baseline. Terracotta needs gentler handling, and metal swaps ridge work for rust treatment, screws and flashings."],
  ["Storeys and scaffold", "A second storey usually means scaffold or edge protection, which adds cost before any work starts."],
  ["Pitch", "Steep roofs are slower and need more safety gear to work on."],
  ["Ridge work", "Re-bedding and repointing the ridge capping is often the biggest single item on a tile roof."],
  ["Broken tiles", "Storm damage or years of foot traffic means more replacement tiles."],
  ["Solar panels and skylights", "Panels have to be worked around or lifted and refitted, and skylights need masking and resealing. Both add time."],
  ["Access", "Tight side paths, steep blocks or no room for a skip bin slow the job down."],
  ["Travel to outer areas", "Some roofers add a travel charge for outer areas such as Gawler, Mount Barker or Aldinga."],
  ["Winter scheduling", "Winter is Adelaide's wettest season and coatings need dry days, so jobs can stretch out or be rescheduled."],
];

const RED_FLAGS = [
  [
    "A big “discount” off an inflated first price",
    "A $12,000 quote “reduced to $7,000 if you sign today” was never a $12,000 job. Judge the final price against the ranges above.",
  ],
  [
    "No itemised scope",
    "One line that says “roof restoration” tells you nothing. You need the ridge work, broken tiles, coats and GST spelled out.",
  ],
  [
    "Single-coat paint",
    "A proper restoration uses a sealer or primer plus two topcoats. One coat is cheaper for a reason.",
  ],
  [
    "No ridge work on a tile roof",
    "Ridge mortar is usually the first part of a tile roof to fail. Leaving it out can make a quote look $1,500 to $2,500 cheaper.",
  ],
  [
    "A salesperson who never gets on the roof",
    "Nobody can see cracked tiles or loose ridge capping from the driveway. Ask who inspected it and what they found.",
  ],
];

const FAQS = [
  {
    q: "Is roof restoration worth it?",
    a: "Yes, if the roof is structurally sound and the tiles or sheets have plenty of life left. A restoration typically costs a fraction of a new roof. If tiles are crumbling, metal is rusting through or the frame is sagging, put the money towards a replacement instead.",
  },
  {
    q: "How long does a roof restoration last?",
    a: "It depends on how sound the roof was and the coating used. Ask for the coating manufacturer's product warranty and the roofer's workmanship warranty in writing, and compare them between quotes.",
  },
  {
    q: "Can you restore a Colorbond roof?",
    a: "Yes, by cleaning, treating any rust and recoating. BlueScope says overpainting Colorbond voids its warranties, so check whether your roof is still under warranty before painting it.",
  },
  {
    q: "Can you restore an asbestos roof?",
    a: "Not the usual way. Using high-pressure water on asbestos cement is prohibited in South Australia, and SafeWork SA has warned about homes contaminated this way. For an ageing asbestos roof, licensed removal and replacement is usually the better path.",
  },
  {
    q: "Is $3,500 too cheap?",
    a: "Not for a clean and recoat on a sound roof, which typically runs $3,500 to $5,000. For a full restoration of a typical 200 m² concrete tile roof it's below the usual $4,500 to $8,000, so check what's missing: ridge re-bedding, a sealer plus two topcoats, broken tiles or GST.",
  },
  {
    q: "Why do quotes vary so much?",
    a: "Mostly scope and GST. One quote may leave out ridge re-bedding, which can add $1,500 to $2,500, and another may show its price “+ GST”, which makes the real price 10% higher. Compare quotes on the same scope with GST included.",
  },
  {
    q: "Do quotes include GST?",
    a: "Not always. Some roofers quote “+ GST”. The ACCC says businesses must show consumers the total price as a single figure, including GST, so ask every roofer for the GST-inclusive total before you compare.",
  },
  {
    q: "Is it cheaper in winter?",
    a: "Not reliably. Some roofers have more openings in quieter months, but winter is Adelaide's wettest season and coatings need dry days, so jobs can stretch out. If you're offered a winter price, check it still includes the same coats and ridge work.",
  },
];

const SOURCES = [
  {
    href: "https://www.accc.gov.au/consumers/pricing/price-displays",
    label: "Price displays: total price must include GST",
    note: " (ACCC)",
  },
  {
    href: "https://www.cbs.sa.gov.au/documents/form-1-building-contract-rights-and-obligations.pdf",
    label: "Form 1: your building contract rights and obligations",
    note: " (Consumer and Business Services SA, PDF)",
  },
  {
    href: "https://cdn.dcs.lysaght.com/download/tb-02",
    label: "Technical Bulletin TB-2: overpainting and restoration of exterior BlueScope steel products",
    note: " (BlueScope, PDF)",
  },
  {
    href: "https://www.safework.sa.gov.au/news-and-alerts/safety-alerts/incident-alerts/2023/high-pressure-cleaning-leads-to-asbestos-contamination",
    label: "High-pressure cleaning leads to asbestos contamination",
    note: " (SafeWork SA)",
  },
  {
    href: "https://www.bom.gov.au/climate/averages/tables/cw_023090.shtml",
    label: "Climate statistics for Adelaide (Kent Town)",
    note: " (Bureau of Meteorology)",
  },
];

const KEY_POINTS = [
  "Typical single-storey concrete tile restoration: $4,500 to $8,000, including GST.",
  "Rough guide: $25 to $40 per m², including GST.",
  "Quotes vary mainly because of scope (ridge work) and whether GST is shown.",
  "Painting Colorbond voids BlueScope's warranties, and asbestos roofs must never be pressure-cleaned.",
];

const JUMP_LINKS = [
  { href: "#ranges", label: "Price tiers" },
  { href: "#why-quotes-vary", label: "Why quotes vary" },
  { href: "#worked-example", label: "Worked example" },
  { href: "#drivers", label: "What changes the price" },
  { href: "#red-flags", label: "Red flags in a quote" },
  { href: "#not-worth-it", label: "When it isn't worth it" },
  { href: "#faq", label: "FAQs" },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const olist = "mt-4 list-decimal space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:font-semibold marker:text-clay";
const inlineLink = "font-semibold text-clay hover:text-clay-deep";
const th = "border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink";
const td = "border-b border-mortar px-4 py-3 font-body text-sm text-ink/75 align-top";
const tdNum = `${td} text-right whitespace-nowrap`;

export default function RestorationCostPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="mx-auto max-w-wrap px-5 pt-16 pb-16 md:pt-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_280px] md:gap-14">
          {/* ── MAIN CONTENT ─────────────────────────────── */}
          <div>
            <span className="eyebrow text-clay">Costs</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
              {HEADLINE}
            </h1>
            <ArticleMeta slug="roof-restoration-cost-adelaide" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              <strong className="text-ink">
                Most Adelaide roof restorations cost $4,500–$8,000 (incl. GST) for a typical
                single-storey tile roof; quotes vary mainly because of what&apos;s included and
                whether GST is shown.
              </strong>{" "}
              Every roof restoration cost in Adelaide on this page is a typical guide range for
              2026, including GST, not a quote.
            </p>
            <p className={body}>
              Below: price tiers by roof type, why quotes vary so much, a worked example for a
              200 m² tile roof, what changes the price, and the red flags to watch for in a quote.
              For what the job involves, see{" "}
              <Link href="/services/roof-restoration" className={inlineLink}>
                roof restoration in Adelaide
              </Link>
              .
            </p>

            <ArticleKeyPoints points={KEY_POINTS} jumpLinks={JUMP_LINKS} />

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-restoration.webp"
                alt={IMAGE_ALT}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article id="ranges" className="scroll-mt-24">
                <h2 className={h2}>Roof restoration cost in Adelaide: price tiers</h2>
                <p className={body}>
                  Typical guide ranges, 2026, all including GST:
                </p>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>Job</th>
                        <th className={th}>What it covers</th>
                        <th className={th}>Typical guide range (incl. GST)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TIERS.map(([job, covers, range], i) => (
                        <tr key={job} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{job}</td>
                          <td className={td}>{covers}</td>
                          <td className={`${td} whitespace-nowrap`}>{range}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  <strong className="text-ink">Rough guide:</strong> $25 to $40 per m² of roof,
                  including GST. If only the ridge capping is failing, a ridge repair may be all you
                  need. For the cost of starting again, see{" "}
                  <Link href="/blog/roof-replacement-cost-adelaide" className={inlineLink}>
                    what a new roof costs in Adelaide
                  </Link>
                  .
                </p>
              </article>

              <article id="why-quotes-vary" className="scroll-mt-24">
                <h2 className={h2}>Why roof restoration quotes vary so much</h2>
                <p className={body}>
                  Two quotes for the same roof can be thousands of dollars apart. Usually it comes
                  down to two things:
                </p>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Scope.</strong> Some quotes leave out ridge
                    re-bedding and repointing, which can add $1,500 to $2,500. Others skip the
                    sealer, use one topcoat instead of two, or don&apos;t include broken tiles.
                  </li>
                  <li>
                    <strong className="text-ink">GST.</strong> Some quotes show prices “+ GST”, so
                    the real price is 10% higher. A $6,000 + GST quote is really $6,600. The ACCC
                    says businesses must show consumers a single total price that includes GST.
                  </li>
                </ul>
                <p className={body}>
                  <strong className="text-ink">The fix:</strong> compare quotes on the same scope,
                  with GST included. Ask each roofer to itemise the cleaning, ridge work, broken
                  tiles, sealer and number of coats, and to give you the GST-inclusive total. Our
                  guide to{" "}
                  <Link href="/blog/how-to-read-a-roofing-quote" className={inlineLink}>
                    reading a roofing quote
                  </Link>{" "}
                  shows what each line should say.
                </p>
              </article>

              <article id="worked-example" className="scroll-mt-24">
                <h2 className={h2}>Worked example: a 200 m² concrete tile roof</h2>
                <p className={body}>
                  A single-storey Adelaide home with a 200 m² concrete tile roof, a sound frame,
                  ridge capping that needs re-bedding, and a handful of cracked tiles. Unit rates are
                  typical guide figures, 2026, shown before GST so you can see the GST line. This is
                  an illustration, not a quote.
                </p>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>Item</th>
                        <th className={th}>Quantity × rate</th>
                        <th className={`${th} text-right`}>Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {EXAMPLE_ROWS.map(([item, calc, cost], i) => (
                        <tr key={item} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{item}</td>
                          <td className={td}>{calc}</td>
                          <td className={tdNum}>{money(cost)}</td>
                        </tr>
                      ))}
                      <tr>
                        <td className={`${td} text-ink`} colSpan={2}>Subtotal (before GST)</td>
                        <td className={tdNum}>{money(EXAMPLE_SUBTOTAL)}</td>
                      </tr>
                      <tr className="bg-paper/50">
                        <td className={`${td} text-ink`} colSpan={2}>GST (10%)</td>
                        <td className={tdNum}>{money(EXAMPLE_GST)}</td>
                      </tr>
                      <tr className="bg-paper">
                        <td className={`${td} font-display font-bold text-ink`} colSpan={2}>
                          Total, including GST
                        </td>
                        <td className={`${tdNum} font-display font-bold text-ink`}>
                          {money(EXAMPLE_TOTAL)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  That&apos;s about ${Math.round(EXAMPLE_TOTAL / 200)} per m², inside the $4,500 to
                  $8,000 tier. Take out the ridge work and the same roof drops to about{" "}
                  {money(Math.round((EXAMPLE_SUBTOTAL - EXAMPLE_RIDGE) * 1.1))}; quote it “+ GST” and it
                  looks like {money(EXAMPLE_SUBTOTAL)}. That&apos;s how three honest quotes for one
                  roof can look so different.
                </p>
              </article>

              <article id="drivers" className="scroll-mt-24">
                <h2 className={h2}>What changes the price</h2>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>Factor</th>
                        <th className={th}>Why it matters</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PRICE_DRIVERS.map(([f, why], i) => (
                        <tr key={f} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{f}</td>
                          <td className={td}>{why}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  <strong className="text-ink">Adelaide conditions:</strong> a roof coating here
                  faces strong summer sun. Bureau of Meteorology figures for Kent Town show an
                  average of 10.5 hours of sunshine a day in January. Ask which coating suits
                  that, and what its manufacturer&apos;s warranty covers.
                </p>
              </article>

              <article id="red-flags" className="scroll-mt-24">
                <h2 className={h2}>Red flags in a quote</h2>
                <ul className={list}>
                  {RED_FLAGS.map(([flag, why]) => (
                    <li key={flag}>
                      <strong className="text-ink">{flag}.</strong> {why}
                    </li>
                  ))}
                  <li>
                    <strong className="text-ink">A deposit over the SA legal limit.</strong> For
                    domestic building work in SA the deposit is capped at $1,000, or 5% if the
                    contract is over $20,000 (CBS Form 1).
                  </li>
                </ul>
                <p className={body}>
                  Door-knockers offering a cheap restoration today tick several of these boxes at
                  once. Our guide to{" "}
                  <Link href="/blog/roofing-scams-adelaide" className={inlineLink}>
                    roofing scams in Adelaide
                  </Link>{" "}
                  shows the usual tactics.
                </p>
              </article>

              <article id="tile" className="scroll-mt-24">
                <h2 className={h2}>What a tile roof restoration includes</h2>
                <ol className={olist}>
                  {TILE_STEPS.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
                <p className={body}>
                  The ridge capping is usually the first part of a tile roof to fail, because the
                  mortar under it cracks and loosens long before the tiles wear out. Terracotta
                  tiles are often left uncoated, since their colour is fired in; our{" "}
                  <Link href="/blog/terracotta-roofs-pros-cons" className={inlineLink}>
                    terracotta roof guide
                  </Link>{" "}
                  covers what they need.
                </p>
              </article>

              <article id="metal" className="scroll-mt-24">
                <h2 className={h2}>Restoring a metal roof</h2>
                <p className={body}>
                  A metal roof restoration means cleaning, treating any surface rust, replacing
                  failed screws and flashings, and recoating. Two things to know first:
                </p>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Warranty:</strong> BlueScope says overpainting
                    Colorbond voids any warranties it issued. If your roof is still under
                    warranty, check the terms before you paint it.
                  </li>
                  <li>
                    <strong className="text-ink">Rust-through:</strong> paint won&apos;t fix a
                    sheet that has rusted through. Those sheets need replacing. See{" "}
                    <Link href="/blog/does-colorbond-rust" className={inlineLink}>
                      why Colorbond rusts and where
                    </Link>
                    .
                  </li>
                </ul>
              </article>

              <article id="not-worth-it" className="scroll-mt-24">
                <h2 className={h2}>When a restoration isn&apos;t worth it</h2>
                <ul className={list}>
                  <li>Concrete tiles that are crumbling, porous or breaking when walked on.</li>
                  <li>Metal sheets rusting through across large areas of the roof.</li>
                  <li>A sagging roofline or rotten battens, which coating won&apos;t fix.</li>
                  <li>
                    An asbestos cement roof. Using high-pressure water on asbestos cement is
                    prohibited in South Australia, and SafeWork SA has reported a home and its
                    neighbour contaminated after a contractor pressure-cleaned one. Read the{" "}
                    <Link href="/blog/asbestos-roof-removal-guide" className={inlineLink}>
                      asbestos roof removal guide
                    </Link>{" "}
                    instead.
                  </li>
                </ul>
                <p className={body}>
                  Not sure which side of the line your roof is on? Our{" "}
                  <Link href="/blog/repair-vs-replace" className={inlineLink}>
                    repair, restore or replace guide
                  </Link>{" "}
                  walks through it.
                </p>
              </article>

              <article>
                <h2 className={h2}>Before you book</h2>
                <ul className={list}>
                  <li>Get at least two itemised quotes on the same scope, with GST included.</li>
                  <li>Ask what coating will be used, how many coats, and what its warranty covers.</li>
                  <li>Ask whether broken tiles and ridge capping work are included or extra.</li>
                  <li>Get the workmanship warranty and the start date in writing.</li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#restoration-calculator"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    Jump to the calculator ↓
                  </a>
                  <Link
                    href="/free-guide"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-ink px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
                  >
                    Get the free guide →
                  </Link>
                </div>
              </article>

              <ArticleFaq id="faq" heading="Roof restoration cost: common questions" faqs={FAQS} />

              <ArticleSources sources={SOURCES} />
            </div>
          </div>

          {/* ── SIDEBAR ──────────────────────────────────── */}
          <ArticleSidebar />
        </div>
      </section>

      {/* ── INSTANT CALCULATOR (full-width, matches homepage/suburb pages) ── */}
      <section id="restoration-calculator" className="scroll-mt-24 mx-auto max-w-wrap px-5 pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Get your instant restoration estimate
          </h2>
          <p className="mx-auto mt-3 max-w-md font-body text-ink/65">
            Answer a few quick questions about your roof for a free, no-obligation ballpark
            figure.
          </p>
        </div>
        <div className="mt-10">
          <RoofCalculator />
        </div>
      </section>

      <section className="mx-auto max-w-wrap px-5 py-20 text-center">
        <h2 className="mx-auto max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Tell us your suburb and what&apos;s going on with your roof
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-ink/65">
          We&apos;ll match you with a vetted local roofer for an obligation-free quote.
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
