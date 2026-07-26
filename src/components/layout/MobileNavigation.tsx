"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bell,
  BookOpen,
  Edit3,
  Home,
  LogOut,
  Mail,
  Menu,
  Search,
  Settings,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Profile } from "@/lib/types/database";
import { PLATFORM_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";
import { Avatar } from "@/components/ui/Avatar";

type MobileLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
};

export interface MobileNavigationProps {
  profile: Profile | null;
  unreadMessages?: number;
  unreadNotifications?: number;
  onLogout: () => void | Promise<void>;
  className?: string;
}

function Badge({ count }: { count?: number }) {
  if (!count) return null;

  return (
    <span className="absolute -right-1 -top-1 rounded-full bg-[#b42318] px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
}

function BottomLink({ href, label, icon: Icon, badge }: MobileLink) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-[4px] px-1 py-1.5 text-[11px] font-semibold no-underline",
        isActive ? "bg-[#EEE9FF] text-[#222222]" : "text-[#6E6E6E]"
      )}
    >
      <span className="relative">
        <Icon aria-hidden="true" className="h-4 w-4" />
        <Badge count={badge} />
      </span>
      <span className="truncate">{label}</span>
    </Link>
  );
}

function PanelLink({
  href,
  label,
  icon: Icon,
  badge,
  onNavigate,
}: MobileLink & { onNavigate: () => void }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="flex items-center justify-between rounded-[4px] px-3 py-2 text-sm font-semibold text-[#222222] no-underline hover:bg-[#EEE9FF]"
    >
      <span className="flex items-center gap-2">
        <Icon aria-hidden="true" className="h-4 w-4" />
        {label}
      </span>
      {badge ? (
        <span className="rounded-full bg-[#7B61FF] px-1.5 py-0.5 text-[10px] font-bold text-white">
          {badge > 99 ? "99+" : badge}
        </span>
      ) : null}
    </Link>
  );
}

export function MobileNavigation({
  profile,
  unreadMessages = 0,
  unreadNotifications = 0,
  onLogout,
  className,
}: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const profileHref = profile ? `/profile/${profile.username}` : "/login";
  const bottomLinks: MobileLink[] = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/browse", label: "Browse", icon: Users },
    { href: "/search", label: "Search", icon: Search },
    {
      href: "/messages",
      label: "Messages",
      icon: Mail,
      badge: unreadMessages,
    },
  ];

  const panelLinks: MobileLink[] = [
    { href: "/blog", label: "Blog", icon: BookOpen },
    {
      href: "/notifications",
      label: "Notifications",
      icon: Bell,
      badge: unreadNotifications,
    },
    { href: profileHref, label: "View Profile", icon: UserCircle },
    { href: "/profile/edit", label: "Edit Profile", icon: Edit3 },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {open ? (
        <div className="fixed inset-0 z-40 bg-[#FF7A18]/50 md:hidden">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="absolute bottom-16 left-3 right-3 rounded-[4px] border border-[#E5E5E5] bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-[#E5E5E5] px-3 py-3">
              <div className="flex items-center gap-2">
                {profile ? (
                  <Avatar profile={profile} size="sm" showOnline />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-[#EEE9FF] text-sm font-black text-[#222222]">
                    M
                  </span>
                )}
                <div>
                  <p className="text-sm font-bold text-[#222222]">
                    {profile?.display_name ?? PLATFORM_NAME}
                  </p>
                  <p className="text-xs text-[#6E6E6E]">
                    {profile ? `@${profile.username}` : "Welcome"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-[4px] p-2 text-[#222222] hover:bg-[#EEE9FF]"
                aria-label="Close mobile navigation"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
            <nav aria-label="Mobile menu links" className="space-y-1 p-2">
              {panelLinks.map((link) => (
                <PanelLink
                  key={link.href}
                  {...link}
                  onNavigate={() => setOpen(false)}
                />
              ))}
              {profile ? (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    void onLogout();
                  }}
                  className="flex w-full items-center gap-2 rounded-[4px] px-3 py-2 text-left text-sm font-semibold text-[#b42318] hover:bg-[#b42318]/10"
                >
                  <LogOut aria-hidden="true" className="h-4 w-4" />
                  Logout
                </button>
              ) : (
                <PanelLink
                  href="/login"
                  label="Log in"
                  icon={UserCircle}
                  onNavigate={() => setOpen(false)}
                />
              )}
            </nav>
          </div>
        </div>
      ) : null}

      <nav
        aria-label="Mobile primary navigation"
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 border-t border-[#E5E5E5] bg-white px-2 py-1 shadow-[0_-1px_4px_rgba(34,34,34,0.08)] md:hidden",
          className
        )}
      >
        <div className="mx-auto flex max-w-lg items-center gap-1">
          {bottomLinks.map((link) => (
            <BottomLink key={link.href} {...link} />
          ))}
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className={cn(
              "relative flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-[4px] px-1 py-1.5 text-[11px] font-semibold",
              open ? "bg-[#EEE9FF] text-[#222222]" : "text-[#6E6E6E]"
            )}
          >
            <span className="relative">
              <Menu aria-hidden="true" className="h-4 w-4" />
              <Badge count={unreadNotifications} />
            </span>
            <span>More</span>
          </button>
        </div>
      </nav>
    </>
  );
}
