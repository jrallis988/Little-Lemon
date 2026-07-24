import { create } from "zustand";
import { db, ensureSeedData } from "@/lib/db";
import type { Contact, Draft, FolderId, Message } from "@/types/mail";

interface MailState {
  ready: boolean;
  folder: FolderId;
  selectedMessageId: string | null;
  messages: Message[];
  contacts: Contact[];
  drafts: Draft[];
  searchQuery: string;
  hydrate: () => Promise<void>;
  setFolder: (folder: FolderId) => void;
  selectMessage: (id: string | null) => void;
  markRead: (id: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  saveDraft: (draft: Omit<Draft, "id" | "updatedAt"> & { id?: string }) => Promise<string>;
  sendDraft: (draft: Omit<Draft, "id" | "updatedAt"> & { id?: string }) => Promise<void>;
}

function contactMap(contacts: Contact[]) {
  return new Map(contacts.map((c) => [c.id, c]));
}

export function getContact(
  contacts: Contact[],
  contactId: string,
): Contact | undefined {
  return contactMap(contacts).get(contactId);
}

export const useMailStore = create<MailState>((set, get) => ({
  ready: false,
  folder: "inbox",
  selectedMessageId: null,
  messages: [],
  contacts: [],
  drafts: [],
  searchQuery: "",

  hydrate: async () => {
    await ensureSeedData();
    const [messages, contacts, drafts] = await Promise.all([
      db.messages.orderBy("sentAt").reverse().toArray(),
      db.contacts.toArray(),
      db.drafts.orderBy("updatedAt").reverse().toArray(),
    ]);

    const inboxFirst = messages.find((m) => m.folder === "inbox");
    set({
      ready: true,
      messages,
      contacts,
      drafts,
      selectedMessageId: get().selectedMessageId ?? inboxFirst?.id ?? null,
    });
  },

  setFolder: (folder) => {
    const { messages } = get();
    const first = messages.find((m) => m.folder === folder);
    set({
      folder,
      selectedMessageId: first?.id ?? null,
      searchQuery: "",
    });
  },

  selectMessage: (id) => set({ selectedMessageId: id }),

  markRead: async (id) => {
    await db.messages.update(id, { unread: false });
    set({
      messages: get().messages.map((m) =>
        m.id === id ? { ...m, unread: false } : m,
      ),
    });
  },

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  saveDraft: async (draftInput) => {
    const id = draftInput.id ?? crypto.randomUUID();
    const draft: Draft = {
      id,
      to: draftInput.to,
      subject: draftInput.subject,
      body: draftInput.body,
      updatedAt: new Date().toISOString(),
    };

    await db.drafts.put(draft);
    const drafts = await db.drafts.orderBy("updatedAt").reverse().toArray();
    set({ drafts });
    return id;
  },

  sendDraft: async (draftInput) => {
    const now = new Date().toISOString();
    const message: Message = {
      id: crypto.randomUUID(),
      folder: "sent",
      fromContactId: "c-grandma",
      toLabel: draftInput.to || "Someone special",
      subject: draftInput.subject || "(No subject)",
      preview: draftInput.body.slice(0, 90),
      body: draftInput.body,
      sentAt: now,
      unread: false,
    };

    await db.messages.put(message);
    if (draftInput.id) {
      await db.drafts.delete(draftInput.id);
    }

    const [messages, drafts] = await Promise.all([
      db.messages.orderBy("sentAt").reverse().toArray(),
      db.drafts.orderBy("updatedAt").reverse().toArray(),
    ]);

    set({
      messages,
      drafts,
      folder: "sent",
      selectedMessageId: message.id,
    });
  },
}));
