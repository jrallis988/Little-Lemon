import { Link } from '@tanstack/react-router'
import { Compass, MessageSquare, Radio, UserRound } from 'lucide-react'
import { Logo } from '#/components/brand/Logo'

const nav = [
  { to: '/discover', label: 'Discover', icon: Compass },
  { to: '/messages', label: 'Backstage', icon: MessageSquare },
  {
    to: '/c/$username',
    params: { username: 'maya.kill' },
    label: 'Creators',
    icon: Radio,
  },
  { to: '/settings', label: 'You', icon: UserRound },
] as const

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--header)] backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Logo size="sm" />
        <p className="hidden text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] sm:block">
          Only Jokes
        </p>
        <Link
          to="/discover"
          className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-semibold text-[var(--on-accent)] no-underline hover:opacity-90"
        >
          Discover
        </Link>
      </div>
    </header>
  )
}

export function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[var(--header)] backdrop-blur-md sm:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-1 py-1.5">
        {nav.map((item) => {
          const Icon = item.icon
          const linkProps =
            'params' in item
              ? { to: item.to, params: item.params }
              : { to: item.to }

          return (
            <li key={item.label} className="flex-1">
              <Link
                {...linkProps}
                className="flex flex-col items-center gap-0.5 px-1 py-2 text-[10px] uppercase tracking-[0.14em] text-[var(--muted)] no-underline"
                activeProps={{
                  className:
                    'flex flex-col items-center gap-0.5 px-1 py-2 text-[10px] uppercase tracking-[0.14em] text-[var(--ice)] no-underline',
                }}
              >
                <Icon className="h-5 w-5" strokeWidth={1.8} />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export function AppShell({
  children,
  withNav = true,
}: {
  children: React.ReactNode
  withNav?: boolean
}) {
  return (
    <div className="mx-auto min-h-dvh max-w-5xl">
      <Header />
      <main className={withNav ? 'safe-bottom' : undefined}>{children}</main>
      {withNav ? <BottomNav /> : null}
    </div>
  )
}
