"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, type ReactNode } from "react";
import { useAuth } from "@/lib/auth/context";
import { cn } from "@/lib/utils/cn";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { AppHeader } from "./AppHeader";
import { MobileNavigation } from "./MobileNavigation";
import { SkipToContent } from "./SkipToContent";

export interface AppShellProps {
  children: ReactNode;
  unreadMessages?: number;
  unreadNotifications?: number;
  className?: string;
}

export function AppShell({
  children,
  unreadMessages = 0,
  unreadNotifications = 0,
  className,
}: AppShellProps) {
  const router = useRouter();
  const { user, profile, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, router, user]);

  const handleLogout = useCallback(async () => {
    await logout();
    router.push("/login");
  }, [logout, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e9eef4]">
        <SkipToContent />
        <main id="main-content" className="mx-auto max-w-6xl px-4 py-6">
          <LoadingSkeleton variant="profile" />
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#e9eef4]">
        <SkipToContent />
        <main id="main-content" className="mx-auto max-w-6xl px-4 py-6">
          <LoadingSkeleton variant="card" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e9eef4]">
      <SkipToContent />
      <AppHeader
        profile={profile}
        unreadMessages={unreadMessages}
        unreadNotifications={unreadNotifications}
        onLogout={handleLogout}
      />
      <main
        id="main-content"
        className={cn("mx-auto max-w-6xl px-4 py-5 pb-20 md:pb-8", className)}
      >
        {children}
      </main>
      <MobileNavigation
        profile={profile}
        unreadMessages={unreadMessages}
        unreadNotifications={unreadNotifications}
        onLogout={handleLogout}
      />
    </div>
  );
}
