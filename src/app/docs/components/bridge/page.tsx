"use client";

import React from "react";
import { BridgeWidget } from "./component";
import type { Network } from "./component";

export default function BridgeComponent() {
  const handleBridge = async (params: {
    fromNetwork: Network;
    toNetwork: Network;
    token: "ETH" | "BTC" | "USDT" | "USDC" | "BNB" | "XRP" | "USDD" | "ADA" | "DOGE" | "MATIC" | "DAI" | "DOT" | "SHIB" | "FPI";
    amount: string;
  }) => {
    console.log("Bridge action triggered with params:", params);
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Bridge
      </h1>

      <section className="prose dark:prose-invert prose-slate max-w-none">
        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
          Bridge component allows users to connect with different networks.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
          Usage
        </h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <code className="text-gray-800 dark:text-gray-200">
            {`import { Bridge } from 'your-ui-library'
            
<Bridge />`}
          </code>
        </pre>
        <BridgeWidget onBridge={(params) => handleBridge(params as { fromNetwork: Network; toNetwork: Network; token: "ETH" | "BTC" | "USDT" | "USDC" | "BNB" | "XRP" | "USDD" | "ADA" | "DOGE" | "MATIC" | "DAI" | "DOT" | "SHIB" | "FPI"; amount: string; })} />
      </section>
    </div>
  );
}
