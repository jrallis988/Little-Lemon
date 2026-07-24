"use client";

import Link from "next/link";
import { MapPin, Menu, ShoppingBag, UserRound } from "lucide-react";

import { ACTIVE_STORE, NAV_CATEGORIES, REWARDS } from "@/lib/data/catalog";
import { formatPoints } from "@/lib/pharmacy";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MegaMenu } from "@/components/layout/mega-menu";
import { SmartSearch } from "@/components/layout/smart-search";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-surface-elevated/85 backdrop-blur-md">
      <div className="border-b border-border/50 bg-brand text-brand-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-1.5 text-xs sm:px-6">
          <p className="flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0" aria-hidden />
            <span className="truncate">
              {ACTIVE_STORE.name} · {ACTIVE_STORE.hoursSummary}
            </span>
          </p>
          <p className="hidden sm:block">
            myWalgreens · {formatPoints(REWARDS.pointsBalance)} pts
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle className="font-display text-left text-xl text-brand">
                  Walgreens
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
                {NAV_CATEGORIES.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                  >
                    {item.label}
                    {item.description ? (
                      <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                        {item.description}
                      </span>
                    ) : null}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link
            href="/"
            className="font-display shrink-0 text-2xl font-bold tracking-tight text-brand"
            aria-label="Walgreens home"
          >
            Walgreens
          </Link>

          <div className="hidden flex-1 lg:block">
            <MegaMenu />
          </div>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
              nativeButton={false}
              render={<Link href="/pharmacy" />}
            >
              <UserRound className="size-4" aria-hidden />
              Account
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              nativeButton={false}
              render={<Link href="/checkout" />}
            >
              <ShoppingBag className="size-5" />
            </Button>
          </div>
        </div>

        <SmartSearch />
      </div>
    </header>
  );
}
