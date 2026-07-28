import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { cartToDTO, resolveCart } from "@/lib/cart";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    const session = await auth();
    const cart = await resolveCart(session?.user?.id);
    return NextResponse.json(cartToDTO(cart));
  } catch (err) {
    logger.error("cart_get_failed", {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { error: "Could not load checkout cart." },
      { status: 500 }
    );
  }
}

const addSchema = z.object({
  drugId: z.string().min(1),
  genericName: z.string().min(1),
  brandName: z.string().min(1),
  strengthId: z.string().min(1),
  strengthLabel: z.string().min(1),
  quantity: z.number().int().positive(),
  supplyDays: z.union([z.literal(30), z.literal(90)]),
  pharmacyId: z.string().min(1),
  pharmacyName: z.string().min(1),
  pharmacyAddress: z.string().min(1),
  couponPrice: z.number().positive(),
  retailPrice: z.number().positive(),
  coupon: z.record(z.string(), z.string()).optional(),
});

export async function POST(req: Request) {
  const parsed = addSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid cart item", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const session = await auth();
    const cart = await resolveCart(session?.user?.id);
    const data = parsed.data;

    await prisma.checkoutCartItem.upsert({
      where: {
        cartId_pharmacyId_drugId_strengthId_quantity_supplyDays: {
          cartId: cart.id,
          pharmacyId: data.pharmacyId,
          drugId: data.drugId,
          strengthId: data.strengthId,
          quantity: data.quantity,
          supplyDays: data.supplyDays,
        },
      },
      create: {
        cartId: cart.id,
        drugId: data.drugId,
        genericName: data.genericName,
        brandName: data.brandName,
        strengthId: data.strengthId,
        strengthLabel: data.strengthLabel,
        quantity: data.quantity,
        supplyDays: data.supplyDays,
        pharmacyId: data.pharmacyId,
        pharmacyName: data.pharmacyName,
        pharmacyAddress: data.pharmacyAddress,
        couponPrice: data.couponPrice,
        retailPrice: data.retailPrice,
        couponJson: JSON.stringify(data.coupon ?? {}),
      },
      update: {
        couponPrice: data.couponPrice,
        retailPrice: data.retailPrice,
        couponJson: JSON.stringify(data.coupon ?? {}),
        pharmacyName: data.pharmacyName,
        pharmacyAddress: data.pharmacyAddress,
        genericName: data.genericName,
        brandName: data.brandName,
        strengthLabel: data.strengthLabel,
      },
    });

    const refreshed = await resolveCart(session?.user?.id);
    return NextResponse.json(cartToDTO(refreshed));
  } catch (err) {
    logger.error("cart_add_failed", {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { error: "Could not update checkout cart." },
      { status: 500 }
    );
  }
}

const deleteSchema = z.object({
  itemId: z.string().optional(),
  clear: z.boolean().optional(),
});

export async function DELETE(req: Request) {
  const parsed = deleteSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const session = await auth();
    const cart = await resolveCart(session?.user?.id);

    if (parsed.data.clear) {
      await prisma.checkoutCartItem.deleteMany({ where: { cartId: cart.id } });
    } else if (parsed.data.itemId) {
      await prisma.checkoutCartItem.deleteMany({
        where: { id: parsed.data.itemId, cartId: cart.id },
      });
    } else {
      return NextResponse.json(
        { error: "Provide itemId or clear: true" },
        { status: 400 }
      );
    }

    const refreshed = await resolveCart(session?.user?.id);
    return NextResponse.json(cartToDTO(refreshed));
  } catch (err) {
    logger.error("cart_delete_failed", {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { error: "Could not update checkout cart." },
      { status: 500 }
    );
  }
}
