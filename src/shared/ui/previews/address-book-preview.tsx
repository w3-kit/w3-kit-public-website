import { useState, useCallback } from "react";
import { BookUser, Plus, Trash2, Copy, Check } from "lucide-react";
import { truncateAddress } from "../../lib/format";
import { previewCard, previewHeader, monoFont } from "./_shared";

const MOCK_ENTRIES = [
  { id: "1", name: "Vitalik", address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", ensName: "vitalik.eth" },
  { id: "2", name: "Treasury", address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984" },
  { id: "3", name: "Deployer", address: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B", ensName: "deployer.eth" },
];

export function AddressBookPreview() {
  const [entries, setEntries] = useState(MOCK_ENTRIES);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const handleCopy = useCallback((id: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BookUser size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>
            Address Book
          </span>
          <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>{entries.length}</span>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          style={{
            padding: 6,
            borderRadius: 8,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: "var(--w3-gray-500)",
            display: "flex",
          }}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--w3-border-subtle)", display: "flex", flexDirection: "column", gap: 10 }}>
          <input
            placeholder="Name"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid var(--w3-border-subtle)",
              background: "transparent",
              fontSize: 14,
              color: "var(--w3-gray-900)",
              outline: "none",
            }}
          />
          <input
            placeholder="0x... or ENS name"
            style={{
              width: "100%",
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
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button
              onClick={() => setShowAdd(false)}
              style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: "transparent", fontSize: 13, fontWeight: 500, color: "var(--w3-gray-600)", cursor: "pointer" }}
            >
              Cancel
            </button>
            <button
              style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "var(--w3-accent)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Address list */}
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
        {entries.map((entry) => (
          <div
            key={entry.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 14px",
              borderRadius: 12,
              transition: "background 0.15s",
              cursor: "default",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--w3-accent-subtle)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "var(--w3-surface-elevated)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--w3-gray-700)",
                flexShrink: 0,
              }}
            >
              {entry.name.charAt(0).toUpperCase()}
            </div>

            {/* Name + address */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)" }}>
                  {entry.name}
                </span>
                {entry.ensName && (
                  <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 5, background: "var(--w3-accent-subtle)", color: "var(--w3-accent)" }}>
                    ENS
                  </span>
                )}
              </div>
              <span style={{ fontSize: 13, color: "var(--w3-gray-600)", fontFamily: monoFont, display: "block", marginTop: 1 }}>
                {entry.ensName || truncateAddress(entry.address)}
              </span>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
              <button
                onClick={() => handleCopy(entry.id)}
                style={{ padding: 6, borderRadius: 6, border: "none", background: "transparent", cursor: "pointer", color: copiedId === entry.id ? "#22c55e" : "var(--w3-gray-400)", display: "flex" }}
              >
                {copiedId === entry.id ? <Check size={14} /> : <Copy size={14} />}
              </button>
              <button
                onClick={() => handleDelete(entry.id)}
                style={{ padding: 6, borderRadius: 6, border: "none", background: "transparent", cursor: "pointer", color: "var(--w3-gray-400)", display: "flex" }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          {entries.length} address{entries.length !== 1 ? "es" : ""}
        </span>
      </div>
    </div>
  );
}
