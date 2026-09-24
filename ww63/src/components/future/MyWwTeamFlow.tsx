import { useState } from "react";
import {
  AppShell,
  PrimaryButton,
  SoftCard,
  TextButton,
} from "./AppShell";

const members = [
  {
    id: "alex",
    role: "Your WW Coach",
    name: "Alex",
    next: "Next check-in: Thursday",
    cta: "Message Alex",
    detail: "Alex sent you a message about consistency over perfection.",
  },
  {
    id: "maya",
    role: "Dietitian",
    name: "Maya, RD",
    next: "Next appointment: August 14",
    cta: "View plan",
    detail: "Maya updated your meal guidance for higher protein dinners.",
  },
  {
    id: "care",
    role: "Care Team",
    name: "Care Team",
    next: "Available with eligible medical plan",
    cta: "View care",
    detail: "Educational care reminders only—clinical decisions stay with your clinician.",
  },
  {
    id: "group",
    role: "Community",
    name: "Seacoast Saturday Group",
    next: "18 members · Saturday, 10:00 AM",
    cta: "Join workshop",
    detail: "Saturday group posted a new discussion on non-scale victories.",
  },
] as const;

export function MyWwTeamFlow() {
  const [active, setActive] = useState<(typeof members)[number]["id"]>("alex");
  const member = members.find((item) => item.id === active)!;

  return (
    <AppShell title="My WW Team" activeNav="community">
      <div className="space-y-4">
        <div>
          <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cobalt-600">
            Concept · Support
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold text-ink" style={{ fontWeight: 700 }}>
            Your Team
          </h3>
          <p className="mt-1 font-sans text-sm text-ink/60">
            People supporting people—organized around you.
          </p>
        </div>

        <div className="space-y-2">
          {members.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                active === item.id
                  ? "border-cobalt-500 bg-cobalt-600 text-white"
                  : "border-ink/10 bg-white"
              }`}
            >
              <span className="block font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] opacity-70">
                {item.role}
              </span>
              <span className="mt-1 block font-display text-lg font-bold" style={{ fontWeight: 700 }}>
                {item.name}
              </span>
              <span
                className={`mt-1 block font-sans text-xs ${
                  active === item.id ? "text-white/80" : "text-ink/55"
                }`}
              >
                {item.next}
              </span>
            </button>
          ))}
        </div>

        <SoftCard>
          <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/40">
            Selected
          </p>
          <p className="mt-1 font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
            {member.name}
          </p>
          <p className="mt-2 font-sans text-sm text-ink/65">{member.detail}</p>
          <div className="mt-4">
            <PrimaryButton>{member.cta}</PrimaryButton>
          </div>
        </SoftCard>

        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
            Recent Support
          </p>
          <ul className="mt-2 space-y-2">
            {[
              "Alex sent you a message",
              "Maya updated your meal guidance",
              "Saturday group posted a new discussion",
            ].map((item) => (
              <li key={item} className="rounded-2xl border border-ink/8 bg-white px-4 py-3 font-sans text-sm text-ink/70">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <TextButton onClick={() => setActive("alex")}>Reset to Coach</TextButton>
      </div>
    </AppShell>
  );
}
