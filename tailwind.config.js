/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        lg: "2.5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1120px",
      },
    },
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F7F8FA",
          soft: "#FFFFFF",
          muted: "#EEF2F6",
          line: "#E2E8F0",
        },
        charcoal: {
          DEFAULT: "#334155",
          deep: "#0F172A",
          soft: "#64748B",
        },
        violet: {
          deep: "#3B1A7A",
          DEFAULT: "#5B2BB3",
          bright: "#6D3BC4",
          mist: "#EDE4FF",
          field: "#F3EEFF",
        },
        chartreuse: {
          DEFAULT: "#A8C92A",
          light: "#C8F542",
          soft: "#EAF6B5",
          ink: "#3F4D0F",
        },
        // legacy aliases remapped toward the light system
        ink: {
          DEFAULT: "#F7F8FA",
          soft: "#FFFFFF",
          muted: "#EEF2F6",
        },
      },
      fontFamily: {
        display: ['"Source Serif 4"', "Georgia", "serif"],
        body: ['"Figtree"', "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.04)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        draw: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        rise: "rise 0.8s ease-out forwards",
        "rise-delay": "rise 0.8s ease-out 0.15s forwards",
        "rise-delay-2": "rise 0.8s ease-out 0.28s forwards",
        "rise-delay-3": "rise 0.8s ease-out 0.4s forwards",
        draw: "draw 0.9s ease-out 0.35s forwards",
        fade: "fadeIn 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};
