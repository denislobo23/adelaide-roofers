// app/api/subscribe/route.js
//
// POST { email, firstName? }
//
// Subscribes the email to MailerLite (added to the "ebook-guide" group,
// triggering whatever Automation/nurture sequence is built in the
// MailerLite dashboard for that group), then returns the ebook's direct
// download URL. The download is revealed on-screen immediately rather
// than only relying on MailerLite's welcome email — see the earlier
// discussion: a fake email still gets nothing from MailerLite, but a real
// visitor shouldn't have to wait on email deliverability to get the thing
// they asked for right now.

import { subscribeToEbookList } from "@/lib/mailerlite";

const EBOOK_URL = "/before-you-call-a-roofer.pdf";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, firstName } = body;

    if (!email?.trim()) {
      return Response.json({ success: false, reason: "missing_email" }, { status: 400 });
    }

    await subscribeToEbookList({ email, firstName });

    return Response.json({ success: true, downloadUrl: EBOOK_URL });
  } catch (err) {
    console.error("MailerLite subscribe failed:", err);
    // Fail open on the download: MailerLite being down shouldn't mean a
    // genuine visitor can't get the guide they asked for. The subscribe
    // attempt is logged above for follow-up, but they still get the PDF.
    return Response.json({
      success: true,
      downloadUrl: EBOOK_URL,
      warning: "subscribe_failed",
    });
  }
}
