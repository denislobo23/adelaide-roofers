// app/blog/signs-you-need-a-new-roof/page.js
// Featured image: public/images/service-roof-repairs.webp (existing library image, no generation needed)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";
import ArticleMeta from "@/components/ArticleMeta";

export const metadata = {
  title: "Signs You Need a New Roof, Not Just a Repair | Adelaide Roofers",
  description:
    "10 signs your Adelaide roof needs replacing, not another repair, from leaks that keep coming back to crumbling tiles, rust and sagging rooflines.",
  alternates: { canonical: `${site.url}/blog/signs-you-need-a-new-roof` },
};

const HEADLINE = "Signs You Need a New Roof, Not Just a Repair";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Resources", item: `${site.url}/#resources` },
    {
      "@type": "ListItem",
      position: 3,
      name: HEADLINE,
      item: `${site.url}/blog/signs-you-need-a-new-roof`,
    },
  ],
};

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const inlineLink = "font-semibold text-clay hover:text-clay-deep";

export default function SignsYouNeedANewRoofPage() {
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
            <span className="eyebrow text-clay">Repair vs. replace</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
              {HEADLINE}
            </h1>
            <ArticleMeta slug="signs-you-need-a-new-roof" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              You probably need a new roof, not another repair, if you see two or more of these:
              the roof is 30+ years old, leaks keep coming back after repairs, tiles are crumbling
              or metal is rusted through, the roofline sags, or daylight shows through the roof
              space. One sign on its own is usually fixable. Several together mean repairs are
              just delaying the inevitable.
            </p>
            <p className={body}>
              Below are the ten signs to look for, what each one means, and which ones an
              Adelaide roofer would treat as urgent.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-repairs.webp"
                alt="Assessing roof damage in Adelaide — signs a roof needs full replacement rather than a repair"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className={h2}>1. Age: the roof is past its expected life</h2>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Terracotta tiles:</strong> can last 50+ years,
                    but the bedding and pointing usually need redoing every 20 to 30.
                  </li>
                  <li>
                    <strong className="text-ink">Concrete tiles:</strong> around 30 to 50 years,
                    with surfaces that get porous and brittle with age.
                  </li>
                  <li>
                    <strong className="text-ink">Colorbond / metal:</strong> around 30 to 50
                    years, less near the coast.
                  </li>
                </ul>
                <p className={body}>
                  Many Adelaide homes built in the post-war boom still have their original roof.
                  If yours is 40 to 60 years old, start budgeting even if it looks fine from the
                  street.
                </p>
              </article>

              <article>
                <h2 className={h2}>2. Leaks that keep coming back</h2>
                <p className={body}>
                  One leak after a storm is a repair. The same ceiling stain coming back after two
                  or three fixes means the problem is wider than one spot. Usually it&apos;s
                  failing sarking (the membrane under the tiles), rusted valleys, or a roof that
                  has simply worn out.
                </p>
              </article>

              <article>
                <h2 className={h2}>3. Crumbling, flaking or porous tiles</h2>
                <p className={body}>
                  Concrete tiles lose their surface coating over time. Once they start crumbling
                  at the edges, absorbing water or snapping when walked on, replacing them one at
                  a time stops making sense. Adelaide&apos;s hot summers and cold winter nights
                  speed this up.
                </p>
              </article>

              <article>
                <h2 className={h2}>4. Rust that&apos;s gone through, not just on the surface</h2>
                <p className={body}>
                  Surface rust on Colorbond or galvanised iron can be treated. Rust holes, flaking
                  sheets or rust along every overlap mean the metal is finished. Coastal suburbs
                  like Glenelg, Henley Beach, Semaphore and Brighton see this sooner because of
                  salt air.
                </p>
              </article>

              <article>
                <h2 className={h2}>5. A sagging or uneven roofline</h2>
                <p className={body}>
                  Look at the ridge from across the street. If it dips, bows or waves, the roof
                  frame underneath may be weakened by water damage or overloaded. Treat this as
                  urgent and get it inspected before the next big storm.
                </p>
              </article>

              <article>
                <h2 className={h2}>6. Daylight in the roof space</h2>
                <p className={body}>
                  Go into the ceiling space on a sunny day with the lights off. Pinpricks of light
                  mean gaps where water can get in. A few can be patched. Light along whole rows
                  means the roof covering has failed.
                </p>
              </article>

              <article>
                <h2 className={h2}>7. Water stains, mould or a damp smell inside</h2>
                <p className={body}>
                  Brown rings on ceilings, mould in upper corners, or a musty smell in the roof
                  space are signs water has been getting in for a while, often longer than
                  you&apos;d think. By the time a stain shows, the timber and insulation above it
                  may already be damaged.
                </p>
              </article>

              <article>
                <h2 className={h2}>8. Granules or tile grit in the gutters</h2>
                <p className={body}>
                  A build-up of sandy grit in the gutters or at the downpipes means your tiles or
                  coating are breaking down. A little is normal. Handfuls every time you clean the
                  gutters is not.
                </p>
              </article>

              <article>
                <h2 className={h2}>9. You&apos;ve had several repairs in a few years</h2>
                <p className={body}>
                  Add up what you&apos;ve spent on roof repairs in the last five years. If
                  it&apos;s heading toward a third of the cost of a new roof, replacement is
                  usually the better money. See our{" "}
                  <Link href="/blog/roof-replacement-cost-adelaide" className={inlineLink}>
                    roof replacement cost guide
                  </Link>{" "}
                  for typical Adelaide prices.
                </p>
              </article>

              <article>
                <h2 className={h2}>10. An asbestos roof on an older home</h2>
                <p className={body}>
                  Asbestos cement roofing was common on Australian homes built before the late
                  1980s, and it was banned in 2003. If yours is cracked, weathered or growing
                  moss, don&apos;t repair, clean or pressure-wash it. It needs{" "}
                  <Link href="/services/asbestos-roof-removal" className={inlineLink}>
                    licensed removal
                  </Link>
                  . Read our{" "}
                  <Link href="/blog/asbestos-roof-removal-guide" className={inlineLink}>
                    asbestos roof removal guide
                  </Link>{" "}
                  first.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Signs that are usually just a repair
                </h2>
                <p className={body}>Not every problem means a new roof. These are normally fixable:</p>
                <ul className={list}>
                  <li>A few cracked or slipped tiles after a storm</li>
                  <li>Loose or cracked ridge capping</li>
                  <li>One leak in one spot, on a roof that&apos;s otherwise sound</li>
                  <li>Blocked or overflowing gutters</li>
                  <li>Surface rust caught early</li>
                </ul>
                <p className={body}>
                  If you&apos;re not sure which side of the line you&apos;re on, take our{" "}
                  <Link href="/blog/repair-vs-replace" className={inlineLink}>
                    repair vs replace quiz
                  </Link>
                  .
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  What to do next
                </h2>
                <ol className="mt-4 list-decimal space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:font-semibold marker:text-clay">
                  <li>
                    Do a safe check from the ground and inside the roof space. Don&apos;t climb on
                    the roof yourself.
                  </li>
                  <li>Take photos of anything you find, with dates.</li>
                  <li>
                    Get a proper inspection from a licensed roofer before deciding. Ask them to
                    show you photos of what they find on top.
                  </li>
                  <li>
                    Get more than one quote if replacement is recommended. Our guide to{" "}
                    <Link href="/blog/how-to-read-a-roofing-quote" className={inlineLink}>
                      reading a roofing quote
                    </Link>{" "}
                    shows what should be included.
                  </li>
                </ol>
                <p className={body}>
                  If you&apos;re already fairly sure it&apos;s time, here&apos;s how we can help
                  with{" "}
                  <Link href="/services/roof-replacement" className={inlineLink}>
                    replacing your roof
                  </Link>
                  : we&apos;ll connect you with a vetted local Adelaide roofer for a free quote.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/blog/repair-vs-replace"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    Take the repair vs. replace quiz →
                  </Link>
                  <Link
                    href="/calculator"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-ink px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
                  >
                    Try the free calculator →
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
          We&apos;ll match you with a vetted local roofer for an obligation-free assessment.
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
