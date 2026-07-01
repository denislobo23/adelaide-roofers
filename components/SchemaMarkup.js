// components/SchemaMarkup.js
import { site, isLiveBusiness } from "@/data/config";

// Renders a JSON-LD <script>. Pass it a plain object.
function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organisation-level schema for the whole site. We describe it
// honestly as a referral service, and we DON'T emit aggregateRating
// or a licence until those are real (controlled from config).
export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand,
    url: site.url,
    telephone: site.phoneDisplay,
    description: site.shortDescription,
    areaServed: { "@type": "City", name: "Adelaide", containedInPlace: { "@type": "State", name: "South Australia" } },
  };
  return <JsonLd data={data} />;
}

// Per-suburb schema: a Service offered in that suburb + a FAQPage
// built from the genuine Q&As on the page.
export function SuburbSchema({ suburb }) {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Roofing",
    provider: { "@type": "Organization", name: site.brand, url: site.url },
    areaServed: { "@type": "Place", name: `${suburb.name}, SA ${suburb.postcode || ""}`.trim() },
    url: `${site.url}/${suburb.region}/${suburb.slug}`,
    description: suburb.metaDescription,
  };

  const faq = suburb.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: suburb.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={service} />
      {faq && <JsonLd data={faq} />}
    </>
  );
}

// Standalone FAQPage schema from a list of {q, a} — used on the homepage
// for the general FAQs. (Suburb pages emit their own via SuburbSchema.)
export function FaqSchema({ faqs }) {
  if (!faqs?.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <JsonLd data={data} />;
}

// BreadcrumbList schema from ordered items [{ name, url }]. URLs may be
// root-relative ("/northern-suburbs") — we normalise them to absolute.
export function BreadcrumbSchema({ items }) {
  if (!items?.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${site.url}${it.url}`,
    })),
  };
  return <JsonLd data={data} />;
}
