# Registry

The `@w3-kit/registry` package provides structured, queryable data about blockchain networks, tokens, and protocols. Use it to populate components with real data without maintaining your own chain configs or token lists.

## Installation

```bash
npm install @w3-kit/registry
```

## Chain Data

### Get a single chain

```ts
import { getChain } from "@w3-kit/registry";

const ethereum = getChain(1);
// {
//   id: 1,
//   name: "Ethereum",
//   symbol: "ETH",
//   rpcUrls: ["https://eth.llamarpc.com"],
//   blockExplorer: "https://etherscan.io",
//   logoURI: "...",
//   testnet: false,
// }
```

### Get all chains

```ts
import { chains, getMainnetChains, getTestnetChains } from "@w3-kit/registry";

const allChains = chains;
const mainnets = getMainnetChains();
const testnets = getTestnetChains();
```

### Supported chains

The registry includes data for all major EVM networks and Solana clusters:

**EVM Mainnets:** Ethereum, Polygon, Arbitrum One, Arbitrum Nova, Optimism, Base, Avalanche C-Chain, BNB Smart Chain, Fantom, Celo, Gnosis, zkSync Era, Linea, Scroll, Mantle, Blast, Mode

**EVM Testnets:** Sepolia, Goerli (deprecated), Polygon Mumbai, Arbitrum Sepolia, Base Sepolia, Optimism Sepolia

**Solana:** Mainnet Beta, Devnet, Testnet

## Token Data

### Get tokens for a chain

```ts
import { getTokensForChain } from "@w3-kit/registry";

const tokens = getTokensForChain(1); // Ethereum
// Returns Token[] with symbol, name, address, decimals, logoURI
```

### Find a token by address

```ts
import { getToken } from "@w3-kit/registry";

const usdc = getToken(1, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48");
```

### Search tokens

```ts
import { searchTokens } from "@w3-kit/registry";

const results = searchTokens(1, "USD"); // Search by name or symbol
```

## Wiring the Registry to Components

The registry data shape is designed to map directly to w3-kit component props:

```tsx
import { getMainnetChains, getTokensForChain } from "@w3-kit/registry";
import { NetworkSwitcher, TokenSwap } from "w3-kit";

const chains = getMainnetChains();
const tokens = getTokensForChain(activeChainId);

<NetworkSwitcher
  networks={chains}
  activeChainId={activeChainId}
  onSwitch={handleChainSwitch}
/>

<TokenSwap
  tokens={tokens}
  onSwap={executeSwap}
/>
```

## Custom Registry

You can extend the registry with your own chain or token data:

```ts
import { createRegistry } from "@w3-kit/registry";

const registry = createRegistry({
  chains: [
    ...defaultChains,
    {
      id: 31337,
      name: "Hardhat Local",
      symbol: "ETH",
      rpcUrls: ["http://localhost:8545"],
      testnet: true,
    },
  ],
  tokens: {
    31337: [
      {
        symbol: "MOCK",
        name: "Mock Token",
        address: "0x...",
        decimals: 18,
      },
    ],
  },
});

export const { getChain, getTokensForChain } = registry;
```

## Data Sources

The registry data is sourced from and validated against:

- Ethereum token lists standard (EIP-1155 token list format)
- ChainList.org chain data
- Official chain documentation

Token logos are served from a CDN and cached. The registry is updated weekly via an automated pipeline that pulls the latest data from each source.

## Versioning

The registry follows semantic versioning. Chain IDs and token contract addresses are considered stable. Adding new chains or tokens is a minor version bump. Removing data (rare) is a major version bump.

```bash
# Pin to a specific version for stability
npm install @w3-kit/registry@1.2.0
```
