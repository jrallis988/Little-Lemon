/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        cream: {
          DEFAULT: "hsl(var(--cream))",
          muted: "hsl(var(--cream-muted))",
        },
        foam: "hsl(var(--foam))",
        slate: {
          soft: "hsl(var(--slate-soft))",
          DEFAULT: "hsl(var(--slate))",
          deep: "hsl(var(--slate-deep))",
        },
        sage: {
          soft: "hsl(var(--sage-soft))",
          DEFAULT: "hsl(var(--sage))",
          deep: "hsl(var(--sage-deep))",
        },
        orange: {
          DEFAULT: "hsl(var(--orange))",
          deep: "hsl(var(--orange-deep))",
        },
        ocean: "hsl(var(--ocean))",
        sky: "hsl(var(--sky))",
        violet: "hsl(var(--violet))",
        navy: {
          DEFAULT: "hsl(var(--navy))",
          deep: "hsl(var(--navy-deep))",
          mist: "hsl(var(--navy-mist))",
        },
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
      },
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Figtree", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 10px 40px -18px hsl(var(--navy) / 0.18)",
        glass: "0 8px 32px hsl(var(--navy) / 0.12)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "rise-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        "learning-settle": {
          "0%": { opacity: "1", transform: "scale(1)" },
          "70%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.96)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.45s ease-out both",
        "rise-in": "rise-in 0.55s ease-out both",
        "soft-pulse": "soft-pulse 2.4s ease-in-out infinite",
        "learning-settle": "learning-settle 2.8s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
