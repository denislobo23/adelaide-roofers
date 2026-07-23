// app/blog/insurance-roof-replacement-sa/page.js
// Featured image: public/images/service-roof-repairs.webp (existing library image, no generation needed)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "Does Home Insurance Cover Roof Replacement in SA? | Adelaide Roofers",
  description:
    "What's typically covered versus not when it comes to roof damage and insurance in South Australia, and how to document a claim properly.",
  alternates: { canonical: `${site.url}/blog/insurance-roof-replacement-sa` },
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
      name: "Does Home Insurance Cover Roof Replacement in SA?",
      item: `${site.url}/blog/insurance-roof-replacement-sa`,
    },
  ],
};

export default function InsuranceRoofReplacementPage() {
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
              Does Home Insurance Cover Roof Replacement in SA?
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Sometimes — the honest answer depends entirely on <em>why</em> your roof needs
              work. Sudden, identifiable damage is treated very differently to gradual
              wear-and-tear, and that distinction decides whether a claim succeeds.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-repairs.webp"
                alt="Storm-damaged roof in Adelaide being assessed for an insurance claim"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Usually covered: sudden, storm and impact damage
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Damage from a storm, hail, fallen tree branch, or similar sudden event is the
                  classic case insurers cover — the damage has a clear cause and a clear date it
                  happened, which is exactly what a claim needs to succeed.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Usually not covered: gradual wear and lack of maintenance
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A roof that's simply aged, faded, or developed a slow leak over years typically
                  falls under "wear and tear" or "lack of maintenance," which most standard
                  policies explicitly exclude. This is where most disappointed claims come from —
                  not insurers being unreasonable, but a genuine mismatch between what happened
                  and what the policy was designed to cover.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Documenting damage properly matters
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Photos taken as close to the event as possible, a roofer's written assessment
                  of the cause, and a clear timeline all strengthen a claim. A roofer can provide
                  the kind of documentation an insurer actually wants to see, rather than a
                  homeowner trying to describe storm damage from memory weeks later.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  What to do before you call your insurer
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Get a roofer to look at the damage and document it before making repairs
                  yourself, if it's safe to wait. Repairing first can complicate a claim, since
                  the insurer no longer has the original damage to assess.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Whatever the cause, get an honest assessment
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Whether or not insurance ends up covering it, it's worth knowing what the
                  actual repair or replacement would cost.
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
          We&apos;ll match you with a vetted local roofer who can assess and document the damage.
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
