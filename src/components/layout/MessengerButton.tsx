"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import { IconClose, IconMessage, IconMic } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: "greeting",
    role: "assistant",
    text: "Hi, I’m Lesley — a virtual assistant for Boston Children’s. How can I help you find care today?",
  },
];

export function MessengerButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const panelId = useId();
  const titleId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    window.setTimeout(() => inputRef.current?.focus(), 0);

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

  useEffect(() => {
    if (!open) return;
    threadRef.current?.scrollTo({
      top: threadRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  function closePanel() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const next = message.trim();
    if (!next) return;

    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: "user", text: next },
      {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: "Thanks — I’ve noted your message. For clinical questions call (617) 355-6000, or request an appointment online. Please don’t share personal health details here.",
      },
    ]);
    setMessage("");
  }

  return (
    <div className="pointer-events-none fixed bottom-[84px] right-4 z-[850] flex flex-col items-end gap-3 xl:bottom-8 xl:right-8">
      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className="pointer-events-auto flex h-[min(70vh,520px)] w-[min(100vw-1.5rem,360px)] flex-col overflow-hidden rounded-t-xl rounded-b-md border border-black/5 bg-white shadow-[0_12px_40px_rgba(0,32,96,0.22)] animate-fade-up"
        >
          <div className="flex shrink-0 items-center bg-blue px-4 py-3.5">
            <h2 id={titleId} className="text-base font-bold text-white">
              Talk to Lesley
            </h2>
          </div>

          <div
            ref={threadRef}
            className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto bg-white px-4 py-4"
          >
            <div className="rounded-md bg-surface px-3.5 py-3 text-[13px] font-light leading-relaxed text-text-body">
              <p className="m-0">
                <strong className="font-bold text-text">Important:</strong> If
                this is a medical emergency, call{" "}
                <a
                  href="tel:911"
                  className="font-semibold text-ocean underline underline-offset-2"
                >
                  9-1-1
                </a>{" "}
                or go to the nearest{" "}
                <Link
                  href="/emergency"
                  className="font-semibold text-ocean underline underline-offset-2"
                  onClick={closePanel}
                >
                  Emergency Department
                </Link>
                . For non-urgent help, call{" "}
                <a
                  href="tel:16173556000"
                  className="font-semibold text-ocean underline underline-offset-2"
                >
                  (617) 355-6000
                </a>
                . Do not share personal health information in this chat.
              </p>
            </div>

            {messages.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "max-w-[92%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed",
                  item.role === "assistant"
                    ? "self-start bg-surface font-light text-text-body"
                    : "self-end bg-blue font-medium text-white",
                )}
              >
                {item.text}
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex shrink-0 items-center gap-2 border-t border-border bg-white px-3 py-2.5"
          >
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-text-meta transition-colors hover:bg-surface hover:text-ocean focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
              aria-label="Voice input unavailable in this preview"
              title="Voice input coming soon"
            >
              <IconMic className="h-[18px] w-[18px]" />
            </button>
            <label htmlFor="lesley-message" className="sr-only">
              Send a message
            </label>
            <input
              ref={inputRef}
              id="lesley-message"
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Send a message..."
              autoComplete="off"
              className="min-w-0 flex-1 rounded-full border border-border bg-surface px-3.5 py-2.5 text-sm text-text outline-none placeholder:text-text-ghost focus:border-ocean focus:bg-white"
            />
            <button
              type="submit"
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-blue px-4 text-sm font-bold text-white transition-colors hover:bg-nav-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!message.trim()}
            >
              Send
            </button>
          </form>
        </div>
      ) : null}

      <button
        ref={buttonRef}
        type="button"
        className={cn(
          "pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-messenger text-white shadow-lg transition-all duration-ease hover:bg-messenger-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean",
          open && "bg-blue hover:bg-nav-dark",
        )}
        aria-label={open ? "Close chat with Lesley" : "Talk to Lesley"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? (
          <IconClose className="h-5 w-5" />
        ) : (
          <IconMessage className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
