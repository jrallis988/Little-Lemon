/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        lg: "2rem",
      },
    },
    extend: {
      colors: {
        river: {
          DEFAULT: "#0a5c75",
          deep: "#063848",
          mid: "#1a7a94",
          mist: "#e7f2f5",
          foam: "#f6fbfc",
        },
        valley: {
          DEFAULT: "#245c3b",
          soft: "#3d7a55",
        },
        birch: "#f4f1e8",
        granite: {
          DEFAULT: "#2f3b40",
          muted: "#5c6b72",
        },
        sunrise: "#d4a017",
      },
      fontFamily: {
        display: ['"Sora"', "system-ui", "sans-serif"],
        body: ['"Source Sans 3"', "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(1.25rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0.35" },
          "100%": { opacity: "1" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
        "draw-line": {
          "0%": { transform: "scaleX(0.2)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s ease-out both",
        "fade-up-delay": "fade-up 0.9s ease-out 0.15s both",
        "fade-up-delay-2": "fade-up 0.9s ease-out 0.3s both",
        "fade-up-delay-3": "fade-up 0.9s ease-out 0.45s both",
        "fade-in": "fade-in 1s ease-out both",
        "ken-burns": "ken-burns 14s ease-out both",
        "draw-line": "draw-line 0.9s ease-out both",
      },
    },
  },
  plugins: [],
};
