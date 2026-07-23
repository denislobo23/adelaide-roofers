// app/blog/asbestos-roof-removal-guide/page.js
// Featured image: public/images/service-asbestos-roof-removal.webp (new — see prompt given for the /services/asbestos-roof-removal page hero, same image reused here)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "Asbestos Roof Removal: What Adelaide Homeowners Need to Know | Adelaide Roofers",
  description:
    "How to tell if your Adelaide home has an asbestos roof, why it needs a licensed removalist, and what the process and cost actually look like.",
  alternates: { canonical: `${site.url}/blog/asbestos-roof-removal-guide` },
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
      name: "Asbestos Roof Removal: What Adelaide Homeowners Need to Know",
      item: `${site.url}/blog/asbestos-roof-removal-guide`,
    },
  ],
};

export default function AsbestosRoofRemovalGuidePage() {
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
              Asbestos Roof Removal: What Adelaide Homeowners Need to Know
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Plenty of Adelaide homes built before the early 1980s still have their original{" "}
              <strong>asbestos roof</strong>, and most owners have never had a reason to think
              about it — until they're planning a renovation, or the roof starts showing its
              age. Here's what actually matters if that's you.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-asbestos-roof-removal.webp"
                alt="Asbestos roof removal in Adelaide — licensed removalist assessing an older fibro roof"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  How to tell if your roof has asbestos
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Corrugated cement sheet roofing — often called fibro — on a home built before
                  the early 1980s is the main giveaway. It isn't always obvious just by looking,
                  since some later materials have a similar corrugated profile. If you're not
                  sure, the safest move is simply not to drill, cut, or disturb it, and get a
                  professional to confirm rather than guessing.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Why it can't just be treated like any other roof
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Left undisturbed and in reasonable condition, an asbestos roof isn't an
                  immediate danger. The risk comes from disturbing it — cutting, drilling,
                  breaking, or removing it can release airborne fibres, which is a genuine
                  health hazard. That's why asbestos removal in South Australia legally has to be
                  carried out by a licensed asbestos removalist, a separate trade to standard
                  roofing.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  What the removal process actually involves
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A licensed removalist uses containment procedures specifically so the work can
                  happen without releasing fibres into the property, followed by correct
                  transport and disposal at an approved facility. Once the old roofing is safely
                  removed, a new tile or Colorbond roof goes on in its place, the same as any
                  other re-roof from that point.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  What it costs, and why it's more than a standard removal
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Licensed handling, containment, and approved disposal all add cost that a
                  normal roof tear-off simply doesn't have — so expect an asbestos removal and
                  re-roof to run higher than a like-for-like replacement of the same size. The
                  exact figure depends heavily on roof size and access, and genuinely needs an
                  on-site assessment rather than a ballpark guess.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Get connected with the right specialist
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  This is exactly why we treat asbestos removal as its own service rather than
                  folding it into standard re-roofing — it needs a different licence, and we
                  connect you with someone who actually holds it.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/services/asbestos-roof-removal"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    See asbestos roof removal →
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
          We&apos;ll match you with a licensed local specialist for an obligation-free
          assessment.
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
