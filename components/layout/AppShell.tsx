"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Home,
  Mic2,
  PlusCircle,
  Search,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

const items = [
  { href: "/lineup", label: "Lineup", icon: Home },
  { href: "/mics", label: "Mics", icon: Mic2 },
  { href: "/post/new", label: "Post", icon: PlusCircle },
  { href: "/search", label: "Search", icon: Search },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const meHref = user ? `/u/${user.username}` : "/login";

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-foam/10 bg-stage/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-2 py-1.5">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-md px-2 py-2 text-[10px] uppercase tracking-[0.14em] transition",
                  active ? "text-spotlight" : "text-smoke hover:text-foam",
                )}
              >
                <Icon
                  className={cn("h-5 w-5", href === "/post/new" && "text-marquee")}
                  strokeWidth={active ? 2.4 : 1.8}
                />
                {label}
              </Link>
            </li>
          );
        })}
        <li className="flex-1">
          <Link
            href={meHref}
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-md px-2 py-2 text-[10px] uppercase tracking-[0.14em] transition",
              pathname.startsWith("/u/") ? "text-spotlight" : "text-smoke hover:text-foam",
            )}
          >
            <UserRound className="h-5 w-5" strokeWidth={pathname.startsWith("/u/") ? 2.4 : 1.8} />
            Me
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export function AppHeader({
  title,
  showBell = true,
}: {
  title?: string;
  showBell?: boolean;
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-foam/10 bg-stage/90 px-4 py-3 backdrop-blur-md">
      <div>
        {title ? (
          <h1 className="font-display text-2xl uppercase tracking-[0.06em] text-foam">
            {title}
          </h1>
        ) : (
          <Link href="/lineup" className="font-display text-2xl uppercase tracking-[0.08em]">
            Green<span className="text-spotlight">room</span>
          </Link>
        )}
      </div>
      {showBell ? (
        <Link
          href="/notifications"
          className="rounded-full p-2 text-smoke hover:bg-foam/5 hover:text-foam"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </Link>
      ) : null}
    </header>
  );
}

export function AppShell({
  children,
  title,
  showNav = true,
}: {
  children: React.ReactNode;
  title?: string;
  showNav?: boolean;
}) {
  return (
    <div className="mx-auto min-h-dvh max-w-lg stage-wash brick-noise">
      <AppHeader title={title} />
      <main className={cn("px-4 pt-4", showNav && "safe-bottom")}>{children}</main>
      {showNav ? <BottomNav /> : null}
    </div>
  );
}
