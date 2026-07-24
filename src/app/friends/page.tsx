"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth/context";
import {
  removeFriend,
  respondFriendRequest,
  setFeaturedFriends,
  updateProfile as updateProfileInStore,
} from "@/lib/mock/store";
import { FEATURED_FRIEND_OPTIONS } from "@/lib/constants";
import type { Profile } from "@/lib/types/database";
import {
  Card,
  LoadingCard,
  MyPlaceShell,
  ProfileListItem,
  SectionTitle,
  coerceFeaturedCount,
  friendsForProfile,
  pendingRequestsForProfile,
  profileById,
  useMockStoreState,
} from "@/app/_components/myplace-page-utils";

function FriendsContent() {
  const { profile, refresh: refreshAuth } = useAuth();
  const { store, refresh } = useMockStoreState();
  const [query, setQuery] = useState("");
  const [selectedCount, setSelectedCount] = useState<4 | 8 | 12 | 16>(8);
  const [selectedFeatured, setSelectedFeatured] = useState<string[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!store || !profile) return;
    setSelectedCount(profile.featured_friends_count);
    setSelectedFeatured(
      store.featuredFriends
        .filter((item) => item.profile_id === profile.id)
        .sort((a, b) => a.position - b.position)
        .map((item) => item.friend_profile_id)
    );
  }, [profile, store]);

  const data = useMemo(() => {
    if (!store || !profile) return null;
    const friends = friendsForProfile(store, profile.id);
    const filteredFriends = friends.filter((friend) => {
      const value = `${friend.display_name} ${friend.username} ${friend.location ?? ""}`.toLowerCase();
      return value.includes(query.toLowerCase());
    });
    const pending = pendingRequestsForProfile(store, profile.id);
    const friendIds = new Set(friends.map((friend) => friend.id));
    const mutuals = store.profiles
      .filter((candidate) => candidate.id !== profile.id && !friendIds.has(candidate.id))
      .map((candidate) => {
        const candidateFriendIds = new Set(friendsForProfile(store, candidate.id).map((friend) => friend.id));
        const mutualFriends = friends.filter((friend) => candidateFriendIds.has(friend.id));
        return { candidate, mutualFriends };
      })
      .filter((item) => item.mutualFriends.length > 0)
      .sort((a, b) => b.mutualFriends.length - a.mutualFriends.length);
    const recentlyAdded = store.friendships
      .filter(
        (friendship) =>
          friendship.status === "accepted" &&
          (friendship.requester_id === profile.id || friendship.addressee_id === profile.id)
      )
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 6)
      .map((friendship) =>
        profileById(
          store,
          friendship.requester_id === profile.id ? friendship.addressee_id : friendship.requester_id
        )
      )
      .filter((friend): friend is Profile => Boolean(friend));

    return { friends, filteredFriends, pending, mutuals, recentlyAdded };
  }, [profile, query, store]);

  function refreshAll(message: string) {
    refresh();
    refreshAuth();
    setStatus(message);
  }

  if (!profile || !store || !data) return <LoadingCard label="Loading friends..." />;

  return (
    <div className="space-y-5">
      <Card>
        <h1 className="text-3xl font-black text-[#0f2744]">Friends</h1>
        <p className="mt-2 text-sm text-[#5b6b7c]">
          Manage requests, browse your friends, and choose who appears on your profile.
        </p>
        {status ? <p className="mt-3 text-sm font-semibold text-[#1f7a4d]">{status}</p> : null}
      </Card>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <section className="space-y-5">
          <Card>
            <SectionTitle title={`Pending requests (${data.pending.length})`} />
            {data.pending.length === 0 ? (
              <p className="text-sm text-[#5b6b7c]">No friend requests waiting.</p>
            ) : (
              <div className="space-y-2">
                {data.pending.map(({ friendship, requester }) => (
                  <ProfileListItem
                    key={friendship.id}
                    profile={requester}
                    action={
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            respondFriendRequest(friendship.id, true);
                            refreshAll("Friend request accepted.");
                          }}
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            respondFriendRequest(friendship.id, false);
                            refreshAll("Friend request declined.");
                          }}
                        >
                          Decline
                        </Button>
                      </div>
                    }
                  />
                ))}
              </div>
            )}
          </Card>

          <Card>
            <SectionTitle title={`Friends list (${data.friends.length})`} />
            <Input
              id="friend-search"
              label="Search friends"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, username, or location"
            />
            <div className="mt-4 space-y-2">
              {data.filteredFriends.length === 0 ? (
                <p className="text-sm text-[#5b6b7c]">No friends match that search.</p>
              ) : (
                data.filteredFriends.map((friend) => (
                  <ProfileListItem
                    key={friend.id}
                    profile={friend}
                    meta={friend.location ?? undefined}
                    action={
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          removeFriend(profile.id, friend.id);
                          refreshAll(`${friend.display_name} removed from friends.`);
                        }}
                      >
                        Remove
                      </Button>
                    }
                  />
                ))
              )}
            </div>
          </Card>

          <Card>
            <SectionTitle title="Mutual friends" />
            {data.mutuals.length === 0 ? (
              <p className="text-sm text-[#5b6b7c]">No mutual friend suggestions right now.</p>
            ) : (
              <div className="space-y-2">
                {data.mutuals.slice(0, 6).map(({ candidate, mutualFriends }) => (
                  <ProfileListItem
                    key={candidate.id}
                    profile={candidate}
                    meta={`${mutualFriends.length} mutual: ${mutualFriends
                      .slice(0, 2)
                      .map((friend) => friend.display_name)
                      .join(", ")}`}
                  />
                ))}
              </div>
            )}
          </Card>
        </section>

        <aside className="space-y-5">
          <Card>
            <SectionTitle title="Featured friends" />
            <label
              htmlFor="featured-count"
              className="block text-xs font-semibold uppercase tracking-wide text-[#0f2744]"
            >
              Featured count
            </label>
            <select
              id="featured-count"
              value={selectedCount}
              onChange={(event) => {
                const next = coerceFeaturedCount(Number(event.target.value));
                setSelectedCount(next);
                setSelectedFeatured((items) => items.slice(0, next));
              }}
              className="mt-1.5 block w-full rounded border border-[#c5d0dc] bg-white p-2 text-sm"
            >
              {FEATURED_FRIEND_OPTIONS.map((count) => (
                <option key={count} value={count}>
                  {count} friends
                </option>
              ))}
            </select>
            <div className="mt-4 space-y-2">
              {data.friends.map((friend) => {
                const checked = selectedFeatured.includes(friend.id);
                return (
                  <label
                    key={friend.id}
                    className="flex items-center gap-2 rounded border border-[#c5d0dc] bg-white p-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(event) => {
                        if (event.target.checked) {
                          setSelectedFeatured((items) =>
                            items.includes(friend.id)
                              ? items
                              : [...items, friend.id].slice(0, selectedCount)
                          );
                        } else {
                          setSelectedFeatured((items) => items.filter((id) => id !== friend.id));
                        }
                      }}
                    />
                    {friend.display_name}
                  </label>
                );
              })}
            </div>
            <Button
              className="mt-4 w-full"
              onClick={() => {
                setFeaturedFriends(profile.id, selectedFeatured.slice(0, selectedCount));
                updateProfileInStore(profile.id, { featured_friends_count: selectedCount });
                refreshAll("Featured friends saved.");
              }}
            >
              Save featured friends
            </Button>
          </Card>

          <Card>
            <SectionTitle title="Recently added" />
            <div className="space-y-2">
              {data.recentlyAdded.map((friend) => (
                <ProfileListItem key={friend.id} profile={friend} />
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

export default function FriendsPage() {
  return (
    <MyPlaceShell>
      <FriendsContent />
    </MyPlaceShell>
  );
}
