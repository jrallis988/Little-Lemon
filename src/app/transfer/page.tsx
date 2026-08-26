import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getLaunchFeatures } from "@/lib/launch-mode";
import { cn } from "@/lib/utils";
import TransferClient from "./transfer-client";

export default function TransferPage() {
  if (!getLaunchFeatures().transfer) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-3xl font-semibold uppercase tracking-tight">
          Transfer not available in v1
        </h1>
        <p className="mt-3 text-muted-foreground">
          Prescription transfer requests are disabled during the limited launch.
          Use <strong>Get this price</strong> on an included medication, then
          bring program information to a participating pharmacy with your
          prescription.
        </p>
        <Link
          href="/medications"
          className={cn(buttonVariants({ size: "lg" }), "mt-6 inline-flex")}
        >
          Browse included medications
        </Link>
      </div>
    );
  }

  return <TransferClient />;
}
