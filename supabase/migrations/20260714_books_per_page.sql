-- Adds booking-calendar opens (book_click) per page and per source to the
-- analytics summary, alongside the existing call counts.

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
               count(*) filter (where event = 'call_click') as calls,
               count(*) filter (where event = 'book_click') as books
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
               count(*) filter (where event = 'call_click') as calls,
               count(*) filter (where event = 'book_click') as books
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
