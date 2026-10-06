import { authClient } from '#/lib/auth-client'
import { Link } from '@tanstack/react-router'

export default function BetterAuthHeader() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return <div className="h-8 w-8 animate-pulse bg-[var(--wash)]" />
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-[var(--muted)]">{session.user.name}</span>
        <button
          type="button"
          onClick={() => {
            void authClient.signOut()
          }}
          className="h-9 border border-[var(--line)] px-3 text-sm"
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <Link
      to="/settings"
      className="inline-flex h-9 items-center border border-[var(--line)] px-3 text-sm no-underline"
    >
      Sign in
    </Link>
  )
}
