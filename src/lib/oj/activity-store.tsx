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

const STORAGE_KEY = 'oj.activity.v1'
const MAX_ITEMS = 80

export type ActivityKind =
  | 'subscribe'
  | 'tip'
  | 'publish'
  | 'reply'
  | 'report'
  | 'system'

export type ActivityItem = {
  id: string
  kind: ActivityKind
  title: string
  body: string
  href?: string
  createdAt: string
  read: boolean
}

type ActivityState = {
  items: ActivityItem[]
}

type ActivityContextValue = ActivityState & {
  push: (input: Omit<ActivityItem, 'id' | 'createdAt' | 'read'>) => void
  markAllRead: () => void
  unreadCount: number
}

const defaultState: ActivityState = { items: [] }

const ActivityContext = createContext<ActivityContextValue | null>(null)

function readStorage(): ActivityState {
  if (typeof window === 'undefined') return defaultState
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as ActivityState
    return { items: Array.isArray(parsed.items) ? parsed.items : [] }
  } catch {
    return defaultState
  }
}

export function ActivityProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ActivityState>(defaultState)

  useEffect(() => {
    setState(readStorage())
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const push = useCallback(
    (input: Omit<ActivityItem, 'id' | 'createdAt' | 'read'>) => {
      const item: ActivityItem = {
        ...input,
        id: `act_${crypto.randomUUID().slice(0, 8)}`,
        createdAt: new Date().toISOString(),
        read: false,
      }
      setState((prev) => ({
        items: [item, ...prev.items].slice(0, MAX_ITEMS),
      }))
    },
    [],
  )

  const markAllRead = useCallback(() => {
    setState((prev) => ({
      items: prev.items.map((i) => (i.read ? i : { ...i, read: true })),
    }))
  }, [])

  const unreadCount = useMemo(
    () => state.items.filter((i) => !i.read).length,
    [state.items],
  )

  const value = useMemo(
    () => ({
      ...state,
      push,
      markAllRead,
      unreadCount,
    }),
    [state, push, markAllRead, unreadCount],
  )

  return (
    <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>
  )
}

export function useActivity() {
  const ctx = useContext(ActivityContext)
  if (!ctx) throw new Error('useActivity must be used within ActivityProvider')
  return ctx
}
