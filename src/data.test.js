import { estimateTotal, nightsBetween } from "./data";

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
