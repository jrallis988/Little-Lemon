"use client"

import type { Post } from '#/domain/oj-types'
import { ContentTile } from '#/components/feed/ContentTile'
import { getCreator } from '#/lib/mock/oj'

export function DiscoveryFeed({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-3">
      {posts.map((post, index) => {
        const creator = getCreator(post.creatorId)
        if (!creator) return null
        return (
          <div key={post.id} style={{ animationDelay: `${index * 50}ms` }}>
            <ContentTile post={post} creator={creator} />
          </div>
        )
      })}
    </div>
  )
}
