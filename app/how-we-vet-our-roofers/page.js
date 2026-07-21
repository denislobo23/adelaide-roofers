// app/how-we-vet-our-roofers/page.js
//
// Full "How We Select a Roofer" article — the content drafted and refined
// in verify-a-roofer-page-copy.docx, now split out to its own page per the
// site build brief (this page = the article; /verify-a-roofer = the
// lightweight 2-field tool). Voice is agency-first throughout: "we check
// X before referring a roofer", not "here's how you check X".
//
// Layout: 2-column grid with a sticky ArticleSidebar (calculator + ebook
// teasers) running alongside the article, so those CTAs stay visible
// while scrolling instead of only appearing once at the very bottom.
// Featured image: public/images/articles/article-how-we-vet.webp
//
// SEO notes:
// - Primary target: "how we vet roofers" / "vetted roofers Adelaide"
// - Image alt text leads with "licensed insured roofer Adelaide"
// - Internal links: /calculator, /free-guide, /regions, /verify-a-roofer
// - Schema: BreadcrumbList + Service.

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "How We Vet Adelaide Roofers | Licensing, Insurance, Track Record",
  description:
    "Every roofer we refer is checked for a current SA licence, insurance, and a real local track record — before you ever hear from them. See exactly what we check.",
  alternates: { canonical: `${site.url}/how-we-vet-our-roofers` },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "How We Vet Our Roofers",
      item: `${site.url}/how-we-vet-our-roofers`,
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Roofer matching and vetting service",
  areaServed: { "@type": "City", name: "Adelaide" },
  provider: { "@type": "Organization", name: site.brand, url: site.url },
  description:
    "Adelaide Roofers checks licensing, insurance, and track record before referring any roofer to a homeowner, at no cost to the homeowner.",
};

export default function HowWeVetOurRoofersPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <section className="mx-auto max-w-wrap px-5 pt-16 pb-16 md:pt-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_280px] md:gap-14">
          {/* ── MAIN CONTENT ─────────────────────────────── */}
          <div>
            <span className="eyebrow text-clay">How we vet roofers</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
              How We Select a Roofer
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Most people only find out how the roofing industry actually works after
              something&apos;s gone wrong.
            </p>
            <p className="mt-4 font-body leading-relaxed text-ink/70">
              That&apos;s the real problem Adelaide Roofers exists to solve. A new roof — or even
              a repair after a storm — is one of the biggest and most opaque purchases most
              homeowners will ever make. You can&apos;t see inside the finished work. You don&apos;t
              know whether a quote is fair or a warning sign. And a search for &ldquo;roofer near
              me&rdquo; just hands you a list of ads, with no way to tell who&apos;s actually a{" "}
              <strong>licensed roofer in Adelaide</strong>, who&apos;s actually an{" "}
              <strong>insured roofer</strong>, and who&apos;s going to still be answering the phone
              in twelve months if something goes wrong.
            </p>
            <p className="mt-4 font-body leading-relaxed text-ink/70">
              So before any roofer joins the Adelaide Roofers network, we check five things
              ourselves — licensing, insurance, track record, suburb fit, and warranty cover — so
              you don&apos;t have to find out the hard way. Here&apos;s exactly what we look for, and
              why each one matters.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/articles/article-how-we-vet.webp"
                alt="Licensed, insured roofer in Adelaide reviewing a checklist in front of a suburban tile roof home"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-14">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  1. Licensing
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  In South Australia, anyone carrying out domestic building work for someone else —
                  including roofing — must hold a current Building Work Contractor&apos;s Licence
                  issued by Consumer and Business Services (CBS), under the Building Work Contractors
                  Act 1995. Before a roofer ever joins our network, we confirm this directly against
                  CBS&apos;s own public register — not against whatever they tell us.
                </p>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  That check tells us a roofer has actually met the state&apos;s competency and
                  financial requirements, and that they&apos;re legally allowed to take on the work in
                  the first place. Licences can also be suspended or cancelled, so we check current
                  status — not just that a licence was issued at some point in the past.
                </p>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Every roofer we refer has already cleared this. If they can&apos;t produce a current
                  licence number, they don&apos;t make it into our network — simple as that.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  2. Insurance
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A licence tells us someone is allowed to do the work. Insurance tells us what
                  happens if it goes wrong — so we confirm three types are current before we ever
                  refer an <strong>insured roofer</strong>:
                </p>
                <ul className="mt-4 space-y-3 font-body leading-relaxed text-ink/70">
                  <li>
                    <strong className="text-ink">Public liability insurance</strong> — covers damage
                    to your property or injury to a third party during the job.
                  </li>
                  <li>
                    <strong className="text-ink">Building Indemnity Insurance (BII)</strong> — a
                    specific SA requirement for domestic building contracts of $20,000 or more. It
                    protects you if the builder dies, disappears, becomes insolvent, or is found
                    negligent and can&apos;t or won&apos;t fix the problem.
                  </li>
                  <li>
                    <strong className="text-ink">Workers compensation</strong> — covers anyone
                    working on your roof if they&apos;re injured on site.
                  </li>
                </ul>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  We ask for actual certificates of currency — dated documents, not a verbal assurance
                  — before a roofer is added to our network.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  3. Track record
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Licensing and insurance tell us a roofer is legally allowed to do the job, and
                  covered if it goes wrong. They don&apos;t tell us if the work is actually good — so
                  we check that separately, before anyone joins our network:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70">
                  <li>Recent completed jobs locally, with photos where we can get them</li>
                  <li>Contactable references — not just star ratings</li>
                  <li>
                    How long they&apos;ve genuinely been trading under their current business name
                  </li>
                </ul>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A roofer with nothing to show and no one for us to call doesn&apos;t get referred —
                  that&apos;s not a risk we&apos;re willing to hand to you.
                </p>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Not sure yet whether your job is even a repair or a full replacement?{" "}
                  <Link href="/calculator" className="font-semibold text-clay underline-offset-2 hover:underline">
                    Try our free calculator
                  </Link>{" "}
                  for an instant estimate either way.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  4. Suburb fit
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  &ldquo;Nearby&rdquo; isn&apos;t just a convenience filter — it changes the quality of
                  the work, which is why we match you with a roofer who already works your part of
                  Adelaide, not just whoever&apos;s available first. A local roofer already knows which
                  materials suit the local conditions, what your council actually requires for
                  approvals in that area, and which suppliers can get materials to your street quickly
                  if something&apos;s back-ordered.
                </p>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  It matters after the job&apos;s finished, too — a local roofer has a shorter drive
                  back if something needs a warranty callback.{" "}
                  <Link href="/#regions" className="font-semibold text-clay underline-offset-2 hover:underline">
                    See the suburbs we cover
                  </Link>
                  .
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  5. Warranties
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Two different warranties are in play on any roofing job, and we confirm both before
                  we refer a roofer — not left for you to chase up afterwards:
                </p>
                <ul className="mt-4 space-y-3 font-body leading-relaxed text-ink/70">
                  <li>
                    <strong className="text-ink">Manufacturer&apos;s material warranty</strong> —
                    covers the roofing material itself, but is often void if it&apos;s installed by an
                    unlicensed or non-approved installer. We confirm the roofer is an approved
                    installer, so this warranty actually holds if you ever need it.
                  </li>
                  <li>
                    <strong className="text-ink">Workmanship warranty</strong> — covers the
                    installation itself, and is only as good as the company standing behind it. We
                    confirm the workmanship warranty period upfront, in writing.
                  </li>
                </ul>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  6. Who&apos;s actually doing the work
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Many roofing companies subcontract the physical installation — sometimes to workers
                  paid per square metre, an incentive structure that can reward speed over quality.
                  Before we refer a roofer, we confirm whether it&apos;s their own employees doing the
                  work or a subcontractor — and if it&apos;s a subcontractor, that they&apos;re
                  separately licensed and insured too.
                </p>
              </article>

              {/* Internal link teaser to the standalone tool, not the tool itself */}
              <div className="rounded-2xl border border-mortar bg-paper p-8 text-center">
                <span className="eyebrow text-clay">Free tool</span>
                <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-ink">
                  Want to check a licence yourself?
                </h3>
                <p className="mx-auto mt-2 max-w-md font-body text-sm leading-relaxed text-ink/65">
                  Everything above is what we already check before a roofer joins our network. If
                  you&apos;d rather check one yourself — including a roofer you found without us — use
                  our free tool.
                </p>
                <Link
                  href="/verify-a-roofer"
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                >
                  Check a licence →
                </Link>
              </div>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  If something doesn&apos;t check out
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  If a roofer can&apos;t produce a current licence number, current insurance, or any
                  real evidence of past work, we don&apos;t refer them — full stop. That&apos;s exactly
                  why we do this checking upfront, before your name and theirs are ever put together.
                </p>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Want the full list of questions and red flags to watch for, even if you&apos;d rather
                  vet a roofer yourself?{" "}
                  <Link href="/free-guide" className="font-semibold text-clay underline-offset-2 hover:underline">
                    Get our free guide
                  </Link>
                  .
                </p>
              </article>
            </div>
          </div>

          {/* ── SIDEBAR ──────────────────────────────────── */}
          <ArticleSidebar />
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────── */}
      <section className="mx-auto max-w-wrap px-5 py-20 text-center">
        <h2 className="mx-auto max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Tell us your suburb and what&apos;s going on with your roof
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-ink/65">
          We&apos;ll match you with someone who&apos;s already passed every check on this page.
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
