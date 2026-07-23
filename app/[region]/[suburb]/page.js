// app/[region]/[suburb]/page.js
import Link from "next/link";
import { notFound } from "next/navigation";
import { suburbs, regions, getSuburb, siblingSuburbs } from "@/data/locations";
import { site } from "@/data/config";
import CallButton from "@/components/CallButton";
import RidgeDivider from "@/components/RidgeDivider";
import LeadForm from "@/components/LeadForm";
import ContactForm from "@/components/ContactForm";
import HeroCalculatorMini from "@/components/HeroCalculatorMini";
import { SuburbSchema, BreadcrumbSchema } from "@/components/SchemaMarkup";

// Only generate suburbs that have real content (ready: true).
export function generateStaticParams() {
  return Object.values(suburbs)
    .filter((s) => s.ready)
    .map((s) => ({ region: s.region, suburb: s.slug }));
}

export async function generateMetadata({ params }) {
  const { suburb } = await params;
  const s = getSuburb(suburb);
  if (!s || !s.ready) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `${site.url}/${s.region}/${s.slug}` },
  };
}

export default async function SuburbPage({ params }) {
  const { region, suburb } = await params;
  const s = getSuburb(suburb);
  // Guard: must exist, be ready, and sit under the right region in the URL.
  if (!s || !s.ready || s.region !== region) notFound();

  const r = regions[s.region];
  const siblings = siblingSuburbs(s.slug).slice(0, 6);

  return (
    <main>
      <SuburbSchema suburb={s} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: r.name, url: `/${r.slug}` },
          { name: s.name, url: `/${r.slug}/${s.slug}` },
        ]}
      />

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${s.heroImage})` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/78 to-ink/45" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-wrap gap-10 px-5 py-20 md:grid-cols-[1.15fr_0.85fr] md:py-24">
          <div className="max-w-xl text-paper">
            <nav className="mb-4 font-body text-sm text-paper/60">
              <Link href="/" className="hover:text-clay">Home</Link>
              <span className="px-1.5">/</span>
              <Link href={`/${r.slug}`} className="hover:text-clay">{r.name}</Link>
              <span className="px-1.5">/</span>
              {s.name}
            </nav>
            <span className="eyebrow text-clay">Roofers in {s.name}, SA {s.postcode}</span>
            <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              {s.headline}
            </h1>
            <p className="mt-5 font-body text-lg leading-relaxed text-paper/85">{s.intro}</p>
            <div className="mt-7"><CallButton region={s.region} /></div>
          </div>

          <div className="self-start rounded-2xl border border-white/10 bg-paper p-6 shadow-xl">
            <h2 className="font-display text-lg font-bold tracking-tight text-ink">Get connected in {s.name}</h2>
            <p className="mt-1 mb-4 font-body text-sm text-ink/60">Free, no obligation.</p>
            <LeadForm suburbName={s.name} />
          </div>
        </div>
      </section>

      <RidgeDivider />

      {/* ── LOCAL CONTEXT (the genuinely unique part) ──────── */}
      <section className="mx-auto max-w-wrap px-5 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_0.6fr] md:items-start">
          <div>
            <span className="eyebrow text-clay">Roofing in {s.name}</span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
              What roofs in {s.name} are usually dealing with
            </h2>
            <p className="mt-5 font-body leading-relaxed text-ink/75">{s.roofStock}</p>
            <p className="mt-4 font-body leading-relaxed text-ink/75">{s.localNote}</p>

            {/* Problem image — illustrative, NOT captioned as our own work */}
            <figure className="mt-8 overflow-hidden rounded-2xl border border-mortar">
              <img src={s.problemImage} alt={`Common roof issues on homes around ${s.name}`} className="h-64 w-full object-cover" />
            </figure>

            <h3 className="mt-10 font-display text-xl font-bold tracking-tight text-ink">
              Common jobs we get asked about in {s.name}
            </h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {s.commonIssues.map((issue, i) => (
                <li key={i} className="flex items-start gap-2.5 font-body text-sm text-ink/75">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" aria-hidden="true" />
                  {issue}
                </li>
              ))}
            </ul>

            <h3 className="mt-10 font-display text-xl font-bold tracking-tight text-ink">
              What local roofers typically handle
            </h3>
            <div className="mt-4 grid gap-3">
              {s.services.map((srv, i) => (
                <div key={i} className="rounded-xl border border-mortar bg-white p-5">
                  <h4 className="font-display font-semibold tracking-tight text-ink">{srv.title}</h4>
                  <p className="mt-1.5 font-body text-sm leading-relaxed text-ink/65">{srv.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar: map + areas covered */}
          <aside className="space-y-6 md:sticky md:top-24">
            <div className="overflow-hidden rounded-2xl border border-mortar bg-white">
              <img src={s.mapImage} alt={`Map of the ${s.name} area`} className="h-48 w-full object-cover" />
              <div className="p-4">
                <span className="eyebrow text-steel">Areas covered</span>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {s.landmarks.map((l, i) => (
                    <span key={i} className="rounded-md bg-mortar/60 px-2.5 py-1 font-body text-xs text-ink/70">{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── CALCULATOR — primary lead capture, right where cost   ── */}
      {/* ── intent peaks: after they've read what the roof needs, ── */}
      {/* ── right before the FAQ answers the same "how much" ─────── */}
      <section className="border-y border-mortar bg-paper">
        <div className="mx-auto max-w-wrap px-5 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
            <div>
              <span className="eyebrow text-clay">Know before you call</span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
                See what your {s.name} job actually costs, before talking to a roofer.
              </h2>
              <p className="mt-4 font-body leading-relaxed text-ink/70">
                Enter your address, answer a few quick questions about your roof, and see how the
                price is built — no roofer, no obligation.
              </p>
              <ol className="mt-8 space-y-5">
                {[
                  { t: "Enter your address", d: "See your roof on satellite imagery instantly." },
                  { t: "Answer a few quick questions", d: "Size, material, condition — takes about a minute." },
                  { t: "Get your report", d: "A detailed, itemised PDF sent as a download link straight to your phone, ready to save, share, or show a roofer on the spot." },
                ].map((step, i) => (
                  <li key={step.t} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay font-display text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold tracking-tight text-ink">{step.t}</h3>
                      <p className="mt-1 font-body text-sm leading-relaxed text-ink/65">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <HeroCalculatorMini />
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="border-t border-mortar bg-white">
        <div className="mx-auto max-w-3xl px-5 py-16">
          <span className="eyebrow text-clay">Questions</span>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
            {s.name} roofing FAQs
          </h2>
          <div className="mt-8 divide-y divide-mortar">
            {s.faqs.map((f, i) => (
              <details key={i} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between font-display font-semibold tracking-tight text-ink marker:content-['']">
                  {f.q}
                  <span className="ml-4 text-clay transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 font-body leading-relaxed text-ink/70">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 font-body text-sm leading-relaxed text-ink/55">
            Got a broader roofing question?{" "}
            <Link href="/faq" className="font-semibold text-clay hover:text-clay-deep">
              See our full FAQ hub
            </Link>{" "}
            — cost, licensing, materials, timing and more.
          </p>
        </div>
      </section>

      {/* ── NEARBY (real geographic internal linking) ──────── */}
      {siblings.length > 0 && (
        <section className="mx-auto max-w-wrap px-5 py-16">
          <h2 className="font-display text-xl font-bold tracking-tight text-ink">
            Other suburbs in the {r.name.toLowerCase()}
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {siblings.map((sib) => {
              const linkable = sib.ready;
              return linkable ? (
                <Link key={sib.slug} href={`/${sib.region}/${sib.slug}`} className="rounded-lg border border-mortar bg-white px-4 py-2 font-display text-sm font-semibold text-steel transition hover:border-clay hover:text-clay">
                  {sib.name}
                </Link>
              ) : (
                <span key={sib.slug} className="rounded-lg border border-dashed border-mortar px-4 py-2 font-display text-sm font-semibold text-ink/35">
                  {sib.name}
                </span>
              );
            })}
          </div>
        </section>
      )}

      {/* ── CONTACT (final section) — exact match of the homepage's
          Contact section, so all three (home, service, suburb pages)
          stay identical if any of them change ── */}
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
