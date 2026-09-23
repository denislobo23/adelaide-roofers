"use client";
// app/admin/add-lead/page.js
//
// Internal, unlisted tool: manually log a lead that came in by phone call
// rather than the contact form or calculator. Password-protected via
// ADMIN_SECRET (checked server-side in /api/admin-add-lead) rather than
// full user auth — deliberately simple, single-operator tool.
//
// Not linked from anywhere in the site nav — reach it by typing the URL
// directly: adelaideroofers.com.au/admin/add-lead

import { useState } from "react";

export default function AddLeadPage() {
  const [secret, setSecret] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", suburb: "", message: "" });
  const [status, setStatus] = useState("form"); // form | sending | sent | error | unauthorized

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !secret.trim()) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/admin-add-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, ...form }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", phone: "", suburb: "", message: "" });
      } else if (data.reason === "unauthorized") {
        setStatus("unauthorized");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Manual lead submit failed:", err);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-paper px-5 py-16">
      <div className="mx-auto max-w-md rounded-2xl border-2 border-clay/50 bg-white p-8 shadow-xl">
        <h1 className="text-xl font-bold tracking-tight text-ink">Log a phone lead</h1>
        <p className="mt-1 text-sm text-ink/60">
          For calls that came in directly, bypassing the form or calculator.
        </p>

        {status === "sent" ? (
          <div className="mt-6 rounded-lg bg-clay/10 p-4 text-center">
            <p className="font-semibold text-ink">Lead saved.</p>
            <button
              type="button"
              onClick={() => setStatus("form")}
              className="mt-3 text-sm font-semibold text-clay underline"
            >
              Log another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
            <div>
              <label htmlFor="secret" className="block text-xs font-semibold text-ink/70">
                Password <span className="text-clay">*</span>
              </label>
              <input
                id="secret"
                type="password"
                required
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="mt-1 w-full rounded-lg border-2 border-teal-100 bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-clay"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-ink/70">
                Caller name <span className="text-clay">*</span>
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="mt-1 w-full rounded-lg border-2 border-teal-100 bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-clay"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-ink/70">
                Phone <span className="text-clay">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="mt-1 w-full rounded-lg border-2 border-teal-100 bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-clay"
              />
            </div>

            <div>
              <label htmlFor="suburb" className="block text-xs font-semibold text-ink/70">
                Suburb
              </label>
              <input
                id="suburb"
                value={form.suburb}
                onChange={(e) => update("suburb", e.target.value)}
                className="mt-1 w-full rounded-lg border-2 border-teal-100 bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-clay"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold text-ink/70">
                Notes — what did they need?
              </label>
              <textarea
                id="message"
                rows={3}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className="mt-1 w-full rounded-lg border-2 border-teal-100 bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-clay"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-rose-600">Fill in password, name, and phone.</p>
            )}
            {status === "unauthorized" && (
              <p className="text-sm text-rose-600">Wrong password.</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-lg bg-clay px-6 py-3 font-bold tracking-tight text-ink transition hover:brightness-95 disabled:opacity-60"
            >
              {status === "sending" ? "Saving…" : "Save lead"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
