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
        // Dark Charcoal + Muted Neutral scale
        navy: {
          50: "#f7f7f7",
          100: "#ececec",
          200: "#d9d9d9",
          300: "#bdbdbd",
          400: "#8f8f8f",
          500: "#6E6E6E",
          600: "#555555",
          700: "#3d3d3d",
          800: "#2c2c2c",
          900: "#222222",
          950: "#141414",
        },
        // Primary Orange
        brand: {
          DEFAULT: "#FF7A18",
          light: "#FF9447",
          dark: "#E0650A",
          soft: "#FFE8D6",
        },
        // Secondary Purple
        accent: {
          DEFAULT: "#7B61FF",
          soft: "#EEE9FF",
          dark: "#5E45E0",
        },
        // Loop / CTA alias of primary orange
        flame: {
          DEFAULT: "#FF7A18",
          light: "#FF9447",
          soft: "#FFE8D6",
          dark: "#E0650A",
        },
        // Action Green
        friend: {
          DEFAULT: "#1E824C",
          dark: "#16653A",
          soft: "#D8F0E4",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#FFF7F0",
          border: "#E8E4DF",
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
        soft: "0 1px 2px rgba(34, 34, 34, 0.06)",
        card: "0 1px 3px rgba(34, 34, 34, 0.08)",
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
