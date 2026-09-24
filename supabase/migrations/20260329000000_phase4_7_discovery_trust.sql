-- StaticVolume Phases 4–7 foundations:
-- catalog search (FTS), human editorial slots, content reports, editor flag.

-- ---------------------------------------------------------------------------
-- Editor capability (human curation tooling)
-- ---------------------------------------------------------------------------
alter table public.profiles
  add column if not exists is_editor boolean not null default false;

-- ---------------------------------------------------------------------------
-- Full-text search vectors on profiles + tracks
-- ---------------------------------------------------------------------------
alter table public.profiles
  add column if not exists search_tsv tsvector;

alter table public.tracks
  add column if not exists search_tsv tsvector;

create or replace function public.profiles_search_tsv_update()
returns trigger
language plpgsql
as $$
begin
  new.search_tsv :=
    setweight(to_tsvector('english', coalesce(new.display_name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(new.scene, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(array_to_string(new.genre_tags, ' '), '')), 'B') ||
    setweight(to_tsvector('english', coalesce(new.geography, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(new.bio, '')), 'D') ||
    setweight(to_tsvector('english', coalesce(new.lineup_note, '')), 'D');
  return new;
end;
$$;

drop trigger if exists profiles_search_tsv_trigger on public.profiles;
create trigger profiles_search_tsv_trigger
  before insert or update of display_name, scene, genre_tags, geography, bio, lineup_note
  on public.profiles
  for each row execute function public.profiles_search_tsv_update();

create or replace function public.tracks_search_tsv_update()
returns trigger
language plpgsql
as $$
begin
  new.search_tsv :=
    setweight(to_tsvector('english', coalesce(new.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(new.scene, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(new.geography, '')), 'C');
  return new;
end;
$$;

drop trigger if exists tracks_search_tsv_trigger on public.tracks;
create trigger tracks_search_tsv_trigger
  before insert or update of title, scene, geography
  on public.tracks
  for each row execute function public.tracks_search_tsv_update();

update public.profiles set display_name = display_name;
update public.tracks set title = title;

create index if not exists profiles_search_tsv_idx on public.profiles using gin (search_tsv);
create index if not exists tracks_search_tsv_idx on public.tracks using gin (search_tsv);
create index if not exists profiles_joined_at_idx on public.profiles (joined_at desc);
create index if not exists profiles_status_idx on public.profiles (status);

-- ---------------------------------------------------------------------------
-- Human editorial curation (Featured / Just Found / mosaic)
-- ---------------------------------------------------------------------------
create table if not exists public.editorial_slots (
  id uuid primary key default gen_random_uuid(),
  slot text not null check (slot in (
    'featured_hero',
    'mosaic',
    'recently_featured',
    'just_found',
    'everybody_listening'
  )),
  target_kind text not null check (target_kind in ('artist', 'track')),
  target_id text not null,
  title text,
  subtitle text,
  blurb text,
  sort_order integer not null default 0,
  starts_at timestamptz,
  ends_at timestamptz,
  published boolean not null default true,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists editorial_slots_slot_idx
  on public.editorial_slots (slot, sort_order);

drop trigger if exists editorial_slots_set_updated_at on public.editorial_slots;
create trigger editorial_slots_set_updated_at
  before update on public.editorial_slots
  for each row execute function public.set_updated_at();

alter table public.editorial_slots enable row level security;

drop policy if exists "editorial_public_read" on public.editorial_slots;
create policy "editorial_public_read"
  on public.editorial_slots for select
  using (
    published = true
    and (starts_at is null or starts_at <= now())
    and (ends_at is null or ends_at >= now())
  );

drop policy if exists "editorial_editor_insert" on public.editorial_slots;
create policy "editorial_editor_insert"
  on public.editorial_slots for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_editor = true
    )
  );

drop policy if exists "editorial_editor_update" on public.editorial_slots;
create policy "editorial_editor_update"
  on public.editorial_slots for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_editor = true
    )
  );

drop policy if exists "editorial_editor_delete" on public.editorial_slots;
create policy "editorial_editor_delete"
  on public.editorial_slots for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_editor = true
    )
  );

-- ---------------------------------------------------------------------------
-- Content reports / takedown requests (Phase 7)
-- ---------------------------------------------------------------------------
create table if not exists public.content_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references public.profiles (id) on delete set null,
  target_kind text not null check (target_kind in (
    'track', 'artist', 'review', 'list', 'user', 'release'
  )),
  target_id text not null,
  reason text not null check (reason in (
    'copyright', 'abuse', 'spam', 'impersonation', 'other'
  )),
  details text,
  contact_email text,
  status text not null default 'open'
    check (status in ('open', 'reviewing', 'resolved', 'dismissed')),
  resolution_note text,
  resolved_by uuid references public.profiles (id) on delete set null,
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists content_reports_status_idx
  on public.content_reports (status, created_at desc);

alter table public.content_reports enable row level security;

drop policy if exists "reports_insert_auth" on public.content_reports;
create policy "reports_insert_auth"
  on public.content_reports for insert
  with check (
    auth.uid() is not null
    and (reporter_id is null or reporter_id = auth.uid())
  );

drop policy if exists "reports_owner_read" on public.content_reports;
create policy "reports_owner_read"
  on public.content_reports for select
  using (
    reporter_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_editor = true
    )
  );

drop policy if exists "reports_editor_update" on public.content_reports;
create policy "reports_editor_update"
  on public.content_reports for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_editor = true
    )
  );

-- ---------------------------------------------------------------------------
-- Catalog metadata sync ledger (Phase 4 foundation — no Spotify audio)
-- ---------------------------------------------------------------------------
create table if not exists public.catalog_sync_runs (
  id uuid primary key default gen_random_uuid(),
  source text not null check (source in ('spotify', 'musicbrainz', 'manual')),
  status text not null default 'pending'
    check (status in ('pending', 'running', 'succeeded', 'failed')),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  records_upserted integer not null default 0,
  notes text,
  error text
);

alter table public.catalog_sync_runs enable row level security;

drop policy if exists "catalog_sync_editor_read" on public.catalog_sync_runs;
create policy "catalog_sync_editor_read"
  on public.catalog_sync_runs for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_editor = true
    )
  );
