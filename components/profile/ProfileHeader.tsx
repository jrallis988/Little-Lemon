"use client";

import {
  CalendarDays,
  Eye,
  MapPin,
  MessageSquare,
  Pencil,
  Rss,
  UserPlus,
} from "lucide-react";

import type { FriendshipStatus, Profile } from "@/lib/types";
import {
  cn,
  formatDate,
  formatRelativeTime,
  getAge,
} from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

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
  const isOnline = profile.showOnlineStatus && profile.onlineStatus === "online";

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="relative h-40 border-b border-surface-border bg-[linear-gradient(135deg,#0c1624,#2b5a9e)] sm:h-52">
        {profile.coverUrl ? (
          <img
            src={profile.coverUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end gap-4">
          <Avatar
            name={profile.displayName}
            src={profile.avatarUrl}
            size="xl"
            online={isOnline}
            showOnlineIndicator={profile.showOnlineStatus}
            className="border-2 border-white"
          />
          <div className="min-w-0 pb-1 text-white">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-2xl font-black tracking-tight">
                {profile.displayName}
              </h1>
              {profile.pronouns ? (
                <Badge className="border-white/25 bg-white/90 text-navy-800">
                  {profile.pronouns}
                </Badge>
              ) : null}
            </div>
            <p className="text-sm text-navy-100">@{profile.username}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[1fr_auto]">
        <div className="space-y-3">
          {profile.statusMessage ? (
            <p className="rounded-card border border-surface-border bg-surface-muted px-3 py-2 text-sm italic text-navy-800">
              "{profile.statusMessage}"
            </p>
          ) : null}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-navy-600">
            {profile.location ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-brand" aria-hidden />
                {profile.location}
              </span>
            ) : null}
            {age ? <span>{age} years old</span> : null}
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-brand" aria-hidden />
              Member since {formatDate(profile.memberSince)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Eye className="h-4 w-4 text-brand" aria-hidden />
              {profile.profileViews.toLocaleString()} views
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Badge variant={isOnline ? "success" : "default"}>
              {isOnline ? "Online now" : `${profile.onlineStatus}`}
            </Badge>
            <span className="text-navy-500">
              Last active {formatRelativeTime(profile.lastActiveAt)}
            </span>
            <span className="text-navy-500">
              {profile.friendCount.toLocaleString()} friends
            </span>
          </div>
          {profile.bio ? (
            <p className="max-w-3xl text-sm leading-6 text-navy-700">{profile.bio}</p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-start gap-2 lg:w-52 lg:flex-col">
          {isOwnProfile && onEditProfile ? (
            <Button className="w-full" onClick={() => onEditProfile(profile)}>
              <Pencil className="h-4 w-4" aria-hidden />
              Edit Profile
            </Button>
          ) : null}
          {!isOwnProfile && onAddFriend ? (
            <Button
              className="w-full"
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
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => onMessage(profile)}
            >
              <MessageSquare className="h-4 w-4" aria-hidden />
              Message
            </Button>
          ) : null}
          {!isOwnProfile && onFollow ? (
            <Button
              className="w-full"
              variant={isFollowing ? "secondary" : "ghost"}
              onClick={() => onFollow(profile)}
            >
              <Rss className="h-4 w-4" aria-hidden />
              {isFollowing ? "Following" : "Follow"}
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
