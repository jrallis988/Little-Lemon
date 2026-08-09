import {
  newId,
  readStore,
  updateStore,
  type NotificationRecord,
} from "@/lib/db";

export async function listNotifications(userId: string) {
  const store = await readStore();
  return store.notifications.filter((item) => item.userId === userId);
}

export async function pushNotification(
  input: Omit<NotificationRecord, "id" | "createdAt" | "readAt">
) {
  const row: NotificationRecord = {
    ...input,
    id: newId("ntf"),
    createdAt: new Date().toISOString(),
    readAt: null,
  };
  await updateStore((store) => {
    store.notifications.unshift(row);
    store.notifications = store.notifications.slice(0, 100);
  });
  return row;
}

export async function markNotificationRead(id: string, userId: string) {
  await updateStore((store) => {
    const row = store.notifications.find(
      (item) => item.id === id && item.userId === userId
    );
    if (row && !row.readAt) row.readAt = new Date().toISOString();
  });
}

export async function ensureWelcomeNotifications(userId: string) {
  const existing = await listNotifications(userId);
  if (existing.length) return existing;
  await pushNotification({
    userId,
    kind: "system",
    title: "Welcome to the PF app",
    body: "Check in, open your digital keytag, and peek at Crowd Meter.",
    href: "/app/check-in",
  });
  await pushNotification({
    userId,
    kind: "perk",
    title: "Member perks unlocked",
    body: "See current partner offers in Perks.",
    href: "/app/perks",
  });
  return listNotifications(userId);
}
