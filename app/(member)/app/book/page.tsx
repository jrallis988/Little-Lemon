"use client";

import { useState } from "react";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";

const CLASSES = [
  { name: "30-Minute Circuit intro", time: "Wed 7:00 AM" },
  { name: "PF+ strength guide", time: "Thu 12:15 PM" },
  { name: "Cardio coach desk", time: "Sat 9:30 AM" },
];

export default function ClassBookingPage() {
  const [booked, setBooked] = useState<string | null>(null);

  return (
    <MemberScreen
      eyebrow="Screen 77 · Booking"
      title="Classes & training"
      subtitle="Book club orientations and PF+ guided sessions."
    >
      <MemberCard className="space-y-2">
        {CLASSES.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setBooked(item.name)}
            className="w-full rounded-2xl border border-pf-line px-3 py-3 text-left hover:border-pf-purple"
          >
            <span className="block text-sm font-semibold text-pf-ink">
              {item.name}
            </span>
            <span className="text-xs text-pf-ink/55">{item.time}</span>
          </button>
        ))}
        {booked ? (
          <p className="text-sm font-semibold text-pf-purple">
            Booked: {booked}
          </p>
        ) : null}
      </MemberCard>
    </MemberScreen>
  );
}
