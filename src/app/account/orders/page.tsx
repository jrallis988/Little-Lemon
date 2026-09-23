"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { orderStatusLabel } from "@/lib/order-lifecycle";
import { formatCurrency } from "@/lib/pharmacy";
import { useCart } from "@/lib/store/cart";
import { useOrders } from "@/lib/store/orders";
import { cn } from "@/lib/utils";
import { OrderTracker } from "@/components/orders/order-tracker";
import { Button } from "@/components/ui/button";

export default function OrdersPage() {
  const router = useRouter();
  const { orders, markPickedUp } = useOrders();
  const { addOrderItems } = useCart();
  const [reorderNote, setReorderNote] = useState<string | null>(null);

  function handleReorder(orderId: string) {
    const order = orders.find((item) => item.id === orderId);
    if (!order) return;
    const count = addOrderItems(order.items);
    setReorderNote(
      `Added ${count} item${count === 1 ? "" : "s"} from #${order.id} to your cart.`,
    );
    window.setTimeout(() => router.push("/checkout"), 600);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Order history
          </h1>
          <p className="mt-2 text-muted-foreground">
            Track pickup readiness, confirm handoff, and reorder past baskets.
          </p>
        </div>
        <Button variant="outline" nativeButton={false} render={<Link href="/account" />}>
          Back to account
        </Button>
      </div>

      {reorderNote ? (
        <p
          className="mt-6 rounded-xl border border-health/25 bg-health/5 px-4 py-3 text-sm text-health"
          role="status"
        >
          {reorderNote}
        </p>
      ) : null}

      {orders.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-border p-8 text-sm text-muted-foreground">
          No orders yet.{" "}
          <Link href="/shop" className="text-brand underline-offset-2 hover:underline">
            Browse the shop
          </Link>
        </p>
      ) : (
        <ul className="mt-10 space-y-6">
          {orders.map((order) => (
            <li
              key={order.id}
              className="space-y-4 rounded-2xl border border-border/80 bg-surface-elevated/90 p-5"
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
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    {formatCurrency(order.total)}
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-xs font-semibold",
                      order.status === "ready" || order.status === "delivered"
                        ? "text-health"
                        : order.status === "picked_up"
                          ? "text-muted-foreground"
                          : "text-brand",
                    )}
                  >
                    {orderStatusLabel(order.status)}
                  </p>
                </div>
              </div>

              <OrderTracker order={order} />

              <ul className="space-y-1 text-sm text-muted-foreground">
                {order.items.map((item) => (
                  <li key={`${order.id}-${item.productId}`}>
                    {item.quantity}× {item.brand} {item.name}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {order.fulfillment === "pickup" && order.status === "ready" ? (
                  <Button
                    className="bg-health text-health-foreground hover:bg-health/90"
                    size="sm"
                    onClick={() => markPickedUp(order.id)}
                  >
                    Mark picked up
                  </Button>
                ) : null}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleReorder(order.id)}
                >
                  Reorder
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">{order.receiptNote}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
