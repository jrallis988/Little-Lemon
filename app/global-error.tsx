"use client";

import { Archivo_Black, Inter } from "next/font/google";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className={`${archivoBlack.variable} ${inter.variable}`}>
      <body
        style={{
          margin: 0,
          fontFamily: "var(--font-inter), Georgia, sans-serif",
          background: "#f7f4ee",
          color: "#3c4353",
        }}
      >
        <main
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "4rem 1.5rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-archivo-black), sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "3.5px",
              textTransform: "uppercase",
              color: "#e63946",
            }}
          >
            Something went wrong
          </p>
          <h1
            style={{
              fontFamily: "var(--font-archivo-black), sans-serif",
              fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)",
              color: "#10131b",
              marginTop: "1.5rem",
            }}
          >
            We hit a snag.
          </h1>
          <p style={{ marginTop: "1rem", lineHeight: 1.75 }}>
            {error.message || "An unexpected error occurred."}
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              background: "#e63946",
              color: "#fff",
              border: 0,
              borderRadius: 2,
              padding: "1rem 1.75rem",
              fontFamily: "var(--font-archivo-black), sans-serif",
              fontSize: "0.85rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Try again →
          </button>
        </main>
      </body>
    </html>
  );
}
