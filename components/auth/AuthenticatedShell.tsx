"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";
import {
  getMockSnapshot,
  mockApi,
  subscribeMockStore,
} from "@/lib/mock/store";
import { useSyncExternalStore } from "react";
import { AppShell } from "@/components/layout/AppShell";

export function AuthenticatedShell({
  children,
  mainClassName,
}: {
  children: React.ReactNode;
  mainClassName?: string;
}) {
  const { profile, logout } = useAuth();
  const router = useRouter();
  const snap = useSyncExternalStore(
    subscribeMockStore,
    getMockSnapshot,
    getMockSnapshot
  );

  const unreadNotifications = useMemo(() => {
    if (!profile) return 0;
    return snap.notifications.filter((n) => n.userId === profile.userId && !n.read)
      .length;
  }, [snap.notifications, profile]);

  const unreadMessages = useMemo(() => {
    if (!profile) return 0;
    // Approximate unread: conversations updated more recently than last hour for demo
    return snap.notifications.filter(
      (n) => n.userId === profile.userId && n.type === "message" && !n.read
    ).length;
  }, [snap.notifications, profile]);

  if (!profile) return null;

  return (
    <AppShell
      currentUser={profile}
      unreadNotifications={unreadNotifications}
      unreadMessages={unreadMessages}
      mainClassName={mainClassName}
      onLogout={async () => {
        await logout();
        mockApi.logout();
        router.push("/");
      }}
    >
      {children}
    </AppShell>
  );
}
