import { buildBookingUrl, estimateTotal, nightsBetween } from "./data";

test("counts nights between dates", () => {
  expect(nightsBetween("2026-08-01", "2026-08-04")).toBe(3);
  expect(nightsBetween("2026-08-01", "2026-08-01")).toBe(0);
});

test("estimates stay totals from typical rates", () => {
  expect(estimateTotal("two-doubles", "2026-08-01", "2026-08-04")).toEqual({
    nights: 3,
    total: 495,
    rate: 165,
  });
  expect(estimateTotal("junior-suite", "2026-08-01", "2026-08-03")).toEqual({
    nights: 2,
    total: 390,
    rate: 195,
  });
});

test("builds RezStream booking URLs with date params", () => {
  const url = buildBookingUrl({
    checkIn: "2026-08-10",
    checkOut: "2026-08-12",
    guests: 3,
  });
  expect(url).toContain("guest.rezstream.com/search/seascape-inn");
  expect(url).toContain("ArrivalDate=2026-08-10");
  expect(url).toContain("DepartureDate=2026-08-12");
  expect(url).toContain("Adults=3");
});

test("exposes seasonal rate guidance", () => {
  const { SEASONAL_RATES, SITE } = require("./data");
  expect(SEASONAL_RATES).toHaveLength(3);
  expect(SITE.history.title).toMatch(/1953/);
  expect(SITE.trustLine.length).toBeGreaterThan(2);
});
