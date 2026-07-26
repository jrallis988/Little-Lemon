-- Vibe Supabase schema
-- Run in the Supabase SQL editor after creating a project.
-- Pair with rls-policies.sql for Row Level Security.

create extension if not exists "pgcrypto";

create type public.visibility as enum ('public', 'friends', 'private');
create type public.friendship_status as enum ('pending', 'accepted', 'declined', 'blocked');
create type public.online_status as enum ('online', 'away', 'offline');
create type public.report_target_type as enum ('profile', 'message', 'photo', 'comment', 'blog_post', 'blog_comment');
create type public.report_status as enum ('open', 'reviewing', 'resolved', 'dismissed');
create type public.moderation_status as enum ('clean', 'flagged', 'hidden', 'removed');
create type public.notification_type as enum (
  'friend_request', 'friend_accepted', 'message', 'profile_comment',
  'photo_comment', 'blog_comment', 'reaction', 'mention'
);
create type public.feed_item_type as enum ('status', 'friendship', 'blog', 'photo', 'music', 'comment');
create type public.reaction_type as enum ('like', 'heart', 'laugh', 'wow', 'sad');

-- Auth users live in auth.users; public.profiles is the social identity.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique,
  display_name text not null,
  pronouns text,
  bio text,
  location text,
  age int check (age is null or (age >= 13 and age <= 17)),
  show_age boolean not null default false,
  occupation text,
  education text,
  relationship_status text,
  website text,
  avatar_url text,
  header_image_url text,
  status_message text,
  about_me text,
  who_id_like_to_meet text,
  interests text[] not null default '{}',
  music text[] not null default '{}',
  movies text[] not null default '{}',
  television text[] not null default '{}',
  books text[] not null default '{}',
  heroes text[] not null default '{}',
  favorite_music text,
  online_status public.online_status not null default 'offline',
  last_active_at timestamptz not null default now(),
  profile_views int not null default 0,
  member_since timestamptz not null default now(),
  featured_friends_count int not null default 8 check (featured_friends_count in (4, 8, 12, 16)),
  field_visibility jsonb not null default '{}'::jsonb,
  content_warning text,
  moderation_status public.moderation_status not null default 'clean',
  onboarding_complete boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint username_format check (username ~ '^[a-zA-Z0-9_]{3,24}$')
);

create table public.profile_themes (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles (id) on delete cascade,
  preset_name text not null default 'Classic Blue',
  background_color text not null default '#e8eef5',
  background_image_url text,
  background_repeat text not null default 'no-repeat',
  background_position text not null default 'center top',
  primary_color text not null default '#1a365d',
  secondary_color text not null default '#3b6ea5',
  text_color text not null default '#1a2332',
  link_color text not null default '#1d4f91',
  heading_font text not null default 'Outfit',
  body_font text not null default 'Source Sans 3',
  border_style text not null default 'solid',
  card_transparency numeric not null default 0.95 check (card_transparency between 0.4 and 1),
  header_image_url text,
  layout text not null default 'classic',
  module_order text[] not null default array['about','details','music','featured_friends','photos','blog','comments'],
  music_player_style text not null default 'classic',
  cursor_effect boolean not null default false,
  stickers jsonb not null default '[]'::jsonb,
  display_mode text not null default 'modern',
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profile_sections (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  key text not null,
  title text not null,
  content text,
  visible boolean not null default true,
  sort_order int not null default 0,
  unique (profile_id, key)
);

create table public.friendships (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references public.profiles (id) on delete cascade,
  addressee_id uuid not null references public.profiles (id) on delete cascade,
  status public.friendship_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (requester_id <> addressee_id),
  unique (requester_id, addressee_id)
);

create table public.featured_friends (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  friend_profile_id uuid not null references public.profiles (id) on delete cascade,
  position int not null check (position >= 0 and position < 16),
  created_at timestamptz not null default now(),
  unique (profile_id, friend_profile_id),
  unique (profile_id, position)
);

create table public.status_updates (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  body text not null check (char_length(body) <= 280),
  visibility public.visibility not null default 'public',
  moderation_status public.moderation_status not null default 'clean',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.feed_items (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid not null references public.profiles (id) on delete cascade,
  type public.feed_item_type not null,
  reference_id uuid,
  body text not null,
  metadata jsonb not null default '{}'::jsonb,
  visibility public.visibility not null default 'public',
  created_at timestamptz not null default now()
);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_message_at timestamptz
);

create table public.conversation_members (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  last_read_at timestamptz,
  muted boolean not null default false,
  joined_at timestamptz not null default now(),
  unique (conversation_id, profile_id)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  moderation_status public.moderation_status not null default 'clean',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.albums (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  description text,
  visibility public.visibility not null default 'public',
  cover_photo_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.photos (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.albums (id) on delete cascade,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  url text not null,
  caption text,
  visibility public.visibility not null default 'public',
  moderation_status public.moderation_status not null default 'clean',
  content_warning text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.albums
  add constraint albums_cover_photo_fk
  foreign key (cover_photo_id) references public.photos (id) on delete set null;

create table public.profile_comments (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  moderation_status public.moderation_status not null default 'clean',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  body text not null,
  mood text,
  currently_listening text,
  visibility public.visibility not null default 'public',
  moderation_status public.moderation_status not null default 'clean',
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  moderation_status public.moderation_status not null default 'clean',
  created_at timestamptz not null default now()
);

create table public.music_tracks (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  artist text not null,
  cover_url text,
  audio_url text not null,
  is_featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.playlists (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  track_ids uuid[] not null default '{}',
  created_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid not null references public.profiles (id) on delete cascade,
  actor_id uuid references public.profiles (id) on delete set null,
  type public.notification_type not null,
  title text not null,
  body text not null,
  link text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.blocks (
  id uuid primary key default gen_random_uuid(),
  blocker_id uuid not null references public.profiles (id) on delete cascade,
  blocked_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  check (blocker_id <> blocked_id),
  unique (blocker_id, blocked_id)
);

create table public.mutes (
  id uuid primary key default gen_random_uuid(),
  muter_id uuid not null references public.profiles (id) on delete cascade,
  muted_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  check (muter_id <> muted_id),
  unique (muter_id, muted_id)
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles (id) on delete cascade,
  target_type public.report_target_type not null,
  target_id uuid not null,
  reason text not null,
  details text,
  status public.report_status not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reactions (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid not null references public.profiles (id) on delete cascade,
  target_type text not null,
  target_id uuid not null,
  reaction public.reaction_type not null default 'like',
  created_at timestamptz not null default now(),
  unique (actor_id, target_type, target_id)
);

create table public.privacy_settings (
  profile_id uuid primary key references public.profiles (id) on delete cascade,
  profile_visibility public.visibility not null default 'public',
  friend_requests_from text not null default 'everyone',
  messages_from text not null default 'friends',
  comments_from text not null default 'friends',
  photos_visibility public.visibility not null default 'public',
  show_online_status boolean not null default true,
  email_notifications boolean not null default true,
  push_notifications boolean not null default true,
  notify_friend_requests boolean not null default true,
  notify_messages boolean not null default true,
  notify_comments boolean not null default true,
  notify_reactions boolean not null default true
);

-- Indexes
create index profiles_username_idx on public.profiles (lower(username));
create index profiles_location_idx on public.profiles (location);
create index profiles_last_active_idx on public.profiles (last_active_at desc);
create index friendships_requester_idx on public.friendships (requester_id, status);
create index friendships_addressee_idx on public.friendships (addressee_id, status);
create index feed_items_created_idx on public.feed_items (created_at desc);
create index messages_conversation_idx on public.messages (conversation_id, created_at);
create index notifications_recipient_idx on public.notifications (recipient_id, read, created_at desc);
create index blog_posts_profile_idx on public.blog_posts (profile_id, published_at desc);
create index photos_album_idx on public.photos (album_id, sort_order);
create index profile_comments_profile_idx on public.profile_comments (profile_id, created_at desc);
create index blocks_blocker_idx on public.blocks (blocker_id);

-- Storage buckets (create via dashboard or API): avatars, headers, photos, audio
-- Suggested MIME allow-lists: image/jpeg, image/png, image/webp, image/gif, audio/mpeg, audio/wav
