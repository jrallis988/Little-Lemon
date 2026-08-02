import type { Config } from "tailwindcss";

/**
 * BCH Design System v3 tokens → Tailwind theme.
 * Colors resolve from CSS variables in globals.css (single source of truth).
 * Brand Guidelines 2021 · prototypes/bch-redesign-v5.html
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        blue: "var(--blue)",
        ocean: {
          DEFAULT: "var(--ocean)",
          dark: "var(--ocean-dark)",
        },
        pink: {
          DEFAULT: "var(--pink)",
          text: "var(--pink-text)",
        },
        sky: "var(--sky)",
        bay: "var(--bay)",
        green: {
          DEFAULT: "var(--green)",
          bright: "var(--green-bright)",
        },
        indigo: "var(--indigo)",
        emergency: {
          DEFAULT: "var(--emergency)",
          dark: "var(--emergency-dark)",
          bright: "var(--emergency-bright)",
          bg: "var(--emergency-bg)",
          text: "var(--emergency-text)",
        },
        "nav-dark": "var(--nav-dark)",
        text: {
          DEFAULT: "var(--text)",
          body: "var(--text-body)",
          meta: "var(--text-meta)",
          ghost: "var(--text-ghost)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          2: "var(--surface-2)",
        },
        border: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          bg: "var(--warning-bg)",
          text: "var(--warning-text)",
          strong: "var(--warning-text-strong)",
          body: "var(--warning-body)",
        },
        success: {
          text: "var(--success-text)",
        },
        footer: "#12152a",
      },
      fontFamily: {
        sans: [
          "var(--font-nunito)",
          "Nunito Sans",
          "Museo Sans",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        xs: ["11px", { lineHeight: "1.4" }],
        sm: ["13px", { lineHeight: "1.5" }],
        base: ["15px", { lineHeight: "1.6" }],
        md: ["17px", { lineHeight: "1.75" }],
        lg: ["19px", { lineHeight: "1.65" }],
        xl: ["24px", { lineHeight: "1.3" }],
        "2xl": ["30px", { lineHeight: "1.2" }],
        "3xl": ["38px", { lineHeight: "1.15" }],
        "4xl": ["50px", { lineHeight: "1.1" }],
        data: ["58px", { lineHeight: "1" }],
      },
      spacing: {
        s1: "4px",
        s2: "8px",
        s3: "12px",
        s4: "16px",
        s5: "24px",
        s6: "32px",
        s7: "48px",
        s8: "64px",
        s9: "80px",
        s10: "100px",
      },
      borderRadius: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
      boxShadow: {
        sm: "0 1px 4px rgba(0,0,0,.07)",
        md: "0 4px 16px rgba(0,0,0,.10)",
        lg: "0 8px 32px rgba(0,0,0,.12)",
      },
      maxWidth: {
        content: "1200px",
      },
      transitionProperty: {
        ease: "all",
      },
      transitionDuration: {
        ease: "180ms",
      },
      keyframes: {
        fadeDown: {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
      },
      animation: {
        "fade-down": "fadeDown 0.15s ease",
        "fade-up": "fadeUp 0.18s ease",
        "pulse-dot": "pulseDot 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
