export const academicsNav = [
  { to: "/academics", label: "Programs", end: true },
  { to: "/academics/course-descriptions", label: "Courses" },
  { to: "/academics/calendar", label: "Calendar" },
  { to: "/academics/catalog", label: "Catalog" },
  { to: "/academics/support", label: "Support" },
  { to: "/academics/registration", label: "Registration" },
  { to: "/directory", label: "Directory" },
];

export const academicResources = [
  {
    title: "Course Descriptions",
    copy: "Browse the classes behind each major, from general education foundations to advanced technical labs.",
    linkLabel: "View course descriptions",
    to: "/academics/course-descriptions",
  },
  {
    title: "Course Schedule / Offerings",
    copy: "Plan day, evening, hybrid, hyflex, and online courses around work and family responsibilities.",
    linkLabel: "View schedule",
    to: "/academics/course-schedule",
  },
  {
    title: "College Catalog",
    copy: "Official program requirements, academic policies, and consumer disclosures.",
    linkLabel: "Open catalog",
    to: "/academics/catalog",
  },
  {
    title: "Academic Calendar",
    copy: "Keep track of semester start dates, add/drop windows, holidays, and important registration deadlines.",
    linkLabel: "View calendar",
    to: "/academics/calendar",
  },
  {
    title: "Programs for High School Students",
    copy: "Early College options help students earn credits, explore majors, and lower the eventual cost of a degree.",
    linkLabel: "Explore Early College",
    to: "/academics/high-school",
  },
  {
    title: "Registration",
    copy: "Forms and steps to register, change majors, or apply to graduate.",
    linkLabel: "Registration hub",
    to: "/academics/registration",
  },
];

export const academicSupportServices = [
  {
    title: "Academic Advising",
    copy: "Degree planning, registration help, transfer conversations, and progress check-ins.",
    to: "/academics/support/advising",
  },
  {
    title: "Tutoring & Writing Support",
    copy: "In-person tutors plus online support for math, writing, science, and more.",
    to: "/academics/support/tutoring",
  },
  {
    title: "Accessibility Services",
    copy: "Accommodations and learning support for students with documented disabilities.",
    to: "/academics/support/accessibility",
  },
  {
    title: "Success Coaching",
    copy: "Study skills, time management, goal setting, and persistence support through the semester.",
    to: "/academics/support/success-coaching",
  },
  {
    title: "Career Center",
    copy: "Resume reviews, internship guidance, career exploration, and job search support.",
    to: "/academics/support/career-center",
  },
  {
    title: "Transfer Options",
    copy: "Transfer agreements and advising for students planning a seamless path to a four-year degree.",
    to: "/academics/support/transfer",
  },
];

export const academicCalendarItems = [
  {
    term: "Fall 2026",
    items: [
      "Registration opens for continuing students",
      "Classes begin in late August",
      "Add/drop period during first week of classes",
      "Midterm advising and spring registration planning",
    ],
  },
  {
    term: "Spring 2027",
    items: [
      "January semester launch and orientation",
      "100% refund deadline early in the term",
      "Graduation intent and transfer advising checkpoints",
      "April course registration window for summer/fall",
    ],
  },
  {
    term: "Summer Sessions",
    items: [
      "Accelerated formats for general education and select major courses",
      "Financial aid timing varies for late-start sections",
      "Great option for catching up, getting ahead, or lightening fall loads",
    ],
  },
];

export const directoryDepartments = [
  {
    title: "Admissions & Enrollment",
    contacts: [
      {
        name: "Admissions Team",
        role: "Admissions Counselors",
        email: "greatbayadmissions@ccsnh.edu",
        phone: "603-427-7632",
        office: "Welcome Center",
      },
      {
        name: "Advising & Transfer Center",
        role: "Academic Advising",
        email: "greatbayadvising@ccsnh.edu",
        phone: "603-427-7728",
        office: "Suite 100",
      },
    ],
  },
  {
    title: "Academic Leadership",
    contacts: [
      {
        name: "Dr. Cheryl Lesser",
        role: "President",
        email: "askgreatbay@ccsnh.edu",
        phone: "603-427-7600",
        office: "Office of the President",
      },
      {
        name: "CAPS Team",
        role: "Center for Academic Planning and Support",
        email: "greatbaycaps@ccsnh.edu",
        phone: "603-427-7682",
        office: "Student Success Center",
      },
    ],
  },
  {
    title: "Program Contacts",
    contacts: [
      {
        name: "Nursing Program",
        role: "Health Sciences Faculty",
        email: "greatbayadmissions@ccsnh.edu",
        phone: "603-427-7632",
        office: "Health Sciences Wing",
      },
      {
        name: "Veterinary Technology Faculty",
        role: "Animal Health Programs",
        email: "greatbayadmissions@ccsnh.edu",
        phone: "603-427-7632",
        office: "Life Sciences Labs",
      },
      {
        name: "Business & Technology Faculty",
        role: "Business, IT, and Data Programs",
        email: "greatbayadmissions@ccsnh.edu",
        phone: "603-427-7632",
        office: "Academic Affairs",
      },
    ],
  },
  {
    title: "Student Support Offices",
    contacts: [
      {
        name: "Financial Aid Office",
        role: "Aid, FAFSA, and Book Advances",
        email: "greatbayfinancialaid@ccsnh.edu",
        phone: "603-427-7600 ext. 7501",
        office: "Welcome Center",
      },
      {
        name: "Student Life Office",
        role: "Clubs, activities, and leadership",
        email: "askgreatbay@ccsnh.edu",
        phone: "603-427-7632",
        office: "Student Success Center",
      },
      {
        name: "Athletics Department",
        role: "Varsity and intramural athletics",
        email: "greatbayathletics@ccsnh.edu",
        phone: "603-427-7733",
        office: "Athletics",
      },
    ],
  },
];

const focusProfileMap = {
  business: {
    blurb:
      "students with practical communication, applied analytics, and employer-ready business habits.",
    outcomes: [
      "Build core professional communication and presentation skills",
      "Interpret business, accounting, and operations data for decision-making",
      "Apply project management and collaboration habits in team settings",
    ],
    courses: ["Introduction to Business", "Spreadsheet Applications", "Managerial Communication", "Capstone Project"],
    careers: ["Operations Coordinator", "Bookkeeping Specialist", "Business Analyst Assistant", "Transfer Student"],
  },
  "health-sciences-and-services": {
    blurb:
      "students for regulated, patient-facing, and lab-supported care environments with strong standards for safety and professionalism.",
    outcomes: [
      "Practice with safety, ethics, and patient-centered communication",
      "Use discipline-specific tools, documentation, and clinical processes",
      "Prepare for licensure, certification, or employer onboarding requirements",
    ],
    courses: ["Anatomy & Physiology", "Foundations of Healthcare", "Clinical Applications", "Professional Practice"],
    careers: ["Clinical Support Roles", "Licensed/Certified Healthcare Pathways", "Transfer into Allied Health", "Community Health Settings"],
  },
  "hospitality-and-culinary": {
    blurb:
      "students for guest service, event execution, hospitality operations, and food-focused careers on the Seacoast.",
    outcomes: [
      "Deliver strong customer experience and service recovery",
      "Coordinate operations, events, or foodservice workflows under deadlines",
      "Apply sustainability and cost-awareness to hospitality environments",
    ],
    courses: ["Hospitality Operations", "Event Planning", "Guest Experience", "Food Systems & Sustainability"],
    careers: ["Hospitality Coordinator", "Event Planner", "Restaurant Operations", "Tourism & Guest Services"],
  },
  "industry-and-transportation": {
    blurb:
      "students through hands-on technical instruction aligned with modern equipment, troubleshooting, and safety practices.",
    outcomes: [
      "Diagnose and solve equipment or systems problems methodically",
      "Use industry-standard tools with attention to safety and quality",
      "Document work processes and communicate effectively with teams and customers",
    ],
    courses: ["Technical Foundations", "Shop Safety", "Diagnostics Lab", "Applied Systems Maintenance"],
    careers: ["Technician Roles", "Service Specialist", "Skilled Trades Pathways", "Employer-Sponsored Advancement"],
  },
  "social-educational-and-behavioral-science": {
    blurb:
      "students for transfer study, public service, education, and community-centered careers through analysis of people and institutions.",
    outcomes: [
      "Analyze social systems, behavior, and historical or civic contexts",
      "Communicate ideas clearly in writing, discussion, and presentation",
      "Apply ethical reasoning and inclusive practices in community settings",
    ],
    courses: ["Introduction to Psychology", "Sociocultural Perspectives", "Composition & Research", "Community Engagement"],
    careers: ["Transfer into Four-Year Programs", "Community Services", "Education Pathways", "Public Sector Support Roles"],
  },
  "stem-and-advanced-manufacturing": {
    blurb:
      "students for analytical, lab-based, computational, and technical problem-solving work in high-demand fields.",
    outcomes: [
      "Apply quantitative reasoning and evidence-based problem solving",
      "Use technology, lab processes, or coding tools appropriate to the field",
      "Translate theory into real-world design, testing, or systems work",
    ],
    courses: ["College Algebra or Statistics", "Lab Science / Technical Studio", "Programming or Systems Tools", "Applied Project"],
    careers: ["Lab Technician", "IT / Cyber Roles", "Manufacturing Support", "Engineering or Science Transfer"],
  },
  "arts-humanities-communication-and-design": {
    blurb:
      "students through creative inquiry, writing, design, and broad liberal learning that supports transfer and communication-heavy careers.",
    outcomes: [
      "Write, present, and communicate to different audiences effectively",
      "Analyze creative work, culture, and ideas through multiple perspectives",
      "Develop portfolios, research habits, and adaptable problem-solving skills",
    ],
    courses: ["Composition", "Creative / Visual Practice", "Humanities Seminar", "Portfolio or Research Project"],
    careers: ["Transfer into BA/BS Programs", "Communications Support", "Creative Production", "Community Arts & Media"],
  },
};

const contactByFocus = {
  business: { name: "Business & Technology Faculty", email: "greatbayadmissions@ccsnh.edu", phone: "603-427-7632" },
  "health-sciences-and-services": { name: "Health Sciences Faculty", email: "greatbayadmissions@ccsnh.edu", phone: "603-427-7632" },
  "hospitality-and-culinary": { name: "Hospitality & Culinary Programs", email: "greatbaybtc@ccsnh.edu", phone: "603-427-7653" },
  "industry-and-transportation": { name: "Industry & Transportation Faculty", email: "greatbayadmissions@ccsnh.edu", phone: "603-427-7632" },
  "social-educational-and-behavioral-science": { name: "Liberal Arts & Public Service Faculty", email: "greatbayadmissions@ccsnh.edu", phone: "603-427-7632" },
  "stem-and-advanced-manufacturing": { name: "STEM & Advanced Manufacturing Faculty", email: "greatbayadmissions@ccsnh.edu", phone: "603-427-7632" },
  "arts-humanities-communication-and-design": { name: "Arts & Humanities Faculty", email: "greatbayadmissions@ccsnh.edu", phone: "603-427-7632" },
};

export function getProgramProfile(program, focusAreas) {
  const primaryFocus = program.focusAreas[0] || "business";
  const profile = focusProfileMap[primaryFocus] || focusProfileMap.business;
  const contact = contactByFocus[primaryFocus] || contactByFocus.business;
  const areaNames = focusAreas
    .filter((area) => program.focusAreas.includes(area.id))
    .map((area) => area.title);

  return {
    overview:
      `The ${program.title} ${program.credential.toLowerCase()} prepares ${profile.blurb}`,
    outcomes: profile.outcomes,
    courses: profile.courses,
    careers: profile.careers,
    contact,
    areaNames,
    format:
      program.kind === "Degree"
        ? "Best for students seeking a complete associate pathway, transfer option, or deeper career preparation."
        : "Best for students seeking direct-to-career skill building, upskilling, or a shorter path to employment.",
  };
}
