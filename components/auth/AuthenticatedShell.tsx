"use client";

import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";
import {
  unreadMessageCount,
  unreadNonMessageCount,
  usingMockSocial,
} from "@/lib/social/api";
import { useSocialStore } from "@/lib/social/useSocialStore";
import { mockApi } from "@/lib/mock/store";
import { AppShell } from "@/components/layout/AppShell";

export function AuthenticatedShell({
  children,
  mainClassName,
}: {
  children: React.ReactNode;
  mainClassName?: string;
}) {
  const { profile, logout, usingMock } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const social = useSocialStore();

  const unreadNotifications = useMemo(() => {
    if (!profile) return 0;
    return unreadNonMessageCount(social.notifications, profile.userId);
  }, [social.notifications, profile]);

  const unreadMessages = useMemo(() => {
    if (!profile) return 0;
    return unreadMessageCount(social.notifications, profile.userId);
  }, [social.notifications, profile]);

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
        if (usingMock || usingMockSocial()) mockApi.logout();
        router.push("/");
      }}
    >
      {children}
    </AppShell>
  );
}
