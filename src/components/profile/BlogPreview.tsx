import Link from "next/link";
import { BookText, CalendarDays, Headphones, Smile } from "lucide-react";

import type { BlogPost, Visibility } from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";
import { formatDate } from "@/lib/utils/format";

type BlogPreviewProps = {
  posts: BlogPost[];
  isOwner?: boolean;
  isFriend?: boolean;
  limit?: number;
  className?: string;
};

function canView(visibility: Visibility, isOwner = false, isFriend = false) {
  if (isOwner) return true;
  if (visibility === "public") return true;
  if (visibility === "friends") return isFriend;
  return false;
}

function previewText(body: string, maxLength = 220) {
  const normalized = body.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).trim()}...`;
}

export function BlogPreview({
  posts,
  isOwner = false,
  isFriend = false,
  limit = 5,
  className,
}: BlogPreviewProps) {
  const visiblePosts = posts
    .filter((post) => canView(post.visibility, isOwner, isFriend))
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, limit);

  return (
    <section className={cn("profile-module", className)}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="profile-heading flex items-center gap-2 text-xl font-black">
          <BookText className="h-5 w-5" aria-hidden="true" />
          Recent Blog Entries
        </h2>
        <span className="rounded-full border border-current px-2 py-0.5 text-xs font-bold opacity-70">
          {visiblePosts.length}
        </span>
      </div>

      {visiblePosts.length === 0 ? (
        <p className="mt-3 text-sm opacity-75">No blog entries to show.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {visiblePosts.map((post) => (
            <article
              key={post.id}
              className="rounded border border-[color-mix(in_srgb,var(--mp-primary,#FF7A18)_18%,transparent)] bg-white/55 p-3"
            >
              <Link href={`/blog/${post.id}`} className="group">
                <h3 className="profile-heading text-lg font-black group-hover:underline">
                  {post.title}
                </h3>
              </Link>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold opacity-70">
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                  {formatDate(post.published_at)}
                </span>
                <span>{post.visibility}</span>
                {post.mood ? (
                  <span className="inline-flex items-center gap-1">
                    <Smile className="h-3.5 w-3.5" aria-hidden="true" />
                    {post.mood}
                  </span>
                ) : null}
                {post.currently_listening ? (
                  <span className="inline-flex items-center gap-1">
                    <Headphones className="h-3.5 w-3.5" aria-hidden="true" />
                    {post.currently_listening}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-relaxed">{previewText(post.body)}</p>
              <Link
                href={`/blog/${post.id}`}
                className="mt-3 inline-block text-sm font-black underline"
              >
                Read entry
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default BlogPreview;
