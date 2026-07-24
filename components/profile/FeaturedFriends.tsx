"use client";

import Link from "next/link";

import type { Profile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export interface FeaturedFriendsProps {
  friends: Profile[];
  count?: 4 | 8 | 12 | 16;
  onSelectFriend?: (friend: Profile) => void;
  className?: string;
}

export function FeaturedFriends({
  friends,
  count = 8,
  onSelectFriend,
  className,
}: FeaturedFriendsProps) {
  const visibleFriends = friends.slice(0, count);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Featured Friends</CardTitle>
        <Badge>{visibleFriends.length}/{count}</Badge>
      </CardHeader>
      <CardContent>
        {visibleFriends.length > 0 ? (
          <div
            className={cn(
              "grid gap-3",
              count <= 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-4"
            )}
          >
            {visibleFriends.map((friend) => {
              const isOnline =
                friend.showOnlineStatus && friend.onlineStatus === "online";
              return (
                <Link
                  key={friend.id}
                  href={`/profile/${friend.username}`}
                  onClick={() => onSelectFriend?.(friend)}
                  className="group rounded-card border border-surface-border bg-surface-muted p-2 text-center transition hover:border-brand/50 hover:bg-brand-soft"
                >
                  <Avatar
                    name={friend.displayName}
                    src={friend.avatarUrl}
                    size="lg"
                    online={isOnline}
                    showOnlineIndicator={friend.showOnlineStatus}
                    className="mx-auto"
                  />
                  <span className="mt-2 block truncate text-sm font-bold text-navy-900 group-hover:text-brand">
                    {friend.displayName}
                  </span>
                  <span className="block truncate text-xs text-navy-500">
                    @{friend.username}
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="No featured friends yet"
            description="When friends are featured, they will appear in this tidy top-friends grid."
          />
        )}
      </CardContent>
    </Card>
  );
}
