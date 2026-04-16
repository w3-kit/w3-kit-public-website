import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";
import { truncateAddress } from "../../lib/format";

type CheckStatus = "safe" | "warning";

interface SecurityCheck {
  name: string;
  status: CheckStatus;
}

const CONTRACT_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const SCORE = 88;

const checks: SecurityCheck[] = [
  { name: "Ownership Renounced", status: "safe" },
  { name: "No Proxy Contract", status: "safe" },
  { name: "Liquidity Locked", status: "safe" },
  { name: "Mint Function", status: "warning" },
  { name: "Verified Source", status: "safe" },
];

const statusConfig: Record<CheckStatus, { label: string; color: string; bg: string; icon: typeof ShieldCheck }> = {
  safe: { label: "Safe", color: "#22c55e", bg: "rgba(34,197,94,0.1)", icon: ShieldCheck },
  warning: { label: "Warning", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: ShieldAlert },
};

export function SmartContractScannerPreview() {
  const safeCount = checks.filter((c) => c.status === "safe").length;

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Shield size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Scanner
          </span>
        </div>
        <span
          style={{
            fontSize: 12,
            fontFamily: monoFont,
            color: "var(--w3-gray-600)",
            padding: "3px 8px",
            borderRadius: 6,
            background: "var(--w3-accent-subtle)",
          }}
        >
          {truncateAddress(CONTRACT_ADDRESS)}
        </span>
      </div>

      {/* Score circle */}
      <div style={{ padding: "20px 20px 8px", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            border: "4px solid #22c55e",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 700, color: "var(--w3-gray-900)", lineHeight: 1 }}>
            {SCORE}
          </span>
          <span style={{ fontSize: 11, color: "var(--w3-gray-500)", marginTop: 2 }}>/100</span>
        </div>
      </div>

      {/* Check rows */}
      <div style={{ padding: "12px 20px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
        {checks.map((c) => {
          const { icon: Icon, color, bg, label } = statusConfig[c.status];

          return (
            <div
              key={c.name}
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
              {/* Status icon */}
              <Icon size={18} style={{ color, flexShrink: 0 }} />

              {/* Check name */}
              <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)" }}>
                {c.name}
              </span>

              {/* Status badge */}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  padding: "2px 8px",
                  borderRadius: 6,
                  background: bg,
                  color,
                  textTransform: "capitalize",
                  flexShrink: 0,
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          {safeCount} checks passed
        </span>
      </div>
    </div>
  );
}
