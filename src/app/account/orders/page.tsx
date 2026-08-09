"use client";

import Link from "next/link";

import { formatCurrency } from "@/lib/pharmacy";
import { useOrders } from "@/lib/store/orders";
import { Button } from "@/components/ui/button";

export default function OrdersPage() {
  const { orders } = useOrders();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Order history
          </h1>
          <p className="mt-2 text-muted-foreground">
            Orders placed in this browser are saved locally for the demo.
          </p>
        </div>
        <Button variant="outline" nativeButton={false} render={<Link href="/account" />}>
          Back to account
        </Button>
      </div>

      {orders.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-border p-8 text-sm text-muted-foreground">
          No orders yet.{" "}
          <Link href="/shop" className="text-brand underline-offset-2 hover:underline">
            Browse the shop
          </Link>
        </p>
      ) : (
        <ul className="mt-10 space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="rounded-2xl border border-border/80 bg-surface-elevated/90 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-semibold">
                    Order #{order.id}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {new Date(order.placedAt).toLocaleString()} ·{" "}
                    {order.fulfillment.replaceAll("_", " ")}
                  </p>
                </div>
                <p className="text-lg font-semibold">
                  {formatCurrency(order.total)}
                </p>
              </div>
              <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                {order.items.map((item) => (
                  <li key={`${order.id}-${item.productId}`}>
                    {item.quantity}× {item.brand} {item.name}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-muted-foreground">
                {order.receiptNote}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
