/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Neta/Bootstrap owns the base reset + .container; Tailwind preflight
  // otherwise sets .collapse { visibility: collapse } and breaks the navbar.
  corePlugins: {
    preflight: false,
    container: false,
  },
  theme: {
    extend: {
      colors: {
        navy: "var(--navy)",
        slate: "var(--slate)",
        charcoal: "var(--charcoal)",
        ink: "var(--ink)",
        "footer-navy": "var(--footer-navy)",
        "warm-white": "var(--warm-white)",
        paper: "var(--paper)",
        granite: "var(--granite)",
        "slate-line": "var(--slate-line)",
        "slate-text": "var(--slate-text)",
        "slate-muted": "var(--slate-muted)",
        red: "var(--red)",
        yellow: "var(--yellow)",
        "text-dark": "#333333",
        "text-light": "#555555",
        border: "#e0e0e0",
        light: "#f8f9fa",
      },
      fontFamily: {
        display: ["Roboto", "Georgia", "serif"],
        sans: ["Roboto", "Georgia", "sans-serif"],
        quote: ["Georgia", "Times New Roman", "serif"],
      },
      fontSize: {
        overline: [
          "0.7rem",
          { lineHeight: "1.2", letterSpacing: "3.5px", fontWeight: "900" },
        ],
        "hero-display": [
          "clamp(3rem, 8vw, 6rem)",
          { lineHeight: "1.05", letterSpacing: "2px", fontWeight: "900" },
        ],
        "section-display": [
          "clamp(1.9rem, 3.6vw, 2.9rem)",
          { lineHeight: "1.1", letterSpacing: "0.5px", fontWeight: "900" },
        ],
        "card-display": [
          "clamp(1.4rem, 2.4vw, 1.9rem)",
          { lineHeight: "1.15", letterSpacing: "0.5px", fontWeight: "900" },
        ],
        "body-lg": ["1.05rem", { lineHeight: "1.75", fontWeight: "400" }],
        "body-sm": ["0.92rem", { lineHeight: "1.7", fontWeight: "400" }],
        quote: [
          "clamp(1.15rem, 1.6vw, 1.4rem)",
          { lineHeight: "1.6", fontWeight: "400" },
        ],
        cta: [
          "0.85rem",
          { lineHeight: "1.2", letterSpacing: "2px", fontWeight: "900" },
        ],
      },
      maxWidth: {
        content: "1240px",
        narrow: "1100px",
      },
      borderRadius: {
        cta: "2px",
      },
      boxShadow: {
        focus: "0 0 0 3px rgba(230, 57, 70, 0.35)",
      },
    },
  },
  plugins: [],
};
