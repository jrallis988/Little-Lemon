"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import type { Profile } from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";

export interface FriendRequestCardProps {
  profile: Profile;
  onAccept: (profile: Profile) => void | Promise<void>;
  onDecline: (profile: Profile) => void | Promise<void>;
  isBusy?: boolean;
  className?: string;
}

export function FriendRequestCard({
  profile,
  onAccept,
  onDecline,
  isBusy = false,
  className,
}: FriendRequestCardProps) {
  return (
    <article className={cn("mp-card flex items-center gap-3 p-4", className)}>
      <Link href={`/profile/${profile.username}`} className="shrink-0">
        <Avatar profile={profile} size="lg" showOnline />
        <span className="sr-only">View profile for {profile.display_name}</span>
      </Link>

      <div className="min-w-0 flex-1">
        <Link
          href={`/profile/${profile.username}`}
          className="block truncate font-bold text-[#0f2744] hover:underline"
        >
          {profile.display_name}
        </Link>
        <p className="truncate text-sm text-[#5b6b7c]">@{profile.username}</p>
      </div>

      <div className="flex shrink-0 flex-wrap gap-2">
        <Button size="sm" onClick={() => onAccept(profile)} disabled={isBusy}>
          <Check className="h-4 w-4" aria-hidden="true" />
          Accept
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onDecline(profile)}
          disabled={isBusy}
        >
          <X className="h-4 w-4" aria-hidden="true" />
          Decline
        </Button>
      </div>
    </article>
  );
}

export default FriendRequestCard;
