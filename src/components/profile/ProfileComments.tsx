"use client";

import { FormEvent, useMemo, useState } from "react";
import { Flag, MessageSquareText, Send, Trash2 } from "lucide-react";

import type { Profile, ProfileComment } from "@/lib/types/database";
import { PLACEHOLDER_AVATAR } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";
import { formatDateTime } from "@/lib/utils/format";

type ProfileCommentsProps = {
  comments: ProfileComment[];
  authors: Record<string, Profile>;
  isOwner: boolean;
  isFriend: boolean;
  pageSize?: number;
  className?: string;
  onDelete?: (comment: ProfileComment) => void;
  onReport?: (comment: ProfileComment) => void;
  onSubmit?: (body: string) => void;
};

export function ProfileComments({
  comments,
  authors,
  isOwner,
  isFriend,
  pageSize = 5,
  className,
  onDelete,
  onReport,
  onSubmit,
}: ProfileCommentsProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [draft, setDraft] = useState("");

  const sortedComments = useMemo(
    () =>
      [...comments].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
    [comments]
  );
  const visibleComments = sortedComments.slice(0, visibleCount);
  const canCompose = isFriend || isOwner;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = draft.trim();
    if (!body) return;
    onSubmit?.(body);
    setDraft("");
  };

  return (
    <section className={cn("profile-module", className)}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="profile-heading flex items-center gap-2 text-xl font-black">
          <MessageSquareText className="h-5 w-5" aria-hidden="true" />
          Profile Comments
        </h2>
        <span className="rounded-full border border-current px-2 py-0.5 text-xs font-bold opacity-70">
          {sortedComments.length}
        </span>
      </div>

      {canCompose ? (
        <form onSubmit={handleSubmit} className="mt-4 rounded border border-[color-mix(in_srgb,var(--mp-primary,#1a365d)_18%,transparent)] bg-white/55 p-3">
          <label htmlFor="profile-comment" className="text-sm font-black">
            Leave a comment
          </label>
          <textarea
            id="profile-comment"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            rows={3}
            maxLength={1000}
            className="mt-2 w-full rounded border border-slate-300 bg-white p-2 text-sm text-slate-950"
            placeholder="Write something friendly..."
          />
          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="text-xs opacity-60">{draft.length}/1000</span>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded bg-[color:var(--mp-primary,#1a365d)] px-3 py-2 text-sm font-bold text-white hover:brightness-110 disabled:opacity-50"
              disabled={!draft.trim()}
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Post Comment
            </button>
          </div>
        </form>
      ) : (
        <p className="mt-3 rounded border border-dashed border-current p-3 text-sm opacity-75">
          Only friends can leave profile comments.
        </p>
      )}

      {visibleComments.length === 0 ? (
        <p className="mt-4 text-sm opacity-75">No comments yet.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {visibleComments.map((comment) => {
            const author = authors[comment.author_id];
            return (
              <li
                key={comment.id}
                className="flex gap-3 rounded border border-[color-mix(in_srgb,var(--mp-primary,#1a365d)_18%,transparent)] bg-white/55 p-3"
              >
                <img
                  src={author?.avatar_url ?? PLACEHOLDER_AVATAR}
                  alt={author ? `${author.display_name}'s avatar` : "Comment author avatar"}
                  className="h-11 w-11 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-black">{author?.display_name ?? "MyPlace member"}</p>
                      <p className="text-xs opacity-65">{formatDateTime(comment.created_at)}</p>
                    </div>
                    <div className="flex gap-1">
                      {isOwner ? (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded border border-red-200 px-2 py-1 text-xs font-bold text-red-700 hover:bg-red-50"
                          onClick={() => onDelete?.(comment)}
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                          Delete
                        </button>
                      ) : null}
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded border border-slate-200 px-2 py-1 text-xs font-bold text-slate-700 hover:bg-slate-50"
                        onClick={() => onReport?.(comment)}
                      >
                        <Flag className="h-3.5 w-3.5" aria-hidden="true" />
                        Report
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 whitespace-pre-line text-sm">{comment.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {visibleCount < sortedComments.length ? (
        <button
          type="button"
          className="mt-4 w-full rounded border border-[color:var(--mp-primary,#1a365d)] bg-white/70 px-3 py-2 text-sm font-black text-[color:var(--mp-primary,#1a365d)] hover:bg-white"
          onClick={() => setVisibleCount((count) => count + pageSize)}
        >
          Load More
        </button>
      ) : null}
    </section>
  );
}

export default ProfileComments;
