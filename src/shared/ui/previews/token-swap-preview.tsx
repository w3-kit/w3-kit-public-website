import { useState } from "react";
import { ArrowDownUp } from "lucide-react";

export function TokenSwapPreview() {
  const [fromAmount, setFromAmount] = useState("0.5");
  const [flipped, setFlipped] = useState(false);
  const fromToken = flipped ? "USDC" : "ETH";
  const toToken = flipped ? "ETH" : "USDC";
  const fromColor = flipped ? "#2775CA" : "#627EEA";
  const toColor = flipped ? "#627EEA" : "#2775CA";
  const rate = flipped ? 0.00052 : 1917.5;
  const toAmount = fromAmount ? (parseFloat(fromAmount) * rate).toFixed(flipped ? 4 : 2) : "";

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
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--w3-gray-900)" }}>Swap</span>
        <span style={{ fontSize: 10, color: "var(--w3-gray-500)" }}>
          1 {fromToken} ≈ {rate.toLocaleString()} {toToken}
        </span>
      </div>

      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
        {/* From */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: "var(--w3-gray-500)" }}>From</span>
            <span style={{ fontSize: 10, color: "var(--w3-gray-400)" }}>Balance: 1.42</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid var(--w3-border-subtle)",
              background: "var(--w3-glass-inner-bg)",
            }}
          >
            <input
              type="text"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                fontSize: 16,
                fontWeight: 600,
                color: "var(--w3-gray-900)",
                fontFamily: '"Geist Mono", ui-monospace, monospace',
                outline: "none",
                width: 0,
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 8px",
                borderRadius: 6,
                background: fromColor + "18",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: fromColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 8,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {fromToken.slice(0, 2)}
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--w3-gray-900)" }}>
                {fromToken}
              </span>
            </div>
          </div>
        </div>

        {/* Swap button */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => setFlipped(!flipped)}
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: "1px solid var(--w3-border-subtle)",
              background: "var(--w3-surface-elevated)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--w3-gray-600)",
            }}
          >
            <ArrowDownUp size={12} />
          </button>
        </div>

        {/* To */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: "var(--w3-gray-500)" }}>To</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid var(--w3-border-subtle)",
              background: "var(--w3-glass-inner-bg)",
            }}
          >
            <span
              style={{
                flex: 1,
                fontSize: 16,
                fontWeight: 600,
                color: toAmount ? "var(--w3-gray-900)" : "var(--w3-gray-400)",
                fontFamily: '"Geist Mono", ui-monospace, monospace',
              }}
            >
              {toAmount || "0.0"}
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 8px",
                borderRadius: 6,
                background: toColor + "18",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: toColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 8,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {toToken.slice(0, 2)}
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--w3-gray-900)" }}>
                {toToken}
              </span>
            </div>
          </div>
        </div>

        {/* Swap button */}
        <button
          style={{
            marginTop: 4,
            padding: "10px",
            borderRadius: 8,
            border: "none",
            background: "var(--w3-accent)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Swap
        </button>
      </div>
    </div>
  );
}
