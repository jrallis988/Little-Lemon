"use client";

import { useState } from "react";
import { CurriculumCard } from "@/components/CurriculumCard";

type Pathway = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: { href: string; label: string };
  cards: Array<{
    title: string;
    description: string;
    kind: "module" | "diagnostic" | "structure";
    items: string[];
    href: string;
    imageSrc: string;
    imageAlt: string;
  }>;
};

const pathways: Pathway[] = [
  {
    id: "intervention-kit",
    label: "Intervention Kit",
    eyebrow: "Core program",
    title: "A complete intervention kit for students who need a different route to mastery.",
    description:
      "Designed for classrooms, tutoring programs, and pull-out support periods, this package combines diagnostics, targeted lessons, and progress tracking in one adoptable program.",
    cta: { href: "#start", label: "Request school pricing" },
    cards: [
      {
        title: "Placement & learning profile diagnostic",
        description:
          "Place each student into the right starting point with screening tools that identify both skill gaps and learning-style preferences.",
        kind: "diagnostic",
        items: [
          "Teacher-ready placement screener",
          "Learning-style inventory",
          "Baseline comprehension check",
        ],
        href: "#start",
        imageSrc: "/images/card-diagnostic.jpg",
        imageAlt: "Teacher reviewing classroom diagnostic materials",
      },
      {
        title: "Teacher-led lesson modules",
        description:
          "Structured lesson sets that reteach core concepts through visual, auditory, kinesthetic, and verbal pathways so more students can access the material.",
        kind: "module",
        items: [
          "Print and digital lesson paths",
          "Small-group intervention activities",
          "Practice and reinforcement sets",
        ],
        href: "#curriculum",
        imageSrc: "/images/card-modules.jpg",
        imageAlt: "Students using classroom learning materials",
      },
      {
        title: "Progress monitoring system",
        description:
          "Keep instruction organized with checkpoints, remediation guidance, and progress reporting that teachers can actually use week to week.",
        kind: "structure",
        items: [
          "Weekly mastery checks",
          "Intervention regrouping guidance",
          "Family-facing progress summaries",
        ],
        href: "#curriculum",
        imageSrc: "/images/card-path.jpg",
        imageAlt: "Teacher leading a focused support group",
      },
    ],
  },
  {
    id: "classroom-adoption",
    label: "Classroom Adoption",
    eyebrow: "For teachers and schools",
    title: "Adopt Morgan Bright for one classroom, one grade, or a full intervention block.",
    description:
      "Choose the rollout that fits your setting: pilot in one class, equip a grade-level team, or standardize support across intervention staff.",
    cta: { href: "#start", label: "Talk to a program specialist" },
    cards: [
      {
        title: "Single-classroom starter set",
        description:
          "Everything a teacher needs to launch Morgan Bright with one group of students and begin targeted support quickly.",
        kind: "diagnostic",
        items: [
          "Placement tools included",
          "Core lesson set",
          "Teacher guide and pacing map",
        ],
        href: "#start",
        imageSrc: "/images/card-diagnostic.jpg",
        imageAlt: "Starter classroom curriculum materials",
      },
      {
        title: "Grade-level classroom pack",
        description:
          "A broader package for teams who want shared diagnostics, consistent instructional routines, and aligned progress monitoring.",
        kind: "module",
        items: [
          "Multiple teacher licenses",
          "Shared reporting tools",
          "Team implementation resources",
        ],
        href: "#curriculum",
        imageSrc: "/images/card-modules.jpg",
        imageAlt: "Grade-level educators using instructional tools",
      },
      {
        title: "School intervention package",
        description:
          "For schools building a dedicated support program with consistent materials, implementation support, and program oversight.",
        kind: "structure",
        items: [
          "Program onboarding support",
          "Intervention-block planning tools",
          "Administrative visibility",
        ],
        href: "#curriculum",
        imageSrc: "/images/card-path.jpg",
        imageAlt: "School staff planning intervention rollout",
      },
    ],
  },
  {
    id: "home-support",
    label: "Home Support",
    eyebrow: "Family companion materials",
    title: "Optional take-home support for families who want reinforcement between lessons.",
    description:
      "Like the best home-learning programs of the past, Morgan Bright can extend beyond the classroom with simple, guided reinforcement materials.",
    cta: { href: "#start", label: "Ask about family packs" },
    cards: [
      {
        title: "Family progress guide",
        description:
          "A plain-language summary that helps caregivers understand where a student is struggling and how the program is addressing it.",
        kind: "diagnostic",
        items: [
          "Readable learner profile",
          "Weekly focus summary",
          "Questions families can ask",
        ],
        href: "#start",
        imageSrc: "/images/card-diagnostic.jpg",
        imageAlt: "Caregiver reviewing student learning guide",
      },
      {
        title: "Take-home practice pack",
        description:
          "Short reinforcement activities aligned to the same modalities students use in class, so home practice actually matches instruction.",
        kind: "module",
        items: [
          "Short printed practice sets",
          "Style-matched review activities",
          "Parent cueing notes",
        ],
        href: "#curriculum",
        imageSrc: "/images/card-modules.jpg",
        imageAlt: "Student completing take-home practice",
      },
      {
        title: "School-to-home progress reports",
        description:
          "Keep school and home aligned with progress reports that show milestones, next steps, and where added practice is helping most.",
        kind: "structure",
        items: [
          "Milestone visibility",
          "Recommended next steps",
          "Simple follow-up prompts",
        ],
        href: "#curriculum",
        imageSrc: "/images/card-path.jpg",
        imageAlt: "Family reviewing progress updates",
      },
    ],
  },
];

export function AudiencePathways() {
  const [activeId, setActiveId] = useState(pathways[0].id);
  const active = pathways.find((pathway) => pathway.id === activeId) ?? pathways[0];

  return (
    <section id="pathways" className="bg-white">
      <div className="border-b border-line bg-paper-warm">
        <div
          className="mx-auto flex max-w-site gap-1 overflow-x-auto px-5 sm:px-8"
          role="tablist"
          aria-label="Audience pathways"
        >
          {pathways.map((pathway) => {
            const selected = pathway.id === active.id;
            return (
              <button
                key={pathway.id}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`tab-${pathway.id}`}
                aria-controls={`panel-${pathway.id}`}
                className={`shrink-0 border-b-4 px-4 py-4 text-sm font-bold transition-colors sm:px-6 sm:text-base ${
                  selected
                    ? "border-accent text-navy"
                    : "border-transparent text-mute hover:text-navy"
                }`}
                onClick={() => setActiveId(pathway.id)}
              >
                {pathway.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        className="mx-auto max-w-site px-5 py-14 sm:px-8 sm:py-20"
      >
        <p className="section-label">{active.eyebrow}</p>
        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-navy text-balance sm:text-4xl">
              {active.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-mute">
              {active.description}
            </p>
          </div>
          <a href={active.cta.href} className="btn-primary shrink-0 self-start lg:self-auto">
            {active.cta.label}
          </a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {active.cards.map((card) => (
            <CurriculumCard key={`${active.id}-${card.title}`} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
