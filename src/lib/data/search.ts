import { conditions } from "./conditions";
import { doctors } from "./doctors";
import { programs } from "./programs";

export type SearchResult = {
  id: string;
  type: "doctor" | "condition" | "program" | "page";
  title: string;
  description: string;
  href: string;
  meta?: string;
};

const staticPages: SearchResult[] = [
  {
    id: "page-home",
    type: "page",
    title: "Home",
    description: "Boston Children's Hospital — Where the world comes for answers",
    href: "/",
  },
  {
    id: "page-find-doctor",
    type: "page",
    title: "Find a Doctor",
    description: "Search by specialty, name, or language",
    href: "/find-a-doctor",
  },
  {
    id: "page-emergency",
    type: "page",
    title: "Emergency Department",
    description: "Level 1 pediatric trauma center — open 24/7",
    href: "/emergency",
  },
];

export function searchAll(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const doc of doctors) {
    const hay = [doc.name, doc.title, doc.specialty, ...doc.tags]
      .join(" ")
      .toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `doc-${doc.id}`,
        type: "doctor",
        title: doc.name,
        description: doc.title,
        href: `/find-a-doctor?q=${encodeURIComponent(doc.name.split(",")[0])}`,
        meta: doc.specialty,
      });
    }
  }

  for (const cond of conditions) {
    const hay = [cond.name, cond.specialty, cond.lead].join(" ").toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `cond-${cond.slug}`,
        type: "condition",
        title: cond.name,
        description: cond.lead,
        href: `/conditions/${cond.slug}`,
        meta: cond.specialty,
      });
    }
  }

  for (const prog of programs) {
    const hay = [prog.name, prog.specialty, prog.description, prog.lead]
      .join(" ")
      .toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `prog-${prog.slug}`,
        type: "program",
        title: prog.name,
        description: prog.description,
        href: `/programs/${prog.slug}`,
        meta: prog.specialty,
      });
    }
  }

  for (const page of staticPages) {
    const hay = [page.title, page.description].join(" ").toLowerCase();
    if (hay.includes(q)) {
      results.push(page);
    }
  }

  return results;
}
