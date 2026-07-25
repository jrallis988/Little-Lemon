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
          50: "#faf6f8",
          100: "#f1e8ee",
          200: "#e2d2dc",
          300: "#c7b0bf",
          400: "#9c8496",
          500: "#6f6575",
          600: "#544b5a",
          700: "#3d3544",
          800: "#2a2430",
          900: "#1f1a24",
          950: "#141018",
        },
        brand: {
          DEFAULT: "#ff7a33",
          light: "#ff9a5c",
          dark: "#e05e14",
          soft: "#ffe4d4",
        },
        accent: {
          DEFAULT: "#8b6cc9",
          soft: "#efe6ff",
          dark: "#6a4da8",
        },
        flame: {
          DEFAULT: "#ff7a33",
          light: "#ff9a5c",
          soft: "#ffe4d4",
          dark: "#e05e14",
        },
        friend: {
          DEFAULT: "#34c759",
          dark: "#28a745",
          soft: "#d8f8e2",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#fff4ec",
          border: "#f0d9c8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Trebuchet MS", "sans-serif"],
        script: ["var(--font-script)", "Pacifico", "cursive"],
        sans: ["var(--font-body)", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "16px",
        btn: "9999px",
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
