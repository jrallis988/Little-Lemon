export type FolderId =
  | "inbox"
  | "drafts"
  | "sent"
  | "pending"
  | "safe-contacts";

export type SafetyLevel = "verified" | "trusted" | "unknown";

/** Experience profile derived from the selected grade. */
export type LearningStage = "elementary" | "middle" | "high";

/** Individual grade levels across K–12. */
export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type ApprovalStatus = "none" | "pending" | "approved" | "rejected";

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

export interface AttachmentMeta {
  id: string;
  name: string;
  size: number;
  type: string;
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
  attachments?: AttachmentMeta[];
  approvalStatus?: ApprovalStatus;
  replyToId?: string;
}

export interface Draft {
  id: string;
  to: string;
  subject: string;
  body: string;
  updatedAt: string;
  attachments?: AttachmentMeta[];
  replyToId?: string;
}

export interface FolderMeta {
  id: FolderId;
  label: string;
  description: string;
  verified?: boolean;
}

export interface AppSettings {
  id: "app";
  onboardingComplete: boolean;
  requireSendApproval: boolean;
  /** Demo PIN for teacher unlock — replace with real auth later. */
  teacherPin: string;
  defaultGrade: GradeLevel;
}

export interface WritingPrompt {
  id: string;
  title: string;
  description: string;
  subject: string;
  body: string;
  minGrade: GradeLevel;
  maxGrade: GradeLevel;
}
