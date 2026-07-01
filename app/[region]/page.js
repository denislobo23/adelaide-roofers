// app/[region]/page.js
import Link from "next/link";
import { notFound } from "next/navigation";
import { regions, suburbs, getRegion } from "@/data/locations";
import CallButton from "@/components/CallButton";
import RidgeDivider from "@/components/RidgeDivider";
import LeadForm from "@/components/LeadForm";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { site } from "@/data/config";

export function generateStaticParams() {
  return Object.keys(regions).map((region) => ({ region }));
}

export async function generateMetadata({ params }) {
  const { region } = await params;
  const r = getRegion(region);
  if (!r) return {};
  return {
    title: r.metaTitle,
    description: r.metaDescription,
    alternates: { canonical: `${site.url}/${r.slug}` },
  };
}

export default async function RegionPage({ params }) {
  const { region } = await params;
  const r = getRegion(region);
  if (!r) notFound();

  return (
    <main>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: r.name, url: `/${r.slug}` },
        ]}
      />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${r.heroImage})` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 to-ink/55" aria-hidden="true" />
        <div className="relative mx-auto max-w-wrap px-5 py-20 text-paper">
          <nav className="mb-4 font-body text-sm text-paper/60">
            <Link href="/" className="hover:text-clay">Home</Link> <span className="px-1">/</span> {r.name}
          </nav>
          <span className="eyebrow text-clay">Adelaide&apos;s {r.name.toLowerCase()}</span>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Roofers across the {r.name}
          </h1>
          <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-paper/85">{r.intro}</p>
          <div className="mt-7"><CallButton region={r.slug} /></div>
        </div>
      </section>

      <RidgeDivider />

      {/* Suburb grid */}
      <section className="mx-auto max-w-wrap px-5 py-16">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
          Find your suburb
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {r.suburbs.map((slug) => {
            const s = suburbs[slug];
            if (!s) return null;
            if (s.ready) {
              return (
                <Link
                  key={slug}
                  href={`/${r.slug}/${slug}`}
                  className="group flex items-center justify-between rounded-xl border border-mortar bg-white p-5 transition hover:border-clay"
                >
                  <span className="font-display text-lg font-semibold tracking-tight text-ink">{s.name}</span>
                  <span className="font-display text-clay transition group-hover:translate-x-0.5">→</span>
                </Link>
              );
            }
            return (
              <div key={slug} className="flex items-center justify-between rounded-xl border border-dashed border-mortar bg-paper p-5">
                <span className="font-display text-lg font-semibold tracking-tight text-ink/45">{s.name}</span>
                <span className="font-body text-xs text-ink/35">Coming soon</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lead form band */}
      <section className="border-t border-mortar bg-white">
        <div className="mx-auto grid max-w-wrap gap-10 px-5 py-16 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Not sure which to pick?
            </h2>
            <p className="mt-3 max-w-md font-body text-ink/65">
              Just send your details and your suburb — we&apos;ll connect you with a roofer who
              covers the {r.name.toLowerCase()}.
            </p>
          </div>
          <div className="rounded-2xl border border-mortar bg-paper p-6">
            <LeadForm />
          </div>
        </div>
      </section>
    </main>
  );
}
