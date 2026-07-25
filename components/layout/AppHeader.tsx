"use client";

import * as React from "react";
import Link from "next/link";
import {
  Bell,
  CalendarDays,
  LogOut,
  Menu,
  MessageSquare,
  Music2,
  Search,
  Settings,
  UserCircle,
  UsersRound,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { Profile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";

export interface AppHeaderProps {
  currentUser: Profile;
  unreadNotifications?: number;
  unreadMessages?: number;
  onLogout: () => void;
}

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: "messages" | "notifications";
};

const navItems: NavItem[] = [
  { href: "/search", label: "Search", icon: Search },
  { href: "/groups", label: "Friends/Groups", icon: UsersRound },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/music", label: "Music", icon: Music2 },
  { href: "/messages", label: "Messages", icon: MessageSquare, badge: "messages" },
  {
    href: "/notifications",
    label: "Notifications",
    icon: Bell,
    badge: "notifications",
  },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppHeader({
  currentUser,
  unreadNotifications = 0,
  unreadMessages = 0,
  onLogout,
}: AppHeaderProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  const getBadgeCount = (badge?: "messages" | "notifications") => {
    if (badge === "messages") return unreadMessages;
    if (badge === "notifications") return unreadNotifications;
    return 0;
  };

  const closeMenus = () => {
    setMobileOpen(false);
    setProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-orange-500/30 bg-gradient-to-r from-[#ff8a3d] via-[#ff7a33] to-[#f08ad0] text-white shadow-card">
      <div className="mx-auto flex min-h-14 max-w-6xl items-center justify-between gap-3 px-3 py-2 sm:px-4">
        <Logo href="/home" />

        <nav className="hidden items-stretch self-stretch md:flex" aria-label="Main">
          {navItems.map((item) => {
            const Icon = item.icon;
            const badgeCount = getBadgeCount(item.badge);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative inline-flex items-center gap-1.5 border-x border-transparent px-3 text-xs font-bold uppercase tracking-wide text-white/95 transition hover:border-white/20 hover:bg-white/15"
              >
                <Icon className="h-4 w-4" aria-hidden />
                {item.label}
                {badgeCount > 0 ? (
                  <Badge className="ml-0.5 border-white/20 bg-white text-brand-dark">
                    {badgeCount > 99 ? "99+" : badgeCount}
                  </Badge>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="border-white/10 text-white hover:bg-brand-dark"
              onClick={() => setProfileOpen((open) => !open)}
              aria-expanded={profileOpen}
              aria-haspopup="menu"
            >
              <Avatar
                name={currentUser.displayName}
                src={currentUser.avatarUrl}
                size="xs"
              />
              <span>{currentUser.displayName}</span>
            </Button>
            {profileOpen ? (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-48 rounded-card border border-surface-border bg-white py-1 text-sm text-navy-800 shadow-lg"
              >
                <Link
                  href={`/profile/${currentUser.username}`}
                  role="menuitem"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-brand-soft"
                  onClick={closeMenus}
                >
                  <UserCircle className="h-4 w-4" aria-hidden />
                  View profile
                </Link>
                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-red-700 hover:bg-red-50"
                  onClick={() => {
                    closeMenus();
                    onLogout();
                  }}
                >
                  <LogOut className="h-4 w-4" aria-hidden />
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="px-2 text-white hover:bg-brand-dark md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-header-menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden />
          ) : (
            <Menu className="h-5 w-5" aria-hidden />
          )}
          <span className="sr-only">Menu</span>
        </Button>
      </div>

      <div
        id="mobile-header-menu"
        className={cn(
          "border-t border-navy-800 bg-navy-900 md:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <nav className="grid grid-cols-2 gap-1 p-3" aria-label="Mobile main">
          {navItems.map((item) => {
            const Icon = item.icon;
            const badgeCount = getBadgeCount(item.badge);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between rounded-card border border-navy-700 bg-navy-800 px-3 py-2 text-sm font-semibold text-white"
                onClick={closeMenus}
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" aria-hidden />
                  {item.label}
                </span>
                {badgeCount > 0 ? (
                  <Badge className="border-white/20 bg-white text-brand-dark">
                    {badgeCount > 99 ? "99+" : badgeCount}
                  </Badge>
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3 border-t border-navy-800 p-3">
          <Avatar name={currentUser.displayName} src={currentUser.avatarUrl} size="sm" />
          <Link
            href={`/profile/${currentUser.username}`}
            className="min-w-0 flex-1 text-sm font-bold text-white"
            onClick={closeMenus}
          >
            <span className="block truncate">{currentUser.displayName}</span>
            <span className="block truncate text-xs font-normal text-navy-200">
              @{currentUser.username}
            </span>
          </Link>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              closeMenus();
              onLogout();
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
