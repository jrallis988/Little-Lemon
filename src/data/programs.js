import { catalogUrl } from "./links";

export const focusAreas = [
  {
    id: "arts-humanities-communication-and-design",
    title: "Arts, Humanities, Communication and Design",
    description:
      "Transfer-ready pathways in liberal arts, interdisciplinary studies, and library technology.",
  },
  {
    id: "business",
    title: "Business",
    description:
      "Accounting and business administration for career advancement and four-year transfer.",
  },
  {
    id: "health-sciences-and-services",
    title: "Health Sciences and Services",
    description:
      "Nursing, health science, medical assisting, massage therapy, and veterinary assistant pathways.",
  },
  {
    id: "hospitality-and-culinary",
    title: "Hospitality and Culinary",
    description:
      "Culinary arts, baking and pastry, and food service credentials for the hospitality industry.",
  },
  {
    id: "industry-and-transportation",
    title: "Industry and Transportation",
    description:
      "Automotive, diesel heavy equipment, welding, EV technician, CDL, and trades management.",
  },
  {
    id: "social-educational-and-behavioral-science",
    title: "Social, Educational and Behavioral Science",
    description:
      "Teacher education, early childhood, criminal justice, human services, and related pathways.",
  },
  {
    id: "stem-and-advanced-manufacturing",
    title: "STEM and Advanced Manufacturing",
    description:
      "Environmental science, conservation law enforcement, and IT cybersecurity credentials.",
  },
];

const img = {
  classroom: "/images/classroom.jpg",
  culinary: "/images/culinary.jpg",
  diesel: "/images/diesel.jpg",
  nursing: "/images/nursing.jpg",
  welding: "/images/welding.jpg",
  students: "/images/students.jpg",
  science: "/images/science-lab.jpg",
  littleton: "/images/littleton.jpg",
  campus: "/images/campus-exterior.jpg",
  automotive: "/images/automotive.jpg",
  trades: "/images/trades.jpg",
};

const multiTransfer = ["Berlin", "Littleton", "North Conway", "Online"];
const berlinLittletonOnline = ["Berlin", "Littleton", "Online"];

const focusDefaults = {
  "arts-humanities-communication-and-design": {
    summary:
      "Build a flexible foundation for transfer or career pathways in the arts, humanities, and communication fields.",
    outcomes: [
      "Transfer-ready coursework aligned with four-year pathways",
      "Strong writing, research, and communication skills",
      "Advising support for major and transfer planning",
    ],
    format: "Day, evening, hybrid, and online options depending on course",
  },
  business: {
    summary:
      "Learn practical accounting and business skills for workplace readiness or continued study.",
    outcomes: [
      "Core business and accounting competencies",
      "Preparation for entry-level roles or transfer",
      "Applied projects tied to real workplace scenarios",
    ],
    format: "Flexible scheduling across Berlin, Littleton, North Conway, and online",
  },
  "health-sciences-and-services": {
    summary:
      "Prepare for patient-centered careers through classroom learning and hands-on clinical practice.",
    outcomes: [
      "Clinical readiness for healthcare and allied health settings",
      "Professional standards and patient-care foundations",
      "Clear next steps toward licensure or advanced study where applicable",
    ],
    format: "Campus-based labs with clinical or practical components",
  },
  "hospitality-and-culinary": {
    summary:
      "Train for kitchens, bakeries, and hospitality operations with applied, production-focused coursework.",
    outcomes: [
      "Hands-on culinary and food-service technique",
      "Industry-ready workplace habits and teamwork",
      "Pathways into restaurants, resorts, and related careers",
    ],
    format: "Lab-intensive courses on the Berlin campus",
  },
  "industry-and-transportation": {
    summary:
      "Develop technical skills for high-demand trades through shop-based learning and employer-aligned training.",
    outcomes: [
      "Hands-on shop and equipment experience",
      "Safety, diagnostics, and technician fundamentals",
      "Direct routes into regional industry and transportation careers",
    ],
    format: "Primarily in-person labs and shops",
  },
  "social-educational-and-behavioral-science": {
    summary:
      "Prepare for education, public service, and human services roles with classroom and field-ready skills.",
    outcomes: [
      "Foundations in teaching, justice, or human services practice",
      "Communication and community-focused competencies",
      "Transfer and career options across the North Country",
    ],
    format: "Berlin, Littleton, North Conway, and flexible course formats",
  },
  "stem-and-advanced-manufacturing": {
    summary:
      "Study science, conservation, and technology pathways that connect field learning with regional opportunity.",
    outcomes: [
      "STEM foundations for work or transfer",
      "Applied problem-solving and technical literacy",
      "Pathways into environmental, conservation, and IT-related roles",
    ],
    format: "Campus, field, and online options by course",
  },
};

/** Program-specific copy and location truth where catalog/campus data differs from focus defaults */
const programOverrides = {
  nursing: {
    summary:
      "The Associate in Science in Nursing prepares students for RN practice through classroom instruction, simulation, and clinical rotations. The program is ACEN-accredited, NH Board of Nursing approved, and based on the Berlin campus.",
    outcomes: [
      "Achieve a minimum ATI TEAS total score of 60% (up to three attempts; scores valid three years)",
      "Complete science prerequisites within five years for transfer credit (A&P I/II and Microbiology at C+ or better)",
      "Gain clinical experience with partners including Androscoggin Valley Hospital and Weeks Medical Center",
      "Qualify to sit for the NCLEX-RN after successful program completion",
    ],
    format:
      "Berlin campus nursing courses with concurrent clinicals at area healthcare facilities; full-time or part-time pathways",
    locations: ["Berlin"],
    details: [
      "Credential: Associate in Science (Registered Nursing pathway)",
      "Campus: Berlin Main Campus",
      "Admissions: complete application by February 1 for fall entry; selection uses the Nursing Admission Rubric",
      "Clinical partners include Androscoggin Valley Hospital and Weeks Medical Center, plus other regional sites",
      "Science courses used for transfer must be completed within five years of the first Nursing course",
    ],
  },
  "advanced-welding-technology": {
    summary:
      "The Advanced Welding Technology certificate prepares students for AWS industry-recognized certifications through classroom theory and shop labs covering SMAW, GMAW, FCAW, SAW, and GTAW processes on the Berlin campus.",
    outcomes: [
      "Apply Shielded Metal Arc Welding (SMAW), Gas Metal Arc Welding (GMAW), Flux Core Arc Welding (FCAW), and Gas Tungsten Arc Welding (GTAW)",
      "Prepare for D1.5 and D1.1 Structural Steel Unlimited Certifications in FCAW and SMAW positions",
      "Build blueprint reading, safety, and fabrication skills for today’s welding industry",
      "Transfer credits into the Associate in Science in Trades Management and meet Pipe Welding prerequisites",
    ],
    format: "Hands-on welding labs and theory on the Berlin campus",
    locations: ["Berlin"],
    details: [
      "Credential: Certificate (pathway into Trades Management A.S.)",
      "Campus: Berlin Main Campus",
      "Processes: SMAW, GMAW, FCAW, SAW, and GTAW",
      "Catalog: catalog.wmcc.edu welding certificate page",
    ],
  },
  "pipe-welding": {
    summary:
      "Specialize in pipe welding techniques used in construction, manufacturing, and industrial maintenance settings.",
    outcomes: [
      "Perform pipe welding to industry standards",
      "Read and apply fabrication specifications",
      "Strengthen readiness for industrial welding roles",
    ],
    format: "Shop-based certificate training on the Berlin campus",
    locations: ["Berlin"],
  },
  "culinary-arts": {
    summary:
      "Train in professional kitchen operations, food production, and hospitality fundamentals for restaurants, resorts, and food-service careers.",
    outcomes: [
      "Apply culinary techniques in production environments",
      "Practice sanitation, mise en place, and kitchen teamwork",
      "Build a pathway into North Country hospitality employers",
    ],
    format: "Lab-intensive AAS pathway on the Berlin campus",
    locations: ["Berlin"],
  },
  "baking-and-pastry-arts": {
    summary:
      "Focus on baking and pastry production for bakeries, resorts, and food-service operations across northern New Hampshire.",
    outcomes: [
      "Produce breads, pastries, and dessert items to professional standards",
      "Manage bakery workflow and presentation",
      "Prepare for baking and pastry employment or further study",
    ],
    format: "Production labs on the Berlin campus",
    locations: ["Berlin"],
  },
  "it-cybersecurity": {
    summary:
      "Build cybersecurity foundations with CompTIA-aligned training designed for fast-paced information-security roles.",
    outcomes: [
      "Apply core cybersecurity concepts and defensive practices",
      "Prepare for industry-recognized CompTIA pathways",
      "Strengthen readiness for entry-level IT security roles",
    ],
    format: "Certificate coursework with flexible delivery options",
    locations: ["Berlin", "Online"],
  },
  "medical-assistant": {
    summary:
      "Prepare for clinical and administrative medical assisting roles through coursework offered at the Littleton Academic Center.",
    outcomes: [
      "Support patient care in ambulatory and clinic settings",
      "Perform common clinical and administrative assisting tasks",
      "Build a pathway into regional healthcare employment",
    ],
    format: "Littleton Academic Center certificate pathway",
    locations: ["Littleton"],
  },
  "commercial-driver-training": {
    summary:
      "Earn commercial driver preparation through WMCC’s Littleton-based CDL training pathway.",
    outcomes: [
      "Build knowledge and skills for commercial driving careers",
      "Practice safety and regulatory fundamentals",
      "Connect training to regional transportation employers",
    ],
    format: "Certificate training at the Littleton Academic Center",
    locations: ["Littleton"],
  },
  "driver-education-instructor": {
    summary:
      "Prepare to teach driver education through a certificate pathway hosted at the Littleton Academic Center.",
    outcomes: [
      "Learn instructional methods for driver education",
      "Understand safety and regulatory expectations",
      "Prepare for instructor roles in the region",
    ],
    format: "Littleton Academic Center certificate",
    locations: ["Littleton"],
  },
  "massage-therapy": {
    summary:
      "Train for massage therapy practice through WMCC’s North Conway Academic Center certificate pathway.",
    outcomes: [
      "Apply therapeutic massage techniques and client-care fundamentals",
      "Build professional practice habits",
      "Prepare for regional wellness and clinical settings",
    ],
    format: "North Conway Academic Center certificate",
    locations: ["North Conway"],
  },
  "veterinary-assistant": {
    summary:
      "Prepare for veterinary assisting roles through hands-on coursework based at the North Conway Academic Center.",
    outcomes: [
      "Support veterinary clinic teams in animal-care settings",
      "Practice foundational clinical assisting skills",
      "Build readiness for Mount Washington Valley employers",
    ],
    format: "North Conway Academic Center certificate",
    locations: ["North Conway"],
  },
  "automotive-technology-degree": {
    summary:
      "Earn an Associate in Applied Science in Automotive Technology through Berlin campus labs and shop training.",
    outcomes: [
      "Diagnose and service modern automotive systems",
      "Apply safety and workplace standards in shop settings",
      "Prepare for technician roles or further automotive study",
    ],
    format: "Shop-based AAS training on the Berlin campus",
    locations: ["Berlin"],
  },
  "diesel-heavy-equipment-degree": {
    summary:
      "Train for diesel and heavy equipment careers with applied labs on the Berlin campus.",
    outcomes: [
      "Service diesel and heavy equipment systems",
      "Apply diagnostics and preventive maintenance practices",
      "Connect skills to regional industry employers",
    ],
    format: "Hands-on labs on the Berlin campus",
    locations: ["Berlin"],
  },
};

const rawPrograms = [
  {
    id: "accounting",
    title: "Accounting",
    credential: "Associate in Science",
    kind: "Degree",
    focusAreas: ["business"],
    locations: multiTransfer,
    catalogPath: "/accounting/associate-in-science/accounting",
    image: img.classroom,
  },
  {
    id: "advanced-welding-technology",
    title: "Advanced Welding Technology",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["industry-and-transportation"],
    locations: ["Berlin"],
    catalogPath: "/welding/certificate/advanced-welding-technology",
    image: img.welding,
  },
  {
    id: "automotive-technology-degree",
    title: "Automotive Technology",
    credential: "Associate in Applied Science",
    kind: "Degree",
    focusAreas: ["industry-and-transportation"],
    locations: ["Berlin"],
    catalogPath: "/automotive/associate-in-applied-science/automotive-technology",
    image: img.automotive,
  },
  {
    id: "automotive-technology-certificate",
    title: "Automotive Technology",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["industry-and-transportation"],
    locations: ["Berlin"],
    catalogPath: "/automotive/certificate/automotive-technology",
    image: img.automotive,
  },
  {
    id: "baking-and-pastry-arts",
    title: "Baking and Pastry Arts",
    credential: "Associate in Applied Science",
    kind: "Degree",
    focusAreas: ["hospitality-and-culinary"],
    locations: ["Berlin"],
    catalogPath:
      "/culinary-artsbaking-and-pastry-arts/associate-in-applied-science/baking-and-pastry-arts",
    image: img.culinary,
  },
  {
    id: "behavioral-science",
    title: "Behavioral Science",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["social-educational-and-behavioral-science"],
    locations: berlinLittletonOnline,
    catalogPath: "/human-services/certificate/behavioral-science",
    image: img.students,
  },
  {
    id: "business-administration",
    title: "Business Administration",
    credential: "Associate in Science",
    kind: "Degree",
    focusAreas: ["business"],
    locations: multiTransfer,
    catalogPath:
      "/business-administration/associate-in-science/business-administration",
    image: img.classroom,
  },
  {
    id: "career-and-technical-education",
    title: "Career and Technical Education",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["social-educational-and-behavioral-science"],
    locations: berlinLittletonOnline,
    catalogPath: "/education/certificate/career-and-technical-education",
    image: img.littleton,
  },
  {
    id: "commercial-driver-training",
    title: "Commercial Driver Training",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["industry-and-transportation"],
    locations: ["Littleton"],
    catalogPath: "/commercial-driver-training/certificate/commercial-driver-training",
    image: img.diesel,
  },
  {
    id: "conservation-law-enforcement",
    title: "Conservation Law Enforcement",
    credential: "Associate in Science",
    kind: "Degree",
    focusAreas: ["stem-and-advanced-manufacturing"],
    locations: ["Berlin", "Online"],
    catalogPath:
      "/conservation-law-enforcement/associate-in-science/conservation-law-enforcement",
    image: img.campus,
  },
  {
    id: "criminal-justice",
    title: "Criminal Justice",
    credential: "Associate in Science",
    kind: "Degree",
    focusAreas: ["social-educational-and-behavioral-science"],
    locations: berlinLittletonOnline,
    catalogPath: "/criminal-justice/associate-in-science/criminal-justice",
    image: img.students,
  },
  {
    id: "criminal-justice-entry-level",
    title: "Entry-Level Criminal Justice",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["social-educational-and-behavioral-science"],
    locations: berlinLittletonOnline,
    catalogPath: "/criminal-justice/certificate/entrylevel-criminal-justice",
    image: img.students,
  },
  {
    id: "culinary-arts",
    title: "Culinary Arts",
    credential: "Associate in Applied Science",
    kind: "Degree",
    focusAreas: ["hospitality-and-culinary"],
    locations: ["Berlin"],
    catalogPath:
      "/culinary-artsbaking-and-pastry-arts/associate-in-applied-science/culinary-arts",
    image: img.culinary,
  },
  {
    id: "diesel-heavy-equipment-degree",
    title: "Diesel Heavy Equipment Technology",
    credential: "Associate in Science",
    kind: "Degree",
    focusAreas: ["industry-and-transportation"],
    locations: ["Berlin"],
    catalogPath:
      "/diesel-heavy-equipment-technology/associate-in-science/diesel-heavy-equipment-technology",
    image: img.diesel,
  },
  {
    id: "diesel-heavy-equipment-certificate",
    title: "Diesel Heavy Equipment Technology",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["industry-and-transportation"],
    locations: ["Berlin"],
    catalogPath:
      "/diesel-heavy-equipment-technology/certificate/diesel-heavy-equipment-technology",
    image: img.diesel,
  },
  {
    id: "driver-education-instructor",
    title: "Driver Education Instructor",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["industry-and-transportation"],
    locations: ["Littleton"],
    catalogPath:
      "/driver-education-instructor/certificate/driver-education-instructor",
    image: img.classroom,
  },
  {
    id: "early-childhood-education-degree",
    title: "Early Childhood Education",
    credential: "Associate in Science",
    kind: "Degree",
    focusAreas: ["social-educational-and-behavioral-science"],
    locations: ["Berlin", "Littleton", "North Conway", "Online"],
    catalogPath:
      "/early-childhood-education/associate-in-science/early-childhood-education",
    image: img.littleton,
  },
  {
    id: "early-childhood-education-certificate",
    title: "Early Childhood Education",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["social-educational-and-behavioral-science"],
    locations: ["Berlin", "Littleton", "North Conway", "Online"],
    catalogPath:
      "/early-childhood-education/certificate/early-childhood-education",
    image: img.littleton,
  },
  {
    id: "ece-associate-teacher-credential",
    title: "Early Childhood Education Associate Teacher Credential",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["social-educational-and-behavioral-science"],
    locations: ["Berlin", "Littleton", "North Conway"],
    catalogPath:
      "/early-childhood-education/certificate/early-childhood-education-associate-teacher-credential",
    image: img.littleton,
  },
  {
    id: "electric-vehicle-technician",
    title: "Electric Vehicle Technician",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["industry-and-transportation"],
    locations: ["Berlin"],
    catalogPath: "/automotive/certificate/electric-vehicle-technician",
    image: img.diesel,
  },
  {
    id: "environmental-science",
    title: "Environmental Science",
    credential: "Associate in Science",
    kind: "Degree",
    focusAreas: ["stem-and-advanced-manufacturing"],
    locations: ["Berlin", "Online"],
    catalogPath: "/environmental-science/associate-in-science/environmental-science",
    image: img.science,
  },
  {
    id: "food-service-essentials",
    title: "Food Service Essentials",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["hospitality-and-culinary"],
    locations: ["Berlin"],
    catalogPath:
      "/culinary-artsbaking-and-pastry-arts/certificate/food-service-essentials",
    image: img.culinary,
  },
  {
    id: "health-science",
    title: "Health Science",
    credential: "Associate in Science",
    kind: "Degree",
    focusAreas: ["health-sciences-and-services"],
    locations: multiTransfer,
    catalogPath: "/health-science/associate-in-science/health-science",
    image: img.nursing,
  },
  {
    id: "human-services",
    title: "Human Services",
    credential: "Associate in Science",
    kind: "Degree",
    focusAreas: ["social-educational-and-behavioral-science"],
    locations: multiTransfer,
    catalogPath: "/human-services/associate-in-science/human-services",
    image: img.students,
  },
  {
    id: "industrial-mechanics",
    title: "Industrial Mechanics",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["industry-and-transportation"],
    locations: ["Berlin"],
    catalogPath: "/certificate/industrial-mechanics",
    image: img.trades,
  },
  {
    id: "interdisciplinary-studies",
    title: "Interdisciplinary Studies",
    credential: "Associate in Science",
    kind: "Degree",
    focusAreas: ["arts-humanities-communication-and-design"],
    locations: multiTransfer,
    catalogPath:
      "/interdisciplinary-studies/associate-in-science/interdisciplinary-studies",
    image: img.classroom,
  },
  {
    id: "it-cybersecurity",
    title: "IT Cybersecurity",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["stem-and-advanced-manufacturing"],
    locations: ["Berlin", "Online"],
    catalogPath: "/information-technology/certificate/it-cybersecurity",
    image: img.science,
  },
  {
    id: "liberal-arts",
    title: "Liberal Arts",
    credential: "Associate in Arts",
    kind: "Degree",
    focusAreas: ["arts-humanities-communication-and-design"],
    locations: multiTransfer,
    catalogPath: "/liberal-arts/associate-in-arts/liberal-arts",
    image: img.classroom,
  },
  {
    id: "library-technology",
    title: "Library Technology",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["arts-humanities-communication-and-design"],
    locations: berlinLittletonOnline,
    catalogPath: "/library-technology/certificate/library-technology",
    image: img.classroom,
  },
  {
    id: "massage-therapy",
    title: "Massage Therapy",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["health-sciences-and-services"],
    locations: ["North Conway"],
    catalogPath: "/massage-therapy/certificate/massage-therapy",
    image: img.nursing,
  },
  {
    id: "medical-assistant",
    title: "Medical Assistant",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["health-sciences-and-services"],
    locations: ["Littleton"],
    catalogPath: "/medical-assistant/certificate/medical-assistant",
    image: img.nursing,
  },
  {
    id: "medical-coding",
    title: "Medical Coding",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["health-sciences-and-services"],
    locations: ["Berlin", "Littleton", "Online"],
    catalogPath: "/medical-coding/certificate/medical-coding",
    image: img.classroom,
  },
  {
    id: "nh-professional-education-competencies",
    title: "NH Professional Education Competencies",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["social-educational-and-behavioral-science"],
    locations: berlinLittletonOnline,
    catalogPath: "/education/certificate/nh-professional-education-competencies",
    image: img.littleton,
  },
  {
    id: "nursing",
    title: "Nursing",
    credential: "Associate in Science",
    kind: "Degree",
    focusAreas: ["health-sciences-and-services"],
    locations: ["Berlin"],
    catalogPath: "/nursing/associate-in-science/nursing",
    image: img.nursing,
  },
  {
    id: "pipe-welding",
    title: "Pipe Welding",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["industry-and-transportation"],
    locations: ["Berlin"],
    catalogPath: "/welding/certificate/pipe-welding",
    image: img.welding,
  },
  {
    id: "special-education",
    title: "Special Education",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["social-educational-and-behavioral-science"],
    locations: berlinLittletonOnline,
    catalogPath: "/education/certificate/special-education",
    image: img.littleton,
  },
  {
    id: "teacher-education",
    title: "Teacher Education",
    credential: "Associate in Science",
    kind: "Degree",
    focusAreas: ["social-educational-and-behavioral-science"],
    locations: ["Berlin", "Littleton", "Online"],
    catalogPath: "/education/associate-in-science/teacher-education",
    image: img.littleton,
  },
  {
    id: "trades-management",
    title: "Trades Management",
    credential: "Associate in Science",
    kind: "Degree",
    focusAreas: ["industry-and-transportation"],
    locations: ["Berlin", "Littleton", "North Conway", "Online"],
    catalogPath: "/trades-management/associate-in-science/trades-management",
    image: img.trades,
  },
  {
    id: "veterinary-assistant",
    title: "Veterinary Assistant",
    credential: "Certificate",
    kind: "Certificate",
    focusAreas: ["health-sciences-and-services"],
    locations: ["North Conway"],
    catalogPath: "/veterinary-assistant/certificate/veterinary-assistant",
    image: img.science,
  },
];

export const programs = rawPrograms.map((program) => {
  const focus = program.focusAreas[0];
  const defaults = focusDefaults[focus] || {
    summary: `Explore the ${program.title} pathway at White Mountains Community College.`,
    outcomes: [
      "Career-focused coursework with faculty support",
      "Advising for transfer or workforce goals",
      "Flexible formats designed for North Country students",
    ],
    format: "Berlin campus with online and hybrid options where available",
  };
  const override = programOverrides[program.id] || {};

  return {
    ...program,
    location: program.locations[0],
    locations: override.locations || program.locations,
    url: catalogUrl(program.catalogPath),
    summary: override.summary || defaults.summary,
    outcomes: override.outcomes || defaults.outcomes,
    format: override.format || defaults.format,
    details: override.details || null,
  };
});

export const programTypes = [
  { id: "all", label: "All Programs" },
  { id: "Degree", label: "Degree" },
  { id: "Certificate", label: "Certificate" },
];

export const locations = [
  { id: "all", label: "All Locations" },
  { id: "Berlin", label: "Berlin (Main Campus)" },
  { id: "Littleton", label: "Littleton Academic Center" },
  { id: "North Conway", label: "North Conway Academic Center" },
  { id: "Online", label: "Online / Hybrid" },
];

export const highlights = [
  {
    label: "Application fee",
    value: "$50",
    detail: "One-time fee for most applicants",
  },
  {
    label: "Locations",
    value: "3",
    detail: "Berlin, Littleton & North Conway",
  },
  {
    label: "Programs",
    value: "35+",
    detail: "Degrees and certificates in the WMCC catalog",
  },
  {
    label: "FAFSA school code",
    value: "005291",
    detail: "Start aid early each year",
  },
];
