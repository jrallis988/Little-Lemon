import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        stage: "var(--stage)",
        velvet: "var(--velvet)",
        foam: "var(--foam)",
        smoke: "var(--smoke)",
        mic: "var(--mic)",
        spotlight: "var(--spotlight)",
        marquee: "var(--marquee)",
        laugh: "var(--laugh)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        bit: ["var(--font-bit)", "serif"],
      },
      boxShadow: {
        spot: "0 0 80px rgba(240, 165, 0, 0.18)",
        soft: "0 18px 50px rgba(0,0,0,0.35)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        marqueePulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
      },
      animation: {
        rise: "rise 0.55s ease-out both",
        glow: "glow 3.2s ease-in-out infinite",
        "marquee-pulse": "marqueePulse 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
