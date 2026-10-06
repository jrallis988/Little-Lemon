"use client"

import { Link, createFileRoute } from '@tanstack/react-router'
import { AppShell } from '#/components/layout/AppShell'
import { ContentTile } from '#/components/feed/ContentTile'
import { SiteFooter } from '#/components/layout/SiteFooter'
import { getCreator, getPost } from '#/lib/oj/catalog'
import { usePublish } from '#/lib/oj/publish-store'

export const Route = createFileRoute('/p/$postId')({
  component: PostPage,
})

function PostPage() {
  const { postId } = Route.useParams()
  const { posts } = usePublish()
  const catalogPost = getPost(postId)
  const published = posts.find((p) => p.id === postId)
  const post = published ?? catalogPost
  const creator = post ? getCreator(post.creatorId) : undefined

  if (!post || !creator) {
    return (
      <AppShell>
        <div className="mx-auto max-w-2xl px-4 py-10">
          <h1 className="font-display text-4xl text-[var(--ink)]">
            Post not found
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            That drop isn’t in the catalog or this device’s publishes.
          </p>
          <Link
            to="/discover"
            className="mt-6 inline-flex text-sm font-semibold text-[var(--ink)] no-underline underline-offset-4 hover:underline"
          >
            ← Discover
          </Link>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-6">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--tint)]">
          Drop
        </p>
        <ContentTile post={post} creator={creator} />
        <Link
          to="/c/$username"
          params={{ username: creator.username }}
          className="mt-2 inline-flex text-sm text-[var(--muted)] no-underline hover:text-[var(--ink)]"
        >
          More from {creator.displayName} →
        </Link>
      </div>
      <SiteFooter />
    </AppShell>
  )
}
