"use client";

import { create } from "zustand";
import type { CouponBinDetails, SupplyDays } from "@/lib/types";

/** Cart line mirrored from server-backed /api/cart. */
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
  coupon?: Partial<CouponBinDetails>;
  addedAt: string;
}

type CartPayload = { items: CheckoutCartItem[]; error?: string };

interface CheckoutCartState {
  items: CheckoutCartItem[];
  hydrated: boolean;
  syncing: boolean;
  hydrate: () => Promise<void>;
  addItem: (
    item: Omit<CheckoutCartItem, "id" | "addedAt">
  ) => Promise<{ ok: boolean; error?: string }>;
  removeItem: (id: string) => Promise<{ ok: boolean; error?: string }>;
  clear: () => Promise<{ ok: boolean; error?: string }>;
}

export const useCheckoutCartStore = create<CheckoutCartState>((set, get) => ({
  items: [],
  hydrated: false,
  syncing: false,

  hydrate: async () => {
    if (get().syncing) return;
    set({ syncing: true });
    try {
      const res = await fetch("/api/cart");
      const data = (await res.json()) as CartPayload;
      if (!res.ok) throw new Error(data.error ?? "Could not load cart");
      set({ items: data.items ?? [], hydrated: true });
    } catch {
      set({ hydrated: true });
    } finally {
      set({ syncing: false });
    }
  },

  addItem: async (item) => {
    set({ syncing: true });
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const data = (await res.json()) as CartPayload;
      if (!res.ok) {
        return { ok: false, error: data.error ?? "Could not add to cart" };
      }
      set({ items: data.items ?? [], hydrated: true });
      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : "Could not add to cart",
      };
    } finally {
      set({ syncing: false });
    }
  },

  removeItem: async (id) => {
    set({ syncing: true });
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: id }),
      });
      const data = (await res.json()) as CartPayload;
      if (!res.ok) {
        return { ok: false, error: data.error ?? "Could not remove item" };
      }
      set({ items: data.items ?? [] });
      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : "Could not remove item",
      };
    } finally {
      set({ syncing: false });
    }
  },

  clear: async () => {
    set({ syncing: true });
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clear: true }),
      });
      const data = (await res.json()) as CartPayload;
      if (!res.ok) {
        return { ok: false, error: data.error ?? "Could not clear cart" };
      }
      set({ items: [] });
      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : "Could not clear cart",
      };
    } finally {
      set({ syncing: false });
    }
  },
}));
