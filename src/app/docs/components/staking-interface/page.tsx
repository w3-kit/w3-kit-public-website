"use client";

import React, { useState } from "react";
import { StakingInterface } from "./component";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";
import { TOKEN_CONFIGS } from "@/config/tokens";

export default function StakingInterfacePage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'compact'>('default');
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");

  // Mock data for staking pools using TOKEN_CONFIGS
  const mockPools = [
    // {
    //   id: '1',
    //   name: 'ETH 2.0 Staking',
    //   token: {
    //     symbol: TOKEN_CONFIGS.ETH.symbol,
    //     logoURI: TOKEN_CONFIGS.ETH.logoURI,
    //     decimals: TOKEN_CONFIGS.ETH.decimals
    //   },
    //   apr: 4.5,
    //   minStake: '32',
    //   lockPeriod: 365,
    //   totalStaked: '1250000'
    // },
    {
      id: '2',
      name: 'USDC Yield Pool',
      token: {
        symbol: TOKEN_CONFIGS.USDC.symbol,
        logoURI: TOKEN_CONFIGS.USDC.logoURI,
        decimals: TOKEN_CONFIGS.USDC.decimals
      },
      apr: 8.2,
      minStake: '100',
      lockPeriod: 30,
      totalStaked: '5000000'
    },
    {
      id: '3',
      name: 'BTC Liquidity Pool',
      token: {
        symbol: TOKEN_CONFIGS.BTC.symbol,
        logoURI: TOKEN_CONFIGS.BTC.logoURI,
        decimals: TOKEN_CONFIGS.BTC.decimals
      },
      apr: 6.5,
      minStake: '0.1',
      lockPeriod: 90,
      totalStaked: '2500'
    },
    {
      id: '4',
      name: 'MATIC Staking',
      token: {
        symbol: TOKEN_CONFIGS.MATIC.symbol,
        logoURI: TOKEN_CONFIGS.MATIC.logoURI,
        decimals: TOKEN_CONFIGS.MATIC.decimals
      },
      apr: 12.5,
      minStake: '1000',
      lockPeriod: 180,
      totalStaked: '10000000'
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Staking Interface
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A flexible staking interface component for managing multiple staking pools with support for staking and unstaking operations.
          </p>
        </div>

        {/* Variant Selector */}
        <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-800">
          {(['default', 'compact'] as const).map((variant) => (
            <button
              key={variant}
              onClick={() => setSelectedVariant(variant)}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                selectedVariant === variant
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </button>
          ))}
        </div>

        {/* Preview/Code Section */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab("preview")}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ${
                activeTab === "preview"
                  ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ${
                activeTab === "code"
                  ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Code className="mr-2 h-4 w-4" />
              Code
            </button>
          </div>

          <div className="rounded-lg overflow-hidden">
            {activeTab === "preview" ? (
              <div className="p-4 bg-gray-50 dark:bg-gray-900">
                <StakingInterface
                  pools={mockPools}
                  userBalance="2.5"
                  variant={selectedVariant}
                  onStake={(poolId, amount) => console.log("Staking:", { poolId, amount })}
                  onUnstake={(poolId, amount) => console.log("Unstaking:", { poolId, amount })}
                />
              </div>
            ) : (
              <CodeBlock
                code={`import { StakingInterface } from "@w3-kit/staking-interface";
import { TOKEN_CONFIGS } from "@/config/tokens";

const pools = ${JSON.stringify(mockPools.slice(0, 1), null, 2)};

export default function Page() {
  return (
    <StakingInterface
      pools={pools}
      userBalance="2.5"
      variant="${selectedVariant}"
      onStake={(poolId, amount) => {
        console.log("Staking:", { poolId, amount });
      }}
      onUnstake={(poolId, amount) => {
        console.log("Unstaking:", { poolId, amount });
      }}
    />
  );
}`}
                id="component"
              />
            )}
          </div>
        </div>

        {/* Installation Section */}
        <div className="space-y-4 mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-semibold border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-900 dark:text-white">
            Installation
          </h2>

          <div className="space-y-4">
            <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setInstallTab("cli")}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  installTab === "cli"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                CLI
              </button>
              <button
                onClick={() => setInstallTab("manual")}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  installTab === "manual"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                Manual
              </button>
            </div>

            <div className="mt-4">
              {installTab === "cli" ? (
                <CodeBlock code="npx w3-kit@latest add staking-interface" id="cli" />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      1. Install the package using npm:
                    </p>
                    <CodeBlock code="npm install @w3-kit/staking-interface" id="npm" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      2. Import and use the component:
                    </p>
                    <CodeBlock
                      code={`import { StakingInterface } from "@w3-kit/staking-interface";
import { TOKEN_CONFIGS } from "@/config/tokens";

const pools = [
  {
    id: '1',
    name: 'ETH Staking Pool',
    token: {
      symbol: TOKEN_CONFIGS.ETH.symbol,
      logoURI: TOKEN_CONFIGS.ETH.logoURI,
      decimals: TOKEN_CONFIGS.ETH.decimals
    },
    apr: 5.5,
    minStake: '0.1',
    lockPeriod: 30,
    totalStaked: '1250.45'
  }
];

export default function Page() {
  return (
    <StakingInterface
      pools={pools}
      userBalance="2.5"
      onStake={(poolId, amount) => {
        console.log("Staking:", { poolId, amount });
      }}
      onUnstake={(poolId, amount) => {
        console.log("Unstaking:", { poolId, amount });
      }}
    />
  );
}`}
                      id="usage"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
