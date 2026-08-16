"use client";

import { formatDistanceToNow } from "date-fns";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { AppShell } from "@/components/layout/AppShell";
import { notifications } from "@/lib/mock/data";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  return (
    <RequireAuth>
      <AppShell title="Notifications">
        <ul className="space-y-2">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={cn(
                "rounded-xl p-3 hairline",
                n.unread ? "bg-spotlight/10" : "bg-velvet/70",
              )}
            >
              <p className="text-sm leading-relaxed text-foam">{n.text}</p>
              <time className="mt-1 block text-[11px] text-smoke">
                {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
              </time>
            </li>
          ))}
        </ul>
      </AppShell>
    </RequireAuth>
  );
}
