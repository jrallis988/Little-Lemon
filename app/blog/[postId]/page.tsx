"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Music2, Smile } from "lucide-react";

import { AuthenticatedShell } from "@/components/auth/AuthenticatedShell";
import { Logo } from "@/components/brand/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Textarea } from "@/components/ui/Textarea";
import { useAuth } from "@/lib/auth/AuthProvider";
import { profileByUserId, useMockStore } from "@/lib/mock/social";
import { formatDate, formatRelativeTime } from "@/lib/utils";
import type { BlogComment } from "@/lib/types";

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = React.use(params);
  const { profile, loading } = useAuth();
  const state = useMockStore();
  const post = state.blogPosts.find((item) => item.id === postId);
  const author = post ? profileByUserId(state.profiles, post.authorId) : undefined;

  const content = post ? (
    <BlogPostContent postId={postId} />
  ) : (
    <div className="mx-auto max-w-3xl p-4">
      <ErrorState title="Post not found" message="That blog post does not exist." />
    </div>
  );

  if (loading) return null;
  return profile ? (
    <AuthenticatedShell>{content}</AuthenticatedShell>
  ) : (
    <PublicBlogFrame>{content}</PublicBlogFrame>
  );
}

function BlogPostContent({ postId }: { postId: string }) {
  const { profile } = useAuth();
  const state = useMockStore();
  const post = state.blogPosts.find((item) => item.id === postId)!;
  const author = profileByUserId(state.profiles, post.authorId);
  const [body, setBody] = React.useState("");
  const [notice, setNotice] = React.useState<string | null>(null);
  const [comments, setComments] = React.useState<BlogComment[]>(() =>
    Array.from({ length: Math.min(post.commentCount, 3) }).map((_, index) => {
      const commenter = state.profiles[(index + 1) % state.profiles.length];
      return {
        id: `${post.id}-local-${index}`,
        postId: post.id,
        authorId: commenter.userId,
        body: [
          "This is exactly why I still read MyPlace blogs.",
          "Saving this line for later.",
          "The mood and music pairing is perfect.",
        ][index],
        createdAt: new Date(Date.now() - (index + 1) * 3600000).toISOString(),
      };
    })
  );

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!profile) {
      setNotice("Sign in to comment on blog posts.");
      return;
    }
    const trimmed = body.trim();
    if (!trimmed) return;
    setComments((current) => [
      {
        id: `bc${Date.now()}`,
        postId: post.id,
        authorId: profile.userId,
        body: trimmed,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);
    setBody("");
    setNotice("Comment posted.");
  };

  return (
    <article className="mx-auto max-w-4xl space-y-5 px-3 py-5 sm:px-4">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold">
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to blog
      </Link>

      {notice ? (
        <div className="rounded-card border border-brand/30 bg-brand-soft px-4 py-3 text-sm font-semibold text-brand-dark">
          {notice}
        </div>
      ) : null}

      <Card>
        <CardHeader>
          <div className="flex items-start gap-3">
            <Avatar
              name={author?.displayName ?? "Unknown author"}
              src={author?.avatarUrl}
              size="lg"
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-black text-navy-900">{post.title}</h1>
              <p className="mt-1 text-sm text-navy-600">
                By{" "}
                {author ? (
                  <Link href={`/profile/${author.username}`}>{author.displayName}</Link>
                ) : (
                  "Unknown"
                )}{" "}
                on {formatDate(post.createdAt)}
              </p>
            </div>
            <Badge>{post.visibility}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-wrap items-center gap-3 rounded-card border border-surface-border bg-surface-muted p-3 text-sm text-navy-700">
            {post.mood ? (
              <span className="inline-flex items-center gap-1.5">
                <Smile className="h-4 w-4 text-brand" aria-hidden />
                Mood: {post.mood}
              </span>
            ) : null}
            {post.currentlyListening ? (
              <span className="inline-flex items-center gap-1.5">
                <Music2 className="h-4 w-4 text-brand" aria-hidden />
                Listening: {post.currentlyListening}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4 text-brand" aria-hidden />
              {comments.length} comments
            </span>
          </div>
          <div className="prose prose-sm max-w-none whitespace-pre-wrap text-navy-800">
            {post.body}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={submit} className="rounded-card border border-surface-border bg-surface-muted p-3">
            <Textarea
              label={profile ? "Add a comment" : "Sign in required"}
              value={body}
              onChange={(event) => setBody(event.target.value)}
              rows={3}
              maxLength={600}
              placeholder="Add your thoughts..."
              disabled={!profile}
            />
            <div className="mt-2 text-right">
              <Button type="submit" disabled={!profile || !body.trim()}>
                Post Comment
              </Button>
            </div>
          </form>

          {comments.length ? (
            <div className="space-y-3">
              {comments.map((comment) => {
                const commenter = profileByUserId(state.profiles, comment.authorId);
                return (
                  <div
                    key={comment.id}
                    className="flex gap-3 rounded-card border border-surface-border bg-white p-3 shadow-soft"
                  >
                    <Avatar
                      name={commenter?.displayName ?? "Unknown"}
                      src={commenter?.avatarUrl}
                      size="sm"
                    />
                    <div>
                      <p className="text-sm font-bold text-navy-900">
                        {commenter?.displayName ?? "Unknown member"}
                        <span className="ml-2 text-xs font-normal text-navy-500">
                          {formatRelativeTime(comment.createdAt)}
                        </span>
                      </p>
                      <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-navy-700">
                        {comment.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState title="No comments yet" />
          )}
        </CardContent>
      </Card>
    </article>
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
