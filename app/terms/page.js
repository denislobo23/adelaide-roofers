// app/terms/page.js
import Link from "next/link";
import { site } from "@/data/config";

// ── Update this when you revise the terms ───────────────────
const LAST_UPDATED = "July 2026";

const operator = {
  entity: "NETLOCAL CONSULTING PTY LTD",
  abn: "69 607 380 638",
  tradingAs: "Roofing Digital",
  email: "denislobo23@gmail.com",
  address: "1/20 Rosella St, Murrumbeena VIC 3163",
};

export const metadata = {
  title: `Terms of Use | ${site.brand}`,
  description:
    "The terms on which Adelaide Roofers provides its free roofer-referral service and website. Please read them carefully.",
  alternates: { canonical: `${site.url}/terms` },
  robots: { index: true, follow: true },
};

function Section({ heading, children }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-xl font-bold tracking-tight text-ink">{heading}</h2>
      <div className="mt-3 space-y-3 font-body leading-relaxed text-ink/70">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-5 py-20 md:py-24">
        <nav className="mb-4 font-body text-sm text-ink/50">
          <Link href="/" className="hover:text-clay">Home</Link>
          <span className="px-1.5">/</span>
          Terms of Use
        </nav>
        <span className="eyebrow text-clay">Legal</span>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink md:text-5xl">
          Terms of Use
        </h1>
        <p className="mt-4 font-body text-sm text-ink/50">Last updated: {LAST_UPDATED}</p>

        <div className="mt-8 font-body leading-relaxed text-ink/70">
          <p>
            These Terms of Use govern your use of the {site.brand} website at
            adelaideroofers.com.au and our referral service. The website and service are provided
            by {operator.entity} (ABN {operator.abn}), trading as {operator.tradingAs}
            (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). By using our website or making
            an enquiry, you agree to these terms. Please read them carefully.
          </p>
        </div>

        <Section heading="1. What we do — and what we don't">
          <p>
            {site.brand} is a referral service. We connect Adelaide homeowners with independent,
            local roofing contractors. We are not a roofing company, and we do not carry out
            roofing inspections, quotes or work ourselves.
          </p>
          <p>
            When we connect you with a contractor, any inspection, quote, agreement, pricing,
            workmanship and warranty is a matter directly between you and that contractor. We are
            not a party to that arrangement.
          </p>
        </Section>

        <Section heading="2. The contractors are independent">
          <p>
            The roofing contractors we refer you to are independent businesses. They are not our
            employees, agents or partners in a legal sense, and we do not control or supervise
            their work. While we aim to connect you with reputable local roofers, we do not
            guarantee the licensing, insurance, availability, pricing, quality or conduct of any
            contractor.
          </p>
          <p>
            We encourage you to make your own checks before engaging any contractor — for example,
            confirming their licence and insurance, obtaining a written quote, and asking about
            warranties.
          </p>
        </Section>

        <Section heading="3. Our service is free and without obligation">
          <p>
            Our referral service is free for homeowners, and there is no obligation to proceed with
            any contractor we connect you with. You are free to obtain other quotes or to decline
            to go ahead at any time.
          </p>
        </Section>

        <Section heading="4. Information on this website">
          <p>
            The information on our website — including guidance about roofing, suburbs, councils,
            heritage areas and approvals — is general information only. It is not professional,
            building or legal advice, and it may not apply to your specific property. Council
            rules, heritage overlays and requirements can change and vary property by property, so
            you should confirm anything that matters with the relevant council or a qualified
            professional.
          </p>
          <p>
            We take care to keep information accurate but do not warrant that it is complete,
            current or error-free.
          </p>
        </Section>

        <Section heading="5. Acceptable use">
          <p>
            You agree to use our website and service only for lawful purposes and not to misuse
            them — for example, by submitting false information, using the site to send spam, or
            attempting to interfere with its operation or security.
          </p>
        </Section>

        <Section heading="6. Intellectual property">
          <p>
            The content, design and materials on this website are owned by us or our licensors and
            are protected by intellectual property laws. You may not copy, reproduce or reuse them
            without our permission, except as permitted by law.
          </p>
        </Section>

        <Section heading="7. Third-party links">
          <p>
            Our website may contain links to third-party websites. We are not responsible for the
            content, products or privacy practices of those websites, and a link does not imply our
            endorsement.
          </p>
        </Section>

        <Section heading="8. Liability">
          <p>
            Nothing in these terms excludes, restricts or modifies any consumer guarantee, right or
            remedy you have under the Australian Consumer Law or other law that cannot lawfully be
            excluded.
          </p>
          <p>
            Subject to that, and to the extent permitted by law: we provide our website and
            referral service on an &ldquo;as is&rdquo; basis; we are not liable for the acts,
            omissions, workmanship, quotes or conduct of any contractor we connect you with; and we
            are not liable for any loss or damage arising from your use of our website or service,
            or from your dealings with any contractor.
          </p>
        </Section>

        <Section heading="9. Governing law">
          <p>
            These terms are governed by the laws of South Australia, and you submit to the
            non-exclusive jurisdiction of the courts of South Australia.
          </p>
        </Section>

        <Section heading="10. Changes to these terms">
          <p>
            We may update these Terms of Use from time to time. The current version will always be
            available on this page, with the &ldquo;last updated&rdquo; date shown above.
          </p>
        </Section>

        <Section heading="11. Contact us">
          <p>
            {operator.entity} (trading as {operator.tradingAs})<br />
            Email: <a href={`mailto:${operator.email}`} className="text-clay hover:text-clay-deep">{operator.email}</a><br />
            {operator.address}
          </p>
        </Section>

        <p className="mt-10 rounded-xl border border-mortar bg-paper p-5 font-body text-sm leading-relaxed text-ink/55">
          These terms are provided as general information and are not legal advice.
        </p>
      </section>
    </main>
  );
}
