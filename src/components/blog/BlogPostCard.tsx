import Link from "next/link";
import { CalendarDays, Smile } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import type { BlogPost, Profile } from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";
import { formatDate } from "@/lib/utils/format";

export interface BlogPostCardProps {
  post: BlogPost;
  author: Profile;
  href?: string;
  previewLength?: number;
  className?: string;
}

function previewText(body: string, maxLength: number) {
  const normalized = body.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).trim()}...`;
}

export function BlogPostCard({
  post,
  author,
  href = `/blog/${post.id}`,
  previewLength = 220,
  className,
}: BlogPostCardProps) {
  return (
    <article className={cn("mp-card p-4", className)}>
      <div className="flex items-start gap-3">
        <Link href={`/profile/${author.username}`} className="shrink-0">
          <Avatar profile={author} size="md" />
          <span className="sr-only">View profile for {author.display_name}</span>
        </Link>

        <div className="min-w-0 flex-1">
          <Link href={href} className="group">
            <h2 className="text-xl font-black text-[#222222] group-hover:underline">
              {post.title}
            </h2>
          </Link>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-[#6E6E6E]">
            <span>
              by{" "}
              <Link
                href={`/profile/${author.username}`}
                className="text-[#7B61FF] hover:underline"
              >
                {author.display_name}
              </Link>
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              {formatDate(post.published_at)}
            </span>
            {post.mood ? (
              <span className="inline-flex items-center gap-1">
                <Smile className="h-3.5 w-3.5" aria-hidden="true" />
                {post.mood}
              </span>
            ) : null}
          </div>

          <p className="mt-3 text-sm leading-relaxed text-[#222222]">
            {previewText(post.body, previewLength)}
          </p>

          <Link
            href={href}
            className="mt-3 inline-flex text-sm font-black text-[#7B61FF] underline"
          >
            Read full post
          </Link>
        </div>
      </div>
    </article>
  );
}

export default BlogPostCard;
