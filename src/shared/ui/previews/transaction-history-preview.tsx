import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight, FileCode, History } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";
import { truncateAddress } from "../../lib/format";

type TxStatus = "success" | "pending";
type TxType = "send" | "receive" | "swap" | "contract";

interface MockTx {
  type: TxType;
  description: string;
  hash: string;
  amount: string;
  status: TxStatus;
}

const MOCK_TXS: MockTx[] = [
  { type: "send", description: "Sent ETH", hash: "0x8a3f21b7c9e04d6f2a1b8c5d3e7f9a0b4c6d8e4b2", amount: "-0.25 ETH", status: "success" },
  { type: "receive", description: "Received USDC", hash: "0xb1c7d4e8f2a6b9c3d5e7f0a1b4c6d8e2f4a6b9f03", amount: "+1,200 USDC", status: "success" },
  { type: "swap", description: "Swap ETH → USDC", hash: "0xf29d6c8a3b5e7d1f4a9c2b6e8d0f3a5c7b9d7a11", amount: "0.5 ETH", status: "pending" },
  { type: "contract", description: "Contract Call", hash: "0x3e0a7b2c9d4f6a8e1c3b5d7f9a0c2e4b6d8f0c8d5", amount: "0.01 ETH", status: "success" },
];

const typeConfig: Record<TxType, { icon: typeof ArrowUpRight; color: string; bg: string }> = {
  send: { icon: ArrowUpRight, color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  receive: { icon: ArrowDownLeft, color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  swap: { icon: ArrowLeftRight, color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  contract: { icon: FileCode, color: "var(--w3-gray-500)", bg: "var(--w3-accent-subtle)" },
};

const statusConfig: Record<TxStatus, { label: string; color: string; bg: string }> = {
  success: { label: "Success", color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  pending: { label: "Pending", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
};

export function TransactionHistoryPreview() {
  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <History size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Transactions
          </span>
        </div>
      </div>

      {/* Transaction rows */}
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
        {MOCK_TXS.map((tx) => {
          const { icon: Icon, color, bg } = typeConfig[tx.type];
          const status = statusConfig[tx.status];

          return (
            <div
              key={tx.hash}
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
              {/* Type icon */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={16} style={{ color }} />
              </div>

              {/* Description + Hash */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)", display: "block" }}>
                  {tx.description}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontFamily: monoFont,
                    color: "var(--w3-gray-600)",
                    display: "block",
                    marginTop: 1,
                  }}
                >
                  {truncateAddress(tx.hash)}
                </span>
              </div>

              {/* Amount + Status */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)", display: "block" }}>
                  {tx.amount}
                </span>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: 3,
                    fontSize: 11,
                    fontWeight: 500,
                    padding: "2px 8px",
                    borderRadius: 6,
                    background: status.bg,
                    color: status.color,
                  }}
                >
                  {status.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          {MOCK_TXS.length} transactions
        </span>
      </div>
    </div>
  );
}
