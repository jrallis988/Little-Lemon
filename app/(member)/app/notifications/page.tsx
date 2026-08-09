"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";

type Notification = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  readAt: string | null;
  kind: string;
  href?: string;
};

type Prefs = {
  pushEnabled: boolean;
  emailMarketing: boolean;
  crowdAlerts: boolean;
  billingAlerts: boolean;
  language: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [prefs, setPrefs] = useState<Prefs | null>(null);

  async function load() {
    const res = await fetch("/api/notifications");
    const data = (await res.json()) as {
      notifications?: Notification[];
      prefs?: Prefs | null;
    };
    setNotifications(data.notifications ?? []);
    setPrefs(data.prefs ?? null);
  }

  useEffect(() => {
    void load();
  }, []);

  async function markRead(id: string) {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notificationId: id }),
    });
    await load();
  }

  async function savePrefs(next: Partial<Prefs>) {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prefs: next }),
    });
    await load();
  }

  return (
    <MemberScreen
      eyebrow="Screens 25 & 65 · Inbox"
      title="Notifications"
      subtitle="Billing, crowd, and perk alerts — plus preference toggles."
    >
      <div className="space-y-2">
        {notifications.length === 0 ? (
          <MemberCard>
            <p className="text-sm text-pf-ink/55">Inbox is empty.</p>
          </MemberCard>
        ) : (
          notifications.map((item) => (
            <MemberCard
              key={item.id}
              className={item.readAt ? "opacity-70" : ""}
            >
              <p className="text-[10px] font-bold uppercase tracking-wide text-pf-purple">
                {item.kind}
              </p>
              <p className="mt-1 font-semibold text-pf-ink">{item.title}</p>
              <p className="mt-1 text-sm text-pf-ink/65">{item.body}</p>
              <div className="mt-3 flex gap-2">
                {item.href ? (
                  <Button asChild variant="outline" className="flex-1">
                    <Link href={item.href}>Open</Link>
                  </Button>
                ) : null}
                {!item.readAt ? (
                  <Button
                    type="button"
                    variant="purple"
                    className="flex-1"
                    onClick={() => void markRead(item.id)}
                  >
                    Mark read
                  </Button>
                ) : null}
              </div>
            </MemberCard>
          ))
        )}
      </div>

      <MemberCard className="mt-4 space-y-3">
        <p className="text-xs font-bold uppercase tracking-wide text-pf-purple">
          Notification preferences
        </p>
        {prefs ? (
          (
            [
              ["pushEnabled", "Push notifications"],
              ["billingAlerts", "Billing alerts"],
              ["crowdAlerts", "Crowd Meter alerts"],
              ["emailMarketing", "Marketing email"],
            ] as const
          ).map(([key, label]) => (
            <label
              key={key}
              className="flex items-center justify-between gap-3 text-sm font-semibold"
            >
              {label}
              <input
                type="checkbox"
                checked={Boolean(prefs[key])}
                onChange={(e) =>
                  void savePrefs({ [key]: e.target.checked } as Partial<Prefs>)
                }
              />
            </label>
          ))
        ) : (
          <p className="text-sm text-pf-ink/55">
            Sign in with a registered account to persist prefs.
          </p>
        )}
      </MemberCard>
    </MemberScreen>
  );
}
