import { useState } from "react";
import { Shield, ShieldCheck, ShieldAlert, Search } from "lucide-react";

const checks = [
  { name: "Ownership Renounced", status: "safe" as const },
  { name: "No Proxy Contract", status: "safe" as const },
  { name: "Liquidity Locked", status: "safe" as const },
  { name: "Mint Function", status: "warning" as const },
  { name: "Verified Source", status: "safe" as const },
];

const statusColors = { safe: "#22c55e", warning: "#f59e0b", danger: "#ef4444" };
const statusIcons = {
  safe: <ShieldCheck size={12} />,
  warning: <ShieldAlert size={12} />,
  danger: <Shield size={12} />,
};

export function SmartContractScannerPreview() {
  const [scanned, setScanned] = useState(true);

  const score = 88;

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
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Shield size={14} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Contract Scanner
          </span>
        </div>
        <span
          style={{
            fontSize: 10,
            color: "var(--w3-gray-400)",
            fontFamily: '"Geist Mono", ui-monospace, monospace',
          }}
        >
          0xA0b8...eB48
        </span>
      </div>

      <div style={{ padding: "12px 14px" }}>
        {scanned ? (
          <>
            {/* Score */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
                padding: "10px 12px",
                borderRadius: 8,
                background: "var(--w3-glass-inner-bg)",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "3px solid #22c55e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--w3-gray-900)",
                }}
              >
                {score}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--w3-gray-900)" }}>
                  Low Risk
                </div>
                <div style={{ fontSize: 10, color: "var(--w3-gray-500)" }}>
                  {checks.filter((c) => c.status === "safe").length}/{checks.length} checks passed
                </div>
              </div>
            </div>

            {/* Checks */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {checks.map((c) => (
                <div
                  key={c.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 8px",
                    borderRadius: 6,
                    fontSize: 11,
                  }}
                >
                  <span style={{ color: statusColors[c.status], flexShrink: 0 }}>
                    {statusIcons[c.status]}
                  </span>
                  <span style={{ flex: 1, color: "var(--w3-gray-700)" }}>{c.name}</span>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 500,
                      padding: "2px 6px",
                      borderRadius: 4,
                      background: statusColors[c.status] + "18",
                      color: statusColors[c.status],
                      textTransform: "uppercase",
                    }}
                  >
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <button
            onClick={() => setScanned(true)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "10px",
              borderRadius: 8,
              border: "none",
              background: "var(--w3-accent)",
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <Search size={14} />
            Scan Contract
          </button>
        )}
      </div>
    </div>
  );
}
