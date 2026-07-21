// lib/mailerlite.js
//
// Minimal MailerLite API client — just enough to subscribe someone and
// add them to a group, so a MailerLite Automation (built in the
// MailerLite dashboard, triggered by "subscriber joins a group") can run
// the actual nurture sequence. Mirrors the shape of the old lib/kit.js:
// this file only gets someone into the group, MailerLite does the rest.
//
// REQUIRED ENV VARS (see .env.local):
//   MAILERLITE_API_KEY          — Integrations → API → your generated token
//   MAILERLITE_EBOOK_GROUP_ID   — the numeric ID of the "ebook-guide" group
//                                  you created in MailerLite under
//                                  Subscribers → Groups. Find it by opening
//                                  the group and checking the URL
//                                  (mailerlite.com/subscribers/groups/<ID>),
//                                  or via GET /api/groups (see findGroupId
//                                  below, useful once, not needed at runtime).
//                                  Build an Automation in MailerLite
//                                  triggered by "Group: ebook-guide joined"
//                                  to run the actual welcome + nurture
//                                  emails — this file only adds someone to
//                                  the group.
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
// them from other groups they're already in).
async function upsertSubscriberToGroup({ email, firstName, groupId }) {
  const res = await fetch(`${MAILERLITE_BASE_URL}/subscribers`, {
    method: "POST",
    headers: mailerliteHeaders(),
    body: JSON.stringify({
      email,
      ...(firstName ? { fields: { name: firstName } } : {}),
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
    firstName,
    groupId: process.env.MAILERLITE_EBOOK_GROUP_ID,
  });
}
