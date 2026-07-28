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
  campus: "/images/claremont-entrance.jpg",
  classroom: "/images/classroom.jpg",
  healthcare: "/images/nursing-lab.jpg",
  radiology: "/images/xray-lab.jpg",
  science: "/images/science-lab.jpg",
  library: "/images/students-panel.jpg",
  community: "/images/student-life.jpg",
  programs: "/images/students-panel.jpg",
  promo: "/images/promo-slide.jpg",
  testimonial: "/images/diane-cammarata.jpg",
  keene: "/images/keene-campus.jpg",
  lebanon: "/images/lebanon-campus.jpg",
  foodPantry: "/images/food-pantry.jpg",
  ece: "/images/ece.jpg",
  medicalAssistant: "/images/medical-assistant.jpg",
};

export const happening = [
  {
    title: "New Student Orientation",
    detail: "Keene — Tue, Aug 25 · 11 AM · Claremont — Thu, Aug 27 · 11 AM",
    cta: "Let us know you’re coming",
    to: "/admissions",
  },
  {
    title: "Walk-In Week",
    detail: "July 20–24 · 8 AM–4 PM · Claremont, Keene & Lebanon · free T-shirt",
    cta: "Plan your visit",
    to: "/admissions",
  },
  {
    title: "Scholarships & Aid",
    detail: "Grants and scholarships are available — start with FAFSA and RVCC awards",
    cta: "Explore financial aid",
    to: "/financial-aid",
  },
];

export const programs = [
  {
    slug: "nursing",
    name: "Nursing — RN & LPN",
    area: "Health Sciences",
    credential: "Associate of Science / Certificate pathways",
    format: "In-person with clinical rotations",
    duration: "1–2 years depending on pathway",
    campuses: ["Claremont"],
    startTerms: ["Fall", "Spring"],
    prerequisites: [
      "High school diploma or equivalent",
      "Placement or prerequisite coursework as advised",
      "Clinical clearance requirements before rotations",
    ],
    careers: [
      "Registered Nurse",
      "Licensed Practical Nurse",
      "Hospital and clinic care roles",
    ],
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
    duration: "About 2 years",
    campuses: ["Claremont"],
    startTerms: ["Fall"],
    prerequisites: [
      "Program application and advising review",
      "Science and math readiness",
      "Ability to meet clinical site requirements",
    ],
    careers: [
      "Radiologic technologist",
      "Diagnostic imaging roles",
      "Hospital imaging departments",
    ],
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
    duration: "About 2 years",
    campuses: ["Claremont"],
    startTerms: ["Fall"],
    prerequisites: [
      "Advising appointment recommended",
      "Science readiness for clinical coursework",
      "Clinical clearance before patient care",
    ],
    careers: [
      "Respiratory therapist",
      "Cardiopulmonary care teams",
      "Hospital and clinic settings",
    ],
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
    duration: "Certificate or 2-year degree path",
    campuses: ["Claremont", "Keene", "Online / hybrid"],
    startTerms: ["Fall", "Spring"],
    prerequisites: [
      "Comfort with computers and problem-solving",
      "Advising to choose certificate vs. degree",
    ],
    careers: [
      "Security analyst (entry-level)",
      "Network defense support",
      "IT security operations",
    ],
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
    duration: "About 2 years",
    campuses: ["Claremont", "Keene", "Lebanon", "Online / hybrid"],
    startTerms: ["Fall", "Spring"],
    prerequisites: [
      "Basic computer literacy",
      "Advising for transfer or employment goals",
    ],
    careers: [
      "Help desk / IT support",
      "Network technician",
      "Systems administration pathways",
    ],
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
    duration: "About 2 years",
    campuses: ["Claremont", "Keene", "Lebanon", "Online / hybrid"],
    startTerms: ["Fall", "Spring", "Summer"],
    prerequisites: [
      "High school diploma or equivalent",
      "Advising for transfer planning if needed",
    ],
    careers: [
      "Office and operations roles",
      "Supervisor / team lead pathways",
      "Transfer into bachelor’s business programs",
    ],
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
    duration: "Certificate to 2-year degree",
    campuses: ["Claremont", "Keene", "Online / hybrid"],
    startTerms: ["Fall", "Spring"],
    prerequisites: [
      "Comfort with numbers and detail work",
      "Advising to choose certificate vs. degree",
    ],
    careers: [
      "Bookkeeping",
      "Accounting clerk",
      "Small-business financial support",
    ],
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
    duration: "Stackable certificates to associate degree",
    campuses: ["Claremont", "Keene", "Lebanon"],
    startTerms: ["Fall", "Spring"],
    prerequisites: [
      "Interest in working with young children",
      "Background checks as required by placements",
    ],
    careers: [
      "Early childhood educator",
      "Childcare center roles",
      "Infant/toddler specialist pathways",
    ],
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
    duration: "About 2 years",
    campuses: ["Claremont", "Keene", "Lebanon", "Online / hybrid"],
    startTerms: ["Fall", "Spring", "Summer"],
    prerequisites: [
      "High school diploma or equivalent",
      "Advising for transfer destination planning",
    ],
    careers: [
      "Transfer into four-year programs",
      "Communications and office roles",
      "Exploration before specializing",
    ],
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
    duration: "About 2 years",
    campuses: ["Claremont", "Keene", "Lebanon"],
    startTerms: ["Fall", "Spring"],
    prerequisites: [
      "Interest in helping professions",
      "Advising for internship and career goals",
    ],
    careers: [
      "Community support roles",
      "Human services assistant pathways",
      "Nonprofit and agency settings",
    ],
    summary:
      "Prepare for community support roles helping families, clients, and local organizations.",
    highlights: [
      "Human services foundations",
      "Community-centered skill building",
      "Pathways into helping professions",
    ],
    nextStep: "Discuss internship and career interests with advising.",
  },
  {
    slug: "medical-assistant",
    name: "Medical Assistant",
    area: "Health Sciences",
    credential: "Certificate",
    format: "In-person with clinical practice",
    duration: "About 1 year",
    campuses: ["Claremont", "Lebanon"],
    startTerms: ["Fall", "Spring"],
    prerequisites: [
      "High school diploma or equivalent",
      "Advising before clinical placement",
    ],
    careers: [
      "Medical assistant",
      "Clinic support roles",
      "Front- and back-office healthcare teams",
    ],
    summary:
      "Train for clinical and administrative support roles in physician offices, clinics, and outpatient settings.",
    highlights: [
      "Hands-on clinical skills",
      "Administrative and patient-facing practice",
      "Direct workforce pathway",
    ],
    nextStep: "Ask admissions which start term fits your schedule.",
  },
  {
    slug: "occupational-therapy-assistant",
    name: "Occupational Therapy Assistant",
    area: "Health Sciences",
    credential: "Associate in Science",
    format: "In-person with clinicals",
    duration: "About 2 years",
    campuses: ["Claremont"],
    startTerms: ["Fall"],
    prerequisites: [
      "Program advising and application review",
      "Clinical clearance requirements",
    ],
    careers: [
      "Occupational therapy assistant",
      "Rehabilitation support roles",
      "Clinic and community therapy settings",
    ],
    summary:
      "Help people regain daily living and work skills through guided therapy practice and clinical experience.",
    highlights: [
      "Rehabilitation-focused coursework",
      "Clinical practicum experiences",
      "High-touch allied health career path",
    ],
    nextStep: "Review OTA prerequisites with an advisor.",
  },
  {
    slug: "physical-therapist-assistant",
    name: "Physical Therapist Assistant",
    area: "Health Sciences",
    credential: "Associate in Science",
    format: "In-person with clinicals",
    duration: "About 2 years",
    campuses: ["Claremont"],
    startTerms: ["Fall"],
    prerequisites: [
      "Program advising and application review",
      "Science readiness and clinical clearance",
    ],
    careers: [
      "Physical therapist assistant",
      "Outpatient and hospital rehab teams",
      "Sports and recovery settings",
    ],
    summary:
      "Support physical therapy plans that help patients restore movement, strength, and function.",
    highlights: [
      "Hands-on lab practice",
      "Clinical rotations",
      "Team-based rehabilitation focus",
    ],
    nextStep: "Confirm PTA cohort timing with admissions.",
  },
  {
    slug: "massage-therapy",
    name: "Massage Therapy",
    area: "Health Sciences",
    credential: "Certificate",
    format: "In-person",
    duration: "Certificate pathway",
    campuses: ["Lebanon"],
    startTerms: ["Fall", "Spring"],
    prerequisites: [
      "Interest in bodywork and client care",
      "Program kit and clinical readiness as advised",
    ],
    careers: [
      "Licensed massage therapist pathway",
      "Spa and wellness settings",
      "Private practice support roles",
    ],
    summary:
      "Build therapeutic massage skills through focused coursework and practiced technique at the Lebanon Academic Center.",
    highlights: [
      "Lebanon-based program home",
      "Hands-on technique development",
      "Client-care focused training",
    ],
    nextStep: "Ask about Lebanon start dates and program kits.",
  },
  {
    slug: "psychology",
    name: "Psychology",
    area: "Education & Human Services",
    credential: "Associate in Arts",
    format: "In-person, online, and hybrid",
    duration: "About 2 years",
    campuses: ["Claremont", "Keene", "Online / hybrid"],
    startTerms: ["Fall", "Spring"],
    prerequisites: [
      "High school diploma or equivalent",
      "Transfer advising recommended",
    ],
    careers: [
      "Transfer into psychology bachelor’s programs",
      "Human services support roles",
      "Community and behavioral health pathways",
    ],
    summary:
      "Study human behavior and mental processes while building a transfer-ready liberal arts foundation.",
    highlights: [
      "Transfer-friendly psychology core",
      "Flexible course formats",
      "Strong writing and analysis practice",
    ],
    nextStep: "Map your transfer destination early with advising.",
  },
  {
    slug: "phlebotomy",
    name: "Phlebotomy",
    area: "Health Sciences",
    credential: "Certificate",
    format: "In-person with clinical practice",
    duration: "Short-term certificate",
    campuses: ["Claremont", "Lebanon"],
    startTerms: ["Fall", "Spring"],
    prerequisites: [
      "High school diploma or equivalent",
      "Clinical readiness as required",
    ],
    careers: [
      "Phlebotomy technician",
      "Lab support roles",
      "Clinic and hospital specimen collection",
    ],
    summary:
      "Learn blood collection and specimen handling skills for labs, clinics, and hospital settings.",
    highlights: [
      "Focused clinical skill training",
      "Fast path into healthcare support",
      "Hands-on practice emphasis",
    ],
    nextStep: "Check upcoming certificate start dates.",
  },
];

export const programAreas = [
  {
    slug: "health-sciences",
    name: "Health Sciences",
    summary:
      "Nursing, radiologic technology, respiratory therapy, and allied health pathways built for clinical careers.",
    image: images.healthcare,
    programSlugs: [
      "nursing",
      "radiologic-technology",
      "respiratory-therapy",
      "medical-assistant",
      "occupational-therapy-assistant",
      "physical-therapist-assistant",
      "massage-therapy",
      "phlebotomy",
    ],
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
    image: images.ece,
    programSlugs: [
      "early-childhood-education",
      "liberal-arts",
      "social-services",
      "psychology",
    ],
  },
];

export const campuses = [
  {
    name: "Claremont",
    role: "Main Campus",
    detail:
      "One main building with parking, a soccer field, pond, nearby trails, and a courtyard built for collaboration.",
    address: "1 College Place, Claremont, NH 03743",
    hours: "Student services typically staffed weekdays",
    phone: "(603) 542-7744",
    image: images.hero,
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=-72.345%2C43.390%2C-72.320%2C43.408&layer=mapnik&marker=43.3989%2C-72.3331",
    mapLink: "https://www.openstreetmap.org/?mlat=43.3989&mlon=-72.3331#map=15/43.3989/-72.3331",
  },
  {
    name: "Keene",
    role: "Academic Center",
    detail:
      "Based on Keene State College’s campus with classes, advising, tutoring, computer lab access, and a food pantry.",
    address: "88 Winchester St, Keene, NH",
    hours: "Staffed Monday–Friday, 8 AM–4 PM",
    phone: "(603) 542-7744",
    image: images.keene,
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=-72.295%2C42.920%2C-72.265%2C42.945&layer=mapnik&marker=42.9335%2C-72.2794",
    mapLink: "https://www.openstreetmap.org/?mlat=42.9335&mlon=-72.2794#map=15/42.9335/-72.2794",
  },
  {
    name: "Lebanon",
    role: "Academic Center",
    detail:
      "Downtown on the Mall — home to community engagement, Massage Therapy, LNA/RMA pathways, workshops, and rentable classroom space.",
    address: "Lebanon, NH (on the Mall)",
    hours: "Staffed Monday–Friday, 8 AM–4 PM",
    phone: "(603) 443-4200",
    image: images.lebanon,
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=-72.265%2C43.632%2C-72.240%2C43.652&layer=mapnik&marker=43.6423%2C-72.2518",
    mapLink: "https://www.openstreetmap.org/?mlat=43.6423&mlon=-72.2518#map=15/43.6423/-72.2518",
  },
];

export const tuition = {
  yearLabel: "2026–2027 academic year",
  rates: [
    { label: "New Hampshire resident", amount: 238, unit: "per credit" },
    { label: "New England regional", amount: 357, unit: "per credit" },
    { label: "Out-of-state", amount: 523, unit: "per credit" },
  ],
  fees: [
    { label: "Comprehensive student services fee", amount: 25, unit: "per credit" },
    { label: "Academic instruction fee (lab)", amount: 110, unit: "per lab credit" },
    { label: "Degree/certificate acceptance fee", amount: 100, unit: "one-time" },
  ],
  notes: [
    "Students living within a 50-mile radius may qualify for in-state day-course rates.",
    "All students are charged in-state rates for evening, weekend, and online courses.",
    "Tuition and fees are set by the CCSNH Board and can change.",
  ],
};

export const filterOptions = {
  areas: [
    "Health Sciences",
    "STEM & Technology",
    "Business & Accounting",
    "Education & Human Services",
  ],
  credentials: ["Degree", "Certificate", "Associate"],
  campuses: ["Claremont", "Keene", "Lebanon", "Online / hybrid"],
};

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

export function filterPrograms({ area = "All", credential = "All", campus = "All", query = "" } = {}) {
  const q = query.trim().toLowerCase();

  return programs.filter((program) => {
    const areaOk = area === "All" || program.area === area;
    const campusOk =
      campus === "All" || program.campuses.some((item) => item === campus);
    const credentialOk =
      credential === "All" ||
      program.credential.toLowerCase().includes(credential.toLowerCase());
    const queryOk =
      !q ||
      program.name.toLowerCase().includes(q) ||
      program.summary.toLowerCase().includes(q) ||
      program.area.toLowerCase().includes(q);

    return areaOk && campusOk && credentialOk && queryOk;
  });
}

export function estimateTuition({ ratePerCredit, credits = 30, includeServicesFee = true } = {}) {
  const tuitionTotal = ratePerCredit * credits;
  const servicesFee = includeServicesFee ? 25 * credits : 0;
  return {
    credits,
    tuitionTotal,
    servicesFee,
    estimatedTotal: tuitionTotal + servicesFee,
  };
}
