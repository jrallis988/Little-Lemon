import type { Metadata } from "next";
import { MedicationBrowser } from "@/components/coverage/medication-browser";
import { listIncludedMedications } from "@/lib/coverage";

export const metadata: Metadata = {
  title: "Included medications",
  description:
    "Browse the A–Z directory of medications currently included in TrumpRx. Coverage is limited and may expand over time.",
};

export default async function MedicationsPage() {
  const medications = await listIncludedMedications();

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Program directory
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold uppercase tracking-tight">
            Included medications
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            TrumpRx currently supports a limited selection of medications.
            Coverage may expand over time. If your medication is not listed, you
            can request it for future consideration.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <MedicationBrowser medications={medications} />
      </div>
    </div>
  );
}
