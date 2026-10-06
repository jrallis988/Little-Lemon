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

const STORAGE_KEY = 'oj.safety.v1'

type Report = {
  id: string
  creatorId: string
  reason: string
  createdAt: string
}

type SafetyState = {
  blockedCreatorIds: string[]
  reports: Report[]
}

type SafetyContextValue = SafetyState & {
  isBlocked: (creatorId: string) => boolean
  blockCreator: (creatorId: string) => void
  unblockCreator: (creatorId: string) => void
  reportCreator: (creatorId: string, reason: string) => void
}

const defaultState: SafetyState = {
  blockedCreatorIds: [],
  reports: [],
}

const SafetyContext = createContext<SafetyContextValue | null>(null)

function readState(): SafetyState {
  if (typeof window === 'undefined') return defaultState
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return defaultState
  }
}

export function SafetyProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SafetyState>(defaultState)

  useEffect(() => {
    setState(readState())
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const isBlocked = useCallback(
    (creatorId: string) => state.blockedCreatorIds.includes(creatorId),
    [state.blockedCreatorIds],
  )

  const blockCreator = useCallback((creatorId: string) => {
    setState((prev) => ({
      ...prev,
      blockedCreatorIds: prev.blockedCreatorIds.includes(creatorId)
        ? prev.blockedCreatorIds
        : [...prev.blockedCreatorIds, creatorId],
    }))
  }, [])

  const unblockCreator = useCallback((creatorId: string) => {
    setState((prev) => ({
      ...prev,
      blockedCreatorIds: prev.blockedCreatorIds.filter((id) => id !== creatorId),
    }))
  }, [])

  const reportCreator = useCallback((creatorId: string, reason: string) => {
    setState((prev) => ({
      ...prev,
      reports: [
        {
          id: `r_${crypto.randomUUID().slice(0, 8)}`,
          creatorId,
          reason: reason.trim() || 'unspecified',
          createdAt: new Date().toISOString(),
        },
        ...prev.reports,
      ],
    }))
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      isBlocked,
      blockCreator,
      unblockCreator,
      reportCreator,
    }),
    [state, isBlocked, blockCreator, unblockCreator, reportCreator],
  )

  return (
    <SafetyContext.Provider value={value}>{children}</SafetyContext.Provider>
  )
}

export function useSafety() {
  const ctx = useContext(SafetyContext)
  if (!ctx) throw new Error('useSafety must be used within SafetyProvider')
  return ctx
}
