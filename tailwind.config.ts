import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        pf: {
          purple: "var(--pf-purple)",
          "purple-deep": "var(--pf-purple-deep)",
          "purple-soft": "var(--pf-purple-soft)",
          yellow: "var(--pf-yellow)",
          ink: "var(--pf-ink)",
          mist: "var(--pf-mist)",
          line: "var(--pf-line)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        lift: "0 18px 40px -28px rgba(48, 18, 74, 0.45)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "search-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(245, 197, 24, 0.35)" },
          "50%": { boxShadow: "0 0 0 8px rgba(245, 197, 24, 0)" },
        },
        "banner-in": {
          from: { opacity: "0", transform: "translateY(100%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.55s ease-out both",
        "search-pulse": "search-pulse 2.4s ease-in-out infinite",
        "banner-in": "banner-in 0.45s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
