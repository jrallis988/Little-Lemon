export const site = {
  name: "Morgan Bright",
  tagline: "Academic software for classrooms, schools, and districts",
  description:
    "Buy Morgan Bright academic software to diagnose learning hurdles, adapt instruction, and track progress.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://morganbright.learn",
  email: process.env.NEXT_PUBLIC_SALES_EMAIL ?? "sales@morganbright.learn",
  phone: process.env.NEXT_PUBLIC_SALES_PHONE ?? "(603) 555-0148",
};

export const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/plans", label: "Plans" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const plans = [
  {
    id: "classroom",
    name: "Classroom",
    price: "From $49 / teacher / month",
    summary:
      "For individual teachers who need diagnostics, adaptive lessons, and class-level reporting.",
    highlights: [
      "1 teacher seat",
      "Up to 35 student profiles",
      "Class-level dashboards",
      "Email support",
    ],
    bestFor: "Individual teachers and tutors",
  },
  {
    id: "school",
    name: "School",
    price: "Custom school pricing",
    summary:
      "For campuses and intervention teams that need shared workflows and campus reporting.",
    highlights: [
      "Multiple teacher seats",
      "Shared student records",
      "Campus reporting",
      "Implementation guide",
    ],
    bestFor: "Schools and intervention teams",
  },
  {
    id: "district",
    name: "District",
    price: "Custom district pricing",
    summary:
      "For multi-school rollouts with centralized administration and leadership reporting.",
    highlights: [
      "Multi-school provisioning",
      "Role-based access",
      "District insights",
      "Onboarding support",
    ],
    bestFor: "Districts and multi-campus systems",
  },
] as const;

export const features = [
  {
    title: "Learning profile diagnostics",
    description:
      "Identify skill gaps and learning-style mismatches so teachers know exactly where each student is getting stuck.",
    items: [
      "Placement screener",
      "Learning-style inventory",
      "Baseline comprehension check",
    ],
    imageSrc: "/images/card-diagnostic.jpg",
    imageAlt: "Educator reviewing diagnostic insights in academic software",
  },
  {
    title: "Adaptive instruction modules",
    description:
      "Assign digital lessons that reteach the same concept through multiple modalities without rebuilding units by hand.",
    items: [
      "Multi-pathway lesson tracks",
      "Practice with feedback",
      "Reteach and extension options",
    ],
    imageSrc: "/images/card-modules.jpg",
    imageAlt: "Students engaging with digital learning modules",
  },
  {
    title: "Progress monitoring dashboards",
    description:
      "Track mastery, regroup students, and share clear summaries with families and support teams.",
    items: [
      "Weekly mastery checks",
      "Intervention regrouping cues",
      "Exportable reports",
    ],
    imageSrc: "/images/card-path.jpg",
    imageAlt: "Teacher reviewing student progress dashboard",
  },
] as const;
