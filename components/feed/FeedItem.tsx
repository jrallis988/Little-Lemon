"use client";

import Link from "next/link";
import {
  Camera,
  Flag,
  Heart,
  MessageCircle,
  Music,
  Newspaper,
  Repeat2,
  Share2,
  UserPlus,
} from "lucide-react";

import type {
  FeedItem as FeedItemData,
  FeedItemType,
  Profile,
  StatusUpdate,
} from "@/lib/types";
import { cn, formatRelativeTime } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export type FeedEntry = FeedItemData | StatusUpdate;

export interface FeedItemProps {
  item: FeedEntry;
  author: Profile;
  targetProfile?: Profile;
  onReact?: (item: FeedEntry, emoji: string) => void;
  onComment?: (item: FeedEntry) => void;
  onShare?: (item: FeedEntry) => void;
  onReport?: (item: FeedEntry) => void;
  className?: string;
}

const typeIcons: Record<FeedItemType | "status_update", typeof MessageCircle> = {
  status: MessageCircle,
  status_update: MessageCircle,
  friendship: UserPlus,
  blog: Newspaper,
  photo: Camera,
  music: Music,
  comment: Repeat2,
};

function getType(item: FeedEntry): FeedItemType | "status_update" {
  return "type" in item ? item.type : "status_update";
}

function getVisibility(item: FeedEntry) {
  return "visibility" in item ? item.visibility : item.meta?.visibility;
}

export function FeedItem({
  item,
  author,
  targetProfile,
  onReact,
  onComment,
  onShare,
  onReport,
  className,
}: FeedItemProps) {
  const type = getType(item);
  const Icon = typeIcons[type];
  const visibility = getVisibility(item);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="space-y-3">
        <div className="flex gap-3">
          <Link href={`/profile/${author.username}`}>
            <Avatar
              name={author.displayName}
              src={author.avatarUrl}
              size="md"
              online={author.onlineStatus === "online"}
              showOnlineIndicator={author.showOnlineStatus}
            />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/profile/${author.username}`}
                className="font-bold text-navy-900 hover:text-brand"
              >
                {author.displayName}
              </Link>
              <Badge variant="info">
                <Icon className="h-3 w-3" aria-hidden />
                {type === "status_update" ? "status" : type}
              </Badge>
              {visibility ? <Badge>{visibility}</Badge> : null}
            </div>
            <p className="text-xs text-navy-500">
              @{author.username} · {formatRelativeTime(item.createdAt)}
              {targetProfile ? ` · with ${targetProfile.displayName}` : ""}
            </p>
          </div>
        </div>

        <p className="whitespace-pre-wrap text-sm leading-6 text-navy-800">
          {item.body}
        </p>

        {"meta" in item && item.meta ? (
          <div className="grid gap-2 rounded-card border border-surface-border bg-surface-muted p-3 text-xs text-navy-600 sm:grid-cols-2">
            {Object.entries(item.meta).map(([key, value]) => (
              <div key={key}>
                <span className="font-bold uppercase text-navy-500">{key}: </span>
                {value}
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-surface-border pt-3">
          <div className="flex gap-3 text-xs text-navy-500">
            <span>{item.reactionCount} reactions</span>
            <span>{item.commentCount} comments</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {onReact ? (
              <Button variant="ghost" size="sm" onClick={() => onReact(item, "heart")}>
                <Heart className="h-4 w-4" aria-hidden />
                React
              </Button>
            ) : null}
            {onComment ? (
              <Button variant="ghost" size="sm" onClick={() => onComment(item)}>
                <MessageCircle className="h-4 w-4" aria-hidden />
                Comment
              </Button>
            ) : null}
            {onShare ? (
              <Button variant="ghost" size="sm" onClick={() => onShare(item)}>
                <Share2 className="h-4 w-4" aria-hidden />
                Share
              </Button>
            ) : null}
            {onReport ? (
              <Button variant="ghost" size="sm" onClick={() => onReport(item)}>
                <Flag className="h-4 w-4" aria-hidden />
                Report
              </Button>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
