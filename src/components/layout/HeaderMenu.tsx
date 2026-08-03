"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { IconChevronDown } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

type HeaderMenuItem = {
  label: string;
  href: string;
  description?: string;
};

type HeaderMenuProps = {
  label: string;
  items: HeaderMenuItem[];
  align?: "left" | "right";
  icon?: ReactNode;
  footer?: ReactNode;
  triggerClassName?: string;
  menuClassName?: string;
};

export function HeaderMenu({
  label,
  items,
  align = "left",
  icon,
  footer,
  triggerClassName,
  menuClassName,
}: HeaderMenuProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [open, setOpen] = useState(false);

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
    closeTimerRef.current = window.setTimeout(() => setOpen(false), 160);
  }

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

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

  return (
    <div
      className="relative"
      ref={rootRef}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        id={`${id}-trigger`}
        type="button"
        data-state={open ? "open" : "closed"}
        className={cn(
          "inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-sm px-2.5 text-[12.5px] font-bold tracking-[0.01em] text-white/85 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white data-[state=open]:bg-white/10 data-[state=open]:text-white",
          triggerClassName,
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={`${id}-menu`}
        onClick={() => setOpen((value) => !value)}
        onFocus={openMenu}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            openMenu();
          }
        }}
      >
        {icon}
        <span>{label}</span>
        <IconChevronDown
          className={cn(
            "h-3 w-3 shrink-0 text-white/80 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div
          id={`${id}-menu`}
          role="menu"
          aria-labelledby={`${id}-trigger`}
          className={cn(
            "absolute top-[calc(100%+8px)] z-[700] min-w-[248px] animate-fade-down rounded-md border border-border bg-white py-2 shadow-lg",
            align === "right" ? "right-0" : "left-0",
            menuClassName,
          )}
        >
          <ul className="m-0 list-none p-0">
            {items.map((item) => (
              <li key={item.href + item.label} role="none">
                <Link
                  role="menuitem"
                  href={item.href}
                  className="block px-4 py-2.5 no-underline transition-colors hover:bg-surface"
                  onClick={() => setOpen(false)}
                >
                  <span className="block text-sm font-bold text-blue">
                    {item.label}
                  </span>
                  {item.description ? (
                    <span className="mt-0.5 block text-[11px] font-light text-text-meta">
                      {item.description}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
          {footer ? (
            <div className="mt-1 border-t border-border px-4 py-3">{footer}</div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
