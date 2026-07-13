// app/services/[service]/page.js
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/data/config";
import { regions } from "@/data/locations";
import { servicePages, serviceSlugs, getServicePage } from "@/data/services-data";
import CallButton from "@/components/CallButton";

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

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="border-t border-mortar bg-ink text-paper">
        <div className="mx-auto max-w-wrap px-5 py-16 text-center">
          <h2 className="mx-auto max-w-xl font-display text-3xl font-bold tracking-tight md:text-4xl">
            Get connected with a local roofer
          </h2>
          <p className="mx-auto mt-3 max-w-md font-body text-paper/75">
            Tell us your suburb and what you need — we&apos;ll connect you with a roofer who covers your area.
          </p>
          <div className="mt-7 flex justify-center"><CallButton /></div>
        </div>
      </section>
    </main>
  );
}
