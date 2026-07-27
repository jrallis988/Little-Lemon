import {
  estimateTotal,
  isRoomAvailable,
  nightsBetween,
  rangesOverlap,
} from "./data";

test("detects overlapping date ranges", () => {
  expect(rangesOverlap("2026-08-10", "2026-08-14", "2026-08-12", "2026-08-16")).toBe(
    true
  );
  expect(rangesOverlap("2026-08-10", "2026-08-12", "2026-08-12", "2026-08-16")).toBe(
    false
  );
});

test("marks blocked room dates unavailable", () => {
  expect(isRoomAvailable("ocean-king", "2026-08-13", "2026-08-15")).toBe(false);
  expect(isRoomAvailable("ocean-king", "2026-08-01", "2026-08-04")).toBe(true);
});

test("estimates stay totals", () => {
  expect(nightsBetween("2026-08-01", "2026-08-04")).toBe(3);
  expect(estimateTotal("dune-double", "2026-08-01", "2026-08-04")).toEqual({
    nights: 3,
    total: 447,
    rate: 149,
  });
});
