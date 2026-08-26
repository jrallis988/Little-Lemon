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
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "1.75rem",
      },
      fontFamily: {
        display: ['"Nunito"', "ui-rounded", "system-ui", "sans-serif"],
        serif: ['"Nunito"', "ui-rounded", "system-ui", "sans-serif"],
        sans: ['"Nunito"', "ui-rounded", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 28px -16px rgba(67, 97, 238, 0.35)",
        panel:
          "0 1px 0 rgba(255,255,255,0.85) inset, 0 14px 36px -22px rgba(67, 97, 238, 0.28)",
        card: "0 8px 24px -14px rgba(40, 60, 120, 0.22)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.35s ease-out both",
        "soft-pulse": "soft-pulse 2s ease-in-out infinite",
        float: "float 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
