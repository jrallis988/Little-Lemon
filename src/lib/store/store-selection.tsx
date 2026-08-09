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

import { ACTIVE_STORE } from "@/lib/data/catalog";
import { NEARBY_STORES } from "@/lib/data/stores";
import type { StoreLocation } from "@/lib/types";

const STORAGE_KEY = "walgreens-store-v1";

interface StoreSelectionContextValue {
  store: StoreLocation;
  setStoreById: (storeId: string) => void;
  stores: StoreLocation[];
}

const StoreSelectionContext = createContext<StoreSelectionContextValue | null>(
  null,
);

function readStoredStoreId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function StoreSelectionProvider({ children }: { children: ReactNode }) {
  const [storeId, setStoreId] = useState(ACTIVE_STORE.id);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = readStoredStoreId();
    if (saved && NEARBY_STORES.some((store) => store.id === saved)) {
      setStoreId(saved);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, storeId);
  }, [hydrated, storeId]);

  const setStoreById = useCallback((id: string) => {
    if (NEARBY_STORES.some((store) => store.id === id)) {
      setStoreId(id);
    }
  }, []);

  const store = useMemo(
    () => NEARBY_STORES.find((item) => item.id === storeId) ?? ACTIVE_STORE,
    [storeId],
  );

  const value = useMemo(
    () => ({ store, setStoreById, stores: NEARBY_STORES }),
    [setStoreById, store],
  );

  return (
    <StoreSelectionContext.Provider value={value}>
      {children}
    </StoreSelectionContext.Provider>
  );
}

export function useSelectedStore(): StoreSelectionContextValue {
  const context = useContext(StoreSelectionContext);
  if (!context) {
    throw new Error("useSelectedStore must be used within StoreSelectionProvider");
  }
  return context;
}
