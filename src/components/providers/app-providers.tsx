"use client";

import type { ReactNode } from "react";

import { CartProvider } from "@/lib/store/cart";
import { PharmacyProvider } from "@/lib/store/pharmacy";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <PharmacyProvider>{children}</PharmacyProvider>
    </CartProvider>
  );
}
