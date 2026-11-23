// app/blog/signs-you-need-a-new-roof/page.js
// Featured image: public/images/service-roof-repairs.webp (existing library image, no generation needed)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";
import ArticleMeta from "@/components/ArticleMeta";
import { articleMetadata } from "@/lib/articleMetadata";
import ArticleFaq from "@/components/ArticleFaq";
import PrintableChecklist from "@/components/PrintableChecklist";

export const metadata = articleMetadata({
  slug: "signs-you-need-a-new-roof",
  title: "Signs You Need a New Roof, Not Just a Repair | Adelaide Roofers",
  description:
    "The 10 signs you need a new roof, not another repair: leaks that keep coming back, crumbling tiles, rust and sagging rooflines on Adelaide homes.",
  image: "/images/service-roof-repairs.webp",
  imageAlt: "Roofer kneeling on a terracotta tile roof, checking tiles near the ridge for signs the home needs a new roof",
});

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

const CHECKLIST = [
  "The roof is past its expected life (or getting on in years)",
  "The same leak has come back after two or more repairs",
  "Tiles are crumbling, flaking or absorbing water",
  "Rust has gone through the metal, not just the surface",
  "The ridge or roofline dips, bows or sags",
  "Daylight shows through the roof space",
  "Water stains, mould or a damp smell inside",
  "Handfuls of tile grit or granules in the gutters",
  "Several repairs in the last few years",
  "Cracked or weathered asbestos cement (fibro) sheets",
];

const FAQS = [
  {
    q: "How do I know if I need a new roof?",
    a: "Look for two or more of the signs above: an old roof, leaks that keep coming back, crumbling tiles or rusted-through metal, a sagging roofline, or daylight in the roof space. One sign on its own is usually a repair. If you tick two or more, get a licensed roofer to inspect it before deciding.",
  },
  {
    q: "How long does a roof last in Adelaide?",
    a: "It depends on the material and how close you are to the sea. Bristile gives its concrete tiles a 50-year product warranty, and BlueScope warrants Colorbond roofing against rusting through for up to 45 years, with shorter cover near the coast. Terracotta tiles last a very long time, but the mortar bedding and pointing need redoing well before the tiles wear out.",
  },
  {
    q: "Can I just repair my roof instead of replacing it?",
    a: "Often, yes. A few cracked or slipped tiles, loose ridge capping, one leak on an otherwise sound roof, blocked gutters and surface rust caught early are normally fixable. Replacement makes sense when several signs show up together or repairs keep adding up.",
  },
  {
    q: "Should I replace a roof that isn't leaking yet?",
    a: "Not necessarily, but if it's 40 to 60 years old, start budgeting even if it looks fine from the street. Damage often starts in the timber, sarking and insulation before a stain shows on the ceiling, so an inspection is worth it.",
  },
];

const SOURCES = [
  {
    href: "https://www.brickworks.com.au/articles/home/how-to-choose-the-best-roofing-material-for-your-home/",
    label: "How to choose the best roofing material for your home",
    note: " (Brickworks, maker of Bristile roof tiles)",
  },
  {
    href: "https://bluescopesteel.com.au/resources/articles/bluescope-launches-new-colorbond-steel-colour-palette",
    label: "Colorbond steel roofing warranty of up to 45 years",
    note: " (BlueScope)",
  },
  {
    href: "https://colorbond.com/faq",
    label: "Colorbond steel FAQs: warranty cover by location",
    note: " (Colorbond, BlueScope)",
  },
  {
    href: "https://www.asbestossafety.gov.au/sites/default/files/2025-12/Chrysotile_Asbestos_factsheet.pdf",
    label: "Chrysotile asbestos fact sheet: the 2003 ban",
    note: " (Asbestos Safety and Eradication Agency, PDF)",
  },
];

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
              The clearest signs you need a new roof, not another repair, are: the roof is 30+
              years old, leaks keep coming back after repairs, tiles are crumbling
              or metal is rusted through, the roofline sags, or daylight shows through the roof
              space. One sign on its own is usually fixable. Two or more together mean repairs are
              just delaying the inevitable.
            </p>
            <p className={body}>
              Below are the ten signs to look for, what each one means, and which ones an
              Adelaide roofer would treat as urgent.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-repairs.webp"
                alt="Roofer kneeling on a terracotta tile roof, checking tiles near the ridge for signs the home needs a new roof"
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
                    <strong className="text-ink">Terracotta tiles:</strong> among the longest-lasting
                    roofing materials, but the mortar bedding and pointing under the ridge capping
                    wear out much sooner and need redoing from time to time.
                  </li>
                  <li>
                    <strong className="text-ink">Concrete tiles:</strong> Bristile, a major
                    Australian maker, gives its concrete tiles a 50-year product warranty, but the
                    surface gets porous and brittle with age.
                  </li>
                  <li>
                    <strong className="text-ink">Colorbond / metal:</strong> BlueScope warrants
                    Colorbond roofing against rusting through for up to 45 years, with shorter cover
                    closer to the coast.
                  </li>
                </ul>
                <p className={body}>
                  Plenty of older Adelaide homes still have their original roof.
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
                  Asbestos cement roofing was common on Australian homes built before 1990, and
                  it was banned in 2003. If yours is cracked, weathered or growing
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
                  If replacement looks likely, you&apos;ll probably also want to know whether{" "}
                  <Link href="/blog/insurance-roof-replacement-sa" className={inlineLink}>
                    insurance covers it
                  </Link>
                  ,{" "}
                  <Link href="/blog/how-long-does-roof-replacement-take" className={inlineLink}>
                    how long the job takes
                  </Link>
                  , and{" "}
                  <Link href="/blog/financing-a-new-roof" className={inlineLink}>
                    how to pay for it
                  </Link>
                  .
                </p>
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

              <PrintableChecklist
                heading="Printable checklist: signs you need a new roof"
                intro="Walk around the house and check the roof space on a sunny day, then tick what you find. Don't climb on the roof yourself."
                items={CHECKLIST}
                footer="Two or more ticks? Book an inspection with a licensed roofer before deciding."
              />

              <ArticleFaq heading="Signs you need a new roof: common questions" faqs={FAQS} />

              <article>
                <h2 className="font-display text-lg font-bold tracking-tight text-ink">Sources</h2>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 font-body text-sm leading-relaxed text-ink/60 marker:text-clay">
                  {SOURCES.map((src) => (
                    <li key={src.href}>
                      <a href={src.href} target="_blank" rel="noopener noreferrer" className={inlineLink}>
                        {src.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                      {src.note}
                    </li>
                  ))}
                </ul>
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
