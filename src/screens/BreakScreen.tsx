import { MoonStar } from "lucide-react";
import { formatClock, formatMinutes } from "@/lib/utils";
import { useParentStore } from "@/stores/profileStore";
import { useSessionStore } from "@/stores/sessionStore";

/** Screen 8 — Break / Time Limit Screen */
export function BreakScreen() {
  const dailyLimit = useParentStore((s) => s.controls.dailyLimitMinutes);
  const elapsed = useSessionStore((s) => s.elapsedSeconds);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-foam animate-fade-in">
      <div className="absolute inset-0 logo-mesh" aria-hidden />
      <div className="absolute inset-0 bg-navy-deep/55" />
      <div className="relative z-10 max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10">
          <MoonStar className="h-8 w-8 text-orange" />
        </div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky">
          Session pause
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
          Time for a break
        </h1>
        <p className="mt-5 text-base leading-relaxed text-foam/80">
          You’ve used today’s Surf time. Navigation stays locked until a parent
          adjusts the limit or tomorrow’s quota resets.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="rounded-3xl bg-white/10 px-4 py-5 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-wider text-foam/70">Used</p>
            <p className="mt-2 font-display text-2xl">{formatClock(elapsed)}</p>
          </div>
          <div className="rounded-3xl bg-white/10 px-4 py-5 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-wider text-foam/70">
              Daily limit
            </p>
            <p className="mt-2 font-display text-2xl">
              {formatMinutes(dailyLimit)}
            </p>
          </div>
        </div>
        <p className="mt-8 text-sm text-foam/70">
          Ask a parent if you need more learning time today.
        </p>
      </div>
    </section>
  );
}
