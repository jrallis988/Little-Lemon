import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/lib/constants";
import type { MiloMessage } from "@/services/miloAi";

type Thread = {
  id: string;
  topic: string;
  messages: MiloMessage[];
  updatedAt: string;
};

type MiloState = {
  threads: Record<string, Thread>;
  activeThreadId: string | null;
  ensureThread: (topic: string) => string;
  appendMessage: (threadId: string, message: MiloMessage) => void;
  clearThread: (threadId: string) => void;
  getActiveMessages: () => MiloMessage[];
};

function threadKey(topic: string): string {
  return topic.trim().toLowerCase() || "general";
}

export const useMiloStore = create<MiloState>()(
  persist(
    (set, get) => ({
      threads: {},
      activeThreadId: null,
      ensureThread: (topic) => {
        const id = threadKey(topic);
        const existing = get().threads[id];
        if (existing) {
          set({ activeThreadId: id });
          return id;
        }
        const thread: Thread = {
          id,
          topic: topic.trim() || "General help",
          messages: [],
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          threads: { ...state.threads, [id]: thread },
          activeThreadId: id,
        }));
        return id;
      },
      appendMessage: (threadId, message) =>
        set((state) => {
          const thread = state.threads[threadId];
          if (!thread) return state;
          return {
            threads: {
              ...state.threads,
              [threadId]: {
                ...thread,
                messages: [...thread.messages, message].slice(-30),
                updatedAt: new Date().toISOString(),
              },
            },
          };
        }),
      clearThread: (threadId) =>
        set((state) => {
          const thread = state.threads[threadId];
          if (!thread) return state;
          return {
            threads: {
              ...state.threads,
              [threadId]: { ...thread, messages: [] },
            },
          };
        }),
      getActiveMessages: () => {
        const id = get().activeThreadId;
        if (!id) return [];
        return get().threads[id]?.messages ?? [];
      },
    }),
    { name: `${STORAGE_KEYS.projects}.milo` },
  ),
);

export const MILO_QUICK_ACTIONS = [
  {
    id: "explain",
    label: "Explain simply",
    prompt: "Explain the main idea in simpler words for my grade.",
  },
  {
    id: "vocab",
    label: "Vocab check",
    prompt:
      "Quiz me on 3 vocabulary words from this topic. Wait for my answers before revealing.",
  },
  {
    id: "cite",
    label: "Help me cite",
    prompt:
      "Help me write one citation sentence in my own words using a trusted source on this page.",
  },
  {
    id: "compare",
    label: "Compare sources",
    prompt:
      "Compare the top two sources: what does each emphasize, and where do they agree?",
  },
] as const;
