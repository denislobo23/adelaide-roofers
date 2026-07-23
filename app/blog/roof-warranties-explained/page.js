// app/blog/roof-warranties-explained/page.js
// Featured image: public/images/service-roof-replacement.webp (existing library image, no generation needed — also used by roof-replacement-cost-adelaide article, acceptable reuse)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "Roof Warranties Explained: What's Actually Covered | Adelaide Roofers",
  description:
    "The difference between a materials warranty and a workmanship warranty, and the common mistakes that can quietly void either one.",
  alternates: { canonical: `${site.url}/blog/roof-warranties-explained` },
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
      name: "Roof Warranties Explained",
      item: `${site.url}/blog/roof-warranties-explained`,
    },
  ],
};

export default function RoofWarrantiesExplainedPage() {
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
            <span className="eyebrow text-clay">Choosing a roofer</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
              Roof Warranties Explained: What&apos;s Actually Covered
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              "It's under warranty" can mean very different things depending on which warranty
              you're actually talking about — and what you did (or didn't do) in the meantime.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-replacement.webp"
                alt="Newly installed roof covered by a workmanship warranty"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Materials warranty vs. workmanship warranty
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A materials warranty (from the manufacturer) covers defects in the roofing
                  product itself — a tile or sheet that fails prematurely due to a manufacturing
                  fault. A workmanship warranty (from the roofer) covers the installation itself
                  — a leak caused by poor flashing work, for example. They're separate, and a
                  roof genuinely needs both to be properly covered.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Typical warranty lengths
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Workmanship warranties commonly run several years, while materials warranties —
                  particularly on quality metal roofing — can run considerably longer. A small
                  repair generally carries a shorter warranty than a full restoration or
                  replacement, which is normal and not a red flag on its own.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Common ways a warranty gets voided
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Unauthorised modifications, other trades working on the roof afterward without
                  informing the original roofer, and simple lack of basic maintenance can all
                  void a warranty depending on its specific terms. This is exactly why the actual
                  written terms matter more than the headline length.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  What to actually ask for
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Ask for the warranty in writing, covering both materials and workmanship
                  separately if applicable, with the length and what specifically voids it spelled
                  out. A vague verbal assurance isn't something you can rely on later.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Every roofer we connect you with offers a real warranty
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A written workmanship warranty is one of the things we check for before
                  connecting you with a local roofer — not something you have to negotiate for
                  yourself.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/how-we-vet-our-roofers"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    See how we vet our roofers →
                  </Link>
                  <Link
                    href="/calculator"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-ink px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
                  >
                    Try the free calculator →
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
          We&apos;ll match you with a vetted local roofer backed by a real written warranty.
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
