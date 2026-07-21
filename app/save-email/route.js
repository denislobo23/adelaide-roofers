// app/api/save-email/route.js
//
// POST { refNumber, email }
//
// Attaches an email address to an already-submitted lead — used by the
// optional "email me a copy too" field on the /get-my-estimate success
// screen. Deliberately separate from the main lead insert in
// /api/send-estimate: the estimate/SMS pipeline must never be blocked or
// slowed by this, since giving an email is optional and happens after
// the customer has already got what they came for.

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();
    const { refNumber, email } = body;

    if (!refNumber?.trim() || !email?.trim()) {
      return Response.json({ success: false, reason: "missing_fields" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      console.warn("Supabase admin client not configured — email not saved.");
      return Response.json({ success: false, reason: "storage_unavailable" }, { status: 500 });
    }

    const { error, data } = await supabaseAdmin
      .from("leads")
      .update({ email })
      .eq("ref_number", refNumber)
      .select();

    if (error) {
      console.error("Save email failed:", error);
      return Response.json({ success: false, reason: "db_error" }, { status: 500 });
    }

    if (!data || data.length === 0) {
      // ref_number didn't match any row — most likely the leads table is
      // missing the ref_number column (see the note in
      // /api/send-estimate/route.js), so there was never a value to
      // match against in the first place.
      return Response.json({ success: false, reason: "lead_not_found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("save-email pipeline failed:", err);
    return Response.json({ success: false, reason: "server_error" }, { status: 500 });
  }
}
