import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getLaunchFeatures } from "@/lib/launch-mode";
import { cn } from "@/lib/utils";
import ProvidersClient from "./providers-client";

export default function ProvidersPage() {
  if (!getLaunchFeatures().providers) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-3xl font-semibold uppercase tracking-tight">
          Provider portal — coming later
        </h1>
        <p className="mt-3 text-muted-foreground">
          The provider inquiry portal is not part of the limited v1 launch. For
          now, direct clinical questions to Help or the FAQ.
        </p>
        <Link
          href="/help"
          className={cn(buttonVariants({ size: "lg" }), "mt-6 inline-flex")}
        >
          Open Help
        </Link>
      </div>
    );
  }

  return <ProvidersClient />;
}
