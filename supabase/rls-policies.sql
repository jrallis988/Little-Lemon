-- MyPlace Row Level Security policies
-- Run after schema.sql. Users may only edit their own content and
-- read content permitted by visibility / friendship / membership.

alter table public.profiles enable row level security;
alter table public.profile_themes enable row level security;
alter table public.profile_sections enable row level security;
alter table public.friendships enable row level security;
alter table public.featured_friends enable row level security;
alter table public.status_updates enable row level security;
alter table public.feed_items enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_members enable row level security;
alter table public.messages enable row level security;
alter table public.albums enable row level security;
alter table public.photos enable row level security;
alter table public.profile_comments enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_comments enable row level security;
alter table public.music_tracks enable row level security;
alter table public.playlists enable row level security;
alter table public.notifications enable row level security;
alter table public.blocks enable row level security;
alter table public.mutes enable row level security;
alter table public.reports enable row level security;
alter table public.reactions enable row level security;
alter table public.privacy_settings enable row level security;

create or replace function public.is_friend(a uuid, b uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.friendships f
    where f.status = 'accepted'
      and (
        (f.requester_id = a and f.addressee_id = b)
        or (f.requester_id = b and f.addressee_id = a)
      )
  );
$$;

create or replace function public.can_view_visibility(
  owner_id uuid,
  visibility public.visibility
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select case
    when visibility = 'public' then true
    when owner_id = auth.uid() then true
    when visibility = 'friends' then public.is_friend(owner_id, auth.uid())
    else false
  end;
$$;

-- Profiles
create policy "Public profiles are viewable by visibility"
  on public.profiles for select
  using (
    moderation_status <> 'removed'
    and public.can_view_visibility(
      id,
      coalesce(
        (select profile_visibility from public.privacy_settings ps where ps.profile_id = profiles.id),
        'public'::public.visibility
      )
    )
  );

create policy "Users insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Themes (readable when profile is viewable; writable by owner)
create policy "Themes readable with profile"
  on public.profile_themes for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = profile_id
    )
  );

create policy "Owners manage themes"
  on public.profile_themes for all
  using (auth.uid() = profile_id)
  with check (auth.uid() = profile_id);

-- Friendships
create policy "Participants read friendships"
  on public.friendships for select
  using (auth.uid() = requester_id or auth.uid() = addressee_id);

create policy "Users send friend requests"
  on public.friendships for insert
  with check (auth.uid() = requester_id and status = 'pending');

create policy "Participants update friendships"
  on public.friendships for update
  using (auth.uid() = requester_id or auth.uid() = addressee_id);

create policy "Participants delete friendships"
  on public.friendships for delete
  using (auth.uid() = requester_id or auth.uid() = addressee_id);

-- Status / feed
create policy "Status visible by privacy"
  on public.status_updates for select
  using (public.can_view_visibility(profile_id, visibility));

create policy "Owners manage status"
  on public.status_updates for all
  using (auth.uid() = profile_id)
  with check (auth.uid() = profile_id);

create policy "Feed visible by privacy"
  on public.feed_items for select
  using (public.can_view_visibility(actor_id, visibility));

create policy "Actors insert feed items"
  on public.feed_items for insert
  with check (auth.uid() = actor_id);

-- Messaging
create policy "Members read conversations"
  on public.conversations for select
  using (
    exists (
      select 1 from public.conversation_members cm
      where cm.conversation_id = id and cm.profile_id = auth.uid()
    )
  );

create policy "Members read membership"
  on public.conversation_members for select
  using (
    exists (
      select 1 from public.conversation_members cm
      where cm.conversation_id = conversation_members.conversation_id
        and cm.profile_id = auth.uid()
    )
  );

create policy "Members read messages"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversation_members cm
      where cm.conversation_id = messages.conversation_id
        and cm.profile_id = auth.uid()
    )
  );

create policy "Members send messages"
  on public.messages for insert
  with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.conversation_members cm
      where cm.conversation_id = messages.conversation_id
        and cm.profile_id = auth.uid()
    )
  );

-- Photos / albums / blogs / comments
create policy "Albums by visibility"
  on public.albums for select
  using (public.can_view_visibility(profile_id, visibility));

create policy "Owners manage albums"
  on public.albums for all
  using (auth.uid() = profile_id)
  with check (auth.uid() = profile_id);

create policy "Photos by visibility"
  on public.photos for select
  using (public.can_view_visibility(profile_id, visibility));

create policy "Owners manage photos"
  on public.photos for all
  using (auth.uid() = profile_id)
  with check (auth.uid() = profile_id);

create policy "Blog posts by visibility"
  on public.blog_posts for select
  using (public.can_view_visibility(profile_id, visibility));

create policy "Owners manage blog posts"
  on public.blog_posts for all
  using (auth.uid() = profile_id)
  with check (auth.uid() = profile_id);

create policy "Profile comments readable with profile"
  on public.profile_comments for select
  using (
    exists (select 1 from public.profiles p where p.id = profile_id)
  );

create policy "Authors create profile comments"
  on public.profile_comments for insert
  with check (auth.uid() = author_id);

create policy "Owner or author delete profile comments"
  on public.profile_comments for delete
  using (auth.uid() = profile_id or auth.uid() = author_id);

-- Notifications, blocks, reports, privacy
create policy "Recipients manage notifications"
  on public.notifications for all
  using (auth.uid() = recipient_id)
  with check (auth.uid() = recipient_id);

create policy "Users manage own blocks"
  on public.blocks for all
  using (auth.uid() = blocker_id)
  with check (auth.uid() = blocker_id);

create policy "Users create reports"
  on public.reports for insert
  with check (auth.uid() = reporter_id);

create policy "Users read own reports"
  on public.reports for select
  using (auth.uid() = reporter_id);

create policy "Owners manage privacy"
  on public.privacy_settings for all
  using (auth.uid() = profile_id)
  with check (auth.uid() = profile_id);

create policy "Reactions readable"
  on public.reactions for select
  using (true);

create policy "Users manage own reactions"
  on public.reactions for all
  using (auth.uid() = actor_id)
  with check (auth.uid() = actor_id);

-- Rate limiting recommendation (application layer):
-- Limit friend requests, messages, comments, and reports per user per minute.
-- Example: 10 friend requests / hour, 30 messages / minute, 20 comments / hour.
