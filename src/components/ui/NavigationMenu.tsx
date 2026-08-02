"use client";

import * as React from "react";
import * as Nav from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/cn";

export const NavigationMenu = Nav.Root;
export const NavigationMenuList = Nav.List;
export const NavigationMenuItem = Nav.Item;
export const NavigationMenuLink = Nav.Link;

export const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof Nav.Trigger>,
  React.ComponentPropsWithoutRef<typeof Nav.Trigger>
>(function NavigationMenuTrigger({ className, children, ...props }, ref) {
  return (
    <Nav.Trigger
      ref={ref}
      className={cn(
        "group inline-flex flex-row flex-nowrap items-center gap-1 whitespace-nowrap rounded-sm px-3 py-2 text-sm font-bold text-white outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-sky data-[state=open]:bg-white/10",
        className,
      )}
      {...props}
    >
      {children}
    </Nav.Trigger>
  );
});

export const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof Nav.Content>,
  React.ComponentPropsWithoutRef<typeof Nav.Content>
>(function NavigationMenuContent({ className, ...props }, ref) {
  return (
    <Nav.Content
      ref={ref}
      className={cn(
        "absolute left-0 top-0 w-full data-[motion=from-end]:animate-fade-down data-[motion=from-start]:animate-fade-down md:w-auto",
        className,
      )}
      {...props}
    />
  );
});

export const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof Nav.Viewport>,
  React.ComponentPropsWithoutRef<typeof Nav.Viewport>
>(function NavigationMenuViewport({ className, ...props }, ref) {
  return (
    <div className="absolute left-0 top-full flex w-full justify-center">
      <Nav.Viewport
        ref={ref}
        className={cn(
          "relative mt-0 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-b-md border border-border bg-white shadow-lg transition-[width,height] duration-200 md:w-[var(--radix-navigation-menu-viewport-width)]",
          className,
        )}
        {...props}
      />
    </div>
  );
});
