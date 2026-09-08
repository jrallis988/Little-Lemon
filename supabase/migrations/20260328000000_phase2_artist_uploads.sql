-- StaticVolume Phase 2: artist profiles, releases, tracks, media + Storage RLS
-- Apply via Supabase SQL editor or `supabase db push`.
-- Artists own their rows; public can read non-disabled content.
-- Soft-disable via disabled_at preserves records for trust/takedown (Phase 7).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Profiles (listeners + artists; artists upload under this id)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text not null,
  role text not null check (role in ('listener', 'artist')),
  bio text,
  avatar_url text,
  header_url text,
  scene text,
  geography text,
  genre_tags text[] default '{}',
  lineup_note text,
  scene_description text,
  active_years text,
  status text check (status in ('INDEPENDENT', 'UNSIGNED', 'LABEL', 'INACTIVE')),
  catalog_kind text not null default 'emerging'
    check (catalog_kind in ('emerging', 'catalog')),
  spotify_artist_id text,
  musicbrainz_artist_id text,
  follower_count integer not null default 0,
  joined_at timestamptz not null default now(),
  disabled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles (role);
create index if not exists profiles_catalog_kind_idx on public.profiles (catalog_kind);
create index if not exists profiles_display_name_idx on public.profiles (lower(display_name));

-- ---------------------------------------------------------------------------
-- Releases (album / EP / single artwork + metadata)
-- ---------------------------------------------------------------------------
create table if not exists public.releases (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  release_type text not null default 'single'
    check (release_type in ('single', 'ep', 'album')),
  release_date date,
  artwork_url text,
  artwork_path text,
  notes text,
  disabled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists releases_artist_id_idx on public.releases (artist_id);

-- ---------------------------------------------------------------------------
-- Tracks (independent uploads OR catalog metadata rows later)
-- ---------------------------------------------------------------------------
create table if not exists public.tracks (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.profiles (id) on delete cascade,
  release_id uuid references public.releases (id) on delete set null,
  title text not null,
  audio_url text,
  audio_path text,
  artwork_url text,
  artwork_path text,
  duration_ms integer not null default 0,
  scene text,
  geography text,
  release_year integer,
  catalog_kind text not null default 'emerging'
    check (catalog_kind in ('emerging', 'catalog')),
  spotify_track_id text,
  download_count integer not null default 0,
  repost_count integer not null default 0,
  copyright_confirmed_at timestamptz,
  disabled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tracks_artist_id_idx on public.tracks (artist_id);
create index if not exists tracks_title_idx on public.tracks (lower(title));
create index if not exists tracks_catalog_kind_idx on public.tracks (catalog_kind);

-- ---------------------------------------------------------------------------
-- Media asset ledger (ownership + soft-disable without destroying files)
-- ---------------------------------------------------------------------------
create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null check (kind in (
    'avatar',
    'header',
    'track_audio',
    'track_artwork',
    'release_artwork'
  )),
  bucket text not null,
  storage_path text not null,
  mime_type text not null,
  byte_size bigint not null default 0,
  public_url text,
  track_id uuid references public.tracks (id) on delete set null,
  release_id uuid references public.releases (id) on delete set null,
  disabled_at timestamptz,
  created_at timestamptz not null default now(),
  unique (bucket, storage_path)
);

create index if not exists media_assets_owner_id_idx on public.media_assets (owner_id);

-- ---------------------------------------------------------------------------
-- updated_at helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists releases_set_updated_at on public.releases;
create trigger releases_set_updated_at
  before update on public.releases
  for each row execute function public.set_updated_at();

drop trigger if exists tracks_set_updated_at on public.tracks;
create trigger tracks_set_updated_at
  before update on public.tracks
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Auto-create profile from auth signup metadata
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  meta_role text := coalesce(new.raw_user_meta_data->>'role', 'listener');
  meta_name text := coalesce(
    new.raw_user_meta_data->>'display_name',
    split_part(new.email, '@', 1),
    'Member'
  );
begin
  if meta_role not in ('listener', 'artist') then
    meta_role := 'listener';
  end if;

  insert into public.profiles (id, email, display_name, role, status, catalog_kind)
  values (
    new.id,
    new.email,
    meta_name,
    meta_role,
    case when meta_role = 'artist' then 'UNSIGNED' else null end,
    'emerging'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.releases enable row level security;
alter table public.tracks enable row level security;
alter table public.media_assets enable row level security;

-- Profiles: public read active; owner update; insert via trigger / own row
drop policy if exists "profiles_public_read" on public.profiles;
create policy "profiles_public_read"
  on public.profiles for select
  using (disabled_at is null or auth.uid() = id);

drop policy if exists "profiles_owner_insert" on public.profiles;
create policy "profiles_owner_insert"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "profiles_owner_update" on public.profiles;
create policy "profiles_owner_update"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Releases
drop policy if exists "releases_public_read" on public.releases;
create policy "releases_public_read"
  on public.releases for select
  using (
    disabled_at is null
    or auth.uid() = artist_id
  );

drop policy if exists "releases_owner_write" on public.releases;
create policy "releases_owner_write"
  on public.releases for insert
  with check (
    auth.uid() = artist_id
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'artist'
    )
  );

drop policy if exists "releases_owner_update" on public.releases;
create policy "releases_owner_update"
  on public.releases for update
  using (auth.uid() = artist_id)
  with check (auth.uid() = artist_id);

drop policy if exists "releases_owner_delete" on public.releases;
create policy "releases_owner_delete"
  on public.releases for delete
  using (auth.uid() = artist_id);

-- Tracks
drop policy if exists "tracks_public_read" on public.tracks;
create policy "tracks_public_read"
  on public.tracks for select
  using (disabled_at is null or auth.uid() = artist_id);

drop policy if exists "tracks_owner_insert" on public.tracks;
create policy "tracks_owner_insert"
  on public.tracks for insert
  with check (
    auth.uid() = artist_id
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'artist'
    )
  );

drop policy if exists "tracks_owner_update" on public.tracks;
create policy "tracks_owner_update"
  on public.tracks for update
  using (auth.uid() = artist_id)
  with check (auth.uid() = artist_id);

drop policy if exists "tracks_owner_delete" on public.tracks;
create policy "tracks_owner_delete"
  on public.tracks for delete
  using (auth.uid() = artist_id);

-- Media assets
drop policy if exists "media_public_read" on public.media_assets;
create policy "media_public_read"
  on public.media_assets for select
  using (disabled_at is null or auth.uid() = owner_id);

drop policy if exists "media_owner_insert" on public.media_assets;
create policy "media_owner_insert"
  on public.media_assets for insert
  with check (auth.uid() = owner_id);

drop policy if exists "media_owner_update" on public.media_assets;
create policy "media_owner_update"
  on public.media_assets for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

drop policy if exists "media_owner_delete" on public.media_assets;
create policy "media_owner_delete"
  on public.media_assets for delete
  using (auth.uid() = owner_id);

-- ---------------------------------------------------------------------------
-- Storage buckets
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'artist-avatars',
    'artist-avatars',
    true,
    5242880,
    array['image/jpeg', 'image/png', 'image/webp']
  ),
  (
    'artist-headers',
    'artist-headers',
    true,
    8388608,
    array['image/jpeg', 'image/png', 'image/webp']
  ),
  (
    'track-artwork',
    'track-artwork',
    true,
    5242880,
    array['image/jpeg', 'image/png', 'image/webp']
  ),
  (
    'release-artwork',
    'release-artwork',
    true,
    5242880,
    array['image/jpeg', 'image/png', 'image/webp']
  ),
  (
    'track-audio',
    'track-audio',
    true,
    52428800,
    array['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav', 'audio/flac', 'audio/mp4', 'audio/m4a', 'audio/aac', 'audio/x-m4a']
  )
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Storage policies: path must start with auth.uid()
-- Read public for all objects in these buckets (discovery + downloads)
drop policy if exists "sv_media_public_read" on storage.objects;
create policy "sv_media_public_read"
  on storage.objects for select
  using (
    bucket_id in (
      'artist-avatars',
      'artist-headers',
      'track-artwork',
      'release-artwork',
      'track-audio'
    )
  );

drop policy if exists "sv_media_owner_insert" on storage.objects;
create policy "sv_media_owner_insert"
  on storage.objects for insert
  with check (
    bucket_id in (
      'artist-avatars',
      'artist-headers',
      'track-artwork',
      'release-artwork',
      'track-audio'
    )
    and auth.role() = 'authenticated'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "sv_media_owner_update" on storage.objects;
create policy "sv_media_owner_update"
  on storage.objects for update
  using (
    bucket_id in (
      'artist-avatars',
      'artist-headers',
      'track-artwork',
      'release-artwork',
      'track-audio'
    )
    and auth.role() = 'authenticated'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "sv_media_owner_delete" on storage.objects;
create policy "sv_media_owner_delete"
  on storage.objects for delete
  using (
    bucket_id in (
      'artist-avatars',
      'artist-headers',
      'track-artwork',
      'release-artwork',
      'track-audio'
    )
    and auth.role() = 'authenticated'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
