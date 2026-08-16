"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { getComic, getVenue } from "@/lib/mock/data";
import type { Post, PostKind } from "@/lib/types";
import { cn, formatCount } from "@/lib/utils";

const kindLabel: Record<PostKind, string> = {
  bit: "Bit",
  setlist: "Setlist",
  show: "Show",
  workshop: "Workshop",
  clip: "Clip",
};

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  const author = getComic(post.authorId);
  const venue = post.venueId ? getVenue(post.venueId) : undefined;
  if (!author) return null;

  return (
    <article
      className="animate-rise hairline rounded-xl bg-velvet/80 p-4"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start gap-3">
        <Link href={`/u/${author.username}`}>
          <Avatar initials={author.avatarInitials} hue={author.avatarHue} />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <Link
              href={`/u/${author.username}`}
              className="truncate font-semibold text-foam hover:text-spotlight"
            >
              {author.displayName}
            </Link>
            <span className="text-xs text-smoke">@{author.username}</span>
            <span className="text-xs text-smoke">·</span>
            <time className="text-xs text-smoke">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </time>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]",
                post.kind === "workshop"
                  ? "bg-laugh/20 text-laugh"
                  : post.kind === "show"
                    ? "bg-marquee/20 text-marquee"
                    : "bg-spotlight/15 text-spotlight",
              )}
            >
              {kindLabel[post.kind]}
            </span>
            {venue ? (
              <span className="text-xs text-smoke">
                at <span className="text-mic">{venue.name}</span>
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {post.title ? (
        <h2 className="mt-3 font-display text-xl uppercase tracking-[0.04em] text-foam">
          {post.title}
        </h2>
      ) : null}

      <p className="mt-2 whitespace-pre-wrap font-bit text-[1.02rem] leading-relaxed text-mic">
        {post.body}
      </p>

      {post.tags.length ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-foam/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-smoke"
            >
              #{tag}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4 flex items-center gap-4 text-smoke">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm hover:text-laugh"
          aria-label="Laugh"
        >
          <ThumbsUp className="h-4 w-4" />
          {formatCount(post.laughs)}
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm hover:text-marquee"
          aria-label="Groan"
        >
          <ThumbsDown className="h-4 w-4" />
          {formatCount(post.groans)}
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm hover:text-foam"
          aria-label="Comments"
        >
          <MessageCircle className="h-4 w-4" />
          {formatCount(post.comments)}
        </button>
      </div>
    </article>
  );
}
