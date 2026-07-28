export type CoverageSituation =
  | "no_insurance"
  | "high_deductible"
  | "met_deductible"
  | "medicare_part_d"
  | "unsure";

export interface InsuranceVsCashInput {
  cashPrice: number;
  retailPrice: number;
  situation: CoverageSituation;
  /** Estimated plan copay or coinsurance amount for this fill, if known. */
  estimatedPlanPay?: number;
  /** Dollars remaining on annual deductible, if known. */
  deductibleRemaining?: number;
  /** Whether the patient prefers minimizing today's spend. */
  preferTodaySavings?: boolean;
}

export type DecisionRecommendation = "use_cash" | "use_insurance" | "compare_at_counter";

export interface InsuranceVsCashResult {
  recommendation: DecisionRecommendation;
  headline: string;
  body: string;
  todayCash: number;
  todayInsuranceEstimate: number | null;
  deductibleProgressNote?: string;
  caveats: string[];
}

/**
 * Decision matrix: cash-pay discount vs insurance for *today's* fill,
 * with optional deductible-progress framing (not advice).
 */
export function computeInsuranceVsCash(
  input: InsuranceVsCashInput
): InsuranceVsCashResult {
  const todayCash = input.cashPrice;
  const plan =
    typeof input.estimatedPlanPay === "number" && input.estimatedPlanPay >= 0
      ? input.estimatedPlanPay
      : null;

  const caveats = [
    "Trump RX is not insurance. This tool does not replace your plan’s EOB or pharmacist guidance.",
    "Coupons generally cannot be combined with insurance on the same fill.",
  ];

  if (input.situation === "no_insurance" || input.situation === "unsure") {
    return {
      recommendation: "use_cash",
      headline: "Cash discount is the clear path today",
      body:
        input.situation === "unsure"
          ? "If you’re unsure about coverage, bring both numbers to the counter and ask which is lower."
          : "Without insurance, the Trump RX cash price is what you compare to pharmacy retail.",
      todayCash,
      todayInsuranceEstimate: plan,
      caveats,
    };
  }

  if (input.situation === "met_deductible" && plan !== null) {
    if (plan <= todayCash) {
      return {
        recommendation: "use_insurance",
        headline: "Insurance looks lower today",
        body: `Your estimated plan pay (${format(plan)}) is at or below the cash coupon (${format(todayCash)}). Ask the pharmacist to run insurance first.`,
        todayCash,
        todayInsuranceEstimate: plan,
        caveats,
      };
    }
    return {
      recommendation: "use_cash",
      headline: "Cash coupon looks lower today",
      body: `Even with deductible met, the cash coupon (${format(todayCash)}) beats your estimated plan pay (${format(plan)}).`,
      todayCash,
      todayInsuranceEstimate: plan,
      caveats,
    };
  }

  if (input.situation === "high_deductible" || input.situation === "medicare_part_d") {
    const remaining = input.deductibleRemaining;
    const preferToday = input.preferTodaySavings !== false;

    if (plan !== null && plan < todayCash && !preferToday) {
      return {
        recommendation: "compare_at_counter",
        headline: "Trade-off: today vs deductible progress",
        body: `Insurance may cost ${format(plan)} today and can count toward your deductible${
          typeof remaining === "number"
            ? ` (about ${format(remaining)} remaining)`
            : ""
        }. Cash coupon is ${format(todayCash)} and usually does not apply to deductible.`,
        todayCash,
        todayInsuranceEstimate: plan,
        deductibleProgressNote:
          typeof remaining === "number"
            ? `Estimated deductible remaining: ${format(remaining)}`
            : undefined,
        caveats: [
          ...caveats,
          "Cash-pay fills typically do not reduce commercial or Part D deductibles.",
        ],
      };
    }

    if (plan !== null && plan < todayCash) {
      return {
        recommendation: "use_insurance",
        headline: "Insurance may cost less today",
        body: `Estimated plan pay ${format(plan)} vs cash ${format(todayCash)}. Confirm at the counter.`,
        todayCash,
        todayInsuranceEstimate: plan,
        deductibleProgressNote:
          typeof remaining === "number"
            ? `Estimated deductible remaining: ${format(remaining)}`
            : undefined,
        caveats,
      };
    }

    return {
      recommendation: "use_cash",
      headline: "Cash coupon minimizes what you pay today",
      body: `Trump RX cash price is ${format(todayCash)}${
        plan !== null ? ` vs estimated insurance ${format(plan)}` : ""
      }. If you care more about deductible progress than today’s total, ask the pharmacist to compare both.`,
      todayCash,
      todayInsuranceEstimate: plan,
      deductibleProgressNote:
        typeof remaining === "number"
          ? `Estimated deductible remaining: ${format(remaining)}`
          : undefined,
      caveats: [
        ...caveats,
        "Cash-pay fills typically do not reduce commercial or Part D deductibles.",
      ],
    };
  }

  return {
    recommendation: "compare_at_counter",
    headline: "Compare both numbers at the pharmacy",
    body: `Cash coupon: ${format(todayCash)}. Ask which is lower — coupon or your plan.`,
    todayCash,
    todayInsuranceEstimate: plan,
    caveats,
  };
}

function format(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}
