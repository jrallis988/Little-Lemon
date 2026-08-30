"use client"

import type { Creator, Post } from '#/domain/oj-types'
import { Avatar } from '#/components/ui/Avatar'
import { ContentTile } from '#/components/feed/ContentTile'
import { useSupport } from '#/lib/support'
import { useMembership } from '#/lib/membership'

export function CreatorProfile({
  creator,
  posts,
}: {
  creator: Creator
  posts: Post[]
}) {
  const { openSubscribe, openTip } = useSupport()
  const { isUnlocked } = useMembership()
  const unlocked = isUnlocked(creator.id)

  return (
    <div>
      <div
        className="relative h-36 w-full sm:h-48"
        style={{
          background: `linear-gradient(120deg, hsl(${creator.bannerHue} 55% 45%), #00AFF0 48%, #BEE1F9 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(transparent_20%,rgba(0,175,240,0.88))]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4">
        <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <Avatar
              initials={creator.avatarInitials}
              hue={creator.bannerHue}
              size="xl"
            />
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
              className="rounded-xl border border-[var(--line-strong)] px-4 py-2.5 text-sm font-semibold text-[var(--ink)] hover:bg-white/10"
            >
              Tip
            </button>
            <button
              type="button"
              onClick={() => openSubscribe(creator)}
              className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--on-accent)] hover:opacity-95"
            >
              {unlocked
                ? `${creator.tierName} · member`
                : `${creator.tierName} · $${creator.tierPriceMonthly}/mo`}
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
              className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-[var(--ink)]"
            >
              #{tag}
            </li>
          ))}
        </ul>

        <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-[var(--hairline)] py-4 text-center">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              Supporters
            </dt>
            <dd className="mt-1 font-display text-3xl text-[var(--ink)]">
              {creator.supporters.toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              Posts
            </dt>
            <dd className="mt-1 font-display text-3xl text-[var(--ink)]">
              {creator.posts}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              Clips
            </dt>
            <dd className="mt-1 font-display text-3xl text-[var(--ink)]">
              {creator.clips}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--tint)]">
              Library
            </p>
            <h2 className="font-display text-3xl text-[var(--ink)]">
              Public + locked
            </h2>
          </div>
          <p className="max-w-[9rem] text-right text-xs text-[var(--muted)]">
            {unlocked
              ? 'Your tier is active on this device'
              : 'Frosted tiles = supporter tier'}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-5 pb-8 sm:grid-cols-3">
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
