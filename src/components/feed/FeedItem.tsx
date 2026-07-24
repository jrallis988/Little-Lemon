"use client";

import Link from "next/link";
import {
  BookOpen,
  Camera,
  Heart,
  MessageCircle,
  MessageSquare,
  Music,
  UserPlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import type {
  FeedItem as FeedItemModel,
  FeedItemType,
  Profile,
} from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";
import { formatRelative } from "@/lib/utils/format";

const typeMeta: Record<
  FeedItemType,
  { label: string; icon: LucideIcon; className: string }
> = {
  status: {
    label: "Status",
    icon: MessageSquare,
    className: "border-[#3b6ea5] bg-[#d7e4f3] text-[#0f2744]",
  },
  friendship: {
    label: "Friends",
    icon: UserPlus,
    className: "border-[#1f7a4d] bg-emerald-50 text-[#1f7a4d]",
  },
  blog: {
    label: "Blog",
    icon: BookOpen,
    className: "border-[#7c3aed] bg-violet-50 text-[#5b21b6]",
  },
  photo: {
    label: "Photo",
    icon: Camera,
    className: "border-[#a15c00] bg-amber-50 text-[#8a4d00]",
  },
  music: {
    label: "Music",
    icon: Music,
    className: "border-[#db2777] bg-pink-50 text-[#be185d]",
  },
  comment: {
    label: "Comment",
    icon: MessageCircle,
    className: "border-[#475569] bg-slate-50 text-[#334155]",
  },
};

export interface FeedItemProps {
  item: FeedItemModel;
  actor: Profile;
  reactionCount: number;
  hasReacted: boolean;
  onReact: (item: FeedItemModel) => void | Promise<void>;
  onComment?: (item: FeedItemModel) => void;
  className?: string;
}

export function FeedItem({
  item,
  actor,
  reactionCount,
  hasReacted,
  onReact,
  onComment,
  className,
}: FeedItemProps) {
  const meta = typeMeta[item.type];
  const TypeIcon = meta.icon;
  const relativeTime = formatRelative(item.created_at);

  return (
    <article className={cn("mp-card p-4", className)}>
      <div className="flex gap-3">
        <Link href={`/profile/${actor.username}`} className="shrink-0">
          <Avatar profile={actor} size="md" showOnline />
          <span className="sr-only">View profile for {actor.display_name}</span>
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <Link
                href={`/profile/${actor.username}`}
                className="font-bold text-[#0f2744] hover:underline"
              >
                {actor.display_name}
              </Link>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#5b6b7c]">
                <Link href={`/profile/${actor.username}`} className="hover:underline">
                  @{actor.username}
                </Link>
                {relativeTime ? <span>{relativeTime}</span> : null}
              </div>
            </div>

            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-bold",
                meta.className
              )}
            >
              <TypeIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {meta.label}
            </span>
          </div>

          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[#1a2332]">
            {item.body}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#c5d0dc] pt-3">
            <Button
              variant={hasReacted ? "primary" : "secondary"}
              size="sm"
              onClick={() => onReact(item)}
              aria-pressed={hasReacted}
            >
              <Heart
                className={cn("h-4 w-4", hasReacted ? "fill-current" : undefined)}
                aria-hidden="true"
              />
              {reactionCount}
            </Button>

            {onComment ? (
              <Button variant="ghost" size="sm" onClick={() => onComment(item)}>
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Comment
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export default FeedItem;
