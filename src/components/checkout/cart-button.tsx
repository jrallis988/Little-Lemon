"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCheckoutCartStore } from "@/lib/store/checkout-cart-store";
import { cn } from "@/lib/utils";

export function CheckoutCartButton({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const count = useCheckoutCartStore((s) => s.items.length);

  return (
    <Link
      href="/checkout"
      onClick={onNavigate}
      className={cn(
        "relative inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm font-medium hover:bg-muted",
        className
      )}
      aria-label={
        count > 0 ? `Checkout cart, ${count} items` : "Checkout cart"
      }
    >
      <ShoppingBag className="size-4" aria-hidden />
      <span className="hidden sm:inline">Checkout</span>
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-primary-foreground">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
