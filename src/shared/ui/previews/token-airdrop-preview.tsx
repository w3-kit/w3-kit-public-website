import { useState, useEffect } from "react";
import { Gift } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";
import { cryptoLogo, preloadCryptoLogos } from "../../lib/logos";

interface Airdrop {
  id: string;
  token: string;
  name: string;
  amount: string;
  status: "claimable" | "claimed";
}

const AIRDROPS: Airdrop[] = [
  { id: "1", token: "ARB", name: "Arbitrum", amount: "1,250", status: "claimable" },
  { id: "2", token: "OP", name: "Optimism", amount: "480", status: "claimed" },
];

export function TokenAirdropPreview() {
  useEffect(() => {
    preloadCryptoLogos(AIRDROPS.map((a) => a.token));
  }, []);

  const [airdrops, setAirdrops] = useState(AIRDROPS);
  const [claimingId, setClaimingId] = useState<string | null>(null);

  const handleClaim = (id: string) => {
    setClaimingId(id);
    setTimeout(() => {
      setAirdrops((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "claimed" as const } : a)),
      );
      setClaimingId(null);
    }, 1200);
  };

  const activeCount = airdrops.filter((a) => a.status === "claimable").length;

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Gift size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Airdrops
          </span>
        </div>
        <span style={{ fontSize: 13, fontWeight: 400, color: "var(--w3-gray-600)" }}>
          {activeCount} claimable
        </span>
      </div>

      {/* Airdrop entries */}
      <div>
        {airdrops.map((airdrop, i) => {
          const isClaimable = airdrop.status === "claimable";
          const isClaiming = claimingId === airdrop.id;

          return (
            <div
              key={airdrop.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 14px",
                borderTop: i > 0 ? "1px solid var(--w3-border-subtle)" : undefined,
              }}
            >
              {/* Token logo */}
              <img
                src={cryptoLogo(airdrop.token)}
                alt={airdrop.token}
                width={32}
                height={32}
                style={{ borderRadius: "50%", display: "block", flexShrink: 0 }}
                loading="lazy"
              />

              {/* Token info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "var(--w3-gray-900)",
                    display: "block",
                  }}
                >
                  {airdrop.name}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    fontFamily: monoFont,
                    color: "var(--w3-gray-600)",
                    display: "block",
                    marginTop: 1,
                  }}
                >
                  {airdrop.amount} {airdrop.token}
                </span>
              </div>

              {/* Status badge + claim button */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    padding: "2px 8px",
                    borderRadius: 6,
                    background: isClaimable ? "rgba(34,197,94,0.1)" : "var(--w3-glass-inner-bg)",
                    color: isClaimable ? "#22c55e" : "var(--w3-gray-500)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {isClaimable ? "Active" : "Claimed"}
                </span>

                {isClaimable && (
                  <button
                    onClick={() => handleClaim(airdrop.id)}
                    disabled={isClaiming}
                    style={{
                      padding: "5px 14px",
                      borderRadius: 8,
                      border: "none",
                      background: "var(--w3-accent)",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: isClaiming ? "not-allowed" : "pointer",
                      opacity: isClaiming ? 0.6 : 1,
                      transition: "opacity 0.15s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {isClaiming ? "Claiming..." : "Claim"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid var(--w3-border-subtle)",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>2 airdrops</span>
      </div>
    </div>
  );
}
