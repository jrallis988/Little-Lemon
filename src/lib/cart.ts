import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import type { CouponBinDetails, SupplyDays } from "@/lib/types";

export const CART_SESSION_COOKIE = "trx_cart_sid";

export interface CartItemDTO {
  id: string;
  drugId: string;
  genericName: string;
  brandName: string;
  strengthId: string;
  strengthLabel: string;
  quantity: number;
  supplyDays: SupplyDays;
  pharmacyId: string;
  pharmacyName: string;
  pharmacyAddress: string;
  couponPrice: number;
  retailPrice: number;
  coupon?: Partial<CouponBinDetails>;
  addedAt: string;
}

function mapItem(row: {
  id: string;
  drugId: string;
  genericName: string;
  brandName: string;
  strengthId: string;
  strengthLabel: string;
  quantity: number;
  supplyDays: number;
  pharmacyId: string;
  pharmacyName: string;
  pharmacyAddress: string;
  couponPrice: number;
  retailPrice: number;
  couponJson: string;
  createdAt: Date;
}): CartItemDTO {
  let coupon: Partial<CouponBinDetails> | undefined;
  try {
    const parsed = JSON.parse(row.couponJson) as Partial<CouponBinDetails>;
    if (parsed && typeof parsed === "object") coupon = parsed;
  } catch {
    coupon = undefined;
  }
  return {
    id: row.id,
    drugId: row.drugId,
    genericName: row.genericName,
    brandName: row.brandName,
    strengthId: row.strengthId,
    strengthLabel: row.strengthLabel,
    quantity: row.quantity,
    supplyDays: row.supplyDays as SupplyDays,
    pharmacyId: row.pharmacyId,
    pharmacyName: row.pharmacyName,
    pharmacyAddress: row.pharmacyAddress,
    couponPrice: row.couponPrice,
    retailPrice: row.retailPrice,
    coupon,
    addedAt: row.createdAt.toISOString(),
  };
}

export async function ensureCartSessionKey(): Promise<string> {
  const jar = await cookies();
  const existing = jar.get(CART_SESSION_COOKIE)?.value;
  if (existing && existing.length >= 16) return existing;
  const sessionKey = `sid_${crypto.randomUUID().replace(/-/g, "")}`;
  jar.set(CART_SESSION_COOKIE, sessionKey, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return sessionKey;
}

export async function resolveCart(userId?: string | null) {
  const sessionKey = await ensureCartSessionKey();

  if (userId) {
    let userCart = await prisma.checkoutCart.findUnique({
      where: { userId },
      include: { items: { orderBy: { createdAt: "asc" } } },
    });

    const anonCart = await prisma.checkoutCart.findUnique({
      where: { sessionKey },
      include: { items: true },
    });

    if (!userCart) {
      if (anonCart) {
        userCart = await prisma.checkoutCart.update({
          where: { id: anonCart.id },
          data: { userId, sessionKey: null },
          include: { items: { orderBy: { createdAt: "asc" } } },
        });
      } else {
        userCart = await prisma.checkoutCart.create({
          data: { userId },
          include: { items: true },
        });
      }
    } else if (anonCart && anonCart.id !== userCart.id) {
      for (const item of anonCart.items) {
        await prisma.checkoutCartItem.upsert({
          where: {
            cartId_pharmacyId_drugId_strengthId_quantity_supplyDays: {
              cartId: userCart.id,
              pharmacyId: item.pharmacyId,
              drugId: item.drugId,
              strengthId: item.strengthId,
              quantity: item.quantity,
              supplyDays: item.supplyDays,
            },
          },
          create: {
            cartId: userCart.id,
            drugId: item.drugId,
            genericName: item.genericName,
            brandName: item.brandName,
            strengthId: item.strengthId,
            strengthLabel: item.strengthLabel,
            quantity: item.quantity,
            supplyDays: item.supplyDays,
            pharmacyId: item.pharmacyId,
            pharmacyName: item.pharmacyName,
            pharmacyAddress: item.pharmacyAddress,
            couponPrice: item.couponPrice,
            retailPrice: item.retailPrice,
            couponJson: item.couponJson,
          },
          update: {
            couponPrice: item.couponPrice,
            retailPrice: item.retailPrice,
            couponJson: item.couponJson,
            pharmacyName: item.pharmacyName,
            pharmacyAddress: item.pharmacyAddress,
            genericName: item.genericName,
            brandName: item.brandName,
            strengthLabel: item.strengthLabel,
          },
        });
      }
      await prisma.checkoutCart.delete({ where: { id: anonCart.id } });
      userCart = await prisma.checkoutCart.findUniqueOrThrow({
        where: { id: userCart.id },
        include: { items: { orderBy: { createdAt: "asc" } } },
      });
    }

    return userCart;
  }

  let cart = await prisma.checkoutCart.findUnique({
    where: { sessionKey },
    include: { items: { orderBy: { createdAt: "asc" } } },
  });
  if (!cart) {
    cart = await prisma.checkoutCart.create({
      data: { sessionKey },
      include: { items: true },
    });
  }
  return cart;
}

export function cartToDTO(cart: {
  items: Array<Parameters<typeof mapItem>[0]>;
}): { items: CartItemDTO[] } {
  return { items: cart.items.map(mapItem) };
}
