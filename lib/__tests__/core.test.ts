import { describe, expect, it } from "vitest";
import { isDemoAuthEnabled, verifyDemoPassword } from "@/lib/auth-shared";
import {
  formatCurrency,
  getLocalPricing,
  getPlan,
} from "@/lib/pricing";
import { getClubById, getHomeClub, searchClubs } from "@/lib/clubs";
import { scheduleOpen247, isOpenAt, todaysHoursLabel } from "@/lib/hours";
import {
  normalizeEmail,
  parseClubId,
  isMembershipTier,
} from "@/lib/validation";
import { HOME_CLUB } from "@/lib/home-club";

describe("home club", () => {
  it("is Stratham NH", () => {
    expect(HOME_CLUB.id).toBe("pf-stratham");
    expect(HOME_CLUB.state).toBe("NH");
    const club = getHomeClub();
    expect(club.id).toBe("pf-stratham");
    expect(club.openNow).toBe(true);
  });
});

describe("club search", () => {
  it("finds Stratham by zip and city", () => {
    expect(searchClubs("03885")[0]?.id).toBe("pf-stratham");
    expect(searchClubs("stratham").some((c) => c.id === "pf-stratham")).toBe(
      true
    );
  });

  it("returns empty for nonsense", () => {
    expect(searchClubs("zzzz-no-club")).toHaveLength(0);
  });
});

describe("pricing", () => {
  it("formats currency and resolves plans", () => {
    expect(formatCurrency(15)).toBe("$15");
    expect(formatCurrency(24.99)).toBe("$24.99");
    expect(getPlan("black-card").id).toBe("black-card");
    const club = getClubById("pf-stratham");
    const classic = getLocalPricing(club, "classic");
    expect(classic.available).toBe(true);
    expect(classic.monthlyDues).toBeGreaterThan(0);
  });
});

describe("hours", () => {
  it("treats 24/7 as always open", () => {
    const schedule = scheduleOpen247();
    expect(isOpenAt(schedule, new Date("2026-08-30T03:00:00"))).toBe(true);
    expect(todaysHoursLabel(schedule)).toMatch(/24/i);
  });
});

describe("validation", () => {
  it("normalizes email and club ids", () => {
    expect(normalizeEmail("  Ade@Club.COM ")).toBe("ade@club.com");
    expect(normalizeEmail("nope")).toBeNull();
    expect(parseClubId("pf-stratham")).toBe("pf-stratham");
    expect(parseClubId("../etc")).toBeNull();
    expect(isMembershipTier("classic")).toBe(true);
    expect(isMembershipTier("gold")).toBe(false);
  });
});

describe("demo auth gate", () => {
  it("is disabled by default in test", () => {
    expect(isDemoAuthEnabled()).toBe(false);
    expect(verifyDemoPassword("pfmember")).toBe(false);
  });
});
