export const courses = [
  {
    code: "ENGL110",
    title: "College Composition I",
    credits: 4,
    subject: "English",
    description:
      "Introduces academic writing, critical reading, and research basics with an emphasis on clear thesis-driven essays.",
  },
  {
    code: "ENGL215",
    title: "Literature and Society",
    credits: 3,
    subject: "English",
    description:
      "Examines literary works in cultural context, developing analysis, discussion, and interpretive writing skills.",
  },
  {
    code: "MATH145",
    title: "Quantitative Reasoning",
    credits: 4,
    subject: "Mathematics",
    description:
      "Applies algebra, statistics, and modeling to everyday decision-making and academic problem solving.",
  },
  {
    code: "MATH210",
    title: "Statistics",
    credits: 4,
    subject: "Mathematics",
    description:
      "Covers descriptive statistics, probability, sampling, and inference for data-informed decisions.",
  },
  {
    code: "BIOL110",
    title: "Human Anatomy & Physiology I",
    credits: 4,
    subject: "Biology",
    description:
      "Studies body systems with laboratory application; foundational for nursing and allied health pathways.",
  },
  {
    code: "BIOL120",
    title: "Human Anatomy & Physiology II",
    credits: 4,
    subject: "Biology",
    description:
      "Continues systemic anatomy and physiology with clinical correlations and lab work.",
  },
  {
    code: "NURS111",
    title: "Nursing Concepts I",
    credits: 8,
    subject: "Nursing",
    description:
      "Introduces professional nursing practice, patient safety, and foundational clinical skills.",
  },
  {
    code: "CIS110",
    title: "Introduction to Computers",
    credits: 3,
    subject: "Computer Information Systems",
    description:
      "Builds digital literacy across productivity tools, file systems, and introductory computing concepts.",
  },
  {
    code: "CIS210",
    title: "Database Design",
    credits: 3,
    subject: "Computer Information Systems",
    description:
      "Covers relational modeling, SQL querying, and practical database design for business applications.",
  },
  {
    code: "BUS110",
    title: "Introduction to Business",
    credits: 3,
    subject: "Business",
    description:
      "Surveys management, marketing, finance, and operations with Seacoast employer case examples.",
  },
  {
    code: "ACCT111",
    title: "Accounting I",
    credits: 3,
    subject: "Accounting",
    description:
      "Introduces financial accounting principles, journals, ledgers, and basic statements.",
  },
  {
    code: "PSYC110",
    title: "Introduction to Psychology",
    credits: 3,
    subject: "Psychology",
    description:
      "Explores major psychological theories, research methods, and applications to everyday behavior.",
  },
  {
    code: "HIST120",
    title: "United States History I",
    credits: 3,
    subject: "History",
    description:
      "Traces early American history through founding documents, conflict, and social change.",
  },
  {
    code: "CHEM110",
    title: "Introduction to Chemistry",
    credits: 4,
    subject: "Chemistry",
    description:
      "Covers atomic structure, bonding, stoichiometry, and lab safety for STEM and health programs.",
  },
  {
    code: "VTEC110",
    title: "Introduction to Veterinary Technology",
    credits: 3,
    subject: "Veterinary Technology",
    description:
      "Orients students to veterinary clinical settings, animal handling basics, and professional ethics.",
  },
  {
    code: "CULN110",
    title: "Culinary Fundamentals",
    credits: 4,
    subject: "Culinary Arts",
    description:
      "Develops knife skills, sanitation, and foundational cooking methods for foodservice careers.",
  },
  {
    code: "AHLT115",
    title: "Medical Terminology",
    credits: 3,
    subject: "Allied Health",
    description:
      "Builds fluency with clinical vocabulary used across healthcare documentation and communication.",
  },
  {
    code: "CRIM110",
    title: "Introduction to Criminal Justice",
    credits: 3,
    subject: "Criminal Justice",
    description:
      "Surveys policing, courts, and corrections with attention to ethics and community impact.",
  },
];

export const courseOfferings = [
  {
    id: "fall-engl110-01",
    code: "ENGL110",
    section: "01",
    term: "Fall 2026",
    modality: "In person",
    days: "MW",
    time: "9:00–10:50 AM",
    seats: "12 open",
  },
  {
    id: "fall-math210-hy",
    code: "MATH210",
    section: "HY1",
    term: "Fall 2026",
    modality: "Hyflex",
    days: "TTh",
    time: "5:30–7:20 PM",
    seats: "8 open",
  },
  {
    id: "fall-biol110-01",
    code: "BIOL110",
    section: "01",
    term: "Fall 2026",
    modality: "In person + lab",
    days: "MW",
    time: "1:00–4:50 PM",
    seats: "Waitlist",
  },
  {
    id: "fall-nurs111-01",
    code: "NURS111",
    section: "01",
    term: "Fall 2026",
    modality: "Clinical",
    days: "Various",
    time: "Program schedule",
    seats: "Restricted",
  },
  {
    id: "fall-bus110-ol",
    code: "BUS110",
    section: "OL1",
    term: "Fall 2026",
    modality: "Online",
    days: "Asynchronous",
    time: "Online",
    seats: "20 open",
  },
  {
    id: "fall-cis210-01",
    code: "CIS210",
    section: "01",
    term: "Fall 2026",
    modality: "In person",
    days: "TTh",
    time: "11:00 AM–12:20 PM",
    seats: "15 open",
  },
  {
    id: "fall-culn110-01",
    code: "CULN110",
    section: "01",
    term: "Fall 2026",
    modality: "Lab",
    days: "MW",
    time: "2:00–5:50 PM",
    seats: "6 open",
  },
  {
    id: "fall-ahlt115-01",
    code: "AHLT115",
    section: "01",
    term: "Fall 2026",
    modality: "Evening",
    days: "T",
    time: "6:00–8:50 PM",
    seats: "18 open",
  },
];

export function getCourseByCode(code) {
  return courses.find((course) => course.code === code);
}

export const courseSubjects = [...new Set(courses.map((course) => course.subject))].sort();
