import { createFileRoute } from '@tanstack/react-router'
import { PostCard, SEED_FEED } from '#/components/feed/PostCard'

export const Route = createFileRoute('/feed/')({ component: FeedPage })

function FeedPage() {
  const posts = [...SEED_FEED].sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
  )

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-6">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
          Chronological
        </p>
        <h1 className="font-display text-3xl text-[var(--ink)]">Feed</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Newest first. Filter by scene — never by engagement score.
        </p>
      </header>

      <div className="mb-4 flex flex-wrap gap-2">
        {['All', 'My scene', 'Clips', 'Premises', 'Flyers'].map((label, i) => (
          <button
            key={label}
            type="button"
            className={`rounded-md px-3 py-1.5 text-xs uppercase tracking-[0.12em] ${
              i === 0
                ? 'bg-[var(--ink)] text-[var(--bg)]'
                : 'border border-[var(--line)] text-[var(--muted)]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  )
}
