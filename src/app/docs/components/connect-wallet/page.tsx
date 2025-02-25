"use client";

import React, { useState } from "react";
import { ConnectWalletButton } from "./component";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";

type WalletTab = "metamask" | "walletconnect" | "coinbase";

export default function ConnectWalletPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [walletTab, setWalletTab] = useState<WalletTab>("metamask");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Connect Wallet
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A customizable button component that handles wallet connections with built-in support for multiple providers.
          </p>
        </div>

        <div className="border rounded-lg overflow-hidden dark:border-gray-800">
          <div className="border-b dark:border-gray-800">
            <div className="flex">
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-4 py-2 flex items-center gap-2 ${
                  activeTab === "preview"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <Eye size={20} />
                Preview
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`px-4 py-2 flex items-center gap-2 ${
                  activeTab === "code"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <Code size={20} />
                Code
              </button>
            </div>
          </div>

          <div className="p-4">
            {activeTab === "preview" ? (
              <div className="space-y-6">
                {/* Wallet Type Tabs */}
                <div className="flex gap-2 border-b dark:border-gray-800">
                  <button
                    onClick={() => setWalletTab("metamask")}
                    className={`px-4 py-2 text-sm font-medium ${
                      walletTab === "metamask"
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    MetaMask
                  </button>
                  <button
                    onClick={() => setWalletTab("walletconnect")}
                    className={`px-4 py-2 text-sm font-medium ${
                      walletTab === "walletconnect"
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    WalletConnect
                  </button>
                  <button
                    onClick={() => setWalletTab("coinbase")}
                    className={`px-4 py-2 text-sm font-medium ${
                      walletTab === "coinbase"
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    Coinbase
                  </button>
                </div>

                {/* Button Variants */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {walletTab === "metamask" 
                      ? "MetaMask" 
                      : walletTab === "walletconnect" 
                        ? "WalletConnect" 
                        : "Coinbase"} Variants
                  </h3>
                  <div className="grid gap-4">
                    <ConnectWalletButton
                      variant="ghost"
                      walletType={walletTab}
                      onConnect={(address) => console.log('Connected:', address)}
                    />
                    <ConnectWalletButton
                      variant="light"
                      walletType={walletTab}
                      onConnect={(address) => console.log('Connected:', address)}
                    />
                    <ConnectWalletButton
                      variant="dark"
                      walletType={walletTab}
                      onConnect={(address) => console.log('Connected:', address)}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <CodeBlock code={`// Component code will be here`} id="component" />
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
                <CodeBlock code="npx w3-kit@latest add connect-wallet" id="cli" />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      1. Install the package using npm:
                    </p>
                    <CodeBlock code="npm install @w3-kit/connect-wallet" id="npm" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      2. Import and use the component:
                    </p>
                    <CodeBlock
                      code={`import { ConnectWalletButton } from "@w3-kit/connect-wallet";

export default function Page() {
  return (
    <ConnectWalletButton
      onConnect={(provider) => {
        console.log('Connected:', provider);
      }}
      customProviders={[
        // Add your custom providers here
      ]}
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
