// app/blog/signs-you-need-a-new-roof/page.js
// Featured image: public/images/service-roof-repairs.webp (existing library image, no generation needed)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "Signs You Need a Roof Replacement, Not Just a Repair | Adelaide Roofers",
  description:
    "The specific signs that mean a roof has moved past patch-repairing — from Adelaide homeowners who waited too long, and what to check before you decide.",
  alternates: { canonical: `${site.url}/blog/signs-you-need-a-new-roof` },
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
      name: "Signs You Need a Roof Replacement, Not Just a Repair",
      item: `${site.url}/blog/signs-you-need-a-new-roof`,
    },
  ],
};

export default function SignsYouNeedANewRoofPage() {
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
            <span className="eyebrow text-clay">Repair vs. replace</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
              Signs You Need a Roof Replacement, Not Just a Repair
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              A repair fixes a specific, isolated problem. These signs mean the roof itself —
              not just one spot on it — has moved past the point where patching makes sense.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-repairs.webp"
                alt="Assessing roof damage in Adelaide — signs a roof needs full replacement rather than a repair"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Leaks keep happening in different spots
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  One leak with a clear cause is a repair. Leaks that keep appearing in new
                  places, or the same repair failing again within a year, usually means the
                  underlying roofing material is failing generally — patching one spot just
                  moves the problem, it doesn't solve it.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Widespread cracking, rust, or sagging
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A handful of cracked tiles or a small rust patch is manageable. Cracking or
                  rust spread across large sections of the roof, or any visible sagging in the
                  roofline, points to structural fatigue that repair work can't meaningfully fix.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  You're calling a roofer more than once a year
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  If roof call-outs have become a routine annual (or more frequent) expense
                  rather than an occasional one, the cumulative cost of ongoing repairs often
                  exceeds what a single replacement would have cost — without ever actually
                  fixing the underlying issue.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  It's an ageing asbestos roof
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  If your roof is asbestos cement and showing any cracking or deterioration,
                  that's a safety consideration, not just a cosmetic one — repairing or
                  disturbing it isn't the right call. Licensed removal and replacement is the
                  only safe path here.{" "}
                  <Link href="/services/asbestos-roof-removal" className="font-semibold text-clay hover:text-clay-deep">
                    Read more on asbestos roof removal
                  </Link>.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Not sure which category you're in?
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Our quick repair-vs-replace framework and quiz walks through your specific
                  situation, or a local roofer can give you a straight answer in person.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/blog/repair-vs-replace"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    Take the repair vs. replace quiz →
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
          We&apos;ll match you with a vetted local roofer for an obligation-free assessment.
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
