"use client";

import type { ReactNode } from "react";

import { AuthProvider } from "@/lib/store/auth";
import { CartProvider } from "@/lib/store/cart";
import { OrdersProvider } from "@/lib/store/orders";
import { PharmacyProvider } from "@/lib/store/pharmacy";
import { StoreSelectionProvider } from "@/lib/store/store-selection";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <StoreSelectionProvider>
        <CartProvider>
          <OrdersProvider>
            <PharmacyProvider>{children}</PharmacyProvider>
          </OrdersProvider>
        </CartProvider>
      </StoreSelectionProvider>
    </AuthProvider>
  );
}
