import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Morgan Bright academic software for schools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #06235b 0%, #0b48bc 55%, #e11d2e 100%)",
          color: "#ffffff",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "#e11d2e",
              borderRadius: 8,
              display: "flex",
            }}
          />
          <div style={{ fontSize: 36, fontWeight: 700 }}>Morgan Bright</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 750,
              lineHeight: 1.1,
              maxWidth: 920,
            }}
          >
            Academic software schools buy to personalize intervention.
          </div>
          <div style={{ fontSize: 28, opacity: 0.92, maxWidth: 860 }}>
            Diagnose learning hurdles. Adapt instruction. Track progress.
          </div>
        </div>
        <div style={{ fontSize: 22, opacity: 0.85 }}>
          Classroom · School · District plans
        </div>
      </div>
    ),
    { ...size },
  );
}
