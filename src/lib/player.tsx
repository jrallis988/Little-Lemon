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

type PlayerTarget = {
  post: Post
  creator: Creator
}

type PlayerContextValue = {
  target: PlayerTarget | null
  openPlayer: (creator: Creator, post: Post) => void
  closePlayer: () => void
}

const PlayerContext = createContext<PlayerContextValue | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<PlayerTarget | null>(null)

  const openPlayer = useCallback((creator: Creator, post: Post) => {
    setTarget({ creator, post })
  }, [])

  const closePlayer = useCallback(() => setTarget(null), [])

  const value = useMemo(
    () => ({ target, openPlayer, closePlayer }),
    [target, openPlayer, closePlayer],
  )

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
