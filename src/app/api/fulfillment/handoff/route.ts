import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import {
  buildFulfillmentHandoff,
  type FulfillmentChannel,
} from "@/lib/fulfillment/handoff";

const schema = z.object({
  channel: z.enum(["telehealth", "mail_order", "specialty_transfer"]),
  drugId: z.string(),
  strengthId: z.string(),
  quantity: z.number().int().positive(),
  supplyDays: z.union([z.literal(30), z.literal(90)]),
  pharmacyId: z.string().optional(),
  zip: z.string().optional(),
});

/** Telehealth / mail-order / specialty transfer chaining. */
export async function POST(req: Request) {
  const session = await auth();
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid fulfillment request" }, { status: 400 });
  }

  const handoff = buildFulfillmentHandoff({
    ...parsed.data,
    channel: parsed.data.channel as FulfillmentChannel,
    userEmail: session?.user?.email ?? undefined,
  });

  return NextResponse.json({ handoff });
}
