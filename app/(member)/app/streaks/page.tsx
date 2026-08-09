"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";

export default function StreaksPage() {
  const [shared, setShared] = useState(false);
  const streak = 12;

  return (
    <MemberScreen
      eyebrow="Screens 68–69 · Streaks"
      title="Fitness streak"
      subtitle="Keep showing up — streaks stay in the member app, not the marketing site."
    >
      <MemberCard className="pf-grad-black-card text-center text-white">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-pf-yellow">
          Current streak
        </p>
        <p className="mt-2 font-display text-6xl">{streak}</p>
        <p className="text-sm text-white/70">days in a row</p>
        <Button
          variant="app"
          className="mt-5 w-full"
          onClick={() => setShared(true)}
        >
          Share streak card
        </Button>
      </MemberCard>

      {shared ? (
        <MemberCard className="mt-3 space-y-2 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-pf-purple">
            Screen 69 · Share card
          </p>
          <p className="font-display text-3xl text-pf-ink">{streak}-day streak</p>
          <p className="text-sm text-pf-ink/60">
            Judgement Free Zone® — keep the habit going.
          </p>
        </MemberCard>
      ) : null}
    </MemberScreen>
  );
}
