import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

export const CHAT_SESSION_COOKIE = "trx_chat_sid";

export async function ensureChatSessionKey(): Promise<string> {
  const jar = await cookies();
  const existing = jar.get(CHAT_SESSION_COOKIE)?.value;
  if (existing && existing.length >= 16) return existing;
  const sessionKey = `chat_${crypto.randomUUID().replace(/-/g, "")}`;
  jar.set(CHAT_SESSION_COOKIE, sessionKey, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 90,
  });
  return sessionKey;
}

export function mapMessage(m: {
  id: string;
  sender: string;
  body: string;
  createdAt: Date;
  authorUserId: string | null;
}) {
  return {
    id: m.id,
    sender: m.sender as "visitor" | "support" | "system",
    body: m.body,
    createdAt: m.createdAt.toISOString(),
    authorUserId: m.authorUserId,
  };
}

/** Instant helpful replies about site topics while support is in the queue. */
export function buildAssistReply(visitorText: string): string | null {
  const t = visitorText.toLowerCase();

  if (
    /(insurance|copay|deductible|medicare|part d)/.test(t)
  ) {
    return "Trump RX is a cash discount card — not insurance. Compare the coupon price with your plan copay at the pharmacy and use whichever is lower. On search results, open Insurance vs cash to walk through deductible tradeoffs.";
  }
  if (/(coupon|barcode|bin|pcn|pharmacist|counter)/.test(t)) {
    return "To use a coupon: open Get coupon (or Checkout → Issue digital pass), then show the barcode or have the pharmacist enter BIN / PCN / Group / Member ID. Ask them to process it as a discount card, not insurance.";
  }
  if (/(price|cheap|cost|save|generic|brand)/.test(t)) {
    return "Search your medication, pick dosage and 30- or 90-day supply, then compare nearby pharmacies. The number you see is the counter price with the coupon. Use Benchmarks on the results page for cash price context.";
  }
  if (/(membership|plus|stripe|billing|upgrade)/.test(t)) {
    return "Free covers search, compare, and coupons. Plus is optional for deeper member prices and alerts — upgrade from Membership via secure Stripe checkout. Manage billing anytime from your account.";
  }
  if (/(mail|telehealth|delivery|ship|specialty)/.test(t)) {
    return "If telehealth or mail-order partners are enabled for this site, you’ll see Close the loop on search results. Otherwise fill locally with your coupon at a network pharmacy.";
  }
  if (/(account|sign in|login|password|profile)/.test(t)) {
    return "Create an account to save meds, digital passes, and price alerts across devices. Use Sign up / Sign in in the header — your checkout cart also syncs when you’re signed in.";
  }
  if (/(hello|hi |hey|help|support)/.test(t)) {
    return "Hi — you’re chatting with Trump RX support. Ask about prices, coupons, insurance vs cash, membership, or checkout. A specialist can follow up in this thread.";
  }
  return null;
}

export const WELCOME_MESSAGE =
  "Welcome to Trump RX Messages. Ask about comparing prices, using coupons at the counter, insurance vs cash, membership, or checkout. You’re chatting live in this thread — replies may come from automated assist and our support team.";

export async function getOrCreateOpenConversation(params: {
  userId?: string | null;
  sessionKey: string;
  pagePath?: string;
  visitorName?: string;
  visitorEmail?: string;
  topic?: string;
}) {
  const existing = params.userId
    ? await prisma.conversation.findFirst({
        where: {
          status: { in: ["open", "waiting"] },
          OR: [{ userId: params.userId }, { sessionKey: params.sessionKey }],
        },
        orderBy: { lastMessageAt: "desc" },
        include: { messages: { orderBy: { createdAt: "asc" }, take: 100 } },
      })
    : await prisma.conversation.findFirst({
        where: {
          sessionKey: params.sessionKey,
          status: { in: ["open", "waiting"] },
        },
        orderBy: { lastMessageAt: "desc" },
        include: { messages: { orderBy: { createdAt: "asc" }, take: 100 } },
      });

  if (existing) {
    if (params.userId && !existing.userId) {
      return prisma.conversation.update({
        where: { id: existing.id },
        data: {
          userId: params.userId,
          visitorName: params.visitorName ?? existing.visitorName,
          visitorEmail: params.visitorEmail ?? existing.visitorEmail,
        },
        include: { messages: { orderBy: { createdAt: "asc" }, take: 100 } },
      });
    }
    return existing;
  }

  return prisma.conversation.create({
    data: {
      userId: params.userId ?? null,
      sessionKey: params.sessionKey,
      pagePath: params.pagePath ?? null,
      visitorName: params.visitorName ?? null,
      visitorEmail: params.visitorEmail ?? null,
      topic: params.topic ?? "general",
      status: "open",
      messages: {
        create: {
          sender: "system",
          body: WELCOME_MESSAGE,
        },
      },
    },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });
}
