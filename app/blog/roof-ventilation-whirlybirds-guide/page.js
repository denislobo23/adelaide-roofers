// app/blog/roof-ventilation-whirlybirds-guide/page.js
// Featured image: public/images/service-roof-ventilation.webp (new service image from the roof-ventilation service page — reused here)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "Roof Ventilation & Whirlybirds: Do You Actually Need Them? | Adelaide Roofers",
  description:
    "What whirlybirds and roof vents actually do, and how to tell whether your Adelaide home would genuinely benefit from them.",
  alternates: { canonical: `${site.url}/blog/roof-ventilation-whirlybirds-guide` },
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
      name: "Roof Ventilation & Whirlybirds: Do You Actually Need Them?",
      item: `${site.url}/blog/roof-ventilation-whirlybirds-guide`,
    },
  ],
};

export default function RoofVentilationGuidePage() {
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
              Roof Ventilation & Whirlybirds: Do You Actually Need Them?
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              For a lot of Adelaide homes, yes — an unventilated roof space in a hot, dry
              climate does real, measurable work against you. Here's what whirlybirds and roof
              vents actually change.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-ventilation.webp"
                alt="Whirlybird roof ventilator installed on an Adelaide roof"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  What actually happens in an unventilated roof space
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  In summer, a closed-up roof space traps hot air, which then radiates down into
                  the ceiling below — directly working against whatever your air conditioning is
                  trying to do. In winter, trapped moisture can lead to condensation build-up in
                  the roof cavity, a different but equally real problem.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  What whirlybirds and vents actually do
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Whirlybirds are wind-driven turbine vents that pull hot, moist air out of the
                  roof space as they spin. Static roof vents work more passively, giving that air
                  somewhere to escape rather than sitting trapped. Both address the same
                  underlying problem from slightly different angles.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Signs your home would benefit
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Top-floor or upstairs rooms noticeably hotter than the rest of the house, a
                  roof space that feels stifling when you go up there in summer, or a musty smell
                  or visible condensation in the roof cavity over winter are all practical
                  signals worth acting on.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  How many do you actually need?
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  It depends on your roof space's size and existing ventilation, if any. A single
                  token whirlybird on a large roof space often doesn't move enough air to make a
                  real difference — a roofer can properly size the number needed for your
                  specific roof.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  A relatively small job with a real effect
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Compared to restoration or replacement, ventilation is a modest job — worth
                  considering on its own or alongside other roof work.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/services/roof-ventilation"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    See roof ventilation →
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
