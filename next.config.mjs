// Old WordPress URLs from the previous domain owner, still known to Google.
const legacyRedirects = [
  ["/about-us", "/about"],
  ["/contact-us", "/contact"],
  ["/project-showcase", "/"],
  ["/re-roofing-roof-replacement", "/services/roof-replacement"],
  ["/tile-roof", "/services/roof-replacement"],
  ["/repair-services", "/services/roof-repairs"],
  ["/roof-leaks-repairs", "/services/roof-leak-repair"],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export is ideal for an SEO lead-gen site: every page is
  // pre-rendered to HTML. We keep the default (next build) which
  // statically generates all the location pages via generateStaticParams.
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      statusCode: 301,
    }));
  },
};

export default nextConfig;
