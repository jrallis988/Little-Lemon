import { useEffect, useRef, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { MessageCircle, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAccountStore } from "@/stores/accountStore"
import { cn } from "@/lib/utils"

type ChatRole = "agent" | "user"

type ChatMessage = {
  id: string
  role: ChatRole
  text: string
  links?: { label: string; to: string }[]
}

const QUICK_PROMPTS = [
  "Track my order",
  "Free shipping?",
  "Return policy",
  "Find a store",
  "Talk to a person",
] as const

const STARTER: ChatMessage = {
  id: "welcome",
  role: "agent",
  text: "Hi! I’m Maya from Marshalls Support. Ask me about shipping, returns, sizes, stores, or finding a deal — I’m here to help.",
}

function replyFor(input: string): ChatMessage {
  const q = input.toLowerCase()
  const id = `agent-${Date.now()}`

  if (/(track|order status|where.*order|shipping status)/.test(q)) {
    return {
      id,
      role: "agent",
      text: "You can check recent orders on the confirmation page after checkout. Guest orders use the email on your receipt. Need a store pickup instead? I can point you there.",
      links: [
        { label: "Order confirmation", to: "/order-confirmation" },
        { label: "Find a store", to: "/stores" },
      ],
    }
  }

  if (/(ship|delivery|free shipping)/.test(q)) {
    return {
      id,
      role: "agent",
      text: "Shipping’s free on orders $89+. Sign up for email and your first qualifying order can ship free, too. Standard delivery usually lands in 3–7 business days.",
      links: [{ label: "Shop arrivals", to: "/catalog?sort=newest" }],
    }
  }

  if (/(return|exchange|refund)/.test(q)) {
    return {
      id,
      role: "agent",
      text: "Most online buys can be returned in store with your shipping confirmation email — free and easy. Some exclusions apply on beauty, final sale, and intimate apparel.",
      links: [{ label: "Find a store for returns", to: "/stores" }],
    }
  }

  if (/(store|near me|pickup|bopis|hours|location)/.test(q)) {
    return {
      id,
      role: "agent",
      text: "Every Marshalls is a little different — that’s the fun. Use the store locator for hours, distance, and pickup options. On a product page you can also Reserve in Store.",
      links: [{ label: "Open store locator", to: "/stores" }],
    }
  }

  if (/(size|fit|chart|run small|run large)/.test(q)) {
    return {
      id,
      role: "agent",
      text: "Fit varies by brand. On any product page, open Size & fit guide for apparel, shoes, or kids charts. When you’re between sizes, sizing up is usually the safer call for a relaxed Marshalls find.",
      links: [{ label: "Browse apparel", to: "/catalog?nav=apparel" }],
    }
  }

  if (/(sale|clearance|deal|discount|promo|code)/.test(q)) {
    return {
      id,
      role: "agent",
      text: "Compare-at prices already show the wow factor. For extra markdowns, hit Clearance — and try promo code FIND20 for an extra 20% off eligible styles in your bag.",
      links: [{ label: "Shop Clearance", to: "/catalog?sort=discount" }],
    }
  }

  if (/(pet|dog|cat)/.test(q)) {
    return {
      id,
      role: "agent",
      text: "Yes — we carry pet finds too. Beds, bowls, toys, and more land in Pet.",
      links: [{ label: "Shop Pet", to: "/catalog?department=Pets" }],
    }
  }

  if (/(human|real person|agent|manager|speak|talk to a person|representative)/.test(q)) {
    const ticketId = useAccountStore.getState().requestHumanHandoff(input)
    return {
      id,
      role: "agent",
      text: `I’ve opened handoff ticket ${ticketId}. A specialist will follow up by email in this prototype queue. Meanwhile I can still help with shipping, returns, or store pickup.`,
      links: [
        { label: "Find a store", to: "/stores" },
        { label: "Account / orders", to: "/account" },
      ],
    }
  }

  return {
    id,
    role: "agent",
    text: "Happy to help with shipping, returns, sizes, stores, clearance, or product hunting. Try a quick question below — or tell me what you’re shopping for.",
    links: [
      { label: "Shop all", to: "/catalog" },
      { label: "Find a store", to: "/stores" },
    ],
  }
}

export function SupportChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([STARTER])
  const [draft, setDraft] = useState("")
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
      window.setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [open, messages, typing])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || typing) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
    }
    setMessages((prev) => [...prev, userMsg])
    setDraft("")
    setTyping(true)

    window.setTimeout(() => {
      setMessages((prev) => [...prev, replyFor(trimmed)])
      setTyping(false)
    }, 650 + Math.random() * 500)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    send(draft)
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section
          className="pointer-events-auto flex h-[min(32rem,calc(100dvh-7rem))] w-[min(100vw-1.5rem,22rem)] flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-drawer animate-fade-in"
          aria-label="Marshalls support chat"
        >
          <header className="flex items-start justify-between gap-3 bg-navy px-4 py-3 text-navy-foreground">
            <div>
              <p className="text-sm font-bold">Chat with Marshalls</p>
              <p className="text-2xs text-white/75">Usually replies in under a minute</p>
            </div>
            <button
              type="button"
              className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-surface-muted/40 px-3 py-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed shadow-soft",
                    message.role === "user"
                      ? "bg-navy text-navy-foreground"
                      : "border border-border bg-surface text-foreground",
                  )}
                >
                  <p>{message.text}</p>
                  {message.links && message.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.links.map((link) => (
                        <Link
                          key={link.to + link.label}
                          to={link.to}
                          className="text-xs font-semibold underline underline-offset-2"
                          onClick={() => setOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="rounded-lg border border-border bg-surface px-3 py-2 text-xs text-muted-foreground shadow-soft">
                  Maya is typing…
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-border bg-surface px-3 py-2">
            <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="shrink-0 rounded-full border border-border bg-surface-muted px-2.5 py-1 text-2xs font-semibold text-foreground hover:border-navy/40 hover:bg-sky-soft"
                  onClick={() => send(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
            <form className="flex gap-2" onSubmit={onSubmit}>
              <Input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask about shipping, returns…"
                className="h-10"
                aria-label="Chat message"
              />
              <Button
                type="submit"
                size="icon"
                className="h-10 w-10 shrink-0 bg-navy text-navy-foreground hover:bg-navy/90"
                aria-label="Send message"
                disabled={!draft.trim() || typing}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>
      )}

      <Button
        type="button"
        size="lg"
        className={cn(
          "pointer-events-auto h-12 gap-2 rounded-full bg-navy px-4 text-navy-foreground shadow-lift hover:bg-navy/90",
          open && "bg-foreground",
        )}
        aria-expanded={open}
        aria-label={open ? "Close support chat" : "Open support chat"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span className="pr-0.5">{open ? "Close" : "Chat"}</span>
      </Button>
    </div>
  )
}
