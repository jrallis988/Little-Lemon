import type { Pharmacy, PharmacyPriceOffer } from "@/lib/types";
import {
  runSwitchPrecheck,
  type SwitchPrecheckResult,
} from "@/lib/switch/adjudication";

export interface RoutedPharmacyOption {
  pharmacy: Pharmacy;
  offer: PharmacyPriceOffer;
  precheck: SwitchPrecheckResult;
  /** Lower is better: acceptance first, then price, then distance. */
  score: number;
}

function statusRank(status: SwitchPrecheckResult["status"]): number {
  switch (status) {
    case "likely_accept":
      return 0;
    case "verify_with_pharmacy":
      return 1;
    case "untested":
      return 2;
    case "network_gap":
      return 3;
    default:
      return 4;
  }
}

/**
 * Universal routing layer — cross-references pharmacy network acceptance
 * and BIN/PCN/Group pre-tests, then ranks options so the patient can pick
 * a first-pass-friendly store instead of gambling at the counter.
 */
export async function routeBestPharmacies(
  options: Array<{ pharmacy: Pharmacy; offer: PharmacyPriceOffer }>
): Promise<{
  ranked: RoutedPharmacyOption[];
  recommended: RoutedPharmacyOption | null;
  liveSwitch: boolean;
  routedAt: string;
}> {
  const ranked = (
    await Promise.all(
      options.map(async ({ pharmacy, offer }) => {
        const precheck = await runSwitchPrecheck({
          pharmacy,
          drugId: offer.drugId,
          strengthId: offer.strengthId,
          quantity: offer.quantity,
          supplyDays: offer.supplyDays,
          couponPrice: offer.couponPrice,
          coupon: offer.coupon,
        });
        const distance = pharmacy.distanceMiles ?? 99;
        const score =
          statusRank(precheck.status) * 1000 +
          offer.couponPrice * 10 +
          distance;
        return { pharmacy, offer, precheck, score };
      })
    )
  ).sort((a, b) => a.score - b.score);

  return {
    ranked,
    recommended: ranked[0] ?? null,
    liveSwitch: ranked.some((r) => r.precheck.liveSwitch),
    routedAt: new Date().toISOString(),
  };
}
