-- Add slug + published columns to tiki_blog_posts.
-- Slug powers /blog/:slug URLs. Published gates public visibility.

alter table public.tiki_blog_posts
  add column if not exists slug text,
  add column if not exists published boolean not null default true;

-- Backfill slugs from titles for any existing rows.
-- Lowercase, replace non-alphanumerics with hyphens, collapse repeats, trim.
update public.tiki_blog_posts
set slug = trim(both '-' from regexp_replace(lower(title), '[^a-z0-9]+', '-', 'g'))
where slug is null;

-- For any colliding backfilled slugs, suffix with short id chunk.
update public.tiki_blog_posts t
set slug = t.slug || '-' || substr(t.id::text, 1, 6)
from (
  select slug, count(*) c
  from public.tiki_blog_posts
  group by slug
  having count(*) > 1
) dups
where t.slug = dups.slug;

alter table public.tiki_blog_posts
  alter column slug set not null;

create unique index if not exists tiki_blog_posts_slug_idx
  on public.tiki_blog_posts (slug);

create index if not exists tiki_blog_posts_published_created_idx
  on public.tiki_blog_posts (published, created_at desc);
