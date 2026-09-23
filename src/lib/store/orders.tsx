"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  createInitialUpdates,
  nextAutoStatus,
  normalizePlacedOrder,
  withStatus,
} from "@/lib/order-lifecycle";
import type { OrderStatus, PlacedOrder } from "@/lib/types";

const STORAGE_KEY = "walgreens-orders-v1";

interface OrdersContextValue {
  orders: PlacedOrder[];
  addOrder: (order: PlacedOrder) => void;
  getOrder: (id: string) => PlacedOrder | undefined;
  advanceOrder: (id: string, status: OrderStatus, note?: string) => void;
  markPickedUp: (id: string) => void;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

function readStoredOrders(): PlacedOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) =>
      normalizePlacedOrder(item as Parameters<typeof normalizePlacedOrder>[0]),
    );
  } catch {
    return [];
  }
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<PlacedOrder[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setOrders(readStoredOrders());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [hydrated, orders]);

  const advanceOrder = useCallback(
    (id: string, status: OrderStatus, note?: string) => {
      setOrders((current) =>
        current.map((order) =>
          order.id === id && order.status !== status
            ? withStatus(order, status, note)
            : order,
        ),
      );
    },
    [],
  );

  const markPickedUp = useCallback(
    (id: string) => {
      advanceOrder(id, "picked_up", "You confirmed pickup at the store.");
    },
    [advanceOrder],
  );

  // Demo lifecycle ticks — advance active orders on a short timer.
  useEffect(() => {
    if (!hydrated) return;

    const timer = window.setInterval(() => {
      setOrders((current) => {
        let changed = false;
        const next = current.map((order) => {
          const auto = nextAutoStatus(order.fulfillment, order.status);
          if (!auto) return order;
          const elapsed =
            Date.now() - new Date(order.statusUpdatedAt).getTime();
          const waitMs =
            order.status === "placed"
              ? 1800
              : order.status === "preparing" || order.status === "packed"
                ? 2200
                : 2800;
          if (elapsed < waitMs) return order;
          changed = true;
          return withStatus(order, auto);
        });
        return changed ? next : current;
      });
    }, 700);

    return () => window.clearInterval(timer);
  }, [hydrated]);

  const addOrder = useCallback((order: PlacedOrder) => {
    const stamped: PlacedOrder = {
      ...order,
      status: order.status ?? "placed",
      statusUpdatedAt: order.statusUpdatedAt ?? order.placedAt,
      updates:
        order.updates?.length > 0
          ? order.updates
          : createInitialUpdates(order.fulfillment, order.placedAt),
    };
    setOrders((current) => [stamped, ...current].slice(0, 25));
  }, []);

  const getOrder = useCallback(
    (id: string) => orders.find((order) => order.id === id),
    [orders],
  );

  const value = useMemo(
    () => ({ orders, addOrder, getOrder, advanceOrder, markPickedUp }),
    [addOrder, advanceOrder, getOrder, markPickedUp, orders],
  );

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}

export function useOrders(): OrdersContextValue {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within OrdersProvider");
  }
  return context;
}
