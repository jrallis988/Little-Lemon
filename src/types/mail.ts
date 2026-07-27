export type FolderId = "inbox" | "drafts" | "sent" | "safe-contacts";

export type SafetyLevel = "verified" | "trusted" | "unknown";

/** Progressive experience bands across K–12 — same product, maturing UI. */
export type LearningStage = "elementary" | "middle" | "high";

export interface Contact {
  id: string;
  name: string;
  email: string;
  avatarColor: string;
  initials: string;
  safety: SafetyLevel;
  relationship?: string;
}

export interface Message {
  id: string;
  folder: FolderId;
  fromContactId: string;
  toLabel: string;
  subject: string;
  preview: string;
  body: string;
  sentAt: string;
  unread: boolean;
  hasAttachment?: boolean;
}

export interface Draft {
  id: string;
  to: string;
  subject: string;
  body: string;
  updatedAt: string;
}

export interface FolderMeta {
  id: FolderId;
  label: string;
  description: string;
  verified?: boolean;
}
