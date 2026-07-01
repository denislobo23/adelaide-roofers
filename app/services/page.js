// app/services/page.js
import Link from "next/link";
import { site } from "@/data/config";
import { regions } from "@/data/locations";
import CallButton from "@/components/CallButton";
import RidgeDivider from "@/components/RidgeDivider";

export const metadata = {
  title: `Roofing Services in Adelaide | ${site.brand}`,
  description:
    "Roof restoration, repairs, re-roofing, leak detection, gutters, metal and heritage roofing — across metropolitan Adelaide. We connect you with a local roofer who does the work.",
  alternates: { canonical: `${site.url}/services` },
  openGraph: {
    title: `Roofing Services in Adelaide | ${site.brand}`,
    description:
      "The roofing services the local contractors we connect you with provide, right across Adelaide.",
    url: `${site.url}/services`,
    type: "website",
  },
};

const services = [
  {
    t: "Roof restoration",
    d: "Cleaning, re-bedding and re-pointing ridge capping, replacing broken tiles and re-coating — the most common job on Adelaide's many ageing tile roofs, bringing a tired roof back to watertight and tidy.",
  },
  {
    t: "Roof repairs",
    d: "Fixing the specific problem: a slipped or cracked tile, a failed flashing, a perished valley or a leak that's started showing on the ceiling. Targeted work, not a wholesale replacement.",
  },
  {
    t: "Re-roofing & replacement",
    d: "When a roof is past restoring, replacing it — including switching from old concrete tile to lighter, modern Colorbond steel where it suits the home.",
  },
  {
    t: "Leak detection & repair",
    d: "Tracking a leak back to its real source, which is often nowhere near the stain on the ceiling, then sealing it properly around flashings, valleys, chimneys and penetrations.",
  },
  {
    t: "Gutters, downpipes & valleys",
    d: "Replacing rusted or undersized gutters, clearing and protecting them against leaf litter, and sorting the valleys and downpipes that cause most water to back up under a roof.",
  },
  {
    t: "Metal & Colorbond roofing",
    d: "Metal re-roofs and repairs, including coastal-grade materials for salt-exposed suburbs where standard sheeting and fasteners corrode faster.",
  },
  {
    t: "Heritage, slate & iron",
    d: "Specialist, sympathetic work on slate, traditional galvanised iron and heritage roofs — common across Adelaide's older eastern and inner suburbs, where preserving the original matters.",
  },
  {
    t: "Storm & emergency repairs",
    d: "Making a damaged roof safe and watertight after a storm, and helping you get the right evidence and quotes together for an insurance claim.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      {/* ── INTRO ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-wrap px-5 py-20 md:py-24">
        <nav className="mb-4 font-body text-sm text-ink/50">
          <Link href="/" className="hover:text-clay">Home</Link>
          <span className="px-1.5">/</span>
          Services
        </nav>
        <span className="eyebrow text-clay">Roofing services</span>
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-extrabold leading-[1.07] tracking-tight text-ink md:text-5xl">
          Whatever your roof needs, we&apos;ll connect you with someone who does it.
        </h1>
        <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink/70">
          Below is the range of roofing work the local contractors we connect you with provide
          across metropolitan Adelaide. Tell us the problem and your suburb, and we&apos;ll connect
          you with a roofer who handles it in your area — free, and with no obligation.
        </p>
      </section>

      <RidgeDivider />

      {/* ── SERVICES GRID ──────────────────────────────────── */}
      <section className="border-y border-mortar bg-white">
        <div className="mx-auto max-w-wrap px-5 py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {services.map((s) => (
              <div key={s.t} className="rounded-2xl border border-mortar bg-paper p-7">
                <div className="flex items-start gap-3.5">
                  <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true" className="mt-0.5 shrink-0">
                    <path d="M16 4 4 16h4v10h6v-6h4v6h6V16h4L16 4Z" fill="#BC5B3A" />
                  </svg>
                  <div>
                    <h2 className="font-display text-xl font-bold tracking-tight text-ink">{s.t}</h2>
                    <p className="mt-2 font-body text-sm leading-relaxed text-ink/65">{s.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl font-body text-sm leading-relaxed text-ink/55">
            Specialist work — like slate or heritage roofing — depends on the contractor we connect
            you with. Tell us what you need and we&apos;ll point you to a roofer suited to that
            particular job.
          </p>
        </div>
      </section>

      {/* ── AREA TIE-IN ────────────────────────────────────── */}
      <section className="mx-auto max-w-wrap px-5 py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <span className="eyebrow text-clay">Across every suburb</span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              The right service for your part of Adelaide
            </h2>
            <p className="mt-5 font-body leading-relaxed text-ink/70">
              The same service means different things in different suburbs — coastal salt in the
              west, heritage slate in the east, reactive clay in the north, foothills leaf and
              bushfire rules in the south. Find your suburb to see what roofs in your area
              typically need.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.values(regions).map((r) => (
              <Link
                key={r.slug}
                href={`/${r.slug}`}
                className="rounded-2xl border border-mortar bg-white p-6 transition hover:border-clay"
              >
                <h3 className="font-display text-lg font-bold tracking-tight text-ink">{r.name}</h3>
                <span className="mt-2 inline-block font-display text-sm font-semibold text-clay">
                  View suburbs →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="border-t border-mortar bg-ink text-paper">
        <div className="mx-auto max-w-wrap px-5 py-16 text-center">
          <h2 className="mx-auto max-w-xl font-display text-3xl font-bold tracking-tight md:text-4xl">
            Tell us what&apos;s going on up top
          </h2>
          <p className="mx-auto mt-3 max-w-md font-body text-paper/75">
            Call now and we&apos;ll connect you with a local roofer who handles it.
          </p>
          <div className="mt-7 flex justify-center">
            <CallButton />
          </div>
        </div>
      </section>
    </main>
  );
}
