"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Send } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConversationSummary {
  id: string;
  status: string;
  topic: string;
  visitorName: string | null;
  visitorEmail: string | null;
  pagePath: string | null;
  lastMessageAt: string;
  messageCount: number;
  preview: string;
}

interface ChatMessage {
  id: string;
  sender: string;
  body: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [list, setList] = useState<ConversationSummary[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [meta, setMeta] = useState<ConversationSummary | null>(null);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function loadList() {
    const res = await fetch("/api/admin/chat?status=open");
    if (res.status === 403 || res.status === 401) {
      throw new Error("Admin access required (ADMIN_EMAILS).");
    }
    if (!res.ok) throw new Error("Could not load inbox.");
    const data = (await res.json()) as { conversations: ConversationSummary[] };
    setList(data.conversations);
    return data.conversations;
  }

  async function openThread(id: string) {
    setActiveId(id);
    const res = await fetch(`/api/admin/chat/${id}`);
    if (!res.ok) throw new Error("Could not load thread.");
    const data = (await res.json()) as {
      conversation: ConversationSummary & { messages: ChatMessage[] };
    };
    setMessages(data.conversation.messages);
    setMeta({
      id: data.conversation.id,
      status: data.conversation.status,
      topic: data.conversation.topic,
      visitorName: data.conversation.visitorName,
      visitorEmail: data.conversation.visitorEmail,
      pagePath: data.conversation.pagePath,
      lastMessageAt: data.conversation.lastMessageAt,
      messageCount: data.conversation.messages.length,
      preview: "",
    });
  }

  useEffect(() => {
    loadList()
      .then((rows) => {
        if (rows[0]) return openThread(rows[0].id);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function reply(close = false) {
    if (!activeId || !draft.trim()) return;
    setSending(true);
    try {
      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: activeId,
          body: draft.trim(),
          close,
        }),
      });
      const data = (await res.json()) as {
        messages?: ChatMessage[];
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Reply failed");
      setMessages(data.messages ?? []);
      setDraft("");
      await loadList();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reply failed");
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50dvh] items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 size-5 animate-spin" />
        Loading inbox…
      </div>
    );
  }

  if (error && list.length === 0) {
    return (
      <div className="mx-auto max-w-lg space-y-4 px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-semibold">Support inbox</h1>
        <p className="text-muted-foreground">{error}</p>
        <Link href="/login" className={cn(buttonVariants())}>
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid min-h-[70dvh] max-w-6xl gap-4 px-4 py-6 sm:px-6 lg:grid-cols-[18rem_1fr]">
      <aside className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-display text-2xl font-semibold">Inbox</h1>
          <Link
            href="/admin"
            className="text-sm font-medium text-primary underline-offset-2 hover:underline"
          >
            Ops
          </Link>
        </div>
        <ul className="space-y-1.5">
          {list.length === 0 && (
            <li className="text-sm text-muted-foreground">No open chats.</li>
          )}
          {list.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => void openThread(c.id)}
                className={cn(
                  "w-full rounded-xl border px-3 py-2.5 text-left text-sm transition-colors",
                  activeId === c.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/50"
                )}
              >
                <p className="font-semibold">
                  {c.visitorName || c.visitorEmail || "Visitor"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {c.preview || c.topic}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="flex min-h-[28rem] flex-col rounded-2xl border border-border bg-card">
        {meta ? (
          <>
            <header className="border-b border-border px-4 py-3">
              <p className="font-semibold">
                {meta.visitorName || meta.visitorEmail || "Visitor"}
              </p>
              <p className="text-xs text-muted-foreground">
                {meta.topic} · {meta.status}
                {meta.pagePath ? ` · from ${meta.pagePath}` : ""}
                {meta.visitorEmail ? ` · ${meta.visitorEmail}` : ""}
              </p>
            </header>
            <div className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                    m.sender === "visitor" && "mr-auto bg-muted",
                    m.sender === "support" &&
                      "ml-auto bg-primary text-primary-foreground",
                    m.sender === "system" &&
                      "mr-auto border border-border bg-background text-muted-foreground"
                  )}
                >
                  <p className="mb-0.5 text-[10px] font-semibold uppercase opacity-70">
                    {m.sender}
                  </p>
                  <p>{m.body}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-border p-3">
              <textarea
                rows={2}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Reply as support…"
                className="min-h-11 flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm"
              />
              <div className="flex flex-col gap-1">
                <Button
                  type="button"
                  disabled={sending || !draft.trim()}
                  onClick={() => void reply(false)}
                >
                  {sending ? <Loader2 className="animate-spin" /> : <Send />}
                  Send
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={sending || !draft.trim()}
                  onClick={() => void reply(true)}
                >
                  Send & close
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-muted-foreground">
            Select a conversation
          </div>
        )}
        {error && (
          <p className="border-t border-border px-4 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
      </section>
    </div>
  );
}
