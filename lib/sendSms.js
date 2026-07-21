// lib/sendSms.js
//
// SERVER-SIDE ONLY. Sends an SMS via ClickSend's REST API.
//
// SETUP REQUIRED:
// 1. Sign up at clicksend.com, get your Username + API Key from
//    Dashboard → API Credentials
// 2. Add to .env.local + Vercel (no NEXT_PUBLIC_ prefix — server-only):
//    CLICKSEND_USERNAME=your_username
//    CLICKSEND_API_KEY=your_api_key

export async function sendSms({ to, message }) {
  const username = process.env.CLICKSEND_USERNAME;
  const apiKey = process.env.CLICKSEND_API_KEY;

  if (!username || !apiKey) {
    console.warn("ClickSend credentials not set — SMS not sent.");
    return { success: false, reason: "not_configured" };
  }

  // Normalise AU numbers to E.164 format (+61...) which ClickSend expects.
  const normalisedTo = to.trim().startsWith("+")
    ? to.trim()
    : to.trim().replace(/^0/, "+61");

  const auth = Buffer.from(`${username}:${apiKey}`).toString("base64");

  try {
    const res = await fetch("https://rest.clicksend.com/v3/sms/send", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            // No custom "source" — using a random ClickSend-assigned number,
            // which sends immediately without needing sender ID approval.
            // Once "AdelaideRoofers" is approved as an alphanumeric sender ID,
            // add back: source: "AdelaideRoofers",
            to: normalisedTo,
            body: message,
          },
        ],
      }),
    });

    const data = await res.json();

    if (!res.ok || data?.response_code !== "SUCCESS") {
      console.error("ClickSend send failed:", data);
      return { success: false, reason: "provider_error", data };
    }

    return { success: true, data };
  } catch (err) {
    console.error("SMS send error:", err);
    return { success: false, reason: "network_error" };
  }
}
