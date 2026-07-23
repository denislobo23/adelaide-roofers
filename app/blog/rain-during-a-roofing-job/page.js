// app/blog/rain-during-a-roofing-job/page.js
// Featured image: public/images/service-roof-restoration.webp (existing library image, no generation needed)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "What Happens If It Rains During a Roofing Job? | Adelaide Roofers",
  description:
    "How a properly run roofing job handles rain and weather delays, and why it's a normal part of scheduling rather than something to worry about.",
  alternates: { canonical: `${site.url}/blog/rain-during-a-roofing-job` },
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
      name: "What Happens If It Rains During a Roofing Job?",
      item: `${site.url}/blog/rain-during-a-roofing-job`,
    },
  ],
};

export default function RainDuringAJobPage() {
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
            <span className="eyebrow text-clay">Process</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
              What Happens If It Rains During a Roofing Job?
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Adelaide's weather doesn't always cooperate with a roofing schedule — here's how a
              properly run job actually handles it, and why it's not something to worry about.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-restoration.webp"
                alt="Roofing work paused during weather in Adelaide"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  The home stays weather-sealed every night
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A properly run job never leaves your home exposed overnight, regardless of how
                  far through the job the crew is. Temporary weatherproofing at the end of each
                  day is standard practice, not an extra precaution.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Some tasks simply pause
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Coating and painting work in particular needs dry conditions to cure properly,
                  so it genuinely pauses in rain rather than being rushed through. Other tasks,
                  like material delivery or prep work, can often continue depending on the
                  specific conditions.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  It extends the timeline, not the price
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Weather delays add days to the schedule, not dollars to the quote — a fair
                  roofer doesn't charge extra for waiting out rain that's genuinely outside
                  anyone's control.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Good scheduling minimises the impact
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Experienced roofers keep an eye on the forecast and sequence work to minimise
                  exposure during likely wet periods — it's part of normal job planning, not
                  something you need to manage yourself.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Booking around Adelaide's seasons
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  If timing matters to you, drier months make scheduling more predictable —
                  though most work can genuinely happen year-round.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/calculator"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    Try the free calculator →
                  </Link>
                  <Link
                    href="/free-guide"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-ink px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
                  >
                    Get the free guide →
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
          We&apos;ll match you with a vetted local roofer for an obligation-free quote.
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
