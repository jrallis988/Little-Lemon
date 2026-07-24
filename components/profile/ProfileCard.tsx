"use client";

import Link from "next/link";
import { MapPin, MessageSquare, UserPlus } from "lucide-react";

import type { FriendshipStatus, Profile } from "@/lib/types";
import { cn, formatRelativeTime, getAge } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export interface ProfileCardProps {
  profile: Profile;
  href?: string;
  friendshipStatus?: FriendshipStatus;
  onAddFriend?: (profile: Profile) => void;
  onMessage?: (profile: Profile) => void;
  className?: string;
}

export function ProfileCard({
  profile,
  href = `/profile/${profile.username}`,
  friendshipStatus,
  onAddFriend,
  onMessage,
  className,
}: ProfileCardProps) {
  const age = profile.showAge ? getAge(profile.birthdate) : null;
  const isOnline = profile.showOnlineStatus && profile.onlineStatus === "online";

  return (
    <Card interactive className={cn("overflow-hidden", className)}>
      {profile.coverUrl ? (
        <div className="h-16 border-b border-surface-border bg-brand-soft">
          <img
            src={profile.coverUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="h-16 border-b border-surface-border bg-[linear-gradient(135deg,#0c1624,#2b5a9e)]" />
      )}
      <CardContent className="-mt-8">
        <div className="flex items-end gap-3">
          <Avatar
            name={profile.displayName}
            src={profile.avatarUrl}
            size="lg"
            online={isOnline}
            showOnlineIndicator={profile.showOnlineStatus}
          />
          <div className="min-w-0 pb-1">
            <Link href={href} className="font-bold text-navy-900 hover:text-brand">
              {profile.displayName}
            </Link>
            <p className="truncate text-xs text-navy-500">@{profile.username}</p>
          </div>
        </div>

        <div className="mt-3 space-y-2 text-sm text-navy-700">
          {profile.statusMessage ? (
            <p className="line-clamp-2 rounded-card border border-surface-border bg-surface-muted px-3 py-2 text-xs italic">
              "{profile.statusMessage}"
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {profile.location ? (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                {profile.location}
              </span>
            ) : null}
            {age ? <span>{age} years old</span> : null}
            <Badge variant={isOnline ? "success" : "default"}>
              {isOnline ? "Online" : `Active ${formatRelativeTime(profile.lastActiveAt)}`}
            </Badge>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          {onAddFriend && friendshipStatus !== "accepted" ? (
            <Button size="sm" className="flex-1" onClick={() => onAddFriend(profile)}>
              <UserPlus className="h-4 w-4" aria-hidden />
              {friendshipStatus === "pending" ? "Pending" : "Add"}
            </Button>
          ) : null}
          {onMessage ? (
            <Button
              size="sm"
              variant="secondary"
              className="flex-1"
              onClick={() => onMessage(profile)}
            >
              <MessageSquare className="h-4 w-4" aria-hidden />
              Message
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
