"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Pill, UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { LocationPicker } from "@/components/pharmacy/location-picker";

const NAV = [
  { href: "/search", label: "Compare prices" },
  { href: "/pharmacies", label: "Pharmacies" },
  { href: "/profile", label: "My meds" },
  { href: "/help", label: "Help" },
  { href: "/membership", label: "Membership" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const accountLink =
    status === "authenticated"
      ? { href: "/profile", label: "Account" }
      : { href: "/login", label: "Sign in" };

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-none"
          aria-label="Trump RX home"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-[1.03]">
            <Pill className="size-5" aria-hidden />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-semibold tracking-tight text-foreground">
              Trump RX
            </span>
            <span className="text-xs text-muted-foreground">
              Lower prices. Local pharmacies.
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <div className="hidden lg:block">
            <LocationPicker compact />
          </div>
          {status !== "loading" && (
            <Link
              href={accountLink.href}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm font-medium hover:bg-muted"
            >
              <UserRound className="size-4" />
              {accountLink.label}
            </Link>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon-lg"
                className="md:hidden"
                aria-label="Open menu"
              />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(100%,20rem)]">
            <SheetHeader>
              <SheetTitle className="font-display text-left">Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-4 px-1">
              <LocationPicker />
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-3 text-base font-medium",
                      pathname === item.href
                        ? "bg-secondary"
                        : "hover:bg-muted"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                {status !== "loading" && (
                  <Link
                    href={accountLink.href}
                    onClick={() => setOpen(false)}
                    className="mt-2 flex items-center gap-2 rounded-lg bg-secondary px-3 py-3 text-base font-medium"
                  >
                    <UserRound className="size-4" />
                    {accountLink.label}
                  </Link>
                )}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
