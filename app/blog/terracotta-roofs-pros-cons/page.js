// app/blog/terracotta-roofs-pros-cons/page.js
// Featured image: public/images/blog-terracotta-roof.webp (NEW — see prompt in chat)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "Terracotta Roofs: Pros, Cons, and When to Restore vs Replace | Adelaide Roofers",
  description:
    "What makes terracotta tile different from concrete tile, its real advantages and drawbacks, and how to tell if yours needs restoring or replacing.",
  alternates: { canonical: `${site.url}/blog/terracotta-roofs-pros-cons` },
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
      name: "Terracotta Roofs: Pros, Cons, and When to Restore vs Replace",
      item: `${site.url}/blog/terracotta-roofs-pros-cons`,
    },
  ],
};

export default function TerracottaRoofsPage() {
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
              Terracotta Roofs: Pros, Cons, and When to Restore vs Replace
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Terracotta tile is common on Adelaide's older homes, and often confused with
              concrete tile at a glance — but the two behave quite differently over their
              lifespan.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/blog-terracotta-roof.webp"
                alt="Terracotta tile roof on a traditional Adelaide home"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  What makes terracotta different from concrete tile
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Terracotta is fired clay, with colour baked all the way through the tile rather
                  than applied as a surface coating — which is why an old terracotta roof
                  generally still looks like terracotta even after decades, where a faded
                  concrete tile visibly needs re-coating.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  The real advantages
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Genuinely long-lasting, doesn't need repainting the way a coated concrete tile
                  eventually does, and it's the traditional, often heritage-appropriate look for
                  many of Adelaide's older suburbs. It also performs well thermally and is quiet
                  in rain, same as concrete tile generally.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  The real drawbacks
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Individual terracotta tiles can be more brittle than concrete and crack under
                  foot traffic. Matching an older, possibly discontinued terracotta profile for
                  repairs can also be harder — and sometimes pricier — than sourcing a common
                  concrete tile.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Restore or replace?
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A terracotta roof with sound tiles but crumbling ridge capping mortar is a
                  classic restoration case — re-bedding and re-pointing, rather than a full
                  re-roof. Replacement becomes the better call when there's widespread tile
                  cracking rather than isolated damage, or when the specific profile is no longer
                  available to match for ongoing repairs.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Not sure which your roof needs?
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A local roofer can tell you honestly whether your terracotta roof needs
                  restoration or replacement, and our calculator can give you a starting number
                  either way.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/calculator"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    Try the free calculator →
                  </Link>
                  <Link
                    href="/blog/repair-vs-replace"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-ink px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
                  >
                    Take the repair vs. replace quiz →
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
          We&apos;ll match you with a vetted local roofer experienced with terracotta.
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
