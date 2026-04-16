import { useState } from "react";

export function NFTCardPreview() {
  const [imgLoaded, setImgLoaded] = useState(false);

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
      {/* Image */}
      <div
        style={{
          position: "relative",
          aspectRatio: "1",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          overflow: "hidden",
        }}
      >
        <img
          src="https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR0qKbTVt-OLCGMXSsqvbFGATgtZN-_5TT4UjBVTo6FVaUiVCaZRoNiAN5tA4XVw_Fs4YdVD-mEJA3rag?auto=format&w=384"
          alt="Bored Ape"
          onLoad={() => setImgLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />
        {/* Collection badge */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            padding: "3px 8px",
            borderRadius: 6,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            fontSize: 10,
            fontWeight: 600,
            color: "#fff",
          }}
        >
          BAYC
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "10px 14px" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--w3-gray-900)", marginBottom: 4 }}>
          Bored Ape #7842
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#627EEA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 7,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              E
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--w3-gray-900)",
                fontFamily: '"Geist Mono", ui-monospace, monospace',
              }}
            >
              68.5 ETH
            </span>
          </div>
          <span
            style={{
              fontSize: 10,
              color: "var(--w3-gray-500)",
              fontFamily: '"Geist Mono", ui-monospace, monospace',
            }}
          >
            0xd8dA...6045
          </span>
        </div>
      </div>
    </div>
  );
}
