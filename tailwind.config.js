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
          DEFAULT: "#12081F",
          soft: "#1B0F2E",
          muted: "#2A1745",
        },
        violet: {
          deep: "#2A0F5C",
          DEFAULT: "#5B2BB3",
          bright: "#7B45E0",
          mist: "#C9B4F5",
          field: "#4A1F9B",
        },
        chartreuse: {
          DEFAULT: "#C8F542",
          light: "#D9FF6A",
          soft: "#E8FF9A",
          ink: "#142006",
        },
      },
      fontFamily: {
        display: ['"Syne"', "sans-serif"],
        body: ['"Figtree"', "sans-serif"],
      },
      backgroundImage: {
        "hero-wash":
          "linear-gradient(135deg, rgba(18,8,31,0.68) 0%, rgba(74,31,155,0.62) 46%, rgba(18,8,31,0.78) 100%)",
        "section-glow":
          "radial-gradient(ellipse at top, rgba(91,43,179,0.42), transparent 55%)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        draw: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        drift: {
          "0%": { transform: "scale(1.08) translate(0, 0)" },
          "100%": { transform: "scale(1.16) translate(-1.5%, 1%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        rise: "rise 0.9s ease-out forwards",
        "rise-delay": "rise 0.9s ease-out 0.18s forwards",
        "rise-delay-2": "rise 0.9s ease-out 0.32s forwards",
        "rise-delay-3": "rise 0.9s ease-out 0.48s forwards",
        draw: "draw 1s ease-out 0.4s forwards",
        drift: "drift 18s ease-in-out alternate infinite",
        fade: "fadeIn 1.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};
