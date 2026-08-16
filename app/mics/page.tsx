"use client";

import { RequireAuth } from "@/components/auth/RequireAuth";
import { AppShell } from "@/components/layout/AppShell";
import { MicCard } from "@/components/mics/MicCard";
import { mics, venues } from "@/lib/mock/data";

export default function MicsPage() {
  const sorted = [...mics].sort(
    (a, b) => +new Date(a.startsAt) - +new Date(b.startsAt),
  );

  return (
    <RequireAuth>
      <AppShell title="Open mics">
        <p className="mb-4 text-sm text-smoke">
          Claim a slot, find the room, and get notes after.
        </p>
        <div className="mb-5 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {venues.map((v) => (
            <div
              key={v.id}
              className="min-w-[11rem] shrink-0 rounded-xl bg-velvet/70 p-3 hairline"
            >
              <p className="font-display text-lg uppercase tracking-[0.04em]">
                {v.name}
              </p>
              <p className="mt-1 text-xs text-smoke">
                {v.city} · {v.nextMic}
              </p>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {sorted.map((mic, i) => (
            <MicCard key={mic.id} mic={mic} index={i} />
          ))}
        </div>
      </AppShell>
    </RequireAuth>
  );
}
