export const focusAreas = [
  {
    id: "healthcare",
    title: "Healthcare & Nursing",
    summary:
      "Train for high-demand clinical careers with hands-on labs and statewide clinical partners.",
  },
  {
    id: "stem",
    title: "Math, Engineering & IT",
    summary:
      "Build technical fluency for New Hampshire’s engineering, manufacturing, and tech employers.",
  },
  {
    id: "business",
    title: "Business & Professional Studies",
    summary:
      "Gain practical skills for accounting, management, and transfer-ready business pathways.",
  },
  {
    id: "public",
    title: "Public Service & Education",
    summary:
      "Serve communities through criminal justice, education, and human services pathways.",
  },
  {
    id: "arts",
    title: "Liberal Arts & Sciences",
    summary:
      "Explore transfer-friendly foundations in arts, sciences, and general studies.",
  },
];

export const programs = [
  {
    id: "nursing",
    name: "Nursing",
    credential: "Associate of Science",
    focus: "healthcare",
    type: "degree",
    online: false,
    summary:
      "Prepare for RN licensure through classroom learning and clinical rotations with New Hampshire healthcare partners.",
    highlights: ["Clinical placements", "NCLEX-focused preparation", "LPN & paramedic bridge options"],
    careers: ["Registered Nurse", "Acute care nursing", "Community health"],
  },
  {
    id: "dental-hygiene",
    name: "Dental Hygiene",
    credential: "Associate of Science",
    focus: "healthcare",
    type: "degree",
    online: false,
    summary:
      "One of New Hampshire’s signature dental programs, combining clinic experience with patient-centered care.",
    highlights: ["On-campus dental clinic", "State-unique pathway", "Licensure preparation"],
    careers: ["Dental hygienist", "Public health dental roles"],
  },
  {
    id: "radiologic-technology",
    name: "Radiologic Technology",
    credential: "Associate of Science",
    focus: "healthcare",
    type: "degree",
    online: false,
    summary:
      "Learn imaging science and patient care in labs and clinical settings across the region.",
    highlights: ["100% national exam pass rate (2026 cohort)", "Clinical partnerships", "Hands-on labs"],
    careers: ["Radiologic technologist", "Hospital imaging departments"],
  },
  {
    id: "sonography",
    name: "Diagnostic Medical Sonography",
    credential: "Associate of Science",
    focus: "healthcare",
    type: "degree",
    online: false,
    summary:
      "Train in ultrasound imaging with focused coursework and supervised clinical practice.",
    highlights: ["Specialized imaging pathway", "Clinical hours", "Patient communication skills"],
    careers: ["Diagnostic medical sonographer"],
  },
  {
    id: "paramedic",
    name: "Paramedic Emergency Medicine",
    credential: "Associate / Certificate pathways",
    focus: "healthcare",
    type: "degree",
    online: false,
    summary:
      "Build advanced emergency medical skills for ambulance, hospital, and field response careers.",
    highlights: ["Scenario-based training", "Statewide demand", "Bridge options into nursing"],
    careers: ["Paramedic", "EMS leadership pathways"],
  },
  {
    id: "computer-engineering",
    name: "Computer Engineering Technology",
    credential: "Associate of Science",
    focus: "stem",
    type: "degree",
    online: false,
    summary:
      "Design, test, and support computing and electronics systems used across industry.",
    highlights: ["Hardware + software foundation", "Lab-intensive learning", "Transfer and workforce paths"],
    careers: ["Electronics technician", "Systems support", "Engineering tech roles"],
  },
  {
    id: "mechanical-engineering",
    name: "Mechanical Engineering Technology",
    credential: "Associate of Science",
    focus: "stem",
    type: "degree",
    online: false,
    summary:
      "Apply mechanics, materials, and manufacturing concepts to real engineering problems.",
    highlights: ["CAD and manufacturing labs", "Industry-aligned projects", "Transfer agreements"],
    careers: ["Mechanical engineering technician", "Manufacturing support"],
  },
  {
    id: "architectural-engineering",
    name: "Architectural Engineering Technology",
    credential: "Associate of Science",
    focus: "stem",
    type: "degree",
    online: false,
    summary:
      "Develop drafting, design, and building-systems skills for architecture and construction fields.",
    highlights: ["Design studios", "Building systems focus", "Portfolio development"],
    careers: ["Architectural technician", "CAD specialist", "Construction coordination"],
  },
  {
    id: "civil-engineering",
    name: "Civil Engineering Technology",
    credential: "Associate of Science",
    focus: "stem",
    type: "degree",
    online: false,
    summary:
      "Prepare for infrastructure and site work through surveying, materials, and design coursework.",
    highlights: ["Field and lab practice", "Infrastructure focus", "Employer-ready skills"],
    careers: ["Civil engineering technician", "Survey support", "Public works"],
  },
  {
    id: "software-development",
    name: "Advanced Software Development",
    credential: "Certificate",
    focus: "stem",
    type: "certificate",
    online: true,
    summary:
      "Build modern application skills for software roles or stack onto an existing degree path.",
    highlights: ["Flexible online options", "Project-based learning", "Career acceleration"],
    careers: ["Junior developer", "Application support", "IT pathways"],
  },
  {
    id: "business-administration",
    name: "Business Administration",
    credential: "Associate of Science",
    focus: "business",
    type: "degree",
    online: true,
    summary:
      "Learn management, marketing, and operations fundamentals for workplace and transfer goals.",
    highlights: ["Online & on-campus options", "Transfer-friendly", "Applied business projects"],
    careers: ["Office management", "Sales", "Operations support"],
  },
  {
    id: "accounting",
    name: "Accounting",
    credential: "Associate of Science",
    focus: "business",
    type: "degree",
    online: true,
    summary:
      "Develop financial reporting and analysis skills valued by employers and baccalaureate programs.",
    highlights: ["Fully online option", "ACBSP-aligned business pathway", "Certificate stackables"],
    careers: ["Bookkeeper", "Staff accountant", "Payroll specialist"],
  },
  {
    id: "communications",
    name: "Communications",
    credential: "Associate degree pathway",
    focus: "business",
    type: "degree",
    online: false,
    summary:
      "Strengthen writing, media, and presentation skills for business, public relations, and transfer.",
    highlights: ["Media practice", "Transfer preparation", "Professional communication"],
    careers: ["Communications assistant", "Media support", "Public relations pathways"],
  },
  {
    id: "hospitality",
    name: "Hospitality & Tourism Management",
    credential: "Associate / Certificate pathways",
    focus: "business",
    type: "degree",
    online: false,
    summary:
      "Prepare for New Hampshire’s hospitality and visitor economy with operations-focused coursework.",
    highlights: ["Industry connections", "Customer experience focus", "Flexible credentials"],
    careers: ["Hotel operations", "Event support", "Tourism services"],
  },
  {
    id: "criminal-justice",
    name: "Criminal Justice",
    credential: "Associate of Science",
    focus: "public",
    type: "degree",
    online: true,
    summary:
      "Study justice systems, community safety, and professional ethics for public service careers.",
    highlights: ["Online options", "Field-informed faculty", "Transfer pathways"],
    careers: ["Law enforcement pathways", "Corrections", "Court services"],
  },
  {
    id: "early-childhood",
    name: "Early Childhood Education",
    credential: "Associate / Certificate pathways",
    focus: "public",
    type: "degree",
    online: false,
    summary:
      "Learn to support young learners through classroom practice and child-development coursework.",
    highlights: ["Field experience", "Entry to advanced certificates", "Community partnerships"],
    careers: ["Preschool teacher", "Child care lead", "Education support roles"],
  },
  {
    id: "education",
    name: "Education",
    credential: "Associate degree pathway",
    focus: "public",
    type: "degree",
    online: false,
    summary:
      "Build foundations for teaching and transfer into educator preparation at four-year colleges.",
    highlights: ["Classroom observation", "Transfer agreements", "Community-based learning"],
    careers: ["Paraprofessional", "Transfer to teacher prep"],
  },
  {
    id: "addiction-counseling",
    name: "Addiction Counseling",
    credential: "Certificate / Degree pathway",
    focus: "public",
    type: "certificate",
    online: false,
    summary:
      "Prepare to support individuals and families navigating substance use recovery systems.",
    highlights: ["Practice-focused training", "Community need", "Human service alignment"],
    careers: ["Recovery support", "Counseling aide pathways"],
  },
  {
    id: "human-service",
    name: "Human Service",
    credential: "Associate degree pathway",
    focus: "public",
    type: "degree",
    online: false,
    summary:
      "Develop helping skills for social service, nonprofit, and community support roles.",
    highlights: ["Internship opportunities", "Ethics and advocacy", "Transfer options"],
    careers: ["Case aide", "Nonprofit support", "Community outreach"],
  },
  {
    id: "liberal-arts",
    name: "Liberal Arts",
    credential: "Associate of Arts",
    focus: "arts",
    type: "degree",
    online: true,
    summary:
      "A flexible transfer foundation across humanities, social sciences, and general education.",
    highlights: ["Highly transferrable", "Customizable electives", "Online-friendly options"],
    careers: ["Transfer pathway", "Broad professional foundation"],
  },
  {
    id: "biology",
    name: "Biology",
    credential: "Associate pathway",
    focus: "arts",
    type: "degree",
    online: false,
    summary:
      "Explore life sciences with lab work that supports healthcare, research, and transfer goals.",
    highlights: ["Lab science sequence", "STEM transfer prep", "Healthcare-adjacent foundation"],
    careers: ["Lab support", "Transfer into biology/health majors"],
  },
  {
    id: "visual-arts",
    name: "Visual Arts",
    credential: "Associate pathway",
    focus: "arts",
    type: "degree",
    online: false,
    summary:
      "Develop creative practice and portfolio skills in studio and digital arts environments.",
    highlights: ["Studio practice", "Portfolio building", "Campus gallery connections"],
    careers: ["Design assistant", "Studio practice", "Transfer into art programs"],
  },
  {
    id: "english",
    name: "English",
    credential: "Associate pathway",
    focus: "arts",
    type: "degree",
    online: true,
    summary:
      "Strengthen reading, writing, and analysis for communication-heavy careers and transfer.",
    highlights: ["Writing-intensive courses", "Transfer preparation", "Critical thinking"],
    careers: ["Writing support roles", "Communications pathways", "Transfer major"],
  },
  {
    id: "general-studies",
    name: "General Studies",
    credential: "Associate degree",
    focus: "arts",
    type: "degree",
    online: true,
    summary:
      "Design a broad academic path while you explore majors, transfer goals, or career options.",
    highlights: ["Maximum flexibility", "Advisor-guided planning", "Online and on-campus"],
    careers: ["Exploratory pathway", "Transfer foundation"],
  },
];

export const reasons = [
  {
    title: "Affordable by design",
    text: "One of New Hampshire’s lowest tuition options, with credits that transfer to UNH, SNHU, Plymouth State, and more.",
  },
  {
    title: "A real campus",
    text: "240 riverside acres in Concord — and the only community college in the state with on-campus residence halls.",
  },
  {
    title: "Career-ready programs",
    text: "80+ degrees and certificates shaped around NH’s workforce needs in healthcare, IT, engineering, and education.",
  },
];

export const admissionsSteps = [
  {
    step: "01",
    title: "Explore programs",
    text: "Find a degree or certificate that matches your goal — career entry, advancement, or transfer.",
  },
  {
    step: "02",
    title: "Apply online",
    text: "No application fee. Complete a straightforward application and connect with Admissions.",
  },
  {
    step: "03",
    title: "Plan your path",
    text: "Meet with advising, review financial aid, and register for courses that fit your schedule.",
  },
  {
    step: "04",
    title: "Start strong",
    text: "Join orientation, settle into campus life, and begin building toward your next chapter.",
  },
];

export const campusHighlights = [
  {
    title: "Residence halls",
    text: "Live on campus and stay close to classes, clubs, and Concord’s capital-city energy.",
    image: "/media/residence.jpg",
  },
  {
    title: "Student life",
    text: "20+ clubs and organizations, a full student center, and spaces to study, gather, and recharge.",
    image: "/media/lounge.jpg",
  },
  {
    title: "Lynx athletics",
    text: "Cheer on competitive teams and join intramurals at the Dr. Goldie Crocker Wellness Center.",
    image: "/media/athletics.jpg",
  },
  {
    title: "Riverfront setting",
    text: "A picturesque Merrimack River campus with room to move, learn, and belong.",
    image: "/media/campus-hero.jpg",
  },
];

export const newsItems = [
  {
    id: "rad-tech-pass-rate",
    date: "2026-07-22",
    displayDate: "July 22, 2026",
    title: "Radiologic Technology graduates earn 100% national exam pass rate",
    summary:
      "NHTI’s latest Radiologic Technology cohort achieved a perfect pass rate on the national certification exam.",
    body: "Concord, NH — Graduates of NHTI’s Radiologic Technology program earned a 100% pass rate on the national certification exam, continuing the college’s strong outcomes in allied health. Faculty credit hands-on labs, clinical partnerships, and focused exam preparation for the result.",
    image: "/media/rad-tech.jpg",
  },
  {
    id: "early-educator-camp",
    date: "2026-07-06",
    displayDate: "July 6, 2026",
    title: "Free summer camp opens doors to future early educators",
    summary:
      "A no-cost summer experience introduced high school students to careers in early childhood education.",
    body: "NHTI welcomed future educators to a free summer camp exploring child development, classroom practice, and pathways into Early Childhood Education programs — part of a broader effort to grow New Hampshire’s educator pipeline.",
    image: "/media/student-life.jpg",
  },
  {
    id: "medical-imaging-certificate",
    date: "2026-06-23",
    displayDate: "June 23, 2026",
    title: "New certificate program launches for medical imaging",
    summary:
      "A new certificate expands options for students entering medical imaging fields.",
    body: "NHTI launched a new medical imaging certificate designed to help students build specialized skills for high-demand diagnostic careers while connecting to existing healthcare pathways at the college.",
    image: "/media/rad-tech.jpg",
  },
];

export const events = [
  {
    id: "open-house-fall",
    date: "2026-08-15",
    displayDate: "Aug 15, 2026",
    time: "10:00 a.m. – 1:00 p.m.",
    title: "Fall Open House",
    location: "Student Center, Concord campus",
    summary:
      "Tour classrooms and residence halls, meet faculty, and get admissions and financial aid questions answered.",
  },
  {
    id: "nursing-info",
    date: "2026-08-27",
    displayDate: "Aug 27, 2026",
    time: "5:30 – 6:30 p.m.",
    title: "Nursing Information Session",
    location: "Grappone Hall / Online hybrid",
    summary:
      "Learn about prerequisites, clinical expectations, and application timelines for Nursing pathways.",
  },
  {
    id: "lynx-welcome",
    date: "2026-09-03",
    displayDate: "Sep 3, 2026",
    time: "4:00 – 6:00 p.m.",
    title: "Lynx Welcome Fair",
    location: "Campus Quad",
    summary:
      "Explore clubs, athletics, wellness resources, and student services as the semester begins.",
  },
  {
    id: "transfer-day",
    date: "2026-09-18",
    displayDate: "Sep 18, 2026",
    time: "11:00 a.m. – 2:00 p.m.",
    title: "Transfer Partner Day",
    location: "Little Hall",
    summary:
      "Meet representatives from UNH, SNHU, Plymouth State, Keene State, and other partner campuses.",
  },
];

export function getProgramById(id) {
  return programs.find((program) => program.id === id);
}

export function getNewsById(id) {
  return newsItems.find((item) => item.id === id);
}

export function getFocusTitle(id) {
  return focusAreas.find((area) => area.id === id)?.title ?? id;
}
