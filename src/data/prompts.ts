import type { GradeLevel, WritingPrompt } from "@/types/mail";

export const WRITING_PROMPTS: WritingPrompt[] = [
  {
    id: "ask-teacher",
    title: "Ask a teacher",
    description: "Ask for help or clarification.",
    subject: "Question about class",
    body: "Hi,\n\nI have a question about ____________________.\nCould you please help me understand ____________________?\n\nThank you,\n",
    minGrade: 1,
    maxGrade: 12,
  },
  {
    id: "thank-you",
    title: "Thank-you",
    description: "Acknowledge help with a specific reason.",
    subject: "Thank you",
    body: "Hi,\n\nThank you for ____________________.\nIt helped me ____________________.\n\nSincerely,\n",
    minGrade: 1,
    maxGrade: 8,
  },
  {
    id: "peer-feedback",
    title: "Peer feedback",
    description: "One strength and one revision suggestion.",
    subject: "Feedback on your draft",
    body: "Hi,\n\nI liked ____________________ because ____________________.\nOne suggestion is ____________________.\n\nThanks,\n",
    minGrade: 3,
    maxGrade: 12,
  },
  {
    id: "project-update",
    title: "Project update",
    description: "Progress, blockers, and next steps.",
    subject: "Project update",
    body: "Hi,\n\nHere is my update:\n- Finished: ____________________\n- Working on: ____________________\n- Need help with: ____________________\n\nThank you,\n",
    minGrade: 4,
    maxGrade: 12,
  },
  {
    id: "formal-request",
    title: "Formal request",
    description: "A respectful request with a reason.",
    subject: "Request regarding",
    body: "Hello,\n\nI am writing to request ____________________.\nThe reason is ____________________.\nPlease let me know if that is possible.\n\nRespectfully,\n",
    minGrade: 6,
    maxGrade: 12,
  },
  {
    id: "college-inquiry",
    title: "Formal inquiry",
    description: "Request information in a professional register.",
    subject: "Inquiry about",
    body: "Hello,\n\nMy name is ____________________, and I am a student at ____________________.\nI am writing to inquire about ____________________.\nCould you please share more information about ____________________?\n\nThank you for your time,\n",
    minGrade: 9,
    maxGrade: 12,
  },
];

export function promptsForGrade(grade: GradeLevel): WritingPrompt[] {
  return WRITING_PROMPTS.filter((p) => grade >= p.minGrade && grade <= p.maxGrade);
}
