"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#fff",
          color: "#1a1025",
          textAlign: "center",
          padding: 24,
        }}
      >
        <div>
          <p style={{ letterSpacing: "0.2em", fontSize: 11, color: "#5f259f" }}>
            SOMETHING WENT WRONG
          </p>
          <h1 style={{ fontSize: 36, margin: "8px 0" }}>We hit a snag</h1>
          <p style={{ color: "#666" }}>Try again, or reload the homepage.</p>
          <div style={{ marginTop: 20, display: "flex", gap: 8, justifyContent: "center" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                border: 0,
                borderRadius: 999,
                padding: "10px 18px",
                background: "#5f259f",
                color: "#fff",
                fontWeight: 600,
              }}
            >
              Try again
            </button>
            <Link
              href="/"
              style={{
                borderRadius: 999,
                padding: "10px 18px",
                border: "1px solid #ddd",
                color: "#1a1025",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
