import { useState } from "react";
import { Fuel } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";

type Speed = "economy" | "standard" | "fast";

interface SpeedOption {
  key: Speed;
  label: string;
  gwei: number;
  time: string;
  ethCost: string;
  usd: string;
}

const SPEEDS: SpeedOption[] = [
  { key: "economy", label: "Economy", gwei: 12, time: "~2 min", ethCost: "0.000252", usd: "$0.38" },
  { key: "standard", label: "Standard", gwei: 18, time: "~30s", ethCost: "0.000378", usd: "$0.57" },
  { key: "fast", label: "Fast", gwei: 25, time: "~15s", ethCost: "0.000525", usd: "$0.79" },
];

export function GasCalculatorPreview() {
  const [selected, setSelected] = useState<Speed>("standard");

  const current = SPEEDS.find((s) => s.key === selected)!;

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Fuel size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Gas
          </span>
        </div>
        <span style={{ fontSize: 13, fontFamily: monoFont, color: "var(--w3-gray-600)" }}>
          10 gwei base
        </span>
      </div>

      {/* Speed buttons */}
      <div style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {SPEEDS.map((speed) => {
            const isActive = selected === speed.key;
            return (
              <button
                key={speed.key}
                onClick={() => setSelected(speed.key)}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  padding: "12px 8px",
                  borderRadius: 12,
                  border: isActive ? "1.5px solid var(--w3-accent)" : "1px solid var(--w3-border-subtle)",
                  background: isActive ? "var(--w3-accent-subtle)" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--w3-gray-900)" }}>
                  {speed.label}
                </span>
                <span style={{ fontSize: 15, fontWeight: 500, fontFamily: monoFont, color: "var(--w3-gray-900)" }}>
                  {speed.gwei} gwei
                </span>
                <span style={{ fontSize: 13, fontWeight: 400, color: "var(--w3-gray-600)" }}>
                  {speed.time}
                </span>
              </button>
            );
          })}
        </div>

        {/* Estimated cost */}
        <div
          style={{
            borderRadius: 12,
            border: "1px solid var(--w3-border-subtle)",
            padding: "14px 16px",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>
            Estimated Cost
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 16, fontWeight: 600, fontFamily: monoFont, color: "var(--w3-gray-900)", fontVariantNumeric: "tabular-nums" }}>
              {current.ethCost} ETH
            </span>
            <span style={{ fontSize: 13, fontWeight: 400, color: "var(--w3-gray-600)", fontVariantNumeric: "tabular-nums" }}>
              {current.usd}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          Ethereum mainnet
        </span>
      </div>
    </div>
  );
}
