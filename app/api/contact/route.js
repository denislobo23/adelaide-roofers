// app/api/contact/route.js
//
// POST { name, phone, email, suburb, message, consent }
//
// Fallback for the homepage contact form — saves straight to the same
// Supabase `leads` table the calculator pipeline uses, tagged with
// lead_source: "contact_form" so you can tell the two apart in Supabase.
// No PDF, no SMS — just a lead you follow up manually. Email is optional
// — phone stays the one required contact field, since fulfillment here is
// a phone call, not an email delivery — but capturing it when given
// widens who lands in the future nurture list.

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, suburb, message, consent } = body;

    if (!name?.trim() || !phone?.trim()) {
      return Response.json({ success: false, reason: "missing_fields" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      console.warn("Supabase admin client not configured — contact form lead not saved.");
      return Response.json({ success: false, reason: "storage_unavailable" }, { status: 500 });
    }

    const { error } = await supabaseAdmin.from("leads").insert([
      {
        name,
        phone,
        email: email || "",
        suburb: suburb || "",
        timeframe: "",
        job_type: "General enquiry",
        lead_source: "contact_form",
        message: consent
          ? `${message || ""} [Consent given to be contacted by matched roofer]`
          : message || "",
        source_page: "homepage",
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Contact form insert failed:", error);
      return Response.json({ success: false, reason: "db_error" }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Contact form pipeline failed:", err);
    return Response.json({ success: false, reason: "server_error" }, { status: 500 });
  }
}
