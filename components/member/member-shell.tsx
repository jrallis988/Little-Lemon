"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CreditCard,
  Dumbbell,
  Home,
  QrCode,
  UserRound,
} from "lucide-react";
import { PlanetFitnessLogo } from "@/components/brand-logo";
import { cn } from "@/lib/utils";

const TABS: Array<{
  href: string;
  label: string;
  icon: typeof Home;
  exact?: boolean;
}> = [
  { href: "/app", label: "Home", icon: Home, exact: true },
  { href: "/app/check-in", label: "Check-in", icon: QrCode },
  { href: "/app/workouts", label: "Workouts", icon: Dumbbell },
  { href: "/app/billing", label: "Billing", icon: CreditCard },
  { href: "/app/account", label: "Account", icon: UserRound },
];

export function MemberShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideTabs = pathname?.startsWith("/app/login");

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-pf-mist text-pf-ink shadow-[0_0_0_1px_rgba(61,9,88,0.06)]">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-black/5 bg-white/95 px-4 backdrop-blur-md">
        <Link href="/app" className="shrink-0">
          <PlanetFitnessLogo markClassName="h-8 w-8" />
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-xs font-semibold text-pf-purple hover:underline"
          >
            Website
          </Link>
          <span className="rounded-full bg-pf-purple-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-pf-purple">
            Member
          </span>
        </div>
      </header>

      <div className={cn("flex-1", !hideTabs && "pb-20")}>{children}</div>

      {!hideTabs ? (
        <nav
          aria-label="Member app"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/95 backdrop-blur-md"
        >
          <ul className="mx-auto grid max-w-md grid-cols-5 px-1 py-1.5">
            {TABS.map((tab) => {
              const active = tab.exact
                ? pathname === tab.href
                : pathname?.startsWith(tab.href);
              const Icon = tab.icon;
              return (
                <li key={tab.href}>
                  <Link
                    href={tab.href}
                    className={cn(
                      "flex flex-col items-center gap-0.5 rounded-xl px-1 py-2 text-[10px] font-semibold transition",
                      active
                        ? "text-pf-purple"
                        : "text-pf-ink/45 hover:text-pf-ink/70"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        active ? "text-pf-purple" : "text-pf-ink/40"
                      )}
                      aria-hidden
                    />
                    {tab.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
