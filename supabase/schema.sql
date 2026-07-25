-- Vibe social schema draft for Supabase/Postgres.
-- Enable in Supabase SQL editor before creating UUID defaults:
-- create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  username text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_login_at timestamptz,
  is_active boolean not null default true,
  moderation_status text not null default 'ok'
    check (moderation_status in ('ok', 'warned', 'restricted', 'banned'))
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  username text not null unique,
  display_name text not null,
  pronouns text,
  bio text,
  location text,
  birthdate date,
  show_age boolean not null default false,
  avatar_url text,
  cover_url text,
  status_message text,
  online_status text not null default 'offline'
    check (online_status in ('online', 'away', 'offline')),
  last_active_at timestamptz not null default now(),
  member_since timestamptz not null default now(),
  profile_views integer not null default 0,
  friend_count integer not null default 0,
  interests text[] not null default '{}',
  favorite_music text[] not null default '{}',
  details jsonb not null default '{}'::jsonb,
  featured_friend_count integer not null default 8
    check (featured_friend_count in (4, 8, 12, 16)),
  visibility text not null default 'public'
    check (visibility in ('public', 'friends', 'private')),
  who_can_friend text not null default 'public'
    check (who_can_friend in ('public', 'friends', 'private')),
  who_can_message text not null default 'friends'
    check (who_can_message in ('public', 'friends', 'private')),
  who_can_comment text not null default 'friends'
    check (who_can_comment in ('public', 'friends', 'private')),
  who_can_view_photos text not null default 'public'
    check (who_can_view_photos in ('public', 'friends', 'private')),
  show_online_status boolean not null default true,
  onboarding_complete boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profile_themes (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  preset text not null default 'classic-blue',
  background_color text not null,
  background_image text,
  background_repeat text not null default 'no-repeat',
  background_position text not null default 'center top',
  primary_color text not null,
  secondary_color text not null,
  text_color text not null,
  link_color text not null,
  heading_font text not null,
  body_font text not null,
  border_style text not null default 'solid',
  card_transparency numeric(3, 2) not null default 0.96,
  header_image text,
  layout text not null default 'classic',
  module_order text[] not null default array[
    'about', 'details', 'interests', 'music', 'photos', 'blog', 'friends', 'comments'
  ],
  music_player_style text not null default 'compact',
  cursor_effect boolean not null default false,
  stickers text[] not null default '{}',
  display_mode text not null default 'retro',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profile_sections (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  section_key text not null,
  title text not null,
  body text,
  visibility text not null default 'public'
    check (visibility in ('public', 'friends', 'private')),
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (profile_id, section_key)
);

create table if not exists public.friendships (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references public.users(id) on delete cascade,
  addressee_id uuid not null references public.users(id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'accepted', 'declined', 'blocked')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (requester_id <> addressee_id),
  unique (requester_id, addressee_id)
);

create table if not exists public.featured_friends (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  friend_profile_id uuid not null references public.profiles(id) on delete cascade,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  unique (profile_id, friend_profile_id),
  unique (profile_id, position)
);

create table if not exists public.status_updates (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.users(id) on delete cascade,
  body text not null,
  visibility text not null default 'public'
    check (visibility in ('public', 'friends', 'private')),
  reaction_count integer not null default 0,
  comment_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.feed_items (
  id uuid primary key default gen_random_uuid(),
  type text not null
    check (type in ('status', 'friendship', 'blog', 'photo', 'music', 'comment')),
  actor_id uuid not null references public.users(id) on delete cascade,
  target_id uuid,
  body text not null,
  meta jsonb not null default '{}'::jsonb,
  visibility text not null default 'public'
    check (visibility in ('public', 'friends', 'private')),
  reaction_count integer not null default 0,
  comment_count integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  last_message_preview text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.conversation_members (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  last_read_at timestamptz,
  muted boolean not null default false,
  created_at timestamptz not null default now(),
  unique (conversation_id, user_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.users(id) on delete cascade,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.albums (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  cover_photo_id uuid,
  visibility text not null default 'public'
    check (visibility in ('public', 'friends', 'private')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.albums(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  url text not null,
  caption text,
  visibility text not null default 'public'
    check (visibility in ('public', 'friends', 'private')),
  comment_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.albums
  add constraint albums_cover_photo_id_fkey
  foreign key (cover_photo_id) references public.photos(id) on delete set null
  deferrable initially deferred;

create table if not exists public.profile_comments (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  author_id uuid not null references public.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  body text not null,
  mood text,
  currently_listening text,
  visibility text not null default 'public'
    check (visibility in ('public', 'friends', 'private')),
  comment_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  author_id uuid not null references public.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.music_tracks (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  artist text not null,
  cover_url text,
  audio_url text not null,
  is_featured boolean not null default false,
  position integer not null default 0,
  visibility text not null default 'public'
    check (visibility in ('public', 'friends', 'private')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.playlists (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  track_ids uuid[] not null default '{}',
  visibility text not null default 'public'
    check (visibility in ('public', 'friends', 'private')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  type text not null,
  title text not null,
  body text not null,
  href text,
  actor_id uuid references public.users(id) on delete set null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.blocks (
  id uuid primary key default gen_random_uuid(),
  blocker_id uuid not null references public.users(id) on delete cascade,
  blocked_id uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  check (blocker_id <> blocked_id),
  unique (blocker_id, blocked_id)
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.users(id) on delete cascade,
  target_type text not null
    check (target_type in ('profile', 'message', 'photo', 'comment', 'blog_post')),
  target_id uuid not null,
  reason text not null,
  details text,
  status text not null default 'open'
    check (status in ('open', 'reviewed', 'resolved', 'dismissed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  target_type text not null
    check (target_type in ('status', 'feed', 'photo', 'blog', 'comment')),
  target_id uuid not null,
  emoji text not null,
  created_at timestamptz not null default now(),
  unique (user_id, target_type, target_id, emoji)
);

create index if not exists profiles_username_idx on public.profiles (lower(username));
create index if not exists profiles_visibility_idx on public.profiles (visibility);
create index if not exists profiles_last_active_idx on public.profiles (last_active_at desc);
create index if not exists friendships_user_status_idx on public.friendships (requester_id, addressee_id, status);
create index if not exists featured_friends_profile_position_idx on public.featured_friends (profile_id, position);
create index if not exists feed_items_created_idx on public.feed_items (created_at desc);
create index if not exists conversation_members_user_idx on public.conversation_members (user_id);
create index if not exists messages_conversation_created_idx on public.messages (conversation_id, created_at);
create index if not exists albums_profile_idx on public.albums (profile_id, visibility);
create index if not exists photos_profile_idx on public.photos (profile_id, visibility);
create index if not exists profile_comments_profile_created_idx on public.profile_comments (profile_id, created_at desc);
create index if not exists blog_posts_author_created_idx on public.blog_posts (author_id, created_at desc);
create index if not exists blog_posts_visibility_idx on public.blog_posts (visibility);
create index if not exists blog_comments_post_created_idx on public.blog_comments (post_id, created_at desc);
create index if not exists music_tracks_profile_position_idx on public.music_tracks (profile_id, position);
create index if not exists notifications_user_read_created_idx on public.notifications (user_id, read, created_at desc);
create index if not exists blocks_blocker_idx on public.blocks (blocker_id);
create index if not exists reports_target_idx on public.reports (target_type, target_id);
create index if not exists reactions_target_idx on public.reactions (target_type, target_id);

-- RLS recommendations:
-- alter table public.<table> enable row level security;
-- users: users can select/update their own row; service role handles moderation.
-- profiles/profile_themes/profile_sections: public can select public rows; friends can select friends rows
--   via an accepted friendship exists() check; owners can select/insert/update/delete their own rows.
-- friendships: participants can select rows involving themselves; requester inserts pending rows;
--   addressee updates pending rows to accepted/declined; either participant can delete accepted rows.
-- featured_friends: readable when parent profile is readable; owner manages their own profile's rows.
-- status_updates/feed_items/blog_posts/albums/photos/music_tracks/playlists: select by visibility
--   (public/friends/owner); authors/owners insert/update/delete their own content.
-- conversations/conversation_members/messages: members can select conversations and messages only when
--   an exists() membership row matches auth.uid(); members can insert messages in their conversations.
-- comments/reactions: readable when parent content is readable; authenticated users insert when parent
--   permissions allow; authors and parent owners can delete comments.
-- notifications: users can select/update/delete only their own notifications.
-- blocks: blocker can manage their own block rows; policies should suppress blocked users from reads.
-- reports: authenticated users can insert reports; only moderators/service role can select/update them.
