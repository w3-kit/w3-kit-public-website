import { useState } from "react";
import { Clock } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";

export function TokenVestingPreview() {
  const [claiming, setClaiming] = useState(false);

  const totalAmount = 100_000;
  const vestedAmount = 42_500;
  const claimableAmount = 12_500;
  const progress = (vestedAmount / totalAmount) * 100;

  const handleClaim = () => {
    setClaiming(true);
    setTimeout(() => setClaiming(false), 1200);
  };

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Clock size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Vesting
          </span>
        </div>
      </div>

      <div style={{ padding: 14 }}>
        {/* Token name + amounts */}
        <div style={{ marginBottom: 14 }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)", display: "block" }}>
            W3K Token
          </span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
            <span style={{ fontSize: 13, fontFamily: monoFont, color: "var(--w3-gray-600)" }}>
              {vestedAmount.toLocaleString()} / {totalAmount.toLocaleString()} vested
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: "100%",
            height: 6,
            borderRadius: 3,
            background: "var(--w3-glass-inner-bg)",
            overflow: "hidden",
            marginBottom: 6,
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              borderRadius: 3,
              background: "var(--w3-accent)",
              transition: "width 0.3s",
            }}
          />
        </div>

        {/* Progress label */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 13,
            fontWeight: 400,
            color: "var(--w3-gray-600)",
            marginBottom: 14,
            fontFamily: monoFont,
          }}
        >
          <span>{progress.toFixed(1)}%</span>
          <span>{(totalAmount - vestedAmount).toLocaleString()} remaining</span>
        </div>

        {/* Detail grid */}
        <div
          style={{
            borderRadius: 12,
            background: "var(--w3-glass-inner-bg)",
            padding: 14,
            marginBottom: 14,
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {/* Cliff Date */}
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--w3-gray-500)",
                  marginBottom: 4,
                }}
              >
                Cliff Date
              </div>
              <div style={{ fontSize: 13, fontWeight: 400, color: "var(--w3-gray-600)" }}>
                Jun 15, 2025
              </div>
            </div>

            {/* End Date */}
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--w3-gray-500)",
                  marginBottom: 4,
                }}
              >
                End Date
              </div>
              <div style={{ fontSize: 13, fontWeight: 400, color: "var(--w3-gray-600)" }}>
                Jun 15, 2027
              </div>
            </div>

            {/* Claimable */}
            <div style={{ gridColumn: "1 / -1" }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--w3-gray-500)",
                  marginBottom: 4,
                }}
              >
                Claimable Now
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: monoFont,
                  color: "#22c55e",
                }}
              >
                {claimableAmount.toLocaleString()} W3K
              </div>
            </div>
          </div>
        </div>

        {/* Claim button */}
        <button
          onClick={handleClaim}
          disabled={claiming}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: 8,
            border: "none",
            background: "var(--w3-accent)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 500,
            cursor: claiming ? "not-allowed" : "pointer",
            opacity: claiming ? 0.6 : 1,
            transition: "opacity 0.15s",
          }}
        >
          {claiming ? "Claiming..." : `Claim ${claimableAmount.toLocaleString()} W3K`}
        </button>
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          1 schedule
        </span>
      </div>
    </div>
  );
}
