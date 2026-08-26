import { prisma } from "@/lib/db";
import { isIncludedMedication } from "@/lib/program-catalog";
import { mapDrug } from "@/lib/pricing-service";
import type { Drug } from "@/lib/types";

export type CoverageResult =
  | { status: "included"; drug: Drug }
  | { status: "not_included"; query: string }
  | { status: "browse" };

export async function listIncludedMedications(): Promise<Drug[]> {
  const rows = await prisma.drug.findMany({
    orderBy: { brandName: "asc" },
    include: { strengths: true, quantities: true },
  });
  return rows.map(mapDrug).filter((d) => isIncludedMedication(d.id));
}

export async function searchCoverage(opts: {
  drugId?: string;
  query?: string;
}): Promise<CoverageResult> {
  if (opts.drugId) {
    const row = await prisma.drug.findUnique({
      where: { id: opts.drugId },
      include: { strengths: true, quantities: true },
    });
    if (row && isIncludedMedication(row.id)) {
      return { status: "included", drug: mapDrug(row) };
    }
    if (opts.drugId) {
      return { status: "not_included", query: opts.drugId };
    }
  }

  const q = opts.query?.trim();
  if (!q) return { status: "browse" };

  const rows = await prisma.drug.findMany({
    include: { strengths: true, quantities: true },
  });
  const needle = q.toLowerCase();
  const match = rows
    .map(mapDrug)
    .find(
      (d) =>
        isIncludedMedication(d.id) &&
        (d.id === needle ||
          d.brandName.toLowerCase().includes(needle) ||
          d.genericName.toLowerCase().includes(needle) ||
          d.searchAliases.some((a) => a.toLowerCase().includes(needle)))
    );

  if (match) return { status: "included", drug: match };
  return { status: "not_included", query: q };
}
