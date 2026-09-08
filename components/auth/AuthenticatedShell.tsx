"use client";

import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";
import {
  getMockSnapshot,
  mockApi,
  subscribeMockStore,
} from "@/lib/mock/store";
import {
  unreadMessageConversationCount,
  unreadNotificationCount,
} from "@/lib/mock/social";
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
  const pathname = usePathname();
  const snap = useSyncExternalStore(
    subscribeMockStore,
    getMockSnapshot,
    getMockSnapshot
  );

  const unreadNotifications = useMemo(() => {
    if (!profile) return 0;
    return unreadNotificationCount(snap, profile.userId);
  }, [snap, profile]);

  const unreadMessages = useMemo(() => {
    if (!profile) return 0;
    return unreadMessageConversationCount(snap, profile.userId);
  }, [snap, profile]);

  const chrome =
    pathname?.startsWith("/home") || pathname?.startsWith("/vibe")
      ? "dark"
      : "light";

  if (!profile) return null;

  return (
    <AppShell
      currentUser={profile}
      unreadNotifications={unreadNotifications}
      unreadMessages={unreadMessages}
      mainClassName={mainClassName}
      chrome={chrome}
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
