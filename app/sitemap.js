// app/sitemap.js
import { regions, suburbs } from "@/data/locations";
import { serviceSlugs } from "@/data/services-data";
import { site } from "@/data/config";

export default function sitemap() {
  const now = new Date();

  const home = { url: site.url, lastModified: now, priority: 1 };

  // Static top-level pages.
  const staticPages = [
    { url: `${site.url}/about`, lastModified: now, priority: 0.6 },
    { url: `${site.url}/services`, lastModified: now, priority: 0.7 },
    { url: `${site.url}/faq`, lastModified: now, priority: 0.6 },
  ];

  // Dedicated service landing pages.
  const servicePagesList = serviceSlugs.map((slug) => ({
    url: `${site.url}/services/${slug}`,
    lastModified: now,
    priority: 0.8,
  }));

  // Region hubs.
  const hubs = Object.keys(regions).map((slug) => ({
    url: `${site.url}/${slug}`,
    lastModified: now,
    priority: 0.8,
  }));

  // Only ready suburb pages — never list pages that aren't built.
  const spokes = Object.values(suburbs)
    .filter((s) => s.ready)
    .map((s) => ({
      url: `${site.url}/${s.region}/${s.slug}`,
      lastModified: now,
      priority: 0.7,
    }));

  return [home, ...staticPages, ...servicePagesList, ...hubs, ...spokes];
}
