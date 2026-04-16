export interface DocNavItem {
  label: string;
  slug: string;
  type: "markdown" | "guide" | "recipe";
}

export interface DocNavSection {
  title: string;
  items: DocNavItem[];
}

export const docsNavSections: DocNavSection[] = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", slug: "introduction", type: "markdown" },
      { label: "Installation", slug: "installation", type: "markdown" },
      { label: "Project Structure", slug: "project-structure", type: "markdown" },
      { label: "Configuration", slug: "configuration", type: "markdown" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { label: "Components", slug: "components", type: "markdown" },
      { label: "Theming", slug: "theming", type: "markdown" },
      { label: "Design Tokens", slug: "design-tokens", type: "markdown" },
      { label: "Accessibility", slug: "accessibility", type: "markdown" },
    ],
  },
  {
    title: "Ecosystem",
    items: [
      { label: "UI Library", slug: "ui-library", type: "markdown" },
      { label: "Registry", slug: "registry", type: "markdown" },
      { label: "CLI", slug: "cli", type: "markdown" },
      { label: "Contracts", slug: "contracts", type: "markdown" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { label: "Components API", slug: "components-api", type: "markdown" },
      { label: "Hooks & Utilities", slug: "hooks-utilities", type: "markdown" },
      { label: "CLI Commands", slug: "cli-commands", type: "markdown" },
    ],
  },

  // ── Learn Repo: Guides ──────────────────────────────────────────────────────
  {
    title: "Guides",
    items: [
      { label: "What Is a Wallet", slug: "what-is-a-wallet", type: "guide" },
      { label: "What Are Smart Contracts", slug: "what-are-smart-contracts", type: "guide" },
      { label: "Accounts Model", slug: "accounts-model", type: "guide" },
      { label: "How Transactions Work", slug: "how-transactions-work", type: "guide" },
      { label: "Public vs Private Keys", slug: "public-vs-private-keys", type: "guide" },
      { label: "Gas Explained", slug: "gas-explained", type: "guide" },
      { label: "PDAs Explained", slug: "pdas-explained", type: "guide" },
      { label: "Top 10 Vulnerabilities", slug: "top-10-vulnerabilities", type: "guide" },
      { label: "Glossary", slug: "glossary", type: "guide" },
    ],
  },

  // ── Learn Repo: Recipes — Wallet ────────────────────────────────────────────
  {
    title: "Recipes: Wallet",
    items: [
      { label: "Connect Wallet", slug: "connect-wallet", type: "recipe" },
      { label: "Disconnect Wallet", slug: "disconnect-wallet", type: "recipe" },
      { label: "Sign Message", slug: "sign-message", type: "recipe" },
      { label: "Switch Network", slug: "switch-network", type: "recipe" },
    ],
  },

  // ── Learn Repo: Recipes — Tokens ────────────────────────────────────────────
  {
    title: "Recipes: Tokens",
    items: [
      { label: "Create Token", slug: "create-token", type: "recipe" },
      { label: "Transfer Tokens", slug: "transfer-tokens", type: "recipe" },
      { label: "Approve Spending", slug: "approve-spending", type: "recipe" },
      { label: "Get Balance", slug: "get-balance", type: "recipe" },
      { label: "Fetch Metadata", slug: "fetch-metadata", type: "recipe" },
      { label: "Watch Transfers", slug: "watch-transfers", type: "recipe" },
    ],
  },

  // ── Learn Repo: Recipes — NFTs ──────────────────────────────────────────────
  {
    title: "Recipes: NFTs",
    items: [
      { label: "Mint NFT", slug: "mint-nft", type: "recipe" },
      { label: "Fetch NFT Collection", slug: "fetch-nft-collection", type: "recipe" },
      { label: "Buy NFT", slug: "buy-nft", type: "recipe" },
      { label: "Display NFT Metadata", slug: "display-nft-metadata", type: "recipe" },
    ],
  },

  // ── Learn Repo: Recipes — DeFi ──────────────────────────────────────────────
  {
    title: "Recipes: DeFi",
    items: [
      { label: "Swap Tokens", slug: "swap-tokens", type: "recipe" },
      { label: "Provide Liquidity", slug: "provide-liquidity", type: "recipe" },
      { label: "Stake Tokens", slug: "stake-tokens", type: "recipe" },
      { label: "Claim Rewards", slug: "claim-rewards", type: "recipe" },
    ],
  },

  // ── Learn Repo: Recipes — Utils ─────────────────────────────────────────────
  {
    title: "Recipes: Utils",
    items: [
      { label: "Resolve Address", slug: "resolve-address", type: "recipe" },
      { label: "Estimate Fees", slug: "estimate-fees", type: "recipe" },
    ],
  },
];

/** Flat ordered list of all nav items (useful for prev/next navigation) */
export const allDocNavItems = docsNavSections.flatMap((s) =>
  s.items.map((item) => ({ ...item, section: s.title })),
);
