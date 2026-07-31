"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useStore } from "@/components/store/StoreProvider";

export function CartNavLink({ tone = "onDark" }: { tone?: "onDark" | "onLight" }) {
  const { itemCount, ready } = useStore();
  const count = ready ? itemCount : 0;

  return (
    <Link
      href="/shop/cart"
      className={
        tone === "onDark"
          ? "relative inline-flex items-center gap-2 rounded-cta border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
          : "relative inline-flex items-center gap-2 rounded-cta border border-slate-line bg-white/80 px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:border-navy"
      }
      aria-label={count ? `Cart, ${count} items` : "Cart"}
    >
      <ShoppingBag className="h-4 w-4" aria-hidden />
      <span className="hidden sm:inline">Cart</span>
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red px-1 text-[0.65rem] font-bold text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
