"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Home, MessageSquare, Search, UserCircle, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { Profile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export interface MobileNavigationProps {
  currentUser: Profile;
  unreadNotifications?: number;
  unreadMessages?: number;
  onNavigate?: (href: string) => void;
  className?: string;
}

type MobileItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: "messages" | "notifications";
};

const mobileItems: MobileItem[] = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/browse", label: "Browse", icon: Users },
  { href: "/search", label: "Search", icon: Search },
  { href: "/messages", label: "Messages", icon: MessageSquare, badge: "messages" },
  {
    href: "/notifications",
    label: "Alerts",
    icon: Bell,
    badge: "notifications",
  },
];

export function MobileNavigation({
  currentUser,
  unreadNotifications = 0,
  unreadMessages = 0,
  onNavigate,
  className,
}: MobileNavigationProps) {
  const pathname = usePathname();

  const badgeCount = (badge?: "messages" | "notifications") => {
    if (badge === "messages") return unreadMessages;
    if (badge === "notifications") return unreadNotifications;
    return 0;
  };

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-surface-border bg-white shadow-[0_-2px_8px_rgba(15,30,55,0.08)] md:hidden",
        className
      )}
      aria-label="Mobile navigation"
    >
      <div className="mx-auto grid max-w-md grid-cols-6">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
          const count = badgeCount(item.badge);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onNavigate?.(item.href)}
              className={cn(
                "relative flex flex-col items-center gap-1 px-1 py-2 text-[10px] font-bold uppercase tracking-wide text-navy-500",
                active && "bg-brand-soft text-brand-dark"
              )}
            >
              <Icon className="h-5 w-5" aria-hidden />
              <span>{item.label}</span>
              {count > 0 ? (
                <Badge className="absolute right-1 top-1 border-white bg-red-700 px-1 text-[9px] text-white">
                  {count > 99 ? "99+" : count}
                </Badge>
              ) : null}
            </Link>
          );
        })}
        <Link
          href={`/profile/${currentUser.username}`}
          onClick={() => onNavigate?.(`/profile/${currentUser.username}`)}
          className={cn(
            "flex flex-col items-center gap-1 px-1 py-2 text-[10px] font-bold uppercase tracking-wide text-navy-500",
            pathname?.startsWith(`/profile/${currentUser.username}`) &&
              "bg-brand-soft text-brand-dark"
          )}
        >
          <UserCircle className="h-5 w-5" aria-hidden />
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  );
}
