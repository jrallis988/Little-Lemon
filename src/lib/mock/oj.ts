import type { Creator, Post, TipPreset } from '#/domain/oj-types'

export const tipPresets: TipPreset[] = [
  { id: 't1', label: 'Beer', amount: 3 },
  { id: 't2', label: 'Set fee', amount: 10 },
  { id: 't3', label: 'Headliner', amount: 25 },
  { id: 't4', label: 'Custom', amount: 0 },
]

export const creators: Creator[] = [
  {
    id: 'cr1',
    username: 'maya.kill',
    displayName: 'Maya Kill',
    bio: 'Road comic. Raw writing-lab audio, uncut crowdwork, and the special the clubs won’t book clean.',
    city: 'Brooklyn, NY',
    bannerHue: 18,
    avatarInitials: 'MK',
    supporters: 1284,
    posts: 86,
    clips: 41,
    tierPriceMonthly: 9,
    tierName: 'Backstage',
    tags: ['crowdwork', 'storytelling', 'uncut'],
  },
  {
    id: 'cr2',
    username: 'frame.roast',
    displayName: 'Frame Roast',
    bio: 'Comedy animator. Hand-drawn shorts that never make it past brand-safe YouTube.',
    city: 'Los Angeles, CA',
    bannerHue: 210,
    avatarInitials: 'FR',
    supporters: 902,
    posts: 54,
    clips: 33,
    tierPriceMonthly: 7,
    tierName: 'Ink Club',
    tags: ['animation', 'shorts', 'absurd'],
  },
  {
    id: 'cr3',
    username: 'devonroast',
    displayName: 'Devon Roast',
    bio: 'Late rooms only. Premises, voice memos, and full indie specials for people who can take a joke.',
    city: 'Chicago, IL',
    bannerHue: 32,
    avatarInitials: 'DR',
    supporters: 2410,
    posts: 120,
    clips: 67,
    tierPriceMonthly: 12,
    tierName: 'Green Room',
    tags: ['roast', 'road', 'specials'],
  },
]

export const posts: Post[] = [
  {
    id: 'p1',
    creatorId: 'cr1',
    kind: 'video',
    access: 'public',
    title: 'Crowdwork kill — Mic & Mirror',
    body: 'Four minutes, no vanity cutaways. The crypto guy in row three.',
    durationLabel: '4:12',
    createdAt: '2026-08-16T20:10:00.000Z',
    tipTotal: 84,
    mediaTone: 24,
  },
  {
    id: 'p2',
    creatorId: 'cr2',
    kind: 'animation',
    access: 'public',
    title: 'Plant Union (teaser)',
    body: 'Thirty-second animated premise. Full short unlocks for Ink Club.',
    durationLabel: '0:32',
    createdAt: '2026-08-16T18:40:00.000Z',
    tipTotal: 41,
    mediaTone: 200,
  },
  {
    id: 'p3',
    creatorId: 'cr1',
    kind: 'audio',
    access: 'supporters',
    title: 'Writing lab — moving home at 32',
    body: 'Unedited voice memo. Tags, false starts, and the punch that landed at Brick.',
    durationLabel: '11:08',
    createdAt: '2026-08-16T15:05:00.000Z',
    tipTotal: 156,
    mediaTone: 12,
  },
  {
    id: 'p4',
    creatorId: 'cr3',
    kind: 'video',
    access: 'supporters',
    title: 'Indie special: After the Lottery',
    body: 'Full 48-minute set. No network edit. No laugh track.',
    durationLabel: '48:03',
    createdAt: '2026-08-15T23:20:00.000Z',
    tipTotal: 620,
    mediaTone: 36,
  },
  {
    id: 'p5',
    creatorId: 'cr3',
    kind: 'text',
    access: 'public',
    title: 'Open mic — Allston After Fri',
    body: 'Hosting late. 5 comics · 5 minutes. Political free-for-all, funny first.',
    createdAt: '2026-08-15T19:00:00.000Z',
    tipTotal: 18,
    mediaTone: 40,
  },
  {
    id: 'p6',
    creatorId: 'cr2',
    kind: 'animation',
    access: 'supporters',
    title: 'Plant Union — full short',
    body: 'Animated comedy short. The bargaining scene the brands wouldn’t touch.',
    durationLabel: '3:44',
    createdAt: '2026-08-15T14:30:00.000Z',
    tipTotal: 210,
    mediaTone: 195,
  },
  {
    id: 'p7',
    creatorId: 'cr1',
    kind: 'video',
    access: 'public',
    title: 'Premise drop: therapy group project',
    body: 'Public teaser. Full tag workshop lives behind Backstage.',
    durationLabel: '1:05',
    createdAt: '2026-08-14T21:15:00.000Z',
    tipTotal: 33,
    mediaTone: 16,
  },
  {
    id: 'p8',
    creatorId: 'cr3',
    kind: 'audio',
    access: 'supporters',
    title: 'Road notes — Toledo to Cleveland',
    body: 'Raw car audio. What died, what got a second life, what to never try clean.',
    durationLabel: '22:41',
    createdAt: '2026-08-14T11:00:00.000Z',
    tipTotal: 97,
    mediaTone: 28,
  },
]

export function getCreator(id: string) {
  return creators.find((c) => c.id === id)
}

export function getCreatorByUsername(username: string) {
  return creators.find((c) => c.username === username)
}

export function getPostsByCreator(creatorId: string) {
  return posts
    .filter((p) => p.creatorId === creatorId)
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
}

export function getPublicFeed() {
  return posts
    .filter((p) => p.access === 'public')
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
}

export function getPost(id: string) {
  return posts.find((p) => p.id === id)
}
