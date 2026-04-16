# CLI

The `w3-kit` CLI is the fastest way to create new projects and add components to existing ones. It scaffolds opinionated project structures and copies component source code directly into your project.

## Installation

The CLI is available via `npx` — no global install required:

```bash
npx w3-kit <command>
```

Or install globally for convenience:

```bash
npm install -g w3-kit
w3-kit <command>
```

## Commands

### `init`

Scaffold a new w3-kit project:

```bash
npx w3-kit init [project-name]
```

Interactive prompts guide you through:

1. **Project name** — directory name and `package.json` name
2. **Framework** — React (Vite), Next.js, TanStack Start
3. **Chains** — which blockchain networks to configure
4. **Features** — swap, bridge, NFT, staking (configures providers and imports)
5. **Package manager** — npm, yarn, pnpm, bun

After scaffolding, the CLI installs dependencies and opens the project:

```bash
cd my-dapp
npm run dev
```

### `add`

Add one or more components to an existing project:

```bash
npx w3-kit add <component> [components...]
```

Examples:

```bash
npx w3-kit add token-swap
npx w3-kit add nft-card nft-collection-grid
npx w3-kit add connect-wallet network-switcher wallet-balance
```

The `add` command:

1. Copies the component source into `src/components/w3-kit/`
2. Installs any missing peer dependencies
3. Prints an import snippet to get started immediately

### `list`

List all available components:

```bash
npx w3-kit list
```

Filter by category:

```bash
npx w3-kit list --category defi
npx w3-kit list --category nft
```

### `update`

Update components you have added to your project to the latest version:

```bash
npx w3-kit update token-swap
npx w3-kit update --all
```

The update command diffs the current source against the latest version and applies non-conflicting changes. For components you have customized, it shows a diff and lets you choose which updates to apply.

## Configuration

The CLI reads `w3-kit.config.ts` from your project root to determine default behavior (chains, target directory, package manager).

Set the output directory for `add` commands:

```ts
// w3-kit.config.ts
import { defineConfig } from "w3-kit/config";

export default defineConfig({
  outputDir: "src/components/ui",  // default: src/components/w3-kit
});
```

## Non-interactive Mode

For CI/CD pipelines, pass flags to skip interactive prompts:

```bash
npx w3-kit init my-dapp \
  --framework vite \
  --chains ethereum,polygon \
  --package-manager pnpm \
  --no-git
```

```bash
npx w3-kit add token-swap \
  --yes \
  --output-dir src/ui/web3
```

See the [CLI Commands reference](/docs/cli-commands) for the full list of flags.
