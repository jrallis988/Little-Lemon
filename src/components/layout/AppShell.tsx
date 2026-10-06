"use client"

import { Link } from '@tanstack/react-router'
import { Compass, Library, MessageSquare, UserRound } from 'lucide-react'
import { Logo } from '#/components/brand/Logo'
import { useDemoAuth } from '#/lib/demo-auth'
import { useActivity } from '#/lib/oj/activity-store'
import { CheckoutBanner } from '#/components/layout/CheckoutBanner'

const nav = [
  { to: '/discover', label: 'Discover', icon: Compass },
  { to: '/library', label: 'Library', icon: Library },
  { to: '/messages', label: 'Backstage', icon: MessageSquare },
  { to: '/settings', label: 'You', icon: UserRound },
] as const

export function Header() {
  const { user, ready } = useDemoAuth()
  const { unreadCount } = useActivity()

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--hairline)] bg-[var(--header)] backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            <Link
              to="/activity"
              className="relative text-sm text-[var(--ink-soft)] no-underline hover:text-[var(--ink)]"
            >
              Activity
              {unreadCount > 0 ? (
                <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-semibold text-[var(--on-accent)]">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              ) : null}
            </Link>
            {ready && user ? (
              <Link
                to="/settings"
                className="max-w-[9rem] truncate text-sm font-medium text-[var(--ink-soft)] no-underline hover:text-[var(--ink)]"
              >
                {user.name}
              </Link>
            ) : (
              <Link
                to="/auth"
                search={{ mode: 'signup', role: 'fan' }}
                className="text-sm font-medium text-[var(--ink-soft)] no-underline hover:text-[var(--ink)]"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>
      <CheckoutBanner />
    </>
  )
}

export function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--hairline)] bg-[var(--header)] backdrop-blur-md sm:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-1 py-1.5">
        {nav.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.label} className="flex-1">
              <Link
                to={item.to}
                className="flex flex-col items-center gap-0.5 px-1 py-2 text-[10px] uppercase tracking-[0.14em] text-[var(--muted)] no-underline transition-colors"
                activeProps={{
                  className:
                    'flex flex-col items-center gap-0.5 px-1 py-2 text-[10px] uppercase tracking-[0.14em] text-[var(--ink)] no-underline',
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
