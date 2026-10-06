"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";

export default function CancelGuidePage() {
  const [step, setStep] = useState<"guide" | "confirm" | "done">("guide");

  return (
    <MemberScreen
      eyebrow={step === "confirm" ? "Screen 58 · Confirm" : "Screen 57 · Cancel guide"}
      title={step === "done" ? "Cancellation noted" : "Cancel membership"}
      subtitle="Review what you’ll lose, then confirm with your home club policy in mind."
    >
      <MemberCard className="space-y-3 text-sm text-pf-ink/75">
        {step === "guide" ? (
          <>
            <ul className="list-disc space-y-1 pl-4">
              <li>Access ends after your paid period.</li>
              <li>Black Card spa + guest privileges stop with the plan.</li>
              <li>Annual fee already billed is generally non-refundable.</li>
            </ul>
            <Button variant="purple" className="w-full" onClick={() => setStep("confirm")}>
              Continue to confirm
            </Button>
          </>
        ) : null}
        {step === "confirm" ? (
          <>
            <p>
              This records a cancellation request. Your club may still require
              an in-club or franchise-specific step before the membership ends.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep("guide")}>
                Back
              </Button>
              <Button variant="purple" className="flex-1" onClick={() => setStep("done")}>
                Confirm cancel
              </Button>
            </div>
          </>
        ) : null}
        {step === "done" ? (
          <p className="font-semibold text-pf-purple">
            Request saved. Your home club will follow up if anything else is needed.
          </p>
        ) : null}
      </MemberCard>
    </MemberScreen>
  );
}
