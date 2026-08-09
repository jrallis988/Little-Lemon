import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { buildLaunchChecklist } from "@/lib/launch";
import { notifyAdminsOfChatMessage } from "@/lib/alerts/dispatch";
import { logger } from "@/lib/logger";
import {
  isResendConfigured,
  isStripeConfigured,
  isTwilioConfigured,
} from "@/lib/env";
import { getStripe } from "@/lib/stripe";

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const checklist = buildLaunchChecklist();
  const legal = await prisma.launchChecklistItem.findMany({
    orderBy: { id: "asc" },
  });

  return NextResponse.json({
    ...checklist,
    legalItems: legal.length
      ? legal
      : DEFAULT_LEGAL.map((item) => ({
          id: item.id,
          title: item.title,
          completed: false,
          note: null,
          updatedAt: null,
        })),
  });
}

const DEFAULT_LEGAL = [
  {
    id: "tos_review",
    title: "Terms of Service reviewed by counsel against live features",
  },
  {
    id: "privacy_review",
    title: "Privacy Policy reviewed (accounts, chat, alerts, location)",
  },
  {
    id: "brand_naming",
    title: "Brand naming cleared — private discount service, not government",
  },
  {
    id: "pharmacy_claims",
    title: "Discount-card / BIN marketing claims approved",
  },
] as const;

const patchSchema = z.object({
  id: z.string().min(1),
  completed: z.boolean(),
  note: z.string().max(500).optional(),
});

/** Persist a manual legal checklist toggle. */
export async function PATCH(req: Request) {
  const session = await requireAdmin();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const parsed = patchSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid checklist update" }, { status: 400 });
  }

  const meta = DEFAULT_LEGAL.find((l) => l.id === parsed.data.id);
  if (!meta) {
    return NextResponse.json({ error: "Unknown checklist item" }, { status: 404 });
  }

  const row = await prisma.launchChecklistItem.upsert({
    where: { id: parsed.data.id },
    create: {
      id: parsed.data.id,
      title: meta.title,
      completed: parsed.data.completed,
      note: parsed.data.note ?? null,
      updatedBy: session.user.email ?? session.user.id,
    },
    update: {
      completed: parsed.data.completed,
      note: parsed.data.note ?? null,
      updatedBy: session.user.email ?? session.user.id,
    },
  });

  return NextResponse.json({ item: row });
}

const probeSchema = z.object({
  target: z.enum([
    "stripe",
    "resend",
    "twilio",
    "switch",
    "pricing",
    "chat_notify",
  ]),
});

/** Connectivity probes for launch integrations. */
export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = probeSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid probe target" }, { status: 400 });
  }

  const target = parsed.data.target;
  try {
    if (target === "stripe") {
      if (!isStripeConfigured()) {
        return NextResponse.json({
          ok: false,
          target,
          detail: "Stripe keys not configured.",
        });
      }
      const stripe = getStripe()!;
      const prices = await stripe.prices.retrieve(process.env.STRIPE_PLUS_PRICE_ID!);
      return NextResponse.json({
        ok: true,
        target,
        detail: `Price ${prices.id} · ${prices.active ? "active" : "inactive"}`,
      });
    }

    if (target === "resend") {
      if (!isResendConfigured()) {
        return NextResponse.json({
          ok: false,
          target,
          detail: "Resend not configured.",
        });
      }
      return NextResponse.json({
        ok: true,
        target,
        detail: `From ${process.env.RESEND_FROM_EMAIL} (API key present). Send a chat test to verify delivery.`,
      });
    }

    if (target === "twilio") {
      if (!isTwilioConfigured()) {
        return NextResponse.json({
          ok: false,
          target,
          detail: "Twilio not configured.",
        });
      }
      return NextResponse.json({
        ok: true,
        target,
        detail: `From ${process.env.TWILIO_FROM_NUMBER} configured.`,
      });
    }

    if (target === "switch") {
      const url = process.env.SWITCH_API_URL;
      if (!url) {
        return NextResponse.json({
          ok: false,
          target,
          detail: "SWITCH_API_URL not set.",
        });
      }
      const res = await fetch(`${url.replace(/\/$/, "")}/v1/health`, {
        headers: process.env.SWITCH_API_KEY
          ? { Authorization: `Bearer ${process.env.SWITCH_API_KEY}` }
          : {},
        cache: "no-store",
      }).catch(() => null);
      if (!res) {
        return NextResponse.json({
          ok: false,
          target,
          detail: "Could not reach SWITCH_API_URL /v1/health.",
        });
      }
      return NextResponse.json({
        ok: res.ok,
        target,
        detail: `HTTP ${res.status} from partner /v1/health`,
      });
    }

    if (target === "pricing") {
      const url = process.env.PRICING_API_URL;
      if (process.env.PRICING_PROVIDER !== "external" || !url) {
        return NextResponse.json({
          ok: false,
          target,
          detail: "Set PRICING_PROVIDER=external and PRICING_API_URL first.",
        });
      }
      const res = await fetch(`${url.replace(/\/$/, "")}/v1/health`, {
        headers: process.env.PRICING_API_KEY
          ? { Authorization: `Bearer ${process.env.PRICING_API_KEY}` }
          : {},
        cache: "no-store",
      }).catch(() => null);
      if (!res) {
        return NextResponse.json({
          ok: false,
          target,
          detail: "Could not reach PRICING_API_URL /v1/health.",
        });
      }
      return NextResponse.json({
        ok: res.ok,
        target,
        detail: `HTTP ${res.status} from pricing /v1/health`,
      });
    }

    if (target === "chat_notify") {
      const results = await notifyAdminsOfChatMessage({
        conversationId: "launch-test",
        preview:
          "Launch Control test message — if you received this, chat admin notify is working.",
        topic: "general",
        pagePath: "/admin/launch",
        visitorName: "Launch Control",
        visitorEmail: session.user?.email ?? null,
      });
      const ok = results.some((r) => r.ok);
      return NextResponse.json({
        ok,
        target,
        detail: ok
          ? "Test notify dispatched to ADMIN_EMAILS (and SMS if configured)."
          : results.map((r) => r.error ?? r.channel).join("; "),
        results,
      });
    }

    return NextResponse.json({ error: "Unknown target" }, { status: 400 });
  } catch (err) {
    logger.error("launch_probe_failed", {
      target,
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json({
      ok: false,
      target,
      detail: err instanceof Error ? err.message : "Probe failed",
    });
  }
}
