"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(
      JSON.stringify({
        ts: new Date().toISOString(),
        level: "error",
        message: "global_error_boundary",
        digest: error.digest,
        name: error.name,
        detail: error.message,
      })
    );
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          padding: "3rem 1.25rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", fontWeight: 600 }}>
          Trump RX is temporarily unavailable
        </h1>
        <p style={{ color: "#555", marginTop: "0.75rem" }}>
          Please try again in a moment.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "1.5rem",
            padding: "0.65rem 1.25rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "#e24a2e",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
