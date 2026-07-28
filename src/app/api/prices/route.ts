import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { DEFAULT_LOCATION } from "@/lib/chains";
import { resolveZip } from "@/lib/geo";
import {
  buildSavingsTips,
  getDrugById,
  getPriceQuotes,
  sortComparisonRows,
} from "@/lib/pricing-service";

const schema = z.object({
  drugId: z.string().min(1),
  strengthId: z.string().min(1),
  quantity: z.coerce.number().int().positive(),
  supplyDays: z.coerce.number().refine((n) => n === 30 || n === 90),
  zip: z.string().optional(),
  sortBy: z.enum(["price", "distance", "savings"]).default("price"),
  radiusMiles: z.coerce.number().optional(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parsed = schema.safeParse({
    drugId: searchParams.get("drugId"),
    strengthId: searchParams.get("strengthId"),
    quantity: searchParams.get("quantity"),
    supplyDays: searchParams.get("supplyDays") ?? "30",
    zip: searchParams.get("zip") ?? undefined,
    sortBy: searchParams.get("sortBy") ?? "price",
    radiusMiles: searchParams.get("radiusMiles") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid price query", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const drug = await getDrugById(parsed.data.drugId);
  if (!drug) {
    return NextResponse.json({ error: "Drug not found" }, { status: 404 });
  }

  const location = parsed.data.zip
    ? (await resolveZip(parsed.data.zip)) ?? DEFAULT_LOCATION
    : DEFAULT_LOCATION;

  const session = await auth();
  const plusMember =
    session?.user?.membershipTier === "plus" &&
    session.user.membershipStatus === "active";

  const rows = await getPriceQuotes({
    drugId: parsed.data.drugId,
    strengthId: parsed.data.strengthId,
    quantity: parsed.data.quantity,
    supplyDays: parsed.data.supplyDays as 30 | 90,
    location,
    plusMember,
    radiusMiles: parsed.data.radiusMiles,
  });

  const sorted = sortComparisonRows(rows, parsed.data.sortBy);
  const tips = buildSavingsTips({
    drug,
    rows: sorted,
    supplyDays: parsed.data.supplyDays as 30 | 90,
  });

  return NextResponse.json({
    drug,
    location,
    plusMember,
    rows: sorted,
    tips,
    quotedAt: new Date().toISOString(),
    provider: process.env.PRICING_PROVIDER ?? "network",
  });
}
