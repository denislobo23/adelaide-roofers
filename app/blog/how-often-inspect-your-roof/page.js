// app/blog/how-often-inspect-your-roof/page.js
// Featured image: public/images/service-roof-inspection.webp (new service image from the roof-inspection service page — reused here)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "How Often Should You Get Your Roof Inspected? | Adelaide Roofers",
  description:
    "A realistic inspection schedule for Adelaide roofs, and the moments outside that schedule when it's worth getting one sooner.",
  alternates: { canonical: `${site.url}/blog/how-often-inspect-your-roof` },
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
      name: "How Often Should You Get Your Roof Inspected?",
      item: `${site.url}/blog/how-often-inspect-your-roof`,
    },
  ],
};

export default function HowOftenInspectPage() {
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
            <span className="eyebrow text-clay">Process</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
              How Often Should You Get Your Roof Inspected?
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Roughly every two to three years for a roof with no known issues — plus a handful
              of specific moments where it's worth doing one sooner, regardless of schedule.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-inspection.webp"
                alt="Roof inspection in progress on an Adelaide home"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  The baseline schedule
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  For a roof with no known problems, every two to three years is a sensible
                  default — frequent enough to catch small issues before they turn into leaks,
                  without paying for inspections a healthy roof doesn't really need.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  After any major storm
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Hail, high winds, or fallen branches can damage a roof in ways that aren't
                  obvious from the ground. Getting it checked after a significant storm — even
                  without an obvious leak — catches damage before it worsens with the next rain.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Before buying, and before selling
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A roof inspection ahead of buying a home can reveal costs that aren't obvious in
                  a standard building report. Ahead of selling, it lets you address anything
                  significant before it becomes a negotiating point during the sale.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  When the roof hasn't been looked at in years
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  If you genuinely can't remember the last time anyone checked your roof, that's
                  reason enough on its own — a first inspection often surfaces small, cheap fixes
                  that would have become expensive if left another few years.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Get an honest inspection, not a sales pitch
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  We connect you with roofers who give a straight assessment — what's urgent,
                  what can wait, and what's simply fine.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/services/roof-inspection"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    See roof inspection & report →
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
          We&apos;ll match you with a vetted local roofer for an honest inspection.
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
