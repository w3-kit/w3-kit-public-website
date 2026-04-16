import { useState } from "react";
import { Check } from "lucide-react";

const networks = [
  { chainId: 1, name: "Ethereum", symbol: "ETH", color: "#627EEA" },
  { chainId: 137, name: "Polygon", symbol: "POL", color: "#8247E5" },
  { chainId: 42161, name: "Arbitrum", symbol: "ARB", color: "#28A0F0" },
  { chainId: 10, name: "Optimism", symbol: "OP", color: "#FF0420" },
  { chainId: 8453, name: "Base", symbol: "BASE", color: "#0052FF" },
];

export function NetworkSwitcherPreview() {
  const [selected, setSelected] = useState(1);
  const [showTestnets, setShowTestnets] = useState(false);

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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          borderBottom: "1px solid var(--w3-border-subtle)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Network
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 10,
              color: "var(--w3-gray-500)",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
            {networks.find((n) => n.chainId === selected)?.name}
          </div>
        </div>
        <button
          onClick={() => setShowTestnets(!showTestnets)}
          style={{
            fontSize: 10,
            fontWeight: 500,
            padding: "3px 8px",
            borderRadius: 6,
            border: "1px solid var(--w3-border-subtle)",
            background: showTestnets ? "var(--w3-accent)" : "transparent",
            color: showTestnets ? "#fff" : "var(--w3-gray-500)",
            cursor: "pointer",
          }}
        >
          Testnets
        </button>
      </div>

      {/* Network list */}
      <div style={{ padding: "4px 6px" }}>
        {networks.map((net) => (
          <button
            key={net.chainId}
            onClick={() => setSelected(net.chainId)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "7px 8px",
              borderRadius: 8,
              border: "none",
              background: selected === net.chainId ? "var(--w3-accent-subtle)" : "transparent",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background: net.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                fontWeight: 700,
                color: "#fff",
                fontFamily: '"Geist Mono", ui-monospace, monospace',
                flexShrink: 0,
              }}
            >
              {net.symbol.slice(0, 2)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-900)" }}>
                {net.name}
              </div>
            </div>
            <span
              style={{
                fontSize: 10,
                color: "var(--w3-gray-400)",
                fontFamily: '"Geist Mono", ui-monospace, monospace',
                flexShrink: 0,
              }}
            >
              {net.chainId}
            </span>
            {selected === net.chainId && (
              <Check size={12} style={{ color: "var(--w3-accent)", flexShrink: 0 }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
