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
    this.version(3).upgrade(async (tx) => {
      for (const seed of SEED_MESSAGES) {
        const existing = await tx.table("messages").get(seed.id);
        if (existing) {
          await tx.table("messages").update(seed.id, {
            subject: seed.subject,
            preview: seed.preview,
            body: seed.body,
          });
        }
      }
    });
    this.version(4).upgrade(async (tx) => {
      const settings = await tx.table("settings").get("app");
      await tx.table("settings").put({
        ...DEFAULT_SETTINGS,
        ...settings,
        studentName: settings?.studentName ?? DEFAULT_SETTINGS.studentName,
        schoolName: settings?.schoolName ?? DEFAULT_SETTINGS.schoolName,
      });

      for (const contact of SEED_CONTACTS) {
        const existing = await tx.table("contacts").get(contact.id);
        if (existing) {
          await tx.table("contacts").update(contact.id, {
            category: contact.category,
            relationship: contact.relationship,
            avatarColor: contact.avatarColor,
          });
        }
      }

      for (const seed of SEED_MESSAGES) {
        await tx.table("messages").put(seed);
      }
      for (const draft of SEED_DRAFTS) {
        await tx.table("drafts").put(draft);
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
    } else {
      await db.settings.put({ ...DEFAULT_SETTINGS, ...settings });
    }

    const count = await db.messages.count();
    if (count > 0) {
      const pending = await db.messages.get("m8");
      if (!pending) {
        const seedPending = SEED_MESSAGES.find((m) => m.id === "m8");
        if (seedPending) await db.messages.put(seedPending);
      }
      const returned = await db.messages.get("draft-msg-d2");
      if (!returned) {
        const seedReturned = SEED_MESSAGES.find((m) => m.id === "draft-msg-d2");
        if (seedReturned) await db.messages.put(seedReturned);
        const draft = SEED_DRAFTS.find((d) => d.id === "d2");
        if (draft) await db.drafts.put(draft);
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
