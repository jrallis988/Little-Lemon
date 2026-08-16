"use client";

import Link from "next/link";
import { use } from "react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { PostCard } from "@/components/feed/PostCard";
import { AppShell } from "@/components/layout/AppShell";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";
import { getComicByUsername, posts } from "@/lib/mock/data";
import { formatCount } from "@/lib/utils";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const { user, logout } = useAuth();
  const comic = getComicByUsername(username);
  const own = user?.username === username;
  const comicPosts = posts
    .filter((p) => p.authorId === comic?.id)
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  if (!comic) {
    return (
      <RequireAuth>
        <AppShell title="Profile">
          <p className="text-smoke">That comic isn’t on the list yet.</p>
        </AppShell>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <AppShell title={own ? "Your greenroom" : comic.displayName}>
        <section className="animate-rise hairline rounded-xl bg-velvet/80 p-4">
          <div className="flex items-start gap-4">
            <Avatar
              initials={comic.avatarInitials}
              hue={comic.avatarHue}
              size="xl"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-3xl uppercase tracking-[0.04em]">
                  {comic.displayName}
                </h2>
                {comic.isVerified ? (
                  <span className="rounded bg-spotlight/20 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-spotlight">
                    Working
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-smoke">
                @{comic.username} · {comic.city}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-mic">{comic.bio}</p>
            </div>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-md bg-stage/60 p-2 hairline">
              <dt className="text-[10px] uppercase tracking-[0.14em] text-smoke">
                Followers
              </dt>
              <dd className="font-display text-2xl text-foam">
                {formatCount(comic.followers)}
              </dd>
            </div>
            <div className="rounded-md bg-stage/60 p-2 hairline">
              <dt className="text-[10px] uppercase tracking-[0.14em] text-smoke">
                Following
              </dt>
              <dd className="font-display text-2xl text-foam">
                {formatCount(comic.following)}
              </dd>
            </div>
            <div className="rounded-md bg-stage/60 p-2 hairline">
              <dt className="text-[10px] uppercase tracking-[0.14em] text-smoke">
                Years
              </dt>
              <dd className="font-display text-2xl text-foam">{comic.stageYears}</dd>
            </div>
          </dl>

          <ul className="mt-4 flex flex-wrap gap-2">
            {comic.styles.map((style) => (
              <li
                key={style}
                className="rounded-full bg-foam/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-smoke"
              >
                {style}
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-smoke">
              Credits
            </p>
            <p className="mt-1 text-sm text-mic">{comic.credits.join(" · ")}</p>
          </div>

          <div className="mt-5 flex gap-2">
            {own ? (
              <>
                <Link href="/settings" className="flex-1">
                  <Button variant="secondary" className="w-full">
                    Settings
                  </Button>
                </Link>
                <Button variant="ghost" className="flex-1" onClick={logout}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button className="flex-1">Follow</Button>
                <Link href="/messages" className="flex-1">
                  <Button variant="secondary" className="w-full">
                    Message
                  </Button>
                </Link>
              </>
            )}
          </div>
        </section>

        <h3 className="mb-3 mt-6 font-display text-2xl uppercase tracking-[0.06em]">
          On the lineup
        </h3>
        <div className="space-y-3">
          {comicPosts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </AppShell>
    </RequireAuth>
  );
}
