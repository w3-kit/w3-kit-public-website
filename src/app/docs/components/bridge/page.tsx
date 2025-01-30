"use client";

import React, { useState } from "react";
import { BridgeWidget } from "./component";
import { Code, Eye, Copy, Check } from "lucide-react";
import { codeString, codeUsage } from "./untils";

interface CodeBlockProps {
  code: string;
  id: string;
}

export default function BridgeComponent() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const CodeBlock = ({ code, id }: CodeBlockProps) => (
    <div className="relative group">
      <pre className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 p-3 sm:p-4 overflow-x-auto">
        <code className="text-sm sm:text-base text-gray-800 dark:text-gray-200 whitespace-pre">
          {code}
        </code>
      </pre>
      <button
        onClick={() => handleCopy(code, id)}
        className="absolute right-2 top-2 p-2 bg-gray-200 dark:bg-gray-700 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-600"
        title={copiedId === id ? "Copied!" : "Copy code"}
      >
        {copiedId === id ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        )}
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Bridge
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A component that enables users to transfer tokens between different
            blockchain networks.
          </p>
        </div>
        {/* Preview/Code Section */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between overflow-x-auto">
            <div className="flex items-center space-x-2 min-w-full sm:min-w-0">
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
          </div>

          <div className="rounded-lg overflow-hidden">
            {activeTab === "preview" ? (
              <BridgeWidget />
            ) : (
              <CodeBlock code={codeString} id="component" />
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
                <CodeBlock code="npx w3-kit@latest add bridge" id="cli" />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">1. Install the package using npm:</p>
                    <CodeBlock code="npm install @w3-kit/bridge" id="npm" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">2. Import the component:</p>
                    <CodeBlock
                      code='import { BridgeWidget } from "@w3-kit/bridge";'
                      id="import"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">3. Add the component to your page:</p>
                    <CodeBlock
                      code={`export default function Page() {
  return (
    <BridgeWidget />
  );
}`}
                      id="usage-example"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Usage Section */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-900 dark:text-white">
            Usage
          </h2>
          <CodeBlock
            code='import { BridgeWidget } from "@/components/bridge";'
            id="usage-import"
          />
          <CodeBlock code={codeUsage} id="usage-full" />
        </div>
      </div>
    </div>
  );
}
