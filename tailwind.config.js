/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        mist: "var(--mist)",
        foam: "var(--foam)",
        tide: "var(--tide)",
        "tide-deep": "var(--tide-deep)",
        buoy: "var(--buoy)",
        steel: "var(--steel)",
        salt: "var(--salt)",
      },
      fontFamily: {
        display: ['"Oswald"', "Impact", "sans-serif"],
        sans: ['"Figtree"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "72rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(1.25rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1.05) translate(0, 0)" },
          "100%": { transform: "scale(1.12) translate(-1.5%, -1%)" },
        },
        "draw-line": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "ken-burns": "ken-burns 18s ease-out forwards",
        "draw-line": "draw-line 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};
