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
          DEFAULT: "#07060A",
          soft: "#12101A",
          muted: "#1C1828",
        },
        violet: {
          deep: "#3B1668",
          DEFAULT: "#6B2FA0",
          bright: "#8F4DC9",
          mist: "#C4A1E8",
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#E4C65A",
          soft: "#F0DC8A",
        },
      },
      fontFamily: {
        display: ['"Syne"', "sans-serif"],
        body: ['"Figtree"', "sans-serif"],
      },
      backgroundImage: {
        "hero-wash":
          "linear-gradient(135deg, rgba(7,6,10,0.72) 0%, rgba(59,22,104,0.55) 48%, rgba(7,6,10,0.78) 100%)",
        "section-glow":
          "radial-gradient(ellipse at top, rgba(107,47,160,0.28), transparent 55%)",
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
