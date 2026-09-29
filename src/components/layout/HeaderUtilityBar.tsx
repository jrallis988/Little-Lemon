"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { IconChevronDown } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

const iWantToLinks = [
  { label: "Request an Appointment", href: "/appointments/request" },
  { label: "Pay My Bill", href: "/patients-families/billing" },
  { label: "Find a Doctor", href: "/find-a-doctor" },
  { label: "Find a Location", href: "/locations" },
  { label: "Get a Second Opinion", href: "/professionals/second-opinion" },
  { label: "Donate", href: "/#giving" },
];

/**
 * Top utility strip matching childrenshospital.org: MyChildren’s, International,
 * I Want To…, and Donate — above the primary blue nav.
 */
export function HeaderUtilityBar() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="border-b border-border bg-white">
      <div className="wrap flex h-11 items-center justify-end gap-s3 text-sm sm:gap-s4">
        <Link
          href="/portal"
          className="hidden font-semibold text-blue no-underline hover:underline sm:inline"
        >
          MyChildren&apos;s Patient Portal
        </Link>
        <Link
          href="/international"
          className="hidden font-semibold text-blue no-underline hover:underline md:inline"
        >
          International
        </Link>

        <div
          ref={rootRef}
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <button
            type="button"
            id={`${id}-want`}
            aria-expanded={open}
            aria-haspopup="true"
            aria-controls={`${id}-want-menu`}
            className="inline-flex items-center gap-1 font-semibold text-blue hover:underline"
            onClick={() => setOpen((v) => !v)}
            onFocus={() => setOpen(true)}
          >
            I Want To...
            <IconChevronDown
              className={cn(
                "h-3 w-3 transition-transform",
                open && "rotate-180",
              )}
            />
          </button>
          {open ? (
            <ul
              id={`${id}-want-menu`}
              role="menu"
              aria-labelledby={`${id}-want`}
              className="absolute right-0 top-full z-[620] mt-0 min-w-[240px] rounded-sm border border-border bg-white py-1 pt-2 shadow-lg"
            >
              {iWantToLinks.map((link) => (
                <li key={link.label} role="none">
                  <Link
                    role="menuitem"
                    href={link.href}
                    className="block px-s4 py-2 text-sm font-semibold text-blue no-underline hover:bg-surface"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <Link
          href="/#giving"
          className="inline-flex h-8 items-center rounded-sm border border-pink px-3 text-sm font-bold text-pink no-underline transition-colors hover:bg-pink hover:text-white"
        >
          Donate
        </Link>
      </div>
    </div>
  );
}
