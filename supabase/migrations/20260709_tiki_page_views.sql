-- First-party page-view + CTA-click tracking for tikitacocruises.com.
-- Run in the Supabase SQL editor (or via supabase db push).

create table if not exists public.tiki_page_views (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  event text not null default 'pageview', -- pageview | call_click | book_click
  path text not null,
  referrer text,
  source text,
  device text,
  session_id text
);

create index if not exists tiki_page_views_created_at_idx
  on public.tiki_page_views (created_at);

alter table public.tiki_page_views enable row level security;

-- Site visitors (anon key) may log events; nobody may update/delete via API.
drop policy if exists "tiki_page_views_insert" on public.tiki_page_views;
create policy "tiki_page_views_insert"
  on public.tiki_page_views for insert
  to anon, authenticated
  with check (event in ('pageview', 'call_click', 'book_click'));

-- Only Tiki admins may read (keep emails in sync with src/lib/adminAllowlist.ts).
drop policy if exists "tiki_page_views_admin_select" on public.tiki_page_views;
create policy "tiki_page_views_admin_select"
  on public.tiki_page_views for select
  to authenticated
  using ((auth.jwt() ->> 'email') in ('tikitacocruises@gmail.com', 'contact.aigenda@gmail.com'));

-- Aggregated stats for the admin Analytics page. SECURITY INVOKER: the
-- select inside respects the RLS policy above, so non-admins get zeros.
create or replace function public.tiki_analytics_summary(days int)
returns json
language sql
stable
as $$
  with range_events as (
    select *
    from public.tiki_page_views
    where created_at >= now() - make_interval(days => days)
  )
  select json_build_object(
    'totals', (
      select json_build_object(
        'pageViews',  count(*) filter (where event = 'pageview'),
        'visitors',   count(distinct session_id) filter (where event = 'pageview'),
        'callClicks', count(*) filter (where event = 'call_click'),
        'bookClicks', count(*) filter (where event = 'book_click')
      ) from range_events
    ),
    'trend', (
      select coalesce(json_agg(t order by t.date), '[]'::json)
      from (
        select to_char(created_at at time zone 'America/New_York', 'YYYYMMDD') as date,
               count(*) filter (where event = 'pageview') as views,
               count(distinct session_id) filter (where event = 'pageview') as visitors
        from range_events
        group by 1
      ) t
    ),
    'pages', (
      select coalesce(json_agg(p), '[]'::json)
      from (
        select path,
               count(*) filter (where event = 'pageview') as views,
               count(distinct session_id) filter (where event = 'pageview') as visitors,
               count(*) filter (where event = 'call_click') as calls
        from range_events
        group by 1
        order by count(*) filter (where event = 'pageview') desc
        limit 10
      ) p
    ),
    'sources', (
      select coalesce(json_agg(s), '[]'::json)
      from (
        select coalesce(source, 'direct') as source,
               count(*) filter (where event = 'pageview') as views,
               count(distinct session_id) filter (where event = 'pageview') as visitors,
               count(*) filter (where event = 'call_click') as calls
        from range_events
        group by 1
        order by count(*) filter (where event = 'pageview') desc
        limit 10
      ) s
    ),
    'devices', (
      select coalesce(json_agg(d), '[]'::json)
      from (
        select coalesce(device, 'unknown') as device,
               count(distinct session_id) filter (where event = 'pageview') as visitors
        from range_events
        where event = 'pageview'
        group by 1
        order by count(distinct session_id) desc
      ) d
    )
  )
$$;
