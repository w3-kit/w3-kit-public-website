import { useState, useEffect } from "react";
import { Coins, Lock, ChevronDown } from "lucide-react";
import { cryptoLogo, preloadCryptoLogos } from "../../lib/logos";
import { previewCard, previewHeader, monoFont } from "./_shared";

const pools = [
  { id: "eth", name: "ETH Staking", token: "ETH", apr: 4.8, lockPeriod: 30, totalStaked: "12,450", userStaked: "2.5", minStake: "0.01" },
  { id: "matic", name: "MATIC Staking", token: "POL", apr: 6.2, lockPeriod: 14, totalStaked: "890,000", userStaked: "500", minStake: "10" },
  { id: "arb", name: "ARB Staking", token: "ARB", apr: 8.1, lockPeriod: 7, totalStaked: "2,100,000", minStake: "50" },
];

export function StakingInterfacePreview() {
  useEffect(() => { preloadCryptoLogos(pools.map((p) => p.token)); }, []);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isStaking, setIsStaking] = useState(true);
  const [amount, setAmount] = useState("");

  const toggle = (id: string) => {
    const next = expandedId === id ? null : id;
    setExpandedId(next);
    setIsStaking(true);
    setAmount("");
  };

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Coins size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Staking Pools
          </span>
        </div>
        <span style={{ fontSize: 12, color: "var(--w3-gray-500)" }}>
          {pools.length} pools
        </span>
      </div>

      {/* Pool list */}
      <div>
        {pools.map((pool, i) => {
          const expanded = expandedId === pool.id;
          return (
            <div
              key={pool.id}
              style={{ borderTop: i > 0 ? "1px solid var(--w3-border-subtle)" : undefined }}
            >
              {/* Pool row */}
              <button
                onClick={() => toggle(pool.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "100%",
                  padding: "12px 16px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <img
                  src={cryptoLogo(pool.token)}
                  alt={pool.token}
                  width={32}
                  height={32}
                  style={{ borderRadius: "50%", display: "block", flexShrink: 0 }}
                  loading="lazy"
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)", display: "block" }}>
                    {pool.name}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#22c55e" }}>
                      {pool.apr}% APR
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 13, color: "var(--w3-gray-500)" }}>
                      <Lock size={11} />
                      {pool.lockPeriod}d
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <span style={{ fontSize: 13, color: "var(--w3-gray-500)", display: "block", fontFamily: monoFont }}>
                    {pool.totalStaked} {pool.token}
                  </span>
                  {pool.userStaked && (
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--w3-gray-900)", display: "block", marginTop: 1, fontFamily: monoFont }}>
                      {pool.userStaked} staked
                    </span>
                  )}
                </div>

                <ChevronDown
                  size={14}
                  style={{
                    color: "var(--w3-gray-400)",
                    flexShrink: 0,
                    transition: "transform 0.2s",
                    transform: expanded ? "rotate(180deg)" : "none",
                  }}
                />
              </button>

              {/* Expanded panel */}
              {expanded && (
                <div style={{ padding: "0 16px 14px", borderTop: "1px solid var(--w3-border-subtle)" }}>
                  {/* Stake / Unstake toggle */}
                  <div
                    style={{
                      display: "flex",
                      gap: 2,
                      padding: 3,
                      background: "var(--w3-glass-inner-bg)",
                      borderRadius: 8,
                      marginTop: 12,
                    }}
                  >
                    {(["Stake", "Unstake"] as const).map((label) => {
                      const active =
                        (label === "Stake" && isStaking) ||
                        (label === "Unstake" && !isStaking);
                      return (
                        <button
                          key={label}
                          onClick={() => setIsStaking(label === "Stake")}
                          style={{
                            flex: 1,
                            padding: "6px 0",
                            borderRadius: 6,
                            border: "none",
                            fontSize: 13,
                            fontWeight: 500,
                            cursor: "pointer",
                            transition: "all 0.15s",
                            background: active ? "var(--w3-surface-elevated)" : "transparent",
                            color: active ? "var(--w3-gray-900)" : "var(--w3-gray-500)",
                            boxShadow: active ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
                          }}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Amount input */}
                  <div
                    style={{
                      marginTop: 10,
                      borderRadius: 8,
                      border: "1px solid var(--w3-border-subtle)",
                      background: "var(--w3-glass-inner-bg)",
                      padding: "8px 10px",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <input
                      type="text"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) =>
                        /^\d*\.?\d*$/.test(e.target.value) && setAmount(e.target.value)
                      }
                      style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        fontSize: 14,
                        fontWeight: 500,
                        color: "var(--w3-gray-900)",
                        fontFamily: monoFont,
                      }}
                    />
                    <span style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)" }}>
                      {pool.token}
                    </span>
                  </div>

                  <p style={{ fontSize: 11, color: "var(--w3-gray-500)", marginTop: 4 }}>
                    Min: {pool.minStake} {pool.token}
                  </p>

                  {/* Action button */}
                  <button
                    disabled={!amount || parseFloat(amount) <= 0}
                    style={{
                      width: "100%",
                      padding: "8px 0",
                      marginTop: 10,
                      borderRadius: 8,
                      border: "none",
                      background: amount && parseFloat(amount) > 0 ? "var(--w3-accent)" : "var(--w3-gray-300)",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: amount && parseFloat(amount) > 0 ? "pointer" : "not-allowed",
                      opacity: amount && parseFloat(amount) > 0 ? 1 : 0.5,
                    }}
                  >
                    {isStaking ? "Stake" : "Unstake"} {pool.token}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          Props-driven, expandable pool list
        </span>
      </div>
    </div>
  );
}
