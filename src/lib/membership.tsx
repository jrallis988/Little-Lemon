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

const STORAGE_KEY = 'oj.membership.v1'

type MembershipState = {
  /** Creator ids the fan has unlocked */
  unlockedCreatorIds: string[]
  /** Running tip totals keyed by creator id */
  tipTotalsByCreator: Record<string, number>
  lastReceipt?: {
    kind: 'subscribe' | 'tip'
    creatorId: string
    amount: number
    label: string
    at: string
  }
}

type MembershipContextValue = MembershipState & {
  isUnlocked: (creatorId: string) => boolean
  subscribe: (creatorId: string, tierName: string, price: number) => void
  tip: (creatorId: string, amount: number, label: string) => void
  clearReceipt: () => void
}

const defaultState: MembershipState = {
  unlockedCreatorIds: [],
  tipTotalsByCreator: {},
}

const MembershipContext = createContext<MembershipContextValue | null>(null)

function readStorage(): MembershipState {
  if (typeof window === 'undefined') return defaultState
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return defaultState
  }
}

export function MembershipProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MembershipState>(defaultState)

  useEffect(() => {
    setState(readStorage())
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const isUnlocked = useCallback(
    (creatorId: string) => state.unlockedCreatorIds.includes(creatorId),
    [state.unlockedCreatorIds],
  )

  const subscribe = useCallback(
    (creatorId: string, tierName: string, price: number) => {
      setState((prev) => ({
        ...prev,
        unlockedCreatorIds: prev.unlockedCreatorIds.includes(creatorId)
          ? prev.unlockedCreatorIds
          : [...prev.unlockedCreatorIds, creatorId],
        lastReceipt: {
          kind: 'subscribe',
          creatorId,
          amount: price,
          label: tierName,
          at: new Date().toISOString(),
        },
      }))
    },
    [],
  )

  const tip = useCallback((creatorId: string, amount: number, label: string) => {
    setState((prev) => ({
      ...prev,
      tipTotalsByCreator: {
        ...prev.tipTotalsByCreator,
        [creatorId]: (prev.tipTotalsByCreator[creatorId] ?? 0) + amount,
      },
      lastReceipt: {
        kind: 'tip',
        creatorId,
        amount,
        label,
        at: new Date().toISOString(),
      },
    }))
  }, [])

  const clearReceipt = useCallback(() => {
    setState((prev) => ({ ...prev, lastReceipt: undefined }))
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      isUnlocked,
      subscribe,
      tip,
      clearReceipt,
    }),
    [state, isUnlocked, subscribe, tip, clearReceipt],
  )

  return (
    <MembershipContext.Provider value={value}>
      {children}
    </MembershipContext.Provider>
  )
}

export function useMembership() {
  const ctx = useContext(MembershipContext)
  if (!ctx) throw new Error('useMembership must be used within MembershipProvider')
  return ctx
}
