import type {
  Friendship,
  FriendshipStatus,
  Notification,
  NotificationType,
  Profile,
} from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { mapProfileRow, type DbProfileRow } from "@/lib/supabase/mappers";

export type SocialData = {
  profiles: Profile[];
  friendships: Friendship[];
  notifications: Notification[];
  blockedIds: string[];
  featuredFriends: Record<string, string[]>;
};

function requireClient() {
  const client = createClient();
  if (!client) throw new Error("Supabase is not configured.");
  return client;
}

function mapFriendship(row: {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: FriendshipStatus;
  created_at: string;
  updated_at: string;
}): Friendship {
  return {
    id: row.id,
    requesterId: row.requester_id,
    addresseeId: row.addressee_id,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapNotification(row: {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string;
  href: string | null;
  actor_id: string | null;
  read: boolean;
  created_at: string;
}): Notification {
  return {
    id: row.id,
    userId: row.user_id,
    type: row.type as NotificationType,
    title: row.title,
    body: row.body,
    href: row.href || undefined,
    actorId: row.actor_id || undefined,
    read: row.read,
    createdAt: row.created_at,
  };
}

async function fetchProfilesByUserIds(userIds: string[]) {
  if (!userIds.length) return [] as Profile[];
  const supabase = requireClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*, profile_themes(*)")
    .in("user_id", userIds);
  if (error) throw new Error(error.message);
  return ((data || []) as DbProfileRow[]).map(mapProfileRow);
}

async function fetchPublicProfiles(limit = 40) {
  const supabase = requireClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*, profile_themes(*)")
    .eq("visibility", "public")
    .order("last_active_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return ((data || []) as DbProfileRow[]).map(mapProfileRow);
}

export async function loadSocialData(
  userId: string,
  profileId: string
): Promise<SocialData> {
  const supabase = requireClient();

  const [friendshipsRes, notificationsRes, blocksRes, featuredRes, publics] =
    await Promise.all([
      supabase
        .from("friendships")
        .select("*")
        .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`),
      supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false }),
      supabase.from("blocks").select("blocked_id").eq("blocker_id", userId),
      supabase
        .from("featured_friends")
        .select("friend_profile_id, position")
        .eq("profile_id", profileId)
        .order("position", { ascending: true }),
      fetchPublicProfiles(),
    ]);

  if (friendshipsRes.error) throw new Error(friendshipsRes.error.message);
  if (notificationsRes.error) throw new Error(notificationsRes.error.message);
  if (blocksRes.error) throw new Error(blocksRes.error.message);
  if (featuredRes.error) throw new Error(featuredRes.error.message);

  const friendships = (friendshipsRes.data || []).map(mapFriendship);
  const notifications = (notificationsRes.data || []).map(mapNotification);
  const blockedIds = (blocksRes.data || []).map(
    (row: { blocked_id: string }) => row.blocked_id
  );
  const featuredIds = (featuredRes.data || []).map(
    (row: { friend_profile_id: string }) => row.friend_profile_id
  );

  const relatedUserIds = new Set<string>([userId, ...blockedIds]);
  friendships.forEach((f) => {
    relatedUserIds.add(f.requesterId);
    relatedUserIds.add(f.addresseeId);
  });
  notifications.forEach((n) => {
    if (n.actorId) relatedUserIds.add(n.actorId);
  });

  const relatedProfiles = await fetchProfilesByUserIds([...relatedUserIds]);
  const byId = new Map(relatedProfiles.map((p) => [p.id, p]));
  publics.forEach((p) => byId.set(p.id, p));

  return {
    profiles: [...byId.values()],
    friendships,
    notifications,
    blockedIds,
    featuredFriends: { [profileId]: featuredIds },
  };
}

export async function supabaseSendFriendRequest(
  fromUserId: string,
  toUserId: string
) {
  const supabase = requireClient();
  const { data: existing } = await supabase
    .from("friendships")
    .select("*")
    .or(
      `and(requester_id.eq.${fromUserId},addressee_id.eq.${toUserId}),and(requester_id.eq.${toUserId},addressee_id.eq.${fromUserId})`
    )
    .maybeSingle();

  if (existing?.status === "accepted") throw new Error("Already friends.");
  if (existing?.status === "pending") throw new Error("Request already pending.");

  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("friendships")
    .insert({
      requester_id: fromUserId,
      addressee_id: toUserId,
      status: "pending",
      created_at: now,
      updated_at: now,
    })
    .select("*")
    .single();
  if (error) throw new Error(error.message);

  const { data: actor } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("user_id", fromUserId)
    .maybeSingle();

  await supabase.from("notifications").insert({
    user_id: toUserId,
    type: "friend_request",
    title: "Friend request",
    body: `${actor?.display_name || "Someone"} sent you a friend request.`,
    href: "/friends",
    actor_id: fromUserId,
    read: false,
  });

  return mapFriendship(data);
}

export async function supabaseRespondFriendRequest(
  friendshipId: string,
  userId: string,
  accept: boolean
) {
  const supabase = requireClient();
  const { data: friendship, error: fetchError } = await supabase
    .from("friendships")
    .select("*")
    .eq("id", friendshipId)
    .eq("addressee_id", userId)
    .maybeSingle();
  if (fetchError) throw new Error(fetchError.message);
  if (!friendship) throw new Error("Friend request not found.");

  const { error } = await supabase
    .from("friendships")
    .update({
      status: accept ? "accepted" : "declined",
      updated_at: new Date().toISOString(),
    })
    .eq("id", friendshipId);
  if (error) throw new Error(error.message);

  if (accept) {
    const ids = [friendship.requester_id, friendship.addressee_id];
    for (const id of ids) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("friend_count")
        .eq("user_id", id)
        .maybeSingle();
      if (profile) {
        await supabase
          .from("profiles")
          .update({ friend_count: (profile.friend_count || 0) + 1 })
          .eq("user_id", id);
      }
    }

    const { data: accepter } = await supabase
      .from("profiles")
      .select("display_name, username")
      .eq("user_id", userId)
      .maybeSingle();

    await supabase.from("notifications").insert({
      user_id: friendship.requester_id,
      type: "friend_accepted",
      title: "Friend request accepted",
      body: `${accepter?.display_name || "Someone"} accepted your friend request.`,
      href: accepter?.username ? `/profile/${accepter.username}` : "/friends",
      actor_id: userId,
      read: false,
    });
  }
}

export async function supabaseRemoveFriend(userId: string, otherUserId: string) {
  const supabase = requireClient();
  const { data: rows } = await supabase
    .from("friendships")
    .select("id")
    .or(
      `and(requester_id.eq.${userId},addressee_id.eq.${otherUserId}),and(requester_id.eq.${otherUserId},addressee_id.eq.${userId})`
    );

  if (rows?.length) {
    await supabase
      .from("friendships")
      .delete()
      .in(
        "id",
        rows.map((row: { id: string }) => row.id)
      );
  }

  for (const id of [userId, otherUserId]) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("friend_count")
      .eq("user_id", id)
      .maybeSingle();
    if (profile) {
      await supabase
        .from("profiles")
        .update({ friend_count: Math.max(0, (profile.friend_count || 0) - 1) })
        .eq("user_id", id);
    }
  }
}

export async function supabaseBlockUser(blockerId: string, blockedId: string) {
  const supabase = requireClient();
  await supabaseRemoveFriend(blockerId, blockedId);
  const { error } = await supabase.from("blocks").upsert(
    {
      blocker_id: blockerId,
      blocked_id: blockedId,
    },
    { onConflict: "blocker_id,blocked_id" }
  );
  if (error) throw new Error(error.message);
}

export async function supabaseUnblockUser(blockerId: string, blockedId: string) {
  const supabase = requireClient();
  const { error } = await supabase
    .from("blocks")
    .delete()
    .eq("blocker_id", blockerId)
    .eq("blocked_id", blockedId);
  if (error) throw new Error(error.message);
}

export async function supabaseMarkNotificationsRead(
  userId: string,
  ids?: string[]
) {
  const supabase = requireClient();
  let query = supabase
    .from("notifications")
    .update({ read: true })
    .eq("user_id", userId)
    .eq("read", false);
  if (ids?.length) query = query.in("id", ids);
  const { error } = await query;
  if (error) throw new Error(error.message);
}

export async function supabaseUpdateFeaturedFriends(
  profileId: string,
  friendProfileIds: string[]
) {
  const supabase = requireClient();
  const unique = Array.from(new Set(friendProfileIds)).slice(0, 16);
  const { error: delError } = await supabase
    .from("featured_friends")
    .delete()
    .eq("profile_id", profileId);
  if (delError) throw new Error(delError.message);

  if (!unique.length) return;

  const rows = unique.map((friendProfileId, position) => ({
    profile_id: profileId,
    friend_profile_id: friendProfileId,
    position,
  }));
  const { error } = await supabase.from("featured_friends").insert(rows);
  if (error) throw new Error(error.message);
}
