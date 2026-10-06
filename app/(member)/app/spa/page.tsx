"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";

const SLOTS = ["Today 4:30 PM", "Today 6:00 PM", "Tomorrow 8:00 AM"];

export default function SpaBookingPage() {
  const [booked, setBooked] = useState<string | null>(null);

  return (
    <MemberScreen
      eyebrow="Screen 76 · Black Card spa"
      title="Spa booking"
      subtitle="Reserve HydroMassage, Total Body Enhancement, or massage chairs."
    >
      <MemberCard className="space-y-2">
        {SLOTS.map((slot) => (
          <button
            key={slot}
            type="button"
            onClick={() => setBooked(slot)}
            className="flex w-full items-center justify-between rounded-2xl border border-pf-line px-3 py-3 text-left text-sm font-semibold hover:border-pf-purple"
          >
            {slot}
            <span className="text-xs text-pf-purple">Book</span>
          </button>
        ))}
        {booked ? (
          <p className="rounded-2xl bg-pf-purple-soft px-3 py-2 text-sm text-pf-purple">
            Reserved: <span className="font-semibold">{booked}</span>
          </p>
        ) : null}
        <Button asChild variant="outline" className="w-full">
          <a href="/app">Back home</a>
        </Button>
      </MemberCard>
    </MemberScreen>
  );
}
