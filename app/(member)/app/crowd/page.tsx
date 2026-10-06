"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";

type Occupancy = {
  clubId: string;
  level: number;
  label: string;
  updatedAt: string;
  history: Array<{ hour: number; level: number }>;
};

type LoadState = "loading" | "ready" | "error";

export default function CrowdPage() {
  const [occupancy, setOccupancy] = useState<Occupancy | null>(null);
  const [status, setStatus] = useState<LoadState>("loading");

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/api/crowd")
        .then(async (r) => {
          if (!r.ok) throw new Error("Crowd Meter unavailable");
          return r.json() as Promise<{ occupancy?: Occupancy }>;
        })
        .then((data) => {
          if (!alive) return;
          if (data.occupancy) {
            setOccupancy(data.occupancy);
            setStatus("ready");
          } else {
            setStatus("error");
          }
        })
        .catch(() => {
          if (alive) setStatus("error");
        });
    void load();
    const timer = window.setInterval(() => void load(), 20000);
    return () => {
      alive = false;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <MemberScreen
      eyebrow="Screen 26–27 · Crowd Meter"
      title="Crowd Meter"
      subtitle="Live busyness for your home club — refresh every 20 seconds."
    >
      <MemberCard>
        <p className="text-sm font-semibold text-pf-ink">Home club occupancy</p>
        {status === "loading" ? (
          <p className="mt-3 text-sm text-pf-ink/55">Checking how busy it is…</p>
        ) : null}
        {status === "error" ? (
          <div className="mt-3 space-y-2">
            <p className="text-sm font-semibold text-red-600">
              Couldn’t load Crowd Meter
            </p>
            <p className="text-xs text-pf-ink/55">
              Try again in a moment. Check-in still works from the Check in
              screen.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setStatus("loading");
                void fetch("/api/crowd")
                  .then((r) => r.json())
                  .then((data: { occupancy?: Occupancy }) => {
                    if (data.occupancy) {
                      setOccupancy(data.occupancy);
                      setStatus("ready");
                    } else setStatus("error");
                  })
                  .catch(() => setStatus("error"));
              }}
            >
              Retry
            </Button>
          </div>
        ) : null}
        {status === "ready" && occupancy ? (
          <>
            <p className="mt-3 font-display text-4xl text-pf-purple">
              {occupancy.label}
            </p>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-pf-mist">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-pf-yellow transition-all"
                style={{ width: `${occupancy.level}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-pf-ink/55">
              {occupancy.level}% full · Updated{" "}
              {new Date(occupancy.updatedAt).toLocaleTimeString()}
            </p>
          </>
        ) : null}
      </MemberCard>

      <MemberCard className="mt-3">
        <p className="text-xs font-bold uppercase tracking-wide text-pf-purple">
          Typical day · Screen 27
        </p>
        {status === "ready" && occupancy?.history?.length ? (
          <>
            <div className="mt-3 flex h-24 items-end gap-0.5">
              {occupancy.history.map((point) => (
                <div
                  key={point.hour}
                  className="flex-1 rounded-t bg-pf-purple/70"
                  style={{ height: `${Math.max(8, point.level)}%` }}
                  title={`${point.hour}:00 · ${point.level}%`}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-pf-ink/55">
              Best window is usually mid-morning before the evening peak.
            </p>
          </>
        ) : (
          <p className="mt-3 text-xs text-pf-ink/55">
            History appears once live occupancy loads.
          </p>
        )}
      </MemberCard>
    </MemberScreen>
  );
}
