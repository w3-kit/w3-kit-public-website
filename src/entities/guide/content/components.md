# Components

w3-kit ships 27+ production-ready components across five categories. Every component follows the same design contract: **accept data and callbacks via props, return pure JSX, own no async state internally.**

## Component Philosophy

### Pure UI, your logic

Components render whatever you pass in. They do not make RPC calls, import wallet libraries, or hold global state. This makes them testable, portable, and framework-agnostic at the integration layer.

```tsx
// You own the data fetching and state
const { data: balance } = useBalance({ address });

// Component just renders it
<WalletBalance tokens={balance.tokens} onSend={handleSend} />
```

### Controlled by default

Most components expose a controlled API. You manage the state, and the component fires callbacks when the user acts. This prevents hidden state bugs and makes debugging straightforward.

## Component Categories

### Wallet (5 components)

| Component | Description |
|-----------|-------------|
| `ConnectWallet` | Multi-wallet picker with connected state, chain switching, and disconnect |
| `NetworkSwitcher` | Chain selector with testnet toggle and search |
| `WalletBalance` | Portfolio overview with allocation bar and token list |
| `AddressBook` | Saved addresses with ENS support and CRUD operations |
| `MultisigWallet` | Multi-sig transaction list with approval flows |

### DeFi (7 components)

| Component | Description |
|-----------|-------------|
| `TokenSwap` | Swap widget with token selectors and exchange rate display |
| `StakingInterface` | Staking pool list with APR and stake/unstake actions |
| `Bridge` | Cross-chain bridge UI with network and token selectors |
| `DeFiPositionManager` | Position list with health factor and risk badges |
| `FlashLoanExecutor` | Flash loan UI with protocol selector and fee calculation |
| `LimitOrderManager` | Order management with tab filtering and cancel |
| `LiquidityPoolStats` | Pool stats card with TVL, volume, and APR |

### NFT (3 components)

| Component | Description |
|-----------|-------------|
| `NftCard` | NFT display with image, attributes, and price |
| `NftCollectionGrid` | Responsive NFT grid with configurable columns |
| `NftMarketplaceAggregator` | Multi-marketplace listings with best-price detection |

### Data (5 components)

| Component | Description |
|-----------|-------------|
| `AssetPortfolio` | Portfolio overview with allocation visualization |
| `PriceTicker` | Token price table with 24h change indicators |
| `TokenCard` | Single token detail card |
| `TokenList` | Token table sorted by value |
| `TransactionHistory` | Transaction list with type icons and status badges |

### Utility (7 components)

| Component | Description |
|-----------|-------------|
| `SmartContractScanner` | Security audit results with score and check list |
| `ContractInteraction` | Wizard-based contract interaction with human-readable actions |
| `EnsResolver` | ENS name resolution with bidirectional lookup |
| `GasCalculator` | Gas estimation with speed presets and USD costs |
| `SubscriptionPayments` | Crypto subscription plan cards |
| `TokenAirdrop` | Airdrop list with claim flow and status badges |
| `TokenVesting` | Vesting schedule with progress bar and claim action |

## Basic Usage

Import components from the `w3-kit` package:

```tsx
import { ConnectWallet, TokenSwap, PriceTicker } from "w3-kit";
```

Or import individually for better tree-shaking:

```tsx
import { ConnectWallet } from "w3-kit/connect-wallet";
import { TokenSwap } from "w3-kit/token-swap";
```

## TypeScript Types

Each component exports its props type and any associated domain types:

```ts
import type { WalletOption, ConnectedAccount } from "w3-kit/connect-wallet";
import type { SwapToken } from "w3-kit/token-swap";
```

## Styling

Components use CSS variables for colors and design tokens. Override them in your CSS to apply your brand:

```css
:root {
  --w3-accent: #10B981;
  --w3-radius: 1rem;
}
```

See the [Theming](/docs/theming) and [Design Tokens](/docs/design-tokens) guides for the full token reference.
