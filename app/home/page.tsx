"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  Bell,
  Cake,
  Mail,
  Megaphone,
  MessageSquare,
  Pencil,
  Plus,
  Radio,
  UserRound,
  Users,
} from "lucide-react";

import { AuthenticatedShell } from "@/components/auth/AuthenticatedShell";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { ActivityFeed } from "@/components/feed/ActivityFeed";
import { StatusComposer } from "@/components/feed/StatusComposer";
import { FriendRequestCard } from "@/components/friends/FriendRequestCard";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  mockAnnouncements,
  mockFeaturedFriends,
  upcomingBirthdays,
} from "@/lib/mock/data";
import {
  getMockSnapshot,
  mockApi,
  subscribeMockStore,
} from "@/lib/mock/store";
import type { Profile } from "@/lib/types";
import { cn, formatRelativeTime } from "@/lib/utils";
import { useAuth } from "@/lib/auth/AuthProvider";

function findProfile(profiles: Profile[], id: string) {
  return profiles.find((profile) => profile.id === id || profile.userId === id);
}

function profileMap(profiles: Profile[]) {
  return profiles.reduce<Record<string, Profile>>((acc, profile) => {
    acc[profile.id] = profile;
    acc[profile.userId] = profile;
    return acc;
  }, {});
}

function hasRelationship(currentUserId: string, otherUserId: string) {
  return getMockSnapshot().friendships.some(
    (friendship) =>
      (friendship.status === "accepted" || friendship.status === "pending") &&
      ((friendship.requesterId === currentUserId &&
        friendship.addresseeId === otherUserId) ||
        (friendship.requesterId === otherUserId &&
          friendship.addresseeId === currentUserId))
  );
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: typeof Users;
  children: React.ReactNode;
}) {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-brand" aria-hidden />
        {children}
      </CardTitle>
    </CardHeader>
  );
}

function HomeContent() {
  const { profile } = useAuth();
  const snap = useSyncExternalStore(
    subscribeMockStore,
    getMockSnapshot,
    getMockSnapshot
  );
  const [notice, setNotice] = useState("");

  const profilesById = useMemo(() => profileMap(snap.profiles), [snap.profiles]);

  const incomingRequests = useMemo(() => {
    if (!profile) return [];
    return snap.friendships
      .filter(
        (friendship) =>
          friendship.addresseeId === profile.userId && friendship.status === "pending"
      )
      .map((friendship) => ({
        friendship,
        requester: findProfile(snap.profiles, friendship.requesterId),
      }))
      .filter((item): item is typeof item & { requester: Profile } =>
        Boolean(item.requester)
      );
  }, [profile, snap.friendships, snap.profiles]);

  const unreadMessages = useMemo(() => {
    if (!profile) return 0;
    return snap.notifications.filter(
      (notification) =>
        notification.userId === profile.userId &&
        notification.type === "message" &&
        !notification.read
    ).length;
  }, [profile, snap.notifications]);

  const suggestedProfiles = useMemo(() => {
    if (!profile) return [];
    return snap.profiles
      .filter(
        (item) =>
          item.userId !== profile.userId &&
          !hasRelationship(profile.userId, item.userId)
      )
      .slice(0, 3);
    // Intentionally depend on friendships so suggestions refresh after requests.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- hasRelationship reads live snapshot
  }, [profile, snap.profiles, snap.friendships]);

  const recentlyOnline = useMemo(() => {
    if (!profile) return [];
    return [...snap.profiles]
      .filter(
        (item) =>
          item.userId !== profile.userId &&
          item.showOnlineStatus &&
          item.onlineStatus !== "offline"
      )
      .sort(
        (a, b) =>
          new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime()
      )
      .slice(0, 4);
  }, [profile, snap.profiles]);

  const birthdays = useMemo(() => {
    return upcomingBirthdays
      .map((birthday) => ({
        ...birthday,
        profile: findProfile(snap.profiles, birthday.profileId),
      }))
      .filter((item): item is typeof item & { profile: Profile } =>
        Boolean(item.profile)
      );
  }, [snap.profiles]);

  if (!profile) return null;

  const featuredFriendCount = (mockFeaturedFriends[profile.id] || []).length;

  const handleStatus = async (body: string) => {
    mockApi.postStatus(profile.userId, body);
    setNotice("Status posted to your friends' feed.");
  };

  const respondToRequest = (friendshipId: string, accept: boolean) => {
    mockApi.respondFriendRequest(friendshipId, profile.userId, accept);
    setNotice(accept ? "Friend request accepted." : "Friend request declined.");
  };

  const addFriend = (other: Profile) => {
    try {
      mockApi.sendFriendRequest(profile.userId, other.userId);
      setNotice(`Friend request sent to ${other.displayName}.`);
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Unable to send friend request.");
    }
  };

  return (
    <AuthenticatedShell mainClassName="max-w-7xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
            Home base
          </p>
          <h1 className="font-display text-3xl font-black text-navy-900">
            Welcome back, {profile.displayName.split(" ")[0]}.
          </h1>
        </div>
        {notice ? (
          <div className="rounded-card border border-green-200 bg-green-50 px-3 py-2 text-sm font-bold text-green-800">
            {notice}
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-[250px_minmax(0,1fr)_310px]">
        <aside className="space-y-4">
          <Card>
            <CardContent className="space-y-4 text-center">
              <Avatar
                name={profile.displayName}
                src={profile.avatarUrl}
                size="xl"
                online={profile.onlineStatus === "online"}
                showOnlineIndicator={profile.showOnlineStatus}
                className="mx-auto"
              />
              <div>
                <h2 className="font-display text-xl font-black">{profile.displayName}</h2>
                <p className="text-sm text-navy-500">@{profile.username}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-card border border-surface-border bg-surface-muted p-2">
                  <p className="font-black text-navy-900">{profile.friendCount}</p>
                  <p className="uppercase tracking-wide text-navy-500">friends</p>
                </div>
                <div className="rounded-card border border-surface-border bg-surface-muted p-2">
                  <p className="font-black text-navy-900">{unreadMessages}</p>
                  <p className="uppercase tracking-wide text-navy-500">new mail</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant={profile.onlineStatus === "online" ? "success" : "warning"}>
                  <Radio className="h-3 w-3" aria-hidden />
                  {profile.onlineStatus}
                </Badge>
                <Badge>{featuredFriendCount} featured</Badge>
              </div>
              <div className="grid gap-2">
                <Link
                  href={`/profile/${profile.username}`}
                  className="inline-flex items-center justify-center gap-2 rounded-btn border border-brand bg-brand px-3 py-2 text-sm font-bold text-white shadow-soft hover:bg-brand-dark hover:no-underline"
                >
                  <UserRound className="h-4 w-4" aria-hidden />
                  View My Profile
                </Link>
                <Link
                  href="/onboarding"
                  className="inline-flex items-center justify-center gap-2 rounded-btn border border-surface-border bg-white px-3 py-2 text-sm font-bold text-navy-800 shadow-soft hover:bg-brand-soft hover:no-underline"
                >
                  <Pencil className="h-4 w-4" aria-hidden />
                  Edit Profile
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <SectionTitle icon={Bell}>Quick stats</SectionTitle>
            <CardContent className="space-y-2 text-sm text-navy-700">
              <div className="flex justify-between gap-3">
                <span>Profile views</span>
                <span className="font-bold">{profile.profileViews.toLocaleString()}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>Member since</span>
                <span className="font-bold">{new Date(profile.memberSince).getFullYear()}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>Last active</span>
                <span className="font-bold">{formatRelativeTime(profile.lastActiveAt)}</span>
              </div>
            </CardContent>
          </Card>
        </aside>

        <section className="min-w-0 space-y-4">
          <StatusComposer currentUser={profile} onSubmit={handleStatus} />
          <ActivityFeed
            items={snap.feedItems}
            profiles={profilesById}
            currentUser={profile}
            onReact={(item) => {
              mockApi.reactToFeedItem(item.id);
              setNotice("Reaction added.");
            }}
          />
        </section>

        <aside className="space-y-4">
          <Card>
            <SectionTitle icon={Users}>Friend requests</SectionTitle>
            <CardContent className={cn("space-y-3", incomingRequests.length === 0 && "text-sm")}>
              {incomingRequests.length > 0 ? (
                incomingRequests.map(({ friendship, requester }) => (
                  <FriendRequestCard
                    key={friendship.id}
                    requester={requester}
                    createdAt={friendship.createdAt}
                    mutualFriends={2}
                    onAccept={() => respondToRequest(friendship.id, true)}
                    onDecline={() => respondToRequest(friendship.id, false)}
                  />
                ))
              ) : (
                <p className="text-navy-500">No pending requests right now.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <SectionTitle icon={Cake}>Upcoming birthdays</SectionTitle>
            <CardContent className="space-y-3">
              {birthdays.map((birthday) => (
                <Link
                  key={birthday.profileId}
                  href={`/profile/${birthday.profile.username}`}
                  className="flex items-center gap-3 rounded-card border border-surface-border bg-white p-2 hover:bg-brand-soft hover:no-underline"
                >
                  <Avatar
                    name={birthday.profile.displayName}
                    src={birthday.profile.avatarUrl}
                    size="sm"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-navy-900">
                      {birthday.profile.displayName}
                    </span>
                    <span className="text-xs text-navy-500">{birthday.dateLabel}</span>
                  </span>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <SectionTitle icon={Plus}>Suggested profiles</SectionTitle>
            <CardContent className="space-y-3">
              {suggestedProfiles.map((suggested) => (
                <div
                  key={suggested.id}
                  className="rounded-card border border-surface-border bg-surface-muted p-3"
                >
                  <div className="flex gap-3">
                    <Avatar
                      name={suggested.displayName}
                      src={suggested.avatarUrl}
                      size="sm"
                    />
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/profile/${suggested.username}`}
                        className="block truncate text-sm font-bold text-navy-900"
                      >
                        {suggested.displayName}
                      </Link>
                      <p className="truncate text-xs text-navy-500">@{suggested.username}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mt-3 w-full"
                    onClick={() => addFriend(suggested)}
                  >
                    <Plus className="h-4 w-4" aria-hidden />
                    Add Friend
                  </Button>
                </div>
              ))}
              {suggestedProfiles.length === 0 ? (
                <p className="text-sm text-navy-500">You already know everyone in the demo.</p>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <SectionTitle icon={MessageSquare}>Recently online</SectionTitle>
            <CardContent className="space-y-2">
              {recentlyOnline.map((onlineProfile) => (
                <Link
                  key={onlineProfile.id}
                  href={`/profile/${onlineProfile.username}`}
                  className="flex items-center gap-3 rounded-card p-1.5 hover:bg-brand-soft hover:no-underline"
                >
                  <Avatar
                    name={onlineProfile.displayName}
                    src={onlineProfile.avatarUrl}
                    size="xs"
                    online={onlineProfile.onlineStatus === "online"}
                    showOnlineIndicator={onlineProfile.showOnlineStatus}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-navy-900">
                      {onlineProfile.displayName}
                    </span>
                    <span className="text-xs text-navy-500">
                      {formatRelativeTime(onlineProfile.lastActiveAt)}
                    </span>
                  </span>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <SectionTitle icon={Megaphone}>Announcements</SectionTitle>
            <CardContent className="space-y-3">
              {mockAnnouncements.map((announcement) => (
                <article
                  key={announcement.id}
                  className="rounded-card border border-surface-border bg-surface-muted p-3"
                >
                  <h3 className="text-sm font-black text-navy-900">{announcement.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-navy-600">{announcement.body}</p>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-navy-400">
                    {formatRelativeTime(announcement.createdAt)}
                  </p>
                </article>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </AuthenticatedShell>
  );
}

export default function HomePage() {
  return (
    <RequireAuth>
      <HomeContent />
    </RequireAuth>
  );
}
