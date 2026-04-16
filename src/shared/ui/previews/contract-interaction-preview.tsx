import { useState, useCallback, useRef, useEffect } from "react";
import { Code, Eye, Edit3, Play, Loader2, Check, ChevronDown } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";
import { truncateAddress } from "../../lib/format";

type Tab = "read" | "write";

interface Fn {
  name: string;
  type: Tab;
  inputs: { name: string; type: string; placeholder: string }[];
  mockResult?: string;
}

const CONTRACT = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

const FUNCTIONS: Fn[] = [
  { name: "balanceOf", type: "read", inputs: [{ name: "account", type: "address", placeholder: "0xd8dA...6045" }], mockResult: "1,420,000.00" },
  { name: "totalSupply", type: "read", inputs: [], mockResult: "26,183,421,907.54" },
  { name: "decimals", type: "read", inputs: [], mockResult: "6" },
  { name: "transfer", type: "write", inputs: [{ name: "to", type: "address", placeholder: "0x1a2B...9fC4" }, { name: "amount", type: "uint256", placeholder: "1000000" }], mockResult: "0x7f3a...b2c1" },
  { name: "approve", type: "write", inputs: [{ name: "spender", type: "address", placeholder: "0xDef1...C0de" }, { name: "amount", type: "uint256", placeholder: "115792...9999" }], mockResult: "0x8e4b...a3d2" },
];

export function ContractInteractionPreview() {
  const [tab, setTab] = useState<Tab>("read");
  const [expanded, setExpanded] = useState<string | null>("balanceOf");
  const [inputValues, setInputValues] = useState<Record<string, string[]>>({});
  const [executing, setExecuting] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, string>>({});

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const safe = useCallback((fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); }, []);

  const fns = FUNCTIONS.filter((f) => f.type === tab);

  const handleExecute = (fn: Fn) => {
    setExecuting(fn.name);
    safe(() => {
      setResults((prev) => ({ ...prev, [fn.name]: fn.mockResult ?? "Success" }));
      setExecuting(null);
    }, 1000);
  };

  const updateInput = (fnName: string, idx: number, value: string) => {
    setInputValues((prev) => {
      const arr = [...(prev[fnName] || [])];
      arr[idx] = value;
      return { ...prev, [fnName]: arr };
    });
  };

  return (
    <div style={{ ...previewCard, maxWidth: 420, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Code size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>Contract</span>
        </div>
        <span style={{ fontSize: 12, fontFamily: monoFont, color: "var(--w3-gray-600)", padding: "3px 8px", borderRadius: 6, background: "var(--w3-surface-elevated)" }}>
          {truncateAddress(CONTRACT)}
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--w3-border-subtle)" }}>
        {(["read", "write"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setExpanded(null); }}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "10px 20px", fontSize: 13, fontWeight: 500,
              background: "transparent", border: "none",
              borderBottom: tab === t ? "2px solid var(--w3-accent)" : "2px solid transparent",
              color: tab === t ? "var(--w3-gray-900)" : "var(--w3-gray-500)",
              cursor: "pointer",
            }}
          >
            {t === "read" ? <Eye size={14} /> : <Edit3 size={14} />}
            {t === "read" ? "Read" : "Write"}
            <span style={{ fontSize: 11, color: "var(--w3-gray-400)", marginLeft: 2 }}>
              {FUNCTIONS.filter((f) => f.type === t).length}
            </span>
          </button>
        ))}
      </div>

      {/* Functions */}
      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
        {fns.map((fn) => {
          const isExpanded = expanded === fn.name;
          const isExecuting = executing === fn.name;
          const result = results[fn.name];

          return (
            <div key={fn.name} style={{ borderRadius: 12, overflow: "hidden", background: isExpanded ? "var(--w3-glass-inner-bg)" : "transparent", transition: "background 0.15s" }}>
              <button
                onClick={() => setExpanded(isExpanded ? null : fn.name)}
                style={{ display: "flex", alignItems: "center", width: "100%", padding: "10px 14px", border: "none", background: "transparent", cursor: "pointer", textAlign: "left", gap: 10 }}
              >
                <span style={{ fontSize: 14, fontWeight: 500, fontFamily: monoFont, color: "var(--w3-accent)", flex: 1 }}>
                  {fn.name}
                </span>
                <span style={{ fontSize: 11, color: "var(--w3-gray-400)" }}>
                  {fn.inputs.length > 0 ? `${fn.inputs.length} param${fn.inputs.length > 1 ? "s" : ""}` : "no params"}
                </span>
                <ChevronDown size={14} style={{ color: "var(--w3-gray-400)", transition: "transform 0.2s", transform: isExpanded ? "rotate(180deg)" : "none" }} />
              </button>

              {isExpanded && (
                <div style={{ padding: "0 14px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
                  {fn.inputs.map((input, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: 11, fontWeight: 500, color: "var(--w3-gray-500)", marginBottom: 4, display: "flex", gap: 4 }}>
                        <span>{input.name}</span>
                        <span style={{ color: "var(--w3-gray-400)" }}>({input.type})</span>
                      </div>
                      <input
                        value={inputValues[fn.name]?.[idx] ?? ""}
                        onChange={(e) => updateInput(fn.name, idx, e.target.value)}
                        placeholder={input.placeholder}
                        style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid var(--w3-border-subtle)", background: "transparent", fontSize: 12, fontFamily: monoFont, color: "var(--w3-gray-900)", outline: "none" }}
                      />
                    </div>
                  ))}

                  <button
                    onClick={() => handleExecute(fn)}
                    disabled={isExecuting}
                    style={{
                      width: "100%", padding: "9px", borderRadius: 8, border: "none",
                      background: tab === "read" ? "var(--w3-accent)" : "var(--w3-gray-900)",
                      color: "#fff", fontSize: 13, fontWeight: 600, cursor: isExecuting ? "wait" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                      opacity: isExecuting ? 0.7 : 1,
                    }}
                  >
                    {isExecuting ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Play size={13} />}
                    {tab === "read" ? "Query" : "Execute"}
                  </button>

                  {result && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 10px", borderRadius: 8, background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)" }}>
                      <Check size={12} style={{ color: "#22c55e", flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontFamily: monoFont, color: "var(--w3-gray-700)", wordBreak: "break-all" }}>
                        {tab === "read" ? `→ ${result}` : `Tx: ${result}`}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>USDC · ERC-20</span>
        <span style={{ fontSize: 12, color: "var(--w3-gray-400)" }}>{FUNCTIONS.length} functions</span>
      </div>
    </div>
  );
}
