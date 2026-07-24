import { ShieldCheck } from "lucide-react";
import { useSessionStore } from "@/stores/sessionStore";
import { cn } from "@/lib/utils";

/**
 * Screen 6 — Learning Mode Active Overlay
 * Frosted confirmation that fades into a persistent subtle icon.
 */
export function LearningModeOverlay() {
  const visible = useSessionStore((s) => s.learningModeVisible);
  const settled = useSessionStore((s) => s.learningModeSettled);
  const dismiss = useSessionStore((s) => s.dismissLearningMode);

  if (!visible && !settled) return null;

  return (
    <>
      {visible && !settled && (
        <div
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-navy/25 backdrop-blur-md animate-learning-settle"
          aria-live="polite"
        >
          <div className="glass-panel mx-6 max-w-md rounded-3xl px-8 py-10 text-center animate-rise-in">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-soft text-sage-deep">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-navy">
              Learning Mode is on
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Safety filters are active. Only approved educational sources can
              open in Surf.
            </p>
          </div>
        </div>
      )}

      {settled && (
        <button
          type="button"
          onClick={dismiss}
          title="Learning Mode active"
          className={cn(
            "fixed bottom-20 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-cream shadow-soft transition hover:scale-105 md:bottom-6",
            "animate-fade-in",
          )}
          aria-label="Learning Mode is active"
        >
          <ShieldCheck className="h-5 w-5 animate-soft-pulse" />
        </button>
      )}
    </>
  );
}
