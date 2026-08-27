import { NextResponse } from "next/server";
import { isIncludedMedication } from "@/lib/program-catalog";
import { searchDrugs, getDrugById } from "@/lib/pricing-service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const id = searchParams.get("id");
  const limit = Number(searchParams.get("limit") ?? "8");

  if (id) {
    if (!isIncludedMedication(id)) {
      return NextResponse.json(
        { error: "Medication is not in the current TrumpRx launch formulary." },
        { status: 404 }
      );
    }
    const drug = await getDrugById(id);
    if (!drug) {
      return NextResponse.json({ error: "Drug not found" }, { status: 404 });
    }
    return NextResponse.json({ drug });
  }

  const results = await searchDrugs(q, Number.isFinite(limit) ? limit : 8);
  return NextResponse.json({ results });
}
