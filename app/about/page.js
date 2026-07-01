// app/about/page.js
import Link from "next/link";
import { site } from "@/data/config";
import { regions } from "@/data/locations";
import CallButton from "@/components/CallButton";
import RidgeDivider from "@/components/RidgeDivider";

export const metadata = {
  title: `About ${site.brand} | How Our Roofer Matching Works`,
  description:
    "Adelaide Roofers is a free service that connects local homeowners with licensed roofing contractors who work their suburb. Here's who we are and how it works.",
  alternates: { canonical: `${site.url}/about` },
  openGraph: {
    title: `About ${site.brand}`,
    description:
      "A free service connecting Adelaide homeowners with licensed local roofing contractors.",
    url: `${site.url}/about`,
    type: "website",
  },
};

const principles = [
  {
    t: "Local, not generic",
    d: "A roof in salty Semaphore, heritage Unley and reactive-clay Salisbury each ask different things. We connect you with a roofer who actually works your part of Adelaide, not a call centre three states away.",
  },
  {
    t: "Free for homeowners",
    d: "You pay nothing to be connected. Any quote or work is arranged directly between you and the roofer, on your terms — we're simply the introduction.",
  },
  {
    t: "Honest about what we are",
    d: "We don't climb on roofs ourselves. We're a referral service, and we say so plainly. The work is done by independent, licensed contractors — never by us.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* ── INTRO ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-wrap px-5 py-20 md:py-24">
        <nav className="mb-4 font-body text-sm text-ink/50">
          <Link href="/" className="hover:text-clay">Home</Link>
          <span className="px-1.5">/</span>
          About
        </nav>
        <span className="eyebrow text-clay">About us</span>
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-extrabold leading-[1.07] tracking-tight text-ink md:text-5xl">
          We help Adelaide homeowners find a roofer who works their suburb.
        </h1>
        <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink/70">
          Finding a good roofer is harder than it should be. Most people start by searching,
          land on a list of national-looking names, and have no idea which of them actually
          covers their street — or whether they understand the kind of roof sitting over their
          heads. {site.brand} exists to fix that one problem.
        </p>
      </section>

      <RidgeDivider />

      {/* ── WHAT WE DO ─────────────────────────────────────── */}
      <section className="border-y border-mortar bg-white">
        <div className="mx-auto max-w-wrap px-5 py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_1fr]">
            <div>
              <span className="eyebrow text-clay">What we do</span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
                A simple introduction, done well
              </h2>
              <p className="mt-5 font-body leading-relaxed text-ink/70">
                {site.brand} is a free connection service. You tell us your suburb and what&apos;s
                happening with your roof — a leak, tired tiles, storm damage, or just a hunch
                that it&apos;s due — and we connect you with a local roofing contractor who works
                that area.
              </p>
              <p className="mt-4 font-body leading-relaxed text-ink/70">
                From there, the roofer takes over: they arrange a time, assess the roof and quote
                you directly. You deal with them, not us. There&apos;s no cost to you for the
                introduction and no obligation to go ahead.
              </p>
            </div>
            <div className="rounded-2xl border border-mortar bg-paper p-8">
              <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                Why we built it around suburbs
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink/65">
                Adelaide&apos;s roofs aren&apos;t all the same. The coast eats metal with salt.
                The foothills bring leaf litter and bushfire rules. The inner east is full of
                heritage slate and iron that needs a careful hand. The northern plains sit on
                reactive clay that cracks ridge mortar.
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink/65">
                A roofer who knows your area already knows what your roof is likely doing — which
                is why we organised the whole service around where you live.
              </p>
              <Link
                href="/#regions"
                className="mt-5 inline-block font-display text-sm font-semibold text-clay hover:text-clay-deep"
              >
                See the areas we cover →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ─────────────────────────────────────── */}
      <section className="mx-auto max-w-wrap px-5 py-20">
        <span className="eyebrow text-clay">What we stand for</span>
        <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Three things we won&apos;t budge on
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {principles.map((p) => (
            <div key={p.t} className="rounded-2xl border border-mortar bg-white p-7">
              <h3 className="font-display text-lg font-bold tracking-tight text-ink">{p.t}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink/65">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HONEST DISCLOSURE (as a feature, not fine print) ── */}
      <section className="border-y border-mortar bg-ink text-paper">
        <div className="mx-auto max-w-wrap px-5 py-16">
          <span className="eyebrow text-clay">Straight with you</span>
          <h2 className="mt-2 max-w-2xl font-display text-2xl font-bold tracking-tight md:text-3xl">
            We&apos;re the introduction, not the contractor
          </h2>
          <p className="mt-4 max-w-2xl font-body leading-relaxed text-paper/75">
            {site.brand} connects homeowners with independent local roofing contractors. We do
            not carry out roofing work ourselves, and we don&apos;t take a cut of your quote. Any
            agreement, quote and workmanship is between you and the licensed roofer you&apos;re
            connected with. We think being upfront about that is the least you should expect.
          </p>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-wrap px-5 py-20 text-center">
        <h2 className="mx-auto max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Ready to find your roofer?
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-ink/65">
          Give us a call and we&apos;ll point you to a contractor who covers your suburb.
        </p>
        <div className="mt-7 flex justify-center">
          <CallButton />
        </div>
      </section>
    </main>
  );
}
