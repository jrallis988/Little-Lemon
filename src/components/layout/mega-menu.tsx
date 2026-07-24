"use client";

import Link from "next/link";

import { MEGA_MENU } from "@/lib/data/catalog";
import { SEARCH_INTENT_LABEL } from "@/lib/pharmacy";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";

export function MegaMenu({ className }: { className?: string }) {
  return (
    <NavigationMenu
      className={cn("hidden max-w-none justify-start lg:flex", className)}
    >
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-sm font-medium">
            Explore
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-0">
            <div className="grid w-[min(92vw,720px)] grid-cols-3 gap-0">
              {MEGA_MENU.map((column, index) => (
                <div
                  key={column.id}
                  className={cn(
                    "p-5",
                    index < MEGA_MENU.length - 1 && "border-r border-border/70",
                  )}
                >
                  <p className="font-display text-sm font-semibold tracking-tight text-foreground">
                    {column.heading}
                  </p>
                  {column.sections.map((section) => (
                    <div key={section.id} className="mt-3 space-y-1">
                      <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                        {section.title}
                      </p>
                      <ul className="space-y-1">
                        {section.links.map((link) => (
                          <li key={link.id}>
                            <NavigationMenuLink
                              closeOnClick
                              render={<Link href={link.href} />}
                              className="block rounded-lg px-2 py-2 transition-colors hover:bg-muted/70"
                            >
                              <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                                {link.label}
                                {link.badge ? (
                                  <Badge
                                    variant="outline"
                                    className="border-health/30 bg-health/10 text-[10px] text-health"
                                  >
                                    {link.badge}
                                  </Badge>
                                ) : null}
                              </span>
                              {link.description ? (
                                <span className="mt-0.5 block text-xs text-muted-foreground">
                                  {link.description}
                                </span>
                              ) : null}
                              {link.intent ? (
                                <span className="mt-1 block text-[10px] tracking-wide text-muted-foreground uppercase">
                                  {SEARCH_INTENT_LABEL[link.intent]}
                                </span>
                              ) : null}
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link href="/pharmacy" />}
            className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted/70"
          >
            Pharmacy
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link href="/shop" />}
            className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted/70"
          >
            Shop
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link href="/checkout" />}
            className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted/70"
          >
            Checkout
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
