"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";

export default function SupportChatPage() {
  const [messages, setMessages] = useState<Array<{ from: "you" | "agent"; text: string }>>([
    {
      from: "agent",
      text: "Hi — member support here. Billing, freezes, and transfers are my specialty.",
    },
  ]);
  const [draft, setDraft] = useState("");

  function send() {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { from: "you", text },
      {
        from: "agent",
        text: "Got it — a specialist will follow up in this thread.",
      },
    ]);
    setDraft("");
  }

  return (
    <MemberScreen
      eyebrow="Screen 78 · Support"
      title="Support chat"
      subtitle="Ask about billing, transfers, or club policies."
    >
      <MemberCard className="flex min-h-[22rem] flex-col">
        <div className="flex-1 space-y-2 overflow-y-auto">
          {messages.map((msg, index) => (
            <p
              key={`${msg.from}-${index}`}
              className={
                msg.from === "you"
                  ? "ml-8 rounded-2xl bg-pf-purple px-3 py-2 text-sm text-white"
                  : "mr-8 rounded-2xl bg-pf-mist px-3 py-2 text-sm text-pf-ink"
              }
            >
              {msg.text}
            </p>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <Input
            className="border-pf-line"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a message"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                send();
              }
            }}
          />
          <Button type="button" variant="purple" onClick={send}>
            Send
          </Button>
        </div>
      </MemberCard>
    </MemberScreen>
  );
}
