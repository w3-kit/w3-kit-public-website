import { useState, useCallback, useRef, useEffect } from "react";
import { Shield, Check, X, Plus, Copy, Loader2 } from "lucide-react";
import { truncateAddress } from "../../lib/format";
import { previewCard, previewHeader, monoFont } from "./_shared";

const SIGNERS = [
  { name: "Alice", address: "0x1234567890abcdef1234567890abcdef12345678" },
  { name: "Bob", address: "0xaBcDeF0123456789aBcDeF0123456789aBcDeF01" },
  { name: "Carol", address: "0x9876543210fedcba9876543210fedcba98765432" },
];

const WALLET = "0x7a2539C45F6a682beC5B167ECE16F1c4bA073fC8";

export function MultisigWalletPreview() {
  const [approvals, setApprovals] = useState(2);
  const [status, setStatus] = useState<"pending" | "executed" | "rejected">("pending");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"pending" | "executed" | "all">("pending");

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const safe = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  const handleApprove = () => {
    setLoading(true);
    safe(() => {
      const next = approvals + 1;
      setApprovals(next);
      if (next >= 3) setStatus("executed");
      setLoading(false);
    }, 800);
  };

  const handleReject = () => {
    setStatus("rejected");
    setApprovals(0);
  };
  const handleCopy = () => {
    setCopied(true);
    safe(() => setCopied(false), 2000);
  };
  const handleReset = () => {
    setApprovals(2);
    setStatus("pending");
  };

  const statusStyle: Record<string, { bg: string; color: string }> = {
    pending: { bg: "var(--w3-surface-elevated)", color: "var(--w3-gray-700)" },
    executed: { bg: "#dcfce7", color: "#15803d" },
    rejected: { bg: "#fef2f2", color: "#dc2626" },
  };
  const s = statusStyle[status];

  return (
    <div style={{ ...previewCard, maxWidth: 420, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Shield size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Multisig
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              padding: "2px 8px",
              borderRadius: 6,
              background: "var(--w3-surface-elevated)",
              color: "var(--w3-gray-600)",
            }}
          >
            3/3
          </span>
        </div>
        <button
          onClick={handleCopy}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 8px",
            borderRadius: 6,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontFamily: monoFont,
            fontSize: 11,
            color: "var(--w3-gray-500)",
          }}
        >
          {truncateAddress(WALLET)}
          {copied ? <Check size={12} style={{ color: "#22c55e" }} /> : <Copy size={12} />}
        </button>
      </div>

      {/* Signers */}
      <div
        style={{
          padding: "12px 20px",
          borderBottom: "1px solid var(--w3-border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: "var(--w3-gray-500)",
            letterSpacing: "0.04em",
            textTransform: "uppercase" as const,
          }}
        >
          Signers
        </span>
        <div style={{ display: "flex" }}>
          {SIGNERS.map((signer, i) => (
            <div
              key={signer.name}
              title={signer.name}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "var(--w3-surface-elevated)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 600,
                color: "var(--w3-gray-700)",
                border: "2px solid var(--w3-gray-100)",
                marginLeft: i > 0 ? -8 : 0,
                zIndex: SIGNERS.length - i,
                position: "relative",
              }}
            >
              {signer.name[0]}
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          padding: "8px 20px",
          borderBottom: "1px solid var(--w3-border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          {(["pending", "executed", "all"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "4px 10px",
                borderRadius: 6,
                border: "none",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                background: tab === t ? "var(--w3-accent)" : "transparent",
                color: tab === t ? "#fff" : "var(--w3-gray-600)",
                textTransform: "capitalize",
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <button
          style={{
            padding: 4,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: "var(--w3-gray-500)",
            display: "flex",
          }}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Transaction */}
      <div style={{ padding: "16px 20px" }}>
        {tab === "all" || tab === status ? (
          <div style={{ padding: 14, borderRadius: 12, background: "var(--w3-glass-inner-bg)" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 8,
              }}
            >
              <div>
                <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)" }}>
                  Transfer to Treasury
                </span>
                <div style={{ fontSize: 13, color: "var(--w3-gray-600)", marginTop: 2 }}>
                  1.5 ETH → {truncateAddress("0xdead000000000000000000000000000000beef")} · 2h ago
                </div>
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  padding: "2px 8px",
                  borderRadius: 5,
                  background: s.bg,
                  color: s.color,
                  textTransform: "capitalize",
                }}
              >
                {status}
              </span>
            </div>

            {/* Progress */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div
                style={{
                  flex: 1,
                  height: 6,
                  borderRadius: 3,
                  background: "var(--w3-border-subtle)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: 3,
                    background:
                      status === "executed"
                        ? "#22c55e"
                        : status === "rejected"
                          ? "#ef4444"
                          : "var(--w3-accent)",
                    width: `${Math.min((approvals / 3) * 100, 100)}%`,
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--w3-gray-600)",
                  fontFamily: monoFont,
                  flexShrink: 0,
                }}
              >
                {approvals}/3
              </span>
            </div>

            {/* Actions */}
            {status === "pending" && (
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={handleApprove}
                  disabled={loading}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    padding: 10,
                    borderRadius: 10,
                    border: "none",
                    background: "var(--w3-accent)",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: loading ? "wait" : "pointer",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? (
                    <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
                  ) : (
                    <Check size={14} />
                  )}
                  Approve
                </button>
                <button
                  onClick={handleReject}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    padding: 10,
                    borderRadius: 10,
                    border: "1px solid var(--w3-border-subtle)",
                    background: "transparent",
                    color: "var(--w3-gray-700)",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  <X size={14} />
                  Reject
                </button>
              </div>
            )}

            {status !== "pending" && (
              <button
                onClick={handleReset}
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 8,
                  border: "1px solid var(--w3-border-subtle)",
                  background: "transparent",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--w3-gray-500)",
                  cursor: "pointer",
                }}
              >
                Reset demo
              </button>
            )}
          </div>
        ) : (
          <div
            style={{ padding: 24, textAlign: "center", fontSize: 13, color: "var(--w3-gray-500)" }}
          >
            No {tab} transactions
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid var(--w3-border-subtle)",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          1 transaction · 3 of 3 required
        </span>
      </div>
    </div>
  );
}
