// app/blog/asbestos-roof-removal-guide/page.js
// Featured image: public/images/service-asbestos-roof-removal.webp (new — see prompt given for the /services/asbestos-roof-removal page hero, same image reused here)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";
import ArticleMeta from "@/components/ArticleMeta";
import { articleMetadata } from "@/lib/articleMetadata";
import ArticleFaq from "@/components/ArticleFaq";
import RoofCalculator from "@/components/RoofCalculator";

export const metadata = articleMetadata({
  slug: "asbestos-roof-removal-guide",
  title: "Asbestos Roof Removal: What Adelaide Homeowners Need to Know | Adelaide Roofers",
  description:
    "Asbestos roof removal in Adelaide: how to spot it, SafeWork SA rules, what the job involves and typical costs of $40 to $150 per m².",
  image: "/images/service-asbestos-roof-removal.webp",
  imageAlt: "Removalist in a protective suit and respirator wet-wiping corrugated asbestos cement sheets during asbestos roof removal, with the work area taped off",
});

const HEADLINE = "Asbestos Roof Removal: What Adelaide Homeowners Need to Know";

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
      item: `${site.url}/blog/asbestos-roof-removal-guide`,
    },
  ],
};

const COSTS = [
  { item: "Licensed removal and disposal", range: "$40 to $150 per m²" },
  { item: "Removal bundled with a new roof", range: "Often adds $4,600 to $14,700 to the job" },
];

const FAQS = [
  {
    q: "How much does asbestos roof removal cost in Adelaide?",
    a: "Licensed removal and disposal typically costs around $40 to $150 per m². Bundled with a new roof, removal often adds $4,600 to $14,700 to the job. Roof size, height, pitch, access and disposal fees all move the price.",
  },
  {
    q: "How do I know if my roof is asbestos?",
    a: "Only a lab test can confirm it. Strong clues are a home or extension built before 1990 and grey corrugated or flat cement sheeting, often called fibro. If you're unsure, get a licensed asbestos assessor or removalist to take a sample rather than breaking off a piece yourself.",
  },
  {
    q: "Can I remove an asbestos roof myself?",
    a: "Not a whole roof. In South Australia, removing more than 10 m² of non-friable (bonded) asbestos needs a removalist with at least a Class B licence from SafeWork SA, and almost every house roof is bigger than that.",
  },
  {
    q: "Can an asbestos roof be painted or restored instead?",
    a: "Usually not in any lasting way. Pressure cleaning is off the table and replacing even a few sheets means handling asbestos. If the roof has failed, replacement is normally the only compliant option.",
  },
];

const SOURCES = [
  {
    href: "https://www.safework.sa.gov.au/licence-and-registration/apply-renew/asbestos",
    label: "Asbestos licences",
    note: " (SafeWork SA)",
  },
  {
    href: "https://www.safework.sa.gov.au/workplaces/work-tasks-and-projects/fragile-roofing",
    label: "Fragile roofing",
    note: " (SafeWork SA)",
  },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const inlineLink = "font-semibold text-clay hover:text-clay-deep";

export default function AsbestosRoofRemovalGuidePage() {
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
            <span className="eyebrow text-clay">Materials</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
              {HEADLINE}
            </h1>
            <ArticleMeta slug="asbestos-roof-removal-guide" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              If your home was built before 1990 and has grey, corrugated or flat cement sheeting
              on the roof, it may contain asbestos. You shouldn&apos;t remove a whole asbestos
              roof yourself: in South Australia, removing more than 10 m² of bonded asbestos
              needs a SafeWork SA licensed removalist, and that&apos;s effectively every roof.
              Asbestos roof removal on its own typically costs around{" "}
              <strong>$40 to $150 per m²</strong> in Adelaide, before the new roof goes on.
            </p>
            <p className={body}>
              Below is how to tell if your roof has asbestos, what the rules are, what the job
              involves and what it costs.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-asbestos-roof-removal.webp"
                alt="Removalist in a protective suit and respirator wet-wiping corrugated asbestos cement sheets during asbestos roof removal, with the work area taped off"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className={h2}>How to tell if your roof might be asbestos</h2>
                <p className={body}>
                  You can&apos;t confirm asbestos by looking at it. Only a lab test can. But these
                  are strong clues:
                </p>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Age:</strong> the home or extension was built
                    before 1990. Asbestos building products were banned in Australia at the end of
                    2003.
                  </li>
                  <li>
                    <strong className="text-ink">Material:</strong> grey corrugated sheeting, often
                    called &ldquo;fibro&rdquo; or &ldquo;AC&rdquo; (asbestos cement) sheeting.
                  </li>
                  <li>
                    <strong className="text-ink">Where:</strong> common on older sheds, garages,
                    carports and pergolas, not just the main house.
                  </li>
                  <li>
                    <strong className="text-ink">Condition:</strong> weathered, brittle,
                    moss-covered or cracked sheets.
                  </li>
                </ul>
                <p className={body}>
                  If you&apos;re unsure, get a licensed asbestos assessor or a removalist to take a
                  sample. Don&apos;t break off a piece yourself.
                </p>
              </article>

              <article>
                <h2 className={h2}>Is it dangerous right now?</h2>
                <p className={body}>
                  Bonded asbestos in good condition, left alone, is generally considered low risk.
                  The danger comes when fibres are released: when sheets are cracked, broken, cut,
                  drilled, sanded or pressure-washed.
                </p>
                <p className={body}>So the main rules for homeowners are simple:</p>
                <ul className={list}>
                  <li>Don&apos;t walk on it, drill it, cut it, sand it or pressure-wash it.</li>
                  <li>Don&apos;t try to repair or paint over badly damaged sheets yourself.</li>
                  <li>Do get it assessed if it&apos;s cracked, storm-damaged or deteriorating.</li>
                </ul>
              </article>

              <article>
                <h2 className={h2}>The rules in South Australia</h2>
                <p className={body}>SafeWork SA regulates asbestos removal. In plain terms:</p>
                <ul className={list}>
                  <li>
                    Over 10 m² of bonded (non-friable) asbestos must be removed by a licensed
                    removalist with at least a Class B licence.
                  </li>
                  <li>
                    Friable asbestos (crumbly, easily turned to dust) needs a Class A licence.
                  </li>
                  <li>The removalist must notify SafeWork SA before the job starts.</li>
                  <li>Waste must be wrapped and taken to an approved disposal facility.</li>
                  <li>
                    Drilling, cutting and pressure-washing asbestos cement are heavily restricted.
                  </li>
                </ul>
                <p className={body}>
                  You can check whether a removalist holds a current licence on the SafeWork SA
                  register. Always confirm current requirements with SafeWork SA, since rules can
                  change.
                </p>
              </article>

              <article>
                <h2 className={h2}>What the job involves</h2>
                <ol className="mt-4 list-decimal space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:font-semibold marker:text-clay">
                  <li>
                    <strong className="text-ink">Inspection and quote:</strong> the roof is
                    measured and assessed, and the removal and new roof are quoted together.
                  </li>
                  <li>
                    <strong className="text-ink">Notification:</strong> the licensed removalist
                    notifies SafeWork SA.
                  </li>
                  <li>
                    <strong className="text-ink">Site set-up:</strong> the area is sectioned off,
                    and neighbours may be told.
                  </li>
                  <li>
                    <strong className="text-ink">Removal:</strong> sheets are wetted down,
                    unfastened by hand (not broken or cut), and lowered carefully.
                  </li>
                  <li>
                    <strong className="text-ink">Wrapping and disposal:</strong> sheets are wrapped
                    in heavy plastic and taken to an approved facility.
                  </li>
                  <li>
                    <strong className="text-ink">Clearance:</strong> the area is checked before the
                    next trade starts.
                  </li>
                  <li>
                    <strong className="text-ink">New roof:</strong> a new tile or Colorbond roof
                    goes on, the same as any other re-roof — see{" "}
                    <Link href="/services/roof-replacement" className={inlineLink}>
                      our roof replacement and re-roofing page
                    </Link>{" "}
                    for that part of the job.
                  </li>
                </ol>
              </article>

              <article>
                <h2 className={h2}>What asbestos roof removal costs in Adelaide</h2>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className="border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink">Item</th>
                        <th className="border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink">Typical range</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COSTS.map((row, i) => (
                        <tr key={row.item} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className="border-b border-mortar px-4 py-3 font-body text-sm font-semibold text-ink">{row.item}</td>
                          <td className="border-b border-mortar px-4 py-3 font-body text-sm text-ink/75">{row.range}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  Prices vary with roof size, height, pitch, access and disposal fees. A steep
                  two-storey roof costs more than a single-storey carport. For the new roof itself,
                  see our{" "}
                  <Link href="/blog/roof-replacement-cost-adelaide" className={inlineLink}>
                    roof replacement cost guide
                  </Link>
                  .
                </p>
                <p className={body}>
                  Always ask for a single written quote that covers removal, disposal and the new
                  roof, so there are no surprises part way through.
                </p>
              </article>

              <article>
                <h2 className={h2}>Can an asbestos roof be repaired or restored instead?</h2>
                <p className={body}>
                  Usually not in any lasting way. Pressure cleaning is off the table, and replacing
                  even a few sheets means handling asbestos. If the roof has failed, replacement is
                  normally the only compliant option. A licensed roofer can tell you whether yours
                  is still sound enough to leave alone for now.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Before you get quotes
                </h2>
                <ul className={list}>
                  <li>Check the removalist&apos;s licence on the SafeWork SA register.</li>
                  <li>
                    Ask who does the removal and who does the new roof: one company, or two working
                    together?
                  </li>
                  <li>Confirm disposal is included and where the waste goes.</li>
                  <li>Ask for a clearance check after removal.</li>
                  <li>
                    Read our guide to{" "}
                    <Link href="/blog/how-to-read-a-roofing-quote" className={inlineLink}>
                      reading a roofing quote
                    </Link>
                    .
                  </li>
                </ul>
                <p className={body}>
                  We can connect you with a vetted local roofer who handles asbestos roof removal
                  through a licensed removalist, with one quote for the whole job.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/services/asbestos-roof-removal"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    See asbestos roof removal →
                  </Link>
                  <Link
                    href="/calculator"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-ink px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
                  >
                    Try the free calculator →
                  </Link>
                </div>
                <p className="mt-8 font-body text-sm text-ink/50">
                  Prices checked against published Adelaide pricing guides, November 2026.
                </p>
              </article>

              <ArticleFaq heading="Asbestos roof removal: common questions" faqs={FAQS} />

              <article>
                <h2 className="font-display text-lg font-bold tracking-tight text-ink">Sources</h2>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 font-body text-sm leading-relaxed text-ink/60 marker:text-clay">
                  {SOURCES.map((src) => (
                    <li key={src.href}>
                      <a href={src.href} target="_blank" rel="noopener noreferrer" className={inlineLink}>
                        {src.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                      {src.note}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>

          {/* ── SIDEBAR ──────────────────────────────────── */}
          <ArticleSidebar />
        </div>
      </section>

      {/* ── INSTANT CALCULATOR (full-width, matches the cost articles) ── */}
      <section className="mx-auto max-w-wrap px-5 pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Estimate your new roof after asbestos removal
          </h2>
          <p className="mx-auto mt-3 max-w-md font-body text-ink/65">
            Choose roof replacement and pick &ldquo;Asbestos cement (fibro)&rdquo; as your current
            roof for a free, no-obligation ballpark figure.
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
          We&apos;ll match you with a licensed local specialist for an obligation-free
          assessment.
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
