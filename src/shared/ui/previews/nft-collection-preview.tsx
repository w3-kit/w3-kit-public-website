import { Grid3X3 } from "lucide-react";
import { previewCard, previewHeader } from "./_shared";

const ITEMS = [
  { id: "1", name: "BAYC #3749", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { id: "2", name: "BAYC #8585", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
  { id: "3", name: "BAYC #7090", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
  { id: "4", name: "BAYC #4671", gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
];

export function NFTCollectionPreview() {
  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Grid3X3 size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Collection
          </span>
          <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>{ITEMS.length}</span>
        </div>
      </div>

      {/* 2x2 Grid */}
      <div
        style={{
          padding: "16px 20px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        {ITEMS.map((nft) => (
          <div
            key={nft.id}
            style={{
              cursor: "pointer",
              transition: "transform 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "none";
            }}
          >
            <div
              style={{
                aspectRatio: "1",
                borderRadius: 12,
                background: nft.gradient,
                overflow: "hidden",
              }}
            />
            <span
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 400,
                color: "var(--w3-gray-600)",
                marginTop: 6,
              }}
            >
              {nft.name}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          4 items
        </span>
      </div>
    </div>
  );
}
