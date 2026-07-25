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
  match?: (pathname: string | null) => boolean;
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
  className,
}: {
  currentUser: Profile;
  unreadMessages?: number;
  unreadNotifications?: number;
  className?: string;
}) {
  const pathname = usePathname();
  const profileHref = `/profile/${currentUser.username}`;
  const profileActive = pathname?.startsWith(profileHref);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-zinc-950/95 text-white shadow-[0_-14px_40px_rgba(0,0,0,0.28)] backdrop-blur md:hidden",
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
          />
        ))}

        <Link
          href="/vibe/new"
          className="relative mx-auto -mt-6 grid h-16 w-16 place-items-center rounded-full border-4 border-zinc-950 bg-[#FF5C00] text-white shadow-[0_10px_30px_rgba(255,92,0,0.45)] transition hover:bg-[#FF6A1A] hover:no-underline"
          aria-label="Start a vibe"
        >
          <Plus className="h-8 w-8" aria-hidden />
        </Link>

        <VibeNavLink
          item={items[2]}
          active={pathname?.startsWith("/messages") ?? false}
          badgeCount={unreadMessages}
        />

        <Link
          href={profileHref}
          className={cn(
            "relative flex flex-col items-center gap-1 rounded-[16px] px-1 py-2 text-[10px] font-black uppercase tracking-wide text-zinc-400 transition hover:text-white hover:no-underline",
            profileActive && "bg-[#FF5C00]/15 text-[#FF8D4D]"
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
}: {
  item: VibeNavItem;
  active: boolean;
  badgeCount: number;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "relative flex flex-col items-center gap-1 rounded-[16px] px-1 py-2 text-[10px] font-black uppercase tracking-wide text-zinc-400 transition hover:text-white hover:no-underline",
        active && "bg-[#FF5C00]/15 text-[#FF8D4D]"
      )}
    >
      <Icon className="h-5 w-5" aria-hidden />
      <span>{item.label}</span>
      {badgeCount > 0 ? (
        <Badge className="absolute right-1 top-1 border-zinc-950 bg-[#FF5C00] px-1 text-[9px] text-white">
          {badgeCount > 99 ? "99+" : badgeCount}
        </Badge>
      ) : null}
    </Link>
  );
}
