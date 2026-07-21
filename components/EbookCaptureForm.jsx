"use client";
// components/EbookCaptureForm.jsx
//
// Handles the ebook email capture on both the homepage's Ebook section
// and /free-guide — extracted into its own client component because the
// pages that use it are server components and can't hold form state or
// call fetch() directly. Submits to /api/subscribe (Kit), then reveals
// an instant download link/button on success rather than only relying
// on Kit's welcome email to deliver the PDF.

import { useState } from "react";

export default function EbookCaptureForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setDownloadUrl(data.downloadUrl);
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Ebook subscribe failed:", err);
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="text-center">
        <p className="font-display font-bold text-ink">You&apos;re in — here&apos;s your copy.</p>
        <a
          href={downloadUrl}
          download
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-clay px-6 py-3.5 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
        >
          Download the guide →
        </a>
        <p className="mt-3 font-body text-xs text-ink/45">
          We&apos;ve also sent a copy to {email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-2.5 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Email address"
        className="min-w-0 flex-1 rounded-lg border border-mortar bg-white px-3.5 py-3 text-sm text-ink outline-none focus:border-clay"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="shrink-0 rounded-lg bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send me the guide →"}
      </button>
      {status === "error" && (
        <p className="w-full font-body text-sm text-rose-600">
          Something went wrong — please try again in a moment.
        </p>
      )}
    </form>
  );
}
