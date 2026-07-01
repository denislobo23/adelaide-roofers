/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export is ideal for an SEO lead-gen site: every page is
  // pre-rendered to HTML. We keep the default (next build) which
  // statically generates all the location pages via generateStaticParams.
};

export default nextConfig;
