// app/blog/roof-repair-cost-factors/page.js
// Featured image: public/images/service-roof-repairs.webp (existing library image, no generation needed)

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
  "Roofer kneeling on a terracotta tile roof near the ridge, repairing tiles, with a toolbag nearby";

export const metadata = articleMetadata({
  slug: "roof-repair-cost-factors",
  title: "Roof Repair Cost in Adelaide: What Affects the Price | Adelaide Roofers",
  description:
    "Roof repair cost in Adelaide: typical guide prices for leaks, broken tiles and ridge capping, the factors that move a quote, and why two quotes differ.",
  image: "/images/service-roof-repairs.webp",
  imageAlt: IMAGE_ALT,
});

const HEADLINE = "What Factors Affect the Cost of a Roof Repair";

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
      item: `${site.url}/blog/roof-repair-cost-factors`,
    },
  ],
};

const PRICE_ROWS = [
  ["Roof inspection and report", "$185 to $460", "About $320"],
  ["Minor leak repair", "$230 to $735", "About $460"],
  ["Broken tile replacement", "$275 to $920", "About $550"],
  ["Ridge capping repair, a few caps or one section", "$370 to $1,100", "About $550"],
  ["Ridge capping re-bed and re-point, full roof", "$735 to $3,225", "About $2,025"],
  ["Gutter replacement, per metre", "$37 to $100", "About $51"],
];

const FACTORS = [
  {
    title: "1. What's actually causing the problem",
    text: "A cracked tile is a quick swap. A leak that has run for months may have rotted the battens or stained the ceiling, and that can't be seen from the ground or a photo. This is the most common reason a repair quote changes once the roofer is up there.",
  },
  {
    title: "2. How many areas need work",
    text: "One cracked tile is a different job to several problems spread across the roof. Each extra area means more time, materials and moving equipment.",
  },
  {
    title: "3. Storeys, pitch and access",
    text: "Two-storey homes and steep roofs need scaffolding or edge protection, and that setup costs the same whether the repair takes ten minutes or two hours.",
  },
  {
    title: "4. Matching the material",
    text: "Old or discontinued tile profiles, terracotta, and less common Colorbond colours can be harder and dearer to find in small quantities.",
  },
  {
    title: "5. Who does the work",
    text: "Gutters, downpipes and flashings are roof plumbing, which may need a different trade from tile or sheet repairs.",
  },
  {
    title: "6. Asbestos",
    text: "If your roof is asbestos cement (fibro), SafeWork SA treats it as fragile roofing that may not take a person’s weight, and work that disturbs it has strict rules. Expect extra safety measures, and never let anyone pressure-clean it.",
  },
  {
    title: "7. Urgency",
    text: "After a storm, an emergency tarp or make-safe visit is often charged separately from the permanent repair done later.",
  },
];

const FAQS = [
  {
    q: "How much does it cost to fix a roof leak in Adelaide?",
    a: "As a typical guide, about $230 to $735 for a minor leak repair, such as a cracked tile or failed flashing. If the leak has damaged the battens or ceiling, the repair will cost more.",
  },
  {
    q: "Why are roof repair quotes so different?",
    a: "Roofers may be quoting different fixes for the same symptom. One may replace a single tile while another re-points the whole ridge. Ask each to say what's causing the problem, what they will fix, and what isn't included.",
  },
  {
    q: "Does home insurance cover roof repairs?",
    a: "Policies usually treat sudden storm damage differently from wear and tear or poor maintenance. Check your policy's product disclosure statement, and photograph the damage before anything is repaired.",
  },
  {
    q: "Should I repair or replace my roof?",
    a: "Repair if the problem is isolated and the rest of the roof is sound. If repairs keep coming back, the tiles are crumbling or the metal is rusting through, a restoration or replacement is usually better value.",
  },
];

const SOURCES = [
  {
    href: "https://whatsthedamage.com.au/roofing-cost-adelaide/",
    label: "Roof repair and roofing costs in Adelaide",
    note: " (What’s The Damage, independent price guide)",
  },
  {
    href: "https://media.bom.gov.au/social/blog/1733/explainer-how-does-hail-form/",
    label: "Explainer: how does hail form?",
    note: " (Bureau of Meteorology)",
  },
  {
    href: "https://www.bom.gov.au/climate/averages/tables/cw_023090.shtml",
    label: "Climate statistics for Adelaide (Kent Town)",
    note: " (Bureau of Meteorology)",
  },
  {
    href: "https://www.safework.sa.gov.au/workplaces/work-tasks-and-projects/fragile-roofing",
    label: "Fragile roofing",
    note: " (SafeWork SA)",
  },
  {
    href: "https://www.cbs.sa.gov.au/documents/form-1-building-contract-rights-and-obligations.pdf",
    label: "Form 1: your building contract rights and obligations",
    note: " (Consumer and Business Services SA, PDF)",
  },
  {
    href: "https://www.cbs.sa.gov.au/find-a-licence-holder",
    label: "Find a licence holder",
    note: " (Consumer and Business Services SA)",
  },
];

const KEY_POINTS = [
  "Typical guide prices: about $230 to $735 for a minor leak and $275 to $920 to replace broken tiles.",
  "The cause of the problem, not the symptom, decides the price.",
  "Access, the number of problem areas and matching old materials push it up.",
  "Two quotes that differ a lot are often quoting different fixes.",
];

const JUMP_LINKS = [
  { href: "#ranges", label: "Guide prices" },
  { href: "#factors", label: "Seven factors" },
  { href: "#compare", label: "Comparing quotes" },
  { href: "#adelaide", label: "Adelaide timing" },
  { href: "#faq", label: "FAQs" },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const h3 = "font-display text-lg font-bold tracking-tight text-ink";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const inlineLink = "font-semibold text-clay hover:text-clay-deep";
const th = "border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink";
const td = "border-b border-mortar px-4 py-3 font-body text-sm text-ink/75 align-top";

export default function RepairCostFactorsPage() {
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
            <ArticleMeta slug="roof-repair-cost-factors" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Roof repair cost depends mostly on what&apos;s causing the problem, how many areas
              need work, how easy the roof is to get onto, and whether the materials are easy to
              match. As a typical guide in Adelaide, a minor leak repair runs about{" "}
              <strong className="text-ink">$230 to $735</strong> and replacing broken tiles about
              $275 to $920, based on a published Adelaide price guide (November 2026). That&apos;s
              why two homeowners describing &ldquo;a few cracked tiles&rdquo; can get quotes
              hundreds of dollars apart without anyone overcharging.
            </p>
            <p className={body}>
              For what the work involves and how to get matched with a local roofer, see our{" "}
              <Link href="/services/roof-repairs" className={inlineLink}>
                roof repairs in Adelaide
              </Link>{" "}
              page.
            </p>

            <ArticleKeyPoints points={KEY_POINTS} jumpLinks={JUMP_LINKS} />

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-repairs.webp"
                alt={IMAGE_ALT}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article id="ranges" className="scroll-mt-24">
                <h2 className={h2}>Roof repair cost in Adelaide: typical guide prices</h2>
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
                  If the whole ridge or most of the tiles need work, compare against{" "}
                  <Link href="/blog/roof-restoration-cost-adelaide" className={inlineLink}>
                    the cost of a full restoration
                  </Link>
                  , which can be better value than several separate repairs.
                </p>
              </article>

              <article id="factors" className="scroll-mt-24">
                <h2 className={h2}>The seven factors that move a repair quote</h2>
                <div className="mt-6 space-y-6">
                  {FACTORS.map((f) => (
                    <div key={f.title}>
                      <h3 className={h3}>{f.title}</h3>
                      <p className="mt-2 font-body leading-relaxed text-ink/70">{f.text}</p>
                    </div>
                  ))}
                </div>
                <p className={body}>
                  Not sure which trade you need? See{" "}
                  <Link href="/blog/roofer-vs-contractor-vs-plumber" className={inlineLink}>
                    the difference between a roofer and a roof plumber
                  </Link>
                  .
                </p>
              </article>

              <article id="compare" className="scroll-mt-24">
                <h2 className={h2}>How to compare two repair quotes</h2>
                <p className={body}>Ask each roofer to put these in writing:</p>
                <ul className={list}>
                  <li>What they believe is causing the problem, with photos from the roof.</li>
                  <li>Exactly what they will fix, and what they won&apos;t.</li>
                  <li>How they&apos;ll price anything hidden, such as rotten battens.</li>
                  <li>Whether access equipment and tip fees are included.</li>
                  <li>The workmanship warranty on the repair.</li>
                  <li>Their licence number, which you can check on the CBS register.</li>
                  <li>
                    The deposit. In SA, a deposit on domestic building work is capped at $1,000, or
                    5% if the contract is over $20,000, so a repair should never need a big
                    upfront payment.
                  </li>
                </ul>
                <p className={body}>
                  If the same problem keeps coming back, read{" "}
                  <Link href="/blog/repair-vs-replace" className={inlineLink}>
                    whether to repair, restore or replace
                  </Link>{" "}
                  before paying for another fix.
                </p>
              </article>

              <article id="adelaide" className="scroll-mt-24">
                <h2 className={h2}>Adelaide timing: when repairs cost more</h2>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Winter:</strong> Bureau of Meteorology figures for
                    Kent Town show June is Adelaide&apos;s wettest month on average, and leaks
                    tend to show up once the rain sets in. Getting the roof checked in autumn
                    avoids paying for an urgent call-out.
                  </li>
                  <li>
                    <strong className="text-ink">After hail:</strong> large hail is most common in
                    spring and early summer, and roofers are busiest straight after a storm. If
                    your policy covers storm damage, see{" "}
                    <Link href="/blog/insurance-roof-replacement-sa" className={inlineLink}>
                      what insurance will pay for
                    </Link>{" "}
                    before you book.
                  </li>
                </ul>
                <p className={body}>
                  A regular check-up catches small problems first. Here&apos;s{" "}
                  <Link href="/blog/how-often-inspect-your-roof" className={inlineLink}>
                    how often to have your roof inspected
                  </Link>
                  .
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Why an instant estimate still helps
                </h2>
                <p className={body}>
                  A fair estimate accounts for these factors rather than quoting a flat number.
                  Use the calculator below for a figure based on your roof, then get it confirmed
                  on site.
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

              <ArticleFaq id="faq" heading="Roof repair cost: common questions" faqs={FAQS} />

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
            Get your instant repair estimate
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
