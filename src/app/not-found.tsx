import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-start justify-center gap-5 px-4 py-16 sm:px-6">
      <p className="text-sm font-medium text-brand">404</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="text-muted-foreground">
        That link may be outdated, or the product moved. Try the shop, pharmacy,
        or help center.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button
          className="bg-brand text-brand-foreground hover:bg-brand/90"
          nativeButton={false}
          render={<Link href="/" />}
        >
          Go home
        </Button>
        <Button variant="outline" nativeButton={false} render={<Link href="/shop" />}>
          Browse shop
        </Button>
        <Button variant="outline" nativeButton={false} render={<Link href="/help" />}>
          Help
        </Button>
      </div>
    </div>
  );
}
