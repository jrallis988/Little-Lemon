"use client";

import type { CSSProperties } from "react";

import { DEFAULT_MODULE_ORDER } from "@/lib/constants";
import { themeToCssVars } from "@/lib/themes/sanitize";
import type {
  Album,
  BlogPost,
  MusicTrack,
  Photo,
  Profile,
  ProfileComment,
  ProfileTheme,
} from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";

import BlogPreview from "./BlogPreview";
import FeaturedFriends from "./FeaturedFriends";
import PhotoGallery from "./PhotoGallery";
import ProfileComments from "./ProfileComments";
import ProfileDetails from "./ProfileDetails";
import ProfileHeader, { type ProfileFriendshipStatus } from "./ProfileHeader";
import ProfileMusicPlayer from "./ProfileMusicPlayer";

type ProfilePageViewProps = {
  profile: Profile;
  theme: ProfileTheme;
  tracks?: MusicTrack[];
  featuredFriendProfiles?: Profile[];
  albums?: Album[];
  photos?: Photo[];
  photoComments?: Record<string, ProfileComment[]>;
  blogPosts?: BlogPost[];
  comments?: ProfileComment[];
  commentAuthors?: Record<string, Profile>;
  isOwn: boolean;
  isFriend: boolean;
  friendshipStatus?: ProfileFriendshipStatus;
  className?: string;
  onAddFriend?: (profile: Profile) => void;
  onAcceptFriend?: (profile: Profile) => void;
  onMessage?: (profile: Profile) => void;
  onFollow?: (profile: Profile) => void;
  onAddComment?: (body: string) => void;
  onDeleteComment?: (comment: ProfileComment) => void;
  onReportComment?: (comment: ProfileComment) => void;
};

function normalizedModuleOrder(order: string[]) {
  const known = order.filter((moduleKey) =>
    DEFAULT_MODULE_ORDER.includes(moduleKey as (typeof DEFAULT_MODULE_ORDER)[number])
  );
  const missing = DEFAULT_MODULE_ORDER.filter((moduleKey) => !known.includes(moduleKey));
  return [...known, ...missing];
}

function layoutClass(layout: ProfileTheme["layout"]) {
  if (layout === "wide") return "grid gap-4 lg:grid-cols-2";
  if (layout === "compact") return "mx-auto grid max-w-3xl gap-4";
  return "grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]";
}

export function ProfilePageView({
  profile,
  theme,
  tracks = [],
  featuredFriendProfiles = [],
  albums = [],
  photos = [],
  photoComments = {},
  blogPosts = [],
  comments = [],
  commentAuthors = {},
  isOwn,
  isFriend,
  friendshipStatus = isOwn ? "self" : isFriend ? "friends" : "none",
  className,
  onAddFriend,
  onAcceptFriend,
  onMessage,
  onFollow,
  onAddComment,
  onDeleteComment,
  onReportComment,
}: ProfilePageViewProps) {
  const themedStyle: CSSProperties = {
    ...themeToCssVars(theme),
    cursor: theme.cursor_effect ? "crosshair" : undefined,
  };
  const headerProfile: Profile = {
    ...profile,
    header_image_url: theme.header_image_url ?? profile.header_image_url,
  };

  const renderModule = (moduleKey: string) => {
    switch (moduleKey) {
      case "about":
        return (
          <ProfileDetails
            key={moduleKey}
            profile={profile}
            isOwner={isOwn}
            isFriend={isFriend}
            variant="about"
          />
        );
      case "details":
        return (
          <ProfileDetails
            key={moduleKey}
            profile={profile}
            isOwner={isOwn}
            isFriend={isFriend}
            variant="details"
          />
        );
      case "music":
        return (
          <ProfileMusicPlayer
            key={moduleKey}
            tracks={tracks}
            style={theme.music_player_style}
          />
        );
      case "featured_friends":
        return (
          <FeaturedFriends
            key={moduleKey}
            friends={featuredFriendProfiles}
            featuredFriendsCount={profile.featured_friends_count}
          />
        );
      case "photos":
        return (
          <PhotoGallery
            key={moduleKey}
            albums={albums}
            photos={photos}
            photoComments={photoComments}
            commentAuthors={commentAuthors}
            isOwner={isOwn}
            isFriend={isFriend}
          />
        );
      case "blog":
        return (
          <BlogPreview
            key={moduleKey}
            posts={blogPosts}
            isOwner={isOwn}
            isFriend={isFriend}
          />
        );
      case "comments":
        return (
          <ProfileComments
            key={moduleKey}
            comments={comments}
            authors={commentAuthors}
            isOwner={isOwn}
            isFriend={isFriend}
            onSubmit={onAddComment}
            onDelete={onDeleteComment}
            onReport={onReportComment}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main
      className={cn(
        "profile-themed relative min-h-screen overflow-hidden px-3 py-5 sm:px-6",
        theme.display_mode,
        className
      )}
      style={themedStyle}
    >
      {theme.stickers.map((sticker) => (
        <span
          key={sticker.id}
          className="pointer-events-none absolute z-10 select-none"
          style={{
            left: `${sticker.x}%`,
            top: `${sticker.y}%`,
            fontSize: `${sticker.size}px`,
            transform: "translate(-50%, -50%)",
          }}
          aria-hidden="true"
        >
          {sticker.emoji}
        </span>
      ))}

      <div className="relative z-20 mx-auto max-w-6xl space-y-4">
        <ProfileHeader
          profile={headerProfile}
          isOwn={isOwn}
          friendshipStatus={friendshipStatus}
          onAddFriend={onAddFriend}
          onAcceptFriend={onAcceptFriend}
          onMessage={onMessage}
          onFollow={onFollow}
        />

        <div className={layoutClass(theme.layout)}>
          {normalizedModuleOrder(theme.module_order).map((moduleKey) => renderModule(moduleKey))}
        </div>
      </div>
    </main>
  );
}

export default ProfilePageView;
