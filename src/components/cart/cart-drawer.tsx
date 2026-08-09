"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag } from "lucide-react";

import { formatCurrency } from "@/lib/pharmacy";
import { useCart } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function CartDrawer() {
  const { items, itemCount, subtotal, setQuantity, removeItem } = useCart();

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative size-8 sm:size-9"
            aria-label={
              itemCount > 0
                ? `Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`
                : "Cart, empty"
            }
          />
        }
      >
        <ShoppingBag className="size-5" />
        {itemCount > 0 ? (
          <span
            className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-brand-foreground"
            aria-hidden
          >
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        ) : null}
      </SheetTrigger>
      <SheetContent side="right" className="flex w-[min(100%,24rem)] flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-left text-xl">
            Your cart
          </SheetTitle>
          <SheetDescription className="text-left">
            {itemCount === 0
              ? "Add items from the shop to get started."
              : `${itemCount} ${itemCount === 1 ? "item" : "items"} · ${formatCurrency(subtotal)}`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
            <ShoppingBag className="size-10 text-muted-foreground" aria-hidden />
            <p className="text-sm text-muted-foreground">
              Your cart is empty. Browse health and beauty essentials to fill it.
            </p>
            <Button
              className="bg-brand text-brand-foreground hover:bg-brand/90"
              nativeButton={false}
              render={<Link href="/shop" />}
            >
              Browse shop
            </Button>
          </div>
        ) : (
          <ul className="flex-1 space-y-4 overflow-auto px-4 py-2">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3">
                <div className="relative size-16 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={item.imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.brand}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon-xs"
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() => setQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="size-3" />
                    </Button>
                    <span className="min-w-6 text-center text-sm tabular-nums">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon-xs"
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() => setQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="size-3" />
                    </Button>
                    <button
                      type="button"
                      className="ml-auto text-xs text-muted-foreground underline-offset-2 hover:underline"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <p className="mt-1 text-sm font-semibold">
                    {formatCurrency(item.unitPrice * item.quantity)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 ? (
          <SheetFooter className="gap-2 border-t border-border pt-4">
            <Button
              className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
              nativeButton={false}
              render={<Link href="/checkout" />}
            >
              Checkout · {formatCurrency(subtotal)}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              nativeButton={false}
              render={<Link href="/shop" />}
            >
              Continue shopping
            </Button>
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
