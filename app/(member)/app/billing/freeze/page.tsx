"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";

export default function FreezeMembershipPage() {
  const [frozen, setFrozen] = useState(false);

  return (
    <MemberScreen
      eyebrow="Screen 56 · Freeze"
      title="Freeze membership"
      subtitle="Pause dues for travel, injury recovery, or seasonal breaks."
    >
      <MemberCard className="space-y-3">
        <p className="text-sm text-pf-ink/70">
          Freezes typically start on your next billing date. Club access pauses
          while frozen; Black Card guest passes are unavailable during a freeze.
        </p>
        {frozen ? (
          <p className="rounded-2xl bg-pf-purple-soft px-3 py-2 text-sm font-semibold text-pf-purple">
            Freeze requested — confirmation email on the way.
          </p>
        ) : (
          <Button variant="purple" className="w-full" onClick={() => setFrozen(true)}>
            Request freeze
          </Button>
        )}
      </MemberCard>
    </MemberScreen>
  );
}
