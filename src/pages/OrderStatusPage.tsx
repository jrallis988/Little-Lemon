import { useEffect, useMemo, useState, type FormEvent } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useAccountStore } from "@/stores/accountStore"
import { useCheckoutStore } from "@/stores/checkoutStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import { formatCurrency } from "@/lib/utils"
import { fetchOrderTracking, type OrderTracking } from "@/lib/api"

export function OrderStatusPage() {
  useDocumentMeta({
    title: "Order Status | Marshalls",
    description: "Look up a Marshalls order by confirmation number.",
  })

  const [params] = useSearchParams()
  const orders = useAccountStore((s) => s.orders)
  const completedOrder = useCheckoutStore((s) => s.completedOrder)
  const [lookup, setLookup] = useState(params.get("id") ?? "")
  const [query, setQuery] = useState(params.get("id") ?? "")
  const [tracking, setTracking] = useState<OrderTracking | null>(null)
  const [loading, setLoading] = useState(false)

  const allOrders = useMemo(() => {
    const map = new Map(orders.map((o) => [o.id, o]))
    if (completedOrder) map.set(completedOrder.id, completedOrder)
    return map
  }, [orders, completedOrder])

  const order = query ? allOrders.get(query.trim()) : undefined

  useEffect(() => {
    if (!query.trim()) {
      setTracking(null)
      return
    }
    let cancelled = false
    setLoading(true)
    void fetchOrderTracking(query.trim()).then((result) => {
      if (!cancelled) {
        setTracking(result)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [query])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setQuery(lookup.trim())
  }

  return (
    <div className="shelf-container py-8 md:py-12">
      <h1 className="font-display text-3xl font-bold text-navy">Order status</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Enter your confirmation number (example: MSH-12345678) to see live shipping progress.
      </p>

      <form className="mt-6 flex max-w-lg gap-2" onSubmit={onSubmit}>
        <Input
          value={lookup}
          onChange={(e) => setLookup(e.target.value)}
          placeholder="Order number"
          className="h-11"
          aria-label="Order number"
        />
        <Button type="submit" className="bg-navy hover:bg-navy/90">
          Look up
        </Button>
      </form>

      {query && loading && (
        <p className="mt-6 text-sm text-muted-foreground" role="status">
          Checking carrier updates…
        </p>
      )}

      {query && !loading && !order && !tracking && (
        <p className="mt-6 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          We couldn’t find that order. Complete checkout first, or check your account order
          history.
        </p>
      )}

      {(order || tracking) && !loading && (
        <div className="mt-8 max-w-2xl rounded-lg border border-border bg-surface p-5 shadow-soft">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-2xs font-bold uppercase tracking-[0.1em] text-primary">
                {tracking?.status?.replace(/_/g, " ") ?? "In transit"}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold">
                {order?.id ?? tracking?.orderId}
              </h2>
              <p className="text-sm text-muted-foreground">
                {order
                  ? `Placed ${new Date(order.placedAt).toLocaleString()}`
                  : "Tracking via fulfillment API"}
              </p>
              {tracking?.eta && (
                <p className="mt-1 text-sm font-medium text-navy">{tracking.eta}</p>
              )}
            </div>
            {order && (
              <p className="text-lg font-bold">{formatCurrency(order.total)}</p>
            )}
          </div>

          <ol className="mt-6 space-y-3 text-sm">
            {(
              tracking?.steps ?? [
                { label: "Order placed", done: true },
                { label: "Payment confirmed", done: true },
                { label: "Packed at distribution center", done: true },
                { label: "Out for delivery (estimated)", done: false },
              ]
            ).map((step, index) => (
              <li key={step.label} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-2xs font-bold ${
                    step.done
                      ? "bg-navy text-navy-foreground"
                      : "bg-surface-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </span>
                <span>
                  <span className={step.done ? "font-medium" : "text-muted-foreground"}>
                    {step.label}
                  </span>
                  {"at" in step && step.at && (
                    <span className="mt-0.5 block text-2xs text-muted-foreground">
                      {step.at}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ol>

          {order && (
            <ul className="mt-6 space-y-3 border-t border-border pt-4">
              {order.lines.map((line) => (
                <li key={`${line.productId}-${line.size}`} className="flex gap-3">
                  <img
                    src={line.image}
                    alt=""
                    className="h-16 w-14 rounded-sm bg-[#f5f5f5] object-contain p-1"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{line.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {line.brand} · {line.color} · Size {line.size}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <Link
            to="/account"
            className="mt-6 inline-block text-sm font-semibold text-navy underline"
          >
            View account orders
          </Link>
        </div>
      )}
    </div>
  )
}
