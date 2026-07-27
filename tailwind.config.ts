import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "var(--color-ink)",
          soft: "var(--color-ink-soft)",
        },
        paper: {
          DEFAULT: "var(--color-paper)",
          warm: "var(--color-paper-warm)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          deep: "var(--color-accent-deep)",
        },
        navy: {
          DEFAULT: "var(--color-navy)",
          deep: "var(--color-navy-deep)",
        },
        link: "var(--color-link)",
        line: "var(--color-line)",
        mute: "var(--color-mute)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 8px 24px rgba(0, 0, 0, 0.12)",
      },
      maxWidth: {
        site: "72rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.65s ease-out both",
        "fade-in": "fade-in 0.7s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
