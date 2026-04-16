# Introduction

w3-kit is an open-source toolkit for building Web3 interfaces. It provides a complete set of production-ready components, code recipes, a data registry, smart contract templates, and educational guides — all designed to work together as a cohesive ecosystem.

## Why w3-kit?

Building Web3 UIs is hard. Every project repeats the same patterns: connecting wallets, displaying balances, building swap interfaces, handling transaction states. w3-kit packages those solved problems into reusable, well-designed primitives so you can focus on what makes your dApp unique.

The toolkit is built on three principles:

- **Bring your own logic.** Components are pure UI — they accept data and callbacks via props. You control the wallet connection, RPC calls, and state management.
- **No vendor lock-in.** Works with wagmi, viem, ethers, @solana/web3.js, or any stack you choose.
- **Open by default.** The entire codebase is MIT-licensed and designed for copy-paste adoption.

## Ecosystem Overview

### UI Library (`w3-kit/ui`)

27+ production-ready React components covering wallets, DeFi, NFTs, data display, and utilities. Every component is themeable via CSS variables, keyboard accessible, and ships with TypeScript types.

```tsx
import { ConnectWallet, TokenSwap } from "w3-kit";
```

### Registry (`@w3-kit/registry`)

A structured data package containing chain metadata, token lists, and protocol information. Use it to populate your components without manually maintaining chain configs.

```ts
import { chains, tokens } from "@w3-kit/registry";
```

### CLI (`w3-kit`)

A command-line tool for scaffolding new projects and adding individual components to existing ones.

```bash
npx w3-kit init
npx w3-kit add token-swap
```

### Contracts (`@w3-kit/contracts`)

Auditable smart contract templates for EVM (Foundry) and Solana (Anchor). Ready-to-deploy starting points for common Web3 patterns.

### Learn (`@w3-kit/learn`)

Concept guides, code recipes, and glossary entries covering the essential knowledge needed to build on EVM and Solana chains.

## Who Is It For?

w3-kit is aimed at frontend developers who know React and TypeScript but are new to — or still learning — Web3. It lowers the barrier to building professional dApps without hiding the underlying blockchain mechanics.

Experienced Web3 developers benefit too: the component library eliminates repetitive UI work, and the registry saves time maintaining chain and token data.

## Getting Started

Head to the [Installation](/docs/installation) guide to set up your first project, or browse the [UI Library](/docs/ui-library) to see all available components.
