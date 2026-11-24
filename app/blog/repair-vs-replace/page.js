// app/blog/repair-vs-replace/page.js
// Featured image: public/images/service-roof-replacement.webp (existing library image)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";
import RepairVsReplaceQuiz from "@/components/RepairVsReplaceQuiz";
import ArticleMeta from "@/components/ArticleMeta";
import { articleMetadata } from "@/lib/articleMetadata";
import ArticleFaq from "@/components/ArticleFaq";
import ArticleSources from "@/components/ArticleSources";
import ArticleKeyPoints from "@/components/ArticleKeyPoints";

const IMAGE_ALT =
  "Roofers fitting new Colorbond sheets over the frame of a brick home, after deciding to replace rather than repair the roof";

export const metadata = articleMetadata({
  slug: "repair-vs-replace",
  title: "Should You Repair or Replace Your Roof? How to Decide | Adelaide Roofers",
  description:
    "Repair or replace your roof? A quick decision table, a 30-second quiz, typical Adelaide costs for each option, and why five years of repairs is the real test.",
  image: "/images/service-roof-replacement.webp",
  imageAlt: IMAGE_ALT,
});

const HEADLINE = "Repair vs. Replace: Which Does Your Roof Need?";

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
      item: `${site.url}/blog/repair-vs-replace`,
    },
  ],
};

const DECISION_TABLE = [
  {
    situation: "A few cracked tiles or a single leak, roof otherwise sound",
    path: "Repair",
    cost: "About $230 to $920",
    href: "/services/roof-repairs",
  },
  {
    situation: "Structurally sound but faded, chalky or mossy, or ridge capping starting to crumble",
    path: "Restoration",
    cost: "About $3,500 to $8,000 single-storey; $7,500 to $12,000+ for double-storey or complex roofs",
    href: "/services/roof-restoration",
  },
  {
    situation: "Leaks in different spots, or repairs needed more than once a year",
    path: "Getting close to replacement",
    cost: "Compare five years of repairs with one replacement",
    href: "/services/roof-replacement",
  },
  {
    situation: "Asbestos cement roof that's cracking or deteriorating",
    path: "Replacement (a safety call, not just cosmetics)",
    cost: "Licensed removal plus a new roof",
    href: "/services/roof-replacement",
  },
  {
    situation: "Wear across most of the roof, or you're about to add solar",
    path: "Replacement usually pays off over patching",
    cost: "About $12,900 to $27,600, single-storey",
    href: "/services/roof-replacement",
  },
];

// Illustration only: typical middle guide prices, five years.
const FIVE_YEAR = [
  ["Keep patching: two leak call-outs a year", "10 × $460", "$4,600", "Cause may still be there"],
  ["Restore once", "1 × $6,900", "$6,900", "Only if the roof is sound"],
  ["Replace once", "1 × $20,250", "$20,250", "New roof, new warranties"],
];

const FAQS = [
  {
    q: "Can a roof be repaired instead of replaced?",
    a: "Yes, if the problem is isolated and the rest of the roof is sound, such as a few cracked tiles or one failed flashing. If problems are spread across the roof or keep coming back, repairs only delay a replacement.",
  },
  {
    q: "Is it worth restoring an old roof?",
    a: "It's worth it when the tiles or sheets and the frame are still sound and the problems are wear on the surface, such as faded coating, moss or crumbling ridge pointing. It isn't worth it when tiles are crumbling, metal is rusting through or the frame is sagging.",
  },
  {
    q: "How do I know if my roof needs replacing?",
    a: "The clearest signs are leaks that keep coming back in different places, tiles that crumble or break when walked on, rust holes in metal sheets, a sagging roofline, and a cracking asbestos cement roof.",
  },
  {
    q: "Is it cheaper to repair or replace a roof?",
    a: "A single repair is far cheaper. But if you're calling a roofer more than once a year, add up five years of repairs and compare that with a restoration or replacement, because repeated repairs often don't fix the cause.",
  },
];

const SOURCES = [
  {
    href: "https://whatsthedamage.com.au/roofing-cost-adelaide/",
    label: "Roofing costs in Adelaide",
    note: " (What’s The Damage, independent price guide)",
  },
  {
    href: "https://www.asbestossafety.gov.au/about-asbestos/practical-guidance/householders-and-home-renovators",
    label: "Householders and home renovators",
    note: " (Asbestos Safety and Eradication Agency)",
  },
  {
    href: "https://www.safework.sa.gov.au/workplaces/work-tasks-and-projects/fragile-roofing",
    label: "Fragile roofing",
    note: " (SafeWork SA)",
  },
  {
    href: "https://media.bom.gov.au/social/blog/1733/explainer-how-does-hail-form/",
    label: "Explainer: how does hail form?",
    note: " (Bureau of Meteorology)",
  },
];

const KEY_POINTS = [
  "Repair an isolated problem on an otherwise sound roof.",
  "Restore a roof that's sound but worn on the surface.",
  "Replace when problems keep coming back or are spread across the roof, or it's deteriorating asbestos.",
  "Compare five years of repairs with one restoration or replacement, not one job's price.",
];

const JUMP_LINKS = [
  { href: "#decision-table", label: "Decision table" },
  { href: "#quiz", label: "30-second quiz" },
  { href: "#signs", label: "Signs for each" },
  { href: "#five-years", label: "Five-year cost" },
  { href: "#adelaide", label: "Adelaide factors" },
  { href: "#faq", label: "FAQs" },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const h3 = "font-display text-lg font-bold tracking-tight text-ink";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const inlineLink = "font-semibold text-clay hover:text-clay-deep";
const th = "border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink";
const td = "border-b border-mortar px-4 py-3 font-body text-sm text-ink/75 align-top";

export default function RepairVsReplacePage() {
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
            <span className="eyebrow text-clay">Repair vs. replace</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
              {HEADLINE}
            </h1>
            <ArticleMeta slug="repair-vs-replace" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Whether to repair or replace your roof comes down to how widespread the problem
              is. <strong className="text-ink">Repair</strong> an isolated problem on a roof
              that&apos;s otherwise sound. <strong className="text-ink">Restore</strong> a roof
              that&apos;s structurally fine but worn on the surface.{" "}
              <strong className="text-ink">Replace</strong> it when problems keep coming back,
              are spread across the roof, or it&apos;s an asbestos cement roof that&apos;s
              deteriorating. Don&apos;t compare one repair with one replacement: compare what
              you&apos;d spend on repairs over the next five years.
            </p>
            <p className={body}>
              Use the decision table or the 30-second quiz below, then check the signs and
              typical Adelaide costs for each path.
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
              <article id="decision-table" className="scroll-mt-24">
                <h2 className={h2}>Repair or replace your roof: the quick decision table</h2>
                <p className={body}>
                  Costs are typical guide ranges for 2026, including GST, not quotes. Repair and
                  replacement figures are from a published Adelaide price guide (November 2026).
                </p>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>Situation</th>
                        <th className={th}>Likely path</th>
                        <th className={th}>Typical guide cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DECISION_TABLE.map((row, i) => (
                        <tr key={row.situation} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={td}>{row.situation}</td>
                          <td className={`${td} font-semibold text-ink`}>
                            <Link href={row.href} className="text-ink underline-offset-2 hover:text-clay hover:underline">
                              {row.path}
                            </Link>
                          </td>
                          <td className={td}>{row.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <article id="quiz" className="scroll-mt-24">
                <h2 className={h2}>Or get a straight answer in 30 seconds</h2>
                <div className="mt-5">
                  <RepairVsReplaceQuiz />
                </div>
              </article>

              <article id="signs" className="scroll-mt-24">
                <h2 className={h2}>The signs for each path</h2>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className={h3}>It&apos;s probably a repair if…</h3>
                    <ul className={list}>
                      <li>one or two tiles are cracked or have slipped</li>
                      <li>there&apos;s a single leak with a clear source</li>
                      <li>the damage is in one small area, often after a storm</li>
                    </ul>
                    <p className={body}>
                      See{" "}
                      <Link href="/blog/roof-repair-cost-factors" className={inlineLink}>
                        what affects the cost of a roof repair
                      </Link>
                      .
                    </p>
                  </div>
                  <div>
                    <h3 className={h3}>It&apos;s probably a restoration if…</h3>
                    <ul className={list}>
                      <li>the coating is faded or chalky, or there&apos;s moss and lichen</li>
                      <li>the ridge capping mortar is cracking</li>
                      <li>nothing is failing yet, but it&apos;s heading that way</li>
                    </ul>
                    <p className={body}>
                      See{" "}
                      <Link href="/blog/roof-restoration-cost-adelaide" className={inlineLink}>
                        what a restoration includes and costs
                      </Link>
                      .
                    </p>
                  </div>
                  <div>
                    <h3 className={h3}>It&apos;s probably a replacement if…</h3>
                    <ul className={list}>
                      <li>leaks keep appearing in different places</li>
                      <li>tiles crumble or break when walked on, or metal is rusting through</li>
                      <li>the roofline sags</li>
                      <li>it&apos;s asbestos cement and cracking or deteriorating</li>
                    </ul>
                    <p className={body}>
                      Our{" "}
                      <Link href="/blog/signs-you-need-a-new-roof" className={inlineLink}>
                        10 signs you need a new roof
                      </Link>{" "}
                      goes through each one with a printable checklist.
                    </p>
                  </div>
                </div>
              </article>

              <article id="five-years" className="scroll-mt-24">
                <h2 className={h2}>Compare five years, not one job</h2>
                <p className={body}>
                  An illustration using typical middle guide prices for a single-storey Adelaide
                  home. Your numbers will differ, but the pattern is the point:
                </p>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>Option</th>
                        <th className={th}>Working</th>
                        <th className={th}>Five-year spend</th>
                        <th className={th}>Catch</th>
                      </tr>
                    </thead>
                    <tbody>
                      {FIVE_YEAR.map(([o, w, t, c], i) => (
                        <tr key={o} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{o}</td>
                          <td className={td}>{w}</td>
                          <td className={td}>{t}</td>
                          <td className={td}>{c}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  Patching looks cheapest on paper, but if the roof is failing across the board,
                  you can spend thousands and still end up replacing it. If the roof is sound, a
                  restoration usually ends the call-outs for far less than a new roof. For the
                  full figures, see{" "}
                  <Link href="/blog/roof-replacement-cost-adelaide" className={inlineLink}>
                    roof replacement cost in Adelaide
                  </Link>
                  .
                </p>
              </article>

              <article id="adelaide" className="scroll-mt-24">
                <h2 className={h2}>Adelaide factors that tip the decision</h2>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Asbestos:</strong> the Asbestos Safety and
                    Eradication Agency says a home built or renovated before 1990 probably has
                    some asbestos. SafeWork SA treats asbestos cement roofing as fragile, so
                    don&apos;t let anyone walk on or patch it without checking first. See the{" "}
                    <Link href="/blog/asbestos-roof-removal-guide" className={inlineLink}>
                      asbestos roof removal guide
                    </Link>
                    .
                  </li>
                  <li>
                    <strong className="text-ink">Hail:</strong> large hail is most common in
                    spring and early summer. If a storm caused the damage, check{" "}
                    <Link href="/blog/insurance-roof-replacement-sa" className={inlineLink}>
                      what your insurance will cover
                    </Link>{" "}
                    before choosing.
                  </li>
                  <li>
                    <strong className="text-ink">Heritage and character areas:</strong> in
                    overlays found in suburbs such as Unley and Norwood, a replacement that changes
                    the roof&apos;s material or look can need council approval, while a like-for-like
                    repair usually won&apos;t. Check{" "}
                    <Link href="/blog/council-approval-roof-replacement-sa" className={inlineLink}>
                      when a new roof needs council approval
                    </Link>
                    .
                  </li>
                  <li>
                    <strong className="text-ink">Solar:</strong> if panels are coming, fix or
                    replace the roof first. Here&apos;s{" "}
                    <Link href="/blog/solar-panels-and-your-roof" className={inlineLink}>
                      what to check before solar goes on
                    </Link>
                    .
                  </li>
                </ul>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Not sure? Get it inspected first
                </h2>
                <p className={body}>
                  A roof inspection and report typically costs about $185 to $460 in Adelaide, a
                  small spend before a big decision. Ask for photos of every problem area.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/calculator"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    Try the free calculator →
                  </Link>
                  <Link
                    href="/free-guide"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-ink px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
                  >
                    Get the free guide →
                  </Link>
                </div>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {[
                    { href: "/services/roof-repairs", label: "Roof repairs in Adelaide" },
                    { href: "/services/roof-restoration", label: "Roof restoration in Adelaide" },
                    { href: "/services/roof-replacement", label: "Roof replacement in Adelaide" },
                    { href: "/services/roof-inspection", label: "Roof inspections" },
                  ].map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="font-display text-sm font-semibold text-clay hover:text-clay-deep">
                        {l.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>

              <ArticleFaq id="faq" heading="Repair or replace: common questions" faqs={FAQS} />

              <ArticleSources sources={SOURCES} />
            </div>
          </div>

          {/* ── SIDEBAR ──────────────────────────────────── */}
          <ArticleSidebar />
        </div>
      </section>

      <section className="mx-auto max-w-wrap px-5 py-20 text-center">
        <h2 className="mx-auto max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Tell us your suburb and what&apos;s going on with your roof
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-ink/65">
          We&apos;ll match you with a vetted local roofer for an obligation-free assessment.
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
