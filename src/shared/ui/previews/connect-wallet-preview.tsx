import { useState, useCallback, useEffect } from "react";
import { Wallet, Check, Loader2, Copy, LogOut, ExternalLink, ChevronDown } from "lucide-react";
import { domainLogo, preloadDomainLogos } from "../../lib/logos";

/* ── Wallet definitions ───────────────────────────────────────────────── */
const WALLETS = [
  {
    id: "metamask" as const,
    name: "MetaMask",
    domain: "metamask.io",
    color: "#E2761B",
    ecosystem: "evm" as const,
    popular: true,
  },
  {
    id: "coinbase" as const,
    name: "Coinbase Wallet",
    domain: "coinbase.com",
    color: "#0052FF",
    ecosystem: "evm" as const,
    popular: true,
  },
  {
    id: "walletconnect" as const,
    name: "WalletConnect",
    domain: "walletconnect.com",
    color: "#3B99FC",
    ecosystem: "evm" as const,
    popular: false,
  },
  {
    id: "phantom" as const,
    name: "Phantom",
    domain: "phantom.app",
    color: "#AB9FF2",
    ecosystem: "solana" as const,
    popular: true,
  },
];

type WalletId = (typeof WALLETS)[number]["id"];
type ConnectState = "idle" | "connecting" | "connected";

const CHAINS: Record<number, { name: string; color: string }> = {
  1: { name: "Ethereum", color: "#627EEA" },
  137: { name: "Polygon", color: "#8247E5" },
  42161: { name: "Arbitrum", color: "#28A0F0" },
  10: { name: "Optimism", color: "#FF0420" },
  8453: { name: "Base", color: "#0052FF" },
};

function truncateAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function WalletLogo({ domain, size = 24 }: { domain: string; size?: number }) {
  return (
    <img
      src={domainLogo(domain, size * 2)}
      alt=""
      width={size}
      height={size}
      style={{ borderRadius: 6, display: "block" }}
      loading="lazy"
    />
  );
}

export function ConnectWalletPreview() {
  // Preload all wallet logos once on mount
  useEffect(() => {
    preloadDomainLogos(WALLETS.map((w) => w.domain));
  }, []);

  const [state, setState] = useState<ConnectState>("idle");
  const [selectedWallet, setSelectedWallet] = useState<WalletId | null>(null);
  const [address, setAddress] = useState("");
  const [chainId, setChainId] = useState(1);
  const [copied, setCopied] = useState(false);
  const [showChains, setShowChains] = useState(false);
  const [recentWallet, setRecentWallet] = useState<WalletId | null>(null);

  const handleSelectWallet = useCallback((walletId: WalletId) => {
    setSelectedWallet(walletId);
    setState("connecting");
    setTimeout(() => {
      setAddress("0x1a2B3c4D5e6F7890AbCdEf1234567890aBcDeF12");
      setChainId(1);
      setState("connected");
      setRecentWallet(walletId);
    }, 1500);
  }, []);

  const handleDisconnect = useCallback(() => {
    setState("idle");
    setSelectedWallet(null);
    setAddress("");
    setShowChains(false);
  }, []);

  const handleCopy = useCallback(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleChainSwitch = useCallback((id: number) => {
    setChainId(id);
    setShowChains(false);
  }, []);

  const chain = CHAINS[chainId] ?? { name: "Unknown", color: "#888" };
  const wallet = WALLETS.find((w) => w.id === selectedWallet);

  /* ── CONNECTED STATE ────────────────────────────────────────────── */
  if (state === "connected" && wallet) {
    return (
      <div
        style={{
          borderRadius: 12,
          border: "1px solid var(--w3-border-subtle)",
          background: "var(--w3-surface-elevated)",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 14px",
            borderBottom: "1px solid var(--w3-border-subtle)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--w3-gray-900)" }}>
              Connected
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "3px 8px",
              borderRadius: 6,
              background: chain.color + "14",
              fontSize: 10,
              fontWeight: 500,
              color: chain.color,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: chain.color }} />
            {chain.name}
          </div>
        </div>

        <div style={{ padding: 14 }}>
          {/* Account card */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 8,
              background: "var(--w3-glass-inner-bg)",
              marginBottom: 10,
            }}
          >
            <WalletLogo domain={wallet.domain} size={32} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--w3-gray-900)" }}>
                {wallet.name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--w3-gray-500)",
                  fontFamily: '"Geist Mono", ui-monospace, monospace',
                }}
              >
                {truncateAddress(address)}
              </div>
            </div>
            <button
              onClick={handleCopy}
              style={{
                padding: 4,
                borderRadius: 4,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: copied ? "#22c55e" : "var(--w3-gray-400)",
                display: "flex",
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>

          {/* Actions row */}
          <div style={{ display: "flex", gap: 6 }}>
            {/* Chain switcher — inline */}
            <div style={{ position: "relative", flex: 1 }}>
              <button
                onClick={() => setShowChains(!showChains)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid var(--w3-border-subtle)",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: 12,
                  color: "var(--w3-gray-700)",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: chain.color }} />
                  {chain.name}
                </span>
                <ChevronDown
                  size={12}
                  style={{ transition: "transform 0.2s", transform: showChains ? "rotate(180deg)" : "none" }}
                />
              </button>
              {showChains && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 4px)",
                    left: 0,
                    right: 0,
                    borderRadius: 8,
                    border: "1px solid var(--w3-border-subtle)",
                    background: "var(--w3-surface-elevated)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    zIndex: 10,
                    padding: 4,
                  }}
                >
                  {Object.entries(CHAINS).map(([id, c]) => (
                    <button
                      key={id}
                      onClick={() => handleChainSwitch(Number(id))}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "6px 8px",
                        borderRadius: 6,
                        border: "none",
                        background: chainId === Number(id) ? "var(--w3-accent-subtle)" : "transparent",
                        cursor: "pointer",
                        fontSize: 11,
                        color: "var(--w3-gray-700)",
                        textAlign: "left",
                      }}
                    >
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.color }} />
                      {c.name}
                      {chainId === Number(id) && (
                        <Check size={10} style={{ marginLeft: "auto", color: "var(--w3-accent)" }} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Disconnect */}
            <button
              onClick={handleDisconnect}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid var(--w3-border-subtle)",
                background: "transparent",
                fontSize: 12,
                fontWeight: 500,
                color: "var(--w3-gray-600)",
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <LogOut size={12} />
              Disconnect
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── WALLET PICKER ──────────────────────────────────────────────── */
  return (
    <div
      style={{
        borderRadius: 12,
        border: "1px solid var(--w3-border-subtle)",
        background: "var(--w3-surface-elevated)",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          borderBottom: "1px solid var(--w3-border-subtle)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Wallet size={14} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Connect Wallet
          </span>
        </div>
        {state === "connecting" && (
          <Loader2
            size={14}
            style={{ color: "var(--w3-accent)", animation: "spin 1s linear infinite" }}
          />
        )}
      </div>

      {/* Recent wallet */}
      {recentWallet && state === "idle" && (
        <div style={{ padding: "8px 14px 0" }}>
          <span style={{ fontSize: 10, color: "var(--w3-gray-400)", fontWeight: 500, letterSpacing: "0.05em" }}>
            RECENT
          </span>
          <button
            onClick={() => handleSelectWallet(recentWallet)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 10px",
              marginTop: 4,
              borderRadius: 8,
              border: "1px solid var(--w3-accent)",
              background: "var(--w3-accent-subtle)",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <WalletLogo domain={WALLETS.find((w) => w.id === recentWallet)!.domain} size={24} />
            <span style={{ flex: 1, fontSize: 12, fontWeight: 500, color: "var(--w3-gray-900)" }}>
              {WALLETS.find((w) => w.id === recentWallet)?.name}
            </span>
            <span style={{ fontSize: 10, color: "var(--w3-accent)" }}>→</span>
          </button>
        </div>
      )}

      {/* Wallet list */}
      <div style={{ padding: "4px 6px" }}>
        {recentWallet && state === "idle" && (
          <div style={{ padding: "6px 8px 2px" }}>
            <span style={{ fontSize: 10, color: "var(--w3-gray-400)", fontWeight: 500, letterSpacing: "0.05em" }}>
              ALL WALLETS
            </span>
          </div>
        )}
        {WALLETS.map((w) => {
          const isConnecting = state === "connecting" && selectedWallet === w.id;
          const isDisabled = state === "connecting" && selectedWallet !== w.id;

          return (
            <button
              key={w.id}
              onClick={() => state !== "connecting" && handleSelectWallet(w.id)}
              disabled={isDisabled}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 10px",
                borderRadius: 8,
                border: "none",
                background: isConnecting ? "var(--w3-accent-subtle)" : "transparent",
                cursor: isDisabled ? "not-allowed" : "pointer",
                opacity: isDisabled ? 0.4 : 1,
                width: "100%",
                textAlign: "left",
                transition: "opacity 0.15s",
              }}
            >
              <WalletLogo domain={w.domain} size={24} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-900)" }}>
                    {w.name}
                  </span>
                  {w.popular && (
                    <span
                      style={{
                        fontSize: 8,
                        fontWeight: 600,
                        padding: "1px 4px",
                        borderRadius: 3,
                        background: "var(--w3-accent-subtle)",
                        color: "var(--w3-accent)",
                      }}
                    >
                      Popular
                    </span>
                  )}
                </div>
                <span style={{ fontSize: 10, color: "var(--w3-gray-400)" }}>
                  {w.ecosystem === "evm" ? "Ethereum" : "Solana"}
                </span>
              </div>
              {isConnecting ? (
                <Loader2
                  size={14}
                  style={{ color: "var(--w3-accent)", animation: "spin 1s linear infinite", flexShrink: 0 }}
                />
              ) : (
                <span style={{ fontSize: 10, color: "var(--w3-gray-400)", flexShrink: 0 }}>→</span>
              )}
            </button>
          );
        })}
      </div>

      <div
        style={{
          padding: "8px 14px",
          borderTop: "1px solid var(--w3-border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 10, color: "var(--w3-gray-400)" }}>
          {WALLETS.length} wallets
        </span>
        <span
          style={{
            fontSize: 10,
            color: "var(--w3-accent)",
            display: "flex",
            alignItems: "center",
            gap: 3,
            cursor: "pointer",
          }}
        >
          <ExternalLink size={9} />
          What is a wallet?
        </span>
      </div>
    </div>
  );
}
