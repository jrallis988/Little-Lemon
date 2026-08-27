import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { isLimitedV1Launch } from "@/lib/launch-mode";

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

/** Automated help replies — clearly not a human pharmacist or insurer. */
export function buildAssistReply(visitorText: string): string | null {
  const t = visitorText.toLowerCase();
  const limited = isLimitedV1Launch();

  if (/(not listed|isn'?t listed|not included|why isn'?t|missing med)/.test(t)) {
    return limited
      ? "Limited v1 includes 10 generic pharmacy-pickup medications only. If yours isn’t listed, that’s a coverage gap — not a site error. Use Request this medication on the coverage page, or Browse included medications."
      : "TrumpRx only lists select medications. If yours isn’t included, that’s a coverage gap — not a site error. Use Request this medication on the coverage page, or Browse included medications.";
  }
  if (/(cvs|walgreens|my pharmacy|regular pharmacy)/.test(t)) {
    return limited
      ? "Whether you can use CVS, Walgreens, or your regular pharmacy depends on network participation for that medication. Open the medication page → How can I get it? Limited v1 is pharmacy pickup only."
      : "Whether you can use CVS, Walgreens, or your regular pharmacy depends on the medication’s access path. Open the medication page → How can I get it? Manufacturer-direct options usually are not simple retail pickup.";
  }
  if (/(brand-?name|generic|compounded|what am i (getting|receiving))/.test(t)) {
    return "Each medication page has a “What am I actually receiving?” section that states brand-name, generic, or compounded. Don’t assume it matches your usual pharmacy dispense.";
  }
  if (/(eligible|eligibility|qualify|medicare|medicaid|insurance)/.test(t)) {
    return limited
      ? "Open Eligibility & insurance on the medication page. TrumpRx explains typical rules; the pharmacy / processor makes the final eligibility decision — not TrumpRx."
      : "Open Eligibility & insurance on the medication page. TrumpRx explains typical rules; the pharmacy/processor or manufacturer program makes the final eligibility decision — not TrumpRx.";
  }
  if (/(price different|wrong price|incorrect price)/.test(t)) {
    return "Prices can vary by pharmacy, dosage, and program rules. Use Compare your price on the medication page, and Report an issue if something on our site looks wrong. Final price is confirmed at the counter.";
  }
  if (/(how do i get|fulfillment|pickup|ship|who ships|where is my order|delivery)/.test(t)) {
    return limited
      ? "Limited v1 is pharmacy pickup only. Use How can I get it? on the medication page, then Get this price. TrumpRx does not sell or ship medications."
      : "Use How can I get it? on the medication page, then Get this price for the pathway. TrumpRx does not sell or ship medications — the pharmacy or manufacturer program does.";
  }
  if (/(report|incorrect information|broken link)/.test(t)) {
    return "Use Report an issue on medication, pharmacy, pricing, or access screens. You’ll get a reference number after you submit.";
  }
  if (/(coupon|barcode|bin|pcn|pharmacist|counter)/.test(t)) {
    return "After you review eligibility, use Get this price → pharmacy pathway (or Find participating pharmacies) to obtain program information for the counter (barcode / BIN / PCN when applicable). Ask the pharmacist to process it as a discount program, not as insurance.";
  }
  if (/(membership|plus|stripe|billing|subscription|do i have to pay trump)/.test(t)) {
    return limited
      ? "Checking coverage is free. Paid membership / Plus is not offered in the limited v1 launch. You pay the pharmacy for the medication when you fill — not TrumpRx."
      : "Checking coverage does not mean TrumpRx is charging you for a drug. Optional account tools may have a membership — that is separate from paying for medication at a pharmacy. “Free to use” does not mean medications are free.";
  }
  if (/(hello|hi |hey|help)/.test(t)) {
    return limited
      ? "Hi — this is TrumpRx Automated Help (not a human representative). Ask about coverage, the 10 included generics, eligibility, pharmacy pickup, pricing, or how to report an issue."
      : "Hi — this is TrumpRx Automated Help (not a human representative). Ask about coverage, brand vs generic, eligibility, pharmacy vs manufacturer access, pricing differences, or how to report an issue.";
  }
  return null;
}

export const WELCOME_MESSAGE = isLimitedV1Launch()
  ? "TrumpRx Automated Help — not a human representative. Ask why a medication isn’t listed, pharmacy pickup, eligibility, pricing, or how to report incorrect information. Limited v1: 10 generics, pharmacy pickup only."
  : "TrumpRx Automated Help — not a human representative. Ask why a medication isn’t listed, whether CVS/Walgreens apply, brand vs generic, eligibility, how to get your medication, shipping, or how to report incorrect information.";

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
