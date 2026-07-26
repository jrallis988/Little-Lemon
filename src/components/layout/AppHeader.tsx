"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  BookOpen,
  ChevronDown,
  Edit3,
  Home,
  LogOut,
  Mail,
  Search,
  Settings,
  UserCircle,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Profile } from "@/lib/types/database";
import { PLATFORM_NAME } from "@/lib/constants";
import { formatDateTime, formatRelative } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";

type HeaderLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
};

export interface AppHeaderProps {
  profile: Profile | null;
  unreadMessages?: number;
  unreadNotifications?: number;
  onLogout: () => void | Promise<void>;
  className?: string;
}

function Badge({ count }: { count?: number }) {
  if (!count) return null;

  return (
    <span className="ml-1 rounded-[4px] bg-white px-1.5 py-0.5 text-[10px] font-bold leading-none text-[#222222]">
      {count > 99 ? "99+" : count}
    </span>
  );
}

function NavItem({ href, label, icon: Icon, badge }: HeaderLink) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex min-h-9 items-center gap-1.5 rounded-[4px] px-3 py-2 text-sm font-semibold text-white no-underline transition-colors",
        isActive ? "bg-[#FF7A18]" : "hover:bg-[#6348E0]"
      )}
    >
      <Icon aria-hidden="true" className="h-4 w-4" />
      <span>{label}</span>
      <Badge count={badge} />
    </Link>
  );
}

export function AppHeader({
  profile,
  unreadMessages = 0,
  unreadNotifications = 0,
  onLogout,
  className,
}: AppHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const links: HeaderLink[] = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/browse", label: "Browse", icon: Users },
    { href: "/search", label: "Search", icon: Search },
    {
      href: "/messages",
      label: "Messages",
      icon: Mail,
      badge: unreadMessages,
    },
    { href: "/blog", label: "Blog", icon: BookOpen },
    {
      href: "/notifications",
      label: "Notifications",
      icon: Bell,
      badge: unreadNotifications,
    },
  ];

  const profileHref = profile ? `/profile/${profile.username}` : "/login";
  const lastActive = profile ? formatRelative(profile.last_active_at) : "";

  return (
    <header className={cn("hidden border-b border-[#CC5A09] md:block", className)}>
      <div className="bg-[#FF7A18]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="text-xl font-black tracking-tight text-white no-underline hover:text-white"
          >
            {PLATFORM_NAME}
          </Link>
          {profile ? (
            <div className="flex items-center gap-2 text-xs text-[#EEE9FF]">
              <Avatar profile={profile} size="sm" showOnline />
              <div className="leading-tight">
                <p className="font-semibold text-white">{profile.display_name}</p>
                {lastActive ? (
                  <time
                    dateTime={profile.last_active_at}
                    title={formatDateTime(profile.last_active_at)}
                  >
                    Active {lastActive}
                  </time>
                ) : null}
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-[4px] border border-white/30 px-3 py-1.5 text-sm font-semibold text-white no-underline hover:bg-white/10 hover:text-white"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
      <div className="bg-[#7B61FF]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4">
          <nav aria-label="Primary navigation" className="flex items-center gap-1">
            {links.map((link) => (
              <NavItem key={link.href} {...link} />
            ))}
          </nav>

          {profile ? (
            <div ref={menuRef} className="relative py-1.5">
              <Button
                variant="ghost"
                size="sm"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                className="border-white/20 text-white hover:bg-[#6348E0] active:bg-[#FF7A18]"
              >
                <UserCircle aria-hidden="true" className="h-4 w-4" />
                Profile
                <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" />
              </Button>
              {menuOpen ? (
                <div
                  role="menu"
                  aria-label="Profile menu"
                  className="absolute right-0 top-full z-40 mt-1 w-52 rounded-[4px] border border-[#E5E5E5] bg-white py-1 text-sm shadow-lg"
                >
                  <Link
                    role="menuitem"
                    href={profileHref}
                    className="flex items-center gap-2 px-3 py-2 text-[#222222] no-underline hover:bg-[#EEE9FF]"
                  >
                    <UserCircle aria-hidden="true" className="h-4 w-4" />
                    View Profile
                  </Link>
                  <Link
                    role="menuitem"
                    href="/profile/edit"
                    className="flex items-center gap-2 px-3 py-2 text-[#222222] no-underline hover:bg-[#EEE9FF]"
                  >
                    <Edit3 aria-hidden="true" className="h-4 w-4" />
                    Edit Profile
                  </Link>
                  <Link
                    role="menuitem"
                    href="/settings"
                    className="flex items-center gap-2 px-3 py-2 text-[#222222] no-underline hover:bg-[#EEE9FF]"
                  >
                    <Settings aria-hidden="true" className="h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      void onLogout();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-[#b42318] hover:bg-[#b42318]/10"
                  >
                    <LogOut aria-hidden="true" className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
