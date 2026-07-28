import { NextResponse } from "next/server";
import { DEFAULT_LOCATION } from "@/lib/chains";
import { resolveZip } from "@/lib/geo";
import { getPharmacyById, listPharmacies } from "@/lib/pricing-service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) {
    const pharmacy = await getPharmacyById(id);
    if (!pharmacy) {
      return NextResponse.json({ error: "Pharmacy not found" }, { status: 404 });
    }
    return NextResponse.json({ pharmacy });
  }

  const zip = searchParams.get("zip");
  const q = searchParams.get("q") ?? undefined;
  const radiusMiles = Number(searchParams.get("radiusMiles") ?? "50");
  const location = zip ? (await resolveZip(zip)) ?? DEFAULT_LOCATION : DEFAULT_LOCATION;

  const pharmacies = await listPharmacies({
    lat: location.latitude,
    lng: location.longitude,
    radiusMiles: Number.isFinite(radiusMiles) ? radiusMiles : 50,
    q,
  });

  return NextResponse.json({ location, pharmacies });
}
