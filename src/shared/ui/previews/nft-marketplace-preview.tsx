import { Store } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";

const LISTINGS = [
  {
    id: "1",
    name: "Azuki #4209",
    collection: "Azuki",
    marketplace: "Blur",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    price: "6.8",
  },
  {
    id: "2",
    name: "Azuki #7712",
    collection: "Azuki",
    marketplace: "OpenSea",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    price: "7.2",
  },
  {
    id: "3",
    name: "Azuki #1033",
    collection: "Azuki",
    marketplace: "Blur",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    price: "7.5",
  },
];

const bestId = LISTINGS.reduce((b, l) => (parseFloat(l.price) < parseFloat(b.price) ? l : b), LISTINGS[0]).id;

export function NFTMarketplacePreview() {
  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Store size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Marketplace
          </span>
        </div>
      </div>

      {/* Listings */}
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
        {LISTINGS.map((listing) => {
          const isBest = listing.id === bestId;

          return (
            <div
              key={listing.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 14px",
                borderRadius: 12,
                transition: "background 0.15s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--w3-accent-subtle)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  background: listing.gradient,
                  flexShrink: 0,
                }}
              />

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "var(--w3-gray-900)",
                    display: "block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {listing.name}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 400, color: "var(--w3-gray-600)" }}>
                    {listing.collection}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      padding: "2px 6px",
                      borderRadius: 5,
                      background: "var(--w3-accent-subtle)",
                      color: "var(--w3-accent)",
                    }}
                  >
                    {listing.marketplace}
                  </span>
                </div>
              </div>

              {/* Price + Best badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                {isBest && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      padding: "2px 8px",
                      borderRadius: 9999,
                      background: "rgba(22, 163, 74, 0.1)",
                      color: "#16a34a",
                    }}
                  >
                    Best
                  </span>
                )}
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--w3-gray-900)",
                    fontFamily: monoFont,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {listing.price} ETH
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          3 listings
        </span>
      </div>
    </div>
  );
}
