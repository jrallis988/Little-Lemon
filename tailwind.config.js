/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        granite: {
          50: "#F5F6F7",
          100: "#E8EAED",
          200: "#D1D5DB",
          300: "#A8AFB8",
          400: "#6B7280",
          500: "#4B5563",
          600: "#3A4149",
          700: "#2C333A",
          800: "#1F252B",
          900: "#151A1F",
        },
        pine: {
          50: "#F0F5F2",
          100: "#D8E6DE",
          200: "#B0CDBD",
          300: "#7AAB93",
          400: "#4A8568",
          500: "#2D5A45",
          600: "#244A38",
          700: "#1C3A2C",
          800: "#152B21",
          900: "#0F1F18",
        },
        amber: {
          50: "#FDF6EE",
          100: "#F9E8D4",
          200: "#F2CFA3",
          300: "#E8B06A",
          400: "#D4893A",
          500: "#B86A1E",
          600: "#9A5618",
          700: "#7A4414",
          800: "#5C3410",
          900: "#3D220A",
        },
        snow: "#FBFBFA",
        mist: "#F2F3F1",
      },
      fontFamily: {
        serif: ["var(--font-merriweather)", "Georgia", "serif"],
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
      boxShadow: {
        focus: "0 0 0 3px rgba(45, 90, 69, 0.45)",
      },
    },
  },
  plugins: [],
};
