// app/blog/colorbond-vs-tile/page.js
// Featured image: public/images/service-colorbond-roofing.webp (existing library image, no generation needed — also used by tile-to-metal-roofing article; same topic area, acceptable reuse)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";
import ArticleMeta from "@/components/ArticleMeta";
import { articleMetadata } from "@/lib/articleMetadata";

export const metadata = articleMetadata({
  slug: "colorbond-vs-tile",
  title: "Colorbond vs Tile: Which Is Better for Adelaide Homes? | Adelaide Roofers",
  description:
    "Colorbond vs tile for Adelaide homes: weight, heat, noise, coastal rust, heritage rules and maintenance compared, plus when to choose each.",
  image: "/images/service-colorbond-roofing.webp",
  imageAlt: "Colorbond metal roofing compared to tile roofing on Adelaide homes",
});

const HEADLINE = "Colorbond vs Tile: Which Is Better for Adelaide Homes?";

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
      item: `${site.url}/blog/colorbond-vs-tile`,
    },
  ],
};

const COMPARISON = [
  { factor: "Weight", colorbond: "Very light", tile: "Heavy" },
  { factor: "Install time", colorbond: "Faster", tile: "Slower" },
  { factor: "Maintenance", colorbond: "Low: occasional wash, check fixings", tile: "Re-bedding, re-pointing and coating over time" },
  { factor: "Heat", colorbond: "Light colours reflect heat well", tile: "Tiles absorb heat and release it slowly" },
  { factor: "Rain noise", colorbond: "Louder unless well insulated", tile: "Quieter" },
  { factor: "Coastal suburbs", colorbond: "Needs the right grade near the sea", tile: "Generally handles salt air well" },
  { factor: "Look", colorbond: "Modern, wide colour range", tile: "Traditional, suits older streets" },
  { factor: "Heritage areas", colorbond: "May need approval", tile: "May need approval; the original material is usually preferred" },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const inlineLink = "font-semibold text-clay hover:text-clay-deep";
const th = "border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink";

export default function ColorbondVsTilePage() {
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
            <ArticleMeta slug="colorbond-vs-tile" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              For most Adelaide re-roofs, Colorbond is the more popular choice: it&apos;s lighter,
              quicker to install, low-maintenance and handles Adelaide&apos;s hot summers well in
              light colours. Tile is the better pick for heritage and character homes, for a
              traditional look, or where you want a quieter roof and a like-for-like replacement.
              Neither is wrong. The right answer depends on your home, your street and your
              budget.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-colorbond-roofing.webp"
                alt="Colorbond metal roofing compared to tile roofing on Adelaide homes"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className={h2}>Side-by-side comparison</h2>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>Factor</th>
                        <th className={th}>Colorbond (steel)</th>
                        <th className={th}>Tile (concrete or terracotta)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISON.map((row, i) => (
                        <tr key={row.factor} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className="border-b border-mortar px-4 py-3 font-body text-sm font-semibold text-ink">{row.factor}</td>
                          <td className="border-b border-mortar px-4 py-3 font-body text-sm text-ink/75">{row.colorbond}</td>
                          <td className="border-b border-mortar px-4 py-3 font-body text-sm text-ink/75">{row.tile}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <article>
                <h2 className={h2}>Cost</h2>
                <p className={body}>
                  Prices depend on roof size, pitch, access and what&apos;s coming off. As a rule, a
                  like-for-like re-roof in either material is a big spend, and switching from tile
                  to Colorbond adds some extra work at the start. See our{" "}
                  <Link href="/blog/roof-replacement-cost-adelaide" className={inlineLink}>
                    roof replacement cost guide
                  </Link>{" "}
                  for current Adelaide ranges.
                </p>
              </article>

              <article>
                <h2 className={h2}>Adelaide&apos;s climate</h2>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Heat:</strong> Adelaide summers regularly pass
                    40&nbsp;°C. A light Colorbond colour with good insulation and sarking keeps a
                    home noticeably cooler. Dark roofs of either type soak up heat.
                  </li>
                  <li>
                    <strong className="text-ink">Coastal salt air:</strong> in suburbs like
                    Glenelg, Henley Beach, Semaphore and Brighton, ask your roofer which steel grade
                    suits your distance from the sea. See{" "}
                    <Link href="/blog/does-colorbond-rust" className={inlineLink}>
                      does Colorbond rust?
                    </Link>
                  </li>
                  <li>
                    <strong className="text-ink">Storms:</strong> both perform well when installed
                    properly. Fixings and flashings matter more than the material.
                  </li>
                  <li>
                    <strong className="text-ink">Bushfire areas:</strong> in the Hills, both can
                    meet bushfire requirements, but the detail around gaps and sarking matters. Ask
                    your roofer.
                  </li>
                </ul>
              </article>

              <article>
                <h2 className={h2}>Noise</h2>
                <p className={body}>
                  The &ldquo;tin roof in the rain&rdquo; reputation comes from older roofs with no
                  insulation. A modern Colorbond roof with an insulation blanket is much quieter.
                  See{" "}
                  <Link href="/blog/metal-roof-noise-in-rain" className={inlineLink}>
                    is a metal roof really noisier?
                  </Link>
                </p>
              </article>

              <article>
                <h2 className={h2}>Heritage and council rules</h2>
                <p className={body}>
                  In heritage or character areas, changing from tile to metal can need approval,
                  and some areas expect the original material, which may be tile or corrugated
                  iron. Check before you get quotes.
                  See{" "}
                  <Link href="/blog/council-approval-roof-replacement-sa" className={inlineLink}>
                    do I need council approval?
                  </Link>
                </p>
              </article>

              <article>
                <h2 className={h2}>Choose Colorbond if</h2>
                <ul className={list}>
                  <li>You want low maintenance and a modern look.</li>
                  <li>Your roof frame is old or you&apos;re worried about weight.</li>
                  <li>You want a cooler home with a light-coloured roof.</li>
                  <li>You plan to add solar and want an easy mounting surface.</li>
                </ul>
              </article>

              <article>
                <h2 className={h2}>Choose tile if</h2>
                <ul className={list}>
                  <li>
                    Your home is heritage-listed or in a character area and the original roof was
                    tile.
                  </li>
                  <li>You want to keep the traditional look of your street.</li>
                  <li>You&apos;d like a quieter roof without extra insulation.</li>
                  <li>
                    Your current tiles are terracotta and still sound, so restoring or replacing
                    like-for-like makes sense. See{" "}
                    <Link href="/blog/terracotta-roofs-pros-cons" className={inlineLink}>
                      terracotta roofs: restore or replace
                    </Link>
                    .
                  </li>
                </ul>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Switching from tile to Colorbond
                </h2>
                <p className={body}>
                  It&apos;s one of the most common re-roofs in Adelaide. The old tiles and battens
                  come off, new battens and sarking go on, then the steel sheets. See{" "}
                  <Link href="/blog/tile-to-metal-roofing" className={inlineLink}>
                    what changes when you go tile-to-metal
                  </Link>
                  .
                </p>
                <p className={body}>
                  Whichever you choose, a local roofer can help with{" "}
                  <Link href="/services/roof-replacement" className={inlineLink}>
                    re-roofing your home
                  </Link>
                  , or see our{" "}
                  <Link href="/services/colorbond-roofing" className={inlineLink}>
                    Colorbond roofing page
                  </Link>
                  .
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
              </article>
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
          We&apos;ll match you with a vetted local roofer who can talk through the right
          material for your home.
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
