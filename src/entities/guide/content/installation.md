# Installation

## Prerequisites

- **Node.js 18+** — w3-kit uses native ESM and modern Node APIs
- **React 18+** — components use the concurrent rendering model
- **TypeScript 5** (recommended) — all packages ship with full type definitions

## Quick Start

The fastest way to create a new project is the `w3-kit init` scaffolder:

```bash
npx w3-kit init my-dapp
cd my-dapp
npm install
npm run dev
```

This creates a Vite + React + TypeScript project with the w3-kit UI library, TailwindCSS, and a sample layout already configured.

## Adding to an Existing Project

### Install the UI package

```bash
npm install w3-kit
```

### Import the stylesheet

In your root `main.tsx` or `App.tsx`, import the base stylesheet which includes CSS variables for all design tokens:

```tsx
import "w3-kit/styles";
```

### Add a component

```tsx
import { ConnectWallet } from "w3-kit";

export function Header() {
  return (
    <ConnectWallet
      wallets={[
        { id: "metamask", name: "MetaMask", icon: "/icons/metamask.svg", ecosystem: "evm" },
        { id: "phantom", name: "Phantom", icon: "/icons/phantom.svg", ecosystem: "solana" },
      ]}
      onConnect={(walletId) => console.log("connecting", walletId)}
    />
  );
}
```

## Installing Individual Components

Use the CLI to copy only the components you need directly into your project source:

```bash
npx w3-kit add token-swap
npx w3-kit add nft-card nft-collection-grid
```

This copies the component source into `src/components/w3-kit/` so you have full ownership and can customize freely.

## Installing the Registry

The registry package provides chain and token data:

```bash
npm install @w3-kit/registry
```

```ts
import { getChain, getTokensForChain } from "@w3-kit/registry";

const ethereum = getChain(1);
const tokens = getTokensForChain(1);
```

## Tailwind CSS Configuration

w3-kit components use Tailwind utility classes. If your project already uses Tailwind, no additional configuration is needed. If not, the `w3-kit init` scaffolder sets it up for you.

For Tailwind v4 projects, add the following to your CSS entry point:

```css
@import "tailwindcss";
@import "w3-kit/styles";
```

## Peer Dependencies

The UI library has the following peer dependencies. Install whichever apply to your stack:

```bash
# For wallet interactions (EVM)
npm install viem wagmi

# For Solana
npm install @solana/web3.js

# For animations (optional)
npm install framer-motion
```

## Verify Your Setup

Start your dev server and check that the CSS variables are being applied:

```tsx
<div style={{ color: "var(--w3-accent)" }}>w3-kit is working</div>
```

If the text appears in the accent color (default: `#6366F1`), the stylesheet is loaded correctly.
