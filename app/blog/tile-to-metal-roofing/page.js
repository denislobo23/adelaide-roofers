// app/blog/tile-to-metal-roofing/page.js
// Featured image: public/images/service-colorbond-roofing.webp (existing library image)

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
  "Modern two-storey home with a dark Colorbond roof, the finished look of a tile to Colorbond roof conversion";

export const metadata = articleMetadata({
  slug: "tile-to-metal-roofing",
  title: "Tile to Colorbond Roof: What Actually Changes | Adelaide Roofers",
  description:
    "Switching to a tile to Colorbond roof? What changes: weight, tie-downs, battens, heat, noise, solar and approval, plus typical Adelaide costs.",
  image: "/images/service-colorbond-roofing.webp",
  imageAlt: IMAGE_ALT,
});

const HEADLINE = "What Actually Changes When You Go Tile-to-Metal";

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
      item: `${site.url}/blog/tile-to-metal-roofing`,
    },
  ],
};

const BEFORE_AFTER = [
  ["Weight on the frame", "Concrete tiles about 50 to 58 kg per m²", "Colorbond sheet about 4.3 kg per m²"],
  ["Holding it down", "Tile weight helps resist wind uplift", "Needs specific tie-down connections for uplift"],
  ["Battens", "Spaced for tiles", "Usually re-battened to suit the sheet"],
  ["Ridge and hips", "Capping bedded and pointed in mortar", "Metal capping screwed down; no mortar"],
  ["Joins", "Hundreds of individual tiles", "Long sheets with far fewer joins"],
  ["Solar mounting", "Hooks under the tiles", "Brackets fixed to the sheet or battens"],
  ["Rain noise", "Quieter by default", "Quiet with an insulation blanket under the sheets"],
  ["Look", "Tile profile and texture", "A visible change to the street; may need approval in heritage areas"],
];

const STEPS = [
  "Check approval: heritage places and some overlays can need it for a change of material.",
  "Strip the tiles and dispose of them.",
  "Inspect the frame and replace anything rotten or damaged.",
  "Check and upgrade tie-downs and batten fixings for the lighter roof.",
  "Re-batten for the new sheets.",
  "Lay sarking or an insulation blanket, then the sheets.",
  "Fit flashings, capping and, if needed, new gutters.",
  "Clean off all swarf (metal shavings) before handover.",
];

const FAQS = [
  {
    q: "How much does it cost to replace a tile roof with Colorbond in Adelaide?",
    a: "A published Adelaide price guide puts a full tile-to-Colorbond re-roof on a single-storey home (no asbestos) at about $12,900 to $27,600. Your roof's size, pitch, access and the state of the frame decide where yours lands.",
  },
  {
    q: "Can you put Colorbond over tiles?",
    a: "No. The tiles are stripped off first. That lets the roofer check the frame, upgrade tie-downs and re-batten the roof to suit metal sheeting.",
  },
  {
    q: "Do you need new battens for a Colorbond roof?",
    a: "Usually. Tile battens are spaced and fixed for tiles, so most conversions re-batten to suit the sheet and fix the battens to resist wind uplift. Your roofer should say in the quote what they'll do.",
  },
  {
    q: "Is a Colorbond roof hotter than tile?",
    a: "Not if it's specified well. A lighter colour reflects more of the sun's heat, and an insulation blanket under the sheets plus ceiling insulation keeps the house cooler. Dark roofs of either material soak up heat.",
  },
];

const SOURCES = [
  {
    href: "https://www.monier.com.au/roof-tiles/concrete/elabana/",
    label: "Elabana concrete roof tiles: weight per m²",
    note: " (Monier)",
  },
  {
    href: "https://cdn.dcs.lysaght.com/download/custom-orb-and-custom-blue-orb-brochure",
    label: "Custom Orb design and installation guide: mass per m²",
    note: " (Lysaght, BlueScope, PDF)",
  },
  {
    href: "https://colorbond.com/faq",
    label: "Colorbond steel FAQs: swarf, hail and maintenance",
    note: " (Colorbond, BlueScope)",
  },
  {
    href: "https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval",
    label: "Find out if you need approval",
    note: " (PlanSA)",
  },
  {
    href: "https://whatsthedamage.com.au/roofing-cost-adelaide/",
    label: "Roofing costs in Adelaide: tile to Colorbond re-roof",
    note: " (What’s The Damage, independent price guide)",
  },
];

const KEY_POINTS = [
  "A Colorbond roof weighs roughly a tenth of a concrete tile roof.",
  "Lighter means less load on the frame, but it needs proper tie-downs against wind uplift.",
  "Expect the tiles stripped, the frame checked and the roof re-battened.",
  "Typical Adelaide guide price for a single-storey conversion: about $12,900 to $27,600.",
];

const JUMP_LINKS = [
  { href: "#before-after", label: "Before and after" },
  { href: "#weight", label: "Weight and tie-downs" },
  { href: "#steps", label: "What the job involves" },
  { href: "#comfort", label: "Heat and noise" },
  { href: "#approval", label: "Approval" },
  { href: "#cost", label: "Cost" },
  { href: "#faq", label: "FAQs" },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const olist = "mt-4 list-decimal space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:font-semibold marker:text-clay";
const inlineLink = "font-semibold text-clay hover:text-clay-deep";
const th = "border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink";
const td = "border-b border-mortar px-4 py-3 font-body text-sm text-ink/75 align-top";

export default function TileToMetalPage() {
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
            <ArticleMeta slug="tile-to-metal-roofing" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Going from a tile to Colorbond roof changes more than the look. The roof becomes
              roughly a tenth of the weight, so the frame carries far less load, but the lighter
              roof has to be properly tied down against wind uplift. The tiles come off, the frame
              is checked, and the roof is usually re-battened for the sheets. Done well, you get
              fewer joins to fail, simpler solar mounting and less maintenance; heat and rain noise
              depend on the colour and insulation you choose. In heritage areas, the change of
              material may need approval first.
            </p>
            <p className={body}>
              Below: a before-and-after table, what the job involves, heat and noise, approval,
              and typical Adelaide costs. To see the work itself, visit{" "}
              <Link href="/services/colorbond-roofing" className={inlineLink}>
                our Colorbond roofing page
              </Link>
              .
            </p>

            <ArticleKeyPoints points={KEY_POINTS} jumpLinks={JUMP_LINKS} />

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-colorbond-roofing.webp"
                alt={IMAGE_ALT}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article id="before-after" className="scroll-mt-24">
                <h2 className={h2}>Tile to Colorbond: what changes, side by side</h2>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>What</th>
                        <th className={th}>Tile roof</th>
                        <th className={th}>Colorbond roof</th>
                      </tr>
                    </thead>
                    <tbody>
                      {BEFORE_AFTER.map(([what, tile, metal], i) => (
                        <tr key={what} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{what}</td>
                          <td className={td}>{tile}</td>
                          <td className={td}>{metal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  Weighing up the two materials from scratch? See{" "}
                  <Link href="/blog/colorbond-vs-tile" className={inlineLink}>
                    Colorbond vs tile for Adelaide homes
                  </Link>
                  . This page is about what happens when you make the switch.
                </p>
              </article>

              <article id="weight" className="scroll-mt-24">
                <h2 className={h2}>Weight and tie-downs: the part people miss</h2>
                <p className={body}>
                  Monier lists its Elabana concrete tile at 49.5&nbsp;kg per m², and other profiles
                  at up to 58.3&nbsp;kg. Lysaght&apos;s Custom Orb sheet in 0.42&nbsp;mm Colorbond is
                  about 4.35&nbsp;kg per m². Taking that much weight off an older frame is a real
                  benefit, especially if it has sagged.
                </p>
                <p className={body}>
                  The catch: a heavy tile roof is partly held down by its own weight. A light metal
                  roof relies instead on how securely it&apos;s fixed to the frame to resist wind
                  uplift. So a conversion should include checking, and
                  usually upgrading, how the roof frame is tied to the walls and how the battens are
                  fixed. Ask every roofer to say in their quote what they&apos;ll do.
                </p>
              </article>

              <article id="steps" className="scroll-mt-24">
                <h2 className={h2}>What a tile to Colorbond conversion involves</h2>
                <ol className={olist}>
                  {STEPS.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
                <p className={body}>
                  Most of this happens in the first couple of days. See{" "}
                  <Link href="/blog/how-long-does-roof-replacement-take" className={inlineLink}>
                    how long a roof replacement takes
                  </Link>{" "}
                  for a day-by-day breakdown. If your existing roof is asbestos cement rather than
                  tile, read the{" "}
                  <Link href="/blog/asbestos-roof-removal-guide" className={inlineLink}>
                    asbestos roof removal guide
                  </Link>{" "}
                  first.
                </p>
              </article>

              <article id="comfort" className="scroll-mt-24">
                <h2 className={h2}>Heat, noise and the finish</h2>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Heat:</strong> lighter colours reflect more of the
                    sun&apos;s heat, and BlueScope&apos;s Thermatech technology in its core colours
                    is designed to reflect more heat on hot days. Pair it with an insulation
                    blanket and good ceiling insulation for Adelaide summers.
                  </li>
                  <li>
                    <strong className="text-ink">Rain noise:</strong> an insulation blanket under the
                    sheets does most of the work. Here&apos;s{" "}
                    <Link href="/blog/metal-roof-noise-in-rain" className={inlineLink}>
                      what controls metal roof noise
                    </Link>
                    .
                  </li>
                  <li>
                    <strong className="text-ink">Finish:</strong> Colorbond is factory-painted, so it
                    doesn&apos;t need recoating the way an ageing painted tile roof does. Keep
                    unwashed areas clean; see{" "}
                    <Link href="/blog/does-colorbond-rust" className={inlineLink}>
                      does Colorbond rust
                    </Link>
                    .
                  </li>
                  <li>
                    <strong className="text-ink">Solar:</strong> metal is the simplest roof to mount
                    panels on. Here&apos;s{" "}
                    <Link href="/blog/solar-panels-and-your-roof" className={inlineLink}>
                      what to check on your roof before solar goes on
                    </Link>
                    .
                  </li>
                </ul>
              </article>

              <article id="approval" className="scroll-mt-24">
                <h2 className={h2}>Check approval before you sign</h2>
                <p className={body}>
                  A like-for-like re-roof usually doesn&apos;t need approval in SA, but changing
                  material is a visible change. Heritage places and historic or character overlays,
                  found in suburbs such as Unley and Norwood, can need approval and may expect a
                  roof that suits the streetscape. Check your address on PlanSA first; our guide to{" "}
                  <Link href="/blog/council-approval-roof-replacement-sa" className={inlineLink}>
                    council approval for a new roof
                  </Link>{" "}
                  walks through it.
                </p>
              </article>

              <article id="cost" className="scroll-mt-24">
                <h2 className={h2}>What it costs</h2>
                <p className={body}>
                  A published Adelaide price guide (November 2026) puts a full tile-to-Colorbond
                  re-roof on a single-storey home, with no asbestos, at about $12,900 to $27,600.
                  For per-m² rates and what pushes the price up, see{" "}
                  <Link href="/blog/roof-replacement-cost-adelaide" className={inlineLink}>
                    roof replacement cost in Adelaide
                  </Link>
                  , or price your own roof with the calculator below. When you&apos;re ready to
                  compare quotes, see our{" "}
                  <Link href="/services/roof-replacement" className={inlineLink}>
                    roof replacement in Adelaide
                  </Link>{" "}
                  page.
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

              <ArticleFaq id="faq" heading="Tile to Colorbond: common questions" faqs={FAQS} />

              <ArticleSources sources={SOURCES} />
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
            Price your tile to Colorbond switch
          </h2>
          <p className="mx-auto mt-3 max-w-md font-body text-ink/65">
            Choose roof replacement, then your current tile and Colorbond as the new roof, for a
            free, no-obligation ballpark figure.
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
