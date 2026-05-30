-- Tiki Taco blog posts (admin-managed content)
-- All Tiki Taco tables/buckets are prefixed `tiki_` / `tiki-` to keep them
-- isolated from other projects sharing this Supabase instance.

create table if not exists public.tiki_blog_posts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null,
  title text not null,
  excerpt text,
  content text not null default '',
  featured_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tiki_blog_posts_client_created_idx
  on public.tiki_blog_posts (client_id, created_at desc);

alter table public.tiki_blog_posts enable row level security;

-- Public can read posts (so a future /blog page works without auth)
create policy "tiki_blog_posts_select_public"
  on public.tiki_blog_posts
  for select
  using (true);

-- Authenticated users can write
create policy "tiki_blog_posts_insert_authenticated"
  on public.tiki_blog_posts
  for insert
  to authenticated
  with check (true);

create policy "tiki_blog_posts_update_authenticated"
  on public.tiki_blog_posts
  for update
  to authenticated
  using (true)
  with check (true);

create policy "tiki_blog_posts_delete_authenticated"
  on public.tiki_blog_posts
  for delete
  to authenticated
  using (true);

-- Auto-update updated_at on row change
create or replace function public.set_tiki_blog_posts_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists tiki_blog_posts_set_updated_at on public.tiki_blog_posts;
create trigger tiki_blog_posts_set_updated_at
  before update on public.tiki_blog_posts
  for each row
  execute function public.set_tiki_blog_posts_updated_at();

-- Storage bucket for featured images
insert into storage.buckets (id, name, public)
values ('tiki-blog-images', 'tiki-blog-images', true)
on conflict (id) do nothing;

create policy "tiki_blog_images_select_public"
  on storage.objects
  for select
  using (bucket_id = 'tiki-blog-images');

create policy "tiki_blog_images_insert_authenticated"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'tiki-blog-images');

create policy "tiki_blog_images_update_authenticated"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'tiki-blog-images')
  with check (bucket_id = 'tiki-blog-images');

create policy "tiki_blog_images_delete_authenticated"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'tiki-blog-images');
