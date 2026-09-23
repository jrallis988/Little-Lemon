"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Creator, Post } from '#/domain/oj-types'

export type SupportMode = 'subscribe' | 'tip'

type SupportTarget = {
  mode: SupportMode
  creator: Creator
  post?: Post
}

type SupportContextValue = {
  target: SupportTarget | null
  openSubscribe: (creator: Creator) => void
  openTip: (creator: Creator, post?: Post) => void
  close: () => void
}

const SupportContext = createContext<SupportContextValue | null>(null)

export function SupportProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<SupportTarget | null>(null)

  const openSubscribe = useCallback((creator: Creator) => {
    setTarget({ mode: 'subscribe', creator })
  }, [])

  const openTip = useCallback((creator: Creator, post?: Post) => {
    setTarget({ mode: 'tip', creator, post })
  }, [])

  const close = useCallback(() => setTarget(null), [])

  const value = useMemo(
    () => ({ target, openSubscribe, openTip, close }),
    [target, openSubscribe, openTip, close],
  )

  return (
    <SupportContext.Provider value={value}>{children}</SupportContext.Provider>
  )
}

export function useSupport() {
  const ctx = useContext(SupportContext)
  if (!ctx) throw new Error('useSupport must be used within SupportProvider')
  return ctx
}
