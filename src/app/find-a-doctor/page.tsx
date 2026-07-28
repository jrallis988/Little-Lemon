import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { DoctorDirectory } from "@/components/doctors/DoctorDirectory";

export const metadata: Metadata = {
  title: "Find a Doctor",
  description:
    "Search by specialty, name, or language. Every doctor listed here sees patients at Boston Children's Hospital.",
};

export default function FindADoctorPage() {
  return (
    <>
      <PageHero
        id="fad-heading"
        eyebrow="Find care"
        title="Find a Doctor"
        lead="Search by specialty, name, or language. Every doctor listed here sees patients at Boston Children's Hospital."
      />
      <Suspense fallback={<div className="wrap py-s8 text-text-meta">Loading directory…</div>}>
        <DoctorDirectory />
      </Suspense>
    </>
  );
}
