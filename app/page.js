// app/page.js
import Link from "next/link";
import { regions } from "@/data/locations";
import { site } from "@/data/config";
import CallButton from "@/components/CallButton";
import RidgeDivider from "@/components/RidgeDivider";
import LeadForm from "@/components/LeadForm";
import FaqList from "@/components/FaqList";
import { FaqSchema } from "@/components/SchemaMarkup";
import { generalFaqs } from "@/data/faqs";

export const metadata = {
  alternates: { canonical: site.url },
};

export default function Home() {
  return (
    <main>
      <FaqSchema faqs={generalFaqs} />      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero-home.webp)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/75 to-ink/40" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-wrap gap-10 px-5 py-20 md:grid-cols-[1.2fr_0.8fr] md:py-28">
          <div className="reveal max-w-xl text-paper">
            <span className="eyebrow text-clay">Roofing across metropolitan Adelaide</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Find a roofer who actually works your suburb.
            </h1>
            <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-paper/85">
              Tell us your suburb and what&apos;s going on with your roof. We&apos;ll connect you
              with a local roofing contractor — free, and no obligation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CallButton />
              <Link
                href="#regions"
                className="font-display font-semibold tracking-tight text-paper underline-offset-4 hover:underline"
              >
                Find your area ↓
              </Link>
            </div>
          </div>

          {/* Quick lead form right in the hero */}
          <div id="enquire" className="reveal scroll-mt-24 rounded-2xl border border-white/10 bg-paper p-6 shadow-xl">
            <h2 className="font-display text-lg font-bold tracking-tight text-ink">Get connected now</h2>
            <p className="mt-1 mb-4 font-body text-sm text-ink/60">Takes about 30 seconds.</p>
            <LeadForm />
          </div>
        </div>
      </section>

      <RidgeDivider />

      {/* ── HOW IT WORKS ───────────────────────────────────── */}
      <section id="how-it-works" className="mx-auto max-w-wrap px-5 py-20">
        <span className="eyebrow text-clay">How it works</span>
        <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Three steps, no cost to you
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { n: "1", t: "Tell us your suburb", d: "Call or fill in the form with your suburb and what's happening up top." },
            { n: "2", t: "We connect you locally", d: "We connect you with a roofing contractor who works your part of Adelaide." },
            { n: "3", t: "They take it from there", d: "The roofer contacts you to arrange a look and a quote. You deal with them directly." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-mortar bg-white p-7">
              <span className="font-display text-3xl font-extrabold text-clay">{s.n}</span>
              <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-ink">{s.t}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink/65">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── REGIONS ────────────────────────────────────────── */}
      <section id="regions" className="border-y border-mortar bg-white">
        <div className="mx-auto max-w-wrap px-5 py-20">
          <span className="eyebrow text-clay">Areas we cover</span>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Pick your region
          </h2>
          <p className="mt-3 max-w-xl font-body text-ink/65">
            Adelaide Roofers covers suburbs right across the metro area. Choose your region to
            find your suburb.
          </p>
          <p className="mt-3 max-w-xl font-body text-sm text-ink/55">
            Don&apos;t see your suburb, or not sure which region you&apos;re in?{" "}
            <Link href="#enquire" className="font-semibold text-clay underline-offset-2 hover:underline">
              Send us your details
            </Link>{" "}
            and we&apos;ll point you to a roofer who covers your area.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {Object.values(regions).map((r) => (
              <Link
                key={r.slug}
                href={`/${r.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-mortar bg-paper p-7 transition hover:border-clay"
              >
                <h3 className="font-display text-2xl font-bold tracking-tight text-ink">{r.name}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/60">
                  {r.suburbs.length} suburbs covered
                </p>
                <span className="mt-4 inline-block font-display text-sm font-semibold text-clay">
                  View suburbs →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── GENERAL FAQ (same-everywhere questions, centralised) ── */}
      <FaqList faqs={generalFaqs} heading="How it works — common questions" />

      {/* ── CALL CTA ───────────────────────────────────────── */}
      <section className="mx-auto max-w-wrap px-5 py-20 text-center">
        <h2 className="mx-auto max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Roof leaking, or just looking tired?
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-ink/65">
          Call now and we&apos;ll point you to a roofer who covers your suburb.
        </p>
        <div className="mt-7 flex justify-center">
          <CallButton />
        </div>
      </section>
    </main>
  );
}
