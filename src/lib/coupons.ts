import { prisma } from "@/lib/db";
import { getEnv } from "@/lib/env";
import type { CouponBinDetails, SupplyDays } from "@/lib/types";

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export async function issueCoupon(input: {
  userId?: string | null;
  pharmacyId: string;
  drugId: string;
  strengthId: string;
  quantity: number;
  supplyDays: SupplyDays;
  couponPrice: number;
  retailPrice: number;
}) {
  const env = getEnv();
  const seed = hashSeed(
    `${input.pharmacyId}-${input.drugId}-${input.userId ?? "guest"}-${Date.now()}`
  );
  const memberId = String(100000000 + (seed % 899999999));
  const expiresAt = new Date(
    Date.now() + env.COUPON_TTL_HOURS * 60 * 60 * 1000
  );

  const details: CouponBinDetails = {
    bin: env.TRUMPRX_BIN,
    pcn: env.TRUMPRX_PCN,
    group: env.TRUMPRX_GROUP,
    memberId,
    barcodeValue: `${env.TRUMPRX_BIN}${memberId}`,
  };

  const coupon = await prisma.coupon.create({
    data: {
      userId: input.userId ?? null,
      pharmacyId: input.pharmacyId,
      drugId: input.drugId,
      strengthId: input.strengthId,
      quantity: input.quantity,
      supplyDays: input.supplyDays,
      couponPrice: input.couponPrice,
      retailPrice: input.retailPrice,
      bin: details.bin,
      pcn: details.pcn,
      groupCode: details.group,
      memberId: details.memberId,
      barcodeValue: details.barcodeValue,
      expiresAt,
      status: "issued",
    },
    include: {
      pharmacy: true,
      drug: { include: { strengths: true } },
    },
  });

  return coupon;
}

export async function getCoupon(id: string) {
  return prisma.coupon.findUnique({
    where: { id },
    include: {
      pharmacy: true,
      drug: { include: { strengths: true } },
    },
  });
}
