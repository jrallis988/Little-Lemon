/**
 * Product invariants — keep ranking / metrics logic honest.
 */

export const FEED_SORT = 'created_at_desc' as const

/** Local discovery radius defaults (km). Never used for engagement ranking. */
export const SCENE_RADIUS_KM = {
  neighborhood: 25,
  city: 80,
  region: 400,
} as const

export const POST_KINDS = ['clip', 'premise', 'flyer', 'lab_memo'] as const
export const EVENT_KINDS = [
  'open_mic',
  'showcase',
  'indie_room',
  'headliner',
  'workshop',
] as const

/** Fields that must never appear in public profile / feed payloads */
export const FORBIDDEN_PUBLIC_METRICS = [
  'followerCount',
  'followingCount',
  'likeCount',
  'viewCount',
  'impressionCount',
  'engagementScore',
] as const

export type PostKind = (typeof POST_KINDS)[number]
export type EventKind = (typeof EVENT_KINDS)[number]
