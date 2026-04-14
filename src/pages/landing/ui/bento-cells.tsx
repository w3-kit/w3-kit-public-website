import { useState, useEffect } from "react";
import { Check, Copy, Lock, LockOpen, Sun, Moon } from "lucide-react";
import { GitHubIcon } from "./github-icon";

/* ------------------------------------------------------------------ */
/*  Shared card wrapper                                                */
/* ------------------------------------------------------------------ */

function BentoCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-2xl p-6 ${className}`}
      style={{
        background: "var(--w3-surface-translucent)",
        border: "1px solid var(--w3-border-subtle)",
      }}
    >
      {children}
    </div>
  );
}

function CellLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-xs font-medium uppercase tracking-wider"
      style={{ color: "var(--w3-accent)" }}
    >
      {children}
    </span>
  );
}

function CellTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-semibold tracking-tight" style={{ color: "var(--w3-gray-900)" }}>
      {children}
    </h3>
  );
}

/* ------------------------------------------------------------------ */
/*  1. CLI — animated terminal (large cell)                            */
/* ------------------------------------------------------------------ */

export function CliCell() {
  return (
    <BentoCard>
      <div className="mb-4 flex flex-col gap-1">
        <CellLabel>Developer Experience</CellLabel>
        <CellTitle>One command to start</CellTitle>
      </div>

      {/* Faux terminal */}
      <div
        className="flex flex-1 flex-col overflow-hidden rounded-lg"
        style={{ background: "var(--w3-gray-200)", border: "1px solid var(--w3-border-subtle)" }}
      >
        {/* Terminal header */}
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{ borderBottom: "1px solid var(--w3-border-subtle)" }}
        >
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: "var(--w3-gray-400)" }} />
            <span className="h-2 w-2 rounded-full" style={{ background: "var(--w3-gray-400)" }} />
            <span className="h-2 w-2 rounded-full" style={{ background: "var(--w3-gray-400)" }} />
          </div>
          <span
            className="text-[10px]"
            style={{
              color: "var(--w3-gray-500)",
              fontFamily: '"Geist Mono", ui-monospace, monospace',
            }}
          >
            terminal
          </span>
        </div>

        {/* Terminal body */}
        <div
          className="flex flex-1 flex-col gap-1.5 p-3"
          style={{ fontFamily: '"Geist Mono", ui-monospace, monospace' }}
        >
          <TermLine prompt>npx w3-kit init</TermLine>
          <TermLine muted>✓ Detected Next.js project</TermLine>
          <TermLine muted>✓ Installing dependencies...</TermLine>
          <TermLine muted>✓ Added chains: ethereum, polygon, base</TermLine>
          <TermLine muted>✓ Created w3-kit.config.ts</TermLine>
          <TermLine accent>
            <Check size={11} className="inline" /> Ready! Run npm run dev
          </TermLine>
        </div>
      </div>
    </BentoCard>
  );
}

function TermLine({
  children,
  prompt,
  muted,
  accent,
}: {
  children: React.ReactNode;
  prompt?: boolean;
  muted?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] leading-relaxed">
      {prompt && <span style={{ color: "var(--w3-accent)" }}>$</span>}
      <span
        style={{
          color: accent ? "var(--w3-accent)" : muted ? "var(--w3-gray-500)" : "var(--w3-gray-900)",
        }}
      >
        {children}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Ecosystem — connected tools (medium cell)                       */
/* ------------------------------------------------------------------ */

export function EcosystemCell() {
  const tools = ["UI", "Docs", "Registry", "CLI", "Learn"];

  return (
    <BentoCard className="items-center justify-center text-center">
      <CellLabel>Ecosystem</CellLabel>
      <div className="mt-2">
        <CellTitle>5 tools, one system</CellTitle>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {tools.map((tool, i) => (
          <span key={tool} className="flex items-center gap-2">
            <span
              className="rounded-md px-2.5 py-1 text-xs font-medium"
              style={{
                background: "var(--w3-accent-subtle)",
                color: "var(--w3-accent)",
              }}
            >
              {tool}
            </span>
            {i < tools.length - 1 && (
              <span className="text-xs" style={{ color: "var(--w3-gray-400)" }}>
                →
              </span>
            )}
          </span>
        ))}
      </div>
    </BentoCard>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Own Your Code — no lock-in (small cell)                         */
/* ------------------------------------------------------------------ */

export function OwnCodeCell() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <BentoCard className="items-center justify-center text-center">
      <button
        onClick={() => setUnlocked(!unlocked)}
        className="mb-3 transition-all duration-300"
        style={{ color: unlocked ? "var(--w3-accent)" : "var(--w3-gray-500)" }}
        aria-label="Toggle lock"
      >
        {unlocked ? <LockOpen size={28} /> : <Lock size={28} />}
      </button>
      <CellTitle>Own your code</CellTitle>
      <p className="mt-1 text-sm" style={{ color: "var(--w3-gray-600)" }}>
        No lock-in. Copy, paste, it&apos;s yours.
      </p>
    </BentoCard>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Built for Web3 — chain logos (medium cell)                      */
/* ------------------------------------------------------------------ */

export function Web3Cell() {
  const chains = [
    { name: "Ethereum", color: "#627EEA" },
    { name: "Polygon", color: "#8247E5" },
    { name: "Base", color: "#0052FF" },
    { name: "Arbitrum", color: "#28A0F0" },
  ];

  return (
    <BentoCard className="items-center justify-center text-center">
      <CellLabel>Built for Web3</CellLabel>
      <div className="mt-2">
        <CellTitle>Not a generic UI kit</CellTitle>
      </div>
      <p className="mt-1 text-sm" style={{ color: "var(--w3-gray-600)" }}>
        Every API, every type — web3 native.
      </p>

      <div className="mt-4 flex items-center justify-center gap-3">
        {chains.map((chain) => (
          <div
            key={chain.name}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-bold text-white"
            style={{ background: chain.color }}
            title={chain.name}
          >
            {chain.name[0]}
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Theme Aware — live toggle (small cell)                          */
/* ------------------------------------------------------------------ */

export function ThemeCell() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = document.documentElement.getAttribute("data-theme");
    setIsDark(
      theme === "dark" ||
        (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches),
    );
  }, []);

  return (
    <BentoCard className="items-center justify-center text-center">
      <button
        onClick={() => setIsDark(!isDark)}
        className="mb-3 flex h-12 w-20 items-center rounded-full p-1 transition-all duration-300"
        style={{
          background: isDark ? "var(--w3-accent)" : "var(--w3-gray-300)",
          justifyContent: isDark ? "flex-end" : "flex-start",
        }}
        aria-label="Toggle theme preview"
      >
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
          style={{ color: isDark ? "var(--w3-accent)" : "var(--w3-gray-700)" }}
        >
          {isDark ? <Moon size={16} /> : <Sun size={16} />}
        </span>
      </button>
      <CellTitle>Theme aware</CellTitle>
      <p className="mt-1 text-sm" style={{ color: "var(--w3-gray-600)" }}>
        Light &amp; dark, out of the box.
      </p>
    </BentoCard>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Recipes — learn by building (large cell)                        */
/* ------------------------------------------------------------------ */

export function RecipesCell() {
  const recipes = [
    { title: "Connect a Wallet", done: true },
    { title: "Display Token Balances", done: true },
    { title: "Switch Between Chains", done: true },
    { title: "Send a Transaction", done: false },
  ];

  return (
    <BentoCard>
      <div className="mb-4 flex flex-col gap-1">
        <CellLabel>Recipes</CellLabel>
        <CellTitle>Learn by building real things</CellTitle>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        {recipes.map((r) => (
          <div
            key={r.title}
            className="flex items-center gap-3 rounded-lg px-4 py-2.5"
            style={{
              background: r.done ? "var(--w3-accent-subtle)" : "var(--w3-gray-200)",
            }}
          >
            <div
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded"
              style={{
                background: r.done ? "var(--w3-accent)" : "transparent",
                border: r.done ? "none" : "1.5px solid var(--w3-gray-400)",
              }}
            >
              {r.done && <Check size={12} className="text-white" />}
            </div>
            <span
              className="text-sm"
              style={{ color: r.done ? "var(--w3-gray-900)" : "var(--w3-gray-600)" }}
            >
              {r.title}
            </span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

/* ------------------------------------------------------------------ */
/*  7. Open Source — MIT forever (medium cell)                         */
/* ------------------------------------------------------------------ */

export function OpenSourceCell() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx w3-kit init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <BentoCard className="items-center justify-center text-center">
      <div className="mb-3" style={{ color: "var(--w3-gray-900)" }}>
        <GitHubIcon size={32} />
      </div>
      <CellTitle>Open source</CellTitle>
      <p className="mt-1 text-sm" style={{ color: "var(--w3-gray-600)" }}>
        MIT licensed. Free forever.
      </p>

      <button
        onClick={handleCopy}
        className="mt-4 flex items-center gap-2 rounded-lg px-4 py-2 text-xs transition-all"
        style={{
          background: "var(--w3-gray-200)",
          border: "1px solid var(--w3-border-subtle)",
          color: "var(--w3-gray-700)",
          fontFamily: '"Geist Mono", ui-monospace, monospace',
        }}
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
        {copied ? "Copied!" : "npx w3-kit init"}
      </button>
    </BentoCard>
  );
}
