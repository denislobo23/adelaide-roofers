"use client";

import Link from "next/link";

export default function Error({ reset }) {
  return (
    <main className="mx-auto max-w-xl px-5 py-32 text-center">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink">
        Something went wrong
      </h1>
      <p className="mt-4 font-body text-ink/70">Please try again.</p>
      <div className="mt-8 flex justify-center gap-3">
        <button onClick={() => reset()} className="rounded-lg bg-clay px-6 py-3 font-display font-semibold text-paper">
          Try again
        </button>
        <Link href="/" className="rounded-lg border border-mortar px-6 py-3 font-display font-semibold text-ink">
          Home
        </Link>
      </div>
    </main>
  );
}