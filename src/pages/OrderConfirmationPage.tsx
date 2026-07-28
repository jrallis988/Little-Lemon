import { CheckCircle2 } from "lucide-react"
import { Link, Navigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { useCheckoutStore } from "@/stores/checkoutStore"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"

export function OrderConfirmationPage() {
  useDocumentMeta({
    title: "Order Confirmed | Marshalls",
    description: "Your demo Marshalls order has been confirmed.",
  })

  const order = useCheckoutStore((state) => state.completedOrder)

  if (!order) {
    return <Navigate to="/catalog" replace />
  }

  return (
    <div className="shelf-container py-12 md:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-[hsl(var(--inventory-in))]" />
          <p className="mt-5 text-2xs font-bold uppercase tracking-[0.12em] text-primary">
            Order confirmed
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
            Thanks for your order
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            This demo confirmation has been prepared for {order.shipping.email}.
          </p>
          <p className="mt-2 text-sm font-semibold">
            Order <span className="tabular">{order.id}</span>
          </p>
        </div>

        <section className="mt-8 rounded-lg border border-border bg-surface p-5 shadow-soft md:p-7">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-bold">Order summary</h2>
            <span className="text-xs text-muted-foreground">
              {new Date(order.placedAt).toLocaleDateString()}
            </span>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {order.lines.map((line) => (
              <li
                key={`${line.productId}-${line.size}-${line.color}`}
                className="flex gap-3 py-4"
              >
                <img
                  src={line.image}
                  alt=""
                  className="h-20 w-16 rounded-md object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-2xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {line.brand}
                  </p>
                  <p className="text-sm font-semibold">{line.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {line.color} · Size {line.size} · Qty {line.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold tabular">
                  {formatCurrency(line.price * line.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <dl className="mt-3 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatCurrency(order.subtotal)}</dd>
            </div>
            {order.promoDiscount > 0 && (
              <div className="flex justify-between text-primary">
                <dt>Promo ({order.promoCode})</dt>
                <dd>−{formatCurrency(order.promoDiscount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>
                {order.shippingCost === 0
                  ? "Free"
                  : formatCurrency(order.shippingCost)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tax</dt>
              <dd>{formatCurrency(order.tax)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
              <dt>Total</dt>
              <dd>{formatCurrency(order.total)}</dd>
            </div>
          </dl>
        </section>

        <div className="mt-8 text-center">
          <Button asChild size="lg">
            <Link to="/catalog">Continue shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
