// app/blog/council-approval-roof-replacement-sa/page.js
// Featured image: public/images/service-roof-replacement.webp (existing library image, no generation needed)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";
import ArticleMeta from "@/components/ArticleMeta";
import { articleMetadata } from "@/lib/articleMetadata";

export const metadata = articleMetadata({
  slug: "council-approval-roof-replacement-sa",
  title: "Do I Need Council Approval to Replace My Roof in SA? | Adelaide Roofers",
  description:
    "Do you need council approval to replace your roof in SA? Usually not, unless your home is heritage-listed or in a character area. Here's how to check.",
  image: "/images/service-roof-replacement.webp",
  imageAlt: "Roof replacement work on an Adelaide home",
});

const HEADLINE = "Do I Need Council Approval to Replace My Roof in SA?";
const CODE_LOOKUP = "https://code.plan.sa.gov.au/";

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
      item: `${site.url}/blog/council-approval-roof-replacement-sa`,
    },
  ],
};

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const olist = "mt-4 list-decimal space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:font-semibold marker:text-clay";
const inlineLink = "font-semibold text-clay hover:text-clay-deep";

function CodeLookupLink({ children }) {
  return (
    <a href={CODE_LOOKUP} target="_blank" rel="noopener noreferrer" className={inlineLink}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function CouncilApprovalPage() {
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
              {HEADLINE}
            </h1>
            <ArticleMeta slug="council-approval-roof-replacement-sa" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Usually not. In South Australia, replacing a roof like-for-like on an ordinary home
              generally doesn&apos;t need development approval, but always check your address
              first. The main exceptions are
              heritage-listed homes, homes in heritage or character areas, and jobs that change
              the roof&apos;s shape, height or structure. The quickest way to check your address
              is PlanSA&apos;s free online{" "}
              <CodeLookupLink>Planning and Design Code lookup</CodeLookupLink>.
            </p>
            <p className={body}>
              Below is when approval is usually needed, how to check, and what happens if it is.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-replacement.webp"
                alt="Roof replacement work on an Adelaide home"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className={h2}>When you usually don&apos;t need approval</h2>
                <ul className={list}>
                  <li>
                    Replacing old roofing with the same or a similar material, on the same frame and
                    roof shape.
                  </li>
                  <li>Repairs: broken tiles, ridge capping, flashings, valleys, gutters.</li>
                  <li>Restoration: cleaning, re-bedding, re-pointing and re-coating.</li>
                </ul>
                <p className={body}>
                  Even then, the work must still meet building standards, so use a licensed roofer.
                </p>
              </article>

              <article>
                <h2 className={h2}>When you probably do need approval</h2>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Heritage places:</strong> State Heritage Places
                    and Local Heritage Places. Re-roofing a State Heritage Place generally needs
                    approval.
                  </li>
                  <li>
                    <strong className="text-ink">Heritage or character areas:</strong> overlays in
                    suburbs such as Unley and Norwood often protect roof materials and form,
                    especially from the street.
                  </li>
                  <li>
                    <strong className="text-ink">Changing the roof&apos;s shape, pitch or height</strong>,
                    or adding a dormer or second storey.
                  </li>
                  <li>
                    <strong className="text-ink">Structural work:</strong> new or replaced roof
                    framing.
                  </li>
                  <li>
                    <strong className="text-ink">Bushfire and flood-prone areas</strong>, where
                    extra rules can apply.
                  </li>
                </ul>
                <p className={body}>
                  Changing material, such as tile to Colorbond, is fine on most homes but is the
                  most common trigger in heritage and character areas. See{" "}
                  <Link href="/blog/tile-to-metal-roofing" className={inlineLink}>
                    what changes when you go tile-to-metal
                  </Link>
                  .
                </p>
              </article>

              <article>
                <h2 className={h2}>How to check your address</h2>
                <ol className={olist}>
                  <li>
                    Go to PlanSA&apos;s{" "}
                    <CodeLookupLink>Planning and Design Code lookup</CodeLookupLink>. Enter your
                    address to see the zone and policies that apply.
                  </li>
                  <li>
                    Check whether your property sits in a heritage or character overlay. The same
                    address lookup lists the overlays that apply.
                  </li>
                  <li>
                    If you&apos;re still unsure, call your local council&apos;s planning team.
                    It&apos;s free and quick.
                  </li>
                  <li>Ask your roofer. A good local roofer knows which suburbs need care.</li>
                </ol>
              </article>

              <article>
                <h2 className={h2}>If you do need approval</h2>
                <ul className={list}>
                  <li>Applications are lodged through the PlanSA portal.</li>
                  <li>Heritage proposals may be referred to Heritage SA.</li>
                  <li>
                    Expect it to take several weeks, so build it into your replacement timeline.
                  </li>
                  <li>
                    Matching materials and colours to the original usually makes approval smoother.
                  </li>
                </ul>
              </article>

              <article>
                <h2 className={h2}>What happens if you skip it</h2>
                <p className={body}>
                  If approval was needed and you didn&apos;t get it, council can take enforcement
                  action, such as ordering changes, and it can cause problems when you sell.
                  Checking first takes ten minutes.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Next steps
                </h2>
                <p className={body}>
                  Once you&apos;re clear, see our{" "}
                  <Link href="/services/roof-replacement" className={inlineLink}>
                    roof replacement in Adelaide
                  </Link>{" "}
                  page to get matched with a local roofer who knows your area&apos;s rules.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/blog/tile-to-metal-roofing"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    Read what changes tile-to-metal →
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
