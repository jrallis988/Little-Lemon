import { getClubById } from "@/lib/clubs";
import { HOME_CLUB } from "@/lib/home-club";
import { formatCurrency, getLocalPricing } from "@/lib/pricing";

/** Local-first pricing footnote for the acquisition site. */
export function PricingDisclaimer() {
  const home = getClubById(HOME_CLUB.id);
  const classic = getLocalPricing(home, "classic");
  const black = getLocalPricing(home, "black-card");

  return (
    <p className="mx-auto max-w-5xl px-4 pb-6 text-[11px] leading-relaxed text-pf-ink/55 md:px-6">
      *At {HOME_CLUB.name}, Classic starts at {formatCurrency(classic.monthlyDues)}
      /mo and PF Black Card® at {formatCurrency(black.monthlyDues)}/mo, plus
      taxes &amp; fees. Enrollment and a {formatCurrency(classic.annualFee)}{" "}
      annual fee (billed in {classic.annualFeeMonth}) may apply. Rates shown are
      for this club and may differ at other locations. Memberships may include a
      commitment term. Must be at least 18 to enroll, or 13–17 with
      parent/guardian. Services and Black Card Spa® amenities vary by club.
      {HOME_CLUB.name} is Open &amp; Staffed 24/7. Locations independently owned
      and operated. Illustrative until franchise-confirmed. ©2026 Planet Fitness
      Franchising LLC (concept site — not endorsed).
    </p>
  );
}
