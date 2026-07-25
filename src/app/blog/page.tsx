"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth/context";
import { formatDate } from "@/lib/utils/format";
import {
  Card,
  LoadingCard,
  VibeShell,
  SectionTitle,
  blogPostAuthor,
  friendsForProfile,
  useMockStoreState,
} from "@/app/_components/vibe-page-utils";

function BlogContent() {
  const { profile } = useAuth();
  const { store } = useMockStoreState();
  const [mode, setMode] = useState<"all" | "friends">("all");

  if (!store || !profile) return <LoadingCard label="Loading blog posts..." />;

  const friendIds = friendsForProfile(store, profile.id).map((friend) => friend.id);
  const posts = store.blogPosts
    .filter((post) => {
      if (mode === "friends") return friendIds.includes(post.profile_id);
      return post.visibility === "public" || friendIds.includes(post.profile_id) || post.profile_id === profile.id;
    })
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

  return (
    <div className="space-y-5">
      <Card>
        <h1 className="text-3xl font-black text-[#0f2744]">Blog</h1>
        <p className="mt-2 text-sm text-[#5b6b7c]">
          Read public posts and friends-only posts available to your account.
        </p>
      </Card>

      <Card>
        <SectionTitle
          title={mode === "all" ? "All available posts" : "Friends' posts"}
          action={
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={mode === "all" ? "primary" : "secondary"}
                onClick={() => setMode("all")}
              >
                All
              </Button>
              <Button
                size="sm"
                variant={mode === "friends" ? "primary" : "secondary"}
                onClick={() => setMode("friends")}
              >
                Friends
              </Button>
            </div>
          }
        />
        {posts.length === 0 ? (
          <p className="text-sm text-[#5b6b7c]">No posts to show in this view.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => {
              const author = blogPostAuthor(store, post);
              const commentCount = store.blogComments.filter((comment) => comment.post_id === post.id).length;
              return (
                <article key={post.id} className="rounded border border-[#c5d0dc] bg-white p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <Link href={`/blog/${post.id}`} className="text-2xl font-black no-underline">
                        {post.title}
                      </Link>
                      <p className="mt-1 text-sm text-[#5b6b7c]">
                        by{" "}
                        {author ? (
                          <Link href={`/profile/${author.username}`}>{author.display_name}</Link>
                        ) : (
                          "Vibe member"
                        )}{" "}
                        on {formatDate(post.published_at)}
                      </p>
                    </div>
                    <span className="rounded-full border border-[#c5d0dc] px-2 py-1 text-xs font-bold">
                      {post.visibility}
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-3 whitespace-pre-line text-sm">{post.body}</p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-[#5b6b7c]">
                    <span>
                      Mood: {post.mood ?? "unspecified"} | Comments: {commentCount}
                    </span>
                    <Link
                      href={`/blog/${post.id}`}
                      className="rounded border border-[#3b6ea5] bg-white px-3 py-2 font-bold no-underline"
                    >
                      Read post
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}

export default function BlogPage() {
  return (
    <VibeShell>
      <BlogContent />
    </VibeShell>
  );
}
