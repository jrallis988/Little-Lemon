"use client";

import * as React from "react";

import type { Profile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AppHeader } from "./AppHeader";
import { VibeBottomNav } from "./VibeBottomNav";

export interface AppShellProps {
  currentUser: Profile;
  unreadNotifications?: number;
  unreadMessages?: number;
  onLogout: () => void;
  children: React.ReactNode;
  mainClassName?: string;
  showMobileNavigation?: boolean;
  chrome?: "light" | "dark";
}

export function AppShell({
  currentUser,
  unreadNotifications = 0,
  unreadMessages = 0,
  onLogout,
  children,
  mainClassName,
  showMobileNavigation = true,
  chrome = "light",
}: AppShellProps) {
  return (
    <div
      className={cn(
        "min-h-screen text-navy-900",
        chrome === "dark" ? "bg-zinc-950" : "sunset-shell"
      )}
    >
      <a
        href="#main-content"
        className="sr-only z-50 rounded-card bg-white px-3 py-2 text-sm font-bold text-brand focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Skip to content
      </a>
      <AppHeader
        currentUser={currentUser}
        unreadNotifications={unreadNotifications}
        unreadMessages={unreadMessages}
        onLogout={onLogout}
      />
      <main
        id="main-content"
        className={cn(
          "mx-auto w-full max-w-6xl px-3 py-4 pb-20 sm:px-4 md:pb-6",
          mainClassName
        )}
      >
        {children}
      </main>
      {showMobileNavigation ? (
        <VibeBottomNav
          currentUser={currentUser}
          unreadNotifications={unreadNotifications}
          unreadMessages={unreadMessages}
          chrome={chrome}
        />
      ) : null}
    </div>
  );
}
