import { MoonStar } from "lucide-react";
import { formatClock, formatMinutes } from "@/lib/utils";
import { useParentStore } from "@/stores/profileStore";
import { useSessionStore } from "@/stores/sessionStore";

/** Screen 8 — Break / Time Limit Screen */
export function BreakScreen() {
  const dailyLimit = useParentStore((s) => s.controls.dailyLimitMinutes);
  const elapsed = useSessionStore((s) => s.elapsedSeconds);

  return (
    <section className="flex min-h-screen items-center justify-center bg-navy-deep px-6 text-cream animate-fade-in">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(127,168,138,0.22),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(168,196,176,0.12),transparent_35%)]" />
      <div className="relative z-10 max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10">
          <MoonStar className="h-8 w-8 text-sage-soft" />
        </div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-sage-soft">
          Session pause
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
          Time for a break
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-soft">
          You’ve used today’s Surf time. Navigation stays locked until a parent
          adjusts the limit or tomorrow’s quota resets.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="rounded-3xl bg-white/5 px-4 py-5">
            <p className="text-xs uppercase tracking-wider text-slate-soft">
              Used
            </p>
            <p className="mt-2 font-display text-2xl">
              {formatClock(elapsed)}
            </p>
          </div>
          <div className="rounded-3xl bg-white/5 px-4 py-5">
            <p className="text-xs uppercase tracking-wider text-slate-soft">
              Daily limit
            </p>
            <p className="mt-2 font-display text-2xl">
              {formatMinutes(dailyLimit)}
            </p>
          </div>
        </div>
        <p className="mt-8 text-sm text-slate-soft">
          Ask a parent if you need more learning time today.
        </p>
      </div>
    </section>
  );
}
