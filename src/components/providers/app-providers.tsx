"use client";

import type { ReactNode } from "react";

import { AuthProvider } from "@/lib/store/auth";
import { CartProvider } from "@/lib/store/cart";
import { CouponWalletProvider } from "@/lib/store/coupon-wallet";
import { OrdersProvider } from "@/lib/store/orders";
import { PharmacyProvider } from "@/lib/store/pharmacy";
import { RecentlyViewedProvider } from "@/lib/store/recently-viewed";
import { StoreSelectionProvider } from "@/lib/store/store-selection";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <StoreSelectionProvider>
        <CartProvider>
          <OrdersProvider>
            <CouponWalletProvider>
              <RecentlyViewedProvider>
                <PharmacyProvider>{children}</PharmacyProvider>
              </RecentlyViewedProvider>
            </CouponWalletProvider>
          </OrdersProvider>
        </CartProvider>
      </StoreSelectionProvider>
    </AuthProvider>
  );
}
