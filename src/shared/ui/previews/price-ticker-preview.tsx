import { useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cryptoLogo, preloadCryptoLogos } from "../../lib/logos";
import { previewCard, previewHeader, monoFont } from "./_shared";

interface Ticker {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
}

const TICKERS: Ticker[] = [
  { symbol: "BTC", name: "Bitcoin", price: 67_498.42, change24h: 1.87, marketCap: 1_327_000_000_000 },
  { symbol: "ETH", name: "Ethereum", price: 3_355.18, change24h: 3.12, marketCap: 403_200_000_000 },
  { symbol: "SOL", name: "Solana", price: 148.32, change24h: -2.45, marketCap: 64_800_000_000 },
  { symbol: "AVAX", name: "Avalanche", price: 35.67, change24h: -0.82, marketCap: 13_100_000_000 },
];

function fmtPrice(n: number) {
  if (n >= 1000) return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `$${n.toFixed(2)}`;
}

function fmtCap(n: number) {
  if (n >= 1_000_000_000_000) return `$${(n / 1_000_000_000_000).toFixed(2)}T`;
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  return `$${(n / 1_000_000).toFixed(1)}M`;
}

export function PriceTickerPreview() {
  useEffect(() => { preloadCryptoLogos(TICKERS.map((t) => t.symbol)); }, []);

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <TrendingUp size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Market
          </span>
        </div>
      </div>

      {/* Token list */}
      <div style={{ padding: "8px 20px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
        {TICKERS.map((t) => {
          const pos = t.change24h >= 0;
          return (
            <div
              key={t.symbol}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 14px",
                borderRadius: 12,
                background: "transparent",
                transition: "background 0.15s",
                cursor: "default",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "var(--w3-accent-subtle)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
            >
              <img
                src={cryptoLogo(t.symbol)}
                alt={t.symbol}
                width={32}
                height={32}
                style={{ borderRadius: "50%", display: "block", flexShrink: 0 }}
                loading="lazy"
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)", display: "block" }}>
                  {t.name}
                </span>
                <span style={{ fontSize: 13, color: "var(--w3-gray-600)", display: "block", marginTop: 1 }}>
                  {t.symbol} &middot; {fmtCap(t.marketCap)}
                </span>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)", fontFamily: monoFont, fontVariantNumeric: "tabular-nums" }}>
                  {fmtPrice(t.price)}
                </div>
                <div style={{ marginTop: 3, display: "flex", justifyContent: "flex-end" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 3,
                      borderRadius: 9999,
                      padding: "2px 7px",
                      fontSize: 12,
                      fontWeight: 500,
                      fontVariantNumeric: "tabular-nums",
                      background: pos ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
                      color: pos ? "#22c55e" : "#ef4444",
                    }}
                  >
                    {pos ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                    {Math.abs(t.change24h).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          {TICKERS.length} tokens
        </span>
      </div>
    </div>
  );
}
