// app/blog/roof-replacement-cost-adelaide/page.js
// Featured image: public/images/service-roof-replacement.webp (existing library image, no generation needed)

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
  "Roofers laying new Colorbond sheets over an exposed timber frame during a roof replacement on a brick home";

export const metadata = articleMetadata({
  slug: "roof-replacement-cost-adelaide",
  title: "Roof Replacement Cost in Adelaide: 2026 Price Guide | Adelaide Roofers",
  description:
    "Roof replacement cost in Adelaide: typical 2026 guide ranges for single and two-storey homes, per m² prices for Colorbond and tile, and what moves your quote.",
  image: "/images/service-roof-replacement.webp",
  imageAlt: IMAGE_ALT,
});

const HEADLINE = "How Much Does a Roof Replacement Cost in Adelaide?";

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
      item: `${site.url}/blog/roof-replacement-cost-adelaide`,
    },
  ],
};

const PRICE_ROWS = [
  ["Full replacement, single-storey home", "$12,900 to $27,600", "About $20,250"],
  ["Full replacement, two-storey home", "$13,800 to $36,800", "About $23,000"],
  ["Colorbond re-roof, per m²", "$74 to $165", "About $110"],
  ["Tile re-roof incl. stripping the old roof, per m²", "$92 to $200", "About $140"],
];

// Worked example: roof area x guide rate. Arithmetic only, not a quote.
const EXAMPLE_AREAS = [120, 160, 200];
const RATES = [
  { label: "Colorbond", low: 74, mid: 110, high: 165 },
  { label: "Tile", low: 92, mid: 140, high: 200 },
];
const money = (n) => "$" + n.toLocaleString("en-AU");

const COST_DRIVERS = [
  {
    title: "Roof size",
    text: "The biggest factor. Material and labour are both priced by the square metre, and your roof area is bigger than your floor area because of the pitch and the eaves.",
  },
  {
    title: "Material, and whether you're switching",
    text: "Like-for-like is usually simplest. Going from tile to Colorbond means stripping the tiles, re-battening for metal and new flashings, but the lighter roof is easier on an older frame.",
  },
  {
    title: "Storeys and access",
    text: "Two-storey homes, steep pitches and tight side access need more scaffolding and edge protection, which is priced across the whole job.",
  },
  {
    title: "Roof shape",
    text: "Every hip, valley, skylight and chimney adds cutting, flashing and labour. A simple gable roof costs less per m² than a cut-up one.",
  },
  {
    title: "What's underneath",
    text: "Rotten battens, sagging rafters or old water damage only show once the roof is off. A good quote says how this will be priced if found.",
  },
  {
    title: "Heritage and character areas",
    text: "In historic or character overlays, found in suburbs such as Unley and Norwood, council may expect a roof that suits the streetscape, which can rule out the cheapest option.",
  },
  {
    title: "Asbestos",
    text: "An asbestos cement (fibro) roof has to come off under licensed removal, which is priced separately from the new roof.",
  },
  {
    title: "Extras",
    text: "Sarking or an insulation blanket under the sheets, new gutters and downpipes, and roof vents all add to the total.",
  },
];

const FAQS = [
  {
    q: "How much does a new roof cost per square metre in Adelaide?",
    a: "As a typical guide, about $74 to $165 per m² for a Colorbond re-roof and $92 to $200 per m² for tile, including stripping the old roof. Your price depends on the roof's size, pitch, access and what's found underneath.",
  },
  {
    q: "Is it cheaper to replace a tile roof with Colorbond?",
    a: "Usually. The guide ranges for Colorbond are lower per m² than for tile. Switching does add some work at the start, because the tiles come off and the roof is re-battened for metal.",
  },
  {
    q: "How much deposit can a roofer ask for in SA?",
    a: "For domestic building work, the law limits a deposit to $1,000, or 5% of the contract price if the contract is over $20,000. A roofer can also ask in advance for money paid to third parties, such as council fees or insurance.",
  },
  {
    q: "Is it cheaper to restore a roof than replace it?",
    a: "Yes, much cheaper, if the roof is still sound. Restoration cleans, repairs and recoats what you have. If the tiles are crumbling, the metal is rusting through or the frame is damaged, replacement is the better spend.",
  },
];

const SOURCES = [
  {
    href: "https://whatsthedamage.com.au/roofing-cost-adelaide/",
    label: "Roof replacement cost Adelaide",
    note: " (What’s The Damage, independent price guide)",
  },
  {
    href: "https://www.cbs.sa.gov.au/documents/form-1-building-contract-rights-and-obligations.pdf",
    label: "Form 1: your building contract rights and obligations",
    note: " (Consumer and Business Services SA, PDF)",
  },
];

const KEY_POINTS = [
  "Typical guide range: $12,900 to $27,600 for a single-storey home, $13,800 to $36,800 for two storeys.",
  "By area: about $74 to $165 per m² for Colorbond and $92 to $200 per m² for tile.",
  "Size, material, access and what's under the old roof move the price most.",
  "In SA, a deposit is capped at $1,000, or 5% on contracts over $20,000.",
];

const JUMP_LINKS = [
  { href: "#ranges", label: "Price ranges" },
  { href: "#estimate", label: "Estimate yours" },
  { href: "#drivers", label: "What moves the price" },
  { href: "#hidden", label: "Easy-to-miss costs" },
  { href: "#paying", label: "Paying in SA" },
  { href: "#faq", label: "FAQs" },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const inlineLink = "font-semibold text-clay hover:text-clay-deep";
const th = "border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink";
const td = "border-b border-mortar px-4 py-3 font-body text-sm text-ink/75 align-top";

export default function ReplacementCostPage() {
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
            <ArticleMeta slug="roof-replacement-cost-adelaide" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              A typical roof replacement cost in Adelaide is about{" "}
              <strong className="text-ink">$12,900 to $27,600 for a single-storey home</strong> and
              $13,800 to $36,800 for a two-storey home, based on a published Adelaide price guide
              (November 2026). By area, that&apos;s roughly $74 to $165 per m² for Colorbond and
              $92 to $200 per m² for tile with the old roof stripped off. Where your roof lands in
              that range comes down to its size, the material, access, and what&apos;s found under
              the old roof.
            </p>
            <p className={body}>
              Below: the guide ranges, a quick way to estimate your own roof, what moves the price,
              the costs that are easy to miss, and South Australia&apos;s rules on deposits. For
              what the job involves, see{" "}
              <Link href="/services/roof-replacement" className={inlineLink}>
                roof replacement in Adelaide
              </Link>
              .
            </p>

            <ArticleKeyPoints points={KEY_POINTS} jumpLinks={JUMP_LINKS} />

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-replacement.webp"
                alt={IMAGE_ALT}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article id="ranges" className="scroll-mt-24">
                <h2 className={h2}>Roof replacement cost in Adelaide: typical guide ranges</h2>
                <p className={body}>
                  These are typical guide ranges from a published Adelaide price guide (November
                  2026, GST included), not quotes:
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
                  Deciding between materials? Our{" "}
                  <Link href="/blog/colorbond-vs-tile" className={inlineLink}>
                    Colorbond vs tile comparison
                  </Link>{" "}
                  covers heat, noise, looks and heritage rules as well as price.
                </p>
              </article>

              <article id="estimate" className="scroll-mt-24">
                <h2 className={h2}>Estimate your own roof in two steps</h2>
                <ol className="mt-4 list-decimal space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:font-semibold marker:text-clay">
                  <li>
                    <strong className="text-ink">Find your roof area.</strong> It&apos;s larger than
                    your floor area, because the roof is pitched and overhangs the walls. Your
                    house plans or a roofer&apos;s measure will give the real figure.
                  </li>
                  <li>
                    <strong className="text-ink">Multiply by the guide rate</strong> for your
                    material, then allow extra for anything in the next section that applies.
                  </li>
                </ol>
                <p className={body}>
                  Worked examples at the typical middle rates (arithmetic only, before extras). Steep,
                  complex or hard-to-reach roofs sit higher in the range:
                </p>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>Roof area</th>
                        {RATES.map((r) => (
                          <th key={r.label} className={th}>
                            {r.label} at about ${r.mid}/m²
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {EXAMPLE_AREAS.map((a, i) => (
                        <tr key={a} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{a} m²</td>
                          {RATES.map((r) => (
                            <td key={r.label} className={td}>
                              {money(a * r.mid)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  For a figure based on your actual address and roof, use the calculator further
                  down this page.
                </p>
              </article>

              <article id="drivers" className="scroll-mt-24">
                <h2 className={h2}>What moves the price</h2>
                <ul className={list}>
                  {COST_DRIVERS.map((d) => (
                    <li key={d.title}>
                      <strong className="text-ink">{d.title}:</strong> {d.text}
                    </li>
                  ))}
                </ul>
                <p className={body}>
                  Thinking of switching materials? See{" "}
                  <Link href="/blog/tile-to-metal-roofing" className={inlineLink}>
                    what changes when you go from tile to metal
                  </Link>
                  . If your roof is fibro, read the{" "}
                  <Link href="/blog/asbestos-roof-removal-guide" className={inlineLink}>
                    asbestos roof removal guide
                  </Link>{" "}
                  first, because removal is priced and licensed separately.
                </p>
              </article>

              <article id="hidden" className="scroll-mt-24">
                <h2 className={h2}>Costs that are easy to miss in a first quote</h2>
                <ul className={list}>
                  <li>Replacing rotten battens or repairing the frame once the roof is off.</li>
                  <li>Scaffolding and edge protection on two-storey or steep roofs.</li>
                  <li>Skip bins and tip fees for the old roof.</li>
                  <li>New gutters, downpipes and flashings, if they aren&apos;t reused.</li>
                  <li>Sarking or an insulation blanket under new metal sheets.</li>
                  <li>Taking solar panels off and refitting them.</li>
                  <li>Council approval if your home is heritage-listed or in an overlay.</li>
                </ul>
                <p className={body}>
                  Ask each roofer to list these as included, excluded or provisional. Our guide to{" "}
                  <Link href="/blog/how-to-read-a-roofing-quote" className={inlineLink}>
                    reading a roofing quote
                  </Link>{" "}
                  shows what each line should say, and{" "}
                  <Link href="/blog/council-approval-roof-replacement-sa" className={inlineLink}>
                    this one covers when a re-roof needs approval
                  </Link>
                  .
                </p>
              </article>

              <article id="paying" className="scroll-mt-24">
                <h2 className={h2}>Paying for it: the SA rules</h2>
                <p className={body}>
                  A roof replacement is domestic building work, so South Australia&apos;s rules,
                  set out in CBS Form 1, protect you:
                </p>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Deposit:</strong> no more than $1,000, or 5% of the
                    contract price if the contract is over $20,000. Money paid in advance to third
                    parties, such as council fees, is separate.
                  </li>
                  <li>
                    <strong className="text-ink">Progress payments:</strong> only for work already
                    done, and only after a written demand.
                  </li>
                  <li>
                    <strong className="text-ink">Cooling off:</strong> you can cancel in writing
                    within 5 clear business days of signing.
                  </li>
                </ul>
                <p className={body}>
                  If the spend is a stretch, compare{" "}
                  <Link href="/blog/financing-a-new-roof" className={inlineLink}>
                    ways to finance a new roof
                  </Link>
                  , and if storm damage started this, check{" "}
                  <Link href="/blog/insurance-roof-replacement-sa" className={inlineLink}>
                    what home insurance will cover
                  </Link>
                  . Not sure the roof needs replacing at all? A{" "}
                  <Link href="/blog/roof-restoration-cost-adelaide" className={inlineLink}>
                    roof restoration
                  </Link>{" "}
                  costs far less if the roof is still sound.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Get a number specific to your roof
                </h2>
                <p className={body}>
                  Guide ranges are a starting point, not your quote. The calculator below uses your
                  address, roof size and material, and we can match you with a vetted local roofer
                  for a firm price.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/free-guide"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-ink px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
                  >
                    Get the free guide →
                  </Link>
                </div>
              </article>

              <ArticleFaq id="faq" heading="Roof replacement cost: common questions" faqs={FAQS} />

              <ArticleSources sources={SOURCES} />
            </div>
          </div>

          {/* ── SIDEBAR ──────────────────────────────────── */}
          <ArticleSidebar />
        </div>
      </section>

      {/* ── INSTANT CALCULATOR (full-width, matches homepage/suburb pages) ── */}
      <section className="mx-auto max-w-wrap px-5 pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Get your instant roof replacement estimate
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
