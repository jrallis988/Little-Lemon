"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AccountRole, DemoUser } from '#/domain/oj-types'

const STORAGE_KEY = 'oj.demo-auth.v1'

type AuthContextValue = {
  user: DemoUser | null
  ready: boolean
  signUp: (input: {
    name: string
    email: string
    password: string
    role: AccountRole
  }) => { ok: true } | { ok: false; error: string }
  signIn: (input: {
    email: string
    password: string
  }) => { ok: true } | { ok: false; error: string }
  signOut: () => void
  setRole: (role: AccountRole) => void
  updateCreatorSettings: (input: {
    tierName: string
    tierPriceMonthly: number
  }) => void
  creatorSettings: { tierName: string; tierPriceMonthly: number }
}

type StoredAuth = {
  user: DemoUser | null
  passwordByEmail: Record<string, string>
  usersByEmail: Record<string, DemoUser>
  creatorSettings: { tierName: string; tierPriceMonthly: number }
}

const defaultStored: StoredAuth = {
  user: null,
  passwordByEmail: {},
  usersByEmail: {},
  creatorSettings: { tierName: 'Backstage', tierPriceMonthly: 9 },
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readStorage(): StoredAuth {
  if (typeof window === 'undefined') return defaultStored
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultStored
    return { ...defaultStored, ...JSON.parse(raw) }
  } catch {
    return defaultStored
  }
}

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<StoredAuth>(defaultStored)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setStored(readStorage())
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready || typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  }, [stored, ready])

  const signUp: AuthContextValue['signUp'] = useCallback((input) => {
    const email = input.email.trim().toLowerCase()
    if (!email || !input.password || !input.name.trim()) {
      return { ok: false, error: 'Name, email, and password are required.' }
    }
    if (input.password.length < 6) {
      return { ok: false, error: 'Password must be at least 6 characters.' }
    }

    const current = readStorage()
    if (current.passwordByEmail[email] || stored.passwordByEmail[email]) {
      return { ok: false, error: 'An account with that email already exists.' }
    }

    const user: DemoUser = {
      id: `u_${crypto.randomUUID().slice(0, 8)}`,
      name: input.name.trim(),
      email,
      role: input.role,
      creatorUsername: input.role === 'creator' ? 'maya.kill' : undefined,
    }

    setStored((prev) => ({
      ...prev,
      passwordByEmail: { ...prev.passwordByEmail, [email]: input.password },
      usersByEmail: { ...prev.usersByEmail, [email]: user },
      user,
    }))

    return { ok: true }
  }, [stored.passwordByEmail])

  const signIn: AuthContextValue['signIn'] = useCallback((input) => {
    const email = input.email.trim().toLowerCase()
    const expected =
      stored.passwordByEmail[email] ?? readStorage().passwordByEmail[email]
    if (!expected || expected !== input.password) {
      return { ok: false, error: 'Invalid email or password.' }
    }

    const remembered =
      stored.usersByEmail[email] ?? readStorage().usersByEmail[email]
    const user: DemoUser =
      remembered ??
      ({
        id: `u_${crypto.randomUUID().slice(0, 8)}`,
        name: email.split('@')[0] ?? 'Comic',
        email,
        role: 'fan',
      } satisfies DemoUser)

    setStored((prev) => ({
      ...prev,
      usersByEmail: { ...prev.usersByEmail, [email]: user },
      user,
    }))

    return { ok: true }
  }, [stored.passwordByEmail, stored.usersByEmail])

  const signOut = useCallback(() => {
    setStored((prev) => ({ ...prev, user: null }))
  }, [])

  const setRole = useCallback((role: AccountRole) => {
    setStored((prev) => {
      if (!prev.user) return prev
      const user: DemoUser = {
        ...prev.user,
        role,
        creatorUsername:
          role === 'creator'
            ? (prev.user.creatorUsername ?? 'maya.kill')
            : undefined,
      }
      return {
        ...prev,
        user,
        usersByEmail: { ...prev.usersByEmail, [user.email]: user },
      }
    })
  }, [])

  const updateCreatorSettings = useCallback(
    (input: { tierName: string; tierPriceMonthly: number }) => {
      setStored((prev) => ({
        ...prev,
        creatorSettings: {
          tierName: input.tierName.trim() || prev.creatorSettings.tierName,
          tierPriceMonthly: Math.max(1, Math.round(input.tierPriceMonthly)),
        },
      }))
    },
    [],
  )

  const value = useMemo(
    () => ({
      user: stored.user,
      ready,
      signUp,
      signIn,
      signOut,
      setRole,
      updateCreatorSettings,
      creatorSettings: stored.creatorSettings,
    }),
    [
      stored.user,
      stored.creatorSettings,
      ready,
      signUp,
      signIn,
      signOut,
      setRole,
      updateCreatorSettings,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useDemoAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useDemoAuth must be used within DemoAuthProvider')
  return ctx
}
