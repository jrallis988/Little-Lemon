"use client";

import * as React from "react";
import { Bell, CheckCheck } from "lucide-react";

import { AuthenticatedShell } from "@/components/auth/AuthenticatedShell";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { NotificationItem } from "@/components/notifications/NotificationItem";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { useAuth } from "@/lib/auth/AuthProvider";
import { profileByUserIdFromData, socialApi } from "@/lib/social/api";
import { useSocialStore } from "@/lib/social/useSocialStore";

export default function NotificationsPage() {
  return (
    <RequireAuth>
      <AuthenticatedShell>
        <NotificationsContent />
      </AuthenticatedShell>
    </RequireAuth>
  );
}

function NotificationsContent() {
  const { user } = useAuth();
  const state = useSocialStore();
  const [showUnreadOnly, setShowUnreadOnly] = React.useState(false);

  if (!user) return null;

  const notifications = state.notifications
    .filter((notification) => notification.userId === user.id)
    .filter((notification) => !showUnreadOnly || !notification.read)
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  const unreadCount = state.notifications.filter(
    (notification) => notification.userId === user.id && !notification.read
  ).length;

  const markRead = async (ids?: string[]) => {
    await socialApi.markNotificationsRead(user.id, ids);
    await state.refresh();
    state.mutate();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Notifications</h1>
          <p className="text-sm text-navy-600">
            Stay on top of friend requests, comments, reactions, and messages.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={showUnreadOnly ? "primary" : "secondary"}
            onClick={() => setShowUnreadOnly((current) => !current)}
          >
            <Bell className="h-4 w-4" aria-hidden />
            Unread <Badge className="bg-white text-brand-dark">{unreadCount}</Badge>
          </Button>
          <Button
            variant="secondary"
            onClick={() => void markRead()}
            disabled={unreadCount === 0}
          >
            <CheckCheck className="h-4 w-4" aria-hidden />
            Mark all read
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{showUnreadOnly ? "Unread" : "All"} notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {notifications.length ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                actor={profileByUserIdFromData(state.profiles, notification.actorId)}
                onOpen={(item) => void markRead([item.id])}
                onMarkRead={(item) => void markRead([item.id])}
              />
            ))
          ) : (
            <EmptyState
              icon={Bell}
              title={showUnreadOnly ? "No unread notifications" : "No notifications"}
              description="Friend requests, vibe invites, and messages will land here."
              actionLabel="Back to Loop"
              actionHref="/home"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
