import type { EventKind, PostKind } from '#/domain/invariants'

export type PublicProfile = {
  username: string
  stageName: string
  bio: string
  homeCity: string
  homeRegion: string
  collaborationTags: string[]
  verificationKind: 'identity' | 'venue' | 'booker' | null
  avatarUrl: string | null
}

export type FeedPost = {
  id: string
  kind: PostKind
  title: string | null
  body: string
  mediaKind: 'none' | 'video' | 'audio' | 'image'
  mediaUrl: string | null
  city: string | null
  region: string | null
  createdAt: string
  author: Pick<PublicProfile, 'username' | 'stageName' | 'avatarUrl' | 'homeCity'>
}

export type SceneEvent = {
  id: string
  kind: EventKind
  title: string
  description: string
  startsAt: string
  city: string
  region: string
  neighborhood: string | null
  slotsOpen: number | null
  venueName: string | null
  hostUsername: string
}
