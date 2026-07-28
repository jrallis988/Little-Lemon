/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: {
          DEFAULT: "hsl(var(--surface))",
          muted: "hsl(var(--surface-muted))",
          elevated: "hsl(var(--surface-elevated))",
        },
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
        deal: {
          DEFAULT: "hsl(var(--deal))",
          foreground: "hsl(var(--deal-foreground))",
          soft: "hsl(var(--deal-soft))",
        },
        sky: {
          DEFAULT: "hsl(var(--sky))",
          foreground: "hsl(var(--sky-foreground))",
          soft: "hsl(var(--sky-soft))",
        },
        navy: {
          DEFAULT: "hsl(var(--navy))",
          foreground: "hsl(var(--navy-foreground))",
        },
        brand: {
          red: "hsl(var(--brand-red))",
          blue: "hsl(var(--brand-blue))",
        },
        inventory: {
          low: "hsl(var(--inventory-low))",
          in: "hsl(var(--inventory-in))",
          out: "hsl(var(--inventory-out))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.03em" }],
        display: ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        gutter: "var(--layout-gutter)",
        rail: "var(--layout-rail)",
      },
      maxWidth: {
        shelf: "var(--layout-max)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 1px)",
        sm: "calc(var(--radius) - 2px)",
      },
      boxShadow: {
        soft: "0 1px 2px hsl(220 20% 10% / 0.04), 0 4px 12px hsl(220 20% 10% / 0.04)",
        lift: "0 2px 4px hsl(220 20% 10% / 0.04), 0 12px 28px hsl(220 20% 10% / 0.08)",
        drawer: "-8px 0 32px hsl(220 20% 10% / 0.12)",
        header: "0 1px 0 hsl(var(--border))",
      },
      transitionTimingFunction: {
        retail: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.35s ease-out",
        "slide-up": "slide-up 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-in-right": "slide-in-right 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        shimmer: "shimmer 1.4s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
