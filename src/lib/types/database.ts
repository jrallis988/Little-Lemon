/** Supabase-ready database models for MyPlace */

export type Visibility = "public" | "friends" | "private";
export type FriendshipStatus = "pending" | "accepted" | "declined" | "blocked";
export type OnlineStatus = "online" | "away" | "offline";
export type ReportTargetType =
  | "profile"
  | "message"
  | "photo"
  | "comment"
  | "blog_post"
  | "blog_comment";
export type ReportStatus = "open" | "reviewing" | "resolved" | "dismissed";
export type ModerationStatus = "clean" | "flagged" | "hidden" | "removed";
export type NotificationType =
  | "friend_request"
  | "friend_accepted"
  | "message"
  | "profile_comment"
  | "photo_comment"
  | "blog_comment"
  | "reaction"
  | "mention";
export type FeedItemType =
  | "status"
  | "friendship"
  | "blog"
  | "photo"
  | "music"
  | "comment";
export type ReactionType = "like" | "heart" | "laugh" | "wow" | "sad";
export type ProfileLayout = "classic" | "wide" | "compact";
export type DisplayMode = "retro" | "modern";
export type BorderStyle = "solid" | "dashed" | "double" | "none";
export type MusicPlayerStyle = "classic" | "compact" | "card";

export interface User {
  id: string;
  email: string;
  username: string;
  created_at: string;
  updated_at: string;
  last_sign_in_at: string | null;
  is_active: boolean;
  deactivated_at: string | null;
}

export interface Profile {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  pronouns: string | null;
  bio: string | null;
  location: string | null;
  age: number | null;
  show_age: boolean;
  occupation: string | null;
  education: string | null;
  relationship_status: string | null;
  website: string | null;
  avatar_url: string | null;
  header_image_url: string | null;
  status_message: string | null;
  about_me: string | null;
  who_id_like_to_meet: string | null;
  interests: string[];
  music: string[];
  movies: string[];
  television: string[];
  books: string[];
  heroes: string[];
  favorite_music: string | null;
  online_status: OnlineStatus;
  last_active_at: string;
  profile_views: number;
  member_since: string;
  featured_friends_count: 4 | 8 | 12 | 16;
  field_visibility: Record<string, Visibility>;
  content_warning: string | null;
  moderation_status: ModerationStatus;
  onboarding_complete: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProfileTheme {
  id: string;
  profile_id: string;
  preset_name: string;
  background_color: string;
  background_image_url: string | null;
  background_repeat: "no-repeat" | "repeat" | "repeat-x" | "repeat-y";
  background_position: string;
  primary_color: string;
  secondary_color: string;
  text_color: string;
  link_color: string;
  heading_font: string;
  body_font: string;
  border_style: BorderStyle;
  card_transparency: number;
  header_image_url: string | null;
  layout: ProfileLayout;
  module_order: string[];
  music_player_style: MusicPlayerStyle;
  cursor_effect: boolean;
  stickers: ProfileSticker[];
  display_mode: DisplayMode;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProfileSticker {
  id: string;
  emoji: string;
  x: number;
  y: number;
  size: number;
}

export interface ProfileSection {
  id: string;
  profile_id: string;
  key: string;
  title: string;
  content: string | null;
  visible: boolean;
  sort_order: number;
}

export interface Friendship {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: FriendshipStatus;
  created_at: string;
  updated_at: string;
}

export interface FeaturedFriend {
  id: string;
  profile_id: string;
  friend_profile_id: string;
  position: number;
  created_at: string;
}

export interface StatusUpdate {
  id: string;
  profile_id: string;
  body: string;
  visibility: Visibility;
  moderation_status: ModerationStatus;
  created_at: string;
  updated_at: string;
}

export interface FeedItem {
  id: string;
  actor_id: string;
  type: FeedItemType;
  reference_id: string;
  body: string;
  metadata: Record<string, string>;
  visibility: Visibility;
  created_at: string;
}

export interface Conversation {
  id: string;
  created_at: string;
  updated_at: string;
  last_message_at: string | null;
}

export interface ConversationMember {
  id: string;
  conversation_id: string;
  profile_id: string;
  last_read_at: string | null;
  muted: boolean;
  joined_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  moderation_status: ModerationStatus;
  created_at: string;
  updated_at: string;
}

export interface Album {
  id: string;
  profile_id: string;
  title: string;
  description: string | null;
  visibility: Visibility;
  cover_photo_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Photo {
  id: string;
  album_id: string;
  profile_id: string;
  url: string;
  caption: string | null;
  visibility: Visibility;
  moderation_status: ModerationStatus;
  content_warning: string | null;
  sort_order: number;
  created_at: string;
}

export interface ProfileComment {
  id: string;
  profile_id: string;
  author_id: string;
  body: string;
  moderation_status: ModerationStatus;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  profile_id: string;
  title: string;
  body: string;
  mood: string | null;
  currently_listening: string | null;
  visibility: Visibility;
  moderation_status: ModerationStatus;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface BlogComment {
  id: string;
  post_id: string;
  author_id: string;
  body: string;
  moderation_status: ModerationStatus;
  created_at: string;
}

export interface PhotoComment {
  id: string;
  photo_id: string;
  author_id: string;
  body: string;
  moderation_status: ModerationStatus;
  created_at: string;
}

export interface MusicTrack {
  id: string;
  profile_id: string;
  title: string;
  artist: string;
  cover_url: string | null;
  audio_url: string;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface Playlist {
  id: string;
  profile_id: string;
  title: string;
  track_ids: string[];
  created_at: string;
}

export interface Notification {
  id: string;
  recipient_id: string;
  actor_id: string | null;
  type: NotificationType;
  title: string;
  body: string;
  link: string | null;
  read: boolean;
  created_at: string;
}

export interface Block {
  id: string;
  blocker_id: string;
  blocked_id: string;
  created_at: string;
}

export interface Mute {
  id: string;
  muter_id: string;
  muted_id: string;
  created_at: string;
}

export interface Report {
  id: string;
  reporter_id: string;
  target_type: ReportTargetType;
  target_id: string;
  reason: string;
  details: string | null;
  status: ReportStatus;
  created_at: string;
  updated_at: string;
}

export interface Reaction {
  id: string;
  actor_id: string;
  target_type: "status" | "comment" | "blog_post" | "photo" | "feed_item";
  target_id: string;
  reaction: ReactionType;
  created_at: string;
}

export interface PrivacySettings {
  profile_id: string;
  profile_visibility: Visibility;
  friend_requests_from: "everyone" | "friends_of_friends" | "nobody";
  messages_from: "everyone" | "friends" | "nobody";
  comments_from: "everyone" | "friends" | "nobody";
  photos_visibility: Visibility;
  show_online_status: boolean;
  email_notifications: boolean;
  push_notifications: boolean;
  notify_friend_requests: boolean;
  notify_messages: boolean;
  notify_comments: boolean;
  notify_reactions: boolean;
}

export interface AccountSettings {
  profile_id: string;
  email: string;
  display_name: string;
  username: string;
}
