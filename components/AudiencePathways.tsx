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
    id: "learners",
    label: "Learners",
    eyebrow: "For students",
    title: "Clear the hurdle. Learn your way.",
    description:
      "Build a learning profile, practice with adaptive modules, and move forward with a path that fits how you learn best.",
    cta: { href: "#start", label: "Begin assessment" },
    cards: [
      {
        title: "Learning profile diagnostic",
        description:
          "Map strengths, friction points, and preferred modalities so your path starts from evidence—not assumptions.",
        kind: "diagnostic",
        items: [
          "Style preference inventory",
          "Barrier identification prompts",
          "Baseline comprehension check",
        ],
        href: "#start",
        imageSrc: "/images/card-diagnostic.jpg",
        imageAlt: "Learner reviewing notes at a desk",
      },
      {
        title: "Adaptive instruction modules",
        description:
          "Short units that reframe the same concept through visual, auditory, kinesthetic, and verbal pathways.",
        kind: "module",
        items: [
          "Concept introduction tracks",
          "Practice with feedback loops",
          "Transfer tasks for retention",
        ],
        href: "#curriculum",
        imageSrc: "/images/card-modules.jpg",
        imageAlt: "Students collaborating with tablets in class",
      },
      {
        title: "Structured progression path",
        description:
          "A clear sequence from diagnosis to mastery, with checkpoints that adjust pace without lowering expectations.",
        kind: "structure",
        items: [
          "Weekly milestone markers",
          "Remediation side-paths",
          "Mastery criteria you can see",
        ],
        href: "#curriculum",
        imageSrc: "/images/card-path.jpg",
        imageAlt: "Educator guiding a small group discussion",
      },
    ],
  },
  {
    id: "educators",
    label: "Educators",
    eyebrow: "For instructors",
    title: "Personalize, engage, and inspire every learner.",
    description:
      "Use diagnostics, adaptable modules, and clear progression tools to design instruction around the students in front of you.",
    cta: { href: "#curriculum", label: "Explore curriculum" },
    cards: [
      {
        title: "Classroom diagnostic toolkit",
        description:
          "Identify where learners stall—attention, prior knowledge, modality mismatch, or pacing—and respond with precision.",
        kind: "diagnostic",
        items: [
          "Group and individual insights",
          "Barrier tags you can act on",
          "Shareable learner profiles",
        ],
        href: "#start",
        imageSrc: "/images/card-diagnostic.jpg",
        imageAlt: "Educator reviewing learner progress",
      },
      {
        title: "Differentiated lesson modules",
        description:
          "Ready-to-teach units with alternate entry points so one concept reaches many learning styles without rewriting everything.",
        kind: "module",
        items: [
          "Multi-modality lesson tracks",
          "Formative checks built in",
          "Extension and support paths",
        ],
        href: "#curriculum",
        imageSrc: "/images/card-modules.jpg",
        imageAlt: "Classroom instruction in progress",
      },
      {
        title: "Progression & reporting",
        description:
          "See mastery criteria, remediation routes, and pacing signals in one structured view built for instructional decisions.",
        kind: "structure",
        items: [
          "Mastery dashboards",
          "Intervention cues",
          "Family-ready summaries",
        ],
        href: "#curriculum",
        imageSrc: "/images/card-path.jpg",
        imageAlt: "Collaborative instructional planning",
      },
    ],
  },
  {
    id: "families",
    label: "Families",
    eyebrow: "For caregivers",
    title: "Support learning with clarity at home.",
    description:
      "Understand how your learner works best, what is blocking progress, and which practice habits make the biggest difference.",
    cta: { href: "#start", label: "Request access" },
    cards: [
      {
        title: "At-home learning snapshot",
        description:
          "A plain-language profile of strengths, preferred styles, and the specific hurdles slowing progress right now.",
        kind: "diagnostic",
        items: [
          "Readable style summary",
          "Focus areas for the week",
          "Questions to ask teachers",
        ],
        href: "#start",
        imageSrc: "/images/card-diagnostic.jpg",
        imageAlt: "Parent and student learning together",
      },
      {
        title: "Practice that fits",
        description:
          "Short at-home activities aligned to the same modalities your learner uses in school—so practice sticks.",
        kind: "module",
        items: [
          "10-minute practice sets",
          "Style-matched activities",
          "Encouragement cues",
        ],
        href: "#curriculum",
        imageSrc: "/images/card-modules.jpg",
        imageAlt: "Student practicing with support at home",
      },
      {
        title: "Shared progress path",
        description:
          "See milestones, next steps, and when to celebrate—so home and school stay aligned without guesswork.",
        kind: "structure",
        items: [
          "Milestone visibility",
          "Next-step recommendations",
          "Simple check-in prompts",
        ],
        href: "#curriculum",
        imageSrc: "/images/card-path.jpg",
        imageAlt: "Family reviewing learning goals",
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
