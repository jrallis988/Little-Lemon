import type { HealthProfile, SupplementCheck } from './models';
import { analyzeSupplement } from './analysis';

/**
 * Determines whether a historical check should show "newer info available"
 * and re-runs analysis when the user rechecks.
 */
export function shouldOfferRecheck(check: SupplementCheck, profile: HealthProfile): boolean {
  if (check.newerInfoAvailable) return true;
  const checkTime = new Date(check.checkedAt).getTime();
  const profileTime = new Date(profile.lastUpdatedAt).getTime();
  return profileTime > checkTime;
}

export function recheckSupplement(
  priorCheck: SupplementCheck,
  profile: HealthProfile,
  userId: string,
): SupplementCheck {
  const fresh = analyzeSupplement(priorCheck.supplement, profile, userId);
  return {
    ...fresh,
    id: priorCheck.id,
    checkedAt: new Date().toISOString(),
    newerInfoAvailable: false,
    profileSnapshotNote: 'Rechecked against your latest confirmed health profile.',
  };
}

export function markChecksForRecheck(
  checks: SupplementCheck[],
  profile: HealthProfile,
): SupplementCheck[] {
  return checks.map((c) => ({
    ...c,
    newerInfoAvailable: shouldOfferRecheck(c, profile),
  }));
}
