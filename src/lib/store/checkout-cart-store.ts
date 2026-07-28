"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CouponBinDetails, SupplyDays } from "@/lib/types";

/** A cash-pay deal staged for in-app digital checkout (not insurance). */
export interface CheckoutCartItem {
  id: string;
  drugId: string;
  genericName: string;
  brandName: string;
  strengthId: string;
  strengthLabel: string;
  quantity: number;
  supplyDays: SupplyDays;
  pharmacyId: string;
  pharmacyName: string;
  pharmacyAddress: string;
  couponPrice: number;
  retailPrice: number;
  /** Optional pre-issued coupon fields when added from the coupon modal. */
  coupon?: Partial<CouponBinDetails>;
  addedAt: string;
}

interface CheckoutCartState {
  items: CheckoutCartItem[];
  addItem: (item: Omit<CheckoutCartItem, "id" | "addedAt">) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

function cartKey(item: Omit<CheckoutCartItem, "id" | "addedAt">) {
  return [
    item.drugId,
    item.strengthId,
    item.quantity,
    item.supplyDays,
    item.pharmacyId,
  ].join(":");
}

export const useCheckoutCartStore = create<CheckoutCartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const key = cartKey(item);
        const existing = get().items.find(
          (row) =>
            cartKey({
              drugId: row.drugId,
              genericName: row.genericName,
              brandName: row.brandName,
              strengthId: row.strengthId,
              strengthLabel: row.strengthLabel,
              quantity: row.quantity,
              supplyDays: row.supplyDays,
              pharmacyId: row.pharmacyId,
              pharmacyName: row.pharmacyName,
              pharmacyAddress: row.pharmacyAddress,
              couponPrice: row.couponPrice,
              retailPrice: row.retailPrice,
            }) === key
        );
        if (existing) {
          set({
            items: get().items.map((row) =>
              row.id === existing.id
                ? {
                    ...row,
                    couponPrice: item.couponPrice,
                    retailPrice: item.retailPrice,
                    coupon: item.coupon ?? row.coupon,
                    addedAt: new Date().toISOString(),
                  }
                : row
            ),
          });
          return;
        }
        set({
          items: [
            ...get().items,
            {
              ...item,
              id: `${key}:${Date.now()}`,
              addedAt: new Date().toISOString(),
            },
          ],
        });
      },
      removeItem: (id) =>
        set({ items: get().items.filter((row) => row.id !== id) }),
      clear: () => set({ items: [] }),
    }),
    { name: "trumprx-checkout-cart" }
  )
);
