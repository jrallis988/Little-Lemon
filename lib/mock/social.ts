"use client";

import { useSyncExternalStore } from "react";

import type { MockStoreState } from "./store";
import type {
  Friendship,
  FriendshipStatus,
  Profile,
  Visibility,
} from "@/lib/types";
import {
  getMockSnapshot,
  subscribeMockStore,
} from "@/lib/mock/store";

export function useMockStore() {
  return useSyncExternalStore(
    subscribeMockStore,
    getMockSnapshot,
    getMockSnapshot
  );
}

export function profileByUserId(profiles: Profile[], userId?: string) {
  return userId ? profiles.find((profile) => profile.userId === userId) : undefined;
}

export function profilesByUserId(profiles: Profile[]) {
  return Object.fromEntries(profiles.map((profile) => [profile.userId, profile]));
}

export function profilesById(profiles: Profile[]) {
  return Object.fromEntries(profiles.map((profile) => [profile.id, profile]));
}

export function friendshipBetween(
  friendships: Friendship[],
  a?: string,
  b?: string
) {
  if (!a || !b) return undefined;
  return friendships.find(
    (friendship) =>
      (friendship.requesterId === a && friendship.addresseeId === b) ||
      (friendship.requesterId === b && friendship.addresseeId === a)
  );
}

export function friendshipStatus(
  friendships: Friendship[],
  a?: string,
  b?: string
): FriendshipStatus | undefined {
  return friendshipBetween(friendships, a, b)?.status;
}

export function acceptedFriendUserIds(
  friendships: Friendship[],
  userId: string
) {
  return friendships
    .filter(
      (friendship) =>
        friendship.status === "accepted" &&
        (friendship.requesterId === userId || friendship.addresseeId === userId)
    )
    .map((friendship) =>
      friendship.requesterId === userId
        ? friendship.addresseeId
        : friendship.requesterId
    );
}

export function friendProfiles(state: MockStoreState, userId: string) {
  const ids = new Set(acceptedFriendUserIds(state.friendships, userId));
  return state.profiles.filter((profile) => ids.has(profile.userId));
}

export function mutualFriendCount(
  friendships: Friendship[],
  userId: string,
  otherUserId: string
) {
  const mine = new Set(acceptedFriendUserIds(friendships, userId));
  const theirs = new Set(acceptedFriendUserIds(friendships, otherUserId));
  return Array.from(mine).filter((id) => theirs.has(id)).length;
}

export function canViewVisibility(
  visibility: Visibility,
  isOwner: boolean,
  isFriend: boolean
) {
  if (isOwner || visibility === "public") return true;
  if (visibility === "friends") return isFriend;
  return false;
}

export function canInteractWithVisibility(
  visibility: Visibility,
  isSignedIn: boolean,
  isOwner: boolean,
  isFriend: boolean
) {
  if (!isSignedIn) return false;
  return canViewVisibility(visibility, isOwner, isFriend);
}

export function featuredProfilesFor(state: MockStoreState, profile: Profile) {
  const byId = profilesById(state.profiles);
  return (state.featuredFriends[profile.id] ?? [])
    .map((profileId) => byId[profileId])
    .filter((friend): friend is Profile => Boolean(friend));
}
