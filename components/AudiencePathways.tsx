"use client";

import { useState } from "react";
import { CurriculumCard } from "@/components/CurriculumCard";

type Plan = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: { href: string; label: string };
  cards: Array<{
    title: string;
    description: string;
    kind: "feature" | "plan" | "workflow";
    items: string[];
    href: string;
    imageSrc: string;
    imageAlt: string;
    ctaLabel: string;
  }>;
};

const plans: Plan[] = [
  {
    id: "classroom",
    label: "Classroom",
    eyebrow: "Best for individual teachers",
    title: "A classroom license for teachers who need flexible intervention tools now.",
    description:
      "Give one teacher a full software workspace: learner diagnostics, adaptive lesson paths, and progress tracking for their own students.",
    cta: { href: "#buy", label: "Get classroom pricing" },
    cards: [
      {
        title: "Teacher workspace",
        description:
          "Set up classes, assign diagnostics, and launch lessons from one simple teacher dashboard.",
        kind: "plan",
        items: [
          "1 teacher seat",
          "Up to 35 student profiles",
          "Class-level reporting",
        ],
        href: "#buy",
        imageSrc: "/images/card-diagnostic.jpg",
        imageAlt: "Teacher reviewing student progress on academic software",
        ctaLabel: "See classroom plan",
      },
      {
        title: "Adaptive lesson library",
        description:
          "Assign modules that present the same skill through visual, auditory, kinesthetic, and verbal pathways.",
        kind: "feature",
        items: [
          "Ready-to-assign lesson paths",
          "Built-in practice checks",
          "Reteach options by learning style",
        ],
        href: "#features",
        imageSrc: "/images/card-modules.jpg",
        imageAlt: "Students learning with digital classroom tools",
        ctaLabel: "Explore features",
      },
      {
        title: "Student progress view",
        description:
          "See who is stuck, why they are stuck, and which instructional path is working best.",
        kind: "workflow",
        items: [
          "Mastery checkpoints",
          "Barrier tags",
          "Family-ready summaries",
        ],
        href: "#features",
        imageSrc: "/images/card-path.jpg",
        imageAlt: "Teacher monitoring classroom learning outcomes",
        ctaLabel: "See how tracking works",
      },
    ],
  },
  {
    id: "school",
    label: "School",
    eyebrow: "Best for campuses and intervention teams",
    title: "A school license for shared use across teachers, grades, and support staff.",
    description:
      "Standardize diagnostics and intervention workflows across a campus while giving leaders visibility into student progress.",
    cta: { href: "#buy", label: "Get school pricing" },
    cards: [
      {
        title: "Multi-teacher access",
        description:
          "Equip classroom teachers and interventionists with shared tools, consistent workflows, and aligned reporting.",
        kind: "plan",
        items: [
          "Multiple teacher seats",
          "Shared student records",
          "Campus implementation guide",
        ],
        href: "#buy",
        imageSrc: "/images/card-diagnostic.jpg",
        imageAlt: "School staff collaborating around instructional software",
        ctaLabel: "See school plan",
      },
      {
        title: "Intervention team workflows",
        description:
          "Coordinate pull-out support, regrouping decisions, and reteach cycles without rebuilding the process each week.",
        kind: "workflow",
        items: [
          "Group and individual assignment",
          "Regrouping recommendations",
          "Shared notes across staff",
        ],
        href: "#features",
        imageSrc: "/images/card-modules.jpg",
        imageAlt: "Intervention team planning with digital tools",
        ctaLabel: "Explore workflows",
      },
      {
        title: "Campus reporting",
        description:
          "Give administrators a clear view of usage, student movement, and where support is making an impact.",
        kind: "feature",
        items: [
          "School-wide dashboards",
          "Teacher activity overview",
          "Exportable progress reports",
        ],
        href: "#features",
        imageSrc: "/images/card-path.jpg",
        imageAlt: "School leaders reviewing academic progress data",
        ctaLabel: "See reporting tools",
      },
    ],
  },
  {
    id: "district",
    label: "District",
    eyebrow: "Best for multi-school rollout",
    title: "A district license for consistent academic support software across schools.",
    description:
      "Deploy Morgan Bright with centralized administration, implementation support, and reporting built for district decision-makers.",
    cta: { href: "#buy", label: "Talk to district sales" },
    cards: [
      {
        title: "Centralized administration",
        description:
          "Manage schools, seats, and permissions from one district control layer while keeping classroom tools simple for teachers.",
        kind: "plan",
        items: [
          "Multi-school provisioning",
          "Role-based access",
          "District onboarding support",
        ],
        href: "#buy",
        imageSrc: "/images/card-diagnostic.jpg",
        imageAlt: "District team reviewing academic software rollout",
        ctaLabel: "See district plan",
      },
      {
        title: "Implementation support",
        description:
          "Get rollout guidance, training pathways, and adoption support so schools start strong and stay consistent.",
        kind: "workflow",
        items: [
          "Training for teachers and coaches",
          "Rollout timeline guidance",
          "Ongoing success check-ins",
        ],
        href: "#buy",
        imageSrc: "/images/card-modules.jpg",
        imageAlt: "Educators in software training session",
        ctaLabel: "Ask about rollout",
      },
      {
        title: "District insights",
        description:
          "Compare schools, monitor adoption, and identify where learning-style-based intervention is closing gaps.",
        kind: "feature",
        items: [
          "Cross-school reporting",
          "Adoption and usage metrics",
          "Leadership summary views",
        ],
        href: "#features",
        imageSrc: "/images/card-path.jpg",
        imageAlt: "Leaders reviewing district learning outcomes",
        ctaLabel: "See district insights",
      },
    ],
  },
];

export function AudiencePathways() {
  const [activeId, setActiveId] = useState(plans[0].id);
  const active = plans.find((plan) => plan.id === activeId) ?? plans[0];

  return (
    <section id="plans" className="bg-white">
      <div className="border-b border-line bg-paper-warm">
        <div
          className="mx-auto flex max-w-site gap-1 overflow-x-auto px-5 sm:px-8"
          role="tablist"
          aria-label="Software plans"
        >
          {plans.map((plan) => {
            const selected = plan.id === active.id;
            return (
              <button
                key={plan.id}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`tab-${plan.id}`}
                aria-controls={`panel-${plan.id}`}
                className={`shrink-0 border-b-4 px-4 py-4 text-sm font-bold transition-colors sm:px-6 sm:text-base ${
                  selected
                    ? "border-accent text-navy"
                    : "border-transparent text-mute hover:text-navy"
                }`}
                onClick={() => setActiveId(plan.id)}
              >
                {plan.label}
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
