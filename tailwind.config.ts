import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef2f7",
          100: "#d4dde9",
          200: "#a9bbd3",
          300: "#7e99bd",
          400: "#5377a7",
          500: "#3a5f8f",
          600: "#2d4a70",
          700: "#1f3552",
          800: "#15253a",
          900: "#0c1624",
          950: "#070e17",
        },
        brand: {
          DEFAULT: "#2b5a9e",
          light: "#3d73c0",
          dark: "#1a3a6b",
          soft: "#e8f0fa",
        },
        accent: {
          DEFAULT: "#1bb6a8",
          soft: "#d8f5f1",
          dark: "#0f8a7f",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#eef2f7",
          border: "#d3dce8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Trebuchet MS", "sans-serif"],
        script: ["var(--font-script)", "Pacifico", "cursive"],
        sans: ["var(--font-body)", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "8px",
        btn: "6px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 30, 55, 0.06)",
        card: "0 1px 3px rgba(15, 30, 55, 0.08)",
      },
      animation: {
        "fade-in": "fadeIn 0.35s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.65" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
