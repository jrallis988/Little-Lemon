import programsData from "./programs.generated.json";
import newsData from "./news.generated.json";
import eventsData from "./events.generated.json";

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

export const programs = programsData;
export const newsItems = newsData;
export const events = eventsData;

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

export const aidChecklist = [
  "Create your FSA ID and complete the FAFSA (school code available from Financial Aid).",
  "Watch for your financial aid offer in the CCSNH student portal.",
  "Ask about scholarships, grants, and work-study options.",
  "Meet with advising before registering so aid and course load stay aligned.",
];

export const visitChecklist = [
  "Campus walking tour of academic buildings and the Student Center",
  "Residence hall overview (NHTI is NH’s only residential community college)",
  "Admissions + financial aid drop-in questions",
  "Optional virtual tour if you can’t visit in person yet",
];

export const documentChecklist = [
  "High school transcript or equivalency",
  "College transcripts (if transferring credit)",
  "Placement / prerequisite information for selective programs",
  "Immunization and clinical requirements for health programs (as applicable)",
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
    image: "/media/student-life-shirts.jpg",
  },
  {
    title: "Lynx athletics",
    text: "Cheer on competitive teams and join intramurals at the Dr. Goldie Crocker Wellness Center.",
    image: "/media/lynx-head-logo.png",
  },
  {
    title: "Riverfront setting",
    text: "A picturesque Merrimack River campus with room to move, learn, and belong.",
    image: "/media/campus-hero.jpg",
  },
];

export const studentQuickLinks = [
  {
    title: "Student portal",
    text: "Access email, registration, and your financial aid offer.",
    href: "https://lynx.nhti.edu/",
  },
  {
    title: "Academic advising",
    text: "Map credits, prerequisites, and transfer agreements.",
    href: "mailto:NHTIadvising@ccsnh.edu",
  },
  {
    title: "Official catalog",
    text: "Course descriptions and program requirements.",
    href: "https://catalog.nhti.edu/",
  },
  {
    title: "Virtual campus tour",
    text: "Explore Concord’s riverside campus online.",
    href: "https://ccsnhmaps.college-tour.com/maps/map.php?ID=6",
  },
];

export const actionTiles = [
  {
    label: "Apply and Enroll",
    icon: "/media/actions/applynew-2.png",
    to: "/admissions",
  },
  {
    label: "Financial Aid",
    icon: "/media/actions/payingnew-1.png",
    to: "/financial-aid",
  },
  {
    label: "Request Info",
    icon: "/media/actions/request-icon.png",
    to: "/admissions#inquiry-form",
  },
  {
    label: "Virtual Tour",
    icon: "/media/actions/visitnew-1.png",
    href: "https://ccsnhmaps.college-tour.com/maps/map.php?ID=6",
  },
  {
    label: "Event Calendar",
    icon: "/media/actions/calendar-icon.png",
    to: "/events",
  },
  {
    label: "Website Navigation",
    icon: "/media/actions/website-navigation-icon.png",
    href: "https://www.nhti.edu/navigating-nhti-online/",
  },
  {
    label: "Workforce Education",
    icon: "/media/actions/workforce-icon.png",
    to: "/workforce",
  },
  {
    label: "Early College",
    icon: "/media/actions/early-college-icon.png",
    href: "https://www.nhti.edu/academics/early-college/",
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
