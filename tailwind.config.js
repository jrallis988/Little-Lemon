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
        ink: {
          DEFAULT: "#0A1218",
          soft: "#132029",
          mist: "#1C2E3A",
        },
        foam: {
          DEFAULT: "#3ECFBE",
          soft: "#7FE3D5",
          deep: "#1FA896",
        },
        sand: "#D9E2E8",
        chalk: "#F3F7F9",
      },
      fontFamily: {
        display: ['"Syne"', "sans-serif"],
        body: ['"Manrope"', "sans-serif"],
      },
      letterSpacing: {
        brand: "0.04em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(2%, -1.5%, 0) scale(1.04)" },
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 1s ease both",
        drift: "drift 18s ease-in-out infinite",
        shimmer: "shimmer 10s ease infinite",
      },
    },
  },
  plugins: [],
};
