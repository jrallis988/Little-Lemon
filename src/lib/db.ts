import Dexie, { type EntityTable } from "dexie";
import { SEED_CONTACTS, SEED_DRAFTS, SEED_MESSAGES } from "@/data/seed";
import type { Contact, Draft, Message } from "@/types/mail";

class MailNestDB extends Dexie {
  messages!: EntityTable<Message, "id">;
  contacts!: EntityTable<Contact, "id">;
  drafts!: EntityTable<Draft, "id">;

  constructor() {
    super("mailnest");
    this.version(1).stores({
      messages: "id, folder, sentAt, unread, fromContactId",
      contacts: "id, email, safety",
      drafts: "id, updatedAt",
    });
  }
}

export const db = new MailNestDB();

let seedPromise: Promise<void> | null = null;

export async function ensureSeedData(): Promise<void> {
  if (seedPromise) return seedPromise;

  seedPromise = (async () => {
    const count = await db.messages.count();
    if (count > 0) return;

    await db.transaction("rw", db.messages, db.contacts, db.drafts, async () => {
      await db.contacts.bulkAdd(SEED_CONTACTS);
      await db.messages.bulkAdd(SEED_MESSAGES);
      await db.drafts.bulkAdd(SEED_DRAFTS);
    });
  })();

  return seedPromise;
}
