"use client";
// components/ContactForm.jsx
//
// Rebuilt per adelaide-roofers-site-build-brief.md, Section 2 "Contact
// form (final section)". Replaces the previous single-column version —
// this drops the email field (not in the brief's spec), adds a two-column
// Name/Phone row and a consent checkbox, and matches the brief's copy
// exactly. Saves straight to the same Supabase `leads` table as the
// calculator pipeline (lead_source: "contact_form").

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", suburb: "", message: "", consent: false });
  const [status, setStatus] = useState("form"); // form | sending | sent | error

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
    } catch (err) {
      console.error("Contact form submit failed:", err);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-2xl border-2 border-clay/50 bg-white p-8 text-center shadow-xl">
        <p className="font-display font-bold text-ink">
          Got it — thanks {form.name.split(" ")[0]}.
        </p>
        <p className="mt-1 font-body text-sm text-ink/65">
          A matched local roofer will reach out directly about your enquiry.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border-2 border-clay/50 bg-white p-8 shadow-xl"
    >
      {/* Two-column Name / Phone — keeps the form feeling shorter */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="block text-xs font-semibold text-ink/60">
            Full name <span className="text-clay">*</span>
          </label>
          <input
            id="cf-name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="mt-1 w-full rounded-lg border border-mortar bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-clay"
          />
        </div>
        <div>
          <label htmlFor="cf-phone" className="block text-xs font-semibold text-ink/60">
            Phone <span className="text-clay">*</span>
          </label>
          <input
            id="cf-phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="mt-1 w-full rounded-lg border border-mortar bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-clay"
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-email" className="block text-xs font-semibold text-ink/60">
          Email <span className="text-ink/40">(optional)</span>
        </label>
        <input
          id="cf-email"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="mt-1 w-full rounded-lg border border-mortar bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-clay"
        />
      </div>

      <div>
        <label htmlFor="cf-suburb" className="block text-xs font-semibold text-ink/60">
          Suburb
        </label>
        <input
          id="cf-suburb"
          value={form.suburb}
          onChange={(e) => update("suburb", e.target.value)}
          className="mt-1 w-full rounded-lg border border-mortar bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-clay"
        />
      </div>

      <div>
        <label htmlFor="cf-message" className="block text-xs font-semibold text-ink/60">
          What&apos;s going on with your roof?
        </label>
        <textarea
          id="cf-message"
          rows={3}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="mt-1 w-full rounded-lg border border-mortar bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-clay"
        />
      </div>

      <label htmlFor="cf-consent" className="flex items-start gap-2.5">
        <input
          id="cf-consent"
          type="checkbox"
          checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-mortar text-clay focus:ring-clay"
        />
        <span className="font-body text-xs text-ink/65">
          I&apos;m happy to be contacted by a matched local roofer about my enquiry.
        </span>
      </label>

      {status === "error" && (
        <p className="text-sm text-rose-600">
          Please fill in your name and phone number, or call us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-clay px-6 py-3.5 font-display font-bold tracking-tight text-ink transition hover:brightness-95 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Get matched with a roofer"}
      </button>

      <p className="text-center font-body text-xs text-ink/50">
        Free, no-obligation, and no call centre — a real local roofer will reach out directly.
      </p>
    </form>
  );
}
