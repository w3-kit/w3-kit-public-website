import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { cryptoLogo, preloadCryptoLogos } from "../../lib/logos";
import { previewCard, previewHeader, monoFont } from "./_shared";

const networks = [
  { chainId: 1, name: "Ethereum", ticker: "ETH", ecosystem: "L1" },
  { chainId: 137, name: "Polygon", ticker: "POL", ecosystem: "L2" },
  { chainId: 42161, name: "Arbitrum", ticker: "ARB", ecosystem: "L2" },
  { chainId: 10, name: "Optimism", ticker: "OP", ecosystem: "L2" },
  { chainId: 8453, name: "Base", ticker: "BASE", ecosystem: "L2" },
];

export function NetworkSwitcherPreview() {
  useEffect(() => { preloadCryptoLogos(networks.map((n) => n.ticker)); }, []);

  const [selected, setSelected] = useState(1);
  const [showTestnets, setShowTestnets] = useState(false);

  const active = networks.find((n) => n.chainId === selected);

  return (
    <div style={{ ...previewCard, maxWidth: 420, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Network
          </span>
          {active && (
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: 12, color: "var(--w3-gray-500)" }}>
                {active.name}
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowTestnets(!showTestnets)}
          style={{
            fontSize: 12,
            fontWeight: 500,
            padding: "4px 10px",
            borderRadius: 8,
            border: "1px solid var(--w3-border-subtle)",
            background: showTestnets ? "var(--w3-accent)" : "transparent",
            color: showTestnets ? "#fff" : "var(--w3-gray-600)",
            cursor: "pointer",
          }}
        >
          Testnets
        </button>
      </div>

      {/* Network list */}
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
        {networks.map((net) => (
          <button
            key={net.chainId}
            onClick={() => setSelected(net.chainId)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 14px",
              borderRadius: 12,
              border: "none",
              background: selected === net.chainId ? "var(--w3-accent-subtle)" : "transparent",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              transition: "background 0.15s",
            }}
          >
            <img
              src={cryptoLogo(net.ticker)}
              alt={net.name}
              width={32}
              height={32}
              style={{ borderRadius: "50%", display: "block" }}
              loading="lazy"
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)" }}>
                  {net.name}
                </span>
              </div>
              <span style={{ fontSize: 13, color: "var(--w3-gray-600)", display: "block", marginTop: 1 }}>
                {net.ecosystem}
              </span>
            </div>
            <span style={{ fontSize: 12, color: "var(--w3-gray-500)", fontFamily: monoFont, flexShrink: 0 }}>
              {net.chainId}
            </span>
            {selected === net.chainId && (
              <Check size={16} style={{ color: "var(--w3-accent)", flexShrink: 0 }} />
            )}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          {networks.length} networks
        </span>
      </div>
    </div>
  );
}
