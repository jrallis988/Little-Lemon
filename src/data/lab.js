const labProjects = [
  {
    id: "foam-drift",
    name: "Foam Drift",
    description:
      "A playable canvas prototype with delta-timed updates, pointer/keyboard control, and reduced-motion support.",
    visual: {
      label: "Foam Drift",
      tone: "play",
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
    },
    technologies: ["React", "Formik", "Yup"],
    status: "In progress",
    categories: ["Front-end experiments", "Prototypes"],
    links: {
      demo: null,
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
