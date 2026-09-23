-- StaticVolume Phase 3: persist taste / community actions
-- Logs, ratings, reviews, lists, follows, downloads, reposts.
-- track_id / artist_id are text so demo catalog ids and DB uuids both work.

-- ---------------------------------------------------------------------------
-- Diary logs (one active log per user+track; rating optional on the log)
-- ---------------------------------------------------------------------------
create table if not exists public.taste_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  track_id text not null,
  logged_on date not null default (timezone('utc', now()))::date,
  rating numeric(2,1)
    check (rating is null or (rating >= 0.5 and rating <= 5 and (rating * 2) = floor(rating * 2))),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, track_id)
);

create index if not exists taste_logs_user_id_idx on public.taste_logs (user_id);
create index if not exists taste_logs_track_id_idx on public.taste_logs (track_id);
create index if not exists taste_logs_created_at_idx on public.taste_logs (created_at desc);

-- ---------------------------------------------------------------------------
-- Reviews
-- ---------------------------------------------------------------------------
create table if not exists public.taste_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  track_id text not null,
  rating numeric(2,1) not null
    check (rating >= 0.5 and rating <= 5 and (rating * 2) = floor(rating * 2)),
  body text not null check (char_length(trim(body)) >= 1),
  like_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, track_id)
);

create index if not exists taste_reviews_track_id_idx on public.taste_reviews (track_id);
create index if not exists taste_reviews_created_at_idx on public.taste_reviews (created_at desc);

-- ---------------------------------------------------------------------------
-- Lists
-- ---------------------------------------------------------------------------
create table if not exists public.taste_lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null check (char_length(trim(title)) >= 1),
  description text not null default '',
  ranked boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.taste_list_items (
  list_id uuid not null references public.taste_lists (id) on delete cascade,
  track_id text not null,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  primary key (list_id, track_id)
);

create index if not exists taste_lists_user_id_idx on public.taste_lists (user_id);

-- ---------------------------------------------------------------------------
-- Follows (people + artists). target_id is profile uuid or seed artist id.
-- ---------------------------------------------------------------------------
create table if not exists public.follows (
  follower_id uuid not null references public.profiles (id) on delete cascade,
  target_id text not null,
  target_kind text not null check (target_kind in ('artist', 'listener')),
  created_at timestamptz not null default now(),
  primary key (follower_id, target_id),
  check (follower_id::text <> target_id)
);

create index if not exists follows_target_id_idx on public.follows (target_id);

-- ---------------------------------------------------------------------------
-- Downloads + reposts (public artist-support signals; no track likes)
-- ---------------------------------------------------------------------------
create table if not exists public.track_downloads (
  user_id uuid not null references public.profiles (id) on delete cascade,
  track_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, track_id)
);

create table if not exists public.track_reposts (
  user_id uuid not null references public.profiles (id) on delete cascade,
  track_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, track_id)
);

create index if not exists track_downloads_track_id_idx on public.track_downloads (track_id);
create index if not exists track_reposts_track_id_idx on public.track_reposts (track_id);

-- ---------------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------------
drop trigger if exists taste_logs_set_updated_at on public.taste_logs;
create trigger taste_logs_set_updated_at
  before update on public.taste_logs
  for each row execute function public.set_updated_at();

drop trigger if exists taste_reviews_set_updated_at on public.taste_reviews;
create trigger taste_reviews_set_updated_at
  before update on public.taste_reviews
  for each row execute function public.set_updated_at();

drop trigger if exists taste_lists_set_updated_at on public.taste_lists;
create trigger taste_lists_set_updated_at
  before update on public.taste_lists
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Counter bumps when the target row exists in Phase 2 tables
-- ---------------------------------------------------------------------------
create or replace function public.bump_download_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.tracks
  set download_count = download_count + 1
  where id::text = new.track_id;
  return new;
end;
$$;

create or replace function public.unbump_download_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.tracks
  set download_count = greatest(download_count - 1, 0)
  where id::text = old.track_id;
  return old;
end;
$$;

drop trigger if exists track_downloads_bump on public.track_downloads;
create trigger track_downloads_bump
  after insert on public.track_downloads
  for each row execute function public.bump_download_count();

drop trigger if exists track_downloads_unbump on public.track_downloads;
create trigger track_downloads_unbump
  after delete on public.track_downloads
  for each row execute function public.unbump_download_count();

create or replace function public.bump_repost_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.tracks
  set repost_count = repost_count + 1
  where id::text = new.track_id;
  return new;
end;
$$;

create or replace function public.unbump_repost_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.tracks
  set repost_count = greatest(repost_count - 1, 0)
  where id::text = old.track_id;
  return old;
end;
$$;

drop trigger if exists track_reposts_bump on public.track_reposts;
create trigger track_reposts_bump
  after insert on public.track_reposts
  for each row execute function public.bump_repost_count();

drop trigger if exists track_reposts_unbump on public.track_reposts;
create trigger track_reposts_unbump
  after delete on public.track_reposts
  for each row execute function public.unbump_repost_count();

create or replace function public.bump_follower_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.target_kind = 'artist' then
    update public.profiles
    set follower_count = follower_count + 1
    where id::text = new.target_id;
  end if;
  return new;
end;
$$;

create or replace function public.unbump_follower_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.target_kind = 'artist' then
    update public.profiles
    set follower_count = greatest(follower_count - 1, 0)
    where id::text = old.target_id;
  end if;
  return old;
end;
$$;

drop trigger if exists follows_bump on public.follows;
create trigger follows_bump
  after insert on public.follows
  for each row execute function public.bump_follower_count();

drop trigger if exists follows_unbump on public.follows;
create trigger follows_unbump
  after delete on public.follows
  for each row execute function public.unbump_follower_count();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.taste_logs enable row level security;
alter table public.taste_reviews enable row level security;
alter table public.taste_lists enable row level security;
alter table public.taste_list_items enable row level security;
alter table public.follows enable row level security;
alter table public.track_downloads enable row level security;
alter table public.track_reposts enable row level security;

-- Logs: public read, owner write
drop policy if exists "taste_logs_public_read" on public.taste_logs;
create policy "taste_logs_public_read"
  on public.taste_logs for select using (true);

drop policy if exists "taste_logs_owner_insert" on public.taste_logs;
create policy "taste_logs_owner_insert"
  on public.taste_logs for insert with check (auth.uid() = user_id);

drop policy if exists "taste_logs_owner_update" on public.taste_logs;
create policy "taste_logs_owner_update"
  on public.taste_logs for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "taste_logs_owner_delete" on public.taste_logs;
create policy "taste_logs_owner_delete"
  on public.taste_logs for delete using (auth.uid() = user_id);

-- Reviews
drop policy if exists "taste_reviews_public_read" on public.taste_reviews;
create policy "taste_reviews_public_read"
  on public.taste_reviews for select using (true);

drop policy if exists "taste_reviews_owner_insert" on public.taste_reviews;
create policy "taste_reviews_owner_insert"
  on public.taste_reviews for insert with check (auth.uid() = user_id);

drop policy if exists "taste_reviews_owner_update" on public.taste_reviews;
create policy "taste_reviews_owner_update"
  on public.taste_reviews for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "taste_reviews_owner_delete" on public.taste_reviews;
create policy "taste_reviews_owner_delete"
  on public.taste_reviews for delete using (auth.uid() = user_id);

-- Lists
drop policy if exists "taste_lists_public_read" on public.taste_lists;
create policy "taste_lists_public_read"
  on public.taste_lists for select using (true);

drop policy if exists "taste_lists_owner_insert" on public.taste_lists;
create policy "taste_lists_owner_insert"
  on public.taste_lists for insert with check (auth.uid() = user_id);

drop policy if exists "taste_lists_owner_update" on public.taste_lists;
create policy "taste_lists_owner_update"
  on public.taste_lists for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "taste_lists_owner_delete" on public.taste_lists;
create policy "taste_lists_owner_delete"
  on public.taste_lists for delete using (auth.uid() = user_id);

drop policy if exists "taste_list_items_public_read" on public.taste_list_items;
create policy "taste_list_items_public_read"
  on public.taste_list_items for select using (true);

drop policy if exists "taste_list_items_owner_write" on public.taste_list_items;
create policy "taste_list_items_owner_write"
  on public.taste_list_items for insert
  with check (
    exists (
      select 1 from public.taste_lists l
      where l.id = list_id and l.user_id = auth.uid()
    )
  );

drop policy if exists "taste_list_items_owner_update" on public.taste_list_items;
create policy "taste_list_items_owner_update"
  on public.taste_list_items for update
  using (
    exists (
      select 1 from public.taste_lists l
      where l.id = list_id and l.user_id = auth.uid()
    )
  );

drop policy if exists "taste_list_items_owner_delete" on public.taste_list_items;
create policy "taste_list_items_owner_delete"
  on public.taste_list_items for delete
  using (
    exists (
      select 1 from public.taste_lists l
      where l.id = list_id and l.user_id = auth.uid()
    )
  );

-- Follows: public read; owner manage own follows
drop policy if exists "follows_public_read" on public.follows;
create policy "follows_public_read"
  on public.follows for select using (true);

drop policy if exists "follows_owner_insert" on public.follows;
create policy "follows_owner_insert"
  on public.follows for insert with check (auth.uid() = follower_id);

drop policy if exists "follows_owner_delete" on public.follows;
create policy "follows_owner_delete"
  on public.follows for delete using (auth.uid() = follower_id);

-- Downloads / reposts: public read (counts); owner insert/delete own
drop policy if exists "track_downloads_public_read" on public.track_downloads;
create policy "track_downloads_public_read"
  on public.track_downloads for select using (true);

drop policy if exists "track_downloads_owner_insert" on public.track_downloads;
create policy "track_downloads_owner_insert"
  on public.track_downloads for insert with check (auth.uid() = user_id);

drop policy if exists "track_downloads_owner_delete" on public.track_downloads;
create policy "track_downloads_owner_delete"
  on public.track_downloads for delete using (auth.uid() = user_id);

drop policy if exists "track_reposts_public_read" on public.track_reposts;
create policy "track_reposts_public_read"
  on public.track_reposts for select using (true);

drop policy if exists "track_reposts_owner_insert" on public.track_reposts;
create policy "track_reposts_owner_insert"
  on public.track_reposts for insert with check (auth.uid() = user_id);

drop policy if exists "track_reposts_owner_delete" on public.track_reposts;
create policy "track_reposts_owner_delete"
  on public.track_reposts for delete using (auth.uid() = user_id);
