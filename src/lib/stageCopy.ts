import type { GradeLevel, LearningStage } from "@/types/mail";
import { stageFromGrade } from "@/types/mail";

export interface StageCopy {
  composeTitle: string;
  composeCta: string;
  toPlaceholder: string;
  subjectPlaceholder: string;
  unknownSenderHint: string;
  classLabel: string;
  course: string;
}

const BASE: Omit<StageCopy, "classLabel" | "course" | "composeCta" | "composeTitle"> =
  {
    toPlaceholder: "",
    subjectPlaceholder: "",
    unknownSenderHint: "Unknown sender. Ask a teacher before you reply.",
  };

export const STAGE_COPY: Record<LearningStage, StageCopy> = {
  elementary: {
    ...BASE,
    composeTitle: "New message",
    composeCta: "Compose",
    classLabel: "Ms. Alvarez",
    course: "Homeroom",
  },
  middle: {
    ...BASE,
    composeTitle: "Compose",
    composeCta: "Compose",
    classLabel: "Ms. Alvarez",
    course: "ELA",
  },
  high: {
    ...BASE,
    composeTitle: "Compose",
    composeCta: "Compose",
    classLabel: "Alvarez",
    course: "English 10",
  },
};

export function copyForGrade(grade: GradeLevel): StageCopy {
  return STAGE_COPY[stageFromGrade(grade)];
}
