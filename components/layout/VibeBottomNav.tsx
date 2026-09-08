"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, Plus, UserCircle, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import type { Profile } from "@/lib/types";
import { cn } from "@/lib/utils";

type VibeNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: "messages";
};

const items: VibeNavItem[] = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/groups", label: "Groups", icon: UsersRound },
  {
    href: "/messages",
    label: "Messages",
    icon: MessageSquare,
    badge: "messages",
  },
];

export function VibeBottomNav({
  currentUser,
  unreadMessages = 0,
  chrome = "light",
  className,
}: {
  currentUser: Profile;
  unreadMessages?: number;
  unreadNotifications?: number;
  chrome?: "light" | "dark";
  className?: string;
}) {
  const pathname = usePathname();
  const profileHref = `/profile/${currentUser.username}`;
  const profileActive = pathname?.startsWith(profileHref);
  const dark = chrome === "dark";

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 backdrop-blur md:hidden",
        dark
          ? "border-t border-white/10 bg-zinc-950/95 text-white shadow-[0_-10px_30px_rgba(0,0,0,0.45)]"
          : "border-t border-orange-200/70 bg-white/95 text-navy-800 shadow-[0_-10px_30px_rgba(255,122,24,0.18)]",
        className
      )}
      aria-label="Vibe mobile navigation"
    >
      <div className="mx-auto grid max-w-md grid-cols-5 items-end px-2 pb-2 pt-1">
        {items.slice(0, 2).map((item) => (
          <VibeNavLink
            key={item.href}
            item={item}
            active={pathname?.startsWith(item.href) ?? false}
            badgeCount={item.badge === "messages" ? unreadMessages : 0}
            dark={dark}
          />
        ))}

        <Link
          href="/vibe/new"
          className={cn(
            "relative mx-auto -mt-6 grid h-16 w-16 place-items-center rounded-full border-4 bg-brand text-white shadow-[0_10px_30px_rgba(255,122,24,0.4)] transition hover:bg-brand-dark hover:no-underline",
            dark ? "border-zinc-950" : "border-white"
          )}
          aria-label="Start a vibe"
        >
          <Plus className="h-8 w-8" aria-hidden />
        </Link>

        <VibeNavLink
          item={items[2]}
          active={pathname?.startsWith("/messages") ?? false}
          badgeCount={unreadMessages}
          dark={dark}
        />

        <Link
          href={profileHref}
          className={cn(
            "relative flex flex-col items-center gap-1 rounded-[16px] px-1 py-2 text-[10px] font-black uppercase tracking-wide transition hover:no-underline",
            dark
              ? "text-zinc-400 hover:text-brand-light"
              : "text-navy-400 hover:text-brand",
            profileActive &&
              (dark
                ? "bg-white/10 text-brand-light"
                : "bg-brand-soft text-brand-dark")
          )}
        >
          <UserCircle className="h-5 w-5" aria-hidden />
          <span>Me</span>
        </Link>
      </div>
    </nav>
  );
}

function VibeNavLink({
  item,
  active,
  badgeCount,
  dark,
}: {
  item: VibeNavItem;
  active: boolean;
  badgeCount: number;
  dark: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "relative flex flex-col items-center gap-1 rounded-[16px] px-1 py-2 text-[10px] font-black uppercase tracking-wide transition hover:no-underline",
        dark
          ? "text-zinc-400 hover:text-brand-light"
          : "text-navy-400 hover:text-brand",
        active &&
          (dark
            ? "bg-white/10 text-brand-light"
            : "bg-brand-soft text-brand-dark")
      )}
    >
      <Icon className="h-5 w-5" aria-hidden />
      <span>{item.label}</span>
      {badgeCount > 0 ? (
        <Badge
          className={cn(
            "absolute right-1 top-1 px-1 text-[9px] text-white",
            dark ? "border-zinc-950 bg-brand" : "border-white bg-brand"
          )}
        >
          {badgeCount > 99 ? "99+" : badgeCount}
        </Badge>
      ) : null}
    </Link>
  );
}
