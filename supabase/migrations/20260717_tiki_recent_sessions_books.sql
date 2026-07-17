-- Add booking-calendar opens (book_click) to the per-session visitor log so
-- the admin Analytics page can show which visits called AND which opened the
-- booking calendar. Replaces the function from 20260713_tiki_recent_sessions.sql.

create or replace function public.tiki_recent_sessions(day_offset int default 0)
returns json
language sql
stable
as $$
  select coalesce(json_agg(s order by s.started_at desc), '[]'::json)
  from (
    select
      session_id,
      min(created_at) as started_at,
      (array_agg(path order by created_at) filter (where event = 'pageview'))[1] as entry_path,
      (array_agg(coalesce(source, 'direct') order by created_at))[1] as source,
      (array_agg(coalesce(device, 'unknown') order by created_at))[1] as device,
      count(*) filter (where event = 'pageview') as views,
      count(*) filter (where event = 'call_click') as calls,
      count(*) filter (where event = 'book_click') as books
    from public.tiki_page_views
    where (created_at at time zone 'America/New_York')::date
          = (now() at time zone 'America/New_York')::date - day_offset
    group by session_id
    limit 100
  ) s
$$;
