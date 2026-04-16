# Components API

Detailed prop reference for the most frequently used w3-kit components.

## ConnectWallet

The multi-wallet connection widget.

```ts
import { ConnectWallet } from "w3-kit";
```

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `wallets` | `WalletOption[]` | Yes | — | List of wallets to display |
| `connectedAccount` | `ConnectedAccount \| null` | No | `null` | Connected account data. `null` shows the wallet picker |
| `onConnect` | `(walletId: string) => void` | Yes | — | Called when user selects a wallet |
| `onDisconnect` | `() => void` | No | — | Called when user clicks disconnect |
| `chains` | `Chain[]` | No | — | Supported chains for the chain switcher |
| `activeChain` | `Chain` | No | — | Currently active chain |
| `onChainSwitch` | `(chainId: number) => void` | No | — | Called when user switches chain |
| `recentWalletId` | `string` | No | — | ID of the last used wallet (shown highlighted) |
| `variant` | `"default" \| "compact"` | No | `"default"` | `compact` renders a button that opens a picker dialog |
| `loading` | `boolean` | No | `false` | Show loading state on the selected wallet |
| `className` | `string` | No | — | Additional CSS classes |

### Types

```ts
interface WalletOption {
  id: string;
  name: string;
  icon: string;
  ecosystem: "evm" | "solana";
}

interface ConnectedAccount {
  address: string;
  ensName?: string;
  balance?: string;
  chainId?: number;
}
```

---

## TokenSwap

Swap widget with token selectors and rate display.

```ts
import { TokenSwap } from "w3-kit";
```

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `tokens` | `SwapToken[]` | Yes | — | Available tokens for selection |
| `fromToken` | `SwapToken` | No | — | Currently selected source token |
| `toToken` | `SwapToken` | No | — | Currently selected destination token |
| `onSwap` | `(params: SwapParams) => void` | Yes | — | Called when user confirms the swap |
| `onFromTokenChange` | `(token: SwapToken) => void` | No | — | Called when source token changes |
| `onToTokenChange` | `(token: SwapToken) => void` | No | — | Called when destination token changes |
| `exchangeRate` | `number` | No | — | How many `toTokens` per 1 `fromToken` |
| `slippage` | `number` | No | — | Slippage tolerance percentage |
| `loading` | `boolean` | No | `false` | Loading state on the swap button |
| `className` | `string` | No | — | Additional CSS classes |

### Types

```ts
interface SwapToken {
  symbol: string;
  name: string;
  logoURI?: string;
  balance?: string;
  price?: number;
}

interface SwapParams {
  from: SwapToken;
  to: SwapToken;
  amount: string;
}
```

---

## NetworkSwitcher

Chain selector with testnet toggle and optional search.

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `networks` | `Network[]` | Yes | — | All available networks |
| `activeChainId` | `number` | No | — | Currently active chain ID |
| `onSwitch` | `(chainId: number) => void \| Promise<void>` | Yes | — | Called when user selects a network |
| `searchable` | `boolean` | No | `false` | Show search input |
| `showTestnetToggle` | `boolean` | No | — | Show testnet toggle |
| `switchingTo` | `number` | No | — | Chain ID being switched to (shows spinner) |
| `className` | `string` | No | — | Additional CSS classes |

---

## TransactionHistory

Transaction list with type icons, status badges, and truncated addresses.

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `transactions` | `Transaction[]` | Yes | — | Transactions to display |
| `onTransactionClick` | `(tx: Transaction) => void` | No | — | Called when user clicks a transaction row |
| `className` | `string` | No | — | Additional CSS classes |

### Types

```ts
interface Transaction {
  hash: string;
  type: "send" | "receive" | "swap" | "contract";
  status: "pending" | "confirmed" | "failed";
  value: string;
  token?: string;
  from: string;
  to: string;
  timestamp: number;
}
```

---

## NftCard

NFT display card with image, collection badge, price, and attributes.

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `nft` | `NFT` | Yes | — | NFT data object |
| `onClick` | `(nft: NFT) => void` | No | — | Called when the card is clicked |
| `className` | `string` | No | — | Additional CSS classes |

### Types

```ts
interface NFT {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  collection: string;
  owner?: string;
  price?: string;
  currency?: string;
  attributes?: NFTAttribute[];
}

interface NFTAttribute {
  trait_type: string;
  value: string;
}
```

---

## GasCalculator

Gas estimation widget with speed presets and USD cost display.

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `speeds` | `GasSpeed[]` | Yes | — | Speed options with cost data |
| `selectedSpeed` | `string` | No | — | Currently selected speed ID |
| `onSelect` | `(speedId: string) => void` | No | — | Called when user selects a speed |
| `ethPrice` | `number` | No | — | ETH price in USD for cost calculation |
| `className` | `string` | No | — | Additional CSS classes |

### Types

```ts
interface GasSpeed {
  id: string;
  name: string;           // "Economy" | "Standard" | "Fast"
  gwei: number;
  estimatedTime: string;  // "~2 min" | "~30 sec" | "~10 sec"
  costEth: number;
}
```
