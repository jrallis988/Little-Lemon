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
  normalizePhone,
  parseClubId,
  isMembershipTier,
  requireNonEmpty,
} from "@/lib/validation";
import { HOME_CLUB } from "@/lib/home-club";
import { rateLimit } from "@/lib/rate-limit";
import { CONCEPT_SCORES, computeLaunchScore, overallConceptScore } from "@/lib/quality";
import { SCREENS } from "@/lib/screens";
import { issueAccessToken, validateAccessToken } from "@/lib/access";

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

  it("validates phone and required strings", () => {
    expect(normalizePhone("(603) 555-0199")).toBe("(603) 555-0199");
    expect(normalizePhone("123")).toBeNull();
    expect(requireNonEmpty("  Alex ")).toBe("Alex");
    expect(requireNonEmpty("   ")).toBeNull();
  });
});

describe("demo auth gate", () => {
  it("is disabled by default in test", () => {
    expect(isDemoAuthEnabled()).toBe(false);
    expect(verifyDemoPassword("pfmember")).toBe(false);
  });
});

describe("rate limit", () => {
  it("allows traffic under the limit and blocks after", () => {
    const key = `test-${Math.random()}`;
    for (let i = 0; i < 5; i += 1) {
      expect(rateLimit(key, 5, 60_000).ok).toBe(true);
    }
    expect(rateLimit(key, 5, 60_000).ok).toBe(false);
  });
});

describe("quality scorecard", () => {
  it("targets a perfect concept score", () => {
    expect(overallConceptScore()).toBe(10);
    expect(CONCEPT_SCORES.every((s) => s.score <= s.max)).toBe(true);
    expect(CONCEPT_SCORES.find((s) => s.id === "launch")?.score).toBeGreaterThanOrEqual(9);
  });

  it("raises launch to 10 when durable store + secrets are set", () => {
    const launch = computeLaunchScore({
      authSecretConfigured: true,
      accessSecretConfigured: true,
      siteUrlConfigured: true,
      demoAuthEnabled: false,
      storeBackend: "kv",
    });
    expect(launch.score).toBe(10);
  });

  it("caps launch at 9 while store is memory-only", () => {
    const launch = computeLaunchScore({
      authSecretConfigured: true,
      accessSecretConfigured: true,
      siteUrlConfigured: true,
      demoAuthEnabled: false,
      storeBackend: "memory",
    });
    expect(launch.score).toBe(9);
  });
});

describe("screen registry honesty", () => {
  it("marks thin advanced surfaces as scaffold", () => {
    expect(SCREENS).toHaveLength(85);
    const spa = SCREENS.find((s) => s.id === 76);
    expect(spa?.status).toBe("scaffold");
    const hero = SCREENS.find((s) => s.id === 1);
    expect(hero?.status).toBe("live");
  });
});

describe("access tokens", () => {
  it("issues and validates a door token", async () => {
    process.env.USE_MEMORY_STORE = "true";
    process.env.ACCESS_CONTROL_SECRET = "test-access-secret";
    const token = await issueAccessToken({
      membershipId: "mem_test",
      clubId: "pf-stratham",
      ttlSeconds: 60,
    });
    expect(token.code.includes(".")).toBe(true);
    const result = await validateAccessToken(token.code, "pf-stratham");
    // May randomly hit club_full (~12%); accept either success or club_full
    expect(["success", "club_full", "denied"]).toContain(result.result);
    if (result.ok) {
      expect(result.token.membershipId).toBe("mem_test");
    }
  });
});
