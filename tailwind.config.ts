import type { Config } from "tailwindcss";

/**
 * Design tokens — editorial gallery system
 * Neutrals + one signature amber accent. No decorative shadows.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "rgb(var(--color-ink) / <alpha-value>)",
          soft: "rgb(var(--color-ink-soft) / <alpha-value>)",
          muted: "rgb(var(--color-ink-muted) / <alpha-value>)",
          faint: "rgb(var(--color-ink-faint) / <alpha-value>)",
        },
        paper: {
          DEFAULT: "rgb(var(--color-paper) / <alpha-value>)",
          raised: "rgb(var(--color-paper-raised) / <alpha-value>)",
          line: "rgb(var(--color-paper-line) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          soft: "rgb(var(--color-accent-soft) / <alpha-value>)",
          deep: "rgb(var(--color-accent-deep) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": [
          "clamp(2.75rem, 6vw, 5.5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.04em", fontWeight: "500" },
        ],
        "display-lg": [
          "clamp(2rem, 4vw, 3.5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.035em", fontWeight: "500" },
        ],
        "display-md": [
          "clamp(1.5rem, 2.5vw, 2rem)",
          { lineHeight: "1.15", letterSpacing: "-0.025em", fontWeight: "500" },
        ],
        body: [
          "1.0625rem",
          { lineHeight: "1.65", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
        meta: [
          "0.6875rem",
          { lineHeight: "1.4", letterSpacing: "0.08em", fontWeight: "400" },
        ],
        index: [
          "0.625rem",
          { lineHeight: "1.2", letterSpacing: "0.12em", fontWeight: "500" },
        ],
      },
      spacing: {
        gutter: "var(--grid-gutter)",
        section: "var(--section-space)",
        nav: "var(--nav-height)",
      },
      maxWidth: {
        gallery: "1440px",
        prose: "38rem",
        measure: "28rem",
      },
      borderWidth: {
        hairline: "1px",
      },
      transitionDuration: {
        snappy: "120ms",
        crisp: "180ms",
      },
      transitionTimingFunction: {
        snap: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1.1s steps(1, end) infinite",
      },
      gridTemplateColumns: {
        gallery: "repeat(12, minmax(0, 1fr))",
        "gallery-md": "repeat(12, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};

export default config;
