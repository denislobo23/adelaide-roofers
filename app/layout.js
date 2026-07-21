// app/layout.js
import "./globals.css";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import SiteChrome from "@/components/SiteChrome";
import { OrganizationSchema } from "@/components/SchemaMarkup";
import { site } from "@/data/config";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} | Find a Trusted Local Roofer in Adelaide`,
    template: `%s`,
  },
  description: site.shortDescription,
  robots: { index: true, follow: true },
  ...(site.gscVerification
    ? { verification: { google: site.gscVerification } }
    : {}),
  openGraph: {
    title: `${site.brand} | Find a Trusted Local Roofer in Adelaide`,
    description: site.shortDescription,
    url: site.url,
    siteName: site.brand,
    locale: "en_AU",
    type: "website",
    images: site.ogImage ? [{ url: site.ogImage, width: 1200, height: 630, alt: site.brand }] : [],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable}`}>
      <body className="font-body">
        <OrganizationSchema />
        <SiteChrome>{children}</SiteChrome>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
