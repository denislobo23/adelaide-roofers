// app/blog/does-colorbond-rust/page.js
// Featured image: public/images/service-colorbond-roofing.webp (existing library image, no generation needed)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "Does Colorbond Rust? What Adelaide Homeowners Should Know | Adelaide Roofers",
  description:
    "How Colorbond's protective coating actually works, when corrosion genuinely becomes a risk, and what coastal Adelaide suburbs need to know.",
  alternates: { canonical: `${site.url}/blog/does-colorbond-rust` },
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
      name: "Does Colorbond Rust?",
      item: `${site.url}/blog/does-colorbond-rust`,
    },
  ],
};

export default function DoesColorbondRustPage() {
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
              Does Colorbond Rust? What Adelaide Homeowners Should Know
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Short answer: properly maintained Colorbond very rarely corrodes, but "rarely"
              isn't "never" — and where you live in Adelaide genuinely changes the risk.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-colorbond-roofing.webp"
                alt="Colorbond metal roofing on an Adelaide home"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  How the protective coating actually works
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Colorbond steel has a metallic coating beneath the painted finish, specifically
                  designed to protect the steel from corrosion. As long as that coating and the
                  paint layer stay intact, the underlying steel is well protected — the coating
                  is doing the actual corrosion-resistance work, not the paint colour itself.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Coastal suburbs are the real risk factor
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Salt air genuinely accelerates corrosion risk, which is exactly why coastal-grade
                  Colorbond variants exist for suburbs closer to the coast. Using a standard
                  inland-grade product in a heavily salt-exposed area is the most common reason
                  a metal roof corrodes prematurely — it's a product selection issue, not a
                  flaw in Colorbond generally.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Cut edges and scratches are the vulnerable points
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Corrosion typically starts where the protective coating has been physically
                  damaged or exposed — a cut edge, a deep scratch, or a fastener that's worn
                  through. This is why proper installation technique (correctly sealed cut edges,
                  compatible fasteners) matters as much as the material choice itself.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  What keeps it corrosion-free long-term
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Choosing the right grade for your suburb, correct installation, and periodic
                  cleaning to remove salt build-up or debris all extend a metal roof's corrosion
                  resistance well beyond its base warranty period.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Get the right grade for your suburb
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A local roofer will know which Colorbond grade actually suits your specific
                  location, rather than defaulting to a standard option that might not hold up
                  as well where you are.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/services/colorbond-roofing"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    See Colorbond roofing →
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
          We&apos;ll match you with a vetted local roofer who knows the right materials for your
          area.
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
