"use client";

import Link from "next/link";
import { BookOpen, MessageCircle, Music2, Smile } from "lucide-react";

import type { BlogPost, Profile } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export interface BlogPreviewProps {
  posts: BlogPost[];
  author?: Profile;
  getPostHref?: (post: BlogPost) => string;
  onReadPost?: (post: BlogPost) => void;
  limit?: number;
  className?: string;
}

function excerpt(body: string, maxLength = 180) {
  const compact = body.replace(/\s+/g, " ").trim();
  return compact.length > maxLength
    ? `${compact.slice(0, maxLength).trim()}...`
    : compact;
}

export function BlogPreview({
  posts,
  author,
  getPostHref = (post) => `/blog/${post.id}`,
  onReadPost,
  limit = 3,
  className,
}: BlogPreviewProps) {
  const visiblePosts = posts.slice(0, limit);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Latest Blog Posts</CardTitle>
        {author ? <Badge>@{author.username}</Badge> : null}
      </CardHeader>
      <CardContent>
        {visiblePosts.length > 0 ? (
          <div className="space-y-3">
            {visiblePosts.map((post) => (
              <article
                key={post.id}
                className="rounded-card border border-surface-border bg-surface-muted p-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={getPostHref(post)}
                    onClick={() => onReadPost?.(post)}
                    className="text-base font-bold text-navy-900 hover:text-brand"
                  >
                    {post.title}
                  </Link>
                  <Badge>{post.visibility}</Badge>
                </div>
                <p className="mt-1 text-xs text-navy-500">
                  Posted {formatDate(post.createdAt)}
                </p>
                <p className="mt-2 text-sm leading-6 text-navy-700">
                  {excerpt(post.body)}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-navy-500">
                  {post.mood ? (
                    <span className="inline-flex items-center gap-1">
                      <Smile className="h-3.5 w-3.5 text-brand" aria-hidden />
                      {post.mood}
                    </span>
                  ) : null}
                  {post.currentlyListening ? (
                    <span className="inline-flex items-center gap-1">
                      <Music2 className="h-3.5 w-3.5 text-brand" aria-hidden />
                      {post.currentlyListening}
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5 text-brand" aria-hidden />
                    {post.commentCount} comments
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={BookOpen}
            title="No blog posts yet"
            description="When this profile publishes a blog entry, it will be previewed here."
          />
        )}
      </CardContent>
    </Card>
  );
}
