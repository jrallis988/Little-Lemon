export type FolderId = "inbox" | "drafts" | "sent" | "safe-contacts";

export type SafetyLevel = "verified" | "trusted" | "unknown";

/** Experience profile derived from the selected grade. */
export type LearningStage = "elementary" | "middle" | "high";

/** Individual grade levels across K–12. */
export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const ALL_GRADES: GradeLevel[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
];

export function stageFromGrade(grade: GradeLevel): LearningStage {
  if (grade <= 5) return "elementary";
  if (grade <= 8) return "middle";
  return "high";
}

export function bandLabelForGrade(grade: GradeLevel): string {
  const stage = stageFromGrade(grade);
  if (stage === "elementary") return "Elementary";
  if (stage === "middle") return "Middle school";
  return "High school";
}

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
