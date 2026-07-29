"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Bot, MessageCircle, Send, UserRound, X } from "lucide-react";
import { candidate } from "@/lib/candidate";
import { chatConfig } from "@/lib/chat";

type Mode = "menu" | "helper" | "live";

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
  if (q.includes("vote") || q.includes("write") || q.includes("ballot") || q.includes("faq")) {
    return `On ${candidate.electionLabel}, write in “${candidate.fullName}” on your General Election ballot. For plain-language answers about Nick and the campaign, open the FAQ. For official election rules, use the New Hampshire Secretary of State.`;
  }
  if (q.includes("volunteer") || q.includes("help") || q.includes("join")) {
    return `Thanks for wanting to help. Visit Volunteer or Join Team Varga on the homepage, or email ${candidate.email}.`;
  }
  if (q.includes("nick") || q.includes("who") || q.includes("about")) {
    return `${candidate.fullName} is an independent write-in candidate for U.S. Senate from New Hampshire (${candidate.hometown}). ${candidate.tagline}`;
  }
  if (q.includes("donate") || q.includes("money") || q.includes("contribution")) {
    return `This site does not take online donations. The best way to help is to volunteer and share how to write in Nick on November 3.`;
  }
  if (q.includes("contact") || q.includes("email") || q.includes("phone")) {
    return `Campaign contact: ${candidate.email} · ${candidate.phone}. Or use the Contact page.`;
  }
  return `I’m an automated website helper — not a person. For Nick and the campaign, see the FAQ. For write-in steps, see How to Vote. For a human teammate, choose Live Campaign Support (or leave a message if staff are offline).`;
}

export function ChatWidget() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("menu");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: `You’re chatting with an automated website helper (not a human). Ask about write-in voting, volunteering, or the campaign.`,
    },
  ]);
  const [liveName, setLiveName] = useState("");
  const [liveEmail, setLiveEmail] = useState("");
  const [liveMessage, setLiveMessage] = useState("");
  const [liveStatus, setLiveStatus] = useState<"idle" | "sent" | "error">("idle");
  const [liveError, setLiveError] = useState("");

  const openButtonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
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
    if (open && mode === "helper") inputRef.current?.focus();
  }, [open, mode]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, mode]);

  function sendMessage(raw: string) {
    const text = raw.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", text },
      { id: `a-${Date.now() + 1}`, role: "assistant", text: assistantReply(text) },
    ]);
    setInput("");
  }

  function onHelperSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function onLiveSubmit(e: FormEvent) {
    e.preventDefault();
    const name = liveName.trim();
    const email = liveEmail.trim();
    const message = liveMessage.trim();
    if (!name || !message) {
      setLiveStatus("error");
      setLiveError("Please include your name and a message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLiveStatus("error");
      setLiveError("Enter a valid email so we can reply.");
      return;
    }
    setLiveStatus("sent");
    setLiveError("");
    setLiveName("");
    setLiveEmail("");
    setLiveMessage("");
  }

  const online = chatConfig.liveSupportOnline;

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[85] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          id="campaign-chat-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className="pointer-events-auto flex h-[min(30rem,75vh)] w-[min(22.5rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-slate-line bg-warm-white shadow-[0_12px_40px_rgba(16,19,27,0.28)]"
        >
          <div className="flex items-start justify-between gap-3 bg-navy px-4 py-3 text-white">
            <div>
              <h2 id={titleId} className="font-display text-base font-normal">
                Need help?
              </h2>
              <p className="mt-0.5 text-xs text-white/85">
                {mode === "helper"
                  ? "Automated Website Helper"
                  : mode === "live"
                    ? "Live Campaign Support"
                    : "Choose how you’d like to get help"}
              </p>
            </div>
            <button
              type="button"
              className="rounded-cta p-1.5 text-white hover:bg-white/15"
              aria-label="Close help panel"
              onClick={() => {
                setOpen(false);
                openButtonRef.current?.focus();
              }}
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          {mode === "menu" && (
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
              <p className="text-sm text-slate-text">
                Pick an option. The website helper is automated and never a
                person. Campaign staff chat is separate.
              </p>
              <button
                type="button"
                className="flex items-start gap-3 rounded-cta border border-slate-line bg-white p-4 text-left hover:border-red"
                onClick={() => setMode("helper")}
              >
                <Bot className="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden />
                <span>
                  <span className="block font-semibold text-ink">
                    Ask the Website Helper
                  </span>
                  <span className="mt-1 block text-sm text-slate-muted">
                    Automated answers about write-in voting and volunteering.
                  </span>
                </span>
              </button>
              {chatConfig.liveSupportEnabled && (
                <button
                  type="button"
                  className="flex items-start gap-3 rounded-cta border border-slate-line bg-white p-4 text-left hover:border-red"
                  onClick={() => {
                    setMode("live");
                    setLiveStatus("idle");
                  }}
                >
                  <UserRound className="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden />
                  <span>
                    <span className="block font-semibold text-ink">
                      Chat with Campaign Staff
                    </span>
                    <span className="mt-1 block text-sm text-slate-muted">
                      {online ? (
                        <>
                          <span className="font-semibold text-green-700">Online</span>
                          {" — "}talk with a campaign teammate.
                        </>
                      ) : (
                        <>
                          <span className="font-semibold text-red">Offline</span>
                          {" — "}leave a message and we’ll follow up.
                        </>
                      )}
                    </span>
                  </span>
                </button>
              )}
              <p className="text-xs text-slate-muted">
                Prefer self-serve?{" "}
                <Link href="/faq" className="font-semibold text-red underline-offset-2 hover:underline">
                  FAQ
                </Link>
                {" · "}
                <Link href="/how-to-vote" className="font-semibold text-red underline-offset-2 hover:underline">
                  How to Vote
                </Link>
              </p>
            </div>
          )}

          {mode === "helper" && (
            <>
              <div className="border-b border-slate-line bg-paper px-4 py-2 text-xs text-slate-text">
                <strong className="font-semibold">Automated Website Helper</strong>
                {" — "}not a human. For people, choose Live Campaign Support.
                <button
                  type="button"
                  className="ml-2 font-semibold text-red underline-offset-2 hover:underline"
                  onClick={() => setMode("menu")}
                >
                  Back
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
                    {msg.role === "assistant" && (
                      <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-wide text-slate-muted">
                        Automated helper
                      </p>
                    )}
                    <p>{msg.text}</p>
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
                onSubmit={onHelperSubmit}
                className="flex items-center gap-2 border-t border-slate-line bg-white p-3"
              >
                <label htmlFor="campaign-helper-input" className="sr-only">
                  Message the automated website helper
                </label>
                <input
                  ref={inputRef}
                  id="campaign-helper-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask the helper…"
                  className="input-field !py-2.5"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-white hover:bg-ink"
                  aria-label="Send message to automated helper"
                >
                  <Send className="h-4 w-4" aria-hidden />
                </button>
              </form>
            </>
          )}

          {mode === "live" && (
            <div className="flex flex-1 flex-col overflow-y-auto p-4">
              <div className="mb-3 flex items-center justify-between gap-2 text-xs">
                <p className="text-slate-text">
                  <strong className="font-semibold">Live Campaign Support</strong>
                  {" — "}
                  {online ? (
                    <span className="font-semibold text-green-700">Online now</span>
                  ) : (
                    <span className="font-semibold text-red">Currently offline</span>
                  )}
                </p>
                <button
                  type="button"
                  className="font-semibold text-red underline-offset-2 hover:underline"
                  onClick={() => setMode("menu")}
                >
                  Back
                </button>
              </div>

              {online ? (
                <p className="text-sm text-slate-text">
                  Human chat will connect here when the campaign enables a live
                  provider. Until then, please leave a message below or email{" "}
                  {candidate.email}.
                </p>
              ) : (
                <p className="text-sm text-slate-text">
                  Staff are offline. Leave a short message and we’ll follow up.
                  {chatConfig.expectedResponse ? ` ${chatConfig.expectedResponse}` : ""}
                </p>
              )}

              <form onSubmit={onLiveSubmit} className="mt-4 space-y-3" noValidate>
                <div>
                  <label htmlFor="live-name" className="label-field">
                    Name
                  </label>
                  <input
                    id="live-name"
                    className="input-field"
                    value={liveName}
                    onChange={(e) => setLiveName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="live-email" className="label-field">
                    Email
                  </label>
                  <input
                    id="live-email"
                    type="email"
                    className="input-field"
                    value={liveEmail}
                    onChange={(e) => setLiveEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="live-message" className="label-field">
                    Message
                  </label>
                  <textarea
                    id="live-message"
                    rows={4}
                    className="input-field"
                    value={liveMessage}
                    onChange={(e) => setLiveMessage(e.target.value)}
                    required
                  />
                </div>
                <p className="text-xs text-slate-muted">{chatConfig.privacyNote}</p>
                <p className="text-xs text-slate-muted">
                  See our{" "}
                  <Link href="/privacy" className="font-semibold text-red underline-offset-2 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
                <button type="submit" className="btn-primary w-full">
                  {online ? "Start conversation / Send" : "Leave a message"}
                </button>
                {liveStatus === "sent" && (
                  <p role="status" className="text-sm font-semibold text-navy">
                    Message received. {chatConfig.expectedResponse}
                  </p>
                )}
                {liveStatus === "error" && (
                  <p role="alert" className="text-sm font-semibold text-red">
                    {liveError}
                  </p>
                )}
              </form>
            </div>
          )}
        </div>
      )}

      <button
        ref={openButtonRef}
        type="button"
        className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink shadow-[0_8px_24px_rgba(16,19,27,0.28)] ring-1 ring-black/5 transition hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2"
        aria-expanded={open}
        aria-controls="campaign-chat-panel"
        aria-label={open ? "Close help panel" : "Open help — website helper or campaign staff"}
        onClick={() => {
          setOpen((v) => !v);
          if (!open) setMode("menu");
        }}
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
