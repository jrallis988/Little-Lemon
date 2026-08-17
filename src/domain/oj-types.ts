/**
 * OJ (Only Jokes) — domain types for the creator subscription comedy platform.
 */

export type MediaKind = 'video' | 'audio' | 'animation' | 'text'

export type AccessLevel = 'public' | 'supporters'

export type Creator = {
  id: string
  username: string
  displayName: string
  bio: string
  city: string
  bannerHue: number
  avatarInitials: string
  supporters: number
  posts: number
  clips: number
  tierPriceMonthly: number
  tierName: string
  tags: string[]
}

export type Post = {
  id: string
  creatorId: string
  kind: MediaKind
  access: AccessLevel
  title: string
  body: string
  durationLabel?: string
  createdAt: string
  tipTotal: number
  /** Visual placeholder tone for media tile */
  mediaTone: number
}

export type TipPreset = {
  id: string
  label: string
  amount: number
}
