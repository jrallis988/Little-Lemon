import type { Metadata } from "next";

import { StorePicker } from "@/components/stores/store-picker";

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
          clinical services. Your selection sticks across checkout and the
          header.
        </p>
      </div>

      <StorePicker redirectTo="/pharmacy" />
    </div>
  );
}
