// app/verify-a-roofer/layout.js
//
// Metadata lives here, not in page.js, because page.js is a client
// component ("use client", for the clipboard + form state) and Next.js
// App Router doesn't allow a client component to export `metadata`.

import { site } from "@/data/config";

export const metadata = {
  title: "Verify a Roofer's Licence | Adelaide Roofers",
  description:
    "Check any South Australian roofer's licence status for free, using the official CBS register — the same check we run before referring anyone.",
  alternates: { canonical: `${site.url}/verify-a-roofer` },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Verify a Roofer",
      item: `${site.url}/verify-a-roofer`,
    },
  ],
};

export default function VerifyARooferLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
