/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cobalt: {
          50: "#eef3ff",
          100: "#d9e4ff",
          200: "#bcd0ff",
          300: "#8eb0ff",
          400: "#5986ff",
          500: "#335bff",
          600: "#1a38f5",
          700: "#1429e1",
          800: "#1723b6",
          900: "#19248f",
          950: "#0f1457",
        },
        ink: "#0b1220",
        mist: "#e8eef8",
        cloud: "#f4f7fc",
        paper: "#fafbfd",
        tide: "#1bb8a8",
        periwinkle: "#c5c8eb",
      },
      fontFamily: {
        display: ["Syne", "system-ui", "sans-serif"],
        serif: ["Newsreader", "Georgia", "serif"],
        sans: ["Figtree", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 24px 80px rgba(26, 56, 245, 0.18)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fillBar: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        rise: "rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fill-bar": "fillBar 1.4s cubic-bezier(0.22, 1, 0.36, 1) both",
        drift: "drift 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
