// app/blog/council-approval-roof-replacement-sa/page.js
// Featured image: public/images/service-roof-replacement.webp (existing library image, no generation needed)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";
import ArticleMeta from "@/components/ArticleMeta";
import { articleMetadata } from "@/lib/articleMetadata";
import ArticleFaq from "@/components/ArticleFaq";
import ArticleFigure from "@/components/ArticleFigure";

export const metadata = articleMetadata({
  slug: "council-approval-roof-replacement-sa",
  title: "Do I Need Council Approval to Replace My Roof in SA? | Adelaide Roofers",
  description:
    "Do you need council approval to replace your roof in SA? Usually not, unless your home is heritage-listed or in a character area. Here's how to check.",
  image: "/images/service-roof-replacement.webp",
  imageAlt: "Roofers laying new dark Colorbond sheets over the exposed roof frame during a roof replacement",
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

const FAQS = [
  {
    q: "Do I need council approval to re-roof with Colorbond?",
    a: "On most homes, no: switching from tile to Colorbond is fine. In heritage and character areas, changing the roof material is the most common trigger for needing approval, so check your address first.",
  },
  {
    q: "How do I check if my house is in a heritage or character area?",
    a: "Enter your address in PlanSA's free Planning and Design Code lookup at code.plan.sa.gov.au. It lists the zone and any overlays that apply. If you're still unsure, call your local council's planning team.",
  },
  {
    q: "Do I need council approval to repair my roof?",
    a: "Generally not. Repairs such as replacing broken tiles, ridge capping, flashings, valleys and gutters, and restoration work like cleaning, re-bedding, re-pointing and re-coating usually don't need approval. The work must still meet building standards.",
  },
  {
    q: "How long does council approval for a new roof take?",
    a: "Expect several weeks, and longer if a heritage proposal is referred to Heritage SA. Build it into your replacement timeline, and match materials and colours to the original where you can to make approval smoother.",
  },
];

const SOURCES = [
  {
    href: "https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval",
    label: "Find out if you need approval",
    note: " (PlanSA)",
  },
  {
    href: "https://plan.sa.gov.au/__data/assets/pdf_file/0004/698323/Fact_Sheet_-_Find_out_if_you_need_approval.pdf",
    label: "Fact sheet: Find out if you need approval",
    note: " (PlanSA, PDF)",
  },
  {
    href: "https://code.plan.sa.gov.au/",
    label: "Planning and Design Code lookup",
    note: " (PlanSA)",
  },
  {
    href: "https://cdn.environment.sa.gov.au/environment/docs/her-gen-heritage-places-developing-guide.pdf",
    label: "Guide to developing State Heritage Places",
    note: " (Heritage SA, PDF)",
  },
];

const FLOW_ROWS = [
  { y: 110, lines: ["Is your home a State or", "Local Heritage Place?"], out: ["Approval likely needed.", "Talk to council first."] },
  { y: 220, lines: ["Is it in a heritage or character", "overlay, or a bushfire or", "flood-prone area?"], out: ["Check with council.", "Material changes can", "need approval."] },
  { y: 330, lines: ["Are you changing the roof\u2019s", "shape, pitch, height", "or structure?"], out: ["Approval likely needed.", "Talk to council first."] },
];

function ApprovalFlowchart() {
  const lineY = (top, count, i) => top + 41 - (count - 1) * 9 + i * 18;
  return (
    <svg
      viewBox="0 0 640 530"
      role="img"
      aria-labelledby="approval-flow-title approval-flow-desc"
      className="mx-auto block h-auto w-full min-w-[520px] max-w-2xl"
    >
      <title id="approval-flow-title">Do you need council approval to replace your roof?</title>
      <desc id="approval-flow-desc">
        A flowchart. If your home is a State or Local Heritage Place, approval is likely needed. If
        it is in a heritage or character overlay, or a bushfire or flood-prone area, check with
        council. If you are changing the roof&apos;s shape, pitch, height or structure, approval
        is likely needed. Otherwise a like-for-like re-roof usually needs no approval, but you
        should still check your address.
      </desc>
      <defs>
        <marker id="approval-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className="fill-ink" />
        </marker>
      </defs>

      <rect x="80" y="10" width="240" height="44" rx="22" className="fill-ink" />
      <text x="200" y="38" textAnchor="middle" className="fill-paper font-display" fontSize="16" fontWeight="700">
        Replacing your roof
      </text>

      {FLOW_ROWS.map((row, r) => (
        <g key={row.y}>
          <line x1="200" y1={r === 0 ? 54 : row.y - 38} x2="200" y2={row.y - 4} className="stroke-ink" strokeWidth="2" markerEnd="url(#approval-arrow)" />
          {r > 0 && (
            <text x="212" y={row.y - 15} className="fill-ink/60 font-display" fontSize="13" fontWeight="700">No</text>
          )}
          <rect x="10" y={row.y} width="380" height="72" rx="10" className="fill-white stroke-mortar" strokeWidth="2" />
          {row.lines.map((l, i) => (
            <text key={l} x="200" y={lineY(row.y, row.lines.length, i)} textAnchor="middle" className="fill-ink font-body" fontSize="15">{l}</text>
          ))}
          <line x1="390" y1={row.y + 36} x2="436" y2={row.y + 36} className="stroke-ink" strokeWidth="2" markerEnd="url(#approval-arrow)" />
          <text x="413" y={row.y + 28} textAnchor="middle" className="fill-clay font-display" fontSize="13" fontWeight="700">Yes</text>
          <rect x="440" y={row.y} width="190" height="72" rx="10" className="fill-clay/10 stroke-clay" strokeWidth="2" />
          {row.out.map((l, i) => (
            <text key={l} x="535" y={lineY(row.y, row.out.length, i)} textAnchor="middle" className="fill-ink font-body" fontSize="14">{l}</text>
          ))}
        </g>
      ))}

      <line x1="200" y1="402" x2="200" y2="438" className="stroke-ink" strokeWidth="2" markerEnd="url(#approval-arrow)" />
      <text x="212" y="425" className="fill-ink/60 font-display" fontSize="13" fontWeight="700">No</text>
      <rect x="10" y="442" width="620" height="76" rx="10" className="fill-paper stroke-ink" strokeWidth="2" />
      <text x="320" y="474" textAnchor="middle" className="fill-ink font-display" fontSize="16" fontWeight="700">
        Like-for-like re-roof: usually no approval needed
      </text>
      <text x="320" y="498" textAnchor="middle" className="fill-ink font-body" fontSize="14">
        Still check your address on PlanSA&apos;s Planning and Design Code lookup.
      </text>
    </svg>
  );
}

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
              Usually not. In South Australia, you generally don&apos;t need council approval to
              replace your roof like-for-like on an ordinary home (the formal term is development
              approval), but always check your address first. The main exceptions are
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
                alt="Roofers laying new dark Colorbond sheets over the exposed roof frame during a roof replacement"
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
                <h2 className={h2}>When you probably do need council approval to replace your roof</h2>
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

              <ArticleFigure
                heading="Quick check: do you need approval?"
                caption="A general guide only. Your address lookup and your council have the final say."
              >
                <ApprovalFlowchart />
              </ArticleFigure>

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

              <ArticleFaq heading="Council approval to replace your roof: common questions" faqs={FAQS} />

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
