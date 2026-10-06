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

const STORAGE_KEY = 'oj.follows.v1'

type FollowState = {
  followingCreatorIds: string[]
}

type FollowContextValue = FollowState & {
  isFollowing: (creatorId: string) => boolean
  follow: (creatorId: string) => void
  unfollow: (creatorId: string) => void
  toggle: (creatorId: string) => void
}

const defaultState: FollowState = { followingCreatorIds: [] }

const FollowContext = createContext<FollowContextValue | null>(null)

function readStorage(): FollowState {
  if (typeof window === 'undefined') return defaultState
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as FollowState
    return {
      followingCreatorIds: Array.isArray(parsed.followingCreatorIds)
        ? parsed.followingCreatorIds
        : [],
    }
  } catch {
    return defaultState
  }
}

export function FollowProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FollowState>(defaultState)

  useEffect(() => {
    setState(readStorage())
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const isFollowing = useCallback(
    (creatorId: string) => state.followingCreatorIds.includes(creatorId),
    [state.followingCreatorIds],
  )

  const follow = useCallback((creatorId: string) => {
    setState((prev) =>
      prev.followingCreatorIds.includes(creatorId)
        ? prev
        : {
            followingCreatorIds: [...prev.followingCreatorIds, creatorId],
          },
    )
  }, [])

  const unfollow = useCallback((creatorId: string) => {
    setState((prev) => ({
      followingCreatorIds: prev.followingCreatorIds.filter(
        (id) => id !== creatorId,
      ),
    }))
  }, [])

  const toggle = useCallback((creatorId: string) => {
    setState((prev) =>
      prev.followingCreatorIds.includes(creatorId)
        ? {
            followingCreatorIds: prev.followingCreatorIds.filter(
              (id) => id !== creatorId,
            ),
          }
        : {
            followingCreatorIds: [...prev.followingCreatorIds, creatorId],
          },
    )
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      isFollowing,
      follow,
      unfollow,
      toggle,
    }),
    [state, isFollowing, follow, unfollow, toggle],
  )

  return (
    <FollowContext.Provider value={value}>{children}</FollowContext.Provider>
  )
}

export function useFollow() {
  const ctx = useContext(FollowContext)
  if (!ctx) throw new Error('useFollow must be used within FollowProvider')
  return ctx
}
