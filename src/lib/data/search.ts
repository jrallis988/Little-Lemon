import { contentApi } from "@/lib/content";

export type SearchResult = {
  id: string;
  type: "doctor" | "condition" | "program" | "page" | "location" | "trial";
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
    id: "page-appointments",
    type: "page",
    title: "Request an Appointment",
    description: "Multi-step appointment request for new patients",
    href: "/appointments/request",
  },
  {
    id: "page-portal",
    type: "page",
    title: "MyChildren's Portal",
    description: "Mock patient portal for results, messages, and visits",
    href: "/portal",
  },
  {
    id: "page-locations",
    type: "page",
    title: "Locations",
    description: "Longwood, Waltham, Needham, Lexington, and Peabody",
    href: "/locations",
  },
  {
    id: "page-conditions",
    type: "page",
    title: "Conditions A–Z",
    description: "Browse conditions and treatments",
    href: "/conditions",
  },
  {
    id: "page-programs",
    type: "page",
    title: "Programs & Services",
    description: "Browse clinical programs",
    href: "/programs",
  },
  {
    id: "page-emergency",
    type: "page",
    title: "Emergency Department",
    description: "Level 1 pediatric trauma center — open 24/7",
    href: "/emergency",
  },
  {
    id: "page-billing",
    type: "page",
    title: "Billing & Insurance",
    description: "Bills, insurance, financial assistance, and payment options",
    href: "/patients-families/billing",
  },
  {
    id: "page-prepare",
    type: "page",
    title: "Prepare for Your Visit",
    description: "What to bring, arrival tips, and visit checklists",
    href: "/patients-families/prepare-for-your-visit",
  },
  {
    id: "page-records",
    type: "page",
    title: "Medical Records",
    description: "How to request medical records and forms",
    href: "/patients-families/medical-records",
  },
  {
    id: "page-refer",
    type: "page",
    title: "Refer a Patient",
    description: "Healthcare professional referral workflow",
    href: "/professionals/refer",
  },
  {
    id: "page-second-opinion",
    type: "page",
    title: "Second Opinion",
    description: "Request a second opinion from Boston Children's specialists",
    href: "/professionals/second-opinion",
  },
  {
    id: "page-research",
    type: "page",
    title: "Research Hub",
    description: "Clinical trials, labs, and publications",
    href: "/research",
  },
  {
    id: "page-professionals",
    type: "page",
    title: "For Healthcare Professionals",
    description: "Referrals, CME, and physician resources",
    href: "/professionals",
  },
  {
    id: "page-patients",
    type: "page",
    title: "Patients & Families",
    description: "Visit prep, billing, portal, and family resources",
    href: "/patients-families",
  },
];

export function searchAll(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const doc of contentApi.providers) {
    const hay = [doc.name, doc.title, doc.specialty, ...doc.tags]
      .join(" ")
      .toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `doc-${doc._id}`,
        type: "doctor",
        title: doc.name,
        description: doc.title,
        href: `/find-a-doctor/${doc.slug}`,
        meta: doc.specialty,
      });
    }
  }

  for (const cond of contentApi.conditions) {
    const hay = [cond.name, cond.specialty, cond.lead].join(" ").toLowerCase();
    if (hay.includes(q) || (q === "seizure" && cond.slug.includes("epilepsy"))) {
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

  for (const prog of contentApi.programs) {
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

  for (const loc of contentApi.locations) {
    const hay = [loc.name, loc.city, loc.address, ...loc.services]
      .join(" ")
      .toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `loc-${loc.slug}`,
        type: "location",
        title: loc.name,
        description: `${loc.address}, ${loc.city}, ${loc.state} ${loc.zip}`,
        href: `/locations#${loc.slug}`,
        meta: loc.city,
      });
    }
  }

  for (const trial of contentApi.clinicalTrials) {
    const hay = [trial.title, trial.summary].join(" ").toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `trial-${trial.slug}`,
        type: "trial",
        title: trial.title,
        description: trial.summary,
        href: `/research?trial=${trial.slug}`,
        meta: trial.status,
      });
    }
  }

  for (const page of staticPages) {
    const hay = [page.title, page.description].join(" ").toLowerCase();
    if (hay.includes(q)) results.push(page);
  }

  return results;
}
