import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  ensureWelcomeNotifications,
  listNotifications,
  markNotificationRead,
} from "@/lib/notifications";
import { getUserByEmail, updateUser } from "@/lib/users";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session?.userId && !session?.email) {
    return NextResponse.json({ notifications: [], prefs: null }, { status: 401 });
  }

  let userId = session.userId;
  if (!userId && session.email) {
    const user = await getUserByEmail(session.email);
    userId = user?.id ?? null;
  }
  if (!userId) {
    return NextResponse.json({ notifications: [], prefs: null });
  }

  const notifications = await ensureWelcomeNotifications(userId);
  const user = await getUserByEmail(session.email);
  return NextResponse.json({
    notifications,
    prefs: user?.prefs ?? null,
  });
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    notificationId?: string;
    prefs?: Partial<{
      pushEnabled: boolean;
      emailMarketing: boolean;
      crowdAlerts: boolean;
      billingAlerts: boolean;
      language: string;
    }>;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const user = await getUserByEmail(session.email);
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  if (body.notificationId) {
    await markNotificationRead(body.notificationId, user.id);
  }

  if (body.prefs) {
    await updateUser(user.id, {
      prefs: { ...user.prefs, ...body.prefs },
    });
  }

  return NextResponse.json({
    notifications: await listNotifications(user.id),
    prefs: (await getUserByEmail(session.email))?.prefs ?? null,
  });
}
