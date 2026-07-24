"use client";

import { Activity } from "lucide-react";

import type { FeedItem as FeedItemData, Profile, StatusUpdate } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { FeedEntry, FeedItem } from "./FeedItem";

export interface ActivityFeedProps {
  items: Array<FeedItemData | StatusUpdate>;
  profiles: Record<string, Profile>;
  currentUser?: Profile;
  loading?: boolean;
  hasMore?: boolean;
  onReact?: (item: FeedEntry, emoji: string) => void;
  onComment?: (item: FeedEntry) => void;
  onShare?: (item: FeedEntry) => void;
  onReport?: (item: FeedEntry) => void;
  onLoadMore?: () => void;
  className?: string;
}

function findProfile(profiles: Record<string, Profile>, id: string) {
  return (
    profiles[id] ??
    Object.values(profiles).find(
      (profile) => profile.id === id || profile.userId === id
    )
  );
}

function actorId(item: FeedItemData | StatusUpdate) {
  return "actorId" in item ? item.actorId : item.authorId;
}

export function ActivityFeed({
  items,
  profiles,
  loading = false,
  hasMore = false,
  onReact,
  onComment,
  onShare,
  onReport,
  onLoadMore,
  className,
}: ActivityFeedProps) {
  if (loading && items.length === 0) {
    return (
      <div className={className}>
        <LoadingSkeleton className="h-32" />
        <LoadingSkeleton className="mt-3 h-32" />
        <LoadingSkeleton className="mt-3 h-32" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        className={className}
        icon={Activity}
        title="No activity yet"
        description="Updates from friends and profiles you follow will appear here."
      />
    );
  }

  return (
    <div className={className}>
      <div className="space-y-3">
        {items.map((item) => {
          const author = findProfile(profiles, actorId(item));
          const target =
            "targetId" in item && item.targetId
              ? findProfile(profiles, item.targetId)
              : undefined;

          if (!author) return null;

          return (
            <FeedItem
              key={item.id}
              item={item}
              author={author}
              targetProfile={target}
              onReact={onReact}
              onComment={onComment}
              onShare={onShare}
              onReport={onReport}
            />
          );
        })}
      </div>
      {hasMore && onLoadMore ? (
        <div className="mt-4 text-center">
          <Button variant="secondary" onClick={onLoadMore} isLoading={loading}>
            Load more updates
          </Button>
        </div>
      ) : null}
    </div>
  );
}
