/**
 * OJ data access — Postgres when DATABASE_URL is set, catalog otherwise.
 * Discovery sort is always created_at DESC (no engagement ranking).
 */

import { desc, eq } from 'drizzle-orm'
import { tryGetDb } from '#/db/index'
import { ojCreators, ojPosts } from '#/db/schema/oj'
import type { AccessLevel, Creator, MediaKind, Post } from '#/domain/oj-types'
import {
  getCreator,
  getCreatorByUsername,
  getPostsByCreator,
  getPublicFeed,
  listCreators,
} from '#/lib/oj/catalog'

function mapCreator(row: typeof ojCreators.$inferSelect): Creator {
  return {
    id: row.id,
    username: row.username,
    displayName: row.displayName,
    bio: row.bio,
    city: row.city,
    bannerHue: row.bannerHue,
    avatarInitials: row.displayName
      .split(/\s+/)
      .map((p) => p[0] ?? '')
      .join('')
      .slice(0, 2)
      .toUpperCase(),
    visualSeed: row.bannerHue,
    supporters: 0,
    posts: 0,
    clips: 0,
    tierPriceMonthly: Math.round(row.tierPriceCents / 100),
    tierName: row.tierName,
    tierPerks: ['Full specials', 'Raw memos', 'Exclusive shorts'],
    tags: [],
  }
}

function mapPost(row: typeof ojPosts.$inferSelect): Post {
  return {
    id: row.id,
    creatorId: row.creatorId,
    kind: row.kind as MediaKind,
    access: row.access as AccessLevel,
    title: row.title,
    body: row.body,
    durationLabel: row.durationLabel ?? undefined,
    createdAt: row.createdAt.toISOString(),
    tipTotal: Math.round(row.tipTotalCents / 100),
    mediaTone: 200,
    playNote: row.mediaUrl ? 'Stored media' : undefined,
  }
}

export async function loadPublicFeed(): Promise<Post[]> {
  const database = tryGetDb()
  if (!database) return getPublicFeed()

  try {
    const rows = await database
      .select()
      .from(ojPosts)
      .where(eq(ojPosts.access, 'public'))
      .orderBy(desc(ojPosts.createdAt))
      .limit(50)
    if (!rows.length) return getPublicFeed()
    return rows.map(mapPost)
  } catch {
    return getPublicFeed()
  }
}

export async function loadCreators(): Promise<Creator[]> {
  const database = tryGetDb()
  if (!database) return listCreators()

  try {
    const rows = await database.select().from(ojCreators).orderBy(ojCreators.displayName)
    if (!rows.length) return listCreators()
    return rows.map(mapCreator)
  } catch {
    return listCreators()
  }
}

export async function loadCreatorByUsername(
  username: string,
): Promise<{ creator: Creator; posts: Post[] } | null> {
  const database = tryGetDb()
  if (!database) {
    const creator = getCreatorByUsername(username)
    if (!creator) return null
    return { creator, posts: getPostsByCreator(creator.id) }
  }

  try {
    const [row] = await database
      .select()
      .from(ojCreators)
      .where(eq(ojCreators.username, username))
      .limit(1)
    if (!row) {
      const creator = getCreatorByUsername(username)
      if (!creator) return null
      return { creator, posts: getPostsByCreator(creator.id) }
    }
    const posts = await database
      .select()
      .from(ojPosts)
      .where(eq(ojPosts.creatorId, row.id))
      .orderBy(desc(ojPosts.createdAt))
    return { creator: mapCreator(row), posts: posts.map(mapPost) }
  } catch {
    const creator = getCreatorByUsername(username)
    if (!creator) return null
    return { creator, posts: getPostsByCreator(creator.id) }
  }
}

export function resolveCreator(id: string) {
  return getCreator(id)
}
