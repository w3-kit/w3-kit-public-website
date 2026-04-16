# Contracts

The `@w3-kit/contracts` package provides auditable smart contract templates for the most common Web3 patterns. Templates are available for EVM (Foundry) and Solana (Anchor).

## Overview

Contract templates are starting points, not drop-in production contracts. They are written for readability and educational clarity, and include NatSpec documentation, test scaffolding, and deployment scripts.

## EVM Contracts (Foundry)

### Prerequisites

```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### Available Templates

**ERC-20 Token**

A standard fungible token with optional mint/burn roles and a configurable supply cap.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract W3Token is ERC20, Ownable {
    uint256 public immutable maxSupply;

    constructor(
        string memory name,
        string memory symbol,
        uint256 _maxSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        maxSupply = _maxSupply;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= maxSupply, "Exceeds max supply");
        _mint(to, amount);
    }
}
```

**ERC-721 NFT Collection**

Standard NFT collection with configurable mint price, supply cap, base URI, and reveal mechanics.

**Staking Contract**

Time-locked staking with configurable APR, multiple staking pools, and reward distribution.

**Multisig Wallet**

M-of-N multi-signature wallet with transaction proposal, approval, and execution.

**Token Vesting**

Linear vesting with cliff, per-beneficiary schedules, and revocable grants.

### Using a Template

```bash
# Clone a template into your project
npx w3-kit contract add erc20-token
npx w3-kit contract add erc721-collection

# Run tests
forge test

# Deploy to local anvil node
anvil &
forge script script/Deploy.s.sol --rpc-url localhost --broadcast
```

### Project Structure

Templates follow the standard Foundry layout:

```
contracts/
├── src/
│   └── W3Token.sol
├── test/
│   └── W3Token.t.sol
├── script/
│   └── Deploy.s.sol
└── foundry.toml
```

## Solana Programs (Anchor)

### Prerequisites

```bash
# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Install Anchor
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked
```

### Available Templates

**SPL Token Mint**

Create a new SPL token with custom metadata using the Token Metadata program.

**NFT Collection**

Metaplex-compatible NFT collection with royalties and collection verification.

**Staking Program**

Delegated staking program with configurable unbonding period.

**Program Derived Address (PDA) Storage**

Template demonstrating idiomatic PDA usage for on-chain account storage.

### Using a Template

```bash
npx w3-kit contract add spl-token --chain solana
cd contracts/spl-token

# Build
anchor build

# Run tests
anchor test

# Deploy to devnet
anchor deploy --provider.cluster devnet
```

## Security Considerations

These templates have not been formally audited. Before deploying to mainnet:

1. Run a professional audit from a reputable security firm
2. Run all tests with 100% coverage: `forge coverage`
3. Fuzz critical functions: `forge test --fuzz-runs 10000`
4. Consider a bug bounty program before holding significant TVL

## OpenZeppelin Integration

EVM templates use OpenZeppelin contracts as dependencies for battle-tested implementations of standards:

```bash
forge install OpenZeppelin/openzeppelin-contracts
```

The templates are pinned to specific OpenZeppelin versions. Check the `foundry.toml` for the exact version before upgrading.
