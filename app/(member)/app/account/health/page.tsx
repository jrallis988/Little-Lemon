"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";

export default function HealthIntegrationsPage() {
  const [healthKit, setHealthKit] = useState(false);
  const [wearable, setWearable] = useState(false);
  const [denied, setDenied] = useState(false);

  return (
    <MemberScreen
      eyebrow="Screens 80–83 · Health"
      title="Health & wearables"
      subtitle="Connect Apple Health / HealthKit and sync wearable activity."
    >
      <div className="space-y-3">
        <MemberCard className="space-y-2">
          <p className="font-semibold text-pf-ink">HealthKit</p>
          <p className="text-xs text-pf-ink/60">
            Import workouts and steps into your PF activity history.
          </p>
          <Button
            variant={healthKit ? "outline" : "purple"}
            className="w-full"
            onClick={() => {
              setDenied(false);
              setHealthKit((v) => !v);
            }}
          >
            {healthKit ? "Connected" : "Connect HealthKit"}
          </Button>
        </MemberCard>

        <MemberCard className="space-y-2">
          <p className="font-semibold text-pf-ink">Wearable sync</p>
          <p className="text-xs text-pf-ink/60">
            Pair a watch or band for automatic check-in streaks.
          </p>
          <Button
            variant={wearable ? "outline" : "purple"}
            className="w-full"
            onClick={() => setWearable((v) => !v)}
          >
            {wearable ? "Syncing" : "Pair wearable"}
          </Button>
        </MemberCard>

        <MemberCard className="space-y-2">
          <p className="font-semibold text-pf-ink">Permission denied recovery</p>
          <p className="text-xs text-pf-ink/60">
            Screen 83 — reopen OS settings if Health access was declined.
          </p>
          <Button variant="outline" className="w-full" onClick={() => setDenied(true)}>
            Simulate permission denied
          </Button>
          {denied ? (
            <p className="rounded-2xl bg-amber-50 px-3 py-2 text-xs text-amber-900">
              Health access is off. Open Settings → Privacy → Health → Planet
              Fitness, then return here to retry.
            </p>
          ) : null}
        </MemberCard>
      </div>
    </MemberScreen>
  );
}
