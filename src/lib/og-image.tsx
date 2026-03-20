import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function generateRootOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-2px",
            }}
          >
            W3-Kit
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#94a3b8",
              maxWidth: "600px",
              textAlign: "center",
            }}
          >
            Modern Web3 UI Components for React
          </div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}

export function generateComponentOgImage({
  name,
  description,
  category,
}: {
  name: string;
  description: string;
  category: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                padding: "6px 16px",
                background: "rgba(99, 102, 241, 0.2)",
                borderRadius: "9999px",
                color: "#818cf8",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              {category}
            </div>
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-1px",
              lineHeight: 1.1,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#94a3b8",
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            {description.length > 120
              ? description.slice(0, 120) + "..."
              : description}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "28px", fontWeight: 700, color: "#ffffff" }}>
            W3-Kit
          </div>
          <div style={{ fontSize: "18px", color: "#64748b" }}>
            w3-kit.com
          </div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
