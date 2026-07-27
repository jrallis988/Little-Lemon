/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        dplus: {
          bg: "#040714",
          surface: "#0c1120",
          blue: "#0063e5",
        },
        magenta: "#ff1f7a",
      },
      fontFamily: {
        display: ['"Outfit"', "system-ui", "sans-serif"],
        body: ['"Manrope"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
