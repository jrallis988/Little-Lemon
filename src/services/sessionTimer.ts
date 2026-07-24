import { SESSION_TICK_MS } from "@/lib/constants";
import { useSessionStore } from "@/stores/sessionStore";

/**
 * Background session worker.
 * Tracks active usage and flips limitReached when daily quota expires.
 */
export class SessionTimerWorker {
  private intervalId: ReturnType<typeof setInterval> | null = null;

  start(): void {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => {
      useSessionStore.getState().tick();
    }, SESSION_TICK_MS);
  }

  stop(): void {
    if (!this.intervalId) return;
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}

export const sessionTimerWorker = new SessionTimerWorker();
