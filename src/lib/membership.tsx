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
const MAX_RECEIPTS = 60

export type MembershipReceipt = {
  id: string
  kind: 'subscribe' | 'tip'
  creatorId: string
  amount: number
  label: string
  at: string
}

type MembershipState = {
  /** Creator ids the fan has unlocked */
  unlockedCreatorIds: string[]
  /** Running tip totals keyed by creator id */
  tipTotalsByCreator: Record<string, number>
  receipts: MembershipReceipt[]
  lastReceipt?: MembershipReceipt
}

type MembershipContextValue = MembershipState & {
  isUnlocked: (creatorId: string) => boolean
  subscribe: (creatorId: string, tierName: string, price: number) => void
  tip: (creatorId: string, amount: number, label: string) => void
  revoke: (creatorId: string) => void
  clearReceipt: () => void
}

const defaultState: MembershipState = {
  unlockedCreatorIds: [],
  tipTotalsByCreator: {},
  receipts: [],
}

const MembershipContext = createContext<MembershipContextValue | null>(null)

function readStorage(): MembershipState {
  if (typeof window === 'undefined') return defaultState
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as Partial<MembershipState>
    return {
      ...defaultState,
      ...parsed,
      receipts: Array.isArray(parsed.receipts) ? parsed.receipts : [],
      unlockedCreatorIds: Array.isArray(parsed.unlockedCreatorIds)
        ? parsed.unlockedCreatorIds
        : [],
      tipTotalsByCreator: parsed.tipTotalsByCreator ?? {},
    }
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
      const receipt: MembershipReceipt = {
        id: `rcpt_sub_${Date.now().toString(36)}`,
        kind: 'subscribe',
        creatorId,
        amount: price,
        label: tierName,
        at: new Date().toISOString(),
      }
      setState((prev) => ({
        ...prev,
        unlockedCreatorIds: prev.unlockedCreatorIds.includes(creatorId)
          ? prev.unlockedCreatorIds
          : [...prev.unlockedCreatorIds, creatorId],
        receipts: [receipt, ...prev.receipts].slice(0, MAX_RECEIPTS),
        lastReceipt: receipt,
      }))
    },
    [],
  )

  const tip = useCallback((creatorId: string, amount: number, label: string) => {
    const receipt: MembershipReceipt = {
      id: `rcpt_tip_${Date.now().toString(36)}`,
      kind: 'tip',
      creatorId,
      amount,
      label,
      at: new Date().toISOString(),
    }
    setState((prev) => ({
      ...prev,
      tipTotalsByCreator: {
        ...prev.tipTotalsByCreator,
        [creatorId]: (prev.tipTotalsByCreator[creatorId] ?? 0) + amount,
      },
      receipts: [receipt, ...prev.receipts].slice(0, MAX_RECEIPTS),
      lastReceipt: receipt,
    }))
  }, [])

  const revoke = useCallback((creatorId: string) => {
    setState((prev) => ({
      ...prev,
      unlockedCreatorIds: prev.unlockedCreatorIds.filter((id) => id !== creatorId),
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
      revoke,
      clearReceipt,
    }),
    [state, isUnlocked, subscribe, tip, revoke, clearReceipt],
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
