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

import type { PlacedOrder } from "@/lib/types";

const STORAGE_KEY = "walgreens-orders-v1";

interface OrdersContextValue {
  orders: PlacedOrder[];
  addOrder: (order: PlacedOrder) => void;
  getOrder: (id: string) => PlacedOrder | undefined;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

function readStoredOrders(): PlacedOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PlacedOrder[];
    return Array.isArray(parsed) ? parsed : [];
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

  const addOrder = useCallback((order: PlacedOrder) => {
    setOrders((current) => [order, ...current].slice(0, 25));
  }, []);

  const getOrder = useCallback(
    (id: string) => orders.find((order) => order.id === id),
    [orders],
  );

  const value = useMemo(
    () => ({ orders, addOrder, getOrder }),
    [addOrder, getOrder, orders],
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
