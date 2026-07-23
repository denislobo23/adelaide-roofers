// app/blog/how-to-read-a-roofing-quote/page.js
// Featured image: public/images/blog-how-to-read-a-quote.webp (NEW — see prompt in chat)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "How to Read a Roofing Quote: What Should Be Included | Adelaide Roofers",
  description:
    "What a properly itemised roofing quote actually looks like, and the vague line items that should make you ask more questions before signing.",
  alternates: { canonical: `${site.url}/blog/how-to-read-a-roofing-quote` },
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
      name: "How to Read a Roofing Quote: What Should Be Included",
      item: `${site.url}/blog/how-to-read-a-roofing-quote`,
    },
  ],
};

export default function HowToReadAQuotePage() {
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
              How to Read a Roofing Quote: What Should Be Included
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Two quotes for the same job can look completely different — not because one
              roofer is dishonest, but because "quote" means different things to different
              people. Here's what a properly itemised one actually contains.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/blog-how-to-read-a-quote.webp"
                alt="Reading and comparing itemised roofing quotes"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Materials, listed specifically
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A proper quote names the actual material — "Colorbond Custom Orb, [colour]" or
                  "concrete tile, [profile]" — not just "roofing materials." Vague material
                  descriptions leave room for a cheaper substitute to show up on the day.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Labour and scope, separated from materials
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A single lump-sum number with no breakdown makes it impossible to tell what
                  you're actually paying for, or to compare quotes fairly against each other. Ask
                  for labour and materials shown separately if a quote doesn't already do this.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  What's explicitly included — and excluded
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Waste removal, scaffolding or access equipment, and site cleanup are sometimes
                  extra rather than automatically included. A quote that states clearly what's
                  covered — and what isn't — prevents a surprise add-on invoice later.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Warranty terms, in writing
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A verbal "yeah it's covered" isn't a warranty. A proper quote states the
                  warranty length and what it actually covers, ideally as a formal document you
                  keep, not just a line in an email.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  A vague quote is a fair reason to ask more questions
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  None of this means a short quote is automatically dishonest — but if any of the
                  above is missing, it's entirely reasonable to ask for it before signing
                  anything.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/blog/questions-to-ask-a-roofer"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    See 10 questions to ask a roofer →
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
          We&apos;ll match you with a vetted local roofer who gives proper, itemised quotes.
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
