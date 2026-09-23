const labProjects = [
  {
    id: "foam-drift",
    name: "Foam Drift",
    description:
      "A playable canvas prototype with delta-timed updates, pointer/keyboard control, and reduced-motion support.",
    visual: {
      label: "Foam Drift",
      tone: "play",
      src: "/projects/foam-drift-hero.svg",
    },
    technologies: ["React", "Canvas", "Accessibility"],
    status: "Live demo",
    categories: ["Interactive UI", "Games", "Prototypes", "Front-end experiments"],
    links: {
      demo: "/#play",
      source: null,
      details: "/work/foam-drift",
    },
  },
  {
    id: "reservation-form-patterns",
    name: "Reservation form patterns",
    description:
      "Validation, focus, and empty-state experiments drawn from the Little Lemon booking flow.",
    visual: {
      label: "Form patterns",
      tone: "mediterranean",
      src: "/projects/little-lemon-hero.svg",
    },
    technologies: ["React", "Formik", "Yup"],
    status: "Live demo",
    categories: ["Front-end experiments", "Prototypes"],
    links: {
      demo: "/demos/little-lemon.html",
      source: "https://github.com/jrallis988/Little-Lemon",
      details: "/work/little-lemon",
    },
  },
];

export const labCategories = [
  "All",
  "Front-end experiments",
  "JavaScript experiments",
  "Interactive UI",
  "Games",
  "API projects",
  "Animation",
  "Prototypes",
  "Experimental tools",
];

export default labProjects;
