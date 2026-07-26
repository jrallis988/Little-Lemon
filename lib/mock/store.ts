"use client";

import type {
  BlogPost,
  Conversation,
  FeedItem,
  Friendship,
  Message,
  Notification,
  Profile,
  ProfileComment,
  Report,
  ProfileTheme,
  StatusUpdate,
  UserAccount,
} from "../types";
import { createThemeFromPreset } from "../themes";
import { isValidUsername, slugifyUsername } from "../utils";
import {
  DEMO_PASSWORD,
  mockBlogPosts,
  mockConversations,
  mockFeedItems,
  mockFeaturedFriends,
  mockFriendships,
  mockMessages,
  mockNotifications,
  mockProfileComments,
  mockProfiles,
  mockStatusUpdates,
  mockUsers,
} from "./data";

const STORAGE_KEY = "vibe-mock-store-v4";

export interface MockStoreState {
  users: UserAccount[];
  profiles: Profile[];
  friendships: Friendship[];
  statusUpdates: StatusUpdate[];
  feedItems: FeedItem[];
  comments: ProfileComment[];
  blogPosts: BlogPost[];
  conversations: Conversation[];
  messages: Message[];
  notifications: Notification[];
  sessionUserId: string | null;
  blockedIds: string[];
  mutedIds: string[];
  featuredFriends: Record<string, string[]>;
  reports: Report[];
}

function seed(): MockStoreState {
  return {
    users: structuredClone(mockUsers),
    profiles: structuredClone(mockProfiles),
    friendships: structuredClone(mockFriendships),
    statusUpdates: structuredClone(mockStatusUpdates),
    feedItems: structuredClone(mockFeedItems),
    comments: structuredClone(mockProfileComments),
    blogPosts: structuredClone(mockBlogPosts),
    conversations: structuredClone(mockConversations),
    messages: structuredClone(mockMessages),
    notifications: structuredClone(mockNotifications),
    sessionUserId: null,
    blockedIds: [],
    mutedIds: [],
    featuredFriends: structuredClone(mockFeaturedFriends),
    reports: [],
  };
}

function load(): MockStoreState {
  if (typeof window === "undefined") return seed();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed();
    return { ...seed(), ...JSON.parse(raw) } as MockStoreState;
  } catch {
    return seed();
  }
}

function save(state: MockStoreState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let memory = seed();
let hydrated = false;

function getState(): MockStoreState {
  if (typeof window !== "undefined" && !hydrated) {
    memory = load();
    hydrated = true;
  }
  return memory;
}

function setState(next: MockStoreState) {
  memory = next;
  save(next);
  listeners.forEach((l) => l());
}

const listeners = new Set<() => void>();

export function subscribeMockStore(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getMockSnapshot() {
  return getState();
}

export const mockApi = {
  reset() {
    setState(seed());
  },

  getSessionUserId() {
    return getState().sessionUserId;
  },

  getProfileByUsername(username: string) {
    return getState().profiles.find(
      (p) => p.username.toLowerCase() === username.toLowerCase()
    );
  },

  getProfileByUserId(userId: string) {
    return getState().profiles.find((p) => p.userId === userId);
  },

  getProfileById(id: string) {
    return getState().profiles.find((p) => p.id === id);
  },

  getUserByEmail(email: string) {
    return getState().users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
  },

  isUsernameTaken(username: string, exceptUserId?: string) {
    return getState().profiles.some(
      (p) =>
        p.username.toLowerCase() === username.toLowerCase() &&
        p.userId !== exceptUserId
    );
  },

  login(email: string, password: string) {
    const user = this.getUserByEmail(email);
    if (!user || password !== DEMO_PASSWORD) {
      throw new Error("Invalid email or password. Demo password is demo1234.");
    }
    const state = getState();
    setState({ ...state, sessionUserId: user.id });
    return { user, profile: this.getProfileByUserId(user.id)! };
  },

  logout() {
    const state = getState();
    setState({ ...state, sessionUserId: null });
  },

  signup(input: {
    email: string;
    password: string;
    username: string;
    displayName: string;
  }) {
    if (input.password.length < 8) {
      throw new Error("Password must be at least 8 characters.");
    }
    const username = slugifyUsername(input.username);
    if (!isValidUsername(username)) {
      throw new Error(
        "Username must be 3–24 characters: lowercase letters, numbers, underscores."
      );
    }
    if (this.isUsernameTaken(username)) {
      throw new Error("That username is already taken.");
    }
    if (this.getUserByEmail(input.email)) {
      throw new Error("An account with that email already exists.");
    }
    const id = `u${Date.now()}`;
    const profileId = `p${Date.now()}`;
    const now = new Date().toISOString();
    const user: UserAccount = {
      id,
      email: input.email.toLowerCase(),
      username,
      createdAt: now,
      updatedAt: now,
      isActive: true,
      moderationStatus: "ok",
    };
    const profile: Profile = {
      id: profileId,
      userId: id,
      username,
      displayName: input.displayName.trim() || username,
      showAge: false,
      onlineStatus: "online",
      lastActiveAt: now,
      memberSince: now,
      profileViews: 0,
      friendCount: 0,
      interests: [],
      favoriteMusic: [],
      theme: createThemeFromPreset("classic-blue", profileId),
      details: {
        hiddenFields: [],
      },
      featuredFriendCount: 8,
      visibility: "public",
      whoCanFriend: "public",
      whoCanMessage: "friends",
      whoCanComment: "friends",
      whoCanViewPhotos: "public",
      showOnlineStatus: true,
      onboardingComplete: false,
      avatarUrl: `https://i.pravatar.cc/200?u=${id}`,
    };
    const state = getState();
    setState({
      ...state,
      users: [...state.users, user],
      profiles: [...state.profiles, profile],
      sessionUserId: id,
    });
    return { user, profile };
  },

  completeOnboarding(
    userId: string,
    data: Partial<Profile> & { themePreset?: Profile["theme"]["preset"] }
  ) {
    const state = getState();
    const profiles = state.profiles.map((p) => {
      if (p.userId !== userId) return p;
      const theme = data.themePreset
        ? createThemeFromPreset(data.themePreset, p.id)
        : p.theme;
      return {
        ...p,
        ...data,
        theme,
        onboardingComplete: true,
        username: data.username
          ? slugifyUsername(data.username)
          : p.username,
      };
    });
    const username = profiles.find((p) => p.userId === userId)?.username;
    const users = state.users.map((u) =>
      u.id === userId && username ? { ...u, username } : u
    );
    setState({ ...state, profiles, users });
    return profiles.find((p) => p.userId === userId)!;
  },

  updateProfile(userId: string, patch: Partial<Profile>) {
    const state = getState();
    if (patch.username) {
      const slug = slugifyUsername(patch.username);
      if (!isValidUsername(slug)) throw new Error("Invalid username.");
      if (this.isUsernameTaken(slug, userId)) {
        throw new Error("That username is already taken.");
      }
      patch.username = slug;
    }
    const profiles = state.profiles.map((p) =>
      p.userId === userId ? { ...p, ...patch } : p
    );
    const users = state.users.map((u) =>
      u.id === userId && patch.username
        ? { ...u, username: patch.username }
        : u
    );
    setState({ ...state, profiles, users });
    return profiles.find((p) => p.userId === userId)!;
  },

  updateTheme(userId: string, theme: ProfileTheme) {
    return this.updateProfile(userId, { theme });
  },

  updateFeaturedFriends(profileId: string, friendProfileIds: string[]) {
    const state = getState();
    setState({
      ...state,
      featuredFriends: {
        ...state.featuredFriends,
        [profileId]: Array.from(new Set(friendProfileIds)).slice(0, 16),
      },
    });
  },

  postStatus(userId: string, body: string) {
    const now = new Date().toISOString();
    const status: StatusUpdate = {
      id: `s${Date.now()}`,
      authorId: userId,
      body,
      createdAt: now,
      visibility: "public",
      reactionCount: 0,
      commentCount: 0,
    };
    const feed: FeedItem = {
      id: `fi${Date.now()}`,
      type: "status",
      actorId: userId,
      body,
      createdAt: now,
      reactionCount: 0,
      commentCount: 0,
    };
    const state = getState();
    setState({
      ...state,
      statusUpdates: [status, ...state.statusUpdates],
      feedItems: [feed, ...state.feedItems],
    });
    return status;
  },

  addProfileComment(profileId: string, authorId: string, body: string) {
    const comment: ProfileComment = {
      id: `pc${Date.now()}`,
      profileId,
      authorId,
      body,
      createdAt: new Date().toISOString(),
    };
    const state = getState();
    setState({ ...state, comments: [comment, ...state.comments] });
    return comment;
  },

  deleteProfileComment(commentId: string, requesterUserId: string) {
    const state = getState();
    const comment = state.comments.find((c) => c.id === commentId);
    if (!comment) return;
    const profile = state.profiles.find((p) => p.id === comment.profileId);
    if (
      comment.authorId !== requesterUserId &&
      profile?.userId !== requesterUserId
    ) {
      throw new Error("Not allowed to delete this comment.");
    }
    setState({
      ...state,
      comments: state.comments.filter((c) => c.id !== commentId),
    });
  },

  sendFriendRequest(fromUserId: string, toUserId: string) {
    const state = getState();
    const existing = state.friendships.find(
      (f) =>
        (f.requesterId === fromUserId && f.addresseeId === toUserId) ||
        (f.requesterId === toUserId && f.addresseeId === fromUserId)
    );
    if (existing?.status === "accepted") throw new Error("Already friends.");
    if (existing?.status === "pending") throw new Error("Request already pending.");
    const friendship: Friendship = {
      id: `f${Date.now()}`,
      requesterId: fromUserId,
      addresseeId: toUserId,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const target = this.getProfileByUserId(toUserId);
    const actor = this.getProfileByUserId(fromUserId);
    const notification: Notification = {
      id: `n${Date.now()}`,
      userId: toUserId,
      type: "friend_request",
      title: "Friend request",
      body: `${actor?.displayName || "Someone"} sent you a friend request.`,
      href: "/friends",
      actorId: fromUserId,
      read: false,
      createdAt: new Date().toISOString(),
    };
    setState({
      ...state,
      friendships: [...state.friendships, friendship],
      notifications: [notification, ...state.notifications],
    });
    void target;
    return friendship;
  },

  respondFriendRequest(
    friendshipId: string,
    userId: string,
    accept: boolean
  ) {
    const state = getState();
    const friendships = state.friendships.map((f) => {
      if (f.id !== friendshipId || f.addresseeId !== userId) return f;
      return {
        ...f,
        status: accept ? ("accepted" as const) : ("declined" as const),
        updatedAt: new Date().toISOString(),
      };
    });
    const f = friendships.find((x) => x.id === friendshipId);
    let notifications = state.notifications;
    let profiles = state.profiles;
    if (accept && f) {
      profiles = profiles.map((p) =>
        p.userId === f.requesterId || p.userId === f.addresseeId
          ? { ...p, friendCount: p.friendCount + 1 }
          : p
      );
      const accepter = this.getProfileByUserId(userId);
      notifications = [
        {
          id: `n${Date.now()}`,
          userId: f.requesterId,
          type: "friend_accepted",
          title: "Friend request accepted",
          body: `${accepter?.displayName || "Someone"} accepted your friend request.`,
          href: `/profile/${accepter?.username || ""}`,
          actorId: userId,
          read: false,
          createdAt: new Date().toISOString(),
        },
        ...notifications,
      ];
    }
    setState({ ...state, friendships, notifications, profiles });
  },

  removeFriend(userId: string, otherUserId: string) {
    const state = getState();
    const friendships = state.friendships.filter(
      (f) =>
        !(
          (f.requesterId === userId && f.addresseeId === otherUserId) ||
          (f.requesterId === otherUserId && f.addresseeId === userId)
        )
    );
    const profiles = state.profiles.map((p) =>
      p.userId === userId || p.userId === otherUserId
        ? { ...p, friendCount: Math.max(0, p.friendCount - 1) }
        : p
    );
    setState({ ...state, friendships, profiles });
  },

  areFriends(a: string, b: string) {
    return getState().friendships.some(
      (f) =>
        f.status === "accepted" &&
        ((f.requesterId === a && f.addresseeId === b) ||
          (f.requesterId === b && f.addresseeId === a))
    );
  },

  pendingIncoming(userId: string) {
    return getState().friendships.filter(
      (f) => f.addresseeId === userId && f.status === "pending"
    );
  },

  markNotificationsRead(userId: string, ids?: string[]) {
    const state = getState();
    const notifications = state.notifications.map((n) => {
      if (n.userId !== userId) return n;
      if (!ids || ids.includes(n.id)) return { ...n, read: true };
      return n;
    });
    setState({ ...state, notifications });
  },

  sendMessage(conversationId: string, senderId: string, body: string) {
    const now = new Date().toISOString();
    const message: Message = {
      id: `m${Date.now()}`,
      conversationId,
      senderId,
      body,
      createdAt: now,
    };
    const state = getState();
    const conversations = state.conversations.map((c) =>
      c.id === conversationId
        ? { ...c, updatedAt: now, lastMessagePreview: body }
        : c
    );
    const convo = conversations.find((c) => c.id === conversationId);
    const otherId = convo?.memberIds.find((id) => id !== senderId);
    let notifications = state.notifications;
    if (otherId) {
      const sender = this.getProfileByUserId(senderId);
      notifications = [
        {
          id: `n${Date.now()}`,
          userId: otherId,
          type: "message",
          title: "New message",
          body: `${sender?.displayName || "Someone"}: ${body.slice(0, 80)}`,
          href: `/messages/${conversationId}`,
          actorId: senderId,
          read: false,
          createdAt: now,
        },
        ...notifications,
      ];
    }
    setState({
      ...state,
      messages: [...state.messages, message],
      conversations,
      notifications,
    });
    return message;
  },

  deleteMessage(messageId: string, requesterUserId: string) {
    const state = getState();
    const message = state.messages.find((m) => m.id === messageId);
    if (!message || message.senderId !== requesterUserId) return;
    setState({
      ...state,
      messages: state.messages.filter((m) => m.id !== messageId),
    });
  },

  startConversation(userId: string, otherUserId: string) {
    const state = getState();
    const existing = state.conversations.find(
      (c) =>
        c.memberIds.includes(userId) && c.memberIds.includes(otherUserId)
    );
    if (existing) return existing;
    const conversation: Conversation = {
      id: `c${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      memberIds: [userId, otherUserId],
      lastMessagePreview: "",
    };
    setState({
      ...state,
      conversations: [conversation, ...state.conversations],
    });
    return conversation;
  },

  blockUser(blockerId: string, blockedId: string) {
    const state = getState();
    setState({
      ...state,
      blockedIds: Array.from(new Set([...state.blockedIds, blockedId])),
    });
    this.removeFriend(blockerId, blockedId);
  },

  unblockUser(blockedId: string) {
    const state = getState();
    setState({
      ...state,
      blockedIds: state.blockedIds.filter((id) => id !== blockedId),
    });
  },

  reportContent(input: {
    reporterId: string;
    targetType: Report["targetType"];
    targetId: string;
    reason: string;
    details?: string;
  }) {
    const report: Report = {
      id: `r${Date.now()}`,
      reporterId: input.reporterId,
      targetType: input.targetType,
      targetId: input.targetId,
      reason: input.reason,
      details: input.details,
      status: "open",
      createdAt: new Date().toISOString(),
    };
    const state = getState();
    setState({ ...state, reports: [report, ...state.reports] });
    return report;
  },

  deleteNotification(notificationId: string, userId: string) {
    const state = getState();
    setState({
      ...state,
      notifications: state.notifications.filter(
        (n) => n.id !== notificationId || n.userId !== userId
      ),
    });
  },

  muteUser(userId: string) {
    const state = getState();
    setState({
      ...state,
      mutedIds: Array.from(new Set([...state.mutedIds, userId])),
    });
  },

  reactToFeedItem(itemId: string) {
    const state = getState();
    const feedItems = state.feedItems.map((f) =>
      f.id === itemId ? { ...f, reactionCount: f.reactionCount + 1 } : f
    );
    setState({ ...state, feedItems });
  },
};
