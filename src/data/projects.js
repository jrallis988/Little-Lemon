const projects = [
  {
    id: "little-lemon",
    slug: "little-lemon",
    name: "Little Lemon",
    year: "2024",
    category: "Case study",
    type: "case-study",
    role: "Front-end UI & responsive layout",
    stack: ["HTML", "CSS", "JavaScript", "React", "Formik", "Yup"],
    summary:
      "Frontend UI and responsive layout for a restaurant experience, with ongoing work in React and component-based UI systems.",
    description:
      "A restaurant reservation experience focused on calm booking flow, clear hierarchy, and accessible form patterns.",
    heroVisual: {
      label: "Little Lemon booking UI",
      tone: "mediterranean",
    },
    meta: {
      role: "Front-end developer",
      timeline: "2024",
      platform: "Web · SPA",
      responsibilities: [
        "UI hierarchy and booking flow",
        "Responsive layout",
        "Form validation patterns",
        "Component structure",
      ],
      projectType: "Capstone / case study",
    },
    links: {
      caseStudy: "/work/little-lemon",
      github: "https://github.com/jrallis988/Little-Lemon",
      live: null,
      prototype: null,
      source: "https://github.com/jrallis988/Little-Lemon",
    },
    problem:
      "Little Lemon needed a booking flow that felt calm under pressure—guests choosing a date, time, and party size without fighting a cluttered restaurant UI.",
    whatIBuilt:
      "I built the front-end reservation experience: information hierarchy, responsive layout, accessible form patterns, and a component structure that keeps the booking path easy to iterate.",
    approach: {
      summary:
        "The app is structured as a React SPA with small, reusable UI pieces around the reservation path. Validation stays declarative so the booking flow can evolve without rewriting the core form.",
      points: [
        {
          title: "Component architecture",
          body: "Booking UI is broken into focused pieces—headers, form fields, and confirmation states—so each step can be adjusted independently.",
        },
        {
          title: "Front-end structure",
          body: "Pages and sections stay intentional: navigation, reservation form, and confirmation flow share one visual system instead of one-off styles.",
        },
        {
          title: "State & validation",
          body: "Formik + Yup keep form state and validation rules declarative, reducing dead ends between “I want a table” and “I’m booked.”",
        },
        {
          title: "Reusable patterns",
          body: "Inputs, buttons, and feedback states reuse the same focus, error, and spacing conventions for consistency across the flow.",
        },
      ],
    },
    designToDev:
      "The Mediterranean visual system—warm accents, readable type, and calm spacing—was translated into reusable layout and component styles so the UI stays scannable on mobile without losing brand character.",
    responsive: {
      summary:
        "Mobile-first booking: date, time, and party size remain stacked and thumb-friendly on small screens, then expand into a clearer multi-column rhythm on larger viewports.",
      breakpoints: [
        { label: "Mobile", note: "Single-column form, large tap targets, stacked actions." },
        { label: "Tablet", note: "Wider field groups and clearer section separation." },
        { label: "Desktop", note: "Room for supporting restaurant context beside the booking path." },
      ],
    },
    accessibility: [
      "Semantic form labels and predictable focus order",
      "Visible focus states on interactive controls",
      "Error messaging tied to fields",
      "Readable contrast in the Mediterranean palette",
      "Responsive text and spacing for smaller screens",
    ],
    challenges: [
      {
        challenge: "Keep the booking path short without hiding required details.",
        why: "Too many fields create friction; too few create incomplete reservations.",
        solution:
          "Prioritized the essential choices—date, time, party size—and used clear validation so guests know what’s missing without leaving the flow.",
        learned:
          "Reservation UIs win on hierarchy and feedback, not feature count.",
      },
    ],
    results: {
      summary:
        "A complete reservation experience with a warm, scannable UI and fewer friction points between intent and confirmation.",
      metrics: [],
    },
    next: {
      body: "I’d deepen live availability feedback, tighten empty/error states, and instrument the funnel so design choices stay tied to completion rate.",
      projectSlug: null,
    },
  },
  {
    id: "foam-drift",
    slug: "foam-drift",
    name: "Foam Drift",
    year: "2026",
    category: "Experiment",
    type: "experiment",
    role: "Interactive UI prototype",
    stack: ["React", "Canvas", "Accessibility"],
    summary:
      "A playable canvas demo embedded in this portfolio—delta-timed updates, pointer/keyboard control, and reduced-motion support.",
    description:
      "A lightweight interactive prototype used as a craft sample for game-loop timing, input handling, and accessible motion preferences.",
    heroVisual: {
      label: "Foam Drift canvas prototype",
      tone: "play",
    },
    meta: {
      role: "Front-end prototype",
      timeline: "2026",
      platform: "Web · Canvas",
      responsibilities: [
        "Game loop and rendering",
        "Pointer and keyboard control",
        "Accessible motion preferences",
        "UI chrome around the canvas",
      ],
      projectType: "Personal experiment",
    },
    links: {
      caseStudy: "/lab",
      github: null,
      live: "/#play",
      prototype: "/#play",
      source: null,
    },
    problem:
      "I wanted a small interactive sample that shows more than static screenshots—something that demonstrates timing, input, and accessibility choices in motion.",
    whatIBuilt:
      "Foam Drift is a React + canvas prototype with a requestAnimationFrame loop, score/miss tracking, pointer/keyboard control, and reduced-motion support.",
    approach: {
      summary:
        "Mutable simulation state lives in a ref for a hot loop, while React state mirrors score and UI status for the chrome around the canvas.",
      points: [
        {
          title: "Game loop",
          body: "Delta-timed updates keep feel consistent across refresh rates.",
        },
        {
          title: "State management",
          body: "Simulation stays mutable in a ref; React only re-renders score, misses, and status UI.",
        },
        {
          title: "Rendering",
          body: "Procedural foam orbs and a soft paddle share the portfolio’s atmospheric language.",
        },
      ],
    },
    designToDev:
      "The site’s foam palette and calm dark UI carry into the prototype so the experiment feels native to the portfolio rather than bolted on.",
    responsive: {
      summary:
        "The canvas scales within the layout; controls support drag on touch and arrow/WASD on keyboard.",
      breakpoints: [
        { label: "Mobile", note: "Drag-first control and stacked status chrome." },
        { label: "Desktop", note: "Keyboard support alongside pointer input." },
      ],
    },
    accessibility: [
      "Keyboard controls for paddle movement",
      "prefers-reduced-motion respect in the playable loop",
      "Clear start/ready messaging around the canvas",
      "Score and miss status exposed in the surrounding UI",
    ],
    challenges: [
      {
        challenge: "Keep a canvas game-loop performant without fighting React.",
        why: "Re-rendering every frame through React state would thrash the UI.",
        solution:
          "Keep hot simulation data in a ref and only sync score/status into React when those values change.",
        learned:
          "Interactive prototypes need a clear boundary between render chrome and simulation timing.",
      },
    ],
    results: {
      summary:
        "A playable craft sample that demonstrates interaction, timing, and accessible motion preferences inside the portfolio itself.",
      metrics: [],
    },
    next: {
      body: "Possible next steps: custom assets, tighter mobile feel, and a short technical write-up linked from Lab.",
      projectSlug: "little-lemon",
    },
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.type !== "experiment" || project.id === "little-lemon");
}

export function getWorkProjects() {
  return projects;
}

export default projects;
