"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { site } from "@/data/config";

export default function LeadForm({ suburbName }) {
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [form, setForm] = useState({ name: "", phone: "", suburb: suburbName || "", message: "" });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setStatus("error");
      return;
    }
    setStatus("sending");

    try {
      if (!supabase) {
        // No keys yet — don't pretend it saved. Tell them to call.
        setStatus("error");
        return;
      }
      const { error } = await supabase.from("leads").insert([
        {
          name: form.name,
          phone: form.phone,
          suburb: form.suburb,
          message: form.message,
          source_page: suburbName || "general",
          created_at: new Date().toISOString(),
        },
      ]);
      if (error) throw error;
      setStatus("done");
      setForm({ name: "", phone: "", suburb: suburbName || "", message: "" });
    } catch (err) {
      console.error("Lead submission failed:", err);
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-xl bg-trust/10 p-6 text-center">
        <p className="font-display text-lg font-semibold text-trust">Got it — thanks.</p>
        <p className="mt-2 font-body text-sm text-ink/70">
          We&apos;ll pass your details to a roofer covering {form.suburb || "your area"} so they can
          get in touch. If it&apos;s urgent, call us on{" "}
          <a href={site.phoneHref} className="font-semibold text-clay">{site.phoneDisplay}</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <div>
        <label htmlFor="name" className="block font-body text-xs font-semibold text-ink/70">Your name</label>
        <input
          id="name" name="name" value={form.name} onChange={update} required
          className="mt-1 w-full rounded-lg border border-mortar bg-white px-3.5 py-2.5 font-body text-sm text-ink outline-none focus:border-clay"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block font-body text-xs font-semibold text-ink/70">Phone</label>
        <input
          id="phone" name="phone" type="tel" value={form.phone} onChange={update} required
          className="mt-1 w-full rounded-lg border border-mortar bg-white px-3.5 py-2.5 font-body text-sm text-ink outline-none focus:border-clay"
        />
      </div>
      <div>
        <label htmlFor="suburb" className="block font-body text-xs font-semibold text-ink/70">Suburb</label>
        <input
          id="suburb" name="suburb" value={form.suburb} onChange={update}
          className="mt-1 w-full rounded-lg border border-mortar bg-white px-3.5 py-2.5 font-body text-sm text-ink outline-none focus:border-clay"
        />
      </div>
      <div>
        <label htmlFor="message" className="block font-body text-xs font-semibold text-ink/70">What&apos;s going on with your roof? <span className="font-normal text-ink/40">(optional)</span></label>
        <textarea
          id="message" name="message" rows={3} value={form.message} onChange={update}
          className="mt-1 w-full rounded-lg border border-mortar bg-white px-3.5 py-2.5 font-body text-sm text-ink outline-none focus:border-clay"
        />
      </div>

      {status === "error" && (
        <p className="font-body text-sm text-clay-deep">
          Something didn&apos;t go through. Please call us on{" "}
          <a href={site.phoneHref} className="font-semibold underline">{site.phoneDisplay}</a> instead.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-ink px-6 py-3 font-display font-semibold tracking-tight text-paper transition hover:bg-steel disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Get connected with a roofer"}
      </button>
      <p className="text-center font-body text-xs text-ink/45">
        Free, no obligation. We&apos;ll only use your details to connect you with a local roofer.
      </p>
    </form>
  );
}
