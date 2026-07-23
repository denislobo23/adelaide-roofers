// app/blog/colorbond-vs-tile/page.js
// Featured image: public/images/service-colorbond-roofing.webp (existing library image, no generation needed — also used by tile-to-metal-roofing article; same topic area, acceptable reuse)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "Colorbond vs Tile: Which Is Better for Adelaide Homes? | Adelaide Roofers",
  description:
    "A straight comparison of Colorbond and tile roofing for Adelaide's climate — weight, cost, lifespan, noise, and which one actually suits your home.",
  alternates: { canonical: `${site.url}/blog/colorbond-vs-tile` },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Resources", item: `${site.url}/#resources` },
    {
      "@type": "ListItem",
      position: 3,
      name: "Colorbond vs Tile: Which Is Better for Adelaide Homes?",
      item: `${site.url}/blog/colorbond-vs-tile`,
    },
  ],
};

const COMPARISON = [
  { factor: "Weight", colorbond: "Roughly a third the weight of tile", tile: "Heavier — more load on the structure" },
  { factor: "Typical lifespan", colorbond: "40+ years with coastal-grade options", tile: "50+ years, but ridge capping needs re-bedding periodically" },
  { factor: "Noise in rain", colorbond: "Minimal with proper insulation/sarking", tile: "Naturally quieter" },
  { factor: "Solar compatibility", colorbond: "Simpler, more secure mounting", tile: "Possible, more involved mounting" },
  { factor: "Look", colorbond: "Clean, modern, factory-baked colour", tile: "Traditional, common on heritage homes" },
  { factor: "Maintenance", colorbond: "Generally lower over time", tile: "Occasional tile replacement, ridge re-pointing" },
];

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
              Colorbond vs Tile: Which Is Better for Adelaide Homes?
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              There's no universally &ldquo;better&rdquo; option between{" "}
              <strong>Colorbond and tile roofing in Adelaide</strong> — both perform well here.
              The right choice comes down to your home, your budget, and which trade-offs
              actually matter to you.
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
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Side-by-side comparison
                </h2>
                <div className="mt-5 overflow-hidden rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className="border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink">Factor</th>
                        <th className="border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink">Colorbond</th>
                        <th className="border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink">Tile</th>
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
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  When Colorbond usually makes more sense
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  If you're planning solar, want lower long-term maintenance, or your home is in
                  a salt-exposed coastal suburb where a coastal-grade metal option performs well,
                  Colorbond tends to be the stronger fit.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  When tile usually makes more sense
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  For heritage-listed homes or character-overlay areas, tile is often specifically
                  protected and required by council rules. It's also the natural choice if you
                  simply prefer the traditional look, or your home is already tiled and a
                  like-for-like replacement is the more cost-effective path.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Considering a switch?
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Converting from tile to Colorbond is one of the most common re-roofing
                  decisions Adelaide homeowners make.{" "}
                  <Link href="/blog/tile-to-metal-roofing" className="font-semibold text-clay hover:text-clay-deep">
                    See what actually changes when you make that switch
                  </Link>, or get a number for your specific home.
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
