/** Full master information architecture for Great Bay Community College */

export const primaryNav = [
  {
    label: "Academics",
    to: "/academics",
    groups: [
      {
        title: "Programs & Courses",
        links: [
          { to: "/academics", label: "Programs A to Z", end: true },
          { to: "/academics/course-descriptions", label: "Course Descriptions" },
          { to: "/academics/course-schedule", label: "Course Schedule" },
          { to: "/academics/calendar", label: "Academic Calendar" },
          { to: "/academics/catalog", label: "College Catalog" },
          { to: "/academics/high-school", label: "High School Programs" },
          { to: "/academics/registration", label: "Registration" },
        ],
      },
      {
        title: "Academic Support",
        links: [
          { to: "/academics/support", label: "Support Overview" },
          { to: "/academics/support/advising", label: "Advising" },
          { to: "/academics/support/accessibility", label: "Accessibility" },
          { to: "/academics/support/tutoring", label: "Tutoring" },
          { to: "/academics/support/success-coaching", label: "Success Coaching" },
          { to: "/academics/support/career-center", label: "Career Center" },
          { to: "/academics/support/transfer", label: "Transfer Options" },
          { to: "/academics/support/library", label: "Library" },
        ],
      },
    ],
  },
  {
    label: "Admissions & Aid",
    to: "/admissions",
    groups: [
      {
        title: "Admissions",
        links: [
          { to: "/admissions", label: "Overview", end: true },
          { to: "/admissions/begin", label: "Begin the Process" },
          { to: "/admissions/visit", label: "Visit Campus" },
          { to: "/admissions/how-to-apply", label: "How to Apply" },
          { to: "/admissions/next-steps", label: "Next Steps" },
        ],
      },
      {
        title: "Tuition & Aid",
        links: [
          { to: "/admissions/tuition", label: "Tuition" },
          { to: "/admissions/cost-of-attendance", label: "Cost of Attendance" },
          { to: "/admissions/fees", label: "Fees" },
          { to: "/admissions/program-costs", label: "Program Costs" },
          { to: "/admissions/financial-aid", label: "Financial Aid" },
          { to: "/admissions/scholarships", label: "Scholarships" },
          { to: "/admissions/policies", label: "Payment & Refund Policies" },
        ],
      },
    ],
  },
  {
    label: "Student Experience",
    to: "/student-experience",
    groups: [
      {
        title: "Student Life",
        links: [
          { to: "/student-experience", label: "Overview", end: true },
          { to: "/athletics", label: "Athletics" },
          { to: "/student-experience/clubs", label: "Clubs & Organizations" },
          { to: "/student-experience/leadership", label: "Leadership & Development" },
          { to: "/student-experience/success-center", label: "Student Success Center" },
          { to: "/student-experience/meet-students", label: "Meet Our Students" },
        ],
      },
      {
        title: "Wellbeing",
        links: [
          { to: "/student-experience/mental-wellbeing", label: "Mental Wellbeing" },
          { to: "/student-experience/wellness", label: "Wellness" },
          { to: "/student-experience/community-resources", label: "Community Resources" },
        ],
      },
    ],
  },
  {
    label: "Workforce Development",
    to: "/workforce",
    groups: [
      {
        title: "Business & Training Center",
        links: [
          { to: "/workforce", label: "Overview", end: true },
          { to: "/workforce/professional-development", label: "Professional Development" },
          { to: "/workforce/healthcare", label: "Healthcare Training" },
          { to: "/workforce/culinary", label: "Culinary Arts" },
          { to: "/workforce/police-testing", label: "Police Testing Alliance" },
          { to: "/workforce/apprenticeships", label: "Apprenticeships" },
          { to: "/workforce/workready", label: "WorkReadyNH" },
          { to: "/workforce/corporate", label: "Corporate Training" },
          { to: "/workforce/employers", label: "Employer Portal" },
        ],
      },
    ],
  },
  {
    label: "About",
    to: "/about",
    groups: [
      {
        title: "Discover GBCC",
        links: [
          { to: "/about", label: "Overview", end: true },
          { to: "/about/history", label: "History" },
          { to: "/about/accreditation", label: "Accreditation" },
          { to: "/about/mission", label: "Mission, Vision & Values" },
          { to: "/about/org-chart", label: "Org Chart" },
          { to: "/about/strategic-plan", label: "Strategic Plan" },
          { to: "/about/advisory-board", label: "Advisory Board" },
          { to: "/about/cabinet", label: "President's Cabinet" },
        ],
      },
      {
        title: "Institutional",
        links: [
          { to: "/about/reporting", label: "Institutional Reporting" },
          { to: "/about/title-ix", label: "Title IX" },
          { to: "/about/support", label: "Support GBCC" },
          { to: "/about/employment", label: "Employment" },
          { to: "/about/consumer-info", label: "Consumer Information" },
        ],
      },
    ],
  },
];

export const campusNav = [
  { to: "/contact", label: "Hours & Directions" },
  { to: "/campus/fast-facts", label: "Fast Facts" },
  { to: "/campus/safety", label: "Campus Safety" },
  { to: "/campus/welcome-center", label: "Welcome Center" },
  { to: "/campus/rentals", label: "Facility Rentals" },
  { to: "/campus/dining", label: "Dining" },
  { to: "/campus/bookstore", label: "Bookstore" },
  { to: "/campus/art-gallery", label: "Art Gallery" },
  { to: "/directory", label: "Faculty & Staff Directory" },
  { to: "/campus/closings", label: "Institutional Closings" },
  { to: "/news", label: "News" },
  { to: "/events", label: "Events" },
  { to: "/sitemap", label: "Sitemap" },
];

export const academicsSectionNav = [
  { to: "/academics", label: "Programs", end: true },
  { to: "/academics/course-descriptions", label: "Courses" },
  { to: "/academics/calendar", label: "Calendar" },
  { to: "/academics/catalog", label: "Catalog" },
  { to: "/academics/support", label: "Support" },
  { to: "/academics/registration", label: "Registration" },
];

export const admissionsSectionNav = [
  { to: "/admissions", label: "Overview", end: true },
  { to: "/admissions/begin", label: "Begin" },
  { to: "/admissions/how-to-apply", label: "Apply" },
  { to: "/admissions/visit", label: "Visit" },
  { to: "/admissions/tuition", label: "Tuition" },
  { to: "/admissions/financial-aid", label: "Aid" },
  { to: "/admissions/scholarships", label: "Scholarships" },
];

export const studentSectionNav = [
  { to: "/student-experience", label: "Overview", end: true },
  { to: "/athletics", label: "Athletics" },
  { to: "/student-experience/clubs", label: "Clubs" },
  { to: "/student-experience/success-center", label: "Success Center" },
  { to: "/student-experience/mental-wellbeing", label: "Wellbeing" },
];

export const workforceSectionNav = [
  { to: "/workforce", label: "Overview", end: true },
  { to: "/workforce/healthcare", label: "Healthcare" },
  { to: "/workforce/culinary", label: "Culinary" },
  { to: "/workforce/professional-development", label: "Professional Dev" },
  { to: "/workforce/employers", label: "Employers" },
];

export const aboutSectionNav = [
  { to: "/about", label: "Overview", end: true },
  { to: "/about/mission", label: "Mission" },
  { to: "/about/history", label: "History" },
  { to: "/about/accreditation", label: "Accreditation" },
  { to: "/about/title-ix", label: "Title IX" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Campus" },
];

/** Flatten all navigable paths for routing + sitemap */
export function flattenNavLinks() {
  const links = [];
  const seen = new Set();
  const push = (item) => {
    if (!item?.to || seen.has(item.to)) return;
    seen.add(item.to);
    links.push(item);
  };

  primaryNav.forEach((section) => {
    push({ to: section.to, label: section.label });
    section.groups?.forEach((group) => group.links.forEach(push));
  });
  campusNav.forEach(push);
  return links;
}
