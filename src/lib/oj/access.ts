import type { AccessLevel, Post } from '#/domain/oj-types'

/**
 * Server-style access gate. Client membership unlocks are mirrored here so
 * locked content never "plays" without an unlock, even in demo mode.
 */
export function canAccessPost(
  post: Pick<Post, 'access'>,
  opts: { unlockedCreatorIds: string[]; creatorId: string },
): boolean {
  if (post.access === 'public') return true
  return opts.unlockedCreatorIds.includes(opts.creatorId)
}

export function assertCanAccessPost(
  post: Pick<Post, 'access' | 'id'>,
  opts: { unlockedCreatorIds: string[]; creatorId: string },
) {
  if (!canAccessPost(post, opts)) {
    throw new Error(`Post ${post.id} requires an active supporter tier`)
  }
}

export function accessLabel(
  access: AccessLevel,
  unlocked: boolean,
): 'Public' | 'Locked' | 'Unlocked' {
  if (access === 'public') return 'Public'
  return unlocked ? 'Unlocked' : 'Locked'
}
