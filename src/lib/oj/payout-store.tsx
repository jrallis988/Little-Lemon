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

const STORAGE_KEY = 'oj.payout.v1'

export type PayoutStatus = 'disconnected' | 'pending' | 'connected'

type PayoutState = {
  status: PayoutStatus
  accountId?: string
  connectedAt?: string
}

type PayoutContextValue = PayoutState & {
  connectDemo: () => void
  disconnect: () => void
  startConnect: () => Promise<{
    status: string
    url?: string
    message?: string
  }>
}

const defaultState: PayoutState = { status: 'disconnected' }

const PayoutContext = createContext<PayoutContextValue | null>(null)

function readStorage(): PayoutState {
  if (typeof window === 'undefined') return defaultState
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return defaultState
  }
}

export function PayoutProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PayoutState>(defaultState)

  useEffect(() => {
    setState(readStorage())
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const connectDemo = useCallback(() => {
    setState({
      status: 'connected',
      accountId: `acct_demo_${Date.now().toString(36)}`,
      connectedAt: new Date().toISOString(),
    })
  }, [])

  const disconnect = useCallback(() => {
    setState(defaultState)
  }, [])

  const startConnect = useCallback(async () => {
    const res = await fetch('/api/stripe/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        returnUrl:
          typeof window !== 'undefined'
            ? `${window.location.origin}/settings?connect=success`
            : undefined,
        refreshUrl:
          typeof window !== 'undefined'
            ? `${window.location.origin}/settings?connect=refresh`
            : undefined,
      }),
    })
    const data = (await res.json()) as {
      status: string
      url?: string
      message?: string
      accountId?: string
    }
    if (data.status === 'demo_ok') {
      setState({
        status: 'connected',
        accountId: data.accountId ?? `acct_demo_${Date.now().toString(36)}`,
        connectedAt: new Date().toISOString(),
      })
    } else if (data.status === 'stripe_onboarding' && data.url) {
      setState((prev) => ({ ...prev, status: 'pending' }))
      window.location.href = data.url
    }
    return data
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      connectDemo,
      disconnect,
      startConnect,
    }),
    [state, connectDemo, disconnect, startConnect],
  )

  return (
    <PayoutContext.Provider value={value}>{children}</PayoutContext.Provider>
  )
}

export function usePayout() {
  const ctx = useContext(PayoutContext)
  if (!ctx) throw new Error('usePayout must be used within PayoutProvider')
  return ctx
}
