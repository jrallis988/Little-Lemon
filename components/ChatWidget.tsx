"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, Send, X } from "lucide-react";
import { candidate } from "@/lib/candidate";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const STARTERS = [
  "How do I vote write-in?",
  "How can I volunteer?",
  "Who is Nick Varga?",
];

function assistantReply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("vote") || q.includes("write") || q.includes("ballot")) {
    return `On ${candidate.electionLabel}, write in “${candidate.fullName}” on your General Election ballot. Nick is an independent write-in — the only date that matters is November 3, 2026. See How to Vote for step-by-step instructions.`;
  }
  if (q.includes("volunteer") || q.includes("help") || q.includes("join")) {
    return `Thanks for wanting to help. Join Team Varga on the homepage or visit the Volunteer page to sign up. You can also email ${candidate.email}.`;
  }
  if (q.includes("nick") || q.includes("who") || q.includes("about")) {
    return `${candidate.fullName} is an independent write-in candidate for U.S. Senate from New Hampshire, from ${candidate.hometown}. ${candidate.tagline} Visit Meet Nick to learn more.`;
  }
  if (q.includes("donate") || q.includes("money") || q.includes("contribution")) {
    return `This site does not take online donations. The campaign is built neighbor by neighbor. The best way to help right now is to volunteer and tell neighbors how to write in Nick on November 3.`;
  }
  if (q.includes("contact") || q.includes("email") || q.includes("phone")) {
    return `Reach the campaign at ${candidate.email} or ${candidate.phone}. You can also use the Contact page.`;
  }
  return `Thanks for your message. For voting help, open How to Vote. To get involved, visit Volunteer or email ${candidate.email}. A campaign teammate can also follow up if you leave your question here.`;
}

export function ChatWidget() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: `Hi — I’m the ${candidate.fullName} campaign assistant. Ask about write-in voting, volunteering, or the campaign. For anything urgent, email ${candidate.email}.`,
    },
  ]);
  const panelRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const previouslyFocused = openButtonRef.current;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        previouslyFocused?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function sendMessage(raw: string) {
    const text = raw.trim();
    if (!text) return;
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
    };
    const reply: ChatMessage = {
      id: `a-${Date.now() + 1}`,
      role: "assistant",
      text: assistantReply(text),
    };
    setMessages((prev) => [...prev, userMsg, reply]);
    setInput("");
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[85] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          ref={panelRef}
          id="campaign-chat-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className="pointer-events-auto flex h-[min(28rem,70vh)] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-slate-line bg-warm-white shadow-[0_12px_40px_rgba(16,19,27,0.28)]"
        >
          <div className="flex items-start justify-between gap-3 bg-navy px-4 py-3 text-white">
            <div>
              <h2 id={titleId} className="font-display text-base font-normal">
                Chat with the campaign
              </h2>
              <p className="mt-0.5 text-xs text-white/85">
                Write-in help · Volunteer · Quick answers
              </p>
            </div>
            <button
              type="button"
              className="rounded-cta p-1.5 text-white hover:bg-white/15"
              aria-label="Close chat"
              onClick={() => {
                setOpen(false);
                openButtonRef.current?.focus();
              }}
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "ml-auto bg-navy text-white"
                    : "bg-paper text-slate-text"
                }`}
              >
                <p>{msg.text}</p>
                {msg.role === "assistant" && msg.text.includes("How to Vote") && (
                  <p className="mt-2">
                    <Link
                      href="/how-to-vote"
                      className="font-semibold text-red underline underline-offset-2"
                    >
                      Open How to Vote
                    </Link>
                  </p>
                )}
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              {STARTERS.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  className="rounded-full border border-slate-line bg-white px-3 py-1.5 text-xs font-semibold text-navy hover:border-red hover:text-red"
                  onClick={() => sendMessage(starter)}
                >
                  {starter}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 border-t border-slate-line bg-white p-3"
          >
            <label htmlFor="campaign-chat-input" className="sr-only">
              Type your message
            </label>
            <input
              ref={inputRef}
              id="campaign-chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="input-field !py-2.5"
              autoComplete="off"
            />
            <button
              type="submit"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-white hover:bg-ink"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </div>
      )}

      <button
        ref={openButtonRef}
        type="button"
        className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink shadow-[0_8px_24px_rgba(16,19,27,0.28)] ring-1 ring-black/5 transition hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2"
        aria-expanded={open}
        aria-controls="campaign-chat-panel"
        aria-label={open ? "Close live chat" : "Open live chat"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <X className="h-6 w-6" aria-hidden />
        ) : (
          <MessageCircle className="h-7 w-7" aria-hidden strokeWidth={1.75} />
        )}
      </button>
    </div>
  );
}
