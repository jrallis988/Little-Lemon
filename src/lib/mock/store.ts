"use client";

import {
  DEMO_ALBUMS,
  DEMO_BLOG_COMMENTS,
  DEMO_BLOG_POSTS,
  DEMO_BLOCKS,
  DEMO_CONVERSATION_MEMBERS,
  DEMO_CONVERSATIONS,
  DEMO_FEATURED_FRIENDS,
  DEMO_FEED,
  DEMO_FRIENDSHIPS,
  DEMO_MESSAGES,
  DEMO_NOTIFICATIONS,
  DEMO_PHOTOS,
  DEMO_PRIVACY,
  DEMO_PROFILE_COMMENTS,
  DEMO_PROFILES,
  DEMO_REACTIONS,
  DEMO_SESSION_USER_ID,
  DEMO_STATUS,
  DEMO_THEMES,
  DEMO_TRACKS,
  DEMO_USERS,
} from "@/lib/mock/data";
import type {
  BlogPost,
  Friendship,
  Message,
  Notification,
  PrivacySettings,
  Profile,
  ProfileComment,
  ProfileTheme,
  Reaction,
  StatusUpdate,
} from "@/lib/types/database";
import { createThemeForProfile } from "@/lib/themes/presets";
import { sanitizeTheme } from "@/lib/themes/sanitize";
import { USERNAME_PATTERN } from "@/lib/constants";

const STORAGE_KEY = "vibe-mock-store-v2";
const SESSION_KEY = "vibe-session-user";

export type MockStore = {
  users: typeof DEMO_USERS;
  profiles: Profile[];
  themes: ProfileTheme[];
  friendships: Friendship[];
  featuredFriends: typeof DEMO_FEATURED_FRIENDS;
  statusUpdates: StatusUpdate[];
  feed: typeof DEMO_FEED;
  conversations: typeof DEMO_CONVERSATIONS;
  conversationMembers: typeof DEMO_CONVERSATION_MEMBERS;
  messages: Message[];
  albums: typeof DEMO_ALBUMS;
  photos: typeof DEMO_PHOTOS;
  profileComments: ProfileComment[];
  blogPosts: BlogPost[];
  blogComments: typeof DEMO_BLOG_COMMENTS;
  tracks: typeof DEMO_TRACKS;
  notifications: Notification[];
  reactions: Reaction[];
  privacy: PrivacySettings[];
  blocks: typeof DEMO_BLOCKS;
  passwords: Record<string, string>;
};

function createInitialStore(): MockStore {
  return {
    users: structuredClone(DEMO_USERS),
    profiles: structuredClone(DEMO_PROFILES),
    themes: structuredClone(DEMO_THEMES),
    friendships: structuredClone(DEMO_FRIENDSHIPS),
    featuredFriends: structuredClone(DEMO_FEATURED_FRIENDS),
    statusUpdates: structuredClone(DEMO_STATUS),
    feed: structuredClone(DEMO_FEED),
    conversations: structuredClone(DEMO_CONVERSATIONS),
    conversationMembers: structuredClone(DEMO_CONVERSATION_MEMBERS),
    messages: structuredClone(DEMO_MESSAGES),
    albums: structuredClone(DEMO_ALBUMS),
    photos: structuredClone(DEMO_PHOTOS),
    profileComments: structuredClone(DEMO_PROFILE_COMMENTS),
    blogPosts: structuredClone(DEMO_BLOG_POSTS),
    blogComments: structuredClone(DEMO_BLOG_COMMENTS),
    tracks: structuredClone(DEMO_TRACKS),
    notifications: structuredClone(DEMO_NOTIFICATIONS),
    reactions: structuredClone(DEMO_REACTIONS),
    privacy: structuredClone(DEMO_PRIVACY),
    blocks: structuredClone(DEMO_BLOCKS),
    passwords: Object.fromEntries(DEMO_USERS.map((u) => [u.email, "demo1234"])),
  };
}

function loadStore(): MockStore {
  if (typeof window === "undefined") return createInitialStore();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialStore();
    return { ...createInitialStore(), ...JSON.parse(raw) } as MockStore;
  } catch {
    return createInitialStore();
  }
}

function saveStore(store: MockStore) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

let memoryStore: MockStore | null = null;

export function getStore(): MockStore {
  if (!memoryStore) memoryStore = loadStore();
  return memoryStore;
}

export function mutateStore(updater: (store: MockStore) => void): MockStore {
  const store = getStore();
  updater(store);
  saveStore(store);
  return store;
}

export function resetStore() {
  memoryStore = createInitialStore();
  saveStore(memoryStore);
  return memoryStore;
}

export function getSessionUserId(): string | null {
  if (typeof window === "undefined") return DEMO_SESSION_USER_ID;
  return localStorage.getItem(SESSION_KEY);
}

export function setSessionUserId(id: string | null) {
  if (typeof window === "undefined") return;
  if (id) localStorage.setItem(SESSION_KEY, id);
  else localStorage.removeItem(SESSION_KEY);
}

export function getProfileByUsername(username: string) {
  return getStore().profiles.find(
    (p) => p.username.toLowerCase() === username.toLowerCase()
  );
}

export function getProfileById(id: string) {
  return getStore().profiles.find((p) => p.id === id);
}

export function getThemeForProfile(profileId: string) {
  return (
    getStore().themes.find((t) => t.profile_id === profileId) ??
    createThemeForProfile(profileId)
  );
}

export function getFriends(profileId: string) {
  const store = getStore();
  return store.friendships
    .filter(
      (f) =>
        f.status === "accepted" &&
        (f.requester_id === profileId || f.addressee_id === profileId)
    )
    .map((f) =>
      f.requester_id === profileId ? f.addressee_id : f.requester_id
    )
    .map((id) => store.profiles.find((p) => p.id === id))
    .filter(Boolean) as Profile[];
}

export function getPendingRequests(profileId: string) {
  const store = getStore();
  return store.friendships
    .filter((f) => f.status === "pending" && f.addressee_id === profileId)
    .map((f) => ({
      friendship: f,
      requester: store.profiles.find((p) => p.id === f.requester_id)!,
    }))
    .filter((x) => x.requester);
}

export function getFriendshipBetween(a: string, b: string) {
  return getStore().friendships.find(
    (f) =>
      (f.requester_id === a && f.addressee_id === b) ||
      (f.requester_id === b && f.addressee_id === a)
  );
}

export function isUsernameAvailable(username: string, exceptUserId?: string) {
  if (!USERNAME_PATTERN.test(username)) return false;
  return !getStore().profiles.some(
    (p) =>
      p.username.toLowerCase() === username.toLowerCase() &&
      p.id !== exceptUserId
  );
}

export function loginWithPassword(email: string, password: string) {
  const store = getStore();
  const user = store.users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (!user) return { error: "No account found with that email." };
  if (store.passwords[user.email] !== password) {
    return { error: "Incorrect password." };
  }
  setSessionUserId(user.id);
  return { user, profile: getProfileById(user.id)! };
}

export function signupAccount(input: {
  email: string;
  password: string;
  username: string;
  display_name: string;
}) {
  const store = getStore();
  if (store.users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
    return { error: "An account with that email already exists." };
  }
  if (!isUsernameAvailable(input.username)) {
    return { error: "That username is unavailable." };
  }
  const id = `u${Date.now()}`;
  const now = new Date().toISOString();
  const user = {
    id,
    email: input.email,
    username: input.username,
    created_at: now,
    updated_at: now,
    last_sign_in_at: now,
    is_active: true,
    deactivated_at: null,
  };
  const profile: Profile = {
    id,
    user_id: id,
    username: input.username,
    display_name: input.display_name,
    pronouns: null,
    bio: null,
    location: null,
    age: null,
    show_age: false,
    occupation: null,
    education: null,
    relationship_status: null,
    website: null,
    avatar_url: `https://api.dicebear.com/7.x/lorelei/svg?seed=${input.username}`,
    header_image_url: null,
    status_message: "just joined Vibe — theme incoming",

    about_me: null,
    who_id_like_to_meet: null,
    interests: [],
    music: [],
    movies: [],
    television: [],
    books: [],
    heroes: [],
    favorite_music: null,
    online_status: "online",
    last_active_at: now,
    profile_views: 0,
    member_since: now,
    featured_friends_count: 8,
    field_visibility: {
      about_me: "public",
      who_id_like_to_meet: "public",
      interests: "public",
      music: "public",
      movies: "public",
      television: "public",
      books: "public",
      heroes: "public",
      occupation: "public",
      education: "public",
      relationship_status: "friends",
      website: "public",
      age: "public",
      location: "public",
    },
    content_warning: null,
    moderation_status: "clean",
    onboarding_complete: false,
    created_at: now,
    updated_at: now,
  };

  mutateStore((s) => {
    s.users.push(user);
    s.profiles.push(profile);
    s.themes.push(createThemeForProfile(id, "Classic Blue"));
    s.privacy.push({
      profile_id: id,
      profile_visibility: "public",
      friend_requests_from: "everyone",
      messages_from: "friends",
      comments_from: "friends",
      photos_visibility: "public",
      show_online_status: true,
      email_notifications: true,
      push_notifications: true,
      notify_friend_requests: true,
      notify_messages: true,
      notify_comments: true,
      notify_reactions: true,
    });
    s.passwords[input.email] = input.password;
  });
  setSessionUserId(id);
  return { user, profile };
}

export function logout() {
  setSessionUserId(null);
}

export function updateProfile(profileId: string, patch: Partial<Profile>) {
  mutateStore((s) => {
    const idx = s.profiles.findIndex((p) => p.id === profileId);
    if (idx >= 0) {
      s.profiles[idx] = {
        ...s.profiles[idx],
        ...patch,
        updated_at: new Date().toISOString(),
      };
    }
  });
  return getProfileById(profileId)!;
}

export function updateTheme(profileId: string, patch: Partial<ProfileTheme>) {
  mutateStore((s) => {
    const idx = s.themes.findIndex((t) => t.profile_id === profileId);
    if (idx >= 0) {
      s.themes[idx] = sanitizeTheme(patch, s.themes[idx]);
    }
  });
  return getThemeForProfile(profileId);
}

export function postStatus(profileId: string, body: string) {
  const now = new Date().toISOString();
  const status: StatusUpdate = {
    id: `st-${Date.now()}`,
    profile_id: profileId,
    body,
    visibility: "public",
    moderation_status: "clean",
    created_at: now,
    updated_at: now,
  };
  mutateStore((s) => {
    s.statusUpdates.unshift(status);
    s.feed.unshift({
      id: `fi-${Date.now()}`,
      actor_id: profileId,
      type: "status",
      reference_id: status.id,
      body,
      metadata: {},
      visibility: "public",
      created_at: now,
    });
    const p = s.profiles.find((x) => x.id === profileId);
    if (p) p.status_message = body;
  });
  return status;
}

export function sendFriendRequest(fromId: string, toId: string) {
  const existing = getFriendshipBetween(fromId, toId);
  if (existing) return { error: "A friendship record already exists.", friendship: existing };
  const now = new Date().toISOString();
  const friendship: Friendship = {
    id: `f-${Date.now()}`,
    requester_id: fromId,
    addressee_id: toId,
    status: "pending",
    created_at: now,
    updated_at: now,
  };
  mutateStore((s) => {
    s.friendships.push(friendship);
    s.notifications.unshift({
      id: `n-${Date.now()}`,
      recipient_id: toId,
      actor_id: fromId,
      type: "friend_request",
      title: "Friend request",
      body: `${getProfileById(fromId)?.display_name ?? "Someone"} wants to be friends`,
      link: "/friends",
      read: false,
      created_at: now,
    });
  });
  return { friendship };
}

export function respondFriendRequest(
  friendshipId: string,
  accept: boolean
) {
  mutateStore((s) => {
    const f = s.friendships.find((x) => x.id === friendshipId);
    if (!f) return;
    f.status = accept ? "accepted" : "declined";
    f.updated_at = new Date().toISOString();
    if (accept) {
      s.notifications.unshift({
        id: `n-${Date.now()}`,
        recipient_id: f.requester_id,
        actor_id: f.addressee_id,
        type: "friend_accepted",
        title: "Friend accepted",
        body: `${getProfileById(f.addressee_id)?.display_name ?? "Someone"} accepted your friend request`,
        link: `/profile/${getProfileById(f.addressee_id)?.username ?? ""}`,
        read: false,
        created_at: new Date().toISOString(),
      });
      s.feed.unshift({
        id: `fi-${Date.now()}`,
        actor_id: f.addressee_id,
        type: "friendship",
        reference_id: f.id,
        body: `is now friends with ${getProfileById(f.requester_id)?.display_name ?? "someone"}`,
        metadata: {},
        visibility: "public",
        created_at: new Date().toISOString(),
      });
    }
  });
}

export function removeFriend(a: string, b: string) {
  mutateStore((s) => {
    s.friendships = s.friendships.filter(
      (f) =>
        !(
          (f.requester_id === a && f.addressee_id === b) ||
          (f.requester_id === b && f.addressee_id === a)
        )
    );
    s.featuredFriends = s.featuredFriends.filter(
      (ff) =>
        !(
          (ff.profile_id === a && ff.friend_profile_id === b) ||
          (ff.profile_id === b && ff.friend_profile_id === a)
        )
    );
  });
}

export function blockUser(blockerId: string, blockedId: string) {
  mutateStore((s) => {
    s.blocks.push({
      id: `b-${Date.now()}`,
      blocker_id: blockerId,
      blocked_id: blockedId,
      created_at: new Date().toISOString(),
    });
    s.friendships = s.friendships.filter(
      (f) =>
        !(
          (f.requester_id === blockerId && f.addressee_id === blockedId) ||
          (f.requester_id === blockedId && f.addressee_id === blockerId)
        )
    );
  });
}

export function addProfileComment(profileId: string, authorId: string, body: string) {
  const comment: ProfileComment = {
    id: `pc-${Date.now()}`,
    profile_id: profileId,
    author_id: authorId,
    body,
    moderation_status: "clean",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mutateStore((s) => {
    s.profileComments.unshift(comment);
    if (profileId !== authorId) {
      s.notifications.unshift({
        id: `n-${Date.now()}`,
        recipient_id: profileId,
        actor_id: authorId,
        type: "profile_comment",
        title: "Profile comment",
        body: `${getProfileById(authorId)?.display_name ?? "Someone"} commented on your profile`,
        link: `/profile/${getProfileById(profileId)?.username ?? ""}`,
        read: false,
        created_at: new Date().toISOString(),
      });
    }
  });
  return comment;
}

export function deleteProfileComment(commentId: string, ownerId: string) {
  mutateStore((s) => {
    s.profileComments = s.profileComments.filter(
      (c) => !(c.id === commentId && c.profile_id === ownerId)
    );
  });
}

export function sendMessage(conversationId: string, senderId: string, body: string) {
  const now = new Date().toISOString();
  const message: Message = {
    id: `m-${Date.now()}`,
    conversation_id: conversationId,
    sender_id: senderId,
    body,
    moderation_status: "clean",
    created_at: now,
    updated_at: now,
  };
  mutateStore((s) => {
    s.messages.push(message);
    const convo = s.conversations.find((c) => c.id === conversationId);
    if (convo) {
      convo.last_message_at = now;
      convo.updated_at = now;
    }
    const members = s.conversationMembers.filter(
      (m) => m.conversation_id === conversationId && m.profile_id !== senderId
    );
    for (const m of members) {
      s.notifications.unshift({
        id: `n-${Date.now()}-${m.profile_id}`,
        recipient_id: m.profile_id,
        actor_id: senderId,
        type: "message",
        title: "New message",
        body: `${getProfileById(senderId)?.display_name ?? "Someone"} sent you a message`,
        link: `/messages/${conversationId}`,
        read: false,
        created_at: now,
      });
    }
  });
  return message;
}

export function markNotificationsRead(recipientId: string, ids?: string[]) {
  mutateStore((s) => {
    for (const n of s.notifications) {
      if (n.recipient_id !== recipientId) continue;
      if (!ids || ids.includes(n.id)) n.read = true;
    }
  });
}

export function toggleReaction(
  actorId: string,
  targetType: Reaction["target_type"],
  targetId: string,
  reaction: Reaction["reaction"] = "like"
) {
  mutateStore((s) => {
    const existing = s.reactions.find(
      (r) =>
        r.actor_id === actorId &&
        r.target_type === targetType &&
        r.target_id === targetId
    );
    if (existing) {
      s.reactions = s.reactions.filter((r) => r.id !== existing.id);
    } else {
      s.reactions.push({
        id: `r-${Date.now()}`,
        actor_id: actorId,
        target_type: targetType,
        target_id: targetId,
        reaction,
        created_at: new Date().toISOString(),
      });
    }
  });
}

export function updatePrivacy(profileId: string, patch: Partial<PrivacySettings>) {
  mutateStore((s) => {
    const idx = s.privacy.findIndex((p) => p.profile_id === profileId);
    if (idx >= 0) s.privacy[idx] = { ...s.privacy[idx], ...patch };
  });
}

export function setFeaturedFriends(profileId: string, friendIds: string[]) {
  mutateStore((s) => {
    s.featuredFriends = s.featuredFriends.filter((f) => f.profile_id !== profileId);
    friendIds.forEach((friendId, position) => {
      s.featuredFriends.push({
        id: `ff-${Date.now()}-${position}`,
        profile_id: profileId,
        friend_profile_id: friendId,
        position,
        created_at: new Date().toISOString(),
      });
    });
  });
}

export function getOrCreateConversation(a: string, b: string) {
  const store = getStore();
  const existing = store.conversations.find((c) => {
    const members = store.conversationMembers.filter(
      (m) => m.conversation_id === c.id
    );
    const ids = members.map((m) => m.profile_id);
    return ids.includes(a) && ids.includes(b) && ids.length === 2;
  });
  if (existing) return existing.id;
  const id = `c-${Date.now()}`;
  const now = new Date().toISOString();
  mutateStore((s) => {
    s.conversations.unshift({
      id,
      created_at: now,
      updated_at: now,
      last_message_at: null,
    });
    s.conversationMembers.push(
      {
        id: `cm-${Date.now()}-a`,
        conversation_id: id,
        profile_id: a,
        last_read_at: now,
        muted: false,
        joined_at: now,
      },
      {
        id: `cm-${Date.now()}-b`,
        conversation_id: id,
        profile_id: b,
        last_read_at: null,
        muted: false,
        joined_at: now,
      }
    );
  });
  return id;
}
