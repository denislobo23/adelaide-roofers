# Adelaide Roofers

A lead-generation site that connects Adelaide homeowners with local roofing
contractors. Built with Next.js (App Router) + Tailwind + Supabase.

This is a **referral service** — the site is written throughout to reflect
that honestly. It does not present as a roofing company. Keep it that way.

---

## Run it locally

You need Node.js 18.18+ installed.

```bash
npm install
cp .env.local.example .env.local   # then paste your Supabase keys in
npm run dev
```

Open http://localhost:3000

> The site will run **without** Supabase keys — the lead form just won't save,
> and tells people to call instead. Add the keys when you're ready.

---

## Add your images

Drop all your `.webp` images into `public/images/` using the exact filenames
they already have (`hero-salisbury.webp`, `problem-salisbury.webp`, etc.).

Two heroes are currently missing and need generating:
`hero-semaphore.webp` and `hero-norwood.webp`.

You'll also want a `hero-home.webp` for the homepage hero.

---

## Supabase: the `leads` table

In your Supabase project → SQL Editor, run:

```sql
create table public.leads (
  id          bigint generated always as identity primary key,
  created_at  timestamptz default now(),
  name        text not null,
  phone       text not null,
  suburb      text,
  message     text,
  source_page text
);

-- Allow the public site to INSERT leads, but not read them.
alter table public.leads enable row level security;

create policy "anyone can submit a lead"
  on public.leads for insert
  to anon
  with check (true);
```

You read leads from the Supabase dashboard (or wire up email alerts later).

---

## Where things live

- `data/config.js` — **brand name + phone number live here only.** Change once.
- `data/locations.js` — all 4 regions and 32 suburbs. `salisbury` is fully
  written as the gold-standard example. Others have `ready: false` and won't
  build until you write their content in the same shape.
- `app/[region]/[suburb]/page.js` — the locked suburb template.
- `components/` — header, footer, lead form, call button, schema, ridge divider.

---

## Rolling out the other 31 suburbs

For each suburb, fill in the same fields Salisbury has and flip `ready: true`.
Keep the voice honest (we connect / roofers here typically handle — never
"we restored"). Each page needs genuinely local detail (real roof stock, real
soil/council/coastal context) — not the same paragraph reworded, or Google
treats the set as templated spam.

---

## Before you go live

- Switch the phone to a call-tracking number once you sign a roofer.
- Fill the credibility fields in `config.js` (`partner`, `reviews`) only with
  REAL data from your signed partner. Nothing false ships by default.
- Get an accountant/lawyer to sanity-check the business structure and the
  Australian Consumer Law wording. This README is not legal advice.
