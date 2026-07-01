import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-5 py-32 text-center">
      <h1 className="font-display text-5xl font-extrabold tracking-tight text-ink">404</h1>
      <p className="mt-4 font-body text-ink/70">
        We couldn&apos;t find that page. It may not be built yet.
      </p>
      <Link href="/" className="mt-8 inline-block rounded-lg bg-clay px-6 py-3 font-display font-semibold text-paper">
        Back to home
      </Link>
    </main>
  );
}