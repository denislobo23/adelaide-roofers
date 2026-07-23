// app/blog/roofing-scams-adelaide/page.js
// Featured image: public/images/blog-roofing-scams.webp (NEW — see prompt in chat)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "Common Roofing Scams in Australia (and How to Avoid Them) | Adelaide Roofers",
  description:
    "The tactics that show up again and again in roofing scams — door-knockers, pressure tactics, upfront cash demands — and how to spot them before they cost you.",
  alternates: { canonical: `${site.url}/blog/roofing-scams-adelaide` },
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
      name: "Common Roofing Scams in Australia",
      item: `${site.url}/blog/roofing-scams-adelaide`,
    },
  ],
};

export default function RoofingScamsPage() {
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
              Common Roofing Scams in Australia (and How to Avoid Them)
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Most roofing scams follow a handful of recognisable patterns. Knowing them ahead
              of time is the best protection — none of these are subtle once you know what to
              look for.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/blog-roofing-scams.webp"
                alt="Homeowner checking a tradesperson's identification and licence before agreeing to work"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  The unsolicited door-knock
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Someone claiming they "noticed damage" while driving past, offering to fix it
                  today, is a classic setup — genuine roofers rarely operate this way. A
                  legitimate concern can wait long enough for you to get a second opinion.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Pressure to decide on the spot
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  "This price is only good if you sign today" is a pressure tactic, not a genuine
                  time-limited discount. A legitimate quote doesn't expire in the next ten
                  minutes.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Demanding large upfront cash payments
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A reasonable deposit is normal. Being asked for full payment upfront, in cash,
                  before any work starts, is a significant red flag — especially combined with
                  reluctance to put anything in writing.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  No written quote, no licence details
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Anyone unwilling to provide a written quote or their licence number when asked
                  is worth walking away from — a legitimate roofer has no reason to avoid either.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  "Leftover materials" from another job
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A pitch offering a discount because materials happen to be "left over" from a
                  nearby job is a well-known scam script, not a genuine coincidence worth acting
                  on quickly.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  The simplest protection
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Every roofer we connect you with is checked for licensing, insurance, and track
                  record before you're ever matched — removing the guesswork rather than leaving
                  you to spot the red flags yourself.
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
          We&apos;ll match you with a properly vetted local roofer — no door-knocking, no
          pressure.
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
