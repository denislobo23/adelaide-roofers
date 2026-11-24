// app/blog/terracotta-roofs-pros-cons/page.js
// Featured image: public/images/blog-terracotta-roof.webp

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

const IMAGE_ALT =
  "Weathered terracotta roof tiles with ridge capping and brick chimneys on an older red-brick Adelaide home";

export const metadata = articleMetadata({
  slug: "terracotta-roofs-pros-cons",
  title: "Terracotta Roof Tiles: Pros, Cons, Restore or Replace | Adelaide Roofers",
  description:
    "Terracotta roof tiles: the real pros and cons, how they compare with concrete, typical Adelaide costs, and when to restore or replace an old terracotta roof.",
  image: "/images/blog-terracotta-roof.webp",
  imageAlt: IMAGE_ALT,
});

const HEADLINE = "Terracotta Roofs: Pros, Cons, and When to Restore vs Replace";

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
      item: `${site.url}/blog/terracotta-roofs-pros-cons`,
    },
  ],
};

const COMPARE = [
  ["What it is", "Fired clay", "Cement, sand and pigment, with a surface coating"],
  ["Colour over time", "Colour runs through the fired clay rather than sitting on the surface", "Surface coating fades and may need recoating"],
  ["Weight (example profiles)", "Monier Marseille: about 47 kg per m²", "Monier Elabana: about 50 kg per m²"],
  ["Restoration", "Gentler cleaning and compatible pointing; typically in the higher $7,500 to $12,000+ tier (incl. GST)", "Clean, re-point and recoat"],
  ["Re-roof, per m² (guide)", "About $120 to $240, incl. strip-off", "About $92 to $200 for tile, incl. strip-off"],
];

const DECIDE = [
  ["Sound tiles, crumbling ridge pointing", "Restore: re-bed and re-point the ridge capping"],
  ["Moss and dirt, a few cracked tiles", "Repair and clean; terracotta usually doesn't need painting"],
  ["Cracking spread across the roof", "Replace, or re-roof in a matching tile"],
  ["Profile discontinued and repairs keep coming", "Replace, or salvage tiles from a hidden section for the street side"],
];

const FAQS = [
  {
    q: "How long does a terracotta roof last?",
    a: "The tiles themselves are among the longest-lasting roofing materials, and their colour is part of the clay. The mortar under the ridge capping wears out much sooner and needs re-pointing or re-bedding along the way.",
  },
  {
    q: "Is terracotta better than concrete roof tiles?",
    a: "Terracotta keeps its colour without recoating and suits many older homes. Concrete tiles usually cost less per m². Both are heavy and quiet in rain. The better choice depends on your budget, your street and any heritage rules.",
  },
  {
    q: "How much does a terracotta roof restoration cost in Adelaide?",
    a: "As a typical 2026 guide, including GST, a terracotta restoration usually falls in the higher $7,500 to $12,000+ tier, because it needs gentler cleaning and compatible pointing. A single-storey concrete tile restoration is typically $4,500 to $8,000.",
  },
  {
    q: "Should you paint terracotta roof tiles?",
    a: "Usually there's no need, because the colour is in the fired clay. Cleaning, replacing cracked tiles and re-pointing the ridge capping is the usual restoration. Painting changes the look for good, so check heritage rules first.",
  },
];

const SOURCES = [
  {
    href: "https://www.monier.com.au/roof-tiles/terracotta/marseille/",
    label: "Marseille terracotta roof tiles: weight per m²",
    note: " (Monier)",
  },
  {
    href: "https://www.monier.com.au/roof-tiles/concrete/elabana/",
    label: "Elabana concrete roof tiles: weight per m²",
    note: " (Monier)",
  },
  {
    href: "https://whatsthedamage.com.au/roofing-cost-adelaide/",
    label: "Roofing costs in Adelaide: terracotta re-roofing",
    note: " (What’s The Damage, independent price guide)",
  },
  {
    href: "https://dit.sa.gov.au/__data/assets/pdf_file/0020/613316/Historic_Area_Statements_and_Character_Area_Statements_-_Phase_3_-_City_of_Unley.pdf",
    label: "Historic Area Statements: City of Unley",
    note: " (SA Government, PDF)",
  },
];

const KEY_POINTS = [
  "Terracotta's colour is in the fired clay, so it doesn't need recoating like concrete tile.",
  "It weighs about the same as concrete tile and is just as quiet in rain.",
  "Re-roofing in terracotta costs more: about $120 to $240 per m² as a guide.",
  "Most old terracotta roofs need ridge work, not replacement.",
];

const JUMP_LINKS = [
  { href: "#compare", label: "Terracotta vs concrete" },
  { href: "#pros-cons", label: "Pros and cons" },
  { href: "#adelaide", label: "Adelaide homes" },
  { href: "#decide", label: "Restore or replace" },
  { href: "#faq", label: "FAQs" },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const h3 = "font-display text-lg font-bold tracking-tight text-ink";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const inlineLink = "font-semibold text-clay underline-offset-2 hover:underline";
const th = "border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink";
const td = "border-b border-mortar px-4 py-3 font-body text-sm text-ink/75 align-top";

export default function TerracottaPage() {
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
            <ArticleMeta slug="terracotta-roofs-pros-cons" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Terracotta roof tiles are fired clay with the colour right through, so they keep
              their look for decades without recoating, and they suit many of Adelaide&apos;s
              older homes. The downsides: they cost more than concrete tile to buy and to restore,
              older or discontinued profiles can be hard to match, and they&apos;re heavy. Most
              ageing terracotta roofs don&apos;t need replacing; the ridge capping mortar usually
              fails long before the tiles, so a re-bed and re-point is the common fix.
            </p>
            <p className={body}>
              Below: terracotta vs concrete side by side, the pros and cons, what to know in
              Adelaide&apos;s older suburbs, and how to decide between restoring and replacing.
            </p>

            <ArticleKeyPoints points={KEY_POINTS} jumpLinks={JUMP_LINKS} />

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/blog-terracotta-roof.webp"
                alt={IMAGE_ALT}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article id="compare" className="scroll-mt-24">
                <h2 className={h2}>Terracotta roof tiles vs concrete tiles</h2>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>&nbsp;</th>
                        <th className={th}>Terracotta</th>
                        <th className={th}>Concrete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARE.map(([what, t, c], i) => (
                        <tr key={what} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{what}</td>
                          <td className={td}>{t}</td>
                          <td className={td}>{c}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  Re-roof costs are typical guide ranges from a published Adelaide price guide
                  (November 2026); the restoration tier is our typical guide range for 2026,
                  including GST. None of these are quotes. Comparing tile with metal instead? See{" "}
                  <Link href="/blog/colorbond-vs-tile" className={inlineLink}>
                    Colorbond vs tile
                  </Link>
                  .
                </p>
              </article>

              <article id="pros-cons" className="scroll-mt-24">
                <h2 className={h2}>The pros and cons</h2>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className={h3}>Pros</h3>
                    <ul className={list}>
                      <li>Colour is part of the clay, so no recoating to keep it looking right.</li>
                      <li>Among the longest-lasting roofing materials.</li>
                      <li>Heavy tiles are quiet in rain and absorb heat slowly.</li>
                      <li>The traditional look for many inter-war and later homes.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className={h3}>Cons</h3>
                    <ul className={list}>
                      <li>Dearer to re-roof in, and restoration typically costs more than for concrete.</li>
                      <li>Older tiles can crack when walked on, so only experienced roofers should go up.</li>
                      <li>Old or discontinued profiles can be hard to match for repairs.</li>
                      <li>
                        Heavy: if the frame has sagged, a lighter roof may make more sense. See{" "}
                        <Link href="/blog/tile-to-metal-roofing" className={inlineLink}>
                          what changes when you go tile to metal
                        </Link>
                        .
                      </li>
                    </ul>
                  </div>
                </div>
              </article>

              <article id="adelaide" className="scroll-mt-24">
                <h2 className={h2}>Terracotta on Adelaide&apos;s older homes</h2>
                <p className={body}>
                  Terracotta is common on older Adelaide homes, but it isn&apos;t automatically the
                  &ldquo;heritage&rdquo; choice. In the City of Unley&apos;s Historic Area
                  Statements, for example, the listed roof materials are corrugated iron, with tiled
                  roofs on some post-1900s buildings. If your home is in a historic or character
                  area, check what&apos;s expected before changing material, and read{" "}
                  <Link href="/blog/council-approval-roof-replacement-sa" className={inlineLink}>
                    when a new roof needs council approval
                  </Link>
                  .
                </p>
                <p className={body}>
                  Never pressure-clean an older roof until you know what it&apos;s made of: some
                  homes have asbestos cement sections, such as an extension or verandah. See the{" "}
                  <Link href="/blog/asbestos-roof-removal-guide" className={inlineLink}>
                    asbestos roof removal guide
                  </Link>
                  .
                </p>
              </article>

              <article id="decide" className="scroll-mt-24">
                <h2 className={h2}>Restore or replace a terracotta roof?</h2>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>What you see</th>
                        <th className={th}>Usual answer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DECIDE.map(([see, answer], i) => (
                        <tr key={see} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{see}</td>
                          <td className={td}>{answer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  For prices, see{" "}
                  <Link href="/blog/roof-restoration-cost-adelaide" className={inlineLink}>
                    roof restoration cost in Adelaide
                  </Link>
                  , and for the general framework, our{" "}
                  <Link href="/blog/repair-vs-replace" className={inlineLink}>
                    repair, restore or replace guide
                  </Link>
                  .
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Not sure which your roof needs?
                </h2>
                <p className={body}>
                  A local roofer can tell you honestly whether your terracotta roof needs
                  restoration or replacement. If it sounds like restoration, see our{" "}
                  <Link href="/services/roof-restoration" className={inlineLink}>
                    roof restoration in Adelaide
                  </Link>{" "}
                  page.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/calculator"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    Try the free calculator →
                  </Link>
                  <Link
                    href="/blog/repair-vs-replace"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-ink px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
                  >
                    Take the repair vs. replace quiz →
                  </Link>
                </div>
              </article>

              <ArticleFaq id="faq" heading="Terracotta roof tiles: common questions" faqs={FAQS} />

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
