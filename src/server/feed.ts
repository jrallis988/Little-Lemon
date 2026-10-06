/**
 * Chronological feed helpers.
 * Intentionally no scoring, boost, or "suggested" paths.
 */

import { and, desc, eq, lte, type SQL } from 'drizzle-orm'
import { db } from '#/db/index'
import { posts, profiles } from '#/db/schema'
import type { PostKind } from '#/domain/invariants'

export type FeedQuery = {
  city?: string
  region?: string
  kind?: PostKind
  /** Cursor = ISO createdAt of last item (older-than pagination) */
  before?: string
  limit?: number
}

export async function listChronologicalFeed(query: FeedQuery = {}) {
  const limit = Math.min(query.limit ?? 30, 50)
  const filters: SQL[] = [eq(posts.visibility, 'public')]

  if (query.city) filters.push(eq(posts.city, query.city))
  if (query.region) filters.push(eq(posts.region, query.region))
  if (query.kind) filters.push(eq(posts.kind, query.kind))
  if (query.before) {
    filters.push(lte(posts.createdAt, new Date(query.before)))
  }

  return db
    .select({
      id: posts.id,
      kind: posts.kind,
      title: posts.title,
      body: posts.body,
      mediaKind: posts.mediaKind,
      mediaUrl: posts.mediaUrl,
      city: posts.city,
      region: posts.region,
      createdAt: posts.createdAt,
      authorUsername: profiles.username,
      authorStageName: profiles.stageName,
      authorAvatarUrl: profiles.avatarUrl,
      authorHomeCity: profiles.homeCity,
    })
    .from(posts)
    .innerJoin(profiles, eq(posts.authorId, profiles.userId))
    .where(and(...filters))
    .orderBy(desc(posts.createdAt))
    .limit(limit)
}

/** Local + following-city blend still sorted purely by time */
export async function listSceneAwareFeed(opts: {
  homeCity: string
  homeRegion: string
  before?: string
  limit?: number
}) {
  return listChronologicalFeed({
    before: opts.before,
    limit: opts.limit,
    // Prefer city when set; callers can also request region-only
    city: opts.homeCity,
  })
}

export function assertNoVanityMetrics(payload: Record<string, unknown>) {
  const banned = [
    'followerCount',
    'followingCount',
    'likeCount',
    'viewCount',
    'impressionCount',
    'engagementScore',
  ]
  for (const key of banned) {
    if (key in payload) {
      throw new Error(`Refusing to serialize vanity metric: ${key}`)
    }
  }
}
