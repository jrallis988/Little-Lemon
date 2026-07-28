import type { PriceComparisonRow } from "@/lib/types";

export interface MarketBenchmark {
  label: string;
  price: number;
  source: "trump_rx_low" | "trump_rx_median" | "estimated_retail" | "peer_cash";
  note: string;
}

export interface BenchmarkDrawerData {
  drugId: string;
  genericName: string;
  brandName: string;
  quantity: number;
  supplyDays: number;
  trumpRxLowest: number;
  benchmarks: MarketBenchmark[];
  spreadVsRetail: number;
  spreadVsMedian: number;
  transparencyNote: string;
}

/**
 * Transparent generic / cash-price benchmarking from the live quote set.
 * Peer cash uses mid-pack network prices as a stand-in until a third-party
 * market feed is wired (BENCHMARK_API_URL).
 */
export function buildBenchmarkDrawer(params: {
  drugId: string;
  genericName: string;
  brandName: string;
  quantity: number;
  supplyDays: number;
  rows: PriceComparisonRow[];
}): BenchmarkDrawerData | null {
  if (params.rows.length === 0) return null;

  const prices = params.rows
    .map((r) => r.offer.couponPrice)
    .sort((a, b) => a - b);
  const retail = params.rows
    .map((r) => r.offer.retailPrice)
    .sort((a, b) => a - b);

  const lowest = prices[0];
  const median = prices[Math.floor(prices.length / 2)];
  const retailTypical = retail[Math.floor(retail.length / 2)] ?? retail[0];
  // Peer cash ≈ 75th percentile of network — “ordinary” cash without hunting the absolute floor.
  const peer = prices[Math.min(prices.length - 1, Math.floor(prices.length * 0.75))];

  return {
    drugId: params.drugId,
    genericName: params.genericName,
    brandName: params.brandName,
    quantity: params.quantity,
    supplyDays: params.supplyDays,
    trumpRxLowest: lowest,
    benchmarks: [
      {
        label: "Trump RX lowest nearby",
        price: lowest,
        source: "trump_rx_low",
        note: "Best cash-discount quote in your current search radius.",
      },
      {
        label: "Trump RX typical (median)",
        price: median,
        source: "trump_rx_median",
        note: "Middle of nearby network quotes — what many patients actually pay.",
      },
      {
        label: "Ordinary cash (peer)",
        price: peer,
        source: "peer_cash",
        note: "Higher network cash quote — closer to walking in without comparing.",
      },
      {
        label: "Estimated retail",
        price: retailTypical,
        source: "estimated_retail",
        note: "Typical cash retail without a discount card (estimate).",
      },
    ],
    spreadVsRetail: Number((retailTypical - lowest).toFixed(2)),
    spreadVsMedian: Number((median - lowest).toFixed(2)),
    transparencyNote:
      "We show the floor and the ordinary cash band so you can see whether “savings” are real — not just marketing against an inflated retail.",
  };
}
