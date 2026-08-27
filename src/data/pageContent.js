/**
 * Content registry for master IA pages.
 * Existing specialized pages (Academics finder, Contact form, etc.) stay as custom components.
 */

const img = {
  campus: "/images/campus-exterior.jpg",
  students: "/images/students.jpg",
  lobby: "/images/campus-lobby.jpg",
  lab: "/images/science-lab.jpg",
  grad: "/images/graduation.jpg",
};

function page(partial) {
  return {
    brand: partial.brand || "Great Bay",
    image: partial.image || img.campus,
    sections: partial.sections || [],
    links: partial.links || [],
    icon: partial.icon || "book",
    ...partial,
  };
}

export const pages = {
  "/academics/course-descriptions": page({
    brand: "Academics",
    title: "Course descriptions",
    copy: "Browse credit courses alphabetically and plan the classes that move you toward your degree or certificate.",
    image: img.lab,
    icon: "book",
    sections: [
      {
        heading: "Find the right course",
        body: "Course descriptions outline credits, prerequisites, and learning outcomes so you can build a schedule with confidence.",
        bullets: [
          "Alphabetical course listings by subject",
          "Prerequisite and co-requisite guidance",
          "Credit hours and typical offerings",
        ],
      },
    ],
    links: [
      { to: "/academics/course-schedule", label: "View course schedule" },
      { to: "/academics/catalog", label: "Open college catalog" },
    ],
  }),
  "/academics/course-schedule": page({
    brand: "Academics",
    title: "Course schedule & offerings",
    copy: "See what is offered each term — day, evening, online, and hyflex options designed to fit your life.",
    image: img.lobby,
    icon: "calendar",
    sections: [
      {
        heading: "Plan your semester",
        body: "Use the schedule with advising to lock in required courses early. Popular clinical and lab sections fill quickly.",
        bullets: [
          "Filter by term, modality, and subject",
          "Coordinate with placement and prerequisites",
          "Register during published windows",
        ],
      },
    ],
    links: [
      { to: "/academics/registration", label: "Registration steps" },
      { to: "/academics/calendar", label: "Academic calendar" },
    ],
  }),
  "/academics/catalog": page({
    brand: "Academics",
    title: "College catalog",
    copy: "The official catalog is the source of truth for programs, policies, graduation requirements, and academic standards.",
    image: img.lab,
    icon: "clipboard",
    sections: [
      {
        heading: "What’s inside",
        body: "Program maps, course requirements, academic policies, and consumer disclosures are maintained in the catalog each year.",
        bullets: [
          "Degree and certificate requirements",
          "Academic standing and transfer credit policy",
          "Student rights and responsibilities",
        ],
      },
    ],
    links: [
      { to: "/academics", label: "Browse programs A–Z" },
      { href: "https://catalog.greatbay.edu/", label: "Open live catalog", external: true },
    ],
  }),
  "/academics/high-school": page({
    brand: "Academics",
    title: "High school & Early College programs",
    copy: "Earn college credit while still in high school through Early College and dual-enrollment pathways.",
    image: img.students,
    icon: "graduation",
    sections: [
      {
        heading: "Start college early",
        body: "Great Bay partners with Seacoast high schools so students can reduce time and cost to a degree.",
        bullets: [
          "Early College Advocate recognition and support",
          "Dual enrollment and concurrent credit options",
          "Advising for transfer and career planning",
        ],
      },
    ],
    links: [
      { to: "/admissions/begin", label: "Begin the process" },
      { to: "/contact", label: "Talk with admissions" },
    ],
  }),
  "/academics/registration": page({
    brand: "Academics",
    title: "Registration",
    copy: "Register for classes after advising, placement, and any program-specific clearances are complete.",
    image: img.lobby,
    icon: "clipboard",
    sections: [
      {
        heading: "Registration documents & forms",
        body: "Use academic forms when you need to update your plan or prepare to graduate.",
        bullets: [
          "Change of major or dual major",
          "Intent to graduate",
          "Transfer credit opt-out",
          "Change or defer application",
        ],
      },
    ],
    links: [
      { to: "/academics/support/advising", label: "Meet with advising" },
      { to: "/academics/calendar", label: "Key registration dates" },
    ],
  }),
  "/academics/support": page({
    brand: "Academic Support",
    title: "Support that keeps you moving",
    copy: "CAPS, advising, tutoring, accessibility, career coaching, and the library — coordinated help from day one.",
    image: img.students,
    icon: "users",
    sections: [
      {
        heading: "Your support network",
        body: "Great Bay’s award-winning Center for Academic Planning and Support (CAPS) and partner offices work one-on-one with students.",
      },
    ],
    links: [
      { to: "/academics/support/advising", label: "Advising" },
      { to: "/academics/support/tutoring", label: "Tutoring" },
      { to: "/academics/support/accessibility", label: "Accessibility" },
      { to: "/academics/support/library", label: "Library" },
    ],
  }),
  "/academics/support/advising": page({
    brand: "Academic Support",
    title: "Advising & Transfer Center",
    copy: "Build an academic plan, choose courses, and map transfer or career pathways with a dedicated advisor.",
    icon: "users",
    sections: [
      {
        heading: "How advising helps",
        bullets: [
          "Program planning and course sequencing",
          "Transfer agreements and university pathways",
          "Placement and registration guidance",
        ],
      },
    ],
    links: [
      { href: "mailto:greatbayadvising@ccsnh.edu", label: "Email advising" },
      { to: "/academics/support/transfer", label: "Transfer options" },
    ],
  }),
  "/academics/support/accessibility": page({
    brand: "Academic Support",
    title: "Accessibility services",
    copy: "Request accommodations and accessibility supports that remove barriers to learning.",
    icon: "heart",
    sections: [
      {
        heading: "Equal access",
        body: "Work with Accessibility Services early so accommodations are in place before the term begins.",
      },
    ],
    links: [{ to: "/contact", label: "Contact campus support" }],
  }),
  "/academics/support/tutoring": page({
    brand: "Academic Support",
    title: "Tutoring",
    copy: "Get help in math, writing, sciences, nursing, and more — including free 24/7 Brainfuse online tutoring through Canvas.",
    icon: "book",
    sections: [
      {
        heading: "In-person and online",
        bullets: [
          "CAPS tutoring by subject",
          "Brainfuse 24/7 online support",
          "Study strategies and writing feedback",
        ],
      },
    ],
    links: [{ to: "/academics/support", label: "All academic support" }],
  }),
  "/academics/support/success-coaching": page({
    brand: "Academic Support",
    title: "Success coaching",
    copy: "Strengthen time management, study habits, and goal-setting with a success coach.",
    icon: "trophy",
    sections: [
      {
        heading: "Stay on track",
        body: "Coaching is especially helpful for first-year students, returning adults, and anyone balancing work and family.",
      },
    ],
  }),
  "/academics/support/career-center": page({
    brand: "Academic Support",
    title: "Career Center",
    copy: "Explore careers, prepare resumes, practice interviews, and connect with Seacoast employers.",
    icon: "briefcase",
    sections: [
      {
        heading: "Career readiness",
        bullets: [
          "Resume and LinkedIn reviews",
          "Internship and job search support",
          "Employer and networking events",
        ],
      },
    ],
  }),
  "/academics/support/transfer": page({
    brand: "Academic Support",
    title: "Transfer options",
    copy: "Great Bay is one of the largest transfer feeder schools to the University of New Hampshire — with pathways across New England and beyond.",
    icon: "graduation",
    sections: [
      {
        heading: "Transfer with confidence",
        body: "Transfer advisors help you align coursework with destination requirements and published agreements.",
      },
    ],
    links: [
      { to: "/academics/support/advising", label: "Talk with a transfer advisor" },
      { to: "/admissions", label: "Admissions overview" },
    ],
  }),
  "/academics/support/library": page({
    brand: "Academic Support",
    title: "Library",
    copy: "Research help, databases, quiet study space, and course reserves for every program.",
    icon: "book",
    image: img.lobby,
  }),

  "/admissions/begin": page({
    brand: "Admissions",
    title: "Begin the process",
    copy: "Start your GBCC journey — explore programs, connect with admissions, and get ready to apply.",
    image: img.students,
    icon: "arrow",
    sections: [
      {
        heading: "Your first moves",
        bullets: [
          "Explore 50+ certificates and degrees",
          "Request information or schedule a visit",
          "Review placement and program requirements",
          "Submit your application",
        ],
      },
    ],
    links: [
      { to: "/admissions/how-to-apply", label: "How to apply" },
      { to: "/contact", label: "Request info" },
    ],
  }),
  "/admissions/next-steps": page({
    brand: "Admissions",
    title: "Newly accepted — next steps",
    copy: "Congratulations. Complete placement, advising, financial aid, and registration to start strong.",
    icon: "clipboard",
    sections: [
      {
        heading: "After acceptance",
        bullets: [
          "Complete course placement (or submit waivers)",
          "Meet with an advisor to build your schedule",
          "Submit FAFSA using school code 002583",
          "Register and prepare for orientation",
        ],
      },
    ],
    links: [
      { to: "/admissions/financial-aid", label: "Financial aid" },
      { to: "/academics/registration", label: "Registration" },
    ],
  }),
  "/admissions/cost-of-attendance": page({
    brand: "Admissions & Aid",
    title: "Cost of attendance",
    copy: "Understand the full estimated cost of attending Great Bay — tuition, fees, books, and living expenses.",
    icon: "clipboard",
    sections: [
      {
        heading: "Plan your budget",
        body: "Cost of attendance helps financial aid packaging and gives families a realistic picture beyond tuition alone.",
      },
    ],
    links: [
      { to: "/admissions/tuition", label: "Tuition rates" },
      { to: "/admissions/fees", label: "Fees" },
    ],
  }),
  "/admissions/fees": page({
    brand: "Admissions & Aid",
    title: "Fees",
    copy: "Review student fees that support technology, student life, and campus services.",
    icon: "clipboard",
  }),
  "/admissions/program-costs": page({
    brand: "Admissions & Aid",
    title: "Program-specific costs",
    copy: "Some programs include additional costs for clinicals, uniforms, certifications, tools, or lab kits.",
    icon: "briefcase",
    sections: [
      {
        heading: "Know before you enroll",
        body: "Health sciences, culinary, and technical programs may list additional required expenses in the catalog and program pages.",
      },
    ],
    links: [{ to: "/academics", label: "Find your program" }],
  }),
  "/admissions/scholarships": page({
    brand: "Admissions & Aid",
    title: "Scholarships & other aid",
    copy: "Institutional scholarships, foundation awards, and external aid can reduce your out-of-pocket cost.",
    icon: "trophy",
    sections: [
      {
        heading: "Ways to lower cost",
        bullets: [
          "GBCC and foundation scholarships",
          "Federal and state grant aid via FAFSA",
          "Employer tuition assistance and workforce grants",
        ],
      },
    ],
    links: [{ to: "/admissions/financial-aid", label: "Financial aid office" }],
  }),
  "/admissions/policies": page({
    brand: "Admissions & Aid",
    title: "Payment & refund policies",
    copy: "Review billing timelines, payment plans, and refund rules before each term.",
    icon: "shield",
  }),

  "/athletics": page({
    brand: "Student Experience",
    title: "Athletics — Compete as a Heron",
    copy: "GBCC is a member of the Yankee Small College Conference (YSCC) within the USCAA. In 2025 the men’s basketball team won the conference championship.",
    image: img.students,
    icon: "trophy",
    sections: [
      {
        heading: "Varsity teams",
        bullets: [
          "Men’s Basketball",
          "Women’s Basketball",
          "Baseball",
          "Volleyball",
          "Golf (Men & Women)",
          "Track & Field (Men & Women)",
        ],
      },
      {
        heading: "Contact athletics",
        body: "(603) 427-7733 · greatbayathletics@ccsnh.edu",
      },
    ],
    links: [
      { to: "/student-experience/clubs", label: "Clubs & intramurals" },
      { to: "/student-experience/wellness", label: "Fitness & wellness" },
    ],
  }),
  "/student-experience/clubs": page({
    brand: "Student Experience",
    title: "Clubs & organizations",
    copy: "20+ academic, cultural, recreational, and leadership groups — or work with Student Life to start a new one.",
    icon: "users",
    image: img.students,
  }),
  "/student-experience/leadership": page({
    brand: "Student Experience",
    title: "Leadership & development",
    copy: "Grow as a campus leader through SGA, honor societies, and student life programming.",
    icon: "trophy",
  }),
  "/student-experience/success-center": page({
    brand: "Student Experience",
    title: "Student Success Center",
    copy: "A hub for student life, activities funding through SGA, and day-to-day support that keeps you connected.",
    icon: "building",
  }),
  "/student-experience/meet-students": page({
    brand: "Student Experience",
    title: "Meet our students",
    copy: "Hear how Great Bay students navigate careers, transfer, clinicals, and campus life.",
    icon: "users",
    image: img.grad,
    links: [{ to: "/news", label: "Student stories in the news" }],
  }),
  "/student-experience/mental-wellbeing": page({
    brand: "Student Experience",
    title: "Mental wellbeing",
    copy: "Confidential support and resources for stress, anxiety, and mental health while you are enrolled.",
    icon: "heart",
  }),
  "/student-experience/wellness": page({
    brand: "Student Experience",
    title: "Wellness",
    copy: "Fitness Center access, wellness programming, and healthy habits that support academic success.",
    icon: "heart",
  }),
  "/student-experience/community-resources": page({
    brand: "Student Experience",
    title: "Community resources",
    copy: "Local Seacoast partners and campus referrals for food security, transportation, childcare, and more.",
    icon: "map",
  }),

  "/workforce/professional-development": page({
    brand: "Workforce",
    title: "Professional development",
    copy: "Short courses that build workplace skills for individuals and teams across the Seacoast.",
    icon: "briefcase",
  }),
  "/workforce/healthcare": page({
    brand: "Workforce",
    title: "Healthcare training",
    copy: "Medical Assistant, Phlebotomy, LNA, and other direct-to-career credentials designed with regional employers.",
    image: "/images/medical-assistant.jpg",
    icon: "heart",
  }),
  "/workforce/culinary": page({
    brand: "Workforce",
    title: "Culinary Arts & Sustainable Foodways",
    copy: "Hands-on training for foodservice and sustainable culinary careers on the Seacoast.",
    image: "/images/culinary.jpg",
    icon: "briefcase",
  }),
  "/workforce/police-testing": page({
    brand: "Workforce",
    title: "Police Testing Alliance",
    copy: "Testing and preparation support for public safety career pathways.",
    icon: "shield",
  }),
  "/workforce/apprenticeships": page({
    brand: "Workforce",
    title: "Apprenticeships",
    copy: "Earn-while-you-learn pathways connected to local industry partners.",
    icon: "briefcase",
  }),
  "/workforce/workready": page({
    brand: "Workforce",
    title: "WorkReadyNH",
    copy: "Workforce readiness credentials that help job seekers and employers close skill gaps.",
    icon: "clipboard",
  }),
  "/workforce/corporate": page({
    brand: "Workforce",
    title: "Corporate & customized training",
    copy: "Tailored training for hospitals, manufacturers, municipalities, and Seacoast employers.",
    icon: "building",
  }),
  "/workforce/employers": page({
    brand: "Workforce",
    title: "Employer portal",
    copy: "Hire Great Bay students, request customized training, and partner with the Business & Training Center.",
    icon: "briefcase",
    links: [{ href: "mailto:greatbaybtc@ccsnh.edu", label: "Email the BTC" }],
  }),

  "/about/history": page({
    brand: "About",
    title: "History",
    copy: "Since 1945, Great Bay has educated nearly 90,000 students across Strafford and Rockingham counties.",
    image: img.campus,
    icon: "building",
  }),
  "/about/accreditation": page({
    brand: "About",
    title: "Accreditation",
    copy: "Great Bay Community College is accredited and part of the Community College System of New Hampshire.",
    icon: "shield",
  }),
  "/about/mission": page({
    brand: "About",
    title: "Mission, vision & values",
    copy: "Affordable, high-quality education that prepares students for careers, transfer, and lifelong opportunity.",
    icon: "graduation",
  }),
  "/about/org-chart": page({
    brand: "About",
    title: "Organizational chart",
    copy: "See how academic, student, and administrative divisions are structured across the college.",
    icon: "users",
  }),
  "/about/strategic-plan": page({
    brand: "About",
    title: "Campus strategic plan",
    copy: "Priorities that guide enrollment, student success, workforce partnerships, and campus investment.",
    icon: "clipboard",
  }),
  "/about/advisory-board": page({
    brand: "About",
    title: "Advisory board",
    copy: "Community and industry leaders who advise Great Bay on programs and regional needs.",
    icon: "users",
  }),
  "/about/cabinet": page({
    brand: "About",
    title: "President’s cabinet",
    copy: "Leadership team supporting academics, student affairs, finance, and institutional strategy.",
    icon: "users",
  }),
  "/about/reporting": page({
    brand: "About",
    title: "Institutional reporting",
    copy: "Data, outcomes, and institutional research that inform planning and public accountability.",
    icon: "clipboard",
  }),
  "/about/title-ix": page({
    brand: "About",
    title: "Title IX information",
    copy: "Policies and contacts related to sex discrimination, harassment, and equal opportunity.",
    icon: "shield",
  }),
  "/about/support": page({
    brand: "About",
    title: "Support GBCC",
    copy: "Give to scholarships, programs, and campus initiatives that expand opportunity on the Seacoast.",
    icon: "heart",
    links: [
      {
        href: "https://www.greatbay.edu/about/giving/",
        label: "Donate",
        external: true,
      },
    ],
  }),
  "/about/employment": page({
    brand: "About",
    title: "Employment opportunities",
    copy: "Join faculty and staff across CCSNH and Great Bay Community College.",
    icon: "briefcase",
  }),
  "/about/consumer-info": page({
    brand: "About",
    title: "Consumer information",
    copy: "Required disclosures on outcomes, policies, privacy, and student consumer rights.",
    icon: "clipboard",
  }),

  "/campus/fast-facts": page({
    brand: "Campus",
    title: "Fast facts",
    copy: "$0 application fee for most applicants · 70%+ of full-time students receive aid · 11:1 student–faculty ratio · 50+ programs.",
    icon: "clipboard",
    image: img.campus,
  }),
  "/campus/safety": page({
    brand: "Campus",
    title: "Campus safety",
    copy: "Safety resources, emergency procedures, and how to reach campus security.",
    icon: "shield",
  }),
  "/campus/welcome-center": page({
    brand: "Campus",
    title: "Welcome Center",
    copy: "Your first stop for admissions questions, tours, and getting oriented to the Portsmouth campus.",
    icon: "map",
    image: img.lobby,
  }),
  "/campus/rentals": page({
    brand: "Campus",
    title: "Facility rentals",
    copy: "Reserve campus spaces for community events, meetings, and partner activities.",
    icon: "building",
  }),
  "/campus/dining": page({
    brand: "Campus",
    title: "Dining",
    copy: "On-campus dining options for students, staff, and visitors during posted hours.",
    icon: "building",
  }),
  "/campus/bookstore": page({
    brand: "Campus",
    title: "Bookstore",
    copy: "Textbooks, course materials, and Herons gear for the term ahead.",
    icon: "book",
  }),
  "/campus/art-gallery": page({
    brand: "Campus",
    title: "Art gallery",
    copy: "Exhibitions and cultural programming that welcome students and the Seacoast community.",
    icon: "heart",
  }),
  "/campus/closings": page({
    brand: "Campus",
    title: "Institutional closings",
    copy: "Weather-related and emergency closing announcements for the Portsmouth campus.",
    icon: "calendar",
  }),
  "/events": page({
    brand: "Campus",
    title: "Events",
    copy: "Express Admissions days, info sessions, open houses, and campus happenings.",
    icon: "calendar",
    image: img.lobby,
    sections: [
      {
        heading: "Upcoming highlights",
        bullets: [
          "Nursing Info Session",
          "Express Admissions Day",
          "Business Programs Info Night",
          "Campus open houses",
        ],
      },
    ],
    links: [
      { to: "/admissions/visit", label: "Visit & admissions events" },
      { to: "/news", label: "News" },
    ],
  }),
};

export function getPage(pathname) {
  return pages[pathname] || null;
}

export const contentPagePaths = Object.keys(pages);
