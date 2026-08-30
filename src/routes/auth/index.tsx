import { createFileRoute } from '@tanstack/react-router'
import { AuthScreen } from '#/components/auth/AuthScreen'
import type { AccountRole } from '#/domain/oj-types'

type AuthSearch = {
  mode?: 'signup' | 'signin'
  role?: AccountRole
}

export const Route = createFileRoute('/auth/')({
  validateSearch: (search: Record<string, unknown>): AuthSearch => ({
    mode: search.mode === 'signin' ? 'signin' : 'signup',
    role: search.role === 'creator' ? 'creator' : 'fan',
  }),
  component: AuthPage,
})

function AuthPage() {
  const { mode, role } = Route.useSearch()
  return <AuthScreen initialMode={mode} initialRole={role} />
}
