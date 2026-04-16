import { useState } from "react";
import { Code, Eye, Edit3, Play, ChevronRight } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";
import { truncateAddress } from "../../lib/format";

type Tab = "read" | "write";

interface MockFn {
  name: string;
  inputs: string[];
}

const CONTRACT_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

const READ_FNS: MockFn[] = [
  { name: "balanceOf", inputs: ["address"] },
  { name: "totalSupply", inputs: [] },
];

const WRITE_FNS: MockFn[] = [
  { name: "transfer", inputs: ["recipient (address)", "amount (uint256)"] },
  { name: "approve", inputs: ["spender (address)", "amount (uint256)"] },
];

export function ContractInteractionPreview() {
  const [tab, setTab] = useState<Tab>("read");
  const [expandedFn, setExpandedFn] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const fns = tab === "read" ? READ_FNS : WRITE_FNS;

  const handleExecute = (name: string) => {
    if (tab === "read") {
      setResult(name === "balanceOf" ? "1,420,000.00 USDC" : "10,000,000,000 USDC");
    } else {
      setResult("Tx: 0x7f3a...b2c1 (confirmed)");
    }
  };

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Code size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Contract
          </span>
        </div>
        <span style={{ fontSize: 13, fontFamily: monoFont, color: "var(--w3-gray-600)" }}>
          {truncateAddress(CONTRACT_ADDRESS)}
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--w3-border-subtle)" }}>
        {(["read", "write"] as const).map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              setExpandedFn(null);
              setResult(null);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 16px",
              fontSize: 13,
              fontWeight: 500,
              background: "transparent",
              border: "none",
              borderBottom: tab === t ? "2px solid var(--w3-gray-900)" : "2px solid transparent",
              color: tab === t ? "var(--w3-gray-900)" : "var(--w3-gray-500)",
              cursor: "pointer",
              transition: "color 0.15s, border-color 0.15s",
            }}
          >
            {t === "read" ? <Eye size={14} /> : <Edit3 size={14} />}
            {t === "read" ? "Read" : "Write"}
          </button>
        ))}
      </div>

      {/* Function list */}
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
        {fns.map((fn) => {
          const isExpanded = expandedFn === fn.name;
          return (
            <div key={fn.name}>
              <button
                onClick={() => setExpandedFn(isExpanded ? null : fn.name)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "none",
                  background: isExpanded ? "var(--w3-accent-subtle)" : "transparent",
                  cursor: "pointer",
                  transition: "background 0.15s",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 500, fontFamily: monoFont, color: "var(--w3-gray-900)" }}>
                  {fn.name}
                </span>
                <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
                  {fn.inputs.length} {fn.inputs.length === 1 ? "input" : "inputs"}
                </span>
              </button>

              {isExpanded && (
                <div style={{ padding: "8px 14px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
                  {fn.inputs.map((placeholder, idx) => (
                    <input
                      key={idx}
                      placeholder={placeholder}
                      readOnly
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: 10,
                        border: "1px solid var(--w3-border-subtle)",
                        background: "transparent",
                        fontSize: 13,
                        fontFamily: monoFont,
                        color: "var(--w3-gray-600)",
                        outline: "none",
                      }}
                    />
                  ))}
                  <button
                    onClick={() => handleExecute(fn.name)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: "none",
                      background: "var(--w3-gray-900)",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    <Play size={13} />
                    Execute
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Result area */}
      {result && (
        <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)" }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>
            Result
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ChevronRight size={14} style={{ color: "#22c55e" }} />
            <span style={{ fontSize: 13, fontFamily: monoFont, color: "var(--w3-gray-600)" }}>
              {result}
            </span>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          4 functions
        </span>
      </div>
    </div>
  );
}
