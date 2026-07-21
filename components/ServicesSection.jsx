// ── SERVICES ─────────────────────────────────────────
// Insert this section into app/page.js, after the Hero + RidgeDivider
// and before "HOW IT WORKS" (or wherever you'd like it to sit).
// Uses the 8 real service pages from data/services-data.js and the
// images already saved to public/images/services/.

import Link from "next/link";
import Image from "next/image";
import { servicePages, serviceSlugs } from "@/data/services-data";

// Short card blurbs (separate from the longer page copy) + image filename per slug
const serviceCardMeta = {
  "roof-restoration": {
    blurb: "Clean, re-bed, re-point and re-coat a tired roof back to watertight.",
    image: "/images/services/card-roof-restoration.webp",
  },
  "roof-repairs": {
    blurb: "A broken tile, a failed flashing, a leak — fixed without the full job.",
    image: "/images/services/card-roof-repairs.webp",
  },
  "roof-replacement": {
    blurb: "Full re-roof, including tile-to-Colorbond conversions.",
    image: "/images/services/card-roof-replacement.webp",
  },
  "roof-leak-repair": {
    blurb: "We trace the leak to its real source, then seal it properly.",
    image: "/images/services/card-roof-leak-repair.webp",
  },
  "colorbond-roofing": {
    blurb: "New metal roofs, re-roofs and coastal-grade materials.",
    image: "/images/services/card-colorbond-roofing.webp",
  },
  "ridge-capping": {
    blurb: "Re-bed and re-point ridge lines — the most common cause of leaks.",
    image: "/images/services/card-ridge-capping.webp",
  },
  "roof-painting": {
    blurb: "Clean, seal and coat a faded roof for a fresh, uniform finish.",
    image: "/images/services/card-roof-painting.webp",
  },
  "gutter-repairs": {
    blurb: "Rusted or overflowing gutters, sorted — repair or full replacement.",
    image: "/images/services/card-gutter-repairs.webp",
  },
  "fascia-repairs": {
    blurb: "Rotting timber behind the gutter line, repaired or replaced.",
    image: "/images/services/card-fascia-repairs.webp",
  },
};

function HomeServiceCard({ slug }) {
  const s = servicePages[slug];
  const meta = serviceCardMeta[slug];
  if (!s || !meta) return null;

  return (
    <Link
      href={`/services/${slug}`}
      className="group block overflow-hidden rounded-2xl border border-mortar bg-white transition hover:border-clay"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={meta.image}
          alt={s.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg font-bold tracking-tight text-ink">{s.name}</h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-ink/65">{meta.blurb}</p>
        <span className="mt-4 inline-block font-display text-sm font-semibold text-clay">
          Find out more →
        </span>
      </div>
    </Link>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-wrap px-5 py-20">
      <span className="eyebrow text-clay">What do you need done?</span>
      <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
        Start with the job, not the postcode
      </h2>
      <p className="mt-3 max-w-xl font-body text-ink/65">
        Pick the work you need. We&apos;ll connect you with a local roofer who specialises in it.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {serviceSlugs.map((slug) => (
          <HomeServiceCard key={slug} slug={slug} />
        ))}
      </div>
    </section>
  );
}
