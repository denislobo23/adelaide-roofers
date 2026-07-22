// app/api/save-email/route.js
//
// POST { refNumber, email }
//
// Backs the optional "email me a copy too" capture on the get-my-estimate
// success screen (see app/get-my-estimate/page.js — handleEmailCapture).
// Finds the lead row already created by /api/send-estimate (matched by
// ref_number) and attaches the email to it. Deliberately does NOT create
// a new lead or re-send anything — the SMS from send-estimate already
// happened; this just records an email address against that same lead
// for follow-up / a manual copy later.
//
// ⚠️ REQUIRES an `email` column on the Supabase `leads` table (text,
// nullable) — same as the `ref_number` column send-estimate/route.js
// depends on. If this column doesn't exist yet, add it in the Supabase
// table editor before testing this route.
//
// SETUP REQUIRED (see lib/supabaseAdmin.js): SUPABASE_SERVICE_ROLE_KEY

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();
    const { refNumber, email } = body;

    if (!refNumber || !email?.trim()) {
      return Response.json({ success: false, reason: "missing_fields" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      console.warn("Supabase admin client not configured — cannot save email.");
      return Response.json({ success: false, reason: "not_configured" }, { status: 500 });
    }

    const { error, data } = await supabaseAdmin
      .from("leads")
      .update({ email: email.trim() })
      .eq("ref_number", refNumber)
      .select();

    if (error) {
      console.error("save-email update failed:", error);
      return Response.json({ success: false, reason: "db_error" }, { status: 500 });
    }

    // No matching row found for that ref_number — distinct from a DB
    // error, worth knowing about separately if it ever shows up in logs.
    if (!data || data.length === 0) {
      console.warn(`save-email: no lead found for ref_number ${refNumber}`);
      return Response.json({ success: false, reason: "lead_not_found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("save-email route failed:", err);
    return Response.json({ success: false, reason: "server_error" }, { status: 500 });
  }
}
