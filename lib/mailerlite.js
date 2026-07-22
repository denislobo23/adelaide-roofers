// lib/mailerlite.js
//
// Minimal MailerLite API client — just enough to subscribe someone and
// add them to a group, so a MailerLite Automation (built in the
// MailerLite dashboard, triggered by "subscriber joins a group") can run
// the actual nurture sequence. This file only gets someone into a group
// (optionally with custom field data attached), MailerLite does the rest.
//
// Two things currently use this:
//   1. subscribeToEbookList() — the /free-guide capture form
//   2. addSubscriberToGroup() — used directly by app/api/save-email/route.js
//      for the "email me a copy of my estimate" capture, which needs to
//      attach a per-subscriber pdf_url custom field so the MailerLite
//      Automation can merge-tag {$pdf_url} into a download button.
//
// REQUIRED ENV VARS (see .env.local):
//   MAILERLITE_API_KEY            — Integrations → API → your generated token
//   MAILERLITE_EBOOK_GROUP_ID     — numeric ID of the "ebook-guide" group
//   MAILERLITE_ESTIMATE_GROUP_ID  — numeric ID of the "estimate-lead" group
//                                    (Subscribers → Groups → open the group →
//                                    ID is in the URL, .../groups/<ID>)
//                                    Requires a "pdf_url" custom field
//                                    (Subscribers → Fields) before the
//                                    Automation can merge-tag it in.
//                                    Build an Automation in MailerLite
//                                    triggered by "Group: <name> joined" to
//                                    run the actual emails — this file only
//                                    adds someone to the group.
//
// API docs referenced: https://developers.mailerlite.com/docs/subscribers

const MAILERLITE_BASE_URL = "https://connect.mailerlite.com/api";

function mailerliteHeaders() {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
  };
}

// Creates the subscriber if they don't exist yet, or updates them and adds
// them to the group if they do (MailerLite's Create/Upsert subscriber
// endpoint upserts by email — this is non-destructive: it won't remove
// them from other groups they're already in). `fields` is any combination
// of MailerLite custom fields already created in the dashboard, e.g.
// { name: "Denis", pdf_url: "https://..." }.
async function upsertSubscriberToGroup({ email, groupId, fields }) {
  const res = await fetch(`${MAILERLITE_BASE_URL}/subscribers`, {
    method: "POST",
    headers: mailerliteHeaders(),
    body: JSON.stringify({
      email,
      ...(fields && Object.keys(fields).length ? { fields } : {}),
      groups: [groupId],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `MailerLite upsertSubscriberToGroup failed (${res.status}): ${body}`
    );
  }
  return res.json();
}

// Generic entry point for any group + optional custom fields — used by
// save-email/route.js. Throws on failure — the caller decides how to
// respond to the client.
export async function addSubscriberToGroup({ email, groupId, fields }) {
  if (!process.env.MAILERLITE_API_KEY) {
    throw new Error(
      "MailerLite not configured — set MAILERLITE_API_KEY in your environment."
    );
  }
  if (!groupId) {
    throw new Error("addSubscriberToGroup called without a groupId.");
  }

  return upsertSubscriberToGroup({ email, groupId, fields });
}

// One-off helper — not called at runtime. Useful if you ever need to look
// up a group's numeric ID by name instead of hardcoding it via env var,
// e.g. run this once from a scratch script:
//   node -e "require('./lib/mailerlite').findGroupId('ebook-guide').then(console.log)"
export async function findGroupId(groupName) {
  const res = await fetch(
    `${MAILERLITE_BASE_URL}/groups?filter[name]=${encodeURIComponent(groupName)}`,
    { headers: mailerliteHeaders() }
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`MailerLite findGroupId failed (${res.status}): ${body}`);
  }
  const json = await res.json();
  return json.data?.[0]?.id ?? null;
}

// Main entry point: upsert the subscriber straight into the ebook-guide
// group. Throws on failure — the caller decides how to respond to the
// client (see app/api/subscribe/route.js, which fails open on the
// download either way).
export async function subscribeToEbookList({ email, firstName }) {
  if (!process.env.MAILERLITE_API_KEY || !process.env.MAILERLITE_EBOOK_GROUP_ID) {
    throw new Error(
      "MailerLite not configured — set MAILERLITE_API_KEY and MAILERLITE_EBOOK_GROUP_ID in your environment."
    );
  }

  await upsertSubscriberToGroup({
    email,
    groupId: process.env.MAILERLITE_EBOOK_GROUP_ID,
    fields: firstName ? { name: firstName } : undefined,
  });
}
