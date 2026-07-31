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
import { getProduct, type ProductSize, type StoreProduct } from "@/lib/store";

const STORAGE_KEY = "varga-store-cart-v1";

export type CartLine = {
  productSlug: string;
  size?: ProductSize;
  qty: number;
};

type StoreContextValue = {
  lines: CartLine[];
  ready: boolean;
  itemCount: number;
  subtotalCents: number;
  addItem: (slug: string, qty?: number, size?: ProductSize) => void;
  setQty: (slug: string, qty: number, size?: ProductSize) => void;
  removeItem: (slug: string, size?: ProductSize) => void;
  clearCart: () => void;
  lineProduct: (line: CartLine) => StoreProduct | undefined;
  lineKey: (line: CartLine) => string;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function lineKey(line: CartLine): string {
  return line.size ? `${line.productSlug}::${line.size}` : line.productSlug;
}

function sameLine(a: CartLine, b: CartLine) {
  return a.productSlug === b.productSlug && (a.size || "") === (b.size || "");
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setLines(parsed.filter((l) => l.qty > 0));
      }
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const addItem = useCallback((slug: string, qty = 1, size?: ProductSize) => {
    const product = getProduct(slug);
    if (!product) return;
    if (product.sizes?.length && !size) return;

    setLines((prev) => {
      const incoming: CartLine = { productSlug: slug, qty, size };
      const idx = prev.findIndex((l) => sameLine(l, incoming));
      if (idx === -1) return [...prev, incoming];
      const next = [...prev];
      next[idx] = { ...next[idx], qty: next[idx].qty + qty };
      return next;
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number, size?: ProductSize) => {
    setLines((prev) => {
      const target: CartLine = { productSlug: slug, qty, size };
      if (qty <= 0) return prev.filter((l) => !sameLine(l, target));
      const idx = prev.findIndex((l) => sameLine(l, target));
      if (idx === -1) return [...prev, target];
      const next = [...prev];
      next[idx] = { ...next[idx], qty };
      return next;
    });
  }, []);

  const removeItem = useCallback((slug: string, size?: ProductSize) => {
    setLines((prev) =>
      prev.filter((l) => !sameLine(l, { productSlug: slug, qty: 0, size }))
    );
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty, 0),
    [lines]
  );

  const subtotalCents = useMemo(
    () =>
      lines.reduce((sum, l) => {
        const p = getProduct(l.productSlug);
        return sum + (p ? p.priceCents * l.qty : 0);
      }, 0),
    [lines]
  );

  const value: StoreContextValue = {
    lines,
    ready,
    itemCount,
    subtotalCents,
    addItem,
    setQty,
    removeItem,
    clearCart,
    lineProduct: (line) => getProduct(line.productSlug),
    lineKey,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
