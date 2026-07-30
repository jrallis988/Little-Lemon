import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { MessageCircle, Package, UserRound } from "lucide-react"
import { useAccountStore } from "@/stores/accountStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import { formatCurrency } from "@/lib/utils"

export function AccountPage() {
  useDocumentMeta({
    title: "Account | Marshalls",
    description: "Sign in for faster checkout and order history.",
  })

  const user = useAccountStore((s) => s.user)
  const orders = useAccountStore((s) => s.orders)
  const chatTickets = useAccountStore((s) => s.chatTickets)
  const signIn = useAccountStore((s) => s.signIn)
  const signOut = useAccountStore((s) => s.signOut)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    signIn({ name: name.trim(), email: email.trim() })
  }

  if (!user) {
    return (
      <div className="shelf-container py-10 md:py-16">
        <div className="mx-auto max-w-md rounded-lg border border-border bg-surface p-6 shadow-soft">
          <p className="text-2xs font-bold uppercase tracking-[0.12em] text-primary">
            Account
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy">
            Sign in or create an account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Prototype account — saved on this device for faster checkout and order history.
          </p>
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div>
              <label htmlFor="account-name" className="text-sm font-medium">
                Full name
              </label>
              <Input
                id="account-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5"
                required
              />
            </div>
            <div>
              <label htmlFor="account-email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="account-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-navy hover:bg-navy/90">
              Continue
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="shelf-container py-8 md:py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-1.5 text-2xs font-bold uppercase tracking-[0.12em] text-primary">
            <UserRound className="h-3.5 w-3.5" /> Account hub
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy">
            Hi, {user.name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-muted-foreground">{user.email}</p>
        </div>
        <Button variant="outline" onClick={signOut}>
          Sign out
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Wishlist", to: "/wishlist" },
          { label: "Track an order", to: "/order-status" },
          { label: "Find a store", to: "/stores" },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="rounded-md border border-border bg-surface px-4 py-4 text-sm font-semibold no-underline shadow-soft hover:border-navy/40"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <section className="mt-12">
        <div className="mb-4 flex items-center gap-2">
          <Package className="h-4 w-4 text-primary" />
          <h2 className="font-display text-2xl font-bold">Order history</h2>
        </div>
        {orders.length === 0 ? (
          <p className="rounded-md border border-dashed border-border bg-surface-muted/40 px-4 py-8 text-sm text-muted-foreground">
            No orders yet.{" "}
            <Link to="/catalog" className="font-semibold text-navy underline">
              Start shopping
            </Link>
          </p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order.id}
                className="rounded-md border border-border bg-surface p-4 shadow-soft"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.placedAt).toLocaleDateString()} ·{" "}
                      {order.lines.length} item
                      {order.lines.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  <p className="font-bold text-primary">{formatCurrency(order.total)}</p>
                </div>
                <div className="mt-3 flex gap-2 overflow-x-auto">
                  {order.lines.map((line) => (
                    <img
                      key={`${order.id}-${line.productId}-${line.size}`}
                      src={line.image}
                      alt=""
                      className="h-16 w-14 rounded-sm bg-[#f5f5f5] object-contain p-1"
                    />
                  ))}
                </div>
                <Link
                  to={`/order-status?id=${order.id}`}
                  className="mt-3 inline-block text-sm font-semibold text-navy underline"
                >
                  View status
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-primary" />
          <h2 className="font-display text-2xl font-bold">Support tickets</h2>
        </div>
        {chatTickets.length === 0 ? (
          <p className="rounded-md border border-dashed border-border bg-surface-muted/40 px-4 py-8 text-sm text-muted-foreground">
            No handoff tickets yet. In chat, ask to “Talk to a person” to open one.
          </p>
        ) : (
          <ul className="space-y-3">
            {chatTickets.map((ticket) => (
              <li
                key={ticket.id}
                className="rounded-md border border-border bg-surface px-4 py-3 text-sm shadow-soft"
              >
                <p className="font-semibold">{ticket.id}</p>
                <p className="mt-1 text-muted-foreground">{ticket.topic}</p>
                <p className="mt-1 text-2xs text-muted-foreground">
                  Opened {new Date(ticket.createdAt).toLocaleString()} · Queued for follow-up
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
