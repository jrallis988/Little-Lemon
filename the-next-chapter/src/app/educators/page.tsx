import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "Educators & Librarians",
  description: "Reading guides, classroom activities, discussion questions, and printable materials for educators and librarians.",
};

export default function EducatorsPage() {
  return (
    <ComingSoonPage
      title="Educator & Library Hub"
      description="Reading guides, classroom activities, discussion questions, and printable materials are coming in the next development phase."
    />
  );
}
