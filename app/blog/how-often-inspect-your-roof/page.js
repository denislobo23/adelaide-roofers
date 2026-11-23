// app/blog/how-often-inspect-your-roof/page.js
// Featured image: public/images/service-roof-inspection.webp (existing library image)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";
import ArticleMeta from "@/components/ArticleMeta";
import { articleMetadata } from "@/lib/articleMetadata";
import ArticleFaq from "@/components/ArticleFaq";
import ArticleSources from "@/components/ArticleSources";
import ArticleKeyPoints from "@/components/ArticleKeyPoints";
import PrintableChecklist from "@/components/PrintableChecklist";

const IMAGE_ALT =
  "Roofer on a ladder checking the flashing around a vent pipe on a terracotta tile roof, with the Adelaide city skyline behind";

export const metadata = articleMetadata({
  slug: "how-often-inspect-your-roof",
  title: "How Often Should You Inspect Your Roof? Adelaide Guide | Adelaide Roofers",
  description:
    "How often should you inspect your roof? A professional check every 2 to 3 years, your own checks twice a year, and after storms. Adelaide checklist.",
  image: "/images/service-roof-inspection.webp",
  imageAlt: IMAGE_ALT,
});

const HEADLINE = "How Often Should You Get Your Roof Inspected?";

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
      item: `${site.url}/blog/how-often-inspect-your-roof`,
    },
  ],
};

const SCHEDULE = [
  ["Every 2 to 3 years", "Professional inspection of a roof with no known problems", "A common rule of thumb; older roofs may warrant more often"],
  ["Twice a year (autumn and spring)", "Your own check from the ground and the manhole", "Before winter rain and before the fire danger season"],
  ["Before the fire danger season", "Clear gutters of leaves and debris", "CFS: keep gutters clean and free of debris"],
  ["Every 6 months (every 3 near the coast)", "Hose down unwashed areas of a Colorbond roof and gutters", "BlueScope TB-04"],
  ["After hail, high wind or a fallen branch", "Ground-level look, then a roofer if anything's out of place", "Damage isn't always visible from below"],
  ["After any trade works on the roof", "Check for broken tiles and leftover metal shavings", "Solar, antenna and air-con installs"],
  ["Before buying or selling", "A roof-specific inspection", "Building reports may not go into roof detail"],
];

const CHECKLIST = [
  "Cracked, slipped or missing tiles (use binoculars)",
  "Crumbling or missing mortar along the ridge capping",
  "Rust spots, lifted screws or loose flashings on a metal roof",
  "Gutters and downpipes clear; no overflow stains on the fascia",
  "Overhanging branches touching or dropping onto the roof",
  "Moss, lichen or dirt build-up",
  "Water stains on ceilings or cornices",
  "From the manhole with a torch: damp timber, daylight or drips",
  "After heavy rain: any new drips or damp patches",
];

const FAQS = [
  {
    q: "How often should a roof be inspected in Adelaide?",
    a: "A professional inspection every two to three years is a common rule of thumb for a roof with no known problems, plus your own ground-level check twice a year and a look after any big storm. Older roofs may warrant more frequent checks.",
  },
  {
    q: "How much does a roof inspection cost in Adelaide?",
    a: "A published Adelaide price guide puts a roof inspection or report at about $185 to $460, with $320 typical. A written report with photos is worth asking for.",
  },
  {
    q: "Should I get on the roof to check it myself?",
    a: "No. Check from the ground with binoculars and from the manhole with a torch. Tiles can crack underfoot, and older roofs may contain fragile asbestos cement. Leave anything on the roof to a roofer.",
  },
  {
    q: "What does a roofer look for during an inspection?",
    a: "Broken or slipped tiles, ridge capping mortar, rust and fixings on metal roofs, flashings around chimneys and penetrations, valleys, gutters and downpipes, and signs of leaks inside the roof space.",
  },
];

const SOURCES = [
  {
    href: "https://www.cfs.sa.gov.au/plan-prepare/before-a-fire-be-prepared/preparing-your-home-property/preparing-your-home-for-bushfires/",
    label: "Preparing your home for bushfires",
    note: " (SA Country Fire Service)",
  },
  {
    href: "https://cdn.dcs.bluescope.com.au/download/tb-04",
    label: "Technical Bulletin TB-04: maintenance of exterior BlueScope coated steel products",
    note: " (BlueScope, PDF)",
  },
  {
    href: "https://www.bom.gov.au/climate/averages/tables/cw_023090.shtml",
    label: "Climate statistics: Adelaide (Kent Town)",
    note: " (Bureau of Meteorology)",
  },
  {
    href: "https://www.ses.sa.gov.au/132500/index.html",
    label: "Storm and flood help: call 132 500",
    note: " (SA State Emergency Service)",
  },
  {
    href: "https://www.asbestossafety.gov.au/sites/default/files/2025-12/Chrysotile_Asbestos_factsheet.pdf",
    label: "Chrysotile asbestos fact sheet",
    note: " (Asbestos and Silica Safety and Eradication Agency, PDF)",
  },
  {
    href: "https://whatsthedamage.com.au/roofing-cost-adelaide/",
    label: "Roofing costs in Adelaide: roof inspection and report",
    note: " (What’s The Damage, independent price guide)",
  },
];

const KEY_POINTS = [
  "Professional inspection: every 2 to 3 years as a rule of thumb, more often for older roofs.",
  "Your own check: twice a year, from the ground and the manhole, never on the roof.",
  "Clear gutters before the fire danger season, as the CFS advises.",
  "Get it checked after hail, high winds or a fallen branch.",
];

const JUMP_LINKS = [
  { href: "#schedule", label: "The schedule" },
  { href: "#adelaide", label: "Adelaide timing" },
  { href: "#checklist", label: "Your checklist" },
  { href: "#cost", label: "Cost" },
  { href: "#faq", label: "FAQs" },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const inlineLink = "font-semibold text-clay underline-offset-2 hover:underline";
const th = "border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink";
const td = "border-b border-mortar px-4 py-3 font-body text-sm text-ink/75 align-top";

export default function HowOftenInspectPage() {
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
            <span className="eyebrow text-clay">Maintenance</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
              {HEADLINE}
            </h1>
            <ArticleMeta slug="how-often-inspect-your-roof" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              How often should you inspect your roof? A professional inspection every two to three
              years is a sensible rule of thumb for a roof with no known problems, with older roofs
              checked more often. In between, do your own check from the ground twice a year, in
              autumn before the winter rain and in spring before the fire danger season, and get
              the roof looked at after any hail, high wind or fallen branch. Never climb onto the
              roof yourself.
            </p>
            <p className={body}>
              Below: the full schedule, why the timing suits Adelaide, a printable checklist for
              your own checks, and what a professional inspection costs.
            </p>

            <ArticleKeyPoints points={KEY_POINTS} jumpLinks={JUMP_LINKS} />

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-inspection.webp"
                alt={IMAGE_ALT}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article id="schedule" className="scroll-mt-24">
                <h2 className={h2}>How often should you inspect your roof? The schedule</h2>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>When</th>
                        <th className={th}>What</th>
                        <th className={th}>Why</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SCHEDULE.map(([when, what, why], i) => (
                        <tr key={when} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{when}</td>
                          <td className={td}>{what}</td>
                          <td className={td}>{why}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  Inspect more often if the roof is older, has had repairs, sits under trees, or
                  you can&apos;t remember the last time anyone looked at it. A first inspection
                  often turns up small, cheap fixes. Here are the{" "}
                  <Link href="/blog/signs-you-need-a-new-roof" className={inlineLink}>
                    signs your roof may need replacing
                  </Link>
                  .
                </p>
              </article>

              <article id="adelaide" className="scroll-mt-24">
                <h2 className={h2}>Why autumn and spring suit Adelaide</h2>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Autumn, before the rain:</strong> Bureau of
                    Meteorology figures for Kent Town show Adelaide averages 10 to 12 rainy days a
                    month from June to August. Fixing a slipped tile or blocked gutter before then
                    is cheaper than fixing a ceiling after.
                  </li>
                  <li>
                    <strong className="text-ink">Spring, before the fire danger season:</strong> the
                    CFS advises keeping gutters clean and free of debris as part of preparing your
                    home for bushfires, which matters most in the Adelaide Hills and on the urban
                    fringe.
                  </li>
                  <li>
                    <strong className="text-ink">After a storm:</strong> hail and wind can crack
                    tiles or lift sheets without an obvious leak. For urgent storm damage, call the
                    SES on 132 500, and read{" "}
                    <Link href="/blog/insurance-roof-replacement-sa" className={inlineLink}>
                      what home insurance covers
                    </Link>{" "}
                    before you claim.
                  </li>
                  <li>
                    <strong className="text-ink">Near the coast:</strong> BlueScope recommends
                    washing unwashed areas of Colorbond every three months where there&apos;s salt
                    spray, instead of every six. See{" "}
                    <Link href="/blog/does-colorbond-rust" className={inlineLink}>
                      does Colorbond rust
                    </Link>
                    .
                  </li>
                </ul>
              </article>

              <article id="checklist" className="scroll-mt-24">
                <h2 className={h2}>Your twice-yearly check</h2>
                <p className={body}>
                  Stay off the roof. Older tiles crack underfoot, and many Adelaide homes built
                  before 1990 have asbestos cement somewhere, which is fragile and dangerous to
                  disturb. Binoculars from the ground and a torch at the manhole tell you most of
                  what you need.
                </p>
                <div className="mt-6">
                  <PrintableChecklist
                    heading="Printable checklist: your twice-yearly roof check"
                    intro="Do this from the ground and the manhole, in autumn and spring."
                    items={CHECKLIST}
                  />
                </div>
                <p className={body}>
                  If all you&apos;re seeing is moss, lichen or black streaks rather than damage,
                  you may only need a clean. See{" "}
                  <Link href="/services/roof-cleaning" className={inlineLink}>
                    roof cleaning in Adelaide
                  </Link>
                  .
                </p>
              </article>

              <article id="cost" className="scroll-mt-24">
                <h2 className={h2}>What a professional inspection costs</h2>
                <p className={body}>
                  A published Adelaide price guide (November 2026) puts a roof inspection or report
                  at about $185 to $460, with $320 typical. Ask for a written report with photos,
                  and for the roofer to separate what&apos;s urgent from what can wait. If repairs
                  come up, here&apos;s{" "}
                  <Link href="/blog/roof-repair-cost-factors" className={inlineLink}>
                    what affects the cost of a roof repair
                  </Link>
                  .
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Get an honest inspection, not a sales pitch
                </h2>
                <p className={body}>
                  We connect you with roofers who give a straight assessment: what&apos;s urgent,
                  what can wait, and what&apos;s simply fine.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/services/roof-inspection"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    See roof inspection &amp; report →
                  </Link>
                  <Link
                    href="/calculator"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-ink px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
                  >
                    Try the free calculator →
                  </Link>
                </div>
              </article>

              <ArticleFaq id="faq" heading="Roof inspections: common questions" faqs={FAQS} />

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
