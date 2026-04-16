# Project Structure

When you scaffold a new project with `npx w3-kit init`, the generated directory layout follows Feature-Sliced Design (FSD) conventions to keep code organized as the project grows.

## Generated Layout

```
my-dapp/
├── public/
│   └── icons/                  # Wallet and token icons
├── src/
│   ├── app/
│   │   ├── main.tsx            # React root, providers
│   │   └── styles.css          # Global CSS, token imports
│   ├── entities/               # Core domain objects
│   │   ├── wallet/
│   │   └── token/
│   ├── features/               # User-facing actions
│   │   ├── connect-wallet/
│   │   └── swap-tokens/
│   ├── pages/                  # Route-level components
│   │   ├── home/
│   │   └── portfolio/
│   ├── shared/
│   │   ├── lib/                # Utilities, helpers
│   │   ├── ui/                 # Shared UI primitives
│   │   └── config/             # App-level constants
│   └── widgets/                # Composed UI sections
│       ├── header/
│       └── sidebar/
├── w3-kit.config.ts            # w3-kit configuration
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Key Directories

### `src/app/`

The application entry point. This is where you configure providers (wallet adapter, React Query client, router) and import global styles.

### `src/entities/`

Data models and their associated UI for core domain concepts — wallets, tokens, chains, NFTs. Entities do not import from features or pages.

### `src/features/`

Encapsulated user interactions that combine an entity with some action — "connect wallet", "swap tokens", "mint NFT". Each feature owns its own state, API calls, and form logic.

### `src/pages/`

Route-level components assembled from widgets, features, and entities. Pages handle routing concerns only — they do not contain business logic directly.

### `src/shared/`

Cross-cutting code with no dependencies on the rest of the app: utility functions, base UI components, constants, and type helpers.

### `src/widgets/`

Larger UI compositions that appear across multiple pages — a full-page header with wallet connection, a sidebar with navigation, etc.

## Configuration Files

### `w3-kit.config.ts`

Controls which chains, tokens, and features are enabled in your project:

```ts
import { defineConfig } from "w3-kit/config";

export default defineConfig({
  chains: ["ethereum", "polygon", "solana"],
  features: {
    swap: true,
    bridge: false,
    nft: true,
  },
  theme: {
    accent: "#6366F1",
    radius: "0.75rem",
  },
});
```

### `vite.config.ts`

Standard Vite configuration. The `w3-kit init` scaffolder adds the necessary aliases and plugin configuration.

## When to Deviate

FSD is a recommendation, not a requirement. For small projects a flat `components/` and `pages/` structure works perfectly well. FSD pays off once you have 5+ features or multiple developers working in parallel.
