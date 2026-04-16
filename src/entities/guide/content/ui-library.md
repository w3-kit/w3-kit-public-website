# UI Library

The w3-kit UI library (`w3-kit/ui`) is the component package at the core of the ecosystem. It provides 27+ blockchain-specific React components and a set of design primitives, all built with TypeScript, Tailwind CSS, and Radix UI.

## Installation

```bash
npm install w3-kit
```

Import the stylesheet once in your application entry point:

```tsx
import "w3-kit/styles";
```

## Design Principles

### Headless logic layer

Components are pure UI. They do not import wallet libraries, make network requests, or manage subscriptions. This makes them compatible with any Web3 stack — wagmi, ethers, @solana/web3.js, or your own abstractions.

### Props-driven state

All component state that the parent may care about is exposed as controlled props. Components fire callbacks rather than managing async flows internally.

### Zero CSS-in-JS

Components use Tailwind utility classes and CSS variables. There are no runtime style injections, no `styled-components`, and no `emotion`. This keeps bundle sizes small and avoids hydration mismatches in SSR setups.

## Component Categories

### Wallet Components

The wallet category covers the most common dApp interaction patterns.

**ConnectWallet** is the flagship component. It handles the multi-step connection flow: picking a wallet, displaying connection loading state, and showing the connected state with account info, chain switching, and disconnect.

```tsx
import { ConnectWallet } from "w3-kit";

<ConnectWallet
  wallets={wallets}
  connectedAccount={account}
  chains={supportedChains}
  activeChain={currentChain}
  onConnect={handleConnect}
  onDisconnect={handleDisconnect}
  onChainSwitch={handleChainSwitch}
/>
```

### DeFi Components

DeFi components cover the core interactions in decentralized finance.

**TokenSwap** provides a complete swap widget UI. Pass the available tokens, the selected from/to tokens, and an exchange rate — the component handles the rest of the layout and fires `onSwap` when the user confirms.

```tsx
import { TokenSwap } from "w3-kit";

<TokenSwap
  tokens={availableTokens}
  fromToken={from}
  toToken={to}
  exchangeRate={rate}
  onSwap={executeSwap}
  onFromTokenChange={setFrom}
  onToTokenChange={setTo}
/>
```

### NFT Components

NFT components make it easy to build collection browsers, gallery pages, and marketplace integrations.

```tsx
import { NftCard, NftCollectionGrid } from "w3-kit";

<NftCollectionGrid
  items={nfts}
  collectionName="CryptoPunks"
  columns={3}
  onItemClick={openNftDetail}
/>
```

### Data Components

Data components display on-chain information — balances, prices, transactions — in polished table and card formats.

### Utility Components

Utility components cover specialized tools like gas calculators, ENS resolvers, smart contract scanners, and vesting schedules.

## Primitive Components

Beyond the Web3-specific components, the library exports a set of reusable UI primitives built on Radix UI:

- `Button` — variants: default, outline, ghost, destructive
- `Badge` — status badges with color variants
- `Card` — composable card with header, content, footer
- `Dialog` — accessible modal with focus trap
- `Input` — styled text input
- `Progress` — animated progress bar
- `Select` — accessible dropdown
- `Stat` — metric display with label and value
- `StatusDot` — colored status indicator
- `Tabs` — tab navigation with keyboard support
- `Textarea` — styled multi-line input
- `TokenIcon` — token logo with symbol fallback

## TypeScript Types

Every component and its associated domain types are fully exported:

```ts
import type {
  WalletOption,
  ConnectedAccount,
  Chain,
} from "w3-kit/connect-wallet";

import type {
  SwapToken,
  SwapParams,
} from "w3-kit/token-swap";

import type {
  NFT,
  NFTItem,
} from "w3-kit/nft-card";
```

## Storybook

The component library ships with a Storybook documentation site at [ui.w3-kit.com](https://ui.w3-kit.com). Every component has interactive stories demonstrating all props and variants, with a live controls panel to experiment in the browser.

## Source Code

All component source code is available on GitHub at [github.com/w3-kit/ui](https://github.com/w3-kit/ui). The components are intentionally written to be readable and copy-paste friendly — you can eject any component into your own codebase using `npx w3-kit add <component>`.
