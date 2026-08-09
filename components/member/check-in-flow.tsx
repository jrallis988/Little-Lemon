"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  QrCode,
  SignalZero,
  Users,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MemberCard } from "@/components/member/member-ui";
import { cn } from "@/lib/utils";

export type CheckInState =
  | "idle"
  | "scanning"
  | "success"
  | "offline"
  | "club_full";

const STATE_META: Record<
  CheckInState,
  { title: string; detail: string; screen: string }
> = {
  idle: {
    title: "Ready to check in",
    detail: "Hold your phone near the scanner or tap Start scan.",
    screen: "28 · Idle",
  },
  scanning: {
    title: "Scanning…",
    detail: "Keep the QR in frame until the club reader confirms.",
    screen: "29 · Scanning",
  },
  success: {
    title: "You’re checked in",
    detail: "Have a great workout. Judgement Free Zone® awaits.",
    screen: "30 · Success",
  },
  offline: {
    title: "You’re offline",
    detail: "Show your digital keytag at the desk — it’s cached on this device.",
    screen: "31 · Offline",
  },
  club_full: {
    title: "Club at capacity",
    detail: "Try again in a bit, or check Crowd Meter for a quieter time.",
    screen: "32 · Club full",
  },
};

export function CheckInFlow({
  memberName = "Member",
  clubName = "Your home club",
}: {
  memberName?: string;
  clubName?: string;
}) {
  const [state, setState] = useState<CheckInState>("idle");
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const sync = () => setOnline(typeof navigator !== "undefined" ? navigator.onLine : true);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  useEffect(() => {
    if (!online && state !== "offline" && state !== "success") {
      setState("offline");
    }
  }, [online, state]);

  useEffect(() => {
    if (state !== "scanning") return;
    const timer = window.setTimeout(() => {
      // Demo outcomes: mostly success, occasional capacity.
      const roll = Math.random();
      setState(roll < 0.15 ? "club_full" : "success");
    }, 1600);
    return () => window.clearTimeout(timer);
  }, [state]);

  const meta = STATE_META[state];

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-pf-purple">
        Screen {meta.screen}
      </p>

      <MemberCard
        className={cn(
          "text-center transition",
          state === "success" && "border-emerald-300 bg-emerald-50/60",
          state === "club_full" && "border-amber-300 bg-amber-50/70",
          state === "offline" && "border-slate-300 bg-slate-50"
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-48 w-48 items-center justify-center rounded-3xl",
            state === "success" ? "bg-emerald-100" : "bg-pf-mist"
          )}
        >
          {state === "idle" || state === "scanning" ? (
            <div
              className={cn(
                "grid h-36 w-36 place-items-center rounded-2xl border-2 border-dashed bg-white font-display text-pf-purple",
                state === "scanning"
                  ? "animate-pulse border-pf-purple"
                  : "border-pf-purple/40"
              )}
            >
              {state === "scanning" ? (
                <Loader2 className="h-10 w-10 animate-spin" aria-hidden />
              ) : (
                <QrCode className="h-12 w-12" aria-hidden />
              )}
            </div>
          ) : null}
          {state === "success" ? (
            <CheckCircle2 className="h-20 w-20 text-emerald-600" aria-hidden />
          ) : null}
          {state === "offline" ? (
            <WifiOff className="h-16 w-16 text-slate-500" aria-hidden />
          ) : null}
          {state === "club_full" ? (
            <Users className="h-16 w-16 text-amber-600" aria-hidden />
          ) : null}
        </div>

        <p className="mt-4 text-sm font-semibold text-pf-ink">{meta.title}</p>
        <p className="mt-1 text-xs text-pf-ink/55">{meta.detail}</p>
        <p className="mt-3 text-xs text-pf-ink/45">
          {memberName} · {clubName}
        </p>
        {!online ? (
          <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600">
            <SignalZero className="h-3.5 w-3.5" aria-hidden />
            Device offline
          </p>
        ) : null}
      </MemberCard>

      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant="purple"
          disabled={state === "scanning" || !online}
          onClick={() => setState("scanning")}
        >
          {state === "scanning" ? "Scanning…" : "Start scan"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setState("idle")}
        >
          Reset
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setState("offline")}
        >
          Simulate offline
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setState("club_full")}
        >
          Simulate full
        </Button>
      </div>
    </div>
  );
}
