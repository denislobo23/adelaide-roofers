-- supabase/leads_lockdown.sql
--
-- Run once in Supabase → SQL Editor, AFTER the site update that sends the
-- region-page form through /api/contact is live. Safe to run again.
--
-- Stops anyone using the public (anon) key from adding, reading, changing
-- or deleting rows in `leads`. Every form now saves through our own API
-- routes with the service-role key, which isn't affected by any of this.

-- 1. See what's there now (optional; run on its own first if you like):
--   select policyname, cmd, roles from pg_policies
--   where schemaname = 'public' and tablename = 'leads';

-- 2. Make sure row-level security is on.
alter table public.leads enable row level security;

-- 3. Drop every policy on leads that lets the public or signed-in roles in.
do $$
declare p record;
begin
  for p in
    select policyname from pg_policies
    where schemaname = 'public' and tablename = 'leads'
      and (roles && array['public', 'anon', 'authenticated']::name[])
  loop
    execute format('drop policy %I on public.leads', p.policyname);
  end loop;
end $$;

-- 4. And remove the table permissions themselves.
revoke all on table public.leads from anon, authenticated;

-- 5. Check: this should now list no policies.
select policyname, cmd, roles from pg_policies
where schemaname = 'public' and tablename = 'leads';
