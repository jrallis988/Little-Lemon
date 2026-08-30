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

const STORAGE_KEY = "walgreens-recently-viewed-v1";
const MAX_ITEMS = 8;

interface RecentlyViewedContextValue {
  productIds: string[];
  products: Product[];
  trackView: (productId: string) => void;
}

const RecentlyViewedContext =
  createContext<RecentlyViewedContextValue | null>(null);

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

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
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

  const trackView = useCallback((productId: string) => {
    setProductIds((current) => {
      const next = [productId, ...current.filter((id) => id !== productId)];
      return next.slice(0, MAX_ITEMS);
    });
  }, []);

  const products = useMemo(
    () =>
      productIds
        .map((id) => PRODUCTS.find((product) => product.id === id))
        .filter((product): product is Product => Boolean(product)),
    [productIds],
  );

  const value = useMemo(
    () => ({ productIds, products, trackView }),
    [productIds, products, trackView],
  );

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed(): RecentlyViewedContextValue {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error(
      "useRecentlyViewed must be used within RecentlyViewedProvider",
    );
  }
  return context;
}
