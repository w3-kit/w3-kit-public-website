# CLI Commands

Complete reference for all `w3-kit` CLI commands and their options.

## Global Options

These options are available on every command:

| Option | Description |
|--------|-------------|
| `--help`, `-h` | Show help text for the command |
| `--version`, `-v` | Print the CLI version |
| `--silent` | Suppress all output except errors |
| `--debug` | Print verbose debug output |

---

## `w3-kit init`

Scaffold a new w3-kit project.

```bash
npx w3-kit init [project-name] [options]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `project-name` | Directory name and `package.json` name. Prompted if not provided. |

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--framework` | `vite \| next \| tanstack` | Prompted | Frontend framework |
| `--chains` | `string[]` | Prompted | Comma-separated chain names to configure |
| `--features` | `string[]` | Prompted | Features to include (swap, bridge, nft, staking) |
| `--package-manager` | `npm \| yarn \| pnpm \| bun` | Detected | Package manager to use |
| `--no-git` | — | — | Skip git initialization |
| `--no-install` | — | — | Skip dependency installation |
| `--template` | `string` | `default` | Starter template name |
| `--yes`, `-y` | — | — | Accept all defaults without prompting |

### Examples

```bash
# Interactive scaffolding
npx w3-kit init my-dapp

# Non-interactive
npx w3-kit init my-dapp --framework vite --chains ethereum,polygon --yes

# With a specific template
npx w3-kit init my-nft-app --template nft-marketplace
```

---

## `w3-kit add`

Add one or more components to an existing project.

```bash
npx w3-kit add <component> [components...] [options]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `component` | Component ID(s) to add. Separate multiple with spaces. |

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--output-dir` | `string` | `src/components/w3-kit` | Directory to copy component into |
| `--overwrite` | — | — | Overwrite existing files without prompting |
| `--no-deps` | — | — | Skip peer dependency installation |
| `--yes`, `-y` | — | — | Accept all prompts automatically |

### Examples

```bash
# Add a single component
npx w3-kit add token-swap

# Add multiple components
npx w3-kit add nft-card nft-collection-grid nft-marketplace-aggregator

# Add to a custom directory
npx w3-kit add connect-wallet --output-dir src/ui/blockchain

# Overwrite without prompting (useful in CI)
npx w3-kit add token-swap --overwrite --yes
```

### Available Components

Run `npx w3-kit list` to see the full list. Component IDs match the npm import name:

- `connect-wallet`, `network-switcher`, `wallet-balance`, `address-book`, `multisig-wallet`
- `token-swap`, `staking-interface`, `bridge`, `defi-position-manager`, `flash-loan-executor`, `limit-order-manager`, `liquidity-pool-stats`
- `nft-card`, `nft-collection-grid`, `nft-marketplace-aggregator`
- `asset-portfolio`, `price-ticker`, `token-card`, `token-list`, `transaction-history`
- `smart-contract-scanner`, `contract-interaction`, `ens-resolver`, `gas-calculator`, `subscription-payments`, `token-airdrop`, `token-vesting`

---

## `w3-kit list`

List all available components.

```bash
npx w3-kit list [options]
```

### Options

| Option | Type | Description |
|--------|------|-------------|
| `--category` | `wallet \| defi \| nft \| data \| utility` | Filter by category |
| `--json` | — | Output as JSON |

---

## `w3-kit update`

Update previously added components to the latest version.

```bash
npx w3-kit update [component] [options]
```

### Options

| Option | Description |
|--------|-------------|
| `--all` | Update all w3-kit components in the project |
| `--dry-run` | Show what would change without applying updates |
| `--yes`, `-y` | Accept all updates without prompting |

---

## `w3-kit contract add`

Add a smart contract template to your project.

```bash
npx w3-kit contract add <template> [options]
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--chain` | `evm \| solana` | `evm` | Target chain ecosystem |
| `--output-dir` | `string` | `contracts/` | Output directory |

### Available Templates

**EVM:** `erc20-token`, `erc721-collection`, `staking`, `multisig`, `token-vesting`, `dao-governor`

**Solana:** `spl-token`, `nft-collection`, `staking-program`, `pda-storage`

---

## `w3-kit doctor`

Diagnose common configuration issues in a w3-kit project.

```bash
npx w3-kit doctor
```

Checks:

- Node.js and npm versions
- Peer dependency compatibility
- CSS variable import presence
- TypeScript path alias configuration
- Vite plugin configuration
