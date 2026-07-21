// app/blog/roof-restoration-cost-adelaide/page.js
// Featured image: public/images/service-roof-restoration.webp (existing library image, no generation needed)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "How Much Does Roof Restoration Cost in Adelaide? | Adelaide Roofers",
  description:
    "Real 2026 Adelaide price ranges for roof restoration, and what actually changes the number for your home.",
  alternates: { canonical: `${site.url}/blog/roof-restoration-cost-adelaide` },
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
      name: "How Much Does Roof Restoration Cost in Adelaide?",
      item: `${site.url}/blog/roof-restoration-cost-adelaide`,
    },
  ],
};

export default function RestorationCostPage() {
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
              How Much Does Roof Restoration Cost in Adelaide?
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Across metro Adelaide in 2026,{" "}
              <strong>roof restoration cost in Adelaide</strong> — cleaning, sealing, and
              repainting — typically runs <strong>$6,500–$10,000+</strong>. Here&apos;s what
              actually moves your number within, or beyond, that range.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-restoration.webp"
                alt="Roof restoration cost in Adelaide — roof being cleaned and resealed"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Roof size
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  The most direct driver — more square metres means more cleaning, more coating,
                  and more labour time. This is the single biggest factor in almost every
                  restoration quote.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  How much ridge capping needs re-bedding
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  The mortar bedding that holds ridge caps in place breaks down over time, well
                  before the tiles themselves fail — typically within 15–20 years on a tile roof.
                  Re-bedding and re-pointing this is a substantial part of most restoration jobs,
                  and how much of it needs doing varies a lot from roof to roof.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  How many tiles need replacing
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A restoration isn&apos;t just a clean and a coat — any cracked or broken tiles
                  found along the way typically get replaced as part of the job. A roof with
                  storm damage or years of foot traffic will need more replacement tiles than one
                  that&apos;s simply faded and chalky.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Single vs. double storey access
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  As with most roofing work, a double-storey home often needs scaffolding or
                  additional access equipment that adds to the overall cost — this applies to
                  restoration just as much as repairs or replacement.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Get a number specific to your roof
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  These ranges are a starting point, not your actual number. Roof size, material,
                  and condition all move the figure — our calculator accounts for your specific
                  details rather than giving you a generic estimate.
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
