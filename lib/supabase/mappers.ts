import type {
  OnlineStatus,
  Profile,
  ProfileDetails,
  ProfileTheme,
  ProfileThemePreset,
  UserAccount,
  Visibility,
} from "@/lib/types";
import { createThemeFromPreset } from "@/lib/themes";

export type DbUserRow = {
  id: string;
  email: string;
  username: string;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
  is_active: boolean;
  moderation_status: UserAccount["moderationStatus"];
};

export type DbThemeRow = {
  id: string;
  profile_id: string;
  preset: string;
  background_color: string;
  background_image: string | null;
  background_repeat: ProfileTheme["backgroundRepeat"];
  background_position: string;
  primary_color: string;
  secondary_color: string;
  text_color: string;
  link_color: string;
  heading_font: string;
  body_font: string;
  border_style: ProfileTheme["borderStyle"];
  card_transparency: number;
  header_image: string | null;
  layout: ProfileTheme["layout"];
  module_order: string[];
  music_player_style: ProfileTheme["musicPlayerStyle"];
  cursor_effect: boolean;
  stickers: string[];
  display_mode: ProfileTheme["displayMode"];
  updated_at: string;
};

export type DbProfileRow = {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  pronouns: string | null;
  bio: string | null;
  location: string | null;
  birthdate: string | null;
  show_age: boolean;
  avatar_url: string | null;
  cover_url: string | null;
  status_message: string | null;
  online_status: OnlineStatus;
  last_active_at: string;
  member_since: string;
  profile_views: number;
  friend_count: number;
  interests: string[];
  favorite_music: string[];
  details: ProfileDetails | Record<string, unknown> | null;
  featured_friend_count: 4 | 8 | 12 | 16;
  visibility: Visibility;
  who_can_friend: Visibility;
  who_can_message: Visibility;
  who_can_comment: Visibility;
  who_can_view_photos: Visibility;
  show_online_status: boolean;
  onboarding_complete: boolean;
  school_id?: string | null;
  school_name?: string | null;
  grade?: string | null;
  student_verified?: boolean | null;
  verification_method?: Profile["verificationMethod"] | null;
  ghost_mode?: boolean | null;
  school_only_boundary?: boolean | null;
  mood?: string | null;
  here_for?: string | null;
  hometown?: string | null;
  zodiac?: string | null;
  gender_label?: string | null;
  clubs?: string[] | null;
  interest_map?: Record<string, string[]> | null;
  now_playing?: Profile["nowPlaying"] | null;
  profile_themes?: DbThemeRow | DbThemeRow[] | null;
};

function asDetails(value: DbProfileRow["details"]): ProfileDetails {
  if (value && typeof value === "object") {
    const details = value as ProfileDetails;
    return {
      ...details,
      hiddenFields: Array.isArray(details.hiddenFields)
        ? details.hiddenFields
        : [],
    };
  }
  return { hiddenFields: [] };
}

export function mapUserRow(row: DbUserRow): UserAccount {
  return {
    id: row.id,
    email: row.email,
    username: row.username,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    lastLoginAt: row.last_login_at || undefined,
    isActive: row.is_active,
    moderationStatus: row.moderation_status,
  };
}

export function mapThemeRow(
  row: DbThemeRow | null | undefined,
  profileId: string
): ProfileTheme {
  if (!row) {
    return createThemeFromPreset("classic-blue", profileId);
  }
  return {
    id: row.id,
    profileId: row.profile_id,
    preset: (row.preset as ProfileThemePreset) || "classic-blue",
    backgroundColor: row.background_color,
    backgroundImage: row.background_image || undefined,
    backgroundRepeat: row.background_repeat,
    backgroundPosition: row.background_position,
    primaryColor: row.primary_color,
    secondaryColor: row.secondary_color,
    textColor: row.text_color,
    linkColor: row.link_color,
    headingFont: row.heading_font,
    bodyFont: row.body_font,
    borderStyle: row.border_style,
    cardTransparency: Number(row.card_transparency),
    headerImage: row.header_image || undefined,
    layout: row.layout,
    moduleOrder: (row.module_order || []) as ProfileTheme["moduleOrder"],
    musicPlayerStyle: row.music_player_style,
    cursorEffect: row.cursor_effect,
    stickers: row.stickers || [],
    displayMode: row.display_mode,
    updatedAt: row.updated_at,
  };
}

export function mapProfileRow(row: DbProfileRow): Profile {
  const themeRaw = Array.isArray(row.profile_themes)
    ? row.profile_themes[0]
    : row.profile_themes;

  return {
    id: row.id,
    userId: row.user_id,
    username: row.username,
    displayName: row.display_name,
    pronouns: row.pronouns || undefined,
    bio: row.bio || undefined,
    location: row.location || undefined,
    birthdate: row.birthdate || undefined,
    showAge: row.show_age,
    avatarUrl: row.avatar_url || undefined,
    coverUrl: row.cover_url || undefined,
    statusMessage: row.status_message || undefined,
    onlineStatus: row.online_status,
    lastActiveAt: row.last_active_at,
    memberSince: row.member_since,
    profileViews: row.profile_views,
    friendCount: row.friend_count,
    interests: row.interests || [],
    favoriteMusic: row.favorite_music || [],
    theme: mapThemeRow(themeRaw, row.id),
    details: asDetails(row.details),
    featuredFriendCount: row.featured_friend_count,
    visibility: row.visibility,
    whoCanFriend: row.who_can_friend,
    whoCanMessage: row.who_can_message,
    whoCanComment: row.who_can_comment,
    whoCanViewPhotos: row.who_can_view_photos,
    showOnlineStatus: row.show_online_status,
    onboardingComplete: row.onboarding_complete,
    schoolId: row.school_id || undefined,
    schoolName: row.school_name || undefined,
    grade: row.grade || undefined,
    studentVerified: row.student_verified ?? undefined,
    verificationMethod: row.verification_method || undefined,
    ghostMode: row.ghost_mode ?? undefined,
    schoolOnlyBoundary: row.school_only_boundary ?? undefined,
    mood: row.mood || undefined,
    hereFor: row.here_for || undefined,
    hometown: row.hometown || undefined,
    zodiac: row.zodiac || undefined,
    genderLabel: row.gender_label || undefined,
    clubs: row.clubs || undefined,
    interestMap: row.interest_map || undefined,
    nowPlaying: row.now_playing || undefined,
  };
}

export function profilePatchToDb(patch: Partial<Profile>) {
  const row: Record<string, unknown> = {};
  if (patch.username !== undefined) row.username = patch.username;
  if (patch.displayName !== undefined) row.display_name = patch.displayName;
  if (patch.pronouns !== undefined) row.pronouns = patch.pronouns ?? null;
  if (patch.bio !== undefined) row.bio = patch.bio ?? null;
  if (patch.location !== undefined) row.location = patch.location ?? null;
  if (patch.birthdate !== undefined) row.birthdate = patch.birthdate ?? null;
  if (patch.showAge !== undefined) row.show_age = patch.showAge;
  if (patch.avatarUrl !== undefined) row.avatar_url = patch.avatarUrl ?? null;
  if (patch.coverUrl !== undefined) row.cover_url = patch.coverUrl ?? null;
  if (patch.statusMessage !== undefined) {
    row.status_message = patch.statusMessage ?? null;
  }
  if (patch.onlineStatus !== undefined) row.online_status = patch.onlineStatus;
  if (patch.interests !== undefined) row.interests = patch.interests;
  if (patch.favoriteMusic !== undefined) {
    row.favorite_music = patch.favoriteMusic;
  }
  if (patch.details !== undefined) row.details = patch.details;
  if (patch.featuredFriendCount !== undefined) {
    row.featured_friend_count = patch.featuredFriendCount;
  }
  if (patch.visibility !== undefined) row.visibility = patch.visibility;
  if (patch.whoCanFriend !== undefined) row.who_can_friend = patch.whoCanFriend;
  if (patch.whoCanMessage !== undefined) {
    row.who_can_message = patch.whoCanMessage;
  }
  if (patch.whoCanComment !== undefined) {
    row.who_can_comment = patch.whoCanComment;
  }
  if (patch.whoCanViewPhotos !== undefined) {
    row.who_can_view_photos = patch.whoCanViewPhotos;
  }
  if (patch.showOnlineStatus !== undefined) {
    row.show_online_status = patch.showOnlineStatus;
  }
  if (patch.onboardingComplete !== undefined) {
    row.onboarding_complete = patch.onboardingComplete;
  }
  if (patch.schoolId !== undefined) row.school_id = patch.schoolId ?? null;
  if (patch.schoolName !== undefined) row.school_name = patch.schoolName ?? null;
  if (patch.grade !== undefined) row.grade = patch.grade ?? null;
  if (patch.studentVerified !== undefined) {
    row.student_verified = patch.studentVerified;
  }
  if (patch.verificationMethod !== undefined) {
    row.verification_method = patch.verificationMethod ?? null;
  }
  if (patch.ghostMode !== undefined) row.ghost_mode = patch.ghostMode;
  if (patch.schoolOnlyBoundary !== undefined) {
    row.school_only_boundary = patch.schoolOnlyBoundary;
  }
  if (patch.mood !== undefined) row.mood = patch.mood ?? null;
  if (patch.hereFor !== undefined) row.here_for = patch.hereFor ?? null;
  if (patch.hometown !== undefined) row.hometown = patch.hometown ?? null;
  if (patch.zodiac !== undefined) row.zodiac = patch.zodiac ?? null;
  if (patch.genderLabel !== undefined) {
    row.gender_label = patch.genderLabel ?? null;
  }
  if (patch.clubs !== undefined) row.clubs = patch.clubs ?? null;
  if (patch.interestMap !== undefined) {
    row.interest_map = patch.interestMap ?? null;
  }
  if (patch.nowPlaying !== undefined) {
    row.now_playing = patch.nowPlaying ?? null;
  }
  row.updated_at = new Date().toISOString();
  return row;
}
