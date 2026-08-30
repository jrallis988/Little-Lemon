import { Link, createFileRoute } from '@tanstack/react-router'
import { AppShell } from '#/components/layout/AppShell'
import { Avatar } from '#/components/ui/Avatar'
import { listCreators } from '#/lib/oj/catalog'

export const Route = createFileRoute('/creators/')({
  component: CreatorsPage,
})

function CreatorsPage() {
  const creators = listCreators()

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-6">
        <header className="mb-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--tint)]">
            Directory
          </p>
          <h1 className="font-display text-4xl text-[var(--ink)]">Creators</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Stand-ups and comedy animators — browse chronologically by name, open
            a green room, unlock a tier.
          </p>
        </header>

        <ul className="divide-y divide-[var(--hairline)]">
          {creators.map((creator) => (
            <li key={creator.id}>
              <Link
                to="/c/$username"
                params={{ username: creator.username }}
                className="flex items-center gap-3 py-4 no-underline transition hover:bg-white/5"
              >
                <Avatar
                  initials={creator.avatarInitials}
                  hue={creator.bannerHue}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[var(--ink)]">
                    {creator.displayName}
                  </p>
                  <p className="truncate text-xs text-[var(--muted)]">
                    @{creator.username} · {creator.city}
                  </p>
                  <p className="mt-1 line-clamp-1 text-sm text-[var(--ink-soft)]">
                    {creator.bio}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold text-[var(--ink)]">
                    ${creator.tierPriceMonthly}/mo
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--tint)]">
                    {creator.tierName}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  )
}
