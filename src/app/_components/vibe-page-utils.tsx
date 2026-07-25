"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import {
  getStore,
  type MockStore,
} from "@/lib/mock/store";
import type {
  BlogPost,
  Conversation,
  Friendship,
  Profile,
  ProfileComment,
  ProfileTheme,
} from "@/lib/types/database";
import { useAuth } from "@/lib/auth/context";
import { formatRelative } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

export function useMockStoreState() {
  const [ready, setReady] = useState(false);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    setReady(true);
  }, []);

  const store = ready && version >= 0 ? getStore() : null;
  const refresh = () => setVersion((value) => value + 1);

  return { store, ready, refresh };
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={cn("mp-card p-4", className)}>{children}</section>;
}

export function SectionTitle({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3 border-b border-[#c5d0dc] pb-2">
      <h2 className="text-base font-black text-[#0f2744]">{title}</h2>
      {action}
    </div>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="block text-xs font-semibold uppercase tracking-wide text-[#0f2744]">
      {children}
    </span>
  );
}

export function VibeShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { profile } = useAuth();
  const { store } = useMockStoreState();
  const unreadNotifications =
    store && profile
      ? store.notifications.filter((item) => item.recipient_id === profile.id && !item.read)
          .length
      : 0;
  const unreadMessages = store && profile ? getUnreadMessageCount(store, profile.id) : 0;

  return (
    <AppShell
      unreadMessages={unreadMessages}
      unreadNotifications={unreadNotifications}
      className={className}
    >
      {children}
    </AppShell>
  );
}

export function LoadingCard({ label = "Loading Vibe..." }: { label?: string }) {
  return <Card className="animate-pulse text-sm text-[#5b6b7c]">{label}</Card>;
}

export function profileById(store: MockStore, id: string | null | undefined) {
  if (!id) return undefined;
  return store.profiles.find((profile) => profile.id === id);
}

export function profileByUsername(store: MockStore, username: string | null | undefined) {
  if (!username) return undefined;
  return store.profiles.find(
    (profile) => profile.username.toLowerCase() === username.toLowerCase()
  );
}

export function themeForProfile(store: MockStore, profileId: string) {
  return store.themes.find((theme) => theme.profile_id === profileId);
}

export function friendsForProfile(store: MockStore, profileId: string) {
  return store.friendships
    .filter(
      (friendship) =>
        friendship.status === "accepted" &&
        (friendship.requester_id === profileId || friendship.addressee_id === profileId)
    )
    .map((friendship) =>
      friendship.requester_id === profileId
        ? friendship.addressee_id
        : friendship.requester_id
    )
    .map((id) => profileById(store, id))
    .filter(Boolean) as Profile[];
}

export function pendingRequestsForProfile(store: MockStore, profileId: string) {
  return store.friendships
    .filter((friendship) => friendship.status === "pending" && friendship.addressee_id === profileId)
    .map((friendship) => ({
      friendship,
      requester: profileById(store, friendship.requester_id),
    }))
    .filter((item): item is { friendship: Friendship; requester: Profile } => Boolean(item.requester));
}

export function friendshipBetween(store: MockStore, a: string, b: string) {
  return store.friendships.find(
    (friendship) =>
      (friendship.requester_id === a && friendship.addressee_id === b) ||
      (friendship.requester_id === b && friendship.addressee_id === a)
  );
}

export function friendshipStatus(store: MockStore, viewerId: string, targetId: string) {
  if (viewerId === targetId) return "self" as const;
  const friendship = friendshipBetween(store, viewerId, targetId);
  if (!friendship) return "none" as const;
  if (friendship.status === "accepted") return "friends" as const;
  if (friendship.status === "pending") {
    return friendship.requester_id === viewerId ? "pending_sent" : "pending_received";
  }
  return "none" as const;
}

export function featuredProfiles(store: MockStore, profile: Profile) {
  return store.featuredFriends
    .filter((featured) => featured.profile_id === profile.id)
    .sort((a, b) => a.position - b.position)
    .slice(0, profile.featured_friends_count)
    .map((featured) => profileById(store, featured.friend_profile_id))
    .filter(Boolean) as Profile[];
}

export function profileCommentAuthors(store: MockStore, comments: ProfileComment[]) {
  return Object.fromEntries(
    comments
      .map((comment) => [comment.author_id, profileById(store, comment.author_id)] as const)
      .filter((entry): entry is readonly [string, Profile] => Boolean(entry[1]))
  );
}

export function blogPostAuthor(store: MockStore, post: BlogPost) {
  return profileById(store, post.profile_id);
}

export function visibleBlogPosts(store: MockStore, viewerId?: string | null) {
  const friendIds = viewerId ? friendsForProfile(store, viewerId).map((friend) => friend.id) : [];
  return store.blogPosts
    .filter((post) => {
      if (post.visibility === "public") return true;
      if (!viewerId) return false;
      return post.profile_id === viewerId || friendIds.includes(post.profile_id);
    })
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
}

export function conversationSummaries(store: MockStore, profileId: string) {
  return store.conversationMembers
    .filter((member) => member.profile_id === profileId)
    .map((member) => {
      const conversation = store.conversations.find(
        (item) => item.id === member.conversation_id
      ) as Conversation | undefined;
      const otherMember = store.conversationMembers.find(
        (item) =>
          item.conversation_id === member.conversation_id && item.profile_id !== profileId
      );
      const otherProfile = profileById(store, otherMember?.profile_id);
      const messages = store.messages
        .filter((message) => message.conversation_id === member.conversation_id)
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      const lastMessage = messages.at(-1);
      const unread = messages.filter(
        (message) =>
          message.sender_id !== profileId &&
          (!member.last_read_at ||
            new Date(message.created_at).getTime() > new Date(member.last_read_at).getTime())
      ).length;

      return {
        member,
        conversation,
        otherProfile,
        messages,
        lastMessage,
        unread,
      };
    })
    .filter((summary) => summary.conversation && summary.otherProfile)
    .sort((a, b) => {
      const aTime = a.conversation?.last_message_at ?? a.conversation?.created_at ?? "";
      const bTime = b.conversation?.last_message_at ?? b.conversation?.created_at ?? "";
      return new Date(bTime).getTime() - new Date(aTime).getTime();
    });
}

export function getUnreadMessageCount(store: MockStore, profileId: string) {
  return conversationSummaries(store, profileId).reduce((total, summary) => total + summary.unread, 0);
}

export function ProfileListItem({
  profile,
  meta,
  action,
}: {
  profile: Profile;
  meta?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[4px] border border-[#c5d0dc] bg-white p-3">
      <Link
        href={`/profile/${profile.username}`}
        className="flex min-w-0 items-center gap-3 no-underline"
      >
        <Avatar profile={profile} size="lg" showOnline />
        <span className="min-w-0">
          <span className="block truncate font-bold text-[#0f2744]">{profile.display_name}</span>
          <span className="block truncate text-sm text-[#5b6b7c]">@{profile.username}</span>
          {meta ? <span className="block text-xs text-[#5b6b7c]">{meta}</span> : null}
        </span>
      </Link>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function EmptyNotice({
  title,
  children,
  actionHref,
  actionLabel,
}: {
  title: string;
  children: ReactNode;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <Card className="text-center">
      <h2 className="text-lg font-black text-[#0f2744]">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-[#5b6b7c]">{children}</p>
      {actionHref && actionLabel ? (
        <Button
          className="mt-4"
          onClick={() => {
            window.location.href = actionHref;
          }}
        >
          {actionLabel}
        </Button>
      ) : null}
    </Card>
  );
}

export function splitTags(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function joinTags(value: string[]) {
  return value.join(", ");
}

export function downloadJson(filename: string, value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function ProfileTimestamp({ iso }: { iso: string }) {
  return <time dateTime={iso}>{formatRelative(iso)}</time>;
}

export function profileAssets(store: MockStore, profileId: string) {
  const albums = store.albums.filter((album) => album.profile_id === profileId);
  const photos = store.photos.filter((photo) => photo.profile_id === profileId);
  const tracks = store.tracks.filter((track) => track.profile_id === profileId);
  const comments = store.profileComments.filter((comment) => comment.profile_id === profileId);
  const blogPosts = store.blogPosts.filter((post) => post.profile_id === profileId);
  const photoComments: Record<string, ProfileComment[]> = {};

  return { albums, photos, tracks, comments, blogPosts, photoComments };
}

export function coerceFeaturedCount(value: number): Profile["featured_friends_count"] {
  if (value === 4 || value === 8 || value === 12 || value === 16) return value;
  return 8;
}

export function ensureTheme(theme: ProfileTheme | undefined) {
  if (!theme) throw new Error("Profile theme is missing from the mock store.");
  return theme;
}
