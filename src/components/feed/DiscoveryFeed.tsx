"use client"

import { useMemo } from 'react'
import type { Post } from '#/domain/oj-types'
import { ContentTile } from '#/components/feed/ContentTile'
import { getCreator, getPublicFeed } from '#/lib/oj/catalog'
import { usePublish } from '#/lib/oj/publish-store'
import { useSafety } from '#/lib/oj/safety-store'

export function DiscoveryFeed({
  posts,
  includePublished = true,
}: {
  posts?: Post[]
  /** Merge local publishes into public chrono feeds */
  includePublished?: boolean
}) {
  const { publicFeedExtras } = usePublish()
  const { isBlocked } = useSafety()

  const feed = useMemo(() => {
    const base = posts ?? getPublicFeed()
    const merged = includePublished
      ? [...publicFeedExtras(), ...base]
      : [...base]
    return merged
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
      .filter((post) => !isBlocked(post.creatorId))
  }, [posts, publicFeedExtras, isBlocked, includePublished])

  if (feed.length === 0) {
    return (
      <p className="py-8 text-sm text-[var(--muted)]">No posts in this view.</p>
    )
  }

  return (
    <div>
      {feed.map((post, index) => {
        const creator = getCreator(post.creatorId)
        if (!creator) return null
        return (
          <div key={post.id} style={{ animationDelay: `${index * 45}ms` }}>
            <ContentTile post={post} creator={creator} />
          </div>
        )
      })}
    </div>
  )
}
