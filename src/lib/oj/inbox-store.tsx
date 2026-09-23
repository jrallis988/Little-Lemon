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
import { backstageThreads } from '#/lib/oj/catalog'
import type { BackstageThread } from '#/domain/oj-types'

const STORAGE_KEY = 'oj.inbox.v1'

export type InboxMessage = {
  id: string
  threadId: string
  body: string
  from: 'them' | 'you'
  createdAt: string
}

type InboxState = {
  threads: BackstageThread[]
  messages: InboxMessage[]
}

type InboxContextValue = InboxState & {
  openThread: (threadId: string) => void
  reply: (threadId: string, body: string) => void
  messagesFor: (threadId: string) => InboxMessage[]
}

const InboxContext = createContext<InboxContextValue | null>(null)

function seedMessages(): InboxMessage[] {
  return backstageThreads.map((t) => ({
    id: `m_${t.id}`,
    threadId: t.id,
    body: t.preview,
    from: 'them' as const,
    createdAt: t.updatedAt,
  }))
}

function readState(): InboxState {
  if (typeof window === 'undefined') {
    return { threads: backstageThreads, messages: seedMessages() }
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { threads: backstageThreads, messages: seedMessages() }
    const parsed = JSON.parse(raw) as InboxState
    return {
      threads: parsed.threads?.length ? parsed.threads : backstageThreads,
      messages: parsed.messages?.length ? parsed.messages : seedMessages(),
    }
  } catch {
    return { threads: backstageThreads, messages: seedMessages() }
  }
}

export function InboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<InboxState>({
    threads: backstageThreads,
    messages: [],
  })

  useEffect(() => {
    setState(readState())
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const openThread = useCallback((threadId: string) => {
    setState((prev) => ({
      ...prev,
      threads: prev.threads.map((t) =>
        t.id === threadId ? { ...t, unread: false } : t,
      ),
    }))
  }, [])

  const reply = useCallback((threadId: string, body: string) => {
    const trimmed = body.trim()
    if (!trimmed) return
    const now = new Date().toISOString()
    const msg: InboxMessage = {
      id: `m_${crypto.randomUUID().slice(0, 8)}`,
      threadId,
      body: trimmed,
      from: 'you',
      createdAt: now,
    }
    setState((prev) => ({
      threads: prev.threads.map((t) =>
        t.id === threadId
          ? { ...t, preview: trimmed, updatedAt: now, unread: false }
          : t,
      ),
      messages: [...prev.messages, msg],
    }))
  }, [])

  const messagesFor = useCallback(
    (threadId: string) =>
      state.messages
        .filter((m) => m.threadId === threadId)
        .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt)),
    [state.messages],
  )

  const value = useMemo(
    () => ({
      ...state,
      openThread,
      reply,
      messagesFor,
    }),
    [state, openThread, reply, messagesFor],
  )

  return (
    <InboxContext.Provider value={value}>{children}</InboxContext.Provider>
  )
}

export function useInbox() {
  const ctx = useContext(InboxContext)
  if (!ctx) throw new Error('useInbox must be used within InboxProvider')
  return ctx
}
