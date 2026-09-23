/**
 * OJ (Only Jokes) — domain types for the creator subscription comedy platform.
 */

export type MediaKind = 'video' | 'audio' | 'animation' | 'text'

export type AccessLevel = 'public' | 'supporters'

export type AccountRole = 'fan' | 'creator'

export type Creator = {
  id: string
  username: string
  displayName: string
  bio: string
  city: string
  bannerHue: number
  avatarInitials: string
  /** Deterministic poster/avatar seed */
  visualSeed: number
  supporters: number
  posts: number
  clips: number
  tierPriceMonthly: number
  tierName: string
  tierPerks: string[]
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
  mediaTone: number
  /** Short playback blurb shown in the player */
  playNote?: string
}

export type TipPreset = {
  id: string
  label: string
  amount: number
}

export type BackstageThread = {
  id: string
  fromLabel: string
  preview: string
  kind: 'booker' | 'fan' | 'venue'
  updatedAt: string
  unread: boolean
}

export type DemoUser = {
  id: string
  name: string
  email: string
  role: AccountRole
  /** Creator profile username when role is creator */
  creatorUsername?: string
}
