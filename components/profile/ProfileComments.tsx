"use client";

import * as React from "react";
import { Flag, MessageSquare, Trash2 } from "lucide-react";

import type { Profile, ProfileComment } from "@/lib/types";
import { formatRelativeTime } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Textarea } from "@/components/ui/Textarea";

export interface ProfileCommentsProps {
  comments: ProfileComment[];
  authors: Record<string, Profile>;
  currentUser?: Profile;
  isProfileOwner?: boolean;
  canComment?: boolean;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onSubmit?: (body: string) => void | Promise<void>;
  onDelete?: (comment: ProfileComment) => void;
  onReport?: (comment: ProfileComment) => void;
  onLoadMore?: () => void;
  title?: string;
  composerLabel?: string;
  composerPlaceholder?: string;
  submitLabel?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  showHeader?: boolean;
  className?: string;
}

export function ProfileComments({
  comments,
  authors,
  currentUser,
  isProfileOwner = false,
  canComment = true,
  hasMore = false,
  isLoadingMore = false,
  onSubmit,
  onDelete,
  onReport,
  onLoadMore,
  title = "Profile Comments",
  composerLabel = "Leave a comment",
  composerPlaceholder = "Say something neighborly...",
  submitLabel = "Post Comment",
  emptyTitle = "No comments yet",
  emptyDescription = "Be the first to leave a profile comment.",
  showHeader = true,
  className,
}: ProfileCommentsProps) {
  const [body, setBody] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = body.trim();
    if (!trimmed || !onSubmit) return;
    setSubmitting(true);
    try {
      await onSubmit(trimmed);
      setBody("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className={className}>
      {showHeader ? (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      ) : null}
      <CardContent className="space-y-4">
        {currentUser && canComment && onSubmit ? (
          <form onSubmit={submit} className="rounded-card border border-surface-border bg-surface-muted p-3">
            <div className="flex gap-3">
              <Avatar
                name={currentUser.displayName}
                src={currentUser.avatarUrl}
                size="sm"
              />
              <div className="flex-1 space-y-2">
                <Textarea
                  label={composerLabel}
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  maxLength={500}
                  rows={3}
                  placeholder={composerPlaceholder}
                />
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-navy-500">{body.length}/500</span>
                  <Button type="submit" size="sm" isLoading={submitting}>
                    {submitLabel}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        ) : null}

        {comments.length > 0 ? (
          <div className="space-y-3">
            {comments.map((comment) => {
              const author = authors[comment.authorId];
              const authorName = author?.displayName ?? "Unknown member";
              const canDelete =
                Boolean(onDelete) &&
                (isProfileOwner || comment.authorId === currentUser?.userId);

              return (
                <article
                  key={comment.id}
                  className="flex gap-3 rounded-card border border-surface-border bg-white p-3 shadow-soft"
                >
                  <Avatar
                    name={authorName}
                    src={author?.avatarUrl}
                    size="sm"
                    online={author?.onlineStatus === "online"}
                    showOnlineIndicator={author?.showOnlineStatus}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="font-bold text-navy-900">{authorName}</span>
                      {author ? (
                        <span className="text-xs text-navy-500">
                          @{author.username}
                        </span>
                      ) : null}
                      <span className="text-xs text-navy-400">
                        {formatRelativeTime(comment.createdAt)}
                      </span>
                    </div>
                    <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-navy-700">
                      {comment.body}
                    </p>
                    <div className="mt-2 flex gap-2">
                      {canDelete ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-700 hover:bg-red-50"
                          onClick={() => onDelete?.(comment)}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden />
                          Delete
                        </Button>
                      ) : null}
                      {onReport ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onReport(comment)}
                        >
                          <Flag className="h-4 w-4" aria-hidden />
                          Report
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={MessageSquare}
            title={emptyTitle}
            description={emptyDescription}
          />
        )}

        {hasMore && onLoadMore ? (
          <div className="text-center">
            <Button
              variant="secondary"
              onClick={onLoadMore}
              isLoading={isLoadingMore}
            >
              Load more comments
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
