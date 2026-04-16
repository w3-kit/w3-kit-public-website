# Hooks & Utilities

w3-kit exports a collection of utility hooks and helper functions for common Web3 UI patterns.

## Hooks

### `useClipboard`

Copy a string to the clipboard with automatic reset after a configurable delay.

```ts
import { useClipboard } from "w3-kit/hooks";

function AddressDisplay({ address }: { address: string }) {
  const { copied, copy } = useClipboard(1500);

  return (
    <button onClick={() => copy(address)}>
      {copied ? "Copied!" : address.slice(0, 6) + "..."}
    </button>
  );
}
```

**Returns:**
- `copied: boolean` — `true` for the duration of the timeout after copying
- `copy: (text: string) => void` — trigger the copy

---

### `useWalletShortAddress`

Format a full wallet address into a shortened display form.

```ts
import { useWalletShortAddress } from "w3-kit/hooks";

const short = useWalletShortAddress("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
// "0xd8dA...6045"
```

**Options:**
```ts
useWalletShortAddress(address, { prefixChars: 6, suffixChars: 4 });
```

---

### `useCountdown`

Countdown timer to a target timestamp. Useful for vesting cliffs, auction deadlines, and lock periods.

```ts
import { useCountdown } from "w3-kit/hooks";

function VestingTimer({ cliffTimestamp }: { cliffTimestamp: number }) {
  const { days, hours, minutes, seconds, expired } = useCountdown(cliffTimestamp);

  if (expired) return <span>Vesting active</span>;
  return <span>{days}d {hours}h {minutes}m remaining</span>;
}
```

---

### `useTokenPrice`

Fetch a token price from the Coingecko public API with caching via React Query.

```ts
import { useTokenPrice } from "w3-kit/hooks";

const { data: price, isLoading } = useTokenPrice("ethereum");
// price: number | undefined
```

Requires `@tanstack/react-query` to be installed and a `QueryClientProvider` in your tree.

---

### `useChainName`

Resolve a chain ID to its human-readable name using the registry.

```ts
import { useChainName } from "w3-kit/hooks";

const name = useChainName(137); // "Polygon"
```

---

### `useMediaQuery`

Reactive breakpoint detection.

```ts
import { useMediaQuery } from "w3-kit/hooks";

const isMobile = useMediaQuery("(max-width: 768px)");
const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
```

---

## Utility Functions

### `formatAddress`

Shorten a wallet address for display.

```ts
import { formatAddress } from "w3-kit/utils";

formatAddress("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
// "0xd8dA...6045"

formatAddress("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", 8, 6);
// "0xd8dA6BF2...96045"
```

---

### `formatBalance`

Format a token balance with appropriate decimal places and optional token symbol.

```ts
import { formatBalance } from "w3-kit/utils";

formatBalance("1234567890000000000", 18); // "1.234"
formatBalance("1234567890000000000", 18, { symbol: "ETH", decimals: 4 }); // "1.2346 ETH"
formatBalance("1000000", 6); // "1.00" (USDC)
```

---

### `formatUsd`

Format a number as a USD currency string.

```ts
import { formatUsd } from "w3-kit/utils";

formatUsd(1234.56);      // "$1,234.56"
formatUsd(0.0034);       // "$0.003400"
formatUsd(1000000);      // "$1,000,000.00"
formatUsd(1234.56, { compact: true }); // "$1.2K"
```

---

### `formatPercent`

Format a percentage with sign and configurable decimal places.

```ts
import { formatPercent } from "w3-kit/utils";

formatPercent(4.567);    // "+4.57%"
formatPercent(-1.2);     // "-1.20%"
formatPercent(0);        // "0.00%"
```

---

### `parseUnits` / `formatUnits`

Re-exported from `viem` for convenience. Convert between human-readable and on-chain token amounts.

```ts
import { parseUnits, formatUnits } from "w3-kit/utils";

parseUnits("1.5", 18);  // 1500000000000000000n
formatUnits(1500000000000000000n, 18); // "1.5"
```

---

### `isAddress`

Check if a string is a valid EVM address.

```ts
import { isAddress } from "w3-kit/utils";

isAddress("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"); // true
isAddress("not-an-address"); // false
```

---

### `getChainColor`

Get the brand color for a chain ID from the design token system.

```ts
import { getChainColor } from "w3-kit/utils";

getChainColor(1);   // "#627EEA" (Ethereum)
getChainColor(137); // "#8247E5" (Polygon)
```
