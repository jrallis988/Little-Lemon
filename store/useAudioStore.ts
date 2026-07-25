import { create } from 'zustand';

import type { Track } from '@/types/models';

export type PlaybackStatus = 'idle' | 'loading' | 'ready' | 'playing' | 'paused' | 'ended';

type AudioState = {
  currentTrack: Track | null;
  queue: Track[];
  status: PlaybackStatus;
  isPlaying: boolean;
  positionMs: number;
  durationMs: number;
  /** 0–1 normalized progress */
  progress: number;

  setTrack: (track: Track, queue?: Track[]) => void;
  setQueue: (queue: Track[]) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  seek: (positionMs: number) => void;
  setProgress: (positionMs: number, durationMs?: number) => void;
  setStatus: (status: PlaybackStatus) => void;
  skipNext: () => void;
  skipPrevious: () => void;
  clear: () => void;
};

export const useAudioStore = create<AudioState>((set, get) => ({
  currentTrack: null,
  queue: [],
  status: 'idle',
  isPlaying: false,
  positionMs: 0,
  durationMs: 0,
  progress: 0,

  setTrack: (track, queue) =>
    set({
      currentTrack: track,
      queue: queue ?? get().queue,
      status: 'loading',
      isPlaying: true,
      positionMs: 0,
      durationMs: track.durationMs,
      progress: 0,
    }),

  setQueue: (queue) => set({ queue }),

  play: () => set({ isPlaying: true, status: 'playing' }),

  pause: () => set({ isPlaying: false, status: 'paused' }),

  togglePlay: () => {
    const { isPlaying, currentTrack } = get();
    if (!currentTrack) return;
    if (isPlaying) {
      set({ isPlaying: false, status: 'paused' });
    } else {
      set({ isPlaying: true, status: 'playing' });
    }
  },

  seek: (positionMs) => {
    const durationMs = get().durationMs || 1;
    const clamped = Math.max(0, Math.min(positionMs, durationMs));
    set({
      positionMs: clamped,
      progress: clamped / durationMs,
    });
  },

  setProgress: (positionMs, durationMs) => {
    const nextDuration = durationMs ?? get().durationMs;
    const safeDuration = nextDuration > 0 ? nextDuration : 1;
    set({
      positionMs,
      durationMs: nextDuration,
      progress: positionMs / safeDuration,
    });
  },

  setStatus: (status) =>
    set({
      status,
      isPlaying: status === 'playing',
    }),

  skipNext: () => {
    const { queue, currentTrack } = get();
    if (!currentTrack || queue.length === 0) return;
    const index = queue.findIndex((t) => t.id === currentTrack.id);
    const next = queue[index + 1];
    if (next) {
      get().setTrack(next, queue);
    }
  },

  skipPrevious: () => {
    const { queue, currentTrack, positionMs } = get();
    if (!currentTrack || queue.length === 0) return;
    if (positionMs > 3000) {
      get().seek(0);
      return;
    }
    const index = queue.findIndex((t) => t.id === currentTrack.id);
    const prev = queue[index - 1];
    if (prev) {
      get().setTrack(prev, queue);
    } else {
      get().seek(0);
    }
  },

  clear: () =>
    set({
      currentTrack: null,
      queue: [],
      status: 'idle',
      isPlaying: false,
      positionMs: 0,
      durationMs: 0,
      progress: 0,
    }),
}));
