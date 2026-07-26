"use client";

import { Newspaper } from "lucide-react";

import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import type {
  FeedItem as FeedItemModel,
  Profile,
} from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";
import { FeedItem } from "./FeedItem";

export interface ActivityFeedEntry {
  item: FeedItemModel;
  actor: Profile;
  reactionCount?: number;
  hasReacted?: boolean;
}

export interface ActivityFeedProps {
  items: ActivityFeedEntry[];
  loading?: boolean;
  onReact: (item: FeedItemModel) => void | Promise<void>;
  onComment?: (item: FeedItemModel) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

export function ActivityFeed({
  items,
  loading = false,
  onReact,
  onComment,
  emptyTitle = "No activity yet",
  emptyDescription = "Status updates, photos, blog posts, and friend activity will show up here.",
  className,
}: ActivityFeedProps) {
  if (loading) {
    return <LoadingSkeleton variant="feed" count={3} className={className} />;
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        icon={Newspaper}
        className={className}
      />
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {items.map(({ item, actor, reactionCount = 0, hasReacted = false }) => (
        <FeedItem
          key={item.id}
          item={item}
          actor={actor}
          reactionCount={reactionCount}
          hasReacted={hasReacted}
          onReact={onReact}
          onComment={onComment}
        />
      ))}
    </div>
  );
}

export default ActivityFeed;
