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

import { PRODUCTS } from "@/lib/data/catalog";
import type { Product } from "@/lib/types";

const STORAGE_KEY = "walgreens-wishlist-v1";

interface WishlistContextValue {
  productIds: string[];
  products: Product[];
  toggle: (productId: string) => void;
  isSaved: (productId: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

function readIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [productIds, setProductIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProductIds(readIds());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(productIds));
  }, [hydrated, productIds]);

  const toggle = useCallback((productId: string) => {
    setProductIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }, []);

  const isSaved = useCallback(
    (productId: string) => productIds.includes(productId),
    [productIds],
  );

  const products = useMemo(
    () =>
      productIds
        .map((id) => PRODUCTS.find((product) => product.id === id))
        .filter((product): product is Product => Boolean(product)),
    [productIds],
  );

  const value = useMemo(
    () => ({
      productIds,
      products,
      toggle,
      isSaved,
      count: productIds.length,
    }),
    [isSaved, productIds, products, toggle],
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
