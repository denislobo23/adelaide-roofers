"use client";
// components/SiteChrome.jsx
//
// Wraps Header + Footer around normal pages, but hides both on the
// standalone dark-themed calculator routes — those pages have their own
// "Back to Adelaide Roofers" link instead, and the site chrome just eats
// space around an already-large tool.

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

const HIDE_CHROME_PREFIXES = ["/calculator", "/get-my-estimate"];

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const hideChrome = HIDE_CHROME_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  return (
    <>
      {!hideChrome && <Header />}
      {children}
      {!hideChrome && <Footer />}
    </>
  );
}
