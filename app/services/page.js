// app/services/page.js
import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import { regions } from "@/data/locations";
import CallButton from "@/components/CallButton";
import RidgeDivider from "@/components/RidgeDivider";

export const metadata = {
  title: `Roofing Services in Adelaide | ${site.brand}`,
  description:
    "Roof restoration, repairs, re-roofing, ridge capping, painting, gutters, leaf guards, ventilation, cleaning and inspections across Adelaide. We connect you with a local roofer who does the work.",
  alternates: { canonical: `${site.url}/services` },
  openGraph: {
    title: `Roofing Services in Adelaide | ${site.brand}`,
    description:
      "The full range of roofing work the local contractors we connect you with provide, right across Adelaide.",
    url: `${site.url}/services`,
    type: "website",
  },
};

// Grouped so the page reads clearly and each service is a real search term.
// `href` links to a dedicated service page where one exists.
const serviceGroups = [
  {
    heading: "Repairs & restoration",
    items: [
      { t: "Roof restoration", href: "/services/roof-restoration", d: "Cleaning, re-bedding and re-pointing ridge capping, replacing broken tiles and re-coating — bringing a tired roof back to watertight and tidy. The most common job on Adelaide's ageing tile roofs." },
      { t: "Roof repairs", href: "/services/roof-repairs", d: "Fixing the specific problem: a slipped or cracked tile, a failed flashing, a perished valley, or a leak that's started showing on the ceiling. Targeted work, not a wholesale replacement." },
      { t: "Re-roofing & replacement", href: "/services/roof-replacement", d: "When a roof is past restoring, replacing it — including switching from old concrete tile to lighter, modern Colorbond steel where it suits the home." },
      { t: "Roof leak repair", href: "/services/roof-leak-repair", d: "Tracking a leak back to its real source — often nowhere near the ceiling stain — then sealing it properly around flashings, valleys, chimneys and penetrations." },
      { t: "Ridge capping (re-bed & re-point)", href: "/services/ridge-capping", d: "Re-bedding and re-pointing the ridge caps along the roof's peaks and hips, where old cement mortar cracks over time and lets water in. Flexible pointing lasts far longer." },
      { t: "Roof painting & re-coating", href: "/services/roof-painting", d: "Cleaning, sealing and re-coating a tile or metal roof — restoring weather protection and appearance, and giving a faded roof a fresh, uniform finish." },
    ],
  },
  {
    heading: "Gutters & drainage",
    items: [
      { t: "Gutters, downpipes & valleys", href: "/services/gutter-repairs", d: "Replacing rusted or undersized gutters, and sorting the valleys and downpipes that cause most water to back up under a roof." },
      { t: "Gutter guard & leaf screen", href: "/services/gutter-repairs", d: "Fitting mesh guards that keep leaves and debris out of gutters and valleys — important near trees, and for reducing ember risk in bushfire-prone foothills suburbs." },
      { t: "Gutter & roof cleaning", d: "Clearing leaf litter from gutters and valleys, and pressure-cleaning moss, lichen and grime off the roof surface before it does damage." },
    ],
  },
  {
    heading: "Maintenance & protection",
    items: [
      { t: "Roof ventilation", d: "Installing whirlybirds and roof vents to move hot, moist air out of the roof space — helping with summer heat and reducing condensation and moisture build-up." },
      { t: "Solar panel mesh & bird-proofing", d: "Fitting mesh around solar panels and blocking gaps under the roofline to keep pigeons and pests out, without damaging the panels or roof." },
      { t: "Roof inspection & report", d: "A thorough check of tiles, flashings, valleys, ridge capping and gutters, with an honest write-up of what's fine, what needs attention now, and what can wait." },
    ],
  },
  {
    heading: "Specialist work",
    items: [
      { t: "Metal & Colorbond roofing", href: "/services/colorbond-roofing", d: "Metal re-roofs and repairs, including coastal-grade materials for salt-exposed suburbs where standard sheeting and fasteners corrode faster." },
      { t: "Asbestos roof removal", href: "/services/asbestos-roof-removal", d: "Licensed, safe removal of asbestos (fibro) roofing — common on pre-1980s Adelaide homes — followed by a new tile or Colorbond roof installation." },
      { t: "Heritage, slate & iron", d: "Specialist, sympathetic work on slate, traditional galvanised iron and heritage roofs — common across Adelaide's older eastern and inner suburbs, where preserving the original matters." },
      { t: "Storm & emergency repairs", href: "/services/roof-repairs", d: "Making a damaged roof safe and watertight after a storm, and helping you get the right evidence and quotes together for an insurance claim." },
    ],
  },
];

function RoofIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true" className="mt-0.5 shrink-0">
      <path d="M16 4 4 16h4v10h6v-6h4v6h6V16h4L16 4Z" fill="#BC5B3A" />
    </svg>
  );
}

function ServiceCard({ s }) {
  // For anything with a dedicated service page, the href's slug maps
  // directly onto the same card image already used in the homepage grid
  // (components/ServicesSection.jsx) — one set of images, reused here
  // rather than duplicated or re-uploaded.
  const slug = s.href?.replace("/services/", "");

  if (s.href) {
    return (
      <Link
        href={s.href}
        className="group block overflow-hidden rounded-2xl border border-mortar bg-white transition hover:border-clay"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={`/images/services/card-${slug}.webp`}
            alt={s.t}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        </div>
        <div className="p-6">
          <h3 className="font-display text-lg font-bold tracking-tight text-ink">
            {s.t} <span className="text-clay">→</span>
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-ink/65">{s.d}</p>
        </div>
      </Link>
    );
  }

  // No dedicated page/image for this one yet — keep the compact icon card.
  return (
    <div className="rounded-2xl border border-mortar bg-paper p-7">
      <div className="flex items-start gap-3.5">
        <RoofIcon />
        <div>
          <h3 className="font-display text-lg font-bold tracking-tight text-ink">{s.t}</h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-ink/65">{s.d}</p>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main>
      {/* ── INTRO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero-services.webp)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-ink/80" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" aria-hidden="true" />
        <div
          className="relative mx-auto max-w-wrap px-5 py-20 md:py-24"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}
        >
          <nav className="mb-4 font-body text-sm text-paper/70">
            <Link href="/" className="hover:text-clay">Home</Link>
            <span className="px-1.5">/</span>
            Services
          </nav>
          <span className="eyebrow text-clay">Roofing services</span>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-extrabold leading-[1.07] tracking-tight md:text-5xl">
            Whatever your roof needs, we&apos;ll connect you with someone who does it.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-paper/90">
            Below is the range of roofing work the local contractors we connect you with provide
            across metropolitan Adelaide. Tell us the problem and your suburb, and we&apos;ll
            connect you with a roofer who handles it in your area — free, and with no obligation.
          </p>
        </div>
      </section>

      <RidgeDivider />

      {/* ── GROUPED SERVICES ───────────────────────────────── */}
      <section className="border-y border-mortar bg-white">
        <div className="mx-auto max-w-wrap px-5 py-16">
          {serviceGroups.map((group) => (
            <div key={group.heading} className="mb-14 last:mb-0">
              <h2 className="mb-6 font-display text-2xl font-bold tracking-tight text-ink">{group.heading}</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {group.items.map((s) => (
                  <ServiceCard key={s.t} s={s} />
                ))}
              </div>
            </div>
          ))}
          <p className="mt-10 max-w-2xl font-body text-sm leading-relaxed text-ink/55">
            Specialist work — like slate, heritage or coastal roofing — depends on the contractor
            we connect you with. Tell us what you need and we&apos;ll point you to a roofer suited
            to that particular job. Not sure what your roof needs?{" "}
            <Link href="/faq" className="font-semibold text-clay hover:text-clay-deep">
              Read our common roofing questions
            </Link>.
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
