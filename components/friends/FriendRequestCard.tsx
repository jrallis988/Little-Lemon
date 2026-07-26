"use client";

import { Check, MessageSquare, UserPlus, X } from "lucide-react";

import type { Profile } from "@/lib/types";
import { formatRelativeTime } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export interface FriendRequestCardProps {
  requester: Profile;
  createdAt: string;
  mutualFriends?: number;
  onAccept: (requester: Profile) => void;
  onDecline: (requester: Profile) => void;
  onMessage?: (requester: Profile) => void;
  className?: string;
}

export function FriendRequestCard({
  requester,
  createdAt,
  mutualFriends = 0,
  onAccept,
  onDecline,
  onMessage,
  className,
}: FriendRequestCardProps) {
  return (
    <Card className={className}>
      <CardContent>
        <div className="flex gap-3">
          <Avatar
            name={requester.displayName}
            src={requester.avatarUrl}
            size="lg"
            online={requester.onlineStatus === "online"}
            showOnlineIndicator={requester.showOnlineStatus}
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-navy-900">{requester.displayName}</h3>
              <Badge variant="info">
                <UserPlus className="h-3 w-3" aria-hidden />
                Friend request
              </Badge>
            </div>
            <p className="text-xs text-navy-500">
              @{requester.username} · {formatRelativeTime(createdAt)}
            </p>
            {requester.location ? (
              <p className="mt-1 text-sm text-navy-600">{requester.location}</p>
            ) : null}
            <p className="mt-1 text-xs text-navy-500">
              {mutualFriends} mutual friend{mutualFriends === 1 ? "" : "s"}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => onAccept(requester)}>
                <Check className="h-4 w-4" aria-hidden />
                Accept
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onDecline(requester)}
              >
                <X className="h-4 w-4" aria-hidden />
                Decline
              </Button>
              {onMessage ? (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onMessage(requester)}
                >
                  <MessageSquare className="h-4 w-4" aria-hidden />
                  Message
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
