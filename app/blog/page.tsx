"use client";

import * as React from "react";
import Link from "next/link";
import { MessageCircle, Music2, Smile } from "lucide-react";

import { AuthenticatedShell } from "@/components/auth/AuthenticatedShell";
import { Logo } from "@/components/brand/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { useAuth } from "@/lib/auth/AuthProvider";
import { profileByUserId, useMockStore } from "@/lib/mock/social";
import { formatDate } from "@/lib/utils";

export default function BlogPage() {
  const { profile, loading } = useAuth();
  const state = useMockStore();

  const content = (
    <div className="mx-auto max-w-5xl space-y-5 px-3 py-5 sm:px-4">
      <div>
        <h1 className="text-2xl font-black text-navy-900">Vibe blogs</h1>
        <p className="text-sm text-navy-600">
          Long-form posts, moods, and what members are listening to.
        </p>
      </div>

      {state.blogPosts.length ? (
        <div className="grid gap-4">
          {[...state.blogPosts]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
            .map((post) => {
              const author = profileByUserId(state.profiles, post.authorId);
              return (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Avatar
                        name={author?.displayName ?? "Unknown author"}
                        src={author?.avatarUrl}
                        size="sm"
                      />
                      <div className="min-w-0 flex-1">
                        <CardTitle>
                          <Link href={`/blog/${post.id}`}>{post.title}</Link>
                        </CardTitle>
                        <p className="mt-1 text-xs text-navy-500">
                          By{" "}
                          {author ? (
                            <Link href={`/profile/${author.username}`}>
                              {author.displayName}
                            </Link>
                          ) : (
                            "Unknown"
                          )}{" "}
                          on {formatDate(post.createdAt)}
                        </p>
                      </div>
                      <Badge>{post.visibility}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-4 text-sm leading-6 text-navy-700">
                      {post.body}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-navy-500">
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
                  </CardContent>
                </Card>
              );
            })}
        </div>
      ) : (
        <EmptyState title="No blog posts yet" />
      )}
    </div>
  );

  if (loading) return null;
  return profile ? (
    <AuthenticatedShell>{content}</AuthenticatedShell>
  ) : (
    <PublicBlogFrame>{content}</PublicBlogFrame>
  );
}

function PublicBlogFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-muted">
      <header className="border-b border-navy-950 bg-navy-900 text-white shadow-card">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-3 sm:px-4">
          <Logo />
          <Link
            href="/login"
            className="rounded-btn border border-white/20 bg-white px-3 py-2 text-sm font-bold text-navy-900 no-underline"
          >
            Sign In
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
