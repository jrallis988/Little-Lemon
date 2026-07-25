/** Shared domain types for Vibe (Supabase-ready). */

export type Visibility = "public" | "friends" | "private";
export type FriendshipStatus = "pending" | "accepted" | "declined" | "blocked";
export type OnlineStatus = "online" | "away" | "offline";
export type ReportTargetType =
  | "profile"
  | "message"
  | "photo"
  | "comment"
  | "blog_post";
export type ReportStatus = "open" | "reviewed" | "resolved" | "dismissed";
export type NotificationType =
  | "friend_request"
  | "friend_accepted"
  | "message"
  | "profile_comment"
  | "photo_comment"
  | "blog_comment"
  | "reaction"
  | "mention";

export type ProfileThemePreset =
  | "classic-blue"
  | "midnight"
  | "bubblegum"
  | "grunge"
  | "pop-star"
  | "indie"
  | "goth"
  | "y2k"
  | "minimal"
  | "custom";

export type ProfileModuleId =
  | "about"
  | "details"
  | "music"
  | "photos"
  | "blog"
  | "friends"
  | "comments"
  | "interests";

export type BorderStyle = "solid" | "dashed" | "double" | "none";
export type LayoutMode = "classic" | "stacked" | "wide";
export type DisplayMode = "retro" | "modern";
export type MusicPlayerStyle = "compact" | "expanded" | "vinyl";
export type StudentVerificationMethod = "school_email" | "code" | "demo";

export interface UserAccount {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  isActive: boolean;
  moderationStatus: "ok" | "warned" | "restricted" | "banned";
}

export interface ProfileTheme {
  id: string;
  profileId: string;
  preset: ProfileThemePreset;
  backgroundColor: string;
  backgroundImage?: string;
  backgroundRepeat: "no-repeat" | "repeat" | "repeat-x" | "repeat-y";
  backgroundPosition: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  linkColor: string;
  headingFont: string;
  bodyFont: string;
  borderStyle: BorderStyle;
  cardTransparency: number; // 0–1
  headerImage?: string;
  layout: LayoutMode;
  moduleOrder: ProfileModuleId[];
  musicPlayerStyle: MusicPlayerStyle;
  cursorEffect: boolean;
  stickers: string[];
  displayMode: DisplayMode;
  updatedAt: string;
}

export interface ProfileDetails {
  aboutMe?: string;
  whoIdLikeToMeet?: string;
  generalInterests?: string;
  music?: string;
  movies?: string;
  television?: string;
  books?: string;
  heroes?: string;
  occupation?: string;
  education?: string;
  relationshipStatus?: string;
  website?: string;
  hiddenFields: string[];
}

export interface Profile {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  pronouns?: string;
  bio?: string;
  location?: string;
  birthdate?: string;
  showAge: boolean;
  avatarUrl?: string;
  coverUrl?: string;
  statusMessage?: string;
  onlineStatus: OnlineStatus;
  lastActiveAt: string;
  memberSince: string;
  profileViews: number;
  friendCount: number;
  interests: string[];
  favoriteMusic: string[];
  theme: ProfileTheme;
  details: ProfileDetails;
  featuredFriendCount: 4 | 8 | 12 | 16;
  visibility: Visibility;
  whoCanFriend: Visibility;
  whoCanMessage: Visibility;
  whoCanComment: Visibility;
  whoCanViewPhotos: Visibility;
  showOnlineStatus: boolean;
  onboardingComplete: boolean;
  schoolId?: string;
  schoolName?: string;
  grade?: string;
  studentVerified?: boolean;
  verificationMethod?: StudentVerificationMethod;
  ghostMode?: boolean;
  schoolOnlyBoundary?: boolean;
  mood?: string;
  hereFor?: string;
  hometown?: string;
  zodiac?: string;
  genderLabel?: string;
  clubs?: string[];
  interestMap?: Record<string, string[]>;
  nowPlaying?: { title: string; artist: string; externalUrl?: string };
}

export interface Friendship {
  id: string;
  requesterId: string;
  addresseeId: string;
  status: FriendshipStatus;
  createdAt: string;
  updatedAt: string;
}

export interface FeaturedFriend {
  id: string;
  profileId: string;
  friendProfileId: string;
  position: number;
}

export interface StatusUpdate {
  id: string;
  authorId: string;
  body: string;
  createdAt: string;
  visibility: Visibility;
  reactionCount: number;
  commentCount: number;
}

export type FeedItemType =
  | "status"
  | "friendship"
  | "blog"
  | "photo"
  | "music"
  | "comment";

export interface FeedItem {
  id: string;
  type: FeedItemType;
  actorId: string;
  targetId?: string;
  body: string;
  createdAt: string;
  reactionCount: number;
  commentCount: number;
  meta?: Record<string, string>;
}

export interface Conversation {
  id: string;
  createdAt: string;
  updatedAt: string;
  lastMessagePreview?: string;
  memberIds: string[];
}

export interface ConversationMember {
  id: string;
  conversationId: string;
  userId: string;
  lastReadAt?: string;
  muted: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  createdAt: string;
  readAt?: string;
}

export interface Album {
  id: string;
  profileId: string;
  title: string;
  description?: string;
  coverPhotoId?: string;
  visibility: Visibility;
  createdAt: string;
}

export interface Photo {
  id: string;
  albumId: string;
  profileId: string;
  url: string;
  caption?: string;
  visibility: Visibility;
  createdAt: string;
  commentCount: number;
}

export interface ProfileComment {
  id: string;
  profileId: string;
  authorId: string;
  body: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  authorId: string;
  title: string;
  body: string;
  mood?: string;
  currentlyListening?: string;
  visibility: Visibility;
  createdAt: string;
  updatedAt: string;
  commentCount: number;
}

export interface BlogComment {
  id: string;
  postId: string;
  authorId: string;
  body: string;
  createdAt: string;
}

export interface MusicTrack {
  id: string;
  profileId: string;
  title: string;
  artist: string;
  coverUrl?: string;
  audioUrl: string;
  isFeatured: boolean;
  position: number;
}

export interface Playlist {
  id: string;
  profileId: string;
  title: string;
  trackIds: string[];
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  href?: string;
  actorId?: string;
  read: boolean;
  createdAt: string;
}

export interface Block {
  id: string;
  blockerId: string;
  blockedId: string;
  createdAt: string;
}

export interface Report {
  id: string;
  reporterId: string;
  targetType: ReportTargetType;
  targetId: string;
  reason: string;
  details?: string;
  status: ReportStatus;
  createdAt: string;
}

export interface Reaction {
  id: string;
  userId: string;
  targetType: "status" | "feed" | "photo" | "blog" | "comment";
  targetId: string;
  emoji: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

export interface AuthSession {
  user: UserAccount;
  profile: Profile;
}

export type LoopFilter = "now" | "school" | "nearby" | "following";
export type VibeActivityCategory =
  | "skating"
  | "studying"
  | "basketball"
  | "gaming"
  | "gym"
  | "lunch"
  | "chilling"
  | "music"
  | "working"
  | "shopping"
  | "driving"
  | "other"
  | "soccer"
  | "photography";
export type VibeStatus = "live" | "starting_soon" | "ended";

export interface School {
  id: string;
  name: string;
  city: string;
  state: string;
}

export interface StudentVerification {
  userId: string;
  schoolId: string;
  grade: string;
  status: "pending" | "verified";
  method: "school_email" | "code" | "demo";
  verifiedAt?: string;
}

export interface VibeMoment {
  id: string;
  hostId: string;
  title: string;
  category: VibeActivityCategory;
  status: VibeStatus;
  coverUrl: string;
  locationName: string;
  distanceLabel?: string;
  schoolId?: string;
  startsAt: string;
  endsAt?: string;
  attendeeIds: string[];
  hereNowIds: string[];
  description?: string;
  updates: Array<{
    id: string;
    authorId: string;
    body: string;
    createdAt: string;
    photoUrl?: string;
  }>;
  visibility: "school" | "friends" | "public";
}

export interface CircleGroup {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  schoolId?: string;
  memberIds: string[];
  ownerId: string;
  visibility: "public" | "school" | "private";
  kind: "club" | "team" | "hangout" | "interest";
}

export interface PhotoSet {
  id: string;
  profileId: string;
  title: string;
  mood?: string;
  createdAt: string;
  caption?: string;
  photoUrls: string[];
  visibility: Visibility;
}

export interface InterestMap {
  [category: string]: string[];
}
