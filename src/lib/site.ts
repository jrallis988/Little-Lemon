export const siteConfig = {
  name: "Rallis",
  mark: "RALLIS",
  title: "Rallis — Graphic Design & Digital Media",
  description:
    "Graphic designer and digital media professional. Brand identity systems, UI/UX, web architecture, and editorial design.",
  status: {
    label: "Available for select projects",
    live: true,
  },
  nav: [
    { href: "#work", label: "Work" },
    { href: "#brand-identity", label: "Brand Identity" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ] as const,
  social: {
    github: "https://github.com/jrallis988",
    linkedin: "https://www.linkedin.com/in/",
    email: "mailto:jjrallis@unh.edu",
  },
} as const;
