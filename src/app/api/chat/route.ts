import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import {
  buildAssistReply,
  ensureChatSessionKey,
  getOrCreateOpenConversation,
  mapMessage,
} from "@/lib/chat";

export async function GET() {
  try {
    const session = await auth();
    const sessionKey = await ensureChatSessionKey();
    const conversation = await getOrCreateOpenConversation({
      userId: session?.user?.id,
      sessionKey,
      visitorName: session?.user?.name ?? undefined,
      visitorEmail: session?.user?.email ?? undefined,
    });

    return NextResponse.json({
      conversation: {
        id: conversation.id,
        status: conversation.status,
        topic: conversation.topic,
        messages: conversation.messages.map(mapMessage),
      },
    });
  } catch (err) {
    logger.error("chat_get_failed", {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { error: "Could not load messages." },
      { status: 500 }
    );
  }
}

const postSchema = z.object({
  body: z.string().trim().min(1).max(2000),
  pagePath: z.string().max(200).optional(),
  topic: z
    .enum(["general", "pricing", "coupon", "membership", "pharmacy"])
    .optional(),
  visitorName: z.string().trim().max(80).optional(),
  visitorEmail: z.string().trim().email().optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const parsed = postSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Message must be 1–2000 characters." },
      { status: 400 }
    );
  }

  try {
    const session = await auth();
    const sessionKey = await ensureChatSessionKey();
    const conversation = await getOrCreateOpenConversation({
      userId: session?.user?.id,
      sessionKey,
      pagePath: parsed.data.pagePath,
      topic: parsed.data.topic,
      visitorName:
        parsed.data.visitorName || session?.user?.name || undefined,
      visitorEmail:
        parsed.data.visitorEmail || session?.user?.email || undefined,
    });

    const visitorMsg = await prisma.message.create({
      data: {
        conversationId: conversation.id,
        sender: "visitor",
        body: parsed.data.body,
        authorUserId: session?.user?.id ?? null,
      },
    });

    const assist = buildAssistReply(parsed.data.body);
    let assistMsg = null;
    if (assist) {
      assistMsg = await prisma.message.create({
        data: {
          conversationId: conversation.id,
          sender: "system",
          body: assist,
        },
      });
    }

    await prisma.conversation.update({
      where: { id: conversation.id },
      data: {
        status: "waiting",
        lastMessageAt: new Date(),
        topic: parsed.data.topic ?? conversation.topic,
        pagePath: parsed.data.pagePath ?? conversation.pagePath,
        visitorName:
          parsed.data.visitorName || conversation.visitorName || null,
        visitorEmail:
          parsed.data.visitorEmail || conversation.visitorEmail || null,
      },
    });

    const messages = await prisma.message.findMany({
      where: { conversationId: conversation.id },
      orderBy: { createdAt: "asc" },
      take: 120,
    });

    return NextResponse.json({
      conversation: {
        id: conversation.id,
        status: "waiting",
        topic: parsed.data.topic ?? conversation.topic,
        messages: messages.map(mapMessage),
      },
      queued: true,
      latest: mapMessage(visitorMsg),
      assist: assistMsg ? mapMessage(assistMsg) : null,
    });
  } catch (err) {
    logger.error("chat_post_failed", {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { error: "Could not send message. Please try again." },
      { status: 500 }
    );
  }
}
