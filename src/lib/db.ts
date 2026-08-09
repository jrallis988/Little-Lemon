import Dexie, { type EntityTable } from "dexie";
import {
  DEFAULT_SETTINGS,
  SEED_CONTACTS,
  SEED_DRAFTS,
  SEED_MESSAGES,
} from "@/data/seed";
import type { AppSettings, Contact, Draft, Message } from "@/types/mail";

class MailboxDB extends Dexie {
  messages!: EntityTable<Message, "id">;
  contacts!: EntityTable<Contact, "id">;
  drafts!: EntityTable<Draft, "id">;
  settings!: EntityTable<AppSettings, "id">;

  constructor() {
    super("mailbox");
    this.version(1).stores({
      messages: "id, folder, sentAt, unread, fromContactId",
      contacts: "id, email, safety",
      drafts: "id, updatedAt",
    });
    this.version(2)
      .stores({
        messages: "id, folder, sentAt, unread, fromContactId, approvalStatus",
        contacts: "id, email, safety",
        drafts: "id, updatedAt",
        settings: "id",
      })
      .upgrade(async (tx) => {
        await tx.table("settings").put(DEFAULT_SETTINGS);
        const messages = await tx.table("messages").toArray();
        for (const message of messages) {
          if (!message.approvalStatus) {
            await tx.table("messages").update(message.id, {
              approvalStatus:
                message.folder === "pending" ? "pending" : "none",
            });
          }
        }
      });
  }
}

export const db = new MailboxDB();

let seedPromise: Promise<void> | null = null;

export async function ensureSeedData(): Promise<void> {
  if (seedPromise) return seedPromise;

  seedPromise = (async () => {
    const settings = await db.settings.get("app");
    if (!settings) {
      await db.settings.put(DEFAULT_SETTINGS);
    }

    const count = await db.messages.count();
    if (count > 0) {
      // Ensure pending demo message exists for upgraded DBs.
      const pending = await db.messages.get("m8");
      if (!pending) {
        const seedPending = SEED_MESSAGES.find((m) => m.id === "m8");
        if (seedPending) await db.messages.put(seedPending);
      }
      return;
    }

    await db.transaction(
      "rw",
      db.messages,
      db.contacts,
      db.drafts,
      db.settings,
      async () => {
        await db.settings.put(DEFAULT_SETTINGS);
        await db.contacts.bulkAdd(SEED_CONTACTS);
        await db.messages.bulkAdd(SEED_MESSAGES);
        await db.drafts.bulkAdd(SEED_DRAFTS);
      },
    );
  })();

  return seedPromise;
}
