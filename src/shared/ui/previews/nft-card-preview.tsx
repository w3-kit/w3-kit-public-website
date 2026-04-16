import { Image } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";

export function NFTCardPreview() {
  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            NFT
          </span>
        </div>
      </div>

      {/* NFT Card */}
      <div style={{ padding: "16px 20px" }}>
        <div
          style={{
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid var(--w3-border-subtle)",
            background: "var(--w3-surface-elevated)",
          }}
        >
          {/* Image placeholder */}
          <div
            style={{
              position: "relative",
              aspectRatio: "1",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            {/* Collection badge */}
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                padding: "3px 8px",
                borderRadius: 6,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
                fontSize: 10,
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "0.04em",
              }}
            >
              BAYC
            </div>
          </div>

          {/* Info section */}
          <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)" }}>
              Bored Ape #7842
            </span>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--w3-gray-900)",
                  fontFamily: monoFont,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                68.5 ETH
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: "var(--w3-gray-600)",
                  fontFamily: monoFont,
                }}
              >
                0xd8dA...6045
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          BAYC Collection
        </span>
      </div>
    </div>
  );
}
