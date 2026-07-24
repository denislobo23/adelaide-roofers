// app/blog/roof-replacement-cost-adelaide/page.js
// Featured image: public/images/service-roof-replacement.webp (existing library image, no generation needed)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";
import RoofCalculator from "@/components/RoofCalculator";

export const metadata = {
  title: "How Much Does a Roof Replacement Cost in Adelaide? (2026) | Adelaide Roofers",
  description:
    "Real 2026 Adelaide price ranges for a full roof replacement, and the factors — size, material, access, and what's underneath — that actually move the number.",
  alternates: { canonical: `${site.url}/blog/roof-replacement-cost-adelaide` },
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
      name: "How Much Does a Roof Replacement Cost in Adelaide?",
      item: `${site.url}/blog/roof-replacement-cost-adelaide`,
    },
  ],
};

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
              How Much Does a Roof Replacement Cost in Adelaide?
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              A full <strong>roof replacement cost in Adelaide</strong> typically runs{" "}
              <strong>$12,000–$25,000+</strong> for a standard single-storey home, depending on
              size, material and what the roofer finds once the old roof comes off. It&apos;s
              the single biggest roofing spend most homeowners make — here&apos;s what actually
              drives that number.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-replacement.webp"
                alt="Roof replacement cost in Adelaide — new roofing sheets being installed on a home"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Roof size is the biggest single factor
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  More square metres means more material and more labour hours, plain and
                  simple. A modest single-storey home and a large family home with a complex
                  roofline can differ by tens of thousands of dollars for the same material —
                  size alone explains most of the spread you&apos;ll see between quotes for
                  &ldquo;a roof replacement&rdquo; without more detail attached.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Tile vs. Colorbond — and whether you&apos;re converting
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Like-for-like replacement (tile for tile, metal for metal) is generally the
                  cheaper path. Converting between material types — tile to Colorbond, most
                  commonly — costs more, since the old roof has to come off entirely and the
                  frame and battens checked before the new material goes on. That conversion
                  premium is real, but it&apos;s often worth it for the weight reduction and
                  lower long-term maintenance metal offers.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Access — single vs. double storey
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  As with almost every roofing job, a double-storey home usually needs
                  scaffolding or additional safety equipment that a single-storey job
                  doesn&apos;t. That setup cost applies across the whole job, not per square
                  metre, so it has a bigger relative impact on smaller double-storey roofs than
                  larger ones.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  What&apos;s actually coming off the roof
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Removing old tile or metal roofing and hauling it away is a standard, budgeted
                  part of any replacement quote. If your existing roof is asbestos cement
                  (fibro) — common on Adelaide homes built before the early 1980s — that&apos;s
                  a different, licensed process with its own cost structure, not something a
                  standard roofing crew can just include as a line item.{" "}
                  <Link href="/services/asbestos-roof-removal" className="font-semibold text-clay hover:text-clay-deep">
                    See our asbestos roof removal page
                  </Link>{" "}
                  if that applies to your home.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Get a number specific to your roof
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  These figures are a starting point, not your actual quote. Use the calculator
                  below — it factors in your roof&apos;s real size, material and condition
                  rather than giving you a generic range.
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
