import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Clock3 } from "lucide-react";

import { NEARBY_STORES } from "@/lib/data/stores";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Find a store",
  description: "Hours, drive-thru, and pickup options near you.",
};

export default function StoresPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Find a store
        </h1>
        <p className="mt-3 text-muted-foreground">
          Choose a Walgreens RX near you for pharmacy, 30-minute pickup, and
          clinical services.
        </p>
      </div>

      <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {NEARBY_STORES.map((store) => (
          <li
            key={store.id}
            className="rounded-2xl border border-border/80 bg-surface-elevated/90 p-5"
          >
            <h2 className="font-display text-lg font-semibold tracking-tight">
              {store.name}
            </h2>
            <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              {store.address}
              <br />
              {store.city}, {store.state} {store.zip}
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="size-4 text-brand" aria-hidden />
              {store.phone}
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock3 className="size-4 text-brand" aria-hidden />
              {store.hoursSummary}
              {store.hasDriveThru ? " · Drive-thru" : ""}
            </p>
            <Button
              className="mt-5 w-full bg-brand text-brand-foreground hover:bg-brand/90"
              nativeButton={false}
              render={<Link href="/pharmacy" />}
            >
              Use this store
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
