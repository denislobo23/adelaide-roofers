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
  "Roofer on a freshly coated charcoal tile roof during a roof restoration on a single-storey brick home";

export const metadata = articleMetadata({
  slug: "roof-restoration-cost-adelaide",
  title: "Roof Restoration Cost in Adelaide: 2026 Price Guide | Adelaide Roofers",
  description:
    "Roof restoration cost in Adelaide: typical 2026 guide ranges for tile and metal roofs, what the job includes, what moves the price, and when it isn't worth it.",
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

const PRICE_ROWS = [
  ["Tile roof restoration (clean, re-bed and re-point, recoat)", "$3,675 to $10,100", "About $6,900"],
  ["Metal roof restoration (clean, rust treatment, recoat)", "$3,225 to $9,200", "About $6,000"],
  ["Roof painting only, single-storey", "$2,300 to $5,500", "About $3,675"],
  ["Ridge capping re-bed and re-point, full roof", "$735 to $3,225", "About $2,025"],
  ["Ridge capping repair, a few caps or one section", "$370 to $1,100", "About $550"],
  ["For comparison: full roof replacement, single-storey", "$12,900 to $27,600", "About $20,250"],
];

const TILE_STEPS = [
  "Inspect the roof and replace cracked or broken tiles.",
  "Clean off dirt, moss and lichen, usually with a pressure cleaner.",
  "Re-bed and re-point the ridge capping, or re-point only if the bedding is still sound.",
  "Seal or prime the tiles, then apply the topcoats.",
  "Clear the gutters and check the valleys and flashings.",
];

const PRICE_DRIVERS = [
  ["Roof size", "More area means more cleaning, coating and labour."],
  ["Ridge capping", "A full re-bed costs far more than re-pointing a few sections."],
  ["Broken tiles", "Storm damage or years of foot traffic means more replacement tiles."],
  ["Storeys and pitch", "Two-storey and steep roofs need more scaffolding and edge protection."],
  ["Coating", "Premium membranes cost more than a basic paint, and come with longer product warranties."],
  ["Rust", "On metal roofs, sheets that have rusted through need replacing, not painting."],
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
];

const SOURCES = [
  {
    href: "https://whatsthedamage.com.au/roofing-cost-adelaide/",
    label: "Roof restoration and roofing costs in Adelaide",
    note: " (What’s The Damage, independent price guide)",
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
  {
    href: "https://www.cbs.sa.gov.au/documents/form-1-building-contract-rights-and-obligations.pdf",
    label: "Form 1: your building contract rights and obligations",
    note: " (Consumer and Business Services SA, PDF)",
  },
];

const KEY_POINTS = [
  "Typical guide range: $3,675 to $10,100 for a tile roof, $3,225 to $9,200 for metal.",
  "That's well under a full replacement, which starts around $12,900 for a single-storey home.",
  "It only makes sense if the roof underneath is still sound.",
  "Painting Colorbond voids BlueScope's warranties, and asbestos roofs must never be pressure-cleaned.",
];

const JUMP_LINKS = [
  { href: "#ranges", label: "Price ranges" },
  { href: "#tile", label: "Tile restoration" },
  { href: "#metal", label: "Metal restoration" },
  { href: "#drivers", label: "What moves the price" },
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
              A typical roof restoration cost in Adelaide is about{" "}
              <strong className="text-ink">$3,675 to $10,100 for a tile roof</strong> (clean,
              re-bed and re-point, recoat) and $3,225 to $9,200 for a metal roof (clean, rust
              treatment, recoat), based on a published Adelaide price guide (November 2026).
              That&apos;s well under the cost of a new roof, but it only makes sense if the roof
              underneath is still sound.
            </p>
            <p className={body}>
              Below: the guide ranges, what each type of restoration includes, what moves the
              price, and when your money is better spent on a replacement. For what the job
              involves, see{" "}
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
                <h2 className={h2}>Roof restoration cost in Adelaide: typical guide ranges</h2>
                <p className={body}>
                  Typical guide ranges from a published Adelaide price guide (November 2026, GST
                  included), not quotes:
                </p>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>Job</th>
                        <th className={th}>Typical guide range</th>
                        <th className={th}>Typical middle</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PRICE_ROWS.map(([job, range, mid], i) => (
                        <tr key={job} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{job}</td>
                          <td className={td}>{range}</td>
                          <td className={td}>{mid}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  If only the ridge capping is failing, a ridge capping repair or re-point may be
                  all you need. For the full replacement figures, see{" "}
                  <Link href="/blog/roof-replacement-cost-adelaide" className={inlineLink}>
                    what a new roof costs in Adelaide
                  </Link>
                  .
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
                  sheets or screws that have failed, and recoating. Two things to know first:
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

              <article id="drivers" className="scroll-mt-24">
                <h2 className={h2}>What moves the price</h2>
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
                  <li>Ask what coating will be used, how many coats, and what its warranty covers.</li>
                  <li>Ask whether broken tiles and ridge capping work are included or extra.</li>
                  <li>
                    Check the deposit: for domestic building work in SA it&apos;s capped at $1,000,
                    or 5% if the contract is over $20,000.
                  </li>
                  <li>
                    Be wary of door-knockers offering a cheap restoration today. Our guide to{" "}
                    <Link href="/blog/roofing-scams-adelaide" className={inlineLink}>
                      roofing scams in Adelaide
                    </Link>{" "}
                    shows the usual tactics.
                  </li>
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
