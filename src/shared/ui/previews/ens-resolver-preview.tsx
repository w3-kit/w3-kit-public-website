import { useState } from "react";
import { AtSign, Search, Copy, Check } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";
import { truncateAddress } from "../../lib/format";

interface ResolvedResult {
  ensName: string;
  address: string;
}

export function ENSResolverPreview() {
  const [query, setQuery] = useState("vitalik.eth");
  const [resolved, setResolved] = useState<ResolvedResult | null>({
    ensName: "vitalik.eth",
    address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  });
  const [copied, setCopied] = useState<"name" | "address" | null>(null);

  const handleResolve = () => {
    if (query.endsWith(".eth")) {
      setResolved({ ensName: query, address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" });
    } else if (query.startsWith("0x")) {
      setResolved({ ensName: "vitalik.eth", address: query });
    }
  };

  const handleCopy = (type: "name" | "address") => {
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <AtSign size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            ENS Resolver
          </span>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleResolve()}
            placeholder="vitalik.eth or 0x..."
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid var(--w3-border-subtle)",
              background: "transparent",
              fontSize: 13,
              fontFamily: monoFont,
              color: "var(--w3-gray-900)",
              outline: "none",
            }}
          />
          <button
            onClick={handleResolve}
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              border: "none",
              background: "var(--w3-gray-900)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <Search size={15} />
          </button>
        </div>

        {/* Result card */}
        {resolved ? (
          <div
            style={{
              borderRadius: 12,
              border: "1px solid var(--w3-border-subtle)",
              background: "var(--w3-accent-subtle)",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {/* ENS name row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Avatar circle with gradient */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--w3-accent), var(--w3-gray-400))",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 2 }}>
                    ENS Name
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)" }}>
                    {resolved.ensName}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleCopy("name")}
                style={{
                  padding: 6,
                  borderRadius: 6,
                  background: "transparent",
                  border: "none",
                  color: copied === "name" ? "#22c55e" : "var(--w3-gray-400)",
                  cursor: "pointer",
                  display: "flex",
                }}
              >
                {copied === "name" ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>

            {/* Bidirectional arrow divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, height: 1, background: "var(--w3-border-subtle)" }} />
              <span style={{ fontSize: 13, color: "var(--w3-gray-400)" }}>&#8597;</span>
              <div style={{ flex: 1, height: 1, background: "var(--w3-border-subtle)" }} />
            </div>

            {/* Address row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, color: "var(--w3-gray-500)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 2 }}>
                  Address
                </div>
                <div style={{ fontSize: 13, fontFamily: monoFont, color: "var(--w3-gray-600)" }}>
                  {truncateAddress(resolved.address)}
                </div>
              </div>
              <button
                onClick={() => handleCopy("address")}
                style={{
                  padding: 6,
                  borderRadius: 6,
                  background: "transparent",
                  border: "none",
                  color: copied === "address" ? "#22c55e" : "var(--w3-gray-400)",
                  cursor: "pointer",
                  display: "flex",
                }}
              >
                {copied === "address" ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0", fontSize: 13, color: "var(--w3-gray-400)" }}>
            Enter an ENS name or address to resolve
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          Resolved
        </span>
      </div>
    </div>
  );
}
