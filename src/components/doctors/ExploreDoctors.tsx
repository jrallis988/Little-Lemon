"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";

type TabId = "condition" | "program" | "location";

const tabs: { id: TabId; label: string }[] = [
  { id: "condition", label: "Condition" },
  { id: "program", label: "Program" },
  { id: "location", label: "Location" },
];

/** Featured explore cards aligned to live Find a Doctor “Explore Doctors by…” IA. */
const exploreByTab: Record<
  TabId,
  { label: string; href: string; hint?: string }[]
> = {
  condition: [
    { label: "Epilepsy", href: "/find-a-doctor?specialty=Neurology", hint: "Neurology" },
    { label: "Congenital heart disease", href: "/find-a-doctor?specialty=Cardiology", hint: "Cardiology" },
    { label: "Childhood leukemia", href: "/find-a-doctor?specialty=Oncology", hint: "Oncology" },
    { label: "Pediatric migraine", href: "/find-a-doctor?specialty=Neurology", hint: "Neurology" },
    { label: "Type 1 diabetes", href: "/find-a-doctor?specialty=Endocrinology", hint: "Endocrinology" },
    { label: "Cystic fibrosis", href: "/find-a-doctor?specialty=Pulmonology", hint: "Pulmonology" },
    { label: "Inflammatory bowel disease", href: "/find-a-doctor?specialty=Gastroenterology", hint: "GI" },
    { label: "Pediatric asthma", href: "/find-a-doctor?specialty=Pulmonology", hint: "Pulmonology" },
  ],
  program: [
    { label: "Epilepsy Program", href: "/programs/epilepsy-program" },
    { label: "Heart Center", href: "/programs/heart-center" },
    { label: "Cancer and Blood Disorders", href: "/programs" },
    { label: "Orthopedics", href: "/programs" },
    { label: "Digestive Diseases", href: "/programs" },
    { label: "Pulmonary Medicine", href: "/programs" },
  ],
  location: [
    { label: "Main Campus — Longwood", href: "/find-a-doctor?location=Main%20Campus%20%E2%80%94%20Longwood" },
    { label: "Boston Children's Waltham", href: "/find-a-doctor?location=Boston%20Children%27s%20Waltham" },
    { label: "All locations", href: "/locations" },
  ],
};

export function ExploreDoctors() {
  const [tab, setTab] = useState<TabId>("condition");
  const cards = exploreByTab[tab];

  return (
    <section
      className="border-b border-border bg-surface py-s7"
      aria-labelledby="explore-doctors-heading"
    >
      <div className="wrap">
        <h2
          id="explore-doctors-heading"
          className="mb-s4 text-xl font-bold text-text sm:text-2xl"
        >
          Explore Doctors by{" "}
          {tab === "condition"
            ? "Condition"
            : tab === "program"
              ? "Program"
              : "Location"}
        </h2>

        <div
          role="tablist"
          aria-label="Explore doctors"
          className="mb-s5 flex flex-wrap gap-2"
        >
          {tabs.map((item) => {
            const selected = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                className={cn(
                  "inline-flex h-10 items-center rounded-full px-4 text-sm font-bold transition-colors",
                  selected
                    ? "bg-blue text-white"
                    : "bg-white text-blue ring-1 ring-border hover:ring-ocean",
                )}
                onClick={() => setTab(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <ul className="grid grid-cols-2 gap-s3 sm:grid-cols-3 lg:grid-cols-4">
          {cards.map((card) => (
            <li key={card.label}>
              <Link
                href={card.href}
                className="flex h-full min-h-[88px] flex-col justify-center rounded-md border border-border bg-white px-s4 py-s3 no-underline shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="text-sm font-bold text-ocean">{card.label}</span>
                {card.hint ? (
                  <span className="mt-1 text-xs font-light text-text-meta">
                    {card.hint}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
