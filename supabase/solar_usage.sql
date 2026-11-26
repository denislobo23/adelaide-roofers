-- supabase/solar_usage.sql
--
-- Run once in Supabase → SQL Editor. Safe to run again.
--
-- 1. solar_usage: one row per day (Adelaide time) counting Google Solar API
--    calls, so the daily cap (SOLAR_DAILY_LIMIT, default 50) holds across all
--    of Vercel's server copies. Keeps 90 days.
-- 2. take_solar_call(limit): atomically adds one to today's count if it is
--    still under the limit. Returns true if the call may go ahead.
-- 3. leads.roof_size_from_satellite: true when the customer tapped
--    "Use … m²" on the satellite suggestion and kept that size.
--
-- Only the server (service role) can use any of this.

create table if not exists public.solar_usage (
  day date primary key,
  calls integer not null default 0 check (calls >= 0),
  updated_at timestamptz not null default now()
);

-- No policies: the anon and authenticated roles can't read or write it.
alter table public.solar_usage enable row level security;

create or replace function public.take_solar_call(p_limit integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  today date := (now() at time zone 'Australia/Adelaide')::date;
  new_count integer;
begin
  if p_limit is null or p_limit < 1 then
    return false;
  end if;

  insert into public.solar_usage as u (day, calls)
  values (today, 1)
  on conflict (day) do update
    set calls = u.calls + 1, updated_at = now()
    where u.calls < p_limit
  returning u.calls into new_count;

  delete from public.solar_usage where day < today - 90;

  return new_count is not null;
end;
$$;

revoke all on function public.take_solar_call(integer) from public, anon, authenticated;
grant execute on function public.take_solar_call(integer) to service_role;

alter table public.leads
  add column if not exists roof_size_from_satellite boolean;

-- Check it worked (should return true, then show today's count of 1):
--   select public.take_solar_call(50);
--   select * from public.solar_usage;
-- Then reset today's test count:
--   delete from public.solar_usage where day = (now() at time zone 'Australia/Adelaide')::date;
