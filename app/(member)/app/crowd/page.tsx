"use client";

import { useEffect, useState } from "react";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";

type Occupancy = {
  clubId: string;
  level: number;
  label: string;
  updatedAt: string;
  history: Array<{ hour: number; level: number }>;
};

export default function CrowdPage() {
  const [occupancy, setOccupancy] = useState<Occupancy | null>(null);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/api/crowd")
        .then((r) => r.json())
        .then((data: { occupancy?: Occupancy }) => {
          if (alive && data.occupancy) setOccupancy(data.occupancy);
        })
        .catch(() => undefined);
    void load();
    const timer = window.setInterval(() => void load(), 20000);
    return () => {
      alive = false;
      window.clearInterval(timer);
    };
  }, []);

  const level = occupancy?.level ?? 40;

  return (
    <MemberScreen
      eyebrow="Screen 26–27 · Crowd Meter"
      title="Crowd Meter"
      subtitle="Live busyness for your home club. App-owned — never rebuilt on the website."
    >
      <MemberCard>
        <p className="text-sm font-semibold text-pf-ink">Home club occupancy</p>
        <p className="mt-3 font-display text-4xl text-pf-purple">
          {occupancy?.label ?? "Loading…"}
        </p>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-pf-mist">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-pf-yellow transition-all"
            style={{ width: `${level}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-pf-ink/55">
          {level}% full · Updated{" "}
          {occupancy
            ? new Date(occupancy.updatedAt).toLocaleTimeString()
            : "—"}
        </p>
      </MemberCard>

      <MemberCard className="mt-3">
        <p className="text-xs font-bold uppercase tracking-wide text-pf-purple">
          Typical day · Screen 27
        </p>
        <div className="mt-3 flex h-24 items-end gap-0.5">
          {(occupancy?.history ?? []).map((point) => (
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
      </MemberCard>
    </MemberScreen>
  );
}
