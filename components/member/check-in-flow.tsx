"use client";

import Link from "next/link";
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
  | "club_full"
  | "denied";

const STATE_META: Record<
  CheckInState,
  { title: string; detail: string; screen: string }
> = {
  idle: {
    title: "Ready to check in",
    detail: "Issue a signed door token, then validate it with access control.",
    screen: "28 · Idle",
  },
  scanning: {
    title: "Validating with club reader…",
    detail: "Talking to the access-control service.",
    screen: "29 · Scanning",
  },
  success: {
    title: "You’re checked in",
    detail: "Door token accepted. Have a Judgement Free workout.",
    screen: "30 · Success",
  },
  offline: {
    title: "You’re offline",
    detail:
      "Showing your cached keytag token — staff can scan this at the desk.",
    screen: "31 · Offline",
  },
  club_full: {
    title: "Club at capacity",
    detail:
      "Access control rejected entry for capacity. Check Crowd Meter before you head over.",
    screen: "32 · Club full",
  },
  denied: {
    title: "Access denied",
    detail: "Token invalid or expired. Refresh and try again.",
    screen: "28 · Denied",
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
  const [code, setCode] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const sync = () =>
      setOnline(typeof navigator !== "undefined" ? navigator.onLine : true);
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
      try {
        const cached = localStorage.getItem("pf_keytag_cache");
        if (cached) {
          const parsed = JSON.parse(cached) as { code?: string };
          setCode(parsed.code ?? null);
        }
      } catch {
        /* ignore */
      }
    }
  }, [online, state]);

  function reset() {
    setState("idle");
    setMessage(null);
    setCode(null);
  }

  async function startCheckIn() {
    if (!online) {
      setState("offline");
      return;
    }
    setState("scanning");
    setMessage(null);
    try {
      const tokenRes = await fetch("/api/access/token", { method: "POST" });
      const tokenData = (await tokenRes.json()) as {
        error?: string;
        token?: { code: string; expiresAt: string };
        offline?: Record<string, unknown>;
      };
      if (!tokenRes.ok || !tokenData.token?.code) {
        throw new Error(tokenData.error ?? "Could not issue door token.");
      }
      setCode(tokenData.token.code);
      if (tokenData.offline) {
        localStorage.setItem(
          "pf_keytag_cache",
          JSON.stringify(tokenData.offline)
        );
      }

      const validateRes = await fetch("/api/access/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: tokenData.token.code }),
      });
      const validateData = (await validateRes.json()) as {
        ok?: boolean;
        result?: string;
        message?: string;
      };

      if (validateData.result === "club_full") {
        setState("club_full");
        setMessage(validateData.message ?? null);
        return;
      }
      if (!validateRes.ok || !validateData.ok) {
        setState("denied");
        setMessage(validateData.message ?? "Access denied.");
        return;
      }
      setState("success");
    } catch (err) {
      setState("denied");
      setMessage(err instanceof Error ? err.message : "Check-in failed.");
    }
  }

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
          (state === "offline" || state === "denied") &&
            "border-slate-300 bg-slate-50"
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-40 w-40 items-center justify-center rounded-3xl",
            state === "success" ? "bg-emerald-100" : "bg-pf-mist"
          )}
        >
          {state === "idle" || state === "scanning" ? (
            <div
              className={cn(
                "grid h-28 w-28 place-items-center rounded-2xl border-2 border-dashed bg-white font-display text-pf-purple",
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
          {state === "denied" ? (
            <SignalZero className="h-16 w-16 text-red-500" aria-hidden />
          ) : null}
        </div>

        <p className="mt-4 text-sm font-semibold text-pf-ink">{meta.title}</p>
        <p className="mt-1 text-xs text-pf-ink/55">{meta.detail}</p>
        {message ? (
          <p className="mt-2 text-xs font-semibold text-pf-purple">{message}</p>
        ) : null}
        {code ? (
          <p className="mt-3 break-all font-mono text-[10px] text-pf-ink/45">
            {code.slice(0, 48)}…
          </p>
        ) : null}
        <p className="mt-3 text-xs text-pf-ink/45">
          {memberName} · {clubName}
        </p>
        {!online ? (
          <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600">
            <SignalZero className="h-3.5 w-3.5" aria-hidden />
            Device offline · cached token
          </p>
        ) : null}
      </MemberCard>

      {state === "success" ? (
        <div className="grid grid-cols-2 gap-2">
          <Button asChild variant="purple">
            <Link href="/app/keytag">Digital keytag</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/app/crowd">Crowd Meter</Link>
          </Button>
        </div>
      ) : null}

      {state === "club_full" ? (
        <Button asChild variant="purple" className="w-full">
          <Link href="/app/crowd">Check Crowd Meter</Link>
        </Button>
      ) : null}

      {state === "denied" ? (
        <p className="text-center text-xs text-pf-ink/55">
          Need a fresh barcode?{" "}
          <Link
            href="/app/keytag"
            className="font-semibold text-pf-purple underline"
          >
            Refresh digital keytag
          </Link>
        </p>
      ) : null}

      {state === "offline" && !code ? (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-center text-xs text-amber-900">
          No cached keytag yet. Reconnect and check in once online to store an
          offline token.
        </p>
      ) : null}

      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant="purple"
          disabled={state === "scanning" || state === "success"}
          onClick={() => void startCheckIn()}
        >
          {state === "scanning"
            ? "Validating…"
            : state === "success"
              ? "Checked in"
              : "Check in"}
        </Button>
        <Button type="button" variant="outline" onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
