"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/cn";

export const Tabs = TabsPrimitive.Root;

export function TabsList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn("mb-s5 flex flex-wrap gap-s2", className)}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "rounded-sm border border-border bg-white px-3 py-1.5 text-sm font-bold text-blue outline-none transition-colors",
        "hover:border-ocean/50",
        "focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2",
        "data-[state=active]:border-ocean data-[state=active]:bg-ocean data-[state=active]:text-white",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        "rounded-md border border-border bg-white p-s5 outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  );
}
