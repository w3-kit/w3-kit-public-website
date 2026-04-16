import { useState, useEffect } from "react";
import { Globe, ArrowRightLeft, ChevronDown, Loader2 } from "lucide-react";
import { cryptoLogo, preloadCryptoLogos } from "../../lib/logos";
import { previewCard, previewHeader, monoFont } from "./_shared";

const NETWORKS = [
  { id: 1, name: "Ethereum", ticker: "ETH" },
  { id: 137, name: "Polygon", ticker: "POL" },
  { id: 42161, name: "Arbitrum", ticker: "ARB" },
  { id: 10, name: "Optimism", ticker: "OP" },
];

const TOKENS = [
  { symbol: "ETH", name: "Ether", balance: "1.234" },
  { symbol: "USDC", name: "USD Coin", balance: "1,250.00" },
  { symbol: "USDT", name: "Tether", balance: "890.50" },
];

const sectionLabel: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: "var(--w3-gray-500)",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  marginBottom: 6,
};

const selectorStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid var(--w3-border-subtle)",
  background: "transparent",
  fontSize: 13,
  fontWeight: 500,
  color: "var(--w3-gray-900)",
  cursor: "pointer",
};

const menuStyle: React.CSSProperties = {
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  marginTop: 6,
  borderRadius: 10,
  border: "1px solid var(--w3-border-subtle)",
  background: "var(--w3-surface-elevated)",
  zIndex: 10,
  overflow: "hidden",
};

const menuItemBase: React.CSSProperties = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 12px",
  border: "none",
  fontSize: 13,
  fontWeight: 500,
  color: "var(--w3-gray-900)",
  textAlign: "left",
  cursor: "pointer",
  transition: "background 0.15s",
};

export function BridgePreview() {
  useEffect(() => {
    preloadCryptoLogos([...NETWORKS.map((n) => n.ticker), ...TOKENS.map((t) => t.symbol)]);
  }, []);

  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(1);
  const [tokenIdx, setTokenIdx] = useState(0);
  const [amount, setAmount] = useState("0.5");
  const [open, setOpen] = useState<"from" | "to" | "token" | null>(null);
  const [bridging, setBridging] = useState(false);

  const toggle = (key: "from" | "to" | "token") => setOpen(open === key ? null : key);

  const switchNetworks = () => {
    const tmp = fromIdx;
    setFromIdx(toIdx);
    setToIdx(tmp);
  };

  const handleBridge = () => {
    setBridging(true);
    setTimeout(() => setBridging(false), 2000);
  };

  const renderNetworkSelector = (dir: "from" | "to") => {
    const idx = dir === "from" ? fromIdx : toIdx;
    const net = NETWORKS[idx];
    return (
      <div>
        <div style={sectionLabel}>{dir === "from" ? "From" : "To"}</div>
        <div style={{ position: "relative" }}>
          <button onClick={() => toggle(dir)} style={selectorStyle}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img
                src={cryptoLogo(net.ticker)}
                alt={net.name}
                width={20}
                height={20}
                style={{ borderRadius: "50%", display: "block", flexShrink: 0 }}
                loading="lazy"
              />
              <span>{net.name}</span>
            </span>
            <ChevronDown
              size={14}
              style={{
                color: "var(--w3-gray-400)",
                flexShrink: 0,
                transition: "transform 0.15s",
                transform: open === dir ? "rotate(180deg)" : "none",
              }}
            />
          </button>
          {open === dir && (
            <div style={menuStyle}>
              {NETWORKS.map((n, i) => (
                <button
                  key={n.id}
                  onClick={() => {
                    if (dir === "from") {
                      if (i === toIdx) setToIdx(fromIdx);
                      setFromIdx(i);
                    } else {
                      if (i === fromIdx) setFromIdx(toIdx);
                      setToIdx(i);
                    }
                    setOpen(null);
                  }}
                  style={{
                    ...menuItemBase,
                    background:
                      i === idx ? "var(--w3-accent-subtle)" : "transparent",
                  }}
                >
                  <img
                    src={cryptoLogo(n.ticker)}
                    alt={n.name}
                    width={20}
                    height={20}
                    style={{ borderRadius: "50%", display: "block" }}
                    loading="lazy"
                  />
                  {n.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader, justifyContent: "flex-start", gap: 10 }}>
        <Globe size={18} style={{ color: "var(--w3-accent)" }} />
        <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
          Bridge
        </span>
      </div>

      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* From / To with swap */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "end" }}>
          {renderNetworkSelector("from")}

          <button
            onClick={switchNetworks}
            aria-label="Swap networks"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: "1px solid var(--w3-border-subtle)",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--w3-gray-500)",
              cursor: "pointer",
              marginBottom: 1,
            }}
          >
            <ArrowRightLeft size={14} />
          </button>

          {renderNetworkSelector("to")}
        </div>

        {/* Token selector */}
        <div>
          <div style={sectionLabel}>Token</div>
          <div style={{ position: "relative" }}>
            <button onClick={() => toggle("token")} style={selectorStyle}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <img
                  src={cryptoLogo(TOKENS[tokenIdx].symbol)}
                  alt={TOKENS[tokenIdx].symbol}
                  width={22}
                  height={22}
                  style={{ borderRadius: "50%", display: "block", flexShrink: 0 }}
                  loading="lazy"
                />
                <span>{TOKENS[tokenIdx].symbol}</span>
                <span style={{ fontSize: 12, color: "var(--w3-gray-500)" }}>
                  Bal: {TOKENS[tokenIdx].balance}
                </span>
              </span>
              <ChevronDown
                size={14}
                style={{
                  color: "var(--w3-gray-400)",
                  flexShrink: 0,
                  transition: "transform 0.15s",
                  transform: open === "token" ? "rotate(180deg)" : "none",
                }}
              />
            </button>
            {open === "token" && (
              <div style={menuStyle}>
                {TOKENS.map((t, i) => (
                  <button
                    key={t.symbol}
                    onClick={() => {
                      setTokenIdx(i);
                      setOpen(null);
                    }}
                    style={{
                      ...menuItemBase,
                      background:
                        i === tokenIdx ? "var(--w3-accent-subtle)" : "transparent",
                    }}
                  >
                    <img
                      src={cryptoLogo(t.symbol)}
                      alt={t.symbol}
                      width={22}
                      height={22}
                      style={{ borderRadius: "50%", display: "block" }}
                      loading="lazy"
                    />
                    <span style={{ flex: 1 }}>
                      {t.symbol}{" "}
                      <span style={{ fontSize: 12, color: "var(--w3-gray-500)" }}>{t.name}</span>
                    </span>
                    <span style={{ fontSize: 12, color: "var(--w3-gray-500)" }}>{t.balance}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Amount */}
        <div>
          <div style={sectionLabel}>Amount</div>
          <input
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid var(--w3-border-subtle)",
              background: "transparent",
              outline: "none",
              fontSize: 18,
              fontWeight: 500,
              color: "var(--w3-gray-900)",
              fontVariantNumeric: "tabular-nums",
              fontFamily: monoFont,
            }}
          />
        </div>

        {/* Bridge button */}
        <button
          onClick={handleBridge}
          disabled={bridging}
          style={{
            width: "100%",
            padding: "11px 0",
            borderRadius: 10,
            border: "none",
            background: bridging ? "var(--w3-gray-400)" : "var(--w3-accent)",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            cursor: bridging ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "background 0.2s",
          }}
        >
          {bridging ? (
            <>
              <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
              Bridging...
            </>
          ) : (
            "Bridge"
          )}
        </button>
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          {NETWORKS.length} networks supported
        </span>
      </div>
    </div>
  );
}
