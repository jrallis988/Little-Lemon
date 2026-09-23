import type {
  Friendship,
  Notification,
  Profile,
} from "@/lib/types";
import { mockApi, getMockSnapshot } from "@/lib/mock/store";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import {
  loadSocialData,
  supabaseBlockUser,
  supabaseMarkNotificationsRead,
  supabaseRemoveFriend,
  supabaseRespondFriendRequest,
  supabaseSendFriendRequest,
  supabaseUnblockUser,
  supabaseUpdateFeaturedFriends,
  type SocialData,
} from "@/lib/supabase/social-api";

export type { SocialData };

export function usingMockSocial() {
  return !isSupabaseConfigured();
}

export function getMockSocialData(): SocialData {
  const snap = getMockSnapshot();
  return {
    profiles: snap.profiles,
    friendships: snap.friendships,
    notifications: snap.notifications,
    blockedIds: snap.blockedIds,
    featuredFriends: snap.featuredFriends,
  };
}

export async function fetchSocialData(
  userId: string,
  profileId: string
): Promise<SocialData> {
  if (usingMockSocial()) return getMockSocialData();
  return loadSocialData(userId, profileId);
}

export const socialApi = {
  async sendFriendRequest(fromUserId: string, toUserId: string) {
    if (usingMockSocial()) return mockApi.sendFriendRequest(fromUserId, toUserId);
    return supabaseSendFriendRequest(fromUserId, toUserId);
  },

  async respondFriendRequest(
    friendshipId: string,
    userId: string,
    accept: boolean
  ) {
    if (usingMockSocial()) {
      mockApi.respondFriendRequest(friendshipId, userId, accept);
      return;
    }
    await supabaseRespondFriendRequest(friendshipId, userId, accept);
  },

  async removeFriend(userId: string, otherUserId: string) {
    if (usingMockSocial()) {
      mockApi.removeFriend(userId, otherUserId);
      return;
    }
    await supabaseRemoveFriend(userId, otherUserId);
  },

  async blockUser(blockerId: string, blockedId: string) {
    if (usingMockSocial()) {
      mockApi.blockUser(blockerId, blockedId);
      return;
    }
    await supabaseBlockUser(blockerId, blockedId);
  },

  async unblockUser(blockerId: string, blockedId: string) {
    if (usingMockSocial()) {
      mockApi.unblockUser(blockedId);
      return;
    }
    await supabaseUnblockUser(blockerId, blockedId);
  },

  async markNotificationsRead(userId: string, ids?: string[]) {
    if (usingMockSocial()) {
      mockApi.markNotificationsRead(userId, ids);
      return;
    }
    await supabaseMarkNotificationsRead(userId, ids);
  },

  async updateFeaturedFriends(profileId: string, friendProfileIds: string[]) {
    if (usingMockSocial()) {
      mockApi.updateFeaturedFriends(profileId, friendProfileIds);
      return;
    }
    await supabaseUpdateFeaturedFriends(profileId, friendProfileIds);
  },
};

export function unreadMessageCount(notifications: Notification[], userId: string) {
  const hrefs = new Set<string>();
  for (const notification of notifications) {
    if (
      notification.userId !== userId ||
      notification.type !== "message" ||
      notification.read ||
      !notification.href?.startsWith("/messages/")
    ) {
      continue;
    }
    hrefs.add(notification.href);
  }
  return hrefs.size;
}

export function unreadNonMessageCount(
  notifications: Notification[],
  userId: string
) {
  return notifications.filter(
    (notification) =>
      notification.userId === userId &&
      !notification.read &&
      notification.type !== "message"
  ).length;
}

export function friendProfilesFromData(data: SocialData, userId: string) {
  const ids = new Set(
    data.friendships
      .filter(
        (friendship) =>
          friendship.status === "accepted" &&
          (friendship.requesterId === userId || friendship.addresseeId === userId)
      )
      .map((friendship) =>
        friendship.requesterId === userId
          ? friendship.addresseeId
          : friendship.requesterId
      )
  );
  return data.profiles.filter((profile) => ids.has(profile.userId));
}

export function friendshipStatusFromData(
  friendships: Friendship[],
  a?: string,
  b?: string
) {
  if (!a || !b) return undefined;
  return friendships.find(
    (friendship) =>
      (friendship.requesterId === a && friendship.addresseeId === b) ||
      (friendship.requesterId === b && friendship.addresseeId === a)
  )?.status;
}

export function profileByUserIdFromData(profiles: Profile[], userId?: string) {
  return userId ? profiles.find((profile) => profile.userId === userId) : undefined;
}
