"use client";

import {
  MapPin,
  MessageSquare,
  Pencil,
  Rss,
  ShieldCheck,
  Smile,
  UserPlus,
  Users,
} from "lucide-react";

import type { FriendshipStatus, Profile } from "@/lib/types";
import { cn, getAge } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface ProfileHeaderProps {
  profile: Profile;
  isOwnProfile?: boolean;
  friendshipStatus?: FriendshipStatus;
  isFollowing?: boolean;
  onAddFriend?: (profile: Profile) => void;
  onMessage?: (profile: Profile) => void;
  onFollow?: (profile: Profile) => void;
  onEditProfile?: (profile: Profile) => void;
  className?: string;
}

export function ProfileHeader({
  profile,
  isOwnProfile = false,
  friendshipStatus,
  isFollowing = false,
  onAddFriend,
  onMessage,
  onFollow,
  onEditProfile,
  className,
}: ProfileHeaderProps) {
  const age = profile.showAge ? getAge(profile.birthdate) : null;
  const isOnline =
    !profile.ghostMode && profile.showOnlineStatus && profile.onlineStatus === "online";
  const mood = profile.mood || "✨ creative";
  const isVerifiedStudent = profile.studentVerified ?? Boolean(profile.details.education);

  return (
    <section className={cn("vibe-card overflow-hidden p-5", className)}>
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
        <div className="relative shrink-0">
          <Avatar
            name={profile.displayName}
            src={profile.avatarUrl}
            size="xl"
            online={isOnline}
            showOnlineIndicator={!profile.ghostMode && profile.showOnlineStatus}
            className="border-4 border-white shadow-card"
          />
          {isVerifiedStudent ? (
            <span
              className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-accent text-white shadow-soft"
              title="Verified student"
            >
              <ShieldCheck className="h-4 w-4" aria-hidden />
              <span className="sr-only">Verified student</span>
            </span>
          ) : null}
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <h1 className="font-display text-3xl font-black tracking-tight text-navy-900">
              {profile.displayName}
              {age ? <span className="text-navy-500">, {age}</span> : null}
            </h1>
            <p className="mt-1 text-sm text-navy-500">@{profile.username}</p>
            {profile.location ? (
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-navy-500">
                <MapPin className="h-4 w-4 text-brand" aria-hidden />
                {profile.location}
              </p>
            ) : null}
          </div>

          {profile.statusMessage || profile.bio ? (
            <p className="font-script text-xl leading-snug text-navy-800 [font-family:var(--font-script)]">
              {profile.statusMessage || profile.bio}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <Badge className="border-accent/20 bg-accent-soft text-accent-dark">
              <Smile className="h-3 w-3" aria-hidden />
              Mood: {mood}
            </Badge>
            {isOnline ? <Badge variant="success">Online Now!</Badge> : null}
            <Badge className="border-brand/20 bg-brand-soft text-brand-dark">
              <Users className="h-3 w-3" aria-hidden />
              Friends: {profile.friendCount}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            {isOwnProfile && onEditProfile ? (
              <Button onClick={() => onEditProfile(profile)}>
                <Pencil className="h-4 w-4" aria-hidden />
                Edit Profile
              </Button>
            ) : null}
            {!isOwnProfile && onAddFriend ? (
              <Button
                variant="friend"
                onClick={() => onAddFriend(profile)}
                disabled={friendshipStatus === "pending" || friendshipStatus === "accepted"}
              >
                <UserPlus className="h-4 w-4" aria-hidden />
                {friendshipStatus === "accepted"
                  ? "Friends"
                  : friendshipStatus === "pending"
                    ? "Request Sent"
                    : "Add Friend"}
              </Button>
            ) : null}
            {!isOwnProfile && onMessage ? (
              <Button variant="secondary" onClick={() => onMessage(profile)}>
                <MessageSquare className="h-4 w-4" aria-hidden />
                Message
              </Button>
            ) : null}
            {!isOwnProfile && onFollow ? (
              <Button
                variant={isFollowing ? "secondary" : "ghost"}
                onClick={() => onFollow(profile)}
              >
                <Rss className="h-4 w-4" aria-hidden />
                {isFollowing ? "Following" : "Follow"}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
