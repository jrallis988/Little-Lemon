"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatMessage {
  id: string;
  role: "user" | "pharmacist";
  text: string;
}

const STARTER: ChatMessage[] = [
  {
    id: "m0",
    role: "pharmacist",
    text: "Hi — I’m a demo Pharmacy Chat assistant. Ask about refills, vaccines, pickup, or OTC questions. This is not medical advice.",
  },
];

function replyTo(message: string): string {
  const normalized = message.toLowerCase();
  if (normalized.includes("refill") || normalized.includes("prescription")) {
    return "You can refill and track status on the Pharmacy dashboard. Open Pharmacy → select meds → Refill selected.";
  }
  if (normalized.includes("flu") || normalized.includes("vaccine") || normalized.includes("shot")) {
    return "Flu and COVID vaccines can be requested under Schedule a visit. Walk-ins may be available at your selected store.";
  }
  if (normalized.includes("pickup") || normalized.includes("ready")) {
    return "Most retail orders are ready in about 30 minutes for pickup. Prescriptions show Ready on the tracker when the pharmacy finishes filling.";
  }
  if (normalized.includes("coupon") || normalized.includes("deal") || normalized.includes("code")) {
    return "Clip codes on Weekly deals (try AUG10 or FAST15), then apply them as chips at checkout.";
  }
  if (normalized.includes("hours") || normalized.includes("store")) {
    return "Use Find a store to search by ZIP and set your pickup location. Hours show on each store card.";
  }
  return "Thanks for the question. For personal medical advice, talk with a licensed pharmacist or clinician. In this demo, try asking about refills, vaccines, pickup, or deals.";
}

export default function PharmacyChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(STARTER);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
    };
    const botMessage: ChatMessage = {
      id: `b-${Date.now()}`,
      role: "pharmacist",
      text: replyTo(text),
    };
    setMessages((current) => [...current, userMessage, botMessage]);
    setInput("");
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col px-4 py-10 sm:px-6">
      <div className="flex items-start gap-3">
        <MessageCircle className="mt-1 size-6 text-health" aria-hidden />
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Pharmacy Chat
          </h1>
          <p className="mt-2 text-muted-foreground">
            Free general questions about refills, vaccines, and store pickup.
            Demo only — not a licensed consult.
          </p>
        </div>
      </div>

      <div className="mt-8 flex min-h-[420px] flex-col rounded-2xl border border-border/80 bg-surface-elevated/90">
        <ul className="flex-1 space-y-3 overflow-auto p-4 sm:p-5">
          {messages.map((message) => (
            <li
              key={message.id}
              className={
                message.role === "user"
                  ? "ml-8 rounded-2xl bg-brand px-4 py-3 text-sm text-brand-foreground"
                  : "mr-8 rounded-2xl bg-muted px-4 py-3 text-sm text-foreground"
              }
            >
              <p className="text-[10px] font-semibold tracking-wide uppercase opacity-70">
                {message.role === "user" ? "You" : "Pharmacist"}
              </p>
              <p className="mt-1">{message.text}</p>
            </li>
          ))}
          <div ref={endRef} />
        </ul>
        <form
          onSubmit={submit}
          className="flex gap-2 border-t border-border p-3 sm:p-4"
        >
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about refills, flu shots, pickup…"
            aria-label="Chat message"
          />
          <Button
            type="submit"
            className="bg-health text-health-foreground hover:bg-health/90"
          >
            Send
          </Button>
        </form>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="outline" nativeButton={false} render={<Link href="/pharmacy" />}>
          Pharmacy dashboard
        </Button>
        <Button variant="outline" nativeButton={false} render={<Link href="/help" />}>
          Help center
        </Button>
      </div>
    </div>
  );
}
