"use client"

import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import type { AccountRole } from '#/domain/oj-types'
import { useDemoAuth } from '#/lib/demo-auth'
import { Logo } from '#/components/brand/Logo'

export function AuthScreen({
  initialMode = 'signup',
  initialRole = 'fan',
}: {
  initialMode?: 'signup' | 'signin'
  initialRole?: AccountRole
}) {
  const { signIn, signUp } = useDemoAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState(initialMode)
  const [role, setRole] = useState<AccountRole>(initialRole)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    await new Promise((r) => setTimeout(r, 200))

    const result =
      mode === 'signup'
        ? signUp({ name, email, password, role })
        : signIn({ email, password })

    setBusy(false)
    if (!result.ok) {
      setError(result.error)
      return
    }

    void navigate({
      to: role === 'creator' || mode === 'signin' ? '/settings' : '/discover',
    })
  }

  return (
    <main className="relative mx-auto flex min-h-dvh max-w-lg flex-col px-5 pb-10 pt-6">
      <header className="flex items-center justify-between">
        <Logo size="sm" />
        <Link
          to="/discover"
          className="text-sm text-[var(--muted)] no-underline hover:text-[var(--ink)]"
        >
          Skip for now
        </Link>
      </header>

      <section className="mt-10">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--tint)]">
          {mode === 'signup' ? 'Create account' : 'Welcome back'}
        </p>
        <h1 className="mt-2 font-display text-4xl text-[var(--ink)]">
          {mode === 'signup' ? 'Join only Jokes' : 'Sign in'}
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Demo auth stores your session on this device. Production wires Better
          Auth + Postgres when DATABASE_URL is set.
        </p>

        {mode === 'signup' ? (
          <div className="mt-6 grid grid-cols-2 gap-2">
            {(
              [
                ['fan', 'Fan'],
                ['creator', 'Creator'],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setRole(value)}
                className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                  role === value
                    ? 'border-white bg-white text-[var(--on-accent)]'
                    : 'border-[var(--line)] text-[var(--ink)] hover:bg-white/10'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          {mode === 'signup' ? (
            <label className="block text-sm text-[var(--muted)]">
              Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 h-11 w-full rounded-xl border border-[var(--line)] bg-white/10 px-3 text-[var(--ink)] outline-none focus:border-white"
                autoComplete="name"
                required
              />
            </label>
          ) : null}
          <label className="block text-sm text-[var(--muted)]">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-[var(--line)] bg-white/10 px-3 text-[var(--ink)] outline-none focus:border-white"
              autoComplete="email"
              required
            />
          </label>
          <label className="block text-sm text-[var(--muted)]">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-[var(--line)] bg-white/10 px-3 text-[var(--ink)] outline-none focus:border-white"
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              required
              minLength={6}
            />
          </label>

          {error ? (
            <p className="rounded-xl bg-[#fb7185]/15 px-3 py-2 text-sm text-[#ffe4e8]">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-[var(--accent)] py-3.5 text-sm font-semibold text-[var(--on-accent)] hover:opacity-95 disabled:opacity-60"
          >
            {busy
              ? 'Working…'
              : mode === 'signup'
                ? `Create ${role} account`
                : 'Sign in'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode((m) => (m === 'signup' ? 'signin' : 'signup'))
            setError(null)
          }}
          className="mt-4 w-full text-center text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]"
        >
          {mode === 'signup'
            ? 'Already have an account? Sign in'
            : 'Need an account? Sign up'}
        </button>
      </section>
    </main>
  )
}
