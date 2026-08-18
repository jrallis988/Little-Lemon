import type { GradeLevel, LearningStage } from "@/types/mail";
import { stageFromGrade } from "@/types/mail";

export interface StageCopy {
  tagline: string;
  composeTitle: string;
  composeHint: string;
  composeCta: string;
  toPlaceholder: string;
  subjectPlaceholder: string;
  bodyPlaceholder: string;
  safetyFooter: string;
  safeContactsHint: string;
  unknownSenderHint: string;
  showFolderDescriptions: boolean;
  classLabel: string;
  course: string;
  learningTarget: string;
  genreLabel: string;
}

const BASE: Omit<
  StageCopy,
  "classLabel" | "course" | "learningTarget" | "composeCta" | "composeTitle"
> = {
  tagline: "",
  composeHint: "",
  toPlaceholder: "To",
  subjectPlaceholder: "Subject",
  bodyPlaceholder: "",
  safetyFooter: "",
  safeContactsHint: "Approved contacts for this class.",
  unknownSenderHint: "Unknown sender. Ask a teacher before you reply.",
  showFolderDescriptions: false,
  genreLabel: "",
};

export const STAGE_COPY: Record<LearningStage, StageCopy> = {
  elementary: {
    ...BASE,
    composeTitle: "New message",
    composeCta: "Compose",
    bodyPlaceholder: "Hi,\n\n\nThank you,\n",
    classLabel: "Ms. Alvarez",
    course: "Homeroom",
    learningTarget: "",
  },
  middle: {
    ...BASE,
    composeTitle: "Compose",
    composeCta: "Compose",
    bodyPlaceholder: "Hi,\n\nI am writing because…\n\nThank you,\n",
    classLabel: "Ms. Alvarez",
    course: "ELA",
    learningTarget: "",
  },
  high: {
    ...BASE,
    composeTitle: "Compose",
    composeCta: "Compose",
    classLabel: "Alvarez",
    course: "English 10",
    learningTarget: "",
  },
};

export function copyForGrade(grade: GradeLevel): StageCopy {
  return STAGE_COPY[stageFromGrade(grade)];
}
