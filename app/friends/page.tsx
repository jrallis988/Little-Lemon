"use client";

import * as React from "react";
import { Ban, MessageSquare, Search, Star, Trash2, Users } from "lucide-react";
import { useRouter } from "next/navigation";

import { AuthenticatedShell } from "@/components/auth/AuthenticatedShell";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { FriendRequestCard } from "@/components/friends/FriendRequestCard";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth/AuthProvider";
import { mockApi } from "@/lib/mock/store";
import {
  friendProfiles,
  friendshipStatus,
  mutualFriendCount,
  profileByUserId,
  useMockStore,
} from "@/lib/mock/social";
import { formatRelativeTime } from "@/lib/utils";
import type { Friendship, Profile } from "@/lib/types";

export default function FriendsPage() {
  return (
    <RequireAuth>
      <AuthenticatedShell>
        <FriendsContent />
      </AuthenticatedShell>
    </RequireAuth>
  );
}

function FriendsContent() {
  const { user, profile } = useAuth();
  const state = useMockStore();
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [message, setMessage] = React.useState<string | null>(null);

  if (!user || !profile) return null;

  const incoming = state.friendships.filter(
    (friendship) => friendship.addresseeId === user.id && friendship.status === "pending"
  );
  const accepted = friendProfiles(state, user.id).filter(
    (friend) => !state.blockedIds.includes(friend.userId)
  );
  const acceptedFriendships = state.friendships.filter(
    (friendship) =>
      friendship.status === "accepted" &&
      (friendship.requesterId === user.id || friendship.addresseeId === user.id)
  );
  const recentlyAdded = [...acceptedFriendships]
    .sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 6)
    .map((friendship) =>
      profileByUserId(
        state.profiles,
        friendship.requesterId === user.id
          ? friendship.addresseeId
          : friendship.requesterId
      )
    )
    .filter((friend): friend is Profile => Boolean(friend));
  const filteredFriends = accepted.filter((friend) => {
    const query = search.toLowerCase().trim();
    if (!query) return true;
    return [friend.displayName, friend.username, friend.location, friend.bio]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(query));
  });
  const featuredIds = state.featuredFriends[profile.id] ?? [];

  const startConversation = (friend: Profile) => {
    const conversation = mockApi.startConversation(user.id, friend.userId);
    router.push(`/messages/${conversation.id}`);
  };

  const accept = (requester: Profile) => {
    const request = incoming.find((item) => item.requesterId === requester.userId);
    if (!request) return;
    mockApi.respondFriendRequest(request.id, user.id, true);
    setMessage(`${requester.displayName} is now your friend.`);
  };

  const decline = (requester: Profile) => {
    const request = incoming.find((item) => item.requesterId === requester.userId);
    if (!request) return;
    mockApi.respondFriendRequest(request.id, user.id, false);
    setMessage(`Declined ${requester.displayName}'s friend request.`);
  };

  const remove = (friend: Profile) => {
    mockApi.removeFriend(user.id, friend.userId);
    mockApi.updateFeaturedFriends(
      profile.id,
      featuredIds.filter((id) => id !== friend.id)
    );
    setMessage(`${friend.displayName} was removed from your friends.`);
  };

  const block = (friend: Profile) => {
    mockApi.blockUser(user.id, friend.userId);
    mockApi.updateFeaturedFriends(
      profile.id,
      featuredIds.filter((id) => id !== friend.id)
    );
    setMessage(`${friend.displayName} was blocked.`);
  };

  const toggleFeatured = (friend: Profile) => {
    const next = featuredIds.includes(friend.id)
      ? featuredIds.filter((id) => id !== friend.id)
      : [...featuredIds, friend.id].slice(0, profile.featuredFriendCount);
    mockApi.updateFeaturedFriends(profile.id, next);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Friends</h1>
          <p className="text-sm text-navy-600">
            Manage requests, friends, blocked members, and your featured grid.
          </p>
        </div>
        <Badge variant="info">{accepted.length} friends</Badge>
      </div>

      {message ? (
        <div className="rounded-card border border-brand/30 bg-brand-soft px-4 py-3 text-sm font-semibold text-brand-dark">
          {message}
        </div>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-lg font-black text-navy-900">Friend requests</h2>
        {incoming.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {incoming.map((request) => {
              const requester = profileByUserId(state.profiles, request.requesterId);
              if (!requester) return null;
              return (
                <FriendRequestCard
                  key={request.id}
                  requester={requester}
                  createdAt={request.createdAt}
                  mutualFriends={mutualFriendCount(
                    state.friendships,
                    user.id,
                    requester.userId
                  )}
                  onAccept={accept}
                  onDecline={decline}
                  onMessage={startConversation}
                />
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={Users}
            title="No pending requests"
            description="New friend requests will appear here."
          />
        )}
      </section>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <section className="space-y-3">
          <Card>
            <CardHeader>
              <CardTitle>All friends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Search friends"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Name, username, location..."
              />
              {filteredFriends.length ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {filteredFriends.map((friend) => (
                    <FriendRow
                      key={friend.id}
                      friend={friend}
                      friendship={findAcceptedFriendship(state.friendships, user.id, friend.userId)}
                      featured={featuredIds.includes(friend.id)}
                      mutualFriends={mutualFriendCount(
                        state.friendships,
                        user.id,
                        friend.userId
                      )}
                      onMessage={startConversation}
                      onRemove={remove}
                      onBlock={block}
                      onToggleFeatured={toggleFeatured}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Search}
                  title="No friends match that search"
                  description="Try a different name, location, or username."
                />
              )}
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently added</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentlyAdded.length ? (
                recentlyAdded.map((friend) => (
                  <ProfileCard
                    key={friend.id}
                    profile={friend}
                    friendshipStatus={friendshipStatus(
                      state.friendships,
                      user.id,
                      friend.userId
                    )}
                    onMessage={startConversation}
                  />
                ))
              ) : (
                <EmptyState
                  title="No recent friends"
                  description="Accepted friends will appear here."
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured friends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-navy-600">
                {featuredIds.length}/{profile.featuredFriendCount} selected for your
                profile.
              </p>
              {accepted.length ? (
                accepted.map((friend) => {
                  const selected = featuredIds.includes(friend.id);
                  return (
                    <button
                      key={friend.id}
                      type="button"
                      onClick={() => toggleFeatured(friend)}
                      className={`flex w-full items-center gap-2 rounded-card border p-2 text-left ${
                        selected
                          ? "border-brand bg-brand-soft"
                          : "border-surface-border bg-white"
                      }`}
                    >
                      <Avatar
                        name={friend.displayName}
                        src={friend.avatarUrl}
                        size="sm"
                      />
                      <span className="min-w-0 flex-1 truncate text-sm font-bold text-navy-900">
                        {friend.displayName}
                      </span>
                      {selected ? <Star className="h-4 w-4 text-brand" /> : null}
                    </button>
                  );
                })
              ) : (
                <EmptyState
                  title="No friends to feature"
                  description="Accept friend requests first."
                />
              )}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function FriendRow({
  friend,
  friendship,
  featured,
  mutualFriends,
  onMessage,
  onRemove,
  onBlock,
  onToggleFeatured,
}: {
  friend: Profile;
  friendship?: Friendship;
  featured: boolean;
  mutualFriends: number;
  onMessage: (friend: Profile) => void;
  onRemove: (friend: Profile) => void;
  onBlock: (friend: Profile) => void;
  onToggleFeatured: (friend: Profile) => void;
}) {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-3">
          <Avatar
            name={friend.displayName}
            src={friend.avatarUrl}
            size="lg"
            online={friend.onlineStatus === "online"}
            showOnlineIndicator={friend.showOnlineStatus}
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-navy-900">{friend.displayName}</h3>
              {featured ? <Badge variant="info">Featured</Badge> : null}
            </div>
            <p className="text-xs text-navy-500">@{friend.username}</p>
            {friendship ? (
              <p className="mt-1 text-xs text-navy-500">
                Friends since {formatRelativeTime(friendship.updatedAt)}
              </p>
            ) : null}
            <p className="text-xs text-navy-500">
              {mutualFriends} mutual friend{mutualFriends === 1 ? "" : "s"}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => onMessage(friend)}>
                <MessageSquare className="h-4 w-4" aria-hidden />
                Message
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onToggleFeatured(friend)}
              >
                <Star className="h-4 w-4" aria-hidden />
                {featured ? "Unfeature" : "Feature"}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => onRemove(friend)}>
                <Trash2 className="h-4 w-4" aria-hidden />
                Remove
              </Button>
              <Button size="sm" variant="danger" onClick={() => onBlock(friend)}>
                <Ban className="h-4 w-4" aria-hidden />
                Block
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function findAcceptedFriendship(
  friendships: Friendship[],
  userId: string,
  friendUserId: string
) {
  return friendships.find(
    (friendship) =>
      friendship.status === "accepted" &&
      ((friendship.requesterId === userId &&
        friendship.addresseeId === friendUserId) ||
        (friendship.requesterId === friendUserId &&
          friendship.addresseeId === userId))
  );
}
