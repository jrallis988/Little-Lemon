export const navLinks = [
  { to: "/programs", label: "Programs" },
  { to: "/admissions", label: "Admissions" },
  { to: "/financial-aid", label: "Financial Aid" },
  { to: "/student-life", label: "Student Life" },
  { to: "/about", label: "About" },
];

export const utilityLinks = [
  { to: "/student-life", label: "Current Students" },
  { href: "https://myrvcc.rivervalley.edu", label: "My RVCC", external: true },
  { href: "https://www.ccsnh.edu/online-resources/", label: "CCSNH Login", external: true },
];

export const portalLinks = [
  {
    label: "My RVCC",
    href: "https://myrvcc.rivervalley.edu",
    detail: "Campus hub for news, resources, and quick links",
  },
  {
    label: "CCSNH Online Resources",
    href: "https://www.ccsnh.edu/online-resources/",
    detail: "Canvas, SIS, student email, and EasyLogin tools",
  },
  {
    label: "Apps Portal",
    href: "https://portal.ccsnh.edu/",
    detail: "Sign in once for CCSNH apps and MFA setup",
  },
  {
    label: "College Catalog",
    href: "https://catalog.rivervalley.edu/",
    detail: "Official degrees, certificates, and student handbook",
  },
  {
    label: "Course Schedules",
    href: "https://www.rivervalley.edu/admissions/course-schedules/",
    detail: "Browse upcoming semester offerings",
  },
  {
    label: "Apply online",
    href: "https://www.rivervalley.edu/admissions/welcome/",
    detail: "Free RVCC application and transcript instructions",
  },
];

/** Claim this Formspree form, then paste the /f/{id} into REACT_APP_FORMSPREE_ID */
export const formspreeClaimUrl =
  "https://formspree.io/claim?name=RVCC+Admissions+Inquiry&project=river-valley-website&field.name=text,required,maxlength:100,prettyName:Full+name&field.email=email,required&field.phone=text,maxlength:40,prettyName:Phone&field.interest=text,maxlength:100,prettyName:Area+of+interest&field.campus=text,maxlength:40,prettyName:Preferred+campus&field.startTerm=text,maxlength:40,prettyName:Preferred+start+term&field.message=text,maxlength:2000&action.email=jjrallis%40unh.edu";

export const studentOps = [
  {
    key: "01",
    title: "EasyLogin",
    code: "passwordstu.ccsnh.edu",
    steps: [
      "Open CCSNH Online Resources → Student EasyLogin Self Service",
      "Reset password with the EasyLogin username from Admissions",
      "Enable MFA, then sign in at portal.ccsnh.edu",
    ],
    href: "https://passwordstu.ccsnh.edu/showLogin.cc",
    cta: "Open EasyLogin",
  },
  {
    key: "02",
    title: "Register",
    code: "sis.ccsnh.edu · myrvcc",
    steps: [
      "Review the course schedule for your campus/term",
      "Meet your advisor (or use Navigate) to confirm your plan",
      "Register in SIS / My RVCC before payment deadlines",
    ],
    href: "https://www.rivervalley.edu/admissions/course-schedules/",
    cta: "Course schedules",
  },
  {
    key: "03",
    title: "Pay",
    code: "SIS → Student Account",
    steps: [
      "Accept aid awards in SIS when prompted",
      "Pay remaining balance online or at Student Accounts",
      "Confirm enrollment holds are cleared before day one",
    ],
    href: "https://www.ccsnh.edu/online-resources/",
    cta: "Open SIS resources",
  },
];

export const contact = {
  phone: "(603) 542-7744",
  tollFree: "(800) 837-0658",
  email: "admissions@rivervalley.edu",
  address: "1 College Place, Claremont, NH 03743",
  itHelp: {
    phone: "(603) 542-7744 ext. 5360",
    email: "RVCCITSupport@ccsnh.edu",
  },
};

export const admissionsTeam = [
  {
    name: "Suzanne Groenewold",
    role: "Director of Enrollment and Marketing",
    phone: "(603) 542-7744 x5326",
  },
  {
    name: "Courtney Prentiss",
    role: "Enrollment Specialist",
    phone: "(603) 542-7744 x5311",
  },
  {
    name: "Leah Rothenberg",
    role: "Allied Health Program Assistant",
    phone: "(603) 542-7744 x5332",
  },
  {
    name: "Judy Hoffman",
    role: "Academic Center Supervisor — Keene",
    phone: "(603) 542-7744 x5725",
  },
  {
    name: "Charlene Ashey",
    role: "Academic Center Supervisor — Lebanon",
    phone: "(603) 542-7744 x5825",
  },
];

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
    title: "A&P I Prep Course",
    detail: "Non-credit prep to get ready for Anatomy & Physiology I",
    cta: "Ask admissions",
    to: "/admissions",
  },
  {
    title: "Scholarships & Aid",
    detail: "Grants and scholarships are available — FAFSA school code 007560",
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
    catalogUrl: "https://catalog.rivervalley.edu/degrees",
    selective: true,
    prerequisites: [
      "High school diploma or equivalent",
      "Program-specific application materials and advising",
      "Prerequisite coursework and clinical clearance before rotations",
    ],
    careers: [
      "Registered Nurse",
      "Licensed Practical Nurse",
      "Hospital and clinic care roles",
    ],
    summary:
      "Prepare for bedside care through rigorous classroom learning and supervised clinical experience across the river valley.",
    highlights: [
      "Registered Nursing (RN) and Practical Nursing (LPN) pathways",
      "LPN-to-RN bridge and direct-entry options, including accelerated tracks",
      "Clinical placements with regional partners and NCLEX-focused preparation",
    ],
    nextStep: "Talk with admissions about prerequisites, selective admission, and start terms.",
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
    selective: true,
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
    selective: true,
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
      "Concentrations in English, mathematics, psychology, science, or an open pathway",
      "Online accelerated open pathway option",
      "Transfer-friendly core with strong writing and critical thinking",
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
    selective: true,
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
    selective: true,
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
    catalogUrl: "https://catalog.rivervalley.edu/massage-therapy",
    officialUrl: "https://www.rivervalley.edu/program/massage-therapy/",
    prerequisites: [
      "Interest in bodywork and client care",
      "Program kit and clinical readiness as advised",
      "See official catalog for current hour and licensure requirements",
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
    nextStep: "Confirm Lebanon start dates and kits against the official catalog.",
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
    selective: true,
    catalogUrl: "https://catalog.rivervalley.edu/phlebotomy",
    officialUrl: "https://www.rivervalley.edu/program/phlebotomy/",
    prerequisites: [
      "High school diploma or equivalent",
      "Clinical readiness as required by the current catalog",
      "Program-specific health and background clearances",
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
    nextStep: "Verify upcoming cohort dates in the official phlebotomy listing.",
  },
  {
    slug: "medical-laboratory-technician",
    name: "Medical Laboratory Technician",
    area: "Health Sciences",
    credential: "Associate in Science",
    format: "In-person with clinicals",
    duration: "About 2 years",
    campuses: ["Claremont"],
    startTerms: ["Fall"],
    selective: true,
    catalogUrl: "https://catalog.rivervalley.edu/medical-laboratory-technician",
    officialUrl: "https://catalog.rivervalley.edu/medical-laboratory-technician",
    prerequisites: [
      "Program advising and selective admission review",
      "Science readiness for clinical lab coursework",
      "Clinical clearance before practicum",
    ],
    careers: [
      "Medical laboratory technician",
      "Hospital and reference lab roles",
      "Diagnostic testing support",
    ],
    summary:
      "Train to run clinical laboratory tests that help physicians diagnose and monitor patient care.",
    highlights: [
      "Clinical chemistry, hematology, and microbiology foundations",
      "Hands-on lab technique and quality practices",
      "Selective allied health pathway with clinical placements",
    ],
    nextStep: "Review MLT admission requirements in the official catalog.",
  },
  {
    slug: "healthcare-applications",
    name: "Healthcare Applications (Pre-Professional)",
    area: "Health Sciences",
    credential: "Certificate",
    format: "Flexible formats",
    duration: "Stackable certificate pathway",
    campuses: ["Claremont", "Keene", "Lebanon", "Online / hybrid"],
    startTerms: ["Fall", "Spring"],
    catalogUrl:
      "https://catalog.rivervalley.edu/healthcare/healthcare-applications-certificate",
    officialUrl: "https://www.rivervalley.edu/program/healthcare-2/",
    prerequisites: [
      "High school diploma or equivalent",
      "Advising to choose the matching pre-professional track",
      "See catalog tracks: Pre-RN, Pre-LPN, Pre-Rad Tech, Pre-OTA/PTA, Pre-Respiratory, Pre-MLT, Pre-Dental Hygiene",
    ],
    careers: [
      "Preparation for competitive health programs",
      "Entry healthcare support roles while you build prerequisites",
      "Transfer into RN, Rad Tech, OTA, PTA, and related pathways",
    ],
    summary:
      "Build the science and healthcare foundations used for pre-RN, pre-LPN, pre-Rad Tech, pre-OTA/PTA, pre-Respiratory, and related tracks.",
    highlights: [
      "Named pre-professional options in the official catalog",
      "Stackable coursework while you prepare to apply",
      "Advising support to choose the right sequence",
    ],
    nextStep: "Open the catalog certificate page and pick your pre-professional track.",
  },
  {
    slug: "licensed-nursing-assistant",
    name: "Licensed Nursing Assistant (LNA)",
    area: "Health Sciences",
    credential: "Certificate",
    format: "In-person with clinical practice",
    duration: "Short-term workforce certificate",
    campuses: ["Claremont", "Lebanon"],
    startTerms: ["Fall", "Spring"],
    catalogUrl: "https://www.rivervalley.edu/program/lna-licensed-nursing-assistant-2/",
    officialUrl: "https://www.rivervalley.edu/program/lna-licensed-nursing-assistant-2/",
    prerequisites: [
      "Interest in direct patient care",
      "Clinical readiness and background requirements as published on the LNA program page",
      "Workforce Development confirmation of cohort schedule and tuition",
    ],
    careers: [
      "Licensed nursing assistant",
      "Long-term care and hospital support roles",
      "Stepping stone into LPN or RN pathways",
    ],
    summary:
      "Enter patient care quickly with skills for bedside support in hospitals, clinics, and long-term care settings.",
    highlights: [
      "Workforce Development pathway with published NH salary ranges",
      "Hands-on nursing lab practice supported by Byrne and Mascoma foundations",
      "Natural ladder into practical and registered nursing programs",
    ],
    nextStep: "Use the official LNA page for admission, schedule, and tuition details.",
  },
  {
    slug: "general-studies",
    name: "General Studies",
    area: "Education & Human Services",
    credential: "Associate of Science",
    format: "In-person, online, and hybrid",
    duration: "About 2 years",
    campuses: ["Claremont", "Keene", "Lebanon", "Online / hybrid"],
    startTerms: ["Fall", "Spring", "Summer"],
    catalogUrl: "https://catalog.rivervalley.edu/general-studies",
    officialUrl: "https://catalog.rivervalley.edu/general-studies",
    prerequisites: [
      "High school diploma or equivalent",
      "Advising to design a goal-aligned course plan",
    ],
    careers: [
      "Flexible transfer exploration",
      "Workplace advancement with a degree credential",
      "Custom pathway before specializing",
    ],
    summary:
      "Design a flexible associate degree around your transfer goals, career interests, and schedule.",
    highlights: [
      "Customizable course planning",
      "Room to explore before committing to a major",
      "Works well for working adults balancing school and life",
    ],
    nextStep: "Meet advising to sketch a transfer or career-focused plan.",
  },
  {
    slug: "advanced-machine-tool",
    name: "Advanced Machine Tool Technology",
    area: "STEM & Technology",
    credential: "Certificate",
    format: "In-person labs",
    duration: "Certificate pathway",
    campuses: ["Claremont"],
    startTerms: ["Fall", "Spring"],
    catalogUrl: "https://catalog.rivervalley.edu/advanced-machine-tool-technology",
    officialUrl: "https://catalog.rivervalley.edu/advanced-machine-tool-technology",
    prerequisites: [
      "Comfort with hands-on technical work",
      "Advising for shop safety and tool readiness",
    ],
    careers: [
      "CNC / machine tool support roles",
      "Precision manufacturing pathways",
      "Advanced manufacturing entry points",
    ],
    summary:
      "Build precision machining skills for advanced manufacturing employers in the region.",
    highlights: [
      "Hands-on machine tool practice",
      "Manufacturing-ready technical skills",
      "Certificate focused on workplace readiness",
    ],
    nextStep: "Confirm lab schedules in the official catalog entry.",
  },
  {
    slug: "peer-support",
    name: "Peer Support",
    area: "Education & Human Services",
    credential: "Certificate",
    format: "Workforce / flexible formats",
    duration: "Short-term certificate",
    campuses: ["Claremont", "Keene", "Lebanon"],
    startTerms: ["Fall", "Spring"],
    catalogUrl: "https://www.rivervalley.edu/program/peersupport/",
    officialUrl: "https://www.rivervalley.edu/program/peersupport/",
    prerequisites: [
      "Interest in recovery-oriented and helping roles",
      "Confirm current class format, cost, and schedule on the official Peer Support page",
      "Workforce Development contact for cohort timing",
    ],
    careers: [
      "Peer support specialist pathways",
      "Behavioral health and recovery support roles",
      "Community and nonprofit helping professions",
    ],
    summary:
      "Prepare to support others through lived-experience informed, recovery-oriented helping skills.",
    highlights: [
      "Workforce Development pathway with published schedule and cost details",
      "Community mental health and recovery focus",
      "Practical helping and communication skills",
    ],
    nextStep: "Open the official Peer Support page for format, cost, and schedule.",
  },
];

export const programAreas = [
  {
    slug: "health-sciences",
    name: "Health Sciences",
    summary:
      "Nursing, imaging, therapy, lab science, and allied health pathways built for clinical careers.",
    image: images.healthcare,
    programSlugs: [
      "nursing",
      "radiologic-technology",
      "respiratory-therapy",
      "medical-laboratory-technician",
      "occupational-therapy-assistant",
      "physical-therapist-assistant",
      "medical-assistant",
      "massage-therapy",
      "healthcare-applications",
      "licensed-nursing-assistant",
      "phlebotomy",
    ],
  },
  {
    slug: "stem-technology",
    name: "STEM & Technology",
    summary:
      "Hands-on preparation for cybersecurity, networks, science, and advanced manufacturing roles.",
    image: images.science,
    programSlugs: [
      "cybersecurity",
      "information-technology",
      "advanced-machine-tool",
    ],
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
      "Programs for educators, caregivers, transfer explorers, and community-centered professionals.",
    image: images.ece,
    programSlugs: [
      "early-childhood-education",
      "liberal-arts",
      "psychology",
      "social-services",
      "general-studies",
      "peer-support",
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
  fafsaCode: "007560",
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
    "Use FAFSA school code 007560 for River Valley Community College.",
  ],
  enrollment: [
    { label: "Full time", detail: "12 or more credits per semester" },
    { label: "¾ time", detail: "9–11 credits per semester" },
    { label: "Part time", detail: "6–8 credits per semester" },
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
    copy: "Use RVCC school code 007560 and submit early so grants and loans can be packaged on time. Preferred filing date is April 1 for the upcoming aid year.",
  },
  {
    title: "Review your award",
    copy: "Compare grants, scholarships, and loan options with Financial Aid before you accept anything in SIS.",
  },
  {
    title: "Apply for scholarships",
    copy: "Local and Foundation for NH Community Colleges scholarships can stack with federal aid and lower what you borrow.",
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

export const studentResources = [
  {
    title: "Accessibility services",
    copy: "Request accommodations and learning supports so coursework fits how you learn best.",
  },
  {
    title: "Advising, career & transfer",
    copy: "Map courses, careers, and bachelor’s pathways with people who know CCSNH transfer options.",
  },
  {
    title: "IT & EasyLogin help",
    copy: "Get Canvas, SIS, email, and password support from the Claremont help desk and CCSNH portals.",
  },
  {
    title: "Orientation",
    copy: "Join in-person or online new-student orientation before your first semester starts.",
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
