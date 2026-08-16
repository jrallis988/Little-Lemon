import type { FeedPost } from '#/domain/types'

const kindLabel: Record<FeedPost['kind'], string> = {
  clip: 'Clip',
  premise: 'Premise',
  flyer: 'Flyer',
  lab_memo: 'Lab',
}

/** Seed cards used until the DB is connected */
export const SEED_FEED: FeedPost[] = [
  {
    id: '1',
    kind: 'premise',
    title: 'Moving home at 32',
    body: 'My mom still labels leftovers like I’m a roommate she doesn’t trust.',
    mediaKind: 'none',
    mediaUrl: null,
    city: 'Brooklyn',
    region: 'NY',
    createdAt: '2026-08-16T18:20:00.000Z',
    author: {
      username: 'maya.kill',
      stageName: 'Maya Kill',
      avatarUrl: null,
      homeCity: 'Brooklyn',
    },
  },
  {
    id: '2',
    kind: 'clip',
    title: 'Crowdwork from Mic & Mirror',
    body: 'Four minutes, no vanity cutaways — just the room.',
    mediaKind: 'audio',
    mediaUrl: null,
    city: 'Chicago',
    region: 'IL',
    createdAt: '2026-08-16T14:05:00.000Z',
    author: {
      username: 'devonroast',
      stageName: 'Devon Roast',
      avatarUrl: null,
      homeCity: 'Chicago',
    },
  },
  {
    id: '3',
    kind: 'flyer',
    title: 'Allston After — Fri late mic',
    body: '5 comics · 5 minutes · political free-for-all, funny first.',
    mediaKind: 'image',
    mediaUrl: null,
    city: 'Boston',
    region: 'MA',
    createdAt: '2026-08-15T19:00:00.000Z',
    author: {
      username: 'rio.punch',
      stageName: 'Rio Punch',
      avatarUrl: null,
      homeCity: 'Boston',
    },
  },
]

export function PostCard({ post }: { post: FeedPost }) {
  return (
    <article className="border border-[var(--line)] bg-[var(--surface)] p-4">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
        <span className="font-semibold text-[var(--ink)]">{post.author.stageName}</span>
        <span className="text-[var(--muted)]">@{post.author.username}</span>
        {post.city ? (
          <span className="text-[var(--muted)]">· {post.city}</span>
        ) : null}
        <span className="ml-auto rounded bg-[var(--wash)] px-1.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
          {kindLabel[post.kind]}
        </span>
      </div>
      {post.title ? (
        <h2 className="mt-2 font-display text-xl text-[var(--ink)]">{post.title}</h2>
      ) : null}
      <p className="mt-2 whitespace-pre-wrap text-[var(--ink-soft)] leading-relaxed">
        {post.body}
      </p>
      {post.mediaKind !== 'none' ? (
        <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
          {post.mediaKind} attached
        </p>
      ) : null}
    </article>
  )
}
