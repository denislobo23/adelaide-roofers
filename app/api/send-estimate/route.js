// app/api/send-estimate/route.js
//
// POST { customer: { name, mobile }, answers: {...}, estimate: { low, high }, timeframe }
//
// Pipeline: generate PDF → upload to Supabase Storage → send SMS with the
// link → save the lead. Returns { success: true, refNumber } or an honest
// failure reason — it does NOT return the estimate figures. The on-screen
// page never reveals numbers; the SMS'd PDF is the only place they appear.
//
// ⚠️ REQUIRES a new column on the Supabase `leads` table: ref_number
// (text, nullable). Without it, the optional "email me a copy" capture on
// the success screen has no way to find this row again to attach the
// email to. Add it in the Supabase table editor before deploying this.
//
// SETUP REQUIRED (see lib/supabaseAdmin.js and lib/sendSms.js for details):
// - SUPABASE_SERVICE_ROLE_KEY
// - CLICKSEND_USERNAME, CLICKSEND_API_KEY
// - A Supabase Storage bucket named "estimates", set to public read access

import { renderToBuffer } from "@react-pdf/renderer";
import EstimatePDF from "@/components/pdf/EstimatePDF";
import { buildEstimateBreakdown } from "@/lib/estimateBreakdown";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendSms } from "@/lib/sendSms";
import { site } from "@/data/config";

function generateRefNumber() {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `AR-${y}${m}${d}-${rand}`;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { customer, answers, estimate, timeframe } = body;

    if (!customer?.name || !customer?.mobile || !answers || !estimate || !timeframe) {
      return Response.json({ success: false, reason: "missing_fields" }, { status: 400 });
    }

    const refNumber = generateRefNumber();
    const breakdown = buildEstimateBreakdown({ answers, estimate });

    // 1. Generate the PDF
    const pdfBuffer = await renderToBuffer(
      <EstimatePDF
        customer={customer}
        answers={answers}
        estimate={estimate}
        breakdown={breakdown}
        refNumber={refNumber}
        site={site}
      />
    );

    // 2. Upload to Supabase Storage
    let publicUrl = null;
    if (supabaseAdmin) {
      const filePath = `${refNumber}.pdf`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from("estimates")
        .upload(filePath, pdfBuffer, {
          contentType: "application/pdf",
          upsert: false,
        });

      if (uploadError) {
        console.error("Storage upload failed:", uploadError);
        return Response.json({ success: false, reason: "storage_error" }, { status: 500 });
      }

      const { data: urlData } = supabaseAdmin.storage.from("estimates").getPublicUrl(filePath);
      publicUrl = urlData?.publicUrl || null;
    } else {
      console.warn("Supabase admin client not configured — skipping storage upload.");
    }

    // 3. Send the SMS with the link (only if we actually have a URL)
    let smsResult = { success: false, reason: "no_url" };
    if (publicUrl) {
      const firstName = customer.name.split(" ")[0];
      smsResult = await sendSms({
        to: customer.mobile,
        message: `Hi ${firstName}, here's your Adelaide Roofers estimate for ${answers.address}: ${publicUrl}`,
      });
    }

    // 4. Save the lead regardless of SMS outcome — a failed text shouldn't
    // mean the lead is lost, just that follow-up may need to be manual.
    // ref_number is stored so the optional post-submit "email me a copy"
    // capture (see /api/save-email) can find this exact row again.
    if (supabaseAdmin) {
      await supabaseAdmin.from("leads").insert([
        {
          name: customer.name,
          phone: customer.mobile,
          address: answers.address,
          suburb: answers.suburb || "",
          timeframe,
          job_type: breakdown.jobTypeLabel,
          lead_source: "roof_calculator",
          pdf_url: publicUrl,
          message: `${JSON.stringify(answers)}. Estimate: $${estimate.low}-$${estimate.high}.`,
          source_page: "get-my-estimate",
          ref_number: refNumber,
          created_at: new Date().toISOString(),
        },
      ]);
    }

    if (!smsResult.success) {
      // Lead is saved, but the customer didn't get their text — be honest
      // about it rather than pretending it worked.
      return Response.json(
        { success: false, reason: "sms_failed", leadSaved: true },
        { status: 200 }
      );
    }

    return Response.json({ success: true, refNumber });
  } catch (err) {
    console.error("send-estimate pipeline failed:", err);
    return Response.json({ success: false, reason: "server_error" }, { status: 500 });
  }
}
