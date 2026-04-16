import { useState } from "react";

const tokens = [
  { symbol: "ETH", name: "Ethereum", balance: "1.4201", price: 3834.27, change: 2.41, color: "#627EEA" },
  { symbol: "USDC", name: "USD Coin", balance: "2,500.00", price: 1.0, change: 0.01, color: "#2775CA" },
  { symbol: "LINK", name: "Chainlink", balance: "84.50", price: 14.82, change: -1.32, color: "#2A5ADA" },
];

const total = 8786.19;

export function WalletBalancePreview() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      style={{
        borderRadius: 12,
        border: "1px solid var(--w3-border-subtle)",
        background: "var(--w3-surface-elevated)",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 14px",
          borderBottom: "1px solid var(--w3-border-subtle)",
        }}
      >
        <div style={{ fontSize: 10, color: "var(--w3-gray-500)", marginBottom: 2 }}>
          Total Balance
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: "var(--w3-gray-900)" }}>
            ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
          <span style={{ fontSize: 11, fontWeight: 500, color: "#22c55e" }}>+1.84%</span>
        </div>

        {/* Allocation bar */}
        <div
          style={{
            display: "flex",
            height: 4,
            borderRadius: 2,
            overflow: "hidden",
            marginTop: 10,
            gap: 2,
          }}
        >
          {tokens.map((t) => (
            <div
              key={t.symbol}
              style={{
                flex: t.symbol === "ETH" ? 5 : t.symbol === "USDC" ? 3 : 1,
                background: t.color,
                opacity: hovered && hovered !== t.symbol ? 0.3 : 1,
                transition: "opacity 0.2s",
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Token rows */}
      <div style={{ padding: "4px 6px" }}>
        {tokens.map((t) => (
          <div
            key={t.symbol}
            onMouseEnter={() => setHovered(t.symbol)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 8px",
              borderRadius: 8,
              background: hovered === t.symbol ? "var(--w3-accent-subtle)" : "transparent",
              transition: "background 0.15s",
              cursor: "default",
            }}
          >
            {/* Token icon */}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: t.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 700,
                color: "#fff",
                fontFamily: '"Geist Mono", ui-monospace, monospace',
                flexShrink: 0,
              }}
            >
              {t.symbol.slice(0, 2)}
            </div>

            {/* Name */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-900)" }}>
                {t.symbol}
              </div>
              <div style={{ fontSize: 10, color: "var(--w3-gray-500)" }}>{t.name}</div>
            </div>

            {/* Balance + value */}
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--w3-gray-900)",
                  fontFamily: '"Geist Mono", ui-monospace, monospace',
                }}
              >
                {t.balance}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4 }}>
                <span
                  style={{
                    fontSize: 10,
                    color: t.change >= 0 ? "#22c55e" : "#ef4444",
                  }}
                >
                  {t.change >= 0 ? "+" : ""}
                  {t.change}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
