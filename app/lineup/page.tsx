"use client";

import { useMemo, useState } from "react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { PostCard } from "@/components/feed/PostCard";
import { AppShell } from "@/components/layout/AppShell";
import { posts } from "@/lib/mock/data";
import type { PostKind } from "@/lib/types";
import { cn } from "@/lib/utils";

const filters: Array<{ id: "all" | PostKind; label: string }> = [
  { id: "all", label: "All" },
  { id: "bit", label: "Bits" },
  { id: "workshop", label: "Workshop" },
  { id: "show", label: "Shows" },
  { id: "setlist", label: "Sets" },
  { id: "clip", label: "Clips" },
];

export default function LineupPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const feed = useMemo(
    () =>
      posts
        .filter((p) => (filter === "all" ? true : p.kind === filter))
        .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),
    [filter],
  );

  return (
    <RequireAuth>
      <AppShell>
        <p className="mb-3 text-sm text-smoke">
          What comics are writing, hosting, and killing tonight.
        </p>
        <div className="-mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-1">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] transition",
                filter === f.id
                  ? "bg-spotlight text-stage"
                  : "bg-foam/5 text-smoke hover:text-foam",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {feed.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </AppShell>
    </RequireAuth>
  );
}
