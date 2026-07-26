"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth/context";
import { markNotificationsRead } from "@/lib/mock/store";
import { formatRelative } from "@/lib/utils/format";
import {
  Card,
  LoadingCard,
  VibeShell,
  SectionTitle,
  profileById,
  useMockStoreState,
} from "@/app/_components/vibe-page-utils";
import { useState } from "react";

function NotificationsContent() {
  const { profile } = useAuth();
  const { store, refresh } = useMockStoreState();
  const [status, setStatus] = useState("");

  if (!profile || !store) return <LoadingCard label="Loading notifications..." />;

  const notifications = store.notifications
    .filter((notification) => notification.recipient_id === profile.id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return (
    <div className="space-y-5">
      <Card>
        <h1 className="text-3xl font-black text-[#222222]">Notifications</h1>
        <p className="mt-2 text-sm text-[#6E6E6E]">{unreadCount} unread notification(s).</p>
        {status ? <p className="mt-3 text-sm font-semibold text-[#1E824C]">{status}</p> : null}
      </Card>

      <Card>
        <SectionTitle
          title="Latest"
          action={
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                markNotificationsRead(profile.id);
                setStatus("All notifications marked read.");
                refresh();
              }}
            >
              Mark all read
            </Button>
          }
        />
        {notifications.length === 0 ? (
          <p className="text-sm text-[#6E6E6E]">No notifications yet.</p>
        ) : (
          <div className="space-y-2">
            {notifications.map((notification) => {
              const actor = profileById(store, notification.actor_id);
              return (
                <article
                  key={notification.id}
                  className={`rounded border p-3 ${
                    notification.read
                      ? "border-[#E5E5E5] bg-white"
                      : "border-[#7B61FF] bg-[#EEE9FF]"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="font-black text-[#222222]">{notification.title}</h2>
                      <p className="mt-1 text-sm text-[#222222]">{notification.body}</p>
                      <p className="mt-1 text-xs text-[#6E6E6E]">
                        {actor ? `${actor.display_name} - ` : ""}
                        {formatRelative(notification.created_at)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {notification.link ? (
                        <Link
                          href={notification.link}
                          className="rounded border border-[#7B61FF] bg-white px-3 py-2 text-sm font-bold no-underline"
                        >
                          Open
                        </Link>
                      ) : null}
                      {!notification.read ? (
                        <Button
                          size="sm"
                          onClick={() => {
                            markNotificationsRead(profile.id, [notification.id]);
                            setStatus(`Marked "${notification.title}" read.`);
                            refresh();
                          }}
                        >
                          Mark read
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}

export default function NotificationsPage() {
  return (
    <VibeShell>
      <NotificationsContent />
    </VibeShell>
  );
}
