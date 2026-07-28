import { NextResponse } from "next/server";
import { resolveZip } from "@/lib/geo";

export async function GET(req: Request) {
  const zip = new URL(req.url).searchParams.get("zip");
  if (!zip) {
    return NextResponse.json({ error: "zip required" }, { status: 400 });
  }
  const location = await resolveZip(zip);
  if (!location) {
    return NextResponse.json({ error: "ZIP not found" }, { status: 404 });
  }
  return NextResponse.json({ location });
}
