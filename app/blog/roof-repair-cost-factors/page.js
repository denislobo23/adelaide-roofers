// app/blog/roof-repair-cost-factors/page.js
// Featured image: public/images/service-roof-repairs.webp (existing library image, no generation needed)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "What Factors Affect the Cost of a Roof Repair | Adelaide Roofers",
  description:
    "Why two quotes for the same job can be thousands apart — the real factors that drive roof repair pricing in Adelaide.",
  alternates: { canonical: `${site.url}/blog/roof-repair-cost-factors` },
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
      name: "What Factors Affect the Cost of a Roof Repair",
      item: `${site.url}/blog/roof-repair-cost-factors`,
    },
  ],
};

export default function RepairCostFactorsPage() {
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
              What Factors Affect the Cost of a Roof Repair
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Two homeowners with what sounds like the same problem — &ldquo;a few cracked
              tiles&rdquo; — can get quotes thousands of dollars apart. That&apos;s not
              necessarily one roofer overcharging.{" "}
              <strong>Roof repair cost in Adelaide</strong> for minor jobs typically runs{" "}
              <strong>$300–$1,500</strong>, but where a job lands in that range depends on a
              handful of specific factors.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-repairs.webp"
                alt="Roof repair cost in Adelaide — tradesperson repairing cracked roof tiles"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  How many areas actually need attention
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A single cracked tile is a different job to several separate problem areas
                  across the roof. Each additional area means more time on the roof, more
                  materials, and often a separate access setup — the cost doesn&apos;t scale
                  perfectly linearly, but it does scale.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Single vs. double storey
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Access is one of the biggest hidden cost drivers in roofing generally, and
                  repairs are no exception. A double-storey home often needs scaffolding or
                  additional safety equipment that a single-storey repair doesn&apos;t — that
                  setup cost applies whether the actual repair takes ten minutes or two hours.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Your roofing material
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Matching materials matters for a repair in a way it doesn&apos;t for a full
                  replacement. Terracotta tiles, older discontinued tile profiles, or
                  less-common Colorbond colours can be harder — and sometimes more expensive — to
                  source in small quantities than a standard material used on a full re-roof.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  What&apos;s actually causing the problem
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A cracked tile is a straightforward swap. A leak that&apos;s been running for
                  months might have already damaged the battens or timber underneath — and that
                  usually can&apos;t be confirmed from the ground or from a photo. This is the
                  most common reason a repair quote changes once a roofer is actually up there.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Why an instant estimate still helps
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  None of this means pricing is unknowable in advance — it means a fair estimate
                  accounts for these factors rather than quoting a flat number regardless of your
                  specific situation. That&apos;s exactly what our calculator does.
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
