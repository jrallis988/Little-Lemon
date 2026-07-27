/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        magenta: "#ff1f7a",
        cyan: "#00b4e4",
        sun: "#ffc107",
        navy: "#0c2340",
        rock: {
          stage: "#1a0b2e",
          neon: "#39e6c4",
          amp: "#ff4d6d",
        },
      },
      fontFamily: {
        display: ['"Fredoka"', "system-ui", "sans-serif"],
        body: ['"Nunito"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
