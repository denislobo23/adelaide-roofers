// app/e/[ref]/route.js
//
// Short, branded link for the estimate PDF that's texted to customers:
//   adelaideroofers.com.au/e/AR-20261125-5389
// redirects to the PDF in Supabase Storage (bucket "estimates").
// Only well-formed reference numbers are accepted; anything else 404s.

import { supabaseAdmin } from "@/lib/supabaseAdmin";

const REF_PATTERN = /^AR-\d{8}-\d{4}$/;

export async function GET(_request, { params }) {
  const { ref } = await params;
  const refNumber = String(ref || "").toUpperCase();

  if (!REF_PATTERN.test(refNumber) || !supabaseAdmin) {
    return new Response("Estimate not found", {
      status: 404,
      headers: { "X-Robots-Tag": "noindex" },
    });
  }

  const { data } = supabaseAdmin.storage.from("estimates").getPublicUrl(`${refNumber}.pdf`);
  return new Response(null, {
    status: 302,
    headers: {
      Location: data.publicUrl,
      "X-Robots-Tag": "noindex",
      "Cache-Control": "no-store",
    },
  });
}
