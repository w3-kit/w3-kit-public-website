import { useEffect } from "react";
import { List } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";
import { cryptoLogo, preloadCryptoLogos } from "../../lib/logos";

const TOKENS = [
  { symbol: "ETH", name: "Ethereum", balance: "4.2100", price: 3_355.18 },
  { symbol: "USDC", name: "USD Coin", balance: "2,500.00", price: 1.0 },
  { symbol: "LINK", name: "Chainlink", balance: "85.0000", price: 14.82 },
  { symbol: "UNI", name: "Uniswap", balance: "120.0000", price: 7.43 },
];

function fmtCurrency(n: number) {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtBalance(b: string) {
  const n = parseFloat(b.replace(/,/g, ""));
  if (n >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return b;
}

export function TokenListPreview() {
  useEffect(() => {
    preloadCryptoLogos(TOKENS.map((t) => t.symbol));
  }, []);

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <List size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Tokens
          </span>
          <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>{TOKENS.length}</span>
        </div>
      </div>

      {/* Token rows */}
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
        {TOKENS.map((t) => {
          const raw = parseFloat(t.balance.replace(/,/g, ""));
          const value = raw * t.price;

          return (
            <div
              key={t.symbol}
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
              {/* Logo */}
              <img
                src={cryptoLogo(t.symbol)}
                alt={t.symbol}
                width={32}
                height={32}
                style={{ borderRadius: "50%", flexShrink: 0 }}
              />

              {/* Symbol + Name */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)", display: "block" }}>
                  {t.symbol}
                </span>
                <span style={{ fontSize: 13, color: "var(--w3-gray-600)", display: "block", marginTop: 1 }}>
                  {t.name}
                </span>
              </div>

              {/* Balance + Value */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <span
                  style={{
                    fontSize: 15,
                    fontFamily: monoFont,
                    color: "var(--w3-gray-600)",
                    fontVariantNumeric: "tabular-nums",
                    display: "block",
                  }}
                >
                  {fmtBalance(t.balance)}
                </span>
                <span style={{ fontSize: 13, color: "var(--w3-gray-600)", display: "block", marginTop: 1 }}>
                  {fmtCurrency(value)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          {TOKENS.length} tokens
        </span>
      </div>
    </div>
  );
}
