"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { useAuth } from "@/lib/auth/context";
import { mutateStore } from "@/lib/mock/store";
import { formatDate, formatDateTime } from "@/lib/utils/format";
import {
  Card,
  EmptyNotice,
  LoadingCard,
  VibeShell,
  blogPostAuthor,
  friendsForProfile,
  profileById,
  useMockStoreState,
} from "@/app/_components/vibe-page-utils";

function BlogPostContent() {
  const params = useParams<{ postId: string }>();
  const router = useRouter();
  const { profile } = useAuth();
  const { store, refresh } = useMockStoreState();
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");

  if (!store || !profile) return <LoadingCard label="Loading post..." />;

  const post = store.blogPosts.find((item) => item.id === params.postId);
  if (!post) {
    return (
      <EmptyNotice title="Post not found" actionHref="/blog" actionLabel="Back to blog">
        This blog post does not exist in the mock store.
      </EmptyNotice>
    );
  }

  const friendIds = friendsForProfile(store, profile.id).map((friend) => friend.id);
  const canView =
    post.visibility === "public" || post.profile_id === profile.id || friendIds.includes(post.profile_id);

  if (!canView) {
    return (
      <EmptyNotice title="Post is private" actionHref="/blog" actionLabel="Back to blog">
        This post is only available to the author&apos;s friends.
      </EmptyNotice>
    );
  }

  const currentPost = post;
  const author = blogPostAuthor(store, currentPost);
  const comments = store.blogComments
    .filter((item) => item.post_id === currentPost.id)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = comment.trim();
    if (!body || !profile) return;
    mutateStore((current) => {
      current.blogComments.push({
        id: `bc-${Date.now()}`,
        post_id: currentPost.id,
        author_id: profile.id,
        body,
        moderation_status: "clean",
        created_at: new Date().toISOString(),
      });
      if (currentPost.profile_id !== profile.id) {
        current.notifications.unshift({
          id: `n-${Date.now()}`,
          recipient_id: currentPost.profile_id,
          actor_id: profile.id,
          type: "blog_comment",
          title: "Blog comment",
          body: `${profile.display_name} commented on your blog`,
          link: `/blog/${currentPost.id}`,
          read: false,
          created_at: new Date().toISOString(),
        });
      }
    });
    setComment("");
    setStatus("Comment added.");
    refresh();
  }

  return (
    <div className="space-y-5">
      <Card>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            router.push("/blog");
          }}
        >
          Back to blog
        </Button>
        <h1 className="mt-4 text-4xl font-black text-[#0f2744]">{currentPost.title}</h1>
        <p className="mt-2 text-sm text-[#5b6b7c]">
          by{" "}
          {author ? (
            <Link href={`/profile/${author.username}`}>{author.display_name}</Link>
          ) : (
            "Vibe member"
          )}{" "}
          on {formatDate(currentPost.published_at)}
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
          <span className="rounded-full border border-[#c5d0dc] px-2 py-1">Mood: {currentPost.mood ?? "none"}</span>
          <span className="rounded-full border border-[#c5d0dc] px-2 py-1">
            Listening: {currentPost.currently_listening ?? "nothing listed"}
          </span>
          <span className="rounded-full border border-[#c5d0dc] px-2 py-1">{currentPost.visibility}</span>
        </div>
      </Card>

      <Card>
        <article className="prose max-w-none">
          <p className="whitespace-pre-line text-base leading-7 text-[#1a2332]">{currentPost.body}</p>
        </article>
      </Card>

      <Card>
        <h2 className="mp-section-title">Comments ({comments.length})</h2>
        <div className="space-y-3">
          {comments.length === 0 ? (
            <p className="text-sm text-[#5b6b7c]">No comments yet.</p>
          ) : (
            comments.map((item) => {
              const commentAuthor = profileById(store, item.author_id);
              return (
                <article key={item.id} className="flex gap-3 rounded border border-[#c5d0dc] bg-white p-3">
                  <Avatar profile={commentAuthor} size="md" />
                  <div>
                    <p className="font-bold text-[#0f2744]">
                      {commentAuthor?.display_name ?? "Vibe member"}
                    </p>
                    <time className="text-xs text-[#5b6b7c]" dateTime={item.created_at}>
                      {formatDateTime(item.created_at)}
                    </time>
                    <p className="mt-2 whitespace-pre-line text-sm">{item.body}</p>
                  </div>
                </article>
              );
            })
          )}
        </div>
        <form onSubmit={submitComment} className="mt-5 space-y-3">
          <Textarea
            id="blog-comment"
            label="Add comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            rows={3}
            required
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            {status ? <p className="text-sm font-semibold text-[#1f7a4d]">{status}</p> : <span />}
            <Button type="submit">Post comment</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default function BlogPostPage() {
  return (
    <VibeShell>
      <BlogPostContent />
    </VibeShell>
  );
}
