import { createFileRoute } from '@tanstack/react-router'
import { AppShell } from '#/components/layout/AppShell'
import { DiscoveryFeed } from '#/components/feed/DiscoveryFeed'
import { getPublicFeed } from '#/lib/mock/oj'

export const Route = createFileRoute('/discover/')({
  component: DiscoverPage,
})

function DiscoverPage() {
  const feed = getPublicFeed()

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-6">
        <header className="mb-5">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--orange)]">
            Chronological
          </p>
          <h1 className="font-display text-4xl text-[var(--ink)]">Discover</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Public clips, open-mic notes, and teaser shorts — newest first. No
            engagement re-ranking.
          </p>
        </header>
        <DiscoveryFeed posts={feed} />
      </div>
    </AppShell>
  )
}
