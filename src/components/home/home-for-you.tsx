"use client";

import Link from "next/link";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";

import { PERSONALIZED_OFFERS } from "@/lib/data/coupons";
import { PRODUCTS } from "@/lib/data/catalog";
import { useOrders } from "@/lib/store/orders";
import { useRecentlyViewed } from "@/lib/store/recently-viewed";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/product-discovery";

export function HomeForYou() {
  const { products: recentlyViewed } = useRecentlyViewed();
  const { orders } = useOrders();

  const buyAgainIds = Array.from(
    new Set(
      orders.flatMap((order) => order.items.map((item) => item.productId)),
    ),
  ).slice(0, 4);

  const buyAgain = buyAgainIds
    .map((id) => PRODUCTS.find((product) => product.id === id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <section
      aria-labelledby="for-you-heading"
      className="border-y border-border/60 bg-surface"
    >
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-14 sm:px-6">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-brand">
            <Sparkles className="size-4" aria-hidden />
            For you
          </p>
          <h2
            id="for-you-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight"
          >
            Offers & picks that feel personal
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Inspired by live Walgreens “Offers just for you,” buy again, and
            recently viewed — stored in this browser for the demo.
          </p>
        </div>

        <ul className="grid gap-4 md:grid-cols-3">
          {PERSONALIZED_OFFERS.map((offer) => (
            <li
              key={offer.id}
              className="rounded-2xl border border-border/80 bg-surface-elevated/90 p-5"
            >
              {offer.exclusive ? (
                <p className="text-xs font-semibold tracking-wide text-brand uppercase">
                  myW exclusive
                </p>
              ) : null}
              <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">
                {offer.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{offer.detail}</p>
              <Link
                href={offer.href}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
              >
                View offer
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>

        {buyAgain.length > 0 ? (
          <div>
            <div className="flex items-end justify-between gap-3">
              <div>
                <h3 className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight">
                  <RotateCcw className="size-5 text-brand" aria-hidden />
                  Buy again
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  From your recent orders in this browser.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link href="/account/orders" />}
              >
                Order history
              </Button>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {buyAgain.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : null}

        {recentlyViewed.length > 0 ? (
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              Recently viewed
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick up where you left off.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recentlyViewed.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
