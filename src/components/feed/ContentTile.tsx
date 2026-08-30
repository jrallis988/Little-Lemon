"use client"

import { Link } from '@tanstack/react-router'
import { formatDistanceToNow } from 'date-fns'
import type { Creator, Post } from '#/domain/oj-types'
import { Avatar } from '#/components/ui/Avatar'
import { MediaStage } from '#/components/media/MediaStage'
import { TipBar } from '#/components/monetization/TipBar'
import { useSupport } from '#/lib/support'
import { useMembership } from '#/lib/membership'
import { usePlayer } from '#/lib/player'

export function ContentTile({
  post,
  creator,
  variant = 'feed',
}: {
  post: Post
  creator: Creator
  variant?: 'feed' | 'grid'
}) {
  const { openSubscribe } = useSupport()
  const { isUnlocked } = useMembership()
  const { openPlayer } = usePlayer()
  const locked = post.access === 'supporters' && !isUnlocked(creator.id)

  function onMediaClick() {
    if (locked) {
      openSubscribe(creator)
      return
    }
    if (post.kind !== 'text') openPlayer(creator, post)
  }

  if (variant === 'grid') {
    return (
      <button
        type="button"
        onClick={onMediaClick}
        className="group block w-full overflow-hidden text-left"
      >
        <MediaStage
          tone={post.mediaTone}
          kind={post.kind}
          title={post.title}
          durationLabel={post.durationLabel}
          locked={locked}
          seed={creator.visualSeed}
        />
        <div className="pt-2.5">
          <p className="line-clamp-2 text-sm font-medium leading-snug text-[var(--ink)]">
            {post.title}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
            {locked ? (
              <span className="lock-tag rounded px-1.5 py-0.5">Locked</span>
            ) : post.access === 'supporters' ? (
              'Unlocked'
            ) : (
              'Public'
            )}
          </p>
        </div>
      </button>
    )
  }

  return (
    <article className="animate-rise border-b border-[var(--hairline)] py-5 first:pt-1">
      <div className="mb-3 flex items-center gap-3">
        <Link to="/c/$username" params={{ username: creator.username }}>
          <Avatar initials={creator.avatarInitials} hue={creator.bannerHue} />
        </Link>
        <div className="min-w-0 flex-1">
          <Link
            to="/c/$username"
            params={{ username: creator.username }}
            className="font-semibold text-[var(--ink)] no-underline hover:text-[var(--tint)]"
          >
            {creator.displayName}
          </Link>
          <p className="text-xs text-[var(--muted)]">
            @{creator.username} · {creator.city} ·{' '}
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>

      <h2 className="text-lg font-semibold leading-snug tracking-tight text-[var(--ink)] sm:text-xl">
        {post.title}
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-soft)]">
        {post.body}
      </p>

      {post.kind !== 'text' ? (
        <button type="button" className="mt-3 block w-full" onClick={onMediaClick}>
          <MediaStage
            tone={post.mediaTone}
            kind={post.kind}
            title={post.title}
            durationLabel={post.durationLabel}
            locked={locked}
            seed={creator.visualSeed}
          />
        </button>
      ) : null}

      <TipBar creator={creator} post={post} tipTotal={post.tipTotal} />
    </article>
  )
}
