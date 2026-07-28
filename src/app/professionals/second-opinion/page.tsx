import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ProfessionalRequestForm } from "@/components/forms/ProfessionalRequestForm";

export const metadata: Metadata = {
  title: "Request a Pediatric Second Opinion",
  description:
    "Request a second opinion from a Boston Children's Hospital pediatric specialist.",
};

export default function SecondOpinionPage() {
  return (
    <>
      <PageHero
        id="second-opinion-heading"
        eyebrow="Expert review"
        title="Request a second opinion"
        lead="Ask a Boston Children's specialist to review a diagnosis or treatment plan and clarify possible next steps."
      />
      <div className="wrap py-s7 pb-s10">
        <div className="mb-s7 grid grid-cols-1 gap-s4 md:grid-cols-3">
          {[
            ["1. Tell us the question", "Share the diagnosis, specialty, and decision you want the review to address."],
            ["2. Gather records", "Clinical notes, imaging, pathology, and test results may be needed before review can begin."],
            ["3. Team review", "The appropriate program confirms eligibility, required records, timing, and any cost before proceeding."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-md border border-border bg-white p-s5">
              <h2 className="mb-s2 text-lg font-bold text-ocean">{title}</h2>
              <p className="text-sm font-light text-text-body">{body}</p>
            </article>
          ))}
        </div>
        <ProfessionalRequestForm mode="second-opinion" />
      </div>
    </>
  );
}
