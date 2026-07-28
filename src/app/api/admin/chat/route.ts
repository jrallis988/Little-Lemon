import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { logger } from "@/lib/logger";
import { mapMessage } from "@/lib/chat";

/** List support conversations for admins. */
export async function GET(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const status = new URL(req.url).searchParams.get("status") ?? "open";
  const where =
    status === "all"
      ? {}
      : status === "open"
        ? { status: { in: ["open", "waiting"] } }
        : { status };

  const conversations = await prisma.conversation.findMany({
    where,
    orderBy: { lastMessageAt: "desc" },
    take: 50,
    include: {
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
      user: { select: { email: true, name: true } },
      _count: { select: { messages: true } },
    },
  });

  return NextResponse.json({
    conversations: conversations.map((c) => ({
      id: c.id,
      status: c.status,
      topic: c.topic,
      visitorName: c.visitorName ?? c.user?.name ?? null,
      visitorEmail: c.visitorEmail ?? c.user?.email ?? null,
      pagePath: c.pagePath,
      lastMessageAt: c.lastMessageAt.toISOString(),
      messageCount: c._count.messages,
      preview: c.messages[0]?.body?.slice(0, 140) ?? "",
    })),
  });
}

const replySchema = z.object({
  conversationId: z.string().min(1),
  body: z.string().trim().min(1).max(2000),
  close: z.boolean().optional(),
});

/** Admin reply into a conversation. */
export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = replySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid reply" }, { status: 400 });
  }

  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: parsed.data.conversationId },
    });
    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    const message = await prisma.message.create({
      data: {
        conversationId: conversation.id,
        sender: "support",
        body: parsed.data.body,
        authorUserId: session.user.id,
      },
    });

    await prisma.conversation.update({
      where: { id: conversation.id },
      data: {
        status: parsed.data.close ? "closed" : "open",
        lastMessageAt: new Date(),
      },
    });

    const messages = await prisma.message.findMany({
      where: { conversationId: conversation.id },
      orderBy: { createdAt: "asc" },
      take: 200,
    });

    return NextResponse.json({
      message: mapMessage(message),
      messages: messages.map(mapMessage),
      status: parsed.data.close ? "closed" : "open",
    });
  } catch (err) {
    logger.error("admin_chat_reply_failed", {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json({ error: "Could not send reply." }, { status: 500 });
  }
}
