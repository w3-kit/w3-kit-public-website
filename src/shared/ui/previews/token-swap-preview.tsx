import { useState, useEffect } from "react";
import { ArrowDownUp, ArrowLeftRight, ChevronDown } from "lucide-react";
import { cryptoLogo, preloadCryptoLogos } from "../../lib/logos";
import { previewCard, previewHeader, monoFont } from "./_shared";

const TOKENS = [
  { symbol: "ETH", name: "Ethereum", balance: "1.42" },
  { symbol: "USDC", name: "USD Coin", balance: "2,500" },
  { symbol: "DAI", name: "Dai", balance: "850" },
  { symbol: "ARB", name: "Arbitrum", balance: "340" },
];

const RATE = 1917.5;

export function TokenSwapPreview() {
  useEffect(() => {
    preloadCryptoLogos(TOKENS.map((t) => t.symbol));
  }, []);

  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(1);
  const [amount, setAmount] = useState("0.5");
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  const from = TOKENS[fromIdx];
  const to = TOKENS[toIdx];
  const toAmount = amount && parseFloat(amount) > 0 ? (parseFloat(amount) * RATE).toFixed(2) : "";

  const flip = () => {
    setFromIdx(toIdx);
    setToIdx(fromIdx);
    setFromOpen(false);
    setToOpen(false);
  };

  const selectFrom = (i: number) => {
    if (i === toIdx) setToIdx(fromIdx);
    setFromIdx(i);
    setFromOpen(false);
  };

  const selectTo = (i: number) => {
    if (i === fromIdx) setFromIdx(toIdx);
    setToIdx(i);
    setToOpen(false);
  };

  const tokenPill = (token: (typeof TOKENS)[number], open: boolean, onToggle: () => void) => (
    <button
      onClick={onToggle}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 10,
        border: "1px solid var(--w3-border-subtle)",
        background: "var(--w3-surface-elevated)",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <img
        src={cryptoLogo(token.symbol)}
        alt=""
        width={20}
        height={20}
        style={{ borderRadius: "50%" }}
      />
      <span style={{ fontSize: 14, fontWeight: 600, color: "var(--w3-gray-900)" }}>
        {token.symbol}
      </span>
      <ChevronDown
        size={12}
        style={{
          color: "var(--w3-gray-500)",
          transition: "transform 0.2s",
          transform: open ? "rotate(180deg)" : "none",
        }}
      />
    </button>
  );

  const tokenDropdown = (selected: number, onSelect: (i: number) => void, exclude: number) => (
    <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 2 }}>
      {TOKENS.map(
        (t, i) =>
          i !== exclude && (
            <button
              key={t.symbol}
              onClick={() => onSelect(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 10px",
                borderRadius: 8,
                border: "none",
                background: i === selected ? "var(--w3-accent-subtle)" : "transparent",
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
              }}
            >
              <img
                src={cryptoLogo(t.symbol)}
                alt=""
                width={24}
                height={24}
                style={{ borderRadius: "50%" }}
              />
              <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "var(--w3-gray-900)" }}>
                {t.name}
              </span>
              <span style={{ fontSize: 12, color: "var(--w3-gray-500)" }}>{t.symbol}</span>
            </button>
          ),
      )}
    </div>
  );

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ArrowLeftRight size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>Swap</span>
        </div>
        <span style={{ fontSize: 12, color: "var(--w3-gray-500)" }}>
          1 {from.symbol} ≈ {RATE.toLocaleString()} {to.symbol}
        </span>
      </div>

      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        {/* From */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--w3-gray-500)",
                letterSpacing: "0.04em",
                textTransform: "uppercase" as const,
              }}
            >
              From
            </span>
            <span style={{ fontSize: 12, color: "var(--w3-gray-500)" }}>
              Balance: {from.balance}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid var(--w3-border-subtle)",
            }}
          >
            <input
              type="text"
              value={amount}
              onChange={(e) => /^\d*\.?\d*$/.test(e.target.value) && setAmount(e.target.value)}
              placeholder="0.0"
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                fontSize: 20,
                fontWeight: 600,
                color: "var(--w3-gray-900)",
                fontFamily: monoFont,
                outline: "none",
                width: 0,
              }}
            />
            {tokenPill(from, fromOpen, () => {
              setFromOpen(!fromOpen);
              setToOpen(false);
            })}
          </div>
          {fromOpen && tokenDropdown(fromIdx, selectFrom, toIdx)}
        </div>

        {/* Flip */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={flip}
            style={{
              width: 32,
              height: 32,
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
            <ArrowDownUp size={14} />
          </button>
        </div>

        {/* To */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--w3-gray-500)",
                letterSpacing: "0.04em",
                textTransform: "uppercase" as const,
              }}
            >
              To
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid var(--w3-border-subtle)",
            }}
          >
            <span
              style={{
                flex: 1,
                fontSize: 20,
                fontWeight: 600,
                color: toAmount ? "var(--w3-gray-900)" : "var(--w3-gray-400)",
                fontFamily: monoFont,
              }}
            >
              {toAmount || "0.0"}
            </span>
            {tokenPill(to, toOpen, () => {
              setToOpen(!toOpen);
              setFromOpen(false);
            })}
          </div>
          {toOpen && tokenDropdown(toIdx, selectTo, fromIdx)}
        </div>

        {/* Swap button */}
        <button
          disabled={!amount || parseFloat(amount) <= 0}
          style={{
            marginTop: 8,
            width: "100%",
            padding: 12,
            borderRadius: 12,
            border: "none",
            background:
              amount && parseFloat(amount) > 0 ? "var(--w3-accent)" : "var(--w3-gray-300)",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            cursor: amount && parseFloat(amount) > 0 ? "pointer" : "not-allowed",
            opacity: amount && parseFloat(amount) > 0 ? 1 : 0.5,
          }}
        >
          {!amount || parseFloat(amount) <= 0 ? "Enter amount" : "Swap"}
        </button>
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
          {TOKENS.length} tokens available
        </span>
      </div>
    </div>
  );
}
