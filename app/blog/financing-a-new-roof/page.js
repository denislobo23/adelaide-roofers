// app/blog/financing-a-new-roof/page.js
// Featured image: public/images/service-roof-restoration.webp (existing library image, no generation needed)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "Can I Finance a New Roof? Options for Adelaide Homeowners | Adelaide Roofers",
  description:
    "Payment plans, personal loans, and what to ask a roofer about financing before you commit to a full roof replacement.",
  alternates: { canonical: `${site.url}/blog/financing-a-new-roof` },
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
      name: "Can I Finance a New Roof?",
      item: `${site.url}/blog/financing-a-new-roof`,
    },
  ],
};

export default function FinancingANewRoofPage() {
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
              Can I Finance a New Roof? Options for Adelaide Homeowners
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              A full roof replacement is a big enough spend that paying it outright isn't always
              realistic — and it doesn't have to be the only path. Here are the common ways
              Adelaide homeowners fund the work.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-restoration.webp"
                alt="Planning finance options for a roof replacement in Adelaide"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Roofer-offered payment plans
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Some roofing contractors offer their own payment plans or financing for larger
                  jobs, though it varies significantly business to business. It's worth asking
                  directly once you're matched with a roofer, rather than assuming it's or isn't
                  available.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Personal loans
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A standard personal loan through your bank is a common route for a roof
                  replacement — the roof isn't used as security, so approval is generally based
                  on your regular borrowing capacity rather than the property itself.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Home equity / redraw
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  If you have equity in your home, a redraw on your existing mortgage or a home
                  equity loan often comes with a lower interest rate than an unsecured personal
                  loan. This is worth discussing with your bank or broker if the amount involved
                  is substantial.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  "Buy now, pay later" style finance products
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A handful of specialist home-improvement finance products operate similarly to
                  larger-scale buy-now-pay-later, spreading a big job over fixed instalments. As
                  with any credit product, it's worth checking the actual interest rate and fees
                  rather than just the advertised monthly figure.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Know the number before you look at finance
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Whatever route you're considering, it helps to know roughly what you're
                  financing before comparing options.
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
