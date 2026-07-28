"use client";

import { useEffect } from "react";
import { useCheckoutCartStore } from "@/lib/store/checkout-cart-store";

/** Hydrate server-backed checkout cart once per app session. */
export function CartHydrator() {
  const hydrate = useCheckoutCartStore((s) => s.hydrate);
  const hydrated = useCheckoutCartStore((s) => s.hydrated);

  useEffect(() => {
    if (!hydrated) void hydrate();
  }, [hydrate, hydrated]);

  return null;
}
