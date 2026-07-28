"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader2, MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "visitor" | "support" | "system";
  body: string;
  createdAt: string;
}

const SUGGESTIONS = [
  { label: "How do coupons work?", topic: "coupon" as const },
  { label: "Insurance vs cash?", topic: "pricing" as const },
  { label: "Membership / Plus", topic: "membership" as const },
  { label: "Pharmacy pickup help", topic: "pharmacy" as const },
];

export function SupportChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/chat");
      const data = (await res.json()) as {
        conversation?: { id: string; messages: ChatMessage[] };
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Could not load chat");
      setConversationId(data.conversation?.id ?? null);
      setMessages(data.conversation?.messages ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load chat");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) void load();
  }, [open, load]);

  useEffect(() => {
    if (!open || !conversationId) return;
    const id = window.setInterval(() => {
      void fetch("/api/chat")
        .then(async (res) => {
          if (!res.ok) return;
          const data = (await res.json()) as {
            conversation?: { messages: ChatMessage[] };
          };
          if (data.conversation?.messages) {
            setMessages(data.conversation.messages);
          }
        })
        .catch(() => undefined);
    }, 8000);
    return () => window.clearInterval(id);
  }, [open, conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send(body: string, topic?: string) {
    const text = body.trim();
    if (!text || sending) return;
    setSending(true);
    setError(null);
    setDraft("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: text,
          pagePath: pathname,
          topic,
        }),
      });
      const data = (await res.json()) as {
        conversation?: { id: string; messages: ChatMessage[] };
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Could not send");
      setConversationId(data.conversation?.id ?? null);
      setMessages(data.conversation?.messages ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send message");
      setDraft(text);
    } finally {
      setSending(false);
    }
  }

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className="flex h-[min(32rem,70dvh)] w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
          role="dialog"
          aria-label="Trump RX messages"
        >
          <header className="flex items-start justify-between gap-2 border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <div>
              <p className="font-display text-lg font-semibold leading-tight">
                Messages
              </p>
              <p className="text-xs opacity-90">
                Ask about prices, coupons, and checkout
              </p>
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="size-8 text-primary-foreground hover:bg-primary-foreground/15"
              aria-label="Close messages"
              onClick={() => setOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </header>

          <div className="flex-1 space-y-2 overflow-y-auto px-3 py-3">
            {loading && messages.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Opening chat…
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-snug",
                    m.sender === "visitor" &&
                      "ml-auto bg-primary text-primary-foreground",
                    m.sender === "support" &&
                      "mr-auto bg-secondary text-secondary-foreground",
                    m.sender === "system" &&
                      "mr-auto border border-border bg-muted/60 text-foreground"
                  )}
                >
                  {m.sender !== "visitor" && (
                    <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide opacity-70">
                      {m.sender === "support" ? "Support" : "Trump RX Assist"}
                    </p>
                  )}
                  <p>{m.body}</p>
                </div>
              ))
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length <= 2 && (
            <div className="flex flex-wrap gap-1.5 border-t border-border px-3 py-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  disabled={sending}
                  onClick={() => void send(s.label, s.topic)}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium hover:bg-muted"
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {error && (
            <p className="px-3 text-xs text-destructive" role="alert">
              {error}
            </p>
          )}

          <form
            className="flex items-end gap-2 border-t border-border p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send(draft);
            }}
          >
            <label className="sr-only" htmlFor="trx-chat-input">
              Message
            </label>
            <textarea
              id="trx-chat-input"
              rows={2}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your question…"
              className="min-h-11 flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
              maxLength={2000}
            />
            <Button
              type="submit"
              size="icon-lg"
              disabled={sending || !draft.trim()}
              aria-label="Send message"
            >
              {sending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
            </Button>
          </form>
        </div>
      )}

      <Button
        type="button"
        size="lg"
        className="min-h-12 gap-2 rounded-full px-5 shadow-lg"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={open ? undefined : undefined}
      >
        <MessageCircle className="size-5" />
        {open ? "Close chat" : "Chat with us"}
      </Button>
    </div>
  );
}
