import type {
  FulfillmentMethod,
  OrderStatus,
  OrderStatusUpdate,
  PlacedOrder,
} from "@/lib/types";

export const PICKUP_STATUS_ORDER: OrderStatus[] = [
  "placed",
  "preparing",
  "ready",
  "picked_up",
];

export const DELIVERY_STATUS_ORDER: OrderStatus[] = [
  "placed",
  "packed",
  "out_for_delivery",
  "delivered",
];

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  placed: "Order placed",
  preparing: "Preparing",
  ready: "Ready for pickup",
  picked_up: "Picked up",
  packed: "Packed",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
};

const STATUS_NOTES: Record<OrderStatus, string> = {
  placed: "We received your order.",
  preparing: "Your store is pulling items from the aisle.",
  ready: "Ready at the pickup counter — show this confirmation.",
  picked_up: "Thanks for shopping with us.",
  packed: "Your order is packed and heading out soon.",
  out_for_delivery: "A courier is on the way.",
  delivered: "Your order was delivered.",
};

export function statusStepsFor(
  fulfillment: FulfillmentMethod,
): OrderStatus[] {
  return fulfillment === "pickup"
    ? PICKUP_STATUS_ORDER
    : DELIVERY_STATUS_ORDER;
}

export function orderStatusLabel(status: OrderStatus): string {
  return ORDER_STATUS_LABEL[status];
}

export function orderStatusNote(status: OrderStatus): string {
  return STATUS_NOTES[status];
}

export function getOrderProgress(
  fulfillment: FulfillmentMethod,
  status: OrderStatus,
): number {
  const steps = statusStepsFor(fulfillment);
  const index = Math.max(0, steps.indexOf(status));
  return Math.round(((index + 1) / steps.length) * 100);
}

export function isTerminalOrderStatus(status: OrderStatus): boolean {
  return status === "picked_up" || status === "delivered";
}

export function nextAutoStatus(
  fulfillment: FulfillmentMethod,
  status: OrderStatus,
): OrderStatus | null {
  const steps = statusStepsFor(fulfillment);
  const index = steps.indexOf(status);
  if (index < 0 || index >= steps.length - 2) {
    // Stop before terminal — pickup waits for manual confirm; delivery auto-finishes
    if (fulfillment !== "pickup" && status === "out_for_delivery") {
      return "delivered";
    }
    return null;
  }
  return steps[index + 1] ?? null;
}

export function createInitialUpdates(
  fulfillment: FulfillmentMethod,
  at: string,
): OrderStatusUpdate[] {
  return [
    {
      status: "placed",
      at,
      note:
        fulfillment === "pickup"
          ? "Pickup order received at your store."
          : "Delivery order received.",
    },
  ];
}

export function normalizePlacedOrder(
  order: PlacedOrder | (Omit<PlacedOrder, "status" | "statusUpdatedAt" | "updates"> & {
    status?: OrderStatus;
    statusUpdatedAt?: string;
    updates?: OrderStatusUpdate[];
  }),
): PlacedOrder {
  if (order.status && order.statusUpdatedAt && order.updates?.length) {
    return order as PlacedOrder;
  }

  const isPickup = order.fulfillment === "pickup";
  const status: OrderStatus =
    order.status ?? (isPickup ? "ready" : "delivered");
  const at = order.statusUpdatedAt ?? order.placedAt;

  return {
    ...(order as PlacedOrder),
    status,
    statusUpdatedAt: at,
    updates: order.updates?.length
      ? order.updates
      : [
          {
            status,
            at,
            note: orderStatusNote(status),
          },
        ],
  };
}

export function withStatus(
  order: PlacedOrder,
  status: OrderStatus,
  note?: string,
): PlacedOrder {
  const at = new Date().toISOString();
  return {
    ...order,
    status,
    statusUpdatedAt: at,
    updates: [
      ...order.updates,
      {
        status,
        at,
        note: note ?? orderStatusNote(status),
      },
    ],
  };
}
