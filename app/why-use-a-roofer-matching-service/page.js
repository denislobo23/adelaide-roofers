// app/why-use-a-roofer-matching-service/page.js
//
// Full article using the copy already written and approved in the site
// build brief (Section 4). Layout: 2-column grid with sticky
// ArticleSidebar, matching how-we-vet-our-roofers.
// Featured image: public/images/articles/article-matching-service.webp

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "Why Use a Roofer Matching Service? | Adelaide Roofers",
  description:
    "The real reason ringing around for quotes yourself is riskier than it looks — and how a free matching service solves it.",
  alternates: { canonical: `${site.url}/why-use-a-roofer-matching-service` },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Why Use a Roofer Matching Service?",
      item: `${site.url}/why-use-a-roofer-matching-service`,
    },
  ],
};

export default function WhyUseAMatchingServicePage() {
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
            <span className="eyebrow text-clay">Why use a matching service</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
              Why Use a Roofer Matching Service?
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Most people only think about roofers once — when something&apos;s already wrong. A
              leak&apos;s appeared, a storm&apos;s done damage, or you&apos;ve finally decided the
              tired old roof needs to go. And the very first thing you have to do is also the most
              frustrating: find someone to trust with one of the biggest purchases you&apos;ll make
              on your home.
            </p>
            <p className="mt-4 font-body leading-relaxed text-ink/70">
              So you do what everyone does. You search &ldquo;roofer near me,&rdquo; and you get a
              list of ads. You have no way to tell, from a website and a phone number, who&apos;s
              actually licensed, who&apos;s insured, who subcontracts the work out to whoever&apos;s
              cheapest that week, and who&apos;s going to still be around in five years if something
              goes wrong.
            </p>
            <p className="mt-4 font-body leading-relaxed text-ink/70">
              That&apos;s the actual problem a{" "}
              <strong>roofer matching service in Adelaide</strong> solves — not &ldquo;finding a
              roofer,&rdquo; which Google already does for you, but{" "}
              <strong>
                finding one you can trust without having to become an expert in licensing law and
                building contracts first.
              </strong>
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/articles/article-matching-service.webp"
                alt="Roofer matching service in Adelaide — homeowner and vetted local roofer shaking hands on a front porch"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  We do the ringing around, so you don&apos;t have to
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Instead of calling five different roofers, explaining your situation five times,
                  and chasing five separate quotes, you tell us once — your suburb and what&apos;s
                  going on with your roof — and we match you with a roofer who already covers your
                  area. One conversation instead of five. No sales calls from numbers you
                  don&apos;t recognise for the next three weeks.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Every roofer is already vetted, before you ever hear from them
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  We check licensing against South Australia&apos;s official register, confirm
                  current public liability, building indemnity insurance (BII), and workers
                  compensation, and look for a real track record of local work — before a roofer is
                  ever allowed into our network, not after you&apos;ve already had them in your home.
                  If they don&apos;t meet the standard, they&apos;re not on our list. You&apos;re not
                  the one who has to work that out on your own.
                </p>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Want the details on exactly what we check?{" "}
                  <Link href="/how-we-vet-our-roofers" className="font-semibold text-clay underline-offset-2 hover:underline">
                    See how we select a roofer →
                  </Link>
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Matched to your suburb, not just &ldquo;Adelaide-wide&rdquo;
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A roofer who&apos;s never worked in your area doesn&apos;t know your council&apos;s
                  requirements, your typical roof types, or realistic timing for your street. We
                  match you with someone who already works your suburb.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  It costs you nothing
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  This is the part people are usually most surprised by. Our service is free —
                  we&apos;re paid by the roofer, not by you. You get a vetted, local roofer and an
                  obligation-free quote, and there&apos;s nothing to pay us, ever, at any point.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  The alternative is doing all of this yourself
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  You can absolutely find a good roofer on your own — plenty of people do. But it
                  means being the one who checks the licence, confirms the insurance, asks who&apos;s
                  actually doing the work, and reads the fine print on the warranty, all while a leak
                  is getting worse or a quote deadline is looming. A matching service doesn&apos;t
                  replace your judgement — it just does the groundwork first, so the choice in front
                  of you is already a safe one.
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

      {/* ── CONTACT ──────────────────────────────────────── */}
      <section className="mx-auto max-w-wrap px-5 py-20 text-center">
        <h2 className="mx-auto max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Tell us your suburb and what&apos;s going on with your roof
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-ink/65">
          We&apos;ll match you with someone who&apos;s already vetted and already works your area.
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
