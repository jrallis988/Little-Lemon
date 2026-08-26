import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        safe: {
          DEFAULT: "hsl(var(--safe))",
          foreground: "hsl(var(--safe-foreground))",
          soft: "hsl(var(--safe-soft))",
        },
        brand: {
          DEFAULT: "hsl(var(--brand))",
          soft: "hsl(var(--brand-soft))",
        },
        pending: {
          DEFAULT: "hsl(var(--pending))",
          soft: "hsl(var(--pending-soft))",
        },
        warn: {
          DEFAULT: "hsl(var(--warn))",
          soft: "hsl(var(--warn-soft))",
        },
        tag: {
          teacher: "hsl(var(--tag-teacher))",
          "teacher-soft": "hsl(var(--tag-teacher-soft))",
          classmate: "hsl(var(--tag-classmate))",
          "classmate-soft": "hsl(var(--tag-classmate-soft))",
          family: "hsl(var(--tag-family))",
          "family-soft": "hsl(var(--tag-family-soft))",
          school: "hsl(var(--tag-school))",
          "school-soft": "hsl(var(--tag-school-soft))",
        },
        nest: {
          sky: "hsl(var(--nest-sky))",
          mist: "hsl(var(--nest-mist))",
          leaf: "hsl(var(--nest-leaf))",
          coral: "hsl(var(--nest-coral))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "1.35rem",
        "3xl": "1.75rem",
        "4xl": "2rem",
      },
      fontFamily: {
        display: ['"Fredoka"', '"Nunito"', "ui-rounded", "system-ui", "sans-serif"],
        serif: ['"Fredoka"', '"Nunito"', "ui-rounded", "system-ui", "sans-serif"],
        sans: ['"Nunito"', "ui-rounded", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 28px -14px rgba(99, 122, 255, 0.45)",
        panel:
          "0 1px 0 rgba(255,255,255,0.9) inset, 0 16px 40px -20px rgba(99, 122, 255, 0.35)",
        card: "0 10px 28px -16px rgba(70, 90, 180, 0.28)",
        pop: "0 8px 0 0 rgba(99, 122, 255, 0.18)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(-2deg)" },
          "50%": { transform: "translateY(-8px) rotate(2deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out both",
        "soft-pulse": "soft-pulse 2s ease-in-out infinite",
        float: "float 3.8s ease-in-out infinite",
        wiggle: "wiggle 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
