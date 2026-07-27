export const navLinks = [
  { to: "/programs", label: "Programs" },
  { to: "/admissions", label: "Admissions" },
  { to: "/financial-aid", label: "Financial Aid" },
  { to: "/student-life", label: "Student Life" },
  { to: "/about", label: "About" },
];

export const utilityLinks = [
  { to: "/student-life", label: "Current Students" },
  { to: "/about", label: "Faculty & Staff" },
  { href: "https://www.rivervalley.edu", label: "CCSNH Portal", external: true },
];

export const contact = {
  phone: "(603) 542-7744",
  email: "admissions@rivervalley.edu",
  address: "1 College Place, Claremont, NH 03743",
};

export const images = {
  hero: "/images/hero-claremont.jpg",
  campus: "/images/about-campus.jpg",
  classroom: "/images/classroom.jpg",
  healthcare: "/images/nursing-lab.jpg",
  radiology: "/images/xray-lab.jpg",
  science: "/images/science-lab.jpg",
  library: "/images/students-panel.jpg",
  community: "/images/students-campus.jpg",
  programs: "/images/students-panel.jpg",
  promo: "/images/promo-slide.jpg",
  testimonial: "/images/diane-cammarata.jpg",
};

export const programs = [
  {
    slug: "nursing",
    name: "Nursing — RN & LPN",
    area: "Health Sciences",
    credential: "Associate of Science / Certificate pathways",
    format: "In-person with clinical rotations",
    summary:
      "Prepare for bedside care through rigorous classroom learning and supervised clinical experience across the river valley.",
    highlights: [
      "RN and LPN pathways",
      "Clinical placements with regional partners",
      "Strong NCLEX preparation culture",
    ],
    nextStep: "Talk with admissions about prerequisites and start terms.",
  },
  {
    slug: "radiologic-technology",
    name: "Radiologic Technology",
    area: "Health Sciences",
    credential: "Associate in Science",
    format: "In-person labs + clinicals",
    summary:
      "Train on modern imaging equipment — including RVCC’s digital X-ray lab — and step into diagnostic imaging careers.",
    highlights: [
      "State-of-the-art digital X-ray lab",
      "Hands-on patient positioning practice",
      "Career-ready imaging fundamentals",
    ],
    nextStep: "Review program requirements and schedule a campus visit.",
  },
  {
    slug: "respiratory-therapy",
    name: "Respiratory Therapy",
    area: "Health Sciences",
    credential: "Associate in Science",
    format: "In-person with clinicals",
    summary:
      "Learn cardiopulmonary care for hospitals and clinics through focused coursework and real patient settings.",
    highlights: [
      "Critical care and patient assessment skills",
      "Clinical rotations in regional facilities",
      "High-demand allied health pathway",
    ],
    nextStep: "Ask admissions about cohort timing and clinical readiness.",
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    area: "STEM & Technology",
    credential: "Associate in Science / Certificate",
    format: "Hybrid-friendly",
    summary:
      "Build defensive security skills for networks, systems, and modern threat landscapes.",
    highlights: [
      "Network defense foundations",
      "Practical labs and scenario work",
      "Stackable certificate and degree options",
    ],
    nextStep: "Explore whether the certificate or degree path fits your goals.",
  },
  {
    slug: "information-technology",
    name: "Information Technology & Network Administration",
    area: "STEM & Technology",
    credential: "Associate in Science",
    format: "In-person, online, and hybrid",
    summary:
      "Gain the systems, networking, and support skills employers expect from entry-level IT professionals.",
    highlights: [
      "Network administration focus",
      "Flexible course formats",
      "Direct workplace skill mapping",
    ],
    nextStep: "Map transfer or employment goals with an advisor.",
  },
  {
    slug: "business-management",
    name: "Business Management",
    area: "Business & Accounting",
    credential: "Associate of Science",
    format: "In-person, online, and hybrid",
    summary:
      "Develop practical management, operations, and leadership skills for local employers and transfer paths.",
    highlights: [
      "Operations and people leadership basics",
      "Flexible scheduling for working students",
      "Transfer-friendly coursework",
    ],
    nextStep: "Compare management and accounting pathways with admissions.",
  },
  {
    slug: "accounting",
    name: "Accounting",
    area: "Business & Accounting",
    credential: "Degree & certificate options",
    format: "Flexible formats",
    summary:
      "Build bookkeeping-to-analysis skills that support small businesses, offices, and further study.",
    highlights: [
      "Certificate and degree ladders",
      "Advanced accounting options",
      "Workplace-ready financial skills",
    ],
    nextStep: "Choose a starting credential based on your timeline.",
  },
  {
    slug: "early-childhood-education",
    name: "Early Childhood Education",
    area: "Education & Human Services",
    credential: "Associate in Science / Certificates",
    format: "Flexible for working caregivers",
    summary:
      "Prepare to support infants, toddlers, and young learners in classrooms and community settings.",
    highlights: [
      "Infant and toddler pathways",
      "Level I and Level II certificates",
      "Practical classroom-focused learning",
    ],
    nextStep: "Identify which ECE credential matches your workplace needs.",
  },
  {
    slug: "liberal-arts",
    name: "Liberal Arts",
    area: "Education & Human Services",
    credential: "Associate in Arts",
    format: "In-person, online, and hybrid",
    summary:
      "A flexible foundation for transfer, exploration, and communication-heavy careers.",
    highlights: [
      "Transfer-friendly core",
      "Room to explore interests",
      "Strong writing and critical thinking",
    ],
    nextStep: "Plan a transfer map with advising early.",
  },
  {
    slug: "social-services",
    name: "Social Services",
    area: "Education & Human Services",
    credential: "Associate in Science",
    format: "Flexible formats",
    summary:
      "Prepare for community support roles helping families, clients, and local organizations.",
    highlights: [
      "Human services foundations",
      "Community-centered skill building",
      "Pathways into helping professions",
    ],
    nextStep: "Discuss internship and career interests with advising.",
  },
];

export const programAreas = [
  {
    slug: "health-sciences",
    name: "Health Sciences",
    summary:
      "Nursing, radiologic technology, respiratory therapy, and allied health pathways built for clinical careers.",
    image: images.healthcare,
    programSlugs: ["nursing", "radiologic-technology", "respiratory-therapy"],
  },
  {
    slug: "stem-technology",
    name: "STEM & Technology",
    summary:
      "Hands-on preparation for cybersecurity, networks, science, and advanced manufacturing roles.",
    image: images.science,
    programSlugs: ["cybersecurity", "information-technology"],
  },
  {
    slug: "business-accounting",
    name: "Business & Accounting",
    summary:
      "Practical credentials that move you into accounting, management, and workplace leadership.",
    image: images.classroom,
    programSlugs: ["business-management", "accounting"],
  },
  {
    slug: "education-human-services",
    name: "Education & Human Services",
    summary:
      "Programs for educators, caregivers, and community-centered professionals.",
    image: images.community,
    programSlugs: ["early-childhood-education", "liberal-arts", "social-services"],
  },
];

export const campuses = [
  {
    name: "Claremont",
    role: "Main Campus",
    detail:
      "One main building with parking, a soccer field, pond, nearby trails, and a courtyard built for collaboration.",
    image: images.hero,
  },
  {
    name: "Keene",
    role: "Academic Center",
    detail:
      "Classes, student services, computer labs, and study space on the Keene State College campus.",
    image: images.classroom,
  },
  {
    name: "Lebanon",
    role: "Academic Center",
    detail:
      "Right on the Mall in downtown Lebanon — surrounded by shops and restaurants, with services and study space inside.",
    image: images.community,
  },
];

export const supports = [
  {
    title: "Food access",
    copy: "Every student has access to free food on campus, from snacks to meals.",
  },
  {
    title: "Free bus passes",
    copy: "Campus transit support helps you get where you need to go without extra cost.",
  },
  {
    title: "Learning resources",
    copy: "Online and on-site library resources are designed to help you succeed.",
  },
];

export const outcomes = [
  { value: "89%", label: "of students receive financial aid" },
  { value: "7:1", label: "student-to-faculty ratio" },
  { value: "35+", label: "degrees and certificates" },
  { value: "900", label: "students enrolled each year" },
];

export const aidSteps = [
  {
    title: "Complete the FAFSA",
    copy: "Use RVCC’s school code and submit early so grants and loans can be packaged on time.",
  },
  {
    title: "Review your award",
    copy: "Compare grants, scholarships, and loan options with Financial Aid before you accept anything.",
  },
  {
    title: "Apply for scholarships",
    copy: "Local and college scholarships can stack with federal aid and lower what you borrow.",
  },
  {
    title: "Ask before you stall",
    copy: "If paperwork or balance questions come up, talk with aid counselors before classes start.",
  },
];

export const lifeSupports = [
  {
    title: "Food pantries",
    copy: "Snacks and meals are available so hunger does not get in the way of class.",
  },
  {
    title: "Transit help",
    copy: "Free bus passes from campus make it easier to reach work, clinicals, and home.",
  },
  {
    title: "Library & tutoring",
    copy: "Online and on-site resources, quiet study space, and people who will help you dig in.",
  },
  {
    title: "Advising that knows you",
    copy: "With a 7:1 student-to-faculty ratio, support is personal — not a ticket queue.",
  },
];

export function getProgram(slug) {
  return programs.find((program) => program.slug === slug);
}

export function getProgramsForArea(area) {
  return programs.filter((program) => area.programSlugs.includes(program.slug));
}
