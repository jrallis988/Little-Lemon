"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/NavigationMenu";
import { IconChevronDown } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

export type MegaZone = {
  title: string;
  links: { label: string; href: string }[];
  accent?: boolean;
};

export type NavItem = {
  label: string;
  /** Optional shorter label for mid-width desktop before full copy fits */
  shortLabel?: string;
  href: string;
  match?: string[];
  zones: MegaZone[];
  card?: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    href: string;
  };
};

export function DesktopPrimaryNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  function isActive(item: NavItem) {
    if (item.match?.some((m) => pathname === m || pathname.startsWith(`${m}/`))) {
      return true;
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }

  function megaPanelClass(item: NavItem) {
    const columns = item.zones.length + (item.card ? 1 : 0);
    return cn(
      "border-t-[3px] border-ocean bg-white shadow-lg grid gap-0",
      columns <= 1 && "min-w-[260px] grid-cols-1",
      columns === 2 && "min-w-[440px] grid-cols-2",
      columns === 3 &&
        !item.card &&
        "min-w-[560px] grid-cols-3",
      columns === 3 &&
        item.card &&
        "min-w-[560px] grid-cols-[1.2fr_1fr_200px]",
      columns >= 4 && "min-w-[680px] grid-cols-[1.2fr_1fr_1fr_200px]",
    );
  }

  return (
    <NavigationMenu
      delayDuration={0}
      skipDelayDuration={0}
      className="relative flex min-w-0 overflow-visible"
    >
      <NavigationMenuList className="flex flex-nowrap items-center justify-center gap-0">
        {items.map((item, index) => {
          const alignEnd = index >= items.length - 2;
          return (
            <NavigationMenuItem key={item.label} className="relative shrink-0">
              <NavigationMenuTrigger
                aria-label={item.label}
                className={cn(
                  "inline-flex h-16 max-w-none flex-row flex-nowrap items-center gap-0.5 whitespace-nowrap border-b-[3px] border-transparent px-1 text-[11px] font-bold tracking-[0.01em] text-white/85 transition-all duration-200 hover:border-sky hover:bg-transparent hover:text-white data-[state=open]:border-sky data-[state=open]:bg-transparent data-[state=open]:text-white 2xl:gap-1 2xl:px-2 2xl:text-[12.5px]",
                  isActive(item) && "border-sky text-white",
                )}
              >
                {item.shortLabel ? (
                  <>
                    <span className="whitespace-nowrap 2xl:hidden">
                      {item.shortLabel}
                    </span>
                    <span className="hidden whitespace-nowrap 2xl:inline">
                      {item.label}
                    </span>
                  </>
                ) : (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
                <IconChevronDown className="shrink-0 opacity-45 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </NavigationMenuTrigger>
              <NavigationMenuContent
                className={cn(alignEnd && "left-auto right-0")}
              >
                <div className={megaPanelClass(item)}>
                  {item.zones.map((zone) => (
                    <div
                      key={zone.title}
                      className={cn(
                        "border-l border-border px-s5 py-s6 first:border-l-0",
                        zone.accent && "bg-surface",
                      )}
                    >
                      <h5 className="mb-s3 border-b border-border pb-s2 text-[10px] font-extrabold uppercase tracking-[0.07em] text-text-meta">
                        {zone.title}
                      </h5>
                      <ul className="flex flex-col gap-0.5">
                        {zone.links.map((link) => (
                          <li key={link.label}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={link.href}
                                className={cn(
                                  "block no-underline transition-colors",
                                  zone.accent
                                    ? "rounded-sm px-2.5 py-[7px] text-base font-bold text-blue hover:bg-blue/[0.07]"
                                    : "py-0.5 text-sm font-light text-text-body hover:text-ocean",
                                )}
                              >
                                {link.label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {item.card ? (
                    <div className="bg-blue px-s5 py-s6 text-white">
                      <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.08em] text-sky">
                        {item.card.eyebrow}
                      </p>
                      <p className="mb-2 text-base font-bold">{item.card.title}</p>
                      <p className="mb-s4 text-sm font-light text-white/75">
                        {item.card.body}
                      </p>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.card.href}
                          className="inline-flex rounded-sm bg-white px-3 py-2 text-sm font-bold text-blue no-underline hover:bg-sky/20 hover:text-white"
                        >
                          {item.card.cta}
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  ) : null}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
