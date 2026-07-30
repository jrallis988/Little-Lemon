import { NextResponse } from "next/server";
import { assertOpsAuthorized, listIntakeRecords } from "@/lib/intake/store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = assertOpsAuthorized(request);
  if (!auth.ok) {
    return NextResponse.json(
      { ok: false, errors: [auth.message] },
      { status: auth.status },
    );
  }

  const records = await listIntakeRecords(100);
  return NextResponse.json({
    ok: true,
    count: records.length,
    records: records.map((r) => ({
      referenceId: r.referenceId,
      channel: r.channel,
      createdAt: r.createdAt,
      delivery: r.delivery,
      payload: r.payload,
    })),
  });
}
