// app/privacy/page.js
import Link from "next/link";
import { site } from "@/data/config";

// ── Update this when you revise the policy ──────────────────
const LAST_UPDATED = "July 2026";

// Operator / contact details (from the ASIC + ABN record).
const operator = {
  entity: "NETLOCAL CONSULTING PTY LTD",
  abn: "69 607 380 638",
  tradingAs: "Roofing Digital",
  email: "denislobo23@gmail.com",
  address: "1/20 Rosella St, Murrumbeena VIC 3163",
};

export const metadata = {
  title: `Privacy Policy | ${site.brand}`,
  description:
    "How Adelaide Roofers collects, uses, shares and protects your personal information, in line with the Australian Privacy Principles.",
  alternates: { canonical: `${site.url}/privacy` },
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

export default function PrivacyPage() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-5 py-20 md:py-24">
        <nav className="mb-4 font-body text-sm text-ink/50">
          <Link href="/" className="hover:text-clay">Home</Link>
          <span className="px-1.5">/</span>
          Privacy Policy
        </nav>
        <span className="eyebrow text-clay">Legal</span>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 font-body text-sm text-ink/50">Last updated: {LAST_UPDATED}</p>

        <div className="mt-8 font-body leading-relaxed text-ink/70">
          <p>
            This Privacy Policy explains how {operator.entity} (ABN {operator.abn}), trading as{" "}
            {operator.tradingAs}, which owns and operates {site.brand} at adelaideroofers.com.au
            (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), handles your personal
            information. We are committed to protecting your privacy and to handling your personal
            information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy
            Principles (APPs).
          </p>
        </div>

        <Section heading="1. Who we are and what we do">
          <p>
            {site.brand} is a referral service. We connect Adelaide homeowners with independent,
            local roofing contractors. We do not carry out roofing work ourselves. To provide this
            service, we collect some personal information from you and pass relevant details to a
            roofing contractor so they can contact you.
          </p>
        </Section>

        <Section heading="2. What information we collect">
          <p>When you make an enquiry — by phone or through a form on our website — we may collect:</p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>Your name;</li>
            <li>Your phone number and, if you provide it, your email address;</li>
            <li>Your suburb or location;</li>
            <li>Details about your roof and the work you&apos;re enquiring about.</li>
          </ul>
          <p>
            When you visit our website, we may also automatically collect technical information
            such as your IP address, browser type, device information, the pages you view, and
            similar analytics data, including through cookies (see section 6).
          </p>
        </Section>

        <Section heading="3. How we collect your information">
          <p>
            We collect personal information directly from you when you contact us or submit an
            enquiry. We collect technical information automatically when you use our website. We do
            not knowingly collect personal information from children.
          </p>
        </Section>

        <Section heading="4. Why we collect and use your information">
          <p>We use your personal information to:</p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>Connect you with a local roofing contractor who covers your area;</li>
            <li>Respond to your enquiry and communicate with you about it;</li>
            <li>Operate, maintain and improve our website and service;</li>
            <li>Comply with our legal obligations.</li>
          </ul>
        </Section>

        <Section heading="5. Who we share your information with">
          <p>
            This is central to how our service works, so we want to be clear about it. To fulfil
            your enquiry, we share the relevant details you provide (such as your name, contact
            number, suburb and roof enquiry) with an independent roofing contractor so they can
            contact you and provide a quote. Once we do so, that contractor handles your
            information under their own privacy practices, and any agreement or work is between you
            and them.
          </p>
          <p>We may also share information with:</p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>Service providers who help us operate our website and business (such as hosting, database and analytics providers), who are only permitted to use it to provide those services to us;</li>
            <li>Anyone else you have authorised, or where required or permitted by law.</li>
          </ul>
          <p>
            We do not sell your personal information, and we do not share it with third parties for
            their own marketing purposes.
          </p>
        </Section>

        <Section heading="6. Cookies and analytics">
          <p>
            Our website may use cookies and similar technologies, and analytics tools, to
            understand how visitors use the site so we can improve it. You can usually control or
            disable cookies through your browser settings, though some parts of the site may not
            function as intended if you do.
          </p>
        </Section>

        <Section heading="7. Overseas disclosure">
          <p>
            Some of the service providers we use (such as website hosting and database providers)
            may store data on servers located outside Australia. Where this occurs, we take
            reasonable steps to ensure your information is handled consistently with the Australian
            Privacy Principles.
          </p>
        </Section>

        <Section heading="8. How we protect your information">
          <p>
            We take reasonable steps to protect your personal information from misuse,
            interference, loss, and unauthorised access, modification or disclosure. However, no
            method of transmission over the internet or electronic storage is completely secure,
            and we cannot guarantee absolute security.
          </p>
        </Section>

        <Section heading="9. Accessing and correcting your information">
          <p>
            You may request access to the personal information we hold about you, and ask us to
            correct it if it is inaccurate, out of date or incomplete. To do so, contact us using
            the details below. We may need to verify your identity before acting on your request.
          </p>
        </Section>

        <Section heading="10. Making a complaint">
          <p>
            If you have a concern about how we have handled your personal information, please
            contact us first using the details below and we will do our best to resolve it. If you
            are not satisfied with our response, you may lodge a complaint with the Office of the
            Australian Information Commissioner (OAIC) at oaic.gov.au.
          </p>
        </Section>

        <Section heading="11. Changes to this policy">
          <p>
            We may update this Privacy Policy from time to time. The current version will always be
            available on this page, with the &ldquo;last updated&rdquo; date shown above.
          </p>
        </Section>

        <Section heading="12. Contact us">
          <p>
            For any privacy questions or requests, contact us at:
          </p>
          <p>
            {operator.entity} (trading as {operator.tradingAs})<br />
            Email: <a href={`mailto:${operator.email}`} className="text-clay hover:text-clay-deep">{operator.email}</a><br />
            {operator.address}
          </p>
        </Section>

        <p className="mt-10 rounded-xl border border-mortar bg-paper p-5 font-body text-sm leading-relaxed text-ink/55">
          This policy is provided as general information about our privacy practices and is not
          legal advice.
        </p>
      </section>
    </main>
  );
}
