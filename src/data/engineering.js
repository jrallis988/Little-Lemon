const engineering = {
  workflow: [
    { id: "design", label: "Design" },
    { id: "architecture", label: "Architecture" },
    { id: "development", label: "Development" },
    { id: "testing", label: "Testing" },
    { id: "git", label: "Git" },
    { id: "deployment", label: "Deployment" },
  ],
  architecture: [
    {
      title: "Component-based development",
      body: "I break interfaces into reusable pieces with clear responsibilities—layout shells, content sections, and interactive controls.",
    },
    {
      title: "Reusable components",
      body: "Buttons, form fields, project cards, and section headers stay consistent so new screens inherit the same visual language.",
    },
    {
      title: "Design systems thinking",
      body: "Color tokens, type scale, spacing, and borders live as shared conventions rather than one-off styles.",
    },
    {
      title: "Responsive architecture",
      body: "Layouts are planned for mobile, tablet, and desktop from the start—not shrunk after the fact.",
    },
    {
      title: "State management",
      body: "I keep UI state close to where it’s used, and separate hot simulation or form state from presentational chrome when needed.",
    },
  ],
  apis: [
    {
      title: "REST & JSON",
      body: "I structure front-end data expectations around clear JSON contracts and predictable response shapes.",
    },
    {
      title: "Fetching patterns",
      body: "Loading, empty, and error states are part of the UI plan—not afterthoughts bolted onto a happy path.",
    },
    {
      title: "Feedback",
      body: "Users should always know whether content is loading, failed, or ready to use.",
    },
  ],
  responsive: [
    { label: "Desktop", note: "Room for multi-column composition and richer project detail." },
    { label: "Tablet", note: "Compressed grids that keep hierarchy without overcrowding." },
    { label: "Mobile", note: "Single-column flow, readable type, and usable touch targets." },
  ],
  accessibility: [
    "Semantic landmarks and heading order",
    "Keyboard-reachable controls with visible focus",
    "Labeled form fields and clear validation",
    "Contrast-aware foam accents on dark surfaces",
    "prefers-reduced-motion respected in motion and demos",
  ],
  performance: [
    {
      title: "Core Web Vitals mindset",
      body: "Keep critical UI lean, avoid unnecessary re-renders, and ship only the interaction needed for the screen.",
    },
    {
      title: "Images & media",
      body: "Prefer purposeful visuals, constrained sizes, and lazy loading where content is below the fold.",
    },
    {
      title: "Bundle considerations",
      body: "Route and component structure should make it easy to grow without dragging unused UI everywhere.",
    },
  ],
  tools: [
    {
      title: "Languages",
      items: ["HTML", "CSS", "JavaScript", "TypeScript", "Python"],
    },
    {
      title: "Frameworks & UI",
      items: ["React", "Next.js", "Tailwind"],
    },
    {
      title: "Data & APIs",
      items: ["REST APIs", "JSON"],
    },
    {
      title: "Development",
      items: ["Git", "GitHub", "VS Code / Cursor"],
    },
    {
      title: "Deployment",
      items: ["Vercel", "GitHub Pages", "AWS", "Azure"],
    },
    {
      title: "Design",
      items: ["Figma"],
    },
  ],
};

export default engineering;
