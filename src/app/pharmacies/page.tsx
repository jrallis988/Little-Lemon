import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { PharmaciesClient } from "./pharmacies-client";

export default function PharmaciesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50dvh] items-center justify-center text-muted-foreground">
          <Loader2 className="mr-2 size-5 animate-spin" />
          Loading pharmacies…
        </div>
      }
    >
      <PharmaciesClient />
    </Suspense>
  );
}
