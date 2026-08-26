import {
  getLaunchFeatures,
  launchModeLabel,
  V1_PHARMACY_PICKUP_DRUG_IDS,
} from "@/lib/launch-mode";

export function LimitedBetaBanner() {
  const features = getLaunchFeatures();
  if (!features.showLimitedBetaBanner) return null;

  return (
    <div
      role="status"
      className="border-b border-primary/20 bg-primary/5 text-foreground"
    >
      <div className="mx-auto max-w-6xl px-4 py-2 text-sm leading-snug sm:px-6">
        <span className="font-semibold">{launchModeLabel()}:</span>{" "}
        {V1_PHARMACY_PICKUP_DRUG_IDS.length} generic medications · pharmacy
        pickup only · program prices are confirmed at fill · TrumpRx does not
        sell or ship medications.
        {!features.livePharmacyPricing && (
          <>
            {" "}
            Live per-pharmacy pricing is not enabled yet — compare using what
            you currently pay.
          </>
        )}
      </div>
    </div>
  );
}
