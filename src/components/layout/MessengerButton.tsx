"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import { IconClose, IconMessage, IconPhone } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const quickLinks = [
  {
    label: "Request an appointment",
    href: "/appointments/request",
    desc: "Schedule a visit with a specialist",
  },
  {
    label: "Find a doctor",
    href: "/find-a-doctor",
    desc: "Search by specialty or name",
  },
  {
    label: "About Us",
    href: "/about",
    desc: "Mission, locations, and teaching hospital",
  },
  {
    label: "Emergency Department",
    href: "/emergency",
    desc: "When and how to come to the ED",
  },
];

export function MessengerButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const panelId = useId();
  const titleId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    window.setTimeout(() => textareaRef.current?.focus(), 0);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
  }

  return (
    <div className="pointer-events-none fixed bottom-[84px] right-4 z-[850] flex flex-col items-end gap-s3 lg:bottom-6 lg:right-6">
      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className="pointer-events-auto flex w-[min(100vw-2rem,360px)] flex-col overflow-hidden rounded-md border border-border bg-white shadow-lg animate-fade-up"
        >
          <div className="flex items-start justify-between gap-s3 bg-blue px-s5 py-s4">
            <div>
              <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em] text-sky">
                Boston Children&apos;s
              </p>
              <h2 id={titleId} className="text-lg font-bold text-white">
                Message us
              </h2>
              <p className="mt-1 text-sm font-light text-white/85">
                Get help finding care. Do not send medical details here.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close messenger"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
            >
              <IconClose className="h-5 w-5" />
            </button>
          </div>

          <div className="flex max-h-[min(70vh,420px)] flex-col gap-s4 overflow-y-auto p-s5">
            <div className="rounded-sm border border-border bg-surface px-s4 py-s3">
              <p className="text-sm font-light leading-relaxed text-text-body">
                Hi — how can we help today? Choose a path below, call us, or
                leave a short non-clinical message.
              </p>
            </div>

            <ul className="flex flex-col gap-s2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group block rounded-sm border border-border px-s4 py-s3 no-underline transition-colors hover:border-ocean hover:bg-surface"
                    onClick={() => setOpen(false)}
                  >
                    <span className="block text-sm font-bold text-blue group-hover:text-ocean">
                      {link.label}
                    </span>
                    <span className="block text-xs font-light text-text-meta">
                      {link.desc}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="tel:16173556000"
              className="inline-flex items-center gap-s2 text-sm font-bold text-ocean no-underline hover:underline"
            >
              <IconPhone className="h-4 w-4" />
              Call (617) 355-6000
            </a>

            {sent ? (
              <div
                className="rounded-sm border border-ocean/25 bg-ocean/[0.06] px-s4 py-s3"
                role="status"
              >
                <p className="mb-1 text-sm font-bold text-blue">
                  Thanks — message received.
                </p>
                <p className="text-sm font-light text-text-body">
                  For clinical questions, call your care team or{" "}
                  <a href="tel:16173556000">(617) 355-6000</a>. For visits,{" "}
                  <Link href="/appointments/request">request an appointment</Link>
                  .
                </p>
                <button
                  type="button"
                  className="mt-s3 text-sm font-bold text-ocean underline"
                  onClick={() => setSent(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-s3">
                <label
                  htmlFor="messenger-note"
                  className="text-sm font-bold text-text"
                >
                  Short message
                </label>
                <textarea
                  ref={textareaRef}
                  id="messenger-note"
                  name="message"
                  rows={3}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="How can we help you find care?"
                  className="w-full resize-y rounded-sm border border-border bg-white px-s3 py-s3 text-sm font-light text-text outline-none transition-colors focus:border-ocean"
                />
                <p className="text-xs font-light text-text-meta">
                  Preview helper only — do not include PHI, symptoms, or personal
                  health information.
                </p>
                <Button type="submit" variant="ocean" size="sm" fullWidth>
                  Send message
                </Button>
              </form>
            )}
          </div>
        </div>
      ) : null}

      <button
        ref={buttonRef}
        type="button"
        className={cn(
          "pointer-events-auto inline-flex h-14 min-w-14 items-center justify-center gap-2 rounded-full bg-ocean px-4 text-white shadow-lg transition-all duration-ease hover:bg-ocean-dark",
          open && "bg-blue hover:bg-nav-dark",
        )}
        aria-label={open ? "Close messenger" : "Open messenger"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          setOpen((current) => !current);
          if (open) setSent(false);
        }}
      >
        {open ? (
          <IconClose className="h-5 w-5" />
        ) : (
          <>
            <IconMessage className="h-5 w-5" />
            <span className="pr-1 text-sm font-bold max-sm:sr-only">
              Message us
            </span>
          </>
        )}
      </button>
    </div>
  );
}
