"use client"

import type { Post } from '#/domain/oj-types'
import { ContentTile } from '#/components/feed/ContentTile'
import { getCreator } from '#/lib/mock/oj'

export function DiscoveryFeed({ posts }: { posts: Post[] }) {
  return (
    <div>
      {posts.map((post, index) => {
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
