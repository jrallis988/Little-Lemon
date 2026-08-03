"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
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
  /** When omitted or empty, the item renders as a direct page link (no dropdown). */
  zones?: MegaZone[];
  card?: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    href: string;
  };
};

const triggerClass =
  "group inline-flex h-16 max-w-none flex-row flex-nowrap items-center gap-1 whitespace-nowrap border-b-[3px] border-transparent px-2 text-[14px] font-semibold tracking-[0.01em] text-white/90 no-underline transition-all duration-200 hover:border-sky hover:text-white xl:px-2.5 2xl:gap-1.5 2xl:px-3 2xl:text-[15px] 2xl:font-bold";

function megaPanelClass(item: NavItem) {
  const columns = (item.zones?.length ?? 0) + (item.card ? 1 : 0);
  return cn(
    "border-t-[3px] border-ocean bg-white shadow-lg grid gap-0",
    columns <= 1 && "min-w-[260px] grid-cols-1",
    columns === 2 && "min-w-[440px] grid-cols-2",
    columns === 3 && !item.card && "min-w-[560px] grid-cols-3",
    columns === 3 &&
      item.card &&
      "min-w-[560px] grid-cols-[1.2fr_1fr_200px]",
    columns >= 4 && "min-w-[680px] grid-cols-[1.2fr_1fr_1fr_200px]",
  );
}

function isActiveItem(item: NavItem, pathname: string) {
  if (item.match?.some((m) => pathname === m || pathname.startsWith(`${m}/`))) {
    return true;
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function NavLabel({ item }: { item: NavItem }) {
  if (item.shortLabel) {
    return (
      <>
        <span className="whitespace-nowrap 2xl:hidden">{item.shortLabel}</span>
        <span className="hidden whitespace-nowrap 2xl:inline">{item.label}</span>
      </>
    );
  }
  return <span className="whitespace-nowrap">{item.label}</span>;
}

function LinkItem({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <li className="relative shrink-0">
      <Link
        href={item.href}
        aria-label={item.label}
        className={cn(triggerClass, active && "border-sky text-white")}
      >
        <NavLabel item={item} />
      </Link>
    </li>
  );
}

function MegaItem({
  item,
  active,
  alignEnd,
}: {
  item: NavItem;
  active: boolean;
  alignEnd: boolean;
}) {
  const id = useId();
  const rootRef = useRef<HTMLLIElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const zones = item.zones ?? [];

  function clearCloseTimer() {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function openMenu() {
    clearCloseTimer();
    setOpen(true);
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => setOpen(false), 120);
  }

  useEffect(() => () => clearCloseTimer(), []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById(`${id}-trigger`)?.focus();
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, id]);

  function onTriggerKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault();
      openMenu();
    }
  }

  return (
    <li
      ref={rootRef}
      className="relative shrink-0"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        id={`${id}-trigger`}
        type="button"
        aria-label={item.label}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={`${id}-panel`}
        data-state={open ? "open" : "closed"}
        className={cn(
          triggerClass,
          "data-[state=open]:border-sky data-[state=open]:text-white",
          active && "border-sky text-white",
        )}
        onClick={() => setOpen((value) => !value)}
        onFocus={openMenu}
        onKeyDown={onTriggerKeyDown}
      >
        <NavLabel item={item} />
        <IconChevronDown
          className={cn(
            "h-3 w-3 shrink-0 opacity-55 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div
          id={`${id}-panel`}
          role="group"
          aria-label={item.label}
          className={cn(
            "absolute top-full z-[650] w-max animate-fade-down",
            alignEnd ? "right-0 left-auto" : "left-0",
          )}
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
        >
          <div className={megaPanelClass(item)}>
            {zones.map((zone) => (
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
                      <Link
                        href={link.href}
                        className={cn(
                          "block no-underline transition-colors",
                          zone.accent
                            ? "rounded-sm px-2.5 py-[7px] text-base font-bold text-blue hover:bg-blue/[0.07]"
                            : "py-0.5 text-sm font-light text-text-body hover:text-ocean",
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
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
                <Link
                  href={item.card.href}
                  className="inline-flex rounded-sm bg-white px-3 py-2 text-sm font-bold text-blue no-underline hover:bg-sky/20 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.card.cta}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </li>
  );
}

export function DesktopPrimaryNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="relative flex min-w-0 overflow-visible">
      <ul className="m-0 flex list-none flex-nowrap items-center justify-center gap-0.5 p-0 xl:gap-1">
        {items.map((item, index) => {
          const active = isActiveItem(item, pathname);
          const isLinkOnly = !item.zones?.length;
          if (isLinkOnly) {
            return <LinkItem key={item.label} item={item} active={active} />;
          }
          return (
            <MegaItem
              key={item.label}
              item={item}
              active={active}
              alignEnd={index >= items.length - 2}
            />
          );
        })}
      </ul>
    </nav>
  );
}
