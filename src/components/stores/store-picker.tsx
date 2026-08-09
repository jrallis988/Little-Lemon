"use client";

import { useRouter } from "next/navigation";
import { Check, Clock3, MapPin, Phone } from "lucide-react";

import { useSelectedStore } from "@/lib/store/store-selection";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function StorePicker({ redirectTo = "/pharmacy" }: { redirectTo?: string }) {
  const router = useRouter();
  const { store: activeStore, stores, setStoreById } = useSelectedStore();

  return (
    <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stores.map((store) => {
        const selected = store.id === activeStore.id;
        return (
          <li
            key={store.id}
            className={cn(
              "rounded-2xl border bg-surface-elevated/90 p-5",
              selected ? "border-brand ring-1 ring-brand/30" : "border-border/80",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-display text-lg font-semibold tracking-tight">
                {store.name}
              </h2>
              {selected ? (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-brand">
                  <Check className="size-3.5" aria-hidden />
                  Selected
                </span>
              ) : null}
            </div>
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
              onClick={() => {
                setStoreById(store.id);
                router.push(redirectTo);
              }}
            >
              {selected ? "Continue with this store" : "Use this store"}
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
