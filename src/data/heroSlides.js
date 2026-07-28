import { APPLY_URL, REQUEST_INFO_URL } from "./links";

export const heroSlides = [
  {
    id: "welcome",
    image: "/images/campus-exterior.jpg",
    imageAlt: "Berlin campus of White Mountains Community College",
    headline: "Opportunity rooted in the North Country.",
    line: "Associate degrees, certificates, and workforce training from Berlin, Littleton, North Conway, and online.",
    cta: { label: "Explore Programs", to: "/academics" },
    secondaryCta: {
      label: "Apply Now",
      to: APPLY_URL,
      external: true,
    },
  },
  {
    id: "programs",
    image: "/images/students.jpg",
    imageAlt: "Students on the White Mountains Community College campus",
    headline: "Career and transfer pathways that fit your life.",
    line: "Study nursing, trades, culinary, business, education, and more — with day, evening, and online options.",
    cta: { label: "View Programs", to: "/academics" },
    secondaryCta: {
      label: "Request Info",
      to: REQUEST_INFO_URL,
      external: true,
    },
  },
  {
    id: "apply",
    image: "/images/graduation.jpg",
    imageAlt: "White Mountains Community College graduates",
    headline: "Start your application today.",
    line: "Apply through the official CCSNH admissions portal, then connect with WMCC advising and financial aid.",
    cta: {
      label: "Apply Now",
      to: APPLY_URL,
      external: true,
    },
    secondaryCta: {
      label: "How to Apply",
      to: "/admissions/how-to-apply",
    },
  },
];
