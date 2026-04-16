import type { GuideMeta } from "./types";

// Raw markdown imports from the learn repo
import whatIsAWallet from "@learn/guides/concepts/what-is-a-wallet.md?raw";
import whatAreSmartContracts from "@learn/guides/concepts/what-are-smart-contracts.md?raw";
import accountsModel from "@learn/guides/concepts/accounts-model.md?raw";
import howTransactionsWork from "@learn/guides/concepts/how-transactions-work.md?raw";
import publicVsPrivateKeys from "@learn/guides/concepts/public-vs-private-keys.md?raw";
import gasExplained from "@learn/guides/evm/gas-explained.md?raw";
import pdasExplained from "@learn/guides/solana/pdas-explained.md?raw";
import top10Vulnerabilities from "@learn/guides/security/top-10-vulnerabilities.md?raw";
import glossary from "@learn/guides/glossary/glossary.md?raw";

export const guideRegistry: GuideMeta[] = [
  {
    id: "what-is-a-wallet",
    title: "What Is a Wallet?",
    description:
      "Understand what a blockchain wallet is, how it stores keys (not coins), and how it interacts with the network.",
    category: "concepts",
    slug: "what-is-a-wallet",
    content: whatIsAWallet,
  },
  {
    id: "what-are-smart-contracts",
    title: "What Are Smart Contracts?",
    description:
      "Learn what smart contracts are, how they self-execute on-chain, and why they power DeFi, NFTs, and more.",
    category: "concepts",
    slug: "what-are-smart-contracts",
    content: whatAreSmartContracts,
  },
  {
    id: "accounts-model",
    title: "Accounts Model",
    description:
      "Explore the account-based model used by EVM chains and Solana, and how state is stored on-chain.",
    category: "concepts",
    slug: "accounts-model",
    content: accountsModel,
  },
  {
    id: "how-transactions-work",
    title: "How Transactions Work",
    description:
      "A step-by-step breakdown of the transaction lifecycle — from signing to inclusion in a block.",
    category: "concepts",
    slug: "how-transactions-work",
    content: howTransactionsWork,
  },
  {
    id: "public-vs-private-keys",
    title: "Public vs Private Keys",
    description:
      "Demystify asymmetric cryptography: what public and private keys are, and why you must never share your private key.",
    category: "concepts",
    slug: "public-vs-private-keys",
    content: publicVsPrivateKeys,
  },
  {
    id: "gas-explained",
    title: "Gas Explained",
    description:
      "Understand EVM gas — base fees, priority fees, EIP-1559, and how to estimate costs for your transactions.",
    category: "evm",
    slug: "gas-explained",
    content: gasExplained,
  },
  {
    id: "pdas-explained",
    title: "Program Derived Addresses (PDAs)",
    description:
      "Learn how Solana PDAs work, how they are derived from seeds, and why they are central to Anchor programs.",
    category: "solana",
    slug: "pdas-explained",
    content: pdasExplained,
  },
  {
    id: "top-10-vulnerabilities",
    title: "Top 10 Smart Contract Vulnerabilities",
    description:
      "A practical overview of the most common smart contract attack vectors — reentrancy, overflow, access control, and more.",
    category: "security",
    slug: "top-10-vulnerabilities",
    content: top10Vulnerabilities,
  },
  {
    id: "glossary",
    title: "Web3 Glossary",
    description:
      "A comprehensive reference of Web3 terminology — from ABI and ERC standards to validators and zero-knowledge proofs.",
    category: "glossary",
    slug: "glossary",
    content: glossary,
  },
];
