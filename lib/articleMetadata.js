// Shared page metadata for blog articles: title, description, canonical,
// plus per-article Open Graph and Twitter cards. Next.js merges metadata
// shallowly, so without this every article inherits the homepage's openGraph.

import { site } from "@/data/config";
import articleDates from "@/data/article-dates.json";

export function articleMetadata({ slug, title, description, image, imageAlt }) {
  const dates = articleDates[slug];
  if (!dates) {
    throw new Error(`No dates for blog article "${slug}". Run: node scripts/article-dates.mjs`);
  }

  const url = `${site.url}/blog/${slug}`;
  // Share cards show the headline without the brand suffix; siteName carries the brand.
  const shareTitle = title.replace(/\s*\|\s*Adelaide Roofers$/, "");

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: shareTitle,
      description,
      url,
      siteName: site.brand,
      locale: "en_AU",
      publishedTime: dates.datePublished,
      modifiedTime: dates.dateModified,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [{ url: image, alt: imageAlt }],
    },
  };
}
