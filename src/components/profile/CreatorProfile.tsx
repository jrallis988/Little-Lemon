"use client"

import type { Creator, Post } from '#/domain/oj-types'
import { Avatar } from '#/components/ui/Avatar'
import { ContentTile } from '#/components/feed/ContentTile'
import { useSupport } from '#/lib/support'

export function CreatorProfile({
  creator,
  posts,
}: {
  creator: Creator
  posts: Post[]
}) {
  const { openSubscribe, openTip } = useSupport()

  return (
    <div>
      <div
        className="relative h-40 w-full sm:h-52"
        style={{
          background: `linear-gradient(120deg, hsl(${creator.bannerHue} 45% 28%), #07090e 52%, #0f172a 78%, hsl(${(creator.bannerHue + 200) % 360} 40% 22%))`,
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(10,10,11,0.85))]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4">
        <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <div className="rounded-full border-4 border-[var(--bg)]">
              <Avatar
                initials={creator.avatarInitials}
                hue={creator.bannerHue}
                size="xl"
              />
            </div>
            <div className="pb-1">
              <h1 className="font-display text-4xl text-[var(--ink)]">
                {creator.displayName}
              </h1>
              <p className="text-sm text-[var(--muted)]">
                @{creator.username} · {creator.city}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => openTip(creator)}
              className="rounded-md border border-[var(--line-strong)] px-4 py-2 text-sm font-semibold text-[var(--ice-bright)]"
            >
              Tip
            </button>
            <button
              type="button"
              onClick={() => openSubscribe(creator)}
              className="rounded-md bg-[var(--blue)] px-4 py-2 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--blue-deep)]"
            >
              {creator.tierName} · ${creator.tierPriceMonthly}/mo
            </button>
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          {creator.bio}
        </p>

        <ul className="mt-3 flex flex-wrap gap-2">
          {creator.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-[var(--bg-panel)] px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]"
            >
              #{tag}
            </li>
          ))}
        </ul>

        <dl className="mt-6 grid grid-cols-3 gap-2 border border-[var(--line)] bg-[var(--bg-elevated)] p-3 text-center">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              Supporters
            </dt>
            <dd className="font-display text-3xl text-[var(--ice)]">
              {creator.supporters.toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              Posts
            </dt>
            <dd className="font-display text-3xl text-[var(--ink)]">
              {creator.posts}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              Clips
            </dt>
            <dd className="font-display text-3xl text-[var(--ice-bright)]">
              {creator.clips}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--ice)]">
              Library
            </p>
            <h2 className="font-display text-3xl">Public + locked</h2>
          </div>
          <p className="text-xs text-[var(--muted)]">
            Frosted tiles = supporter tier
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 pb-8 sm:grid-cols-3">
          {posts.map((post) => (
            <ContentTile
              key={post.id}
              post={post}
              creator={creator}
              variant="grid"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
