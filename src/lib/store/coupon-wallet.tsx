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

const STORAGE_KEY = "walgreens-clipped-coupons-v1";

interface CouponWalletContextValue {
  clipped: string[];
  clip: (code: string) => void;
  unclip: (code: string) => void;
  isClipped: (code: string) => boolean;
}

const CouponWalletContext = createContext<CouponWalletContextValue | null>(null);

function readClipped(): string[] {
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

export function CouponWalletProvider({ children }: { children: ReactNode }) {
  const [clipped, setClipped] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setClipped(readClipped());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clipped));
  }, [clipped, hydrated]);

  const clip = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    setClipped((current) =>
      current.includes(normalized) ? current : [...current, normalized],
    );
  }, []);

  const unclip = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    setClipped((current) => current.filter((item) => item !== normalized));
  }, []);

  const isClipped = useCallback(
    (code: string) => clipped.includes(code.trim().toUpperCase()),
    [clipped],
  );

  const value = useMemo(
    () => ({ clipped, clip, unclip, isClipped }),
    [clip, clipped, isClipped, unclip],
  );

  return (
    <CouponWalletContext.Provider value={value}>
      {children}
    </CouponWalletContext.Provider>
  );
}

export function useCouponWallet(): CouponWalletContextValue {
  const context = useContext(CouponWalletContext);
  if (!context) {
    throw new Error("useCouponWallet must be used within CouponWalletProvider");
  }
  return context;
}
