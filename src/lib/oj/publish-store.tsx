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
import type { AccessLevel, MediaKind, Post } from '#/domain/oj-types'

const STORAGE_KEY = 'oj.publish.v1'

type PublishInput = {
  creatorId: string
  title: string
  body: string
  kind: MediaKind
  access: AccessLevel
  durationLabel?: string
}

type PublishContextValue = {
  posts: Post[]
  publish: (input: PublishInput) => Post
  postsForCreator: (creatorId: string) => Post[]
  publicFeedExtras: () => Post[]
}

const PublishContext = createContext<PublishContextValue | null>(null)

function readPosts(): Post[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Post[]
  } catch {
    return []
  }
}

export function PublishProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    setPosts(readPosts())
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  }, [posts])

  const publish = useCallback((input: PublishInput) => {
    const post: Post = {
      id: `pub_${crypto.randomUUID().slice(0, 8)}`,
      creatorId: input.creatorId,
      kind: input.kind,
      access: input.access,
      title: input.title.trim(),
      body: input.body.trim(),
      durationLabel: input.durationLabel?.trim() || undefined,
      createdAt: new Date().toISOString(),
      tipTotal: 0,
      mediaTone: Math.floor(Math.random() * 360),
      playNote: 'Creator publish · demo media stage',
    }
    setPosts((prev) => [post, ...prev])
    return post
  }, [])

  const postsForCreator = useCallback(
    (creatorId: string) =>
      posts
        .filter((p) => p.creatorId === creatorId)
        .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),
    [posts],
  )

  const publicFeedExtras = useCallback(
    () =>
      posts
        .filter((p) => p.access === 'public')
        .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),
    [posts],
  )

  const value = useMemo(
    () => ({ posts, publish, postsForCreator, publicFeedExtras }),
    [posts, publish, postsForCreator, publicFeedExtras],
  )

  return (
    <PublishContext.Provider value={value}>{children}</PublishContext.Provider>
  )
}

export function usePublish() {
  const ctx = useContext(PublishContext)
  if (!ctx) throw new Error('usePublish must be used within PublishProvider')
  return ctx
}
