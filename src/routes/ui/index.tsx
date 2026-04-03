import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ui/")({
  component: UiExplorerPage,
});

type Component = { name: string; label: string; description: string };
type Category = { title: string; items: Component[] };

const categories: Category[] = [
  {
    title: "Wallet & Auth",
    items: [
      { name: "connect-wallet", label: "Connect Wallet", description: "Multi-provider wallet connection with WalletConnect, MetaMask, and more" },
      { name: "wallet-balance", label: "Wallet Balance", description: "Display native and token balances for any address" },
      { name: "multisig-wallet", label: "Multisig Wallet", description: "Multi-signature wallet management and transaction approval" },
      { name: "network-switcher", label: "Network Switcher", description: "Chain selector with network metadata and switching logic" },
      { name: "address-book", label: "Address Book", description: "Save and manage frequently used addresses" },
    ],
  },
  {
    title: "Tokens & DeFi",
    items: [
      { name: "token-swap", label: "Token Swap", description: "DEX aggregator swap interface with price quotes" },
      { name: "token-card", label: "Token Card", description: "Token display card with price, change, and metadata" },
      { name: "token-list", label: "Token List", description: "Filterable token list with search and sorting" },
      { name: "token-vesting", label: "Token Vesting", description: "Vesting schedule display with claim functionality" },
      { name: "token-airdrop", label: "Token Airdrop", description: "Batch airdrop interface for ERC-20 distribution" },
      { name: "price-ticker", label: "Price Ticker", description: "Real-time price feed with sparkline charts" },
      { name: "staking-interface", label: "Staking Interface", description: "Stake, unstake, and view rewards for any protocol" },
      { name: "liquidity-pool-stats", label: "Liquidity Pool Stats", description: "Pool metrics — TVL, APY, volume, and fee tier" },
      { name: "limit-order-manager", label: "Limit Order Manager", description: "Place and manage limit orders on DEXs" },
      { name: "defi-position-manager", label: "DeFi Position Manager", description: "Aggregate view of all DeFi positions" },
      { name: "flash-loan-executor", label: "Flash Loan Executor", description: "Build and execute flash loan sequences" },
      { name: "subscription-payments", label: "Subscription Payments", description: "Recurring on-chain payment streams" },
    ],
  },
  {
    title: "NFTs",
    items: [
      { name: "nft-card", label: "NFT Card", description: "NFT display with media, traits, and metadata" },
      { name: "nft-collection-grid", label: "NFT Collection Grid", description: "Grid view of NFT collections with filters" },
      { name: "nft-marketplace-aggregator", label: "NFT Marketplace", description: "Cross-marketplace NFT listings and orders" },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      { name: "gas-calculator", label: "Gas Calculator", description: "Estimate gas costs across chains and tx types" },
      { name: "transaction-history", label: "Transaction History", description: "Paginated transaction feed with status tracking" },
      { name: "contract-interaction", label: "Contract Interaction", description: "Read/write interface for any verified contract" },
      { name: "smart-contract-scanner", label: "Contract Scanner", description: "Security analysis and audit score for contracts" },
      { name: "ens-resolver", label: "ENS Resolver", description: "Forward and reverse ENS resolution with avatars" },
      { name: "bridge", label: "Bridge", description: "Cross-chain bridge interface with route comparison" },
      { name: "asset-portfolio", label: "Asset Portfolio", description: "Unified portfolio view across chains and protocols" },
    ],
  },
  {
    title: "Primitives",
    items: [
      { name: "button", label: "Button", description: "Base button with variants, sizes, and icon support" },
      { name: "card", label: "Card", description: "Container card with header, content, and footer slots" },
      { name: "badge", label: "Badge", description: "Status badge for labels, counts, and indicators" },
      { name: "input", label: "Input", description: "Text input with validation states and addons" },
      { name: "dialog", label: "Dialog", description: "Modal dialog with accessible focus management" },
      { name: "select", label: "Select", description: "Dropdown select with search and custom rendering" },
      { name: "tabs", label: "Tabs", description: "Tab navigation with lazy-loaded panels" },
      { name: "progress", label: "Progress", description: "Progress bar with determinate and indeterminate states" },
      { name: "stat", label: "Stat", description: "Statistic display with label, value, and change" },
      { name: "status-dot", label: "Status Dot", description: "Colored indicator dot for connection status" },
      { name: "token-icon", label: "Token Icon", description: "Token logo with fallback and chain badge" },
    ],
  },
];

function UiExplorerPage() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --bg: #09090b; --fg: #fafafa; --muted: #71717a; --border: #27272a; --accent: #a78bfa; --accent-dim: #7c3aed; --card-bg: #18181b; --card-hover: #1f1f23; }
        body { background: var(--bg); color: var(--fg); font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; -webkit-font-smoothing: antialiased; }

        .ui-page { min-height: 100vh; display: flex; flex-direction: column; }

        .ui-nav { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 2rem; border-bottom: 1px solid var(--border); position: sticky; top: 0; background: rgba(9, 9, 11, 0.85); backdrop-filter: blur(12px); z-index: 10; }
        .ui-nav-left { display: flex; align-items: center; gap: 0.75rem; }
        .ui-nav-brand { font-size: 1.125rem; font-weight: 700; letter-spacing: -0.02em; text-decoration: none; color: var(--fg); }
        .ui-nav-brand span { color: var(--accent); }
        .ui-nav-sep { color: var(--border); font-weight: 300; }
        .ui-nav-section { color: var(--muted); font-size: 0.875rem; }
        .ui-nav-right { display: flex; gap: 1rem; align-items: center; }
        .ui-nav-right a { color: var(--muted); text-decoration: none; font-size: 0.8125rem; transition: color 0.15s; }
        .ui-nav-right a:hover { color: var(--fg); }

        .ui-hero { padding: 3rem 2rem; max-width: 960px; margin: 0 auto; width: 100%; }
        .ui-hero h1 { font-size: 2rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 0.5rem; }
        .ui-hero p { color: var(--muted); font-size: 1rem; line-height: 1.6; }
        .ui-stats { display: flex; gap: 2rem; margin-top: 1.25rem; }
        .ui-stat { display: flex; flex-direction: column; }
        .ui-stat-value { font-size: 1.5rem; font-weight: 700; color: var(--accent); }
        .ui-stat-label { font-size: 0.75rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.125rem; }

        .ui-content { flex: 1; padding: 0 2rem 4rem; max-width: 960px; margin: 0 auto; width: 100%; }

        .category { margin-bottom: 2.5rem; }
        .category-title { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border); }

        .component-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0.75rem; }
        .component-card { padding: 1rem 1.25rem; border: 1px solid var(--border); border-radius: 0.75rem; background: var(--card-bg); transition: all 0.15s; cursor: default; }
        .component-card:hover { border-color: var(--accent-dim); background: var(--card-hover); transform: translateY(-1px); }
        .component-name { font-size: 0.9375rem; font-weight: 600; margin-bottom: 0.25rem; }
        .component-desc { font-size: 0.8125rem; color: var(--muted); line-height: 1.5; }
        .component-slug { display: inline-block; margin-top: 0.5rem; font-size: 0.6875rem; font-family: 'SF Mono', 'Fira Code', monospace; color: var(--accent-dim); background: rgba(124, 58, 237, 0.1); padding: 0.125rem 0.5rem; border-radius: 0.25rem; }
      `}</style>
      <div className="ui-page">
        <nav className="ui-nav">
          <div className="ui-nav-left">
            <a href="/" className="ui-nav-brand">w3<span>-kit</span></a>
            <span className="ui-nav-sep">/</span>
            <span className="ui-nav-section">UI Library</span>
          </div>
          <div className="ui-nav-right">
            <a href="https://github.com/w3-kit/ui" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.npmjs.com/org/w3-kit" target="_blank" rel="noopener noreferrer">npm</a>
          </div>
        </nav>

        <div className="ui-hero">
          <h1>UI Library</h1>
          <p>
            Production-ready web3 components built with React, Radix UI, and Tailwind CSS.
            Copy-paste or install via the CLI.
          </p>
          <div className="ui-stats">
            <div className="ui-stat">
              <span className="ui-stat-value">{categories.reduce((sum, c) => sum + c.items.length, 0)}</span>
              <span className="ui-stat-label">Components</span>
            </div>
            <div className="ui-stat">
              <span className="ui-stat-value">{categories.length}</span>
              <span className="ui-stat-label">Categories</span>
            </div>
            <div className="ui-stat">
              <span className="ui-stat-value">EVM</span>
              <span className="ui-stat-label">Chains</span>
            </div>
          </div>
        </div>

        <div className="ui-content">
          {categories.map((cat) => (
            <div key={cat.title} className="category">
              <h2 className="category-title">{cat.title}</h2>
              <div className="component-grid">
                {cat.items.map((item) => (
                  <div key={item.name} className="component-card">
                    <div className="component-name">{item.label}</div>
                    <div className="component-desc">{item.description}</div>
                    <span className="component-slug">@w3-kit/ui/{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
