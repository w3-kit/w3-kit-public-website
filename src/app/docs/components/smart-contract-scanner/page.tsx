"use client";

import React, { useState } from "react";
import { SmartContractScanner } from "./component";
import { Code, Eye, AlertTriangle } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";
import { ContractError } from "./component"; // Import the ContractError enum

export default function SmartContractScannerPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'compact'>('default');
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [lastError, setLastError] = useState<ContractError | null>(null);
  const [scanHistory, setScanHistory] = useState<string[]>([]);

  // Handle contract scanning
  const handleScan = (address: string) => {
    console.log("Scanning contract:", address);
    setScanHistory(prev => [...prev, `Scanned: ${address} at ${new Date().toLocaleTimeString()}`]);
  };

  // Handle contract errors
  const handleError = (error: ContractError) => {
    console.error("Contract scan error:", error);
    setLastError(error);
    
    // Clear error after 5 seconds
    setTimeout(() => {
      setLastError(null);
    }, 5000);
  };

  // Handle function calls
  const handleFunctionCall = (name: string, inputs: any[]) => {
    console.log("Calling function:", name, inputs);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Smart Contract Scanner
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A comprehensive smart contract analysis tool for security scanning, function exploration, and code verification.
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
                {/* Error display at the top level */}
                {lastError && (
                  <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">Parent Component Error Handler</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        Received error from scanner: {lastError}
                      </p>
                    </div>
                  </div>
                )}
                
                <SmartContractScanner
                  variant={selectedVariant}
                  onScan={handleScan}
                  onFunctionCall={handleFunctionCall}
                  onError={handleError}
                />

                {/* Scan history display */}
                {scanHistory.length > 0 && (
                  <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Scan History</h3>
                    <div className="bg-white dark:bg-gray-800 rounded-md p-3 text-sm">
                      <ul className="space-y-1">
                        {scanHistory.map((item, index) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <CodeBlock
                code={`import { SmartContractScanner, ContractError } from "@w3-kit/smart-contract-scanner";
import { useState } from "react";

export default function Page() {
  const [lastError, setLastError] = useState<ContractError | null>(null);
  
  // Handle contract scanning
  const handleScan = (address: string) => {
    console.log("Scanning contract:", address);
    // Your scanning logic here
  };

  // Handle contract errors
  const handleError = (error: ContractError) => {
    console.error("Contract scan error:", error);
    setLastError(error);
    
    // Clear error after 5 seconds
    setTimeout(() => {
      setLastError(null);
    }, 5000);
  };

  return (
    <div>
      {/* Display error at the parent level if needed */}
      {lastError && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-700">
            Error: {lastError}
          </p>
        </div>
      )}
      
      <SmartContractScanner
        variant="${selectedVariant}"
        onScan={handleScan}
        onFunctionCall={(name, inputs) => {
          console.log("Calling function:", name, inputs);
        }}
        onError={handleError}
      />
    </div>
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
                <CodeBlock code="npx w3-kit@latest add smart-contract-scanner" id="cli" />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      1. Install the package using npm:
                    </p>
                    <CodeBlock code="npm install @w3-kit/smart-contract-scanner" id="npm" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      2. Import and use the component:
                    </p>
                    <CodeBlock
                      code={`import { SmartContractScanner, ContractError } from "@w3-kit/smart-contract-scanner";

export default function Page() {
  // Error handling function
  const handleError = (error: ContractError) => {
    console.error("Contract error:", error);
    // Handle different error types
    switch(error) {
      case ContractError.INVALID_ADDRESS:
        // Handle invalid address
        break;
      case ContractError.NOT_FOUND:
        // Handle contract not found
        break;
      case ContractError.NETWORK_ERROR:
        // Handle network issues
        break;
      default:
        // Handle other errors
    }
  };

  return (
    <SmartContractScanner
      onScan={(address) => {
        console.log("Scanning contract:", address);
      }}
      onFunctionCall={(name, inputs) => {
        console.log("Calling function:", name, inputs);
      }}
      onError={handleError}
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

        {/* Error Handling Section */}
        <div className="space-y-4 mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-semibold border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-900 dark:text-white">
            Error Handling
          </h2>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The Smart Contract Scanner component provides comprehensive error handling through the <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">onError</code> callback and the <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">ContractError</code> enum.
            </p>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Error Types</h3>
              <div className="bg-white dark:bg-gray-800 rounded-md p-4 text-sm">
                <ul className="space-y-2">
                  <li><strong>INVALID_ADDRESS</strong>: The provided address doesn't match the Ethereum address format</li>
                  <li><strong>NOT_FOUND</strong>: The contract address doesn't exist on the blockchain</li>
                  <li><strong>NOT_VERIFIED</strong>: The contract exists but isn't verified</li>
                  <li><strong>NETWORK_ERROR</strong>: Connection issues with the blockchain provider</li>
                  <li><strong>SCAN_FAILED</strong>: General scanning failure</li>
                  <li><strong>RATE_LIMIT</strong>: API rate limit exceeded</li>
                  <li><strong>TIMEOUT</strong>: Request timeout</li>
                  <li><strong>UNKNOWN</strong>: Unspecified error</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Example Error Handler</h3>
              <CodeBlock
                code={`// Example error handler with different responses per error type
const handleContractError = (error: ContractError) => {
  switch(error) {
    case ContractError.INVALID_ADDRESS:
      showNotification("Please enter a valid Ethereum address");
      break;
    case ContractError.NOT_FOUND:
      showNotification("Contract not found on this network");
      break;
    case ContractError.NOT_VERIFIED:
      showNotification("This contract is not verified", "warning");
      break;
    case ContractError.NETWORK_ERROR:
      showNotification("Network connection error. Please try again", "error");
      break;
    case ContractError.RATE_LIMIT:
      showNotification("Too many requests. Please wait and try again", "error");
      break;
    default:
      showNotification("An error occurred while scanning the contract", "error");
  }
};`}
                id="error-handler"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
