import { programs } from "./programs";

const SITE = "White Mountains Community College";

const defaultDescription =
  "White Mountains Community College — affordable higher education in northern New Hampshire across Berlin, Littleton, and North Conway.";

export const defaultMeta = {
  title: SITE,
  description: defaultDescription,
};

export const notFoundMeta = {
  title: `Page Not Found | ${SITE}`,
  description:
    "We couldn’t find that page. Return home or browse academic programs at White Mountains Community College.",
};

/** Static route metadata (exact pathname match) */
export const pageMeta = {
  "/": {
    title:
      "White Mountains Community College — Discover Your Path in the White Mountains",
    description:
      "Explore associate degrees, certificates, and workforce training at White Mountains Community College in Berlin, Littleton, and North Conway.",
  },
  "/academics": {
    title: `Academic Programs & Degrees | ${SITE}`,
    description:
      "Browse WMCC degrees and certificates across health sciences, trades, culinary, business, education, STEM, and more.",
  },
  "/admissions": {
    title: `Admissions & Aid | ${SITE}`,
    description:
      "Learn how to apply, visit campus, review tuition, and start financial aid at White Mountains Community College.",
  },
  "/admissions/how-to-apply": {
    title: `How to Apply | ${SITE}`,
    description:
      "Step-by-step guidance for applying to White Mountains Community College through the CCSNH admissions portal.",
  },
  "/admissions/visit": {
    title: `Visit Campus | ${SITE}`,
    description:
      "Plan a visit to WMCC’s Berlin campus or academic centers in Littleton and North Conway.",
  },
  "/admissions/tuition": {
    title: `Tuition & Fees | ${SITE}`,
    description:
      "Review WMCC per-credit tuition rates for in-state, New England regional, and out-of-state students.",
  },
  "/admissions/financial-aid": {
    title: `Financial Aid | ${SITE}`,
    description:
      "Start the FAFSA with school code 005291 and explore grants, loans, and aid options at WMCC.",
  },
  "/student-experience": {
    title: `Student Experience | ${SITE}`,
    description:
      "Discover campus life, clubs, advising, and student support at White Mountains Community College.",
  },
  "/workforce": {
    title: `Workforce Development | ${SITE}`,
    description:
      "Upskill and reskill with WMCC workforce training for northern New Hampshire employers and learners.",
  },
  "/about": {
    title: `About WMCC | ${SITE}`,
    description:
      "Learn about White Mountains Community College’s mission, values, and North Country campus community.",
  },
  "/news": {
    title: `News & Events | ${SITE}`,
    description:
      "Read the latest news, student stories, and campus updates from White Mountains Community College.",
  },
  "/contact": {
    title: `Locations & Contact Us | ${SITE}`,
    description:
      "Find hours, directions, and contact details for WMCC’s Berlin, Littleton, and North Conway locations.",
  },
  "/sitemap": {
    title: `Sitemap | ${SITE}`,
    description: `A full list of pages and programs on the ${SITE} website.`,
  },
};

const programTitleOverrides = {
  nursing: `Registered Nursing (AS) Program | ${SITE}`,
};

export function resolvePageMeta(pathname) {
  if (pageMeta[pathname]) {
    return pageMeta[pathname];
  }

  const programMatch = pathname.match(/^\/academics\/programs\/([^/]+)\/?$/);
  if (programMatch) {
    const programId = decodeURIComponent(programMatch[1]);
    const program = programs.find((item) => item.id === programId);
    if (!program) {
      return notFoundMeta;
    }
    return {
      title:
        programTitleOverrides[program.id] ||
        `${program.title} (${program.credential}) | ${SITE}`,
      description:
        program.summary ||
        `Learn about the ${program.title} ${program.credential} at ${SITE}.`,
    };
  }

  if (pathname === "/404") {
    return notFoundMeta;
  }

  return notFoundMeta;
}
