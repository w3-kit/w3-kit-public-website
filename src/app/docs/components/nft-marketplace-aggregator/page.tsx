"use client";

import React, { useState, useCallback } from "react";
import { NFTMarketplaceAggregator } from "./component";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";

export default function NFTMarketplaceAggregatorPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'compact'>('default');
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Debounced search handler
  const handleSearch = useCallback(async (query: string) => {
    console.log("Searching NFTs:", query);
    setSearchHistory(prev => {
      const newHistory = [...prev, `Searched: ${query} at ${new Date().toLocaleTimeString()}`];
      // Keep only the last 5 searches
      return newHistory.slice(-5);
    });
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            NFT Marketplace Aggregator
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Compare and aggregate NFT listings across multiple marketplaces with price tracking and market analysis.
          </p>
        </div>

        {/* Variant Selector */}
        <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-800">
          {(['default'] as const).map((variant) => (
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
                <NFTMarketplaceAggregator
                
                  onSearch={handleSearch}
                />

                {/* Search history display */}
                {searchHistory.length > 0 && (
                  <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Search History</h3>
                    <div className="bg-white dark:bg-gray-800 rounded-md p-3 text-sm">
                      <ul className="space-y-1">
                        {searchHistory.map((item, index) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <CodeBlock
                code={`import { NFTMarketplaceAggregator } from "@w3-kit/nft-marketplace-aggregator";

export default function Page() {
  const handleSearch = async (query: string) => {
    try {
      // Implement your search logic here
      const results = await searchNFTs(query);
      console.log("Search results:", results);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <NFTMarketplaceAggregator
      variant="default"
      onSearch={handleSearch}
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
                <CodeBlock code="npx w3-kit@latest add nft-marketplace-aggregator" id="cli" />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      1. Install the package using npm:
                    </p>
                    <CodeBlock code="npm install @w3-kit/nft-marketplace-aggregator" id="npm" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      2. Import and use the component:
                    </p>
                    <CodeBlock
                      code={`import { NFTMarketplaceAggregator } from "@w3-kit/nft-marketplace-aggregator";

export default function Page() {
  return (
    <NFTMarketplaceAggregator
      onSearch={async (query) => {
        const results = await searchNFTs(query);
        console.log("NFT search results:", results);
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

        {/* Features Section */}
        <div className="space-y-4 mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-semibold border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-900 dark:text-white">
            Features
          </h2>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Price Comparison</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Compare NFT prices across multiple marketplaces to find the best deals.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Market Analytics</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track price history, rarity scores, and market trends for NFTs.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Multi-marketplace Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Aggregate listings from major NFT marketplaces in one interface.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Advanced Filtering</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sort and filter NFTs by price, rarity, marketplace, and more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
