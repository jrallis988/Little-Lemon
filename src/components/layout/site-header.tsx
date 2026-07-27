"use client";

import Link from "next/link";
import { MapPin, Menu, ShoppingBag, UserRound } from "lucide-react";

import { SITE_NAME } from "@/lib/brand";
import { ACTIVE_STORE, NAV_CATEGORIES, REWARDS } from "@/lib/data/catalog";
import { formatPoints } from "@/lib/pharmacy";
import { useCart } from "@/lib/store/cart";
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
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-surface-elevated/90 backdrop-blur-md">
      <div className="border-b border-border/50 bg-brand text-brand-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-1 text-[11px] sm:gap-3 sm:px-6 sm:py-1.5 sm:text-xs">
          <p className="flex min-w-0 items-center gap-1.5">
            <MapPin className="size-3 shrink-0 sm:size-3.5" aria-hidden />
            <Link href="/stores" className="truncate hover:underline">
              {ACTIVE_STORE.name} · {ACTIVE_STORE.hoursSummary}
            </Link>
          </p>
          <p className="shrink-0">
            myW · {formatPoints(REWARDS.pointsBalance)} pts
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-3 py-2 sm:gap-3 sm:px-6 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle className="font-display text-left text-xl text-brand">
                  {SITE_NAME}
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
            className="font-display shrink-0 text-xl font-bold tracking-tight text-brand sm:text-2xl"
            aria-label={`${SITE_NAME} home`}
          >
            {SITE_NAME}
          </Link>

          <div className="hidden flex-1 lg:block">
            <MegaMenu />
          </div>

          <div className="ml-auto flex items-center gap-0.5 sm:gap-2">
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
              className="relative size-8 sm:size-9"
              nativeButton={false}
              render={
                <Link
                  href="/checkout"
                  aria-label={
                    itemCount > 0
                      ? `Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`
                      : "Cart, empty"
                  }
                />
              }
            >
              <ShoppingBag className="size-5" />
              {itemCount > 0 ? (
                <span
                  className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-brand-foreground"
                  aria-hidden
                >
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              ) : null}
            </Button>
          </div>
        </div>

        <SmartSearch className="[&_input]:h-9 sm:[&_input]:h-11" />
      </div>
    </header>
  );
}
