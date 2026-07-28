import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { mapMessage } from "@/lib/chat";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, { params }: Params) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const conversation = await prisma.conversation.findUnique({
    where: { id },
    include: {
      messages: { orderBy: { createdAt: "asc" }, take: 200 },
      user: { select: { email: true, name: true } },
    },
  });

  if (!conversation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    conversation: {
      id: conversation.id,
      status: conversation.status,
      topic: conversation.topic,
      pagePath: conversation.pagePath,
      visitorName: conversation.visitorName ?? conversation.user?.name ?? null,
      visitorEmail:
        conversation.visitorEmail ?? conversation.user?.email ?? null,
      lastMessageAt: conversation.lastMessageAt.toISOString(),
      messages: conversation.messages.map(mapMessage),
    },
  });
}
