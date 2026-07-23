// app/services/[service]/page.js
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site } from "@/data/config";
import { regions } from "@/data/locations";
import { servicePages, serviceSlugs, getServicePage } from "@/data/services-data";
import CallButton from "@/components/CallButton";
import ContactForm from "@/components/ContactForm";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ service: slug }));
}

export async function generateMetadata({ params }) {
  const { service } = await params;
  const s = getServicePage(service);
  if (!s) return {};
  const img = `/images/service-${s.slug}.webp`;
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `${site.url}/services/${s.slug}` },
    openGraph: {
      title: s.metaTitle,
      description: s.metaDescription,
      url: `${site.url}/services/${s.slug}`,
      type: "website",
      images: [{ url: img, width: 1200, height: 630, alt: `${s.name} in Adelaide` }],
    },
  };
}

function RoofIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" aria-hidden="true" className="mt-0.5 shrink-0">
      <path d="M16 4 4 16h4v10h6v-6h4v6h6V16h4L16 4Z" fill="#BC5B3A" />
    </svg>
  );
}

// Calculator + ebook teaser cards — same visual style as ArticleSidebar's
// cards, but laid out for a footer CTA rather than a sticky article
// sidebar (no `md:sticky`, since there's no scrolling content beside it
// here).
function CalculatorEbookTeasers() {
  return (
    <>
      <div className="rounded-2xl border-2 border-clay/50 bg-white p-5 shadow-lg">
        <h3 className="font-display text-base font-bold tracking-tight text-ink">
          Know before you call
        </h3>
        <p className="mt-1.5 font-body text-sm leading-relaxed text-ink/65">
          Get a real, itemised roof estimate in under two minutes.
        </p>
        <Link
          href="/calculator"
          className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-clay px-4 py-2.5 font-display text-sm font-bold tracking-tight text-ink transition hover:brightness-95"
        >
          Try the free calculator →
        </Link>
      </div>

      <div className="rounded-2xl border border-mortar bg-white p-5 shadow-lg">
        <Link href="/free-guide" className="block">
          <Image
            src="/images/before-you-call-a-roofer-cover.jpg"
            alt="Before You Call a Roofer — free Adelaide homeowner's guide"
            width={765}
            height={1024}
            className="w-full rounded-lg"
          />
        </Link>
        <h3 className="mt-4 font-display text-base font-bold tracking-tight text-ink">
          Before You Call a Roofer
        </h3>
        <p className="mt-1.5 font-body text-sm leading-relaxed text-ink/65">
          The free guide to a fair quote, a trustworthy roofer, and avoiding costly mistakes.
        </p>
        <Link
          href="/free-guide"
          className="mt-4 inline-flex w-full items-center justify-center rounded-lg border-2 border-ink px-4 py-2.5 font-display text-sm font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
        >
          Get the free guide →
        </Link>
      </div>
    </>
  );
}

export default async function ServiceDetailPage({ params }) {
  const { service } = await params;
  const s = getServicePage(service);
  if (!s) notFound();

  const heroImage = `/images/service-${s.slug}.webp`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.keyword,
    serviceType: s.name,
    provider: { "@type": "Organization", name: site.brand, url: site.url },
    areaServed: {
      "@type": "City",
      name: "Adelaide",
      containedInPlace: { "@type": "State", name: "South Australia" },
    },
    url: `${site.url}/services/${s.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { name: "Home", url: `${site.url}/` },
      { name: "Services", url: `${site.url}/services` },
      { name: s.name, url: `${site.url}/services/${s.slug}` },
    ].map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
  };

  const others = serviceSlugs.filter((sl) => sl !== s.slug).slice(0, 4);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO (image background, matches suburb pages) ──── */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/75 to-ink/45"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-wrap px-5 py-20 md:py-28">
          <nav className="mb-4 font-body text-sm text-paper/60">
            <Link href="/" className="transition hover:text-clay">Home</Link>
            <span className="px-1.5">/</span>
            <Link href="/services" className="transition hover:text-clay">Services</Link>
            <span className="px-1.5">/</span>
            <span className="text-paper/80">{s.name}</span>
          </nav>
          <span className="eyebrow text-clay">{s.keyword}</span>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-extrabold leading-[1.07] tracking-tight md:text-5xl">
            {s.headline}
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-paper/85">{s.intro}</p>
          <div className="mt-7"><CallButton /></div>
        </div>
      </section>

      {/* ── OVERVIEW + WHAT'S INCLUDED ─────────────────────── */}
      <section className="border-y border-mortar bg-white">
        <div className="mx-auto max-w-wrap px-5 py-16">
          <div className="grid gap-12 md:grid-cols-[1.1fr_1fr]">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                What {s.name.toLowerCase()} involves
              </h2>
              <p className="mt-5 font-body leading-relaxed text-ink/70">{s.overview}</p>
            </div>
            <div className="rounded-2xl border border-mortar bg-paper p-7">
              <h3 className="font-display text-lg font-bold tracking-tight text-ink">Typically includes</h3>
              <ul className="mt-4 space-y-3">
                {s.included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <RoofIcon />
                    <span className="font-body text-sm leading-relaxed text-ink/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {s.signs && s.signs.length > 0 && (
            <div className="mt-14">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                Signs you might need this
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {s.signs.map((sign) => (
                  <div key={sign} className="rounded-xl border border-mortar bg-paper p-5 font-body text-sm leading-relaxed text-ink/70">
                    {sign}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQS ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-wrap px-5 py-16">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
          {s.name} — common questions
        </h2>
        <div className="mt-8 max-w-3xl divide-y divide-mortar">
          {s.faqs.map((f) => (
            <div key={f.q} className="py-6 first:pt-0 last:pb-0">
              <h3 className="font-display text-lg font-bold tracking-tight text-ink">{f.q}</h3>
              <p className="mt-2.5 font-body leading-relaxed text-ink/70">{f.a}</p>
              {/* Cost/finance-flavoured questions get a direct link to the
                  calculator — a short answer plus "get a real number"
                  beats trying to cram pricing detail into FAQ copy. */}
              {/cost|much does|financ|insurance/i.test(f.q) && (
                <Link
                  href="/calculator"
                  className="mt-3 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-clay hover:text-clay-deep"
                >
                  Get a personalised estimate →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── AREAS + OTHER SERVICES ─────────────────────────── */}
      <section className="border-y border-mortar bg-white">
        <div className="mx-auto max-w-wrap px-5 py-16">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">Across Adelaide</h2>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink/65">
                We connect homeowners with local roofers right across the metro area. Find your region:
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {Object.values(regions).map((r) => (
                  <Link key={r.slug} href={`/${r.slug}`} className="rounded-xl border border-mortar bg-paper p-4 font-display text-sm font-semibold text-ink transition hover:border-clay">
                    {r.name} →
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">Other roofing services</h2>
              <ul className="mt-4 space-y-2.5">
                {others.map((sl) => (
                  <li key={sl}>
                    <Link href={`/services/${sl}`} className="font-body text-sm font-medium text-clay hover:text-clay-deep">
                      {servicePages[sl].name} →
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/services" className="font-body text-sm font-medium text-steel hover:text-ink">
                    View all services →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALCULATOR + EBOOK TEASERS ──────────────────────── */}
      <section className="border-t border-mortar bg-paper">
        <div className="mx-auto max-w-wrap px-5 py-16">
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            <CalculatorEbookTeasers />
          </div>
        </div>
      </section>

      {/* ── CONTACT (final section) — exact match of the homepage's
          Contact section, so the two stay identical if either changes ── */}
      <section id="contact" className="bg-ink">
        <div className="mx-auto max-w-wrap px-5 py-20">
          <div className="mx-auto grid max-w-5xl items-start gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-paper md:text-4xl">
                Ready to be matched with a vetted roofer in your area?
              </h2>
              <p className="mt-4 font-body text-paper/70">
                Tell us your suburb and what&apos;s going on with your roof, and we&apos;ll take
                it from there.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Free — we're paid by the roofer, not by you",
                  "Every roofer checked for licensing, insurance, and track record",
                  "Matched to someone who already works your suburb",
                ].map((item) => (
                  <li key={item} className="flex gap-3 font-body text-paper/85">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 h-5 w-5 shrink-0 text-clay"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-8 font-body text-sm text-paper/50">
                Prefer to talk it through first?{" "}
                <a href={site.phoneHref} className="font-semibold text-clay underline-offset-2 hover:underline">
                  Call {site.phoneDisplay}
                </a>
              </p>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
