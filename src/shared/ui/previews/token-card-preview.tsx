import { useEffect } from "react";
import { Coins, TrendingUp } from "lucide-react";
import { cryptoLogo, preloadCryptoLogos } from "../../lib/logos";
import { previewCard, previewHeader, monoFont } from "./_shared";

const TOKEN = {
  symbol: "ETH",
  name: "Ethereum",
  price: 3_355.18,
  change24h: 3.12,
  balance: "1.4201",
  value: 4_764.36,
};

function fmt(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function TokenCardPreview() {
  useEffect(() => {
    preloadCryptoLogos([TOKEN.symbol]);
  }, []);

  const pos = TOKEN.change24h >= 0;

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Coins size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            {TOKEN.symbol}
          </span>
        </div>
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
          <TrendingUp size={11} />+{TOKEN.change24h.toFixed(2)}%
        </span>
      </div>

      {/* Token detail */}
      <div style={{ padding: "20px 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img
            src={cryptoLogo(TOKEN.symbol)}
            alt={TOKEN.symbol}
            width={48}
            height={48}
            style={{ borderRadius: "50%", display: "block", flexShrink: 0 }}
            loading="lazy"
          />
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--w3-gray-500)",
                letterSpacing: "0.04em",
                textTransform: "uppercase" as const,
                marginBottom: 4,
              }}
            >
              Price
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "var(--w3-gray-900)",
                fontFamily: monoFont,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {fmt(TOKEN.price)}
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: pos ? "#22c55e" : "#ef4444",
                marginTop: 2,
                display: "inline-block",
              }}
            >
              {pos ? "+" : ""}
              {TOKEN.change24h.toFixed(2)}%{" "}
              <span style={{ color: "var(--w3-gray-500)", fontWeight: 400, fontSize: 12 }}>
                24h
              </span>
            </span>
          </div>
        </div>

        {/* Stat row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginTop: 20,
            padding: "16px 14px",
            borderRadius: 12,
            background: "var(--w3-accent-subtle)",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--w3-gray-500)",
                letterSpacing: "0.04em",
                textTransform: "uppercase" as const,
                marginBottom: 4,
              }}
            >
              Balance
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "var(--w3-gray-900)",
                fontFamily: monoFont,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {TOKEN.balance} {TOKEN.symbol}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--w3-gray-500)",
                letterSpacing: "0.04em",
                textTransform: "uppercase" as const,
                marginBottom: 4,
              }}
            >
              Value
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "var(--w3-gray-900)",
                fontFamily: monoFont,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {fmt(TOKEN.value)}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid var(--w3-border-subtle)",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>{TOKEN.name}</span>
      </div>
    </div>
  );
}
