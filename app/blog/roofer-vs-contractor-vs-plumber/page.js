// app/blog/roofer-vs-contractor-vs-plumber/page.js
// Featured image: public/images/service-roof-restoration.webp (existing library image, no generation needed)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "Roofer vs Roof Contractor vs Roof Plumber: Which Do You Need? | Adelaide Roofers",
  description:
    "The trade titles overlap, but they're not identical — what each one actually covers, and which one fits your specific job.",
  alternates: { canonical: `${site.url}/blog/roofer-vs-contractor-vs-plumber` },
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
      name: "Roofer vs Roof Contractor vs Roof Plumber",
      item: `${site.url}/blog/roofer-vs-contractor-vs-plumber`,
    },
  ],
};

export default function RooferVsContractorVsPlumberPage() {
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
              Roofer vs Roof Contractor vs Roof Plumber: Which Do You Need?
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              These titles get used loosely and often overlap in practice, but they're not
              strictly interchangeable. Here's the practical difference, and why it usually
              doesn't matter as much as people think.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-restoration.webp"
                alt="Roofing tradesperson working on an Adelaide tile roof"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  "Roofer" — the general umbrella term
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  In everyday use, "roofer" covers most of the trade — tiling, metal roofing,
                  restoration, and repairs. It's not a strict licensing category on its own; it's
                  the term most homeowners reach for regardless of what specific licence the
                  person actually holds.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  "Roof contractor" — usually about business structure, not trade
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  This term more often describes how a business operates — taking on and managing
                  roofing jobs, sometimes coordinating subcontractors — rather than a distinct
                  trade skill. A roof contractor and a roofer frequently refer to the same person
                  or business.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  "Roof plumber" — a specific, separate licence
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  This one's genuinely distinct: roof plumbing specifically covers metal roofing,
                  guttering, and flashing work, and is licensed separately from general roof
                  tiling in most Australian states. For metal re-roofs and complex gutter or
                  flashing work, a roof plumber's specific licence is the relevant one.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Why the label matters less than the licence
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Rather than getting hung up on which title someone uses, the question that
                  actually matters is whether they hold the right licence for your specific job —
                  tiling, metal roofing, or plumbing-classified roof work. That's a direct
                  question worth asking regardless of what they call themselves.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Skip the guesswork
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Tell us what your roof needs and we'll connect you with someone holding the
                  right licence for that specific job — no need to work out the terminology
                  yourself.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/calculator"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    Try the free calculator →
                  </Link>
                  <Link
                    href="/how-we-vet-our-roofers"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-ink px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
                  >
                    See how we vet our roofers →
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
          We&apos;ll match you with someone holding the right licence for the job.
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
