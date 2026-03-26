import React from "react";

export default function McpPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">MCP Server</h1>
      <p className="text-lg mb-6 text-gray-500 dark:text-gray-400">
        Connect AI coding assistants to w3-kit
      </p>

      <section className="prose dark:prose-invert prose-slate max-w-none">

        {/* What is MCP */}
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">What is MCP?</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The Model Context Protocol (MCP) lets AI coding assistants understand your component library without
          guessing APIs from source code. Instead of scanning raw files, the AI gets structured metadata about
          all 27 w3-kit components — props, types, examples, design tokens, and guidelines — served directly
          into your AI workflow.
        </p>

        {/* Quick Setup */}
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Quick Setup</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Add the following to your{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">.mcp.json</code> file in your
          project root:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <code className="text-gray-800 dark:text-gray-200">{`{
  "mcpServers": {
    "w3-kit": {
      "command": "npx",
      "args": ["@w3-kit/mcp"]
    }
  }
}`}</code>
        </pre>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Works with Claude Code, Cursor, and any MCP-compatible client.
        </p>

        {/* Available Tools */}
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Available Tools</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The MCP server exposes six tools your AI assistant can call:
        </p>
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-2 pr-6 font-semibold text-gray-900 dark:text-white whitespace-nowrap">Tool</th>
                <th className="py-2 font-semibold text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-2 pr-6 align-top">
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded whitespace-nowrap">list_components</code>
                </td>
                <td className="py-2 align-top">List all w3-kit components, filter by category (token, nft, wallet, defi, utility, general)</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-2 pr-6 align-top">
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded whitespace-nowrap">get_component</code>
                </td>
                <td className="py-2 align-top">Get full props, types, source code, and dependencies for any component</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-2 pr-6 align-top">
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded whitespace-nowrap">get_design_tokens</code>
                </td>
                <td className="py-2 align-top">Get colors, spacing, and typography from the Tailwind config</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-2 pr-6 align-top">
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded whitespace-nowrap">get_design_guidelines</code>
                </td>
                <td className="py-2 align-top">Get design rules for spacing, dark mode, motion, and Vercel style</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-2 pr-6 align-top">
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded whitespace-nowrap">generate_composition</code>
                </td>
                <td className="py-2 align-top">Generate a page composing multiple w3-kit components</td>
              </tr>
              <tr>
                <td className="py-2 pr-6 align-top">
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded whitespace-nowrap">get_example</code>
                </td>
                <td className="py-2 align-top">Get basic or full working code examples for any component</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Examples */}
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Examples</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Ask your AI assistant to call these tools directly, or let it invoke them automatically as it helps
          you build with w3-kit.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">List all DeFi components</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <code className="text-gray-800 dark:text-gray-200">{`list_components({ category: "defi" })`}</code>
        </pre>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Get token-card details</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <code className="text-gray-800 dark:text-gray-200">{`get_component({ name: "token-card" })`}</code>
        </pre>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Generate a dashboard</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <code className="text-gray-800 dark:text-gray-200">{`generate_composition({ description: "token dashboard" })`}</code>
        </pre>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Get design guidelines</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <code className="text-gray-800 dark:text-gray-200">{`get_design_guidelines({ topic: "vercel-style" })`}</code>
        </pre>

        {/* Component Categories */}
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Component Categories</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Use the <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">category</code> filter with{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">list_components</code> to narrow results:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
          <li><strong>token</strong> — Token display, trading, and management</li>
          <li><strong>nft</strong> — NFT display, collection, and marketplace</li>
          <li><strong>wallet</strong> — Wallet connection, balance, and transactions</li>
          <li><strong>defi</strong> — DeFi protocol interaction and portfolio</li>
          <li><strong>utility</strong> — Gas estimation, network switching, contract tools</li>
          <li><strong>general</strong> — Cross-cutting components (bridges, subscriptions)</li>
        </ul>

        {/* Development Mode */}
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Development Mode</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          For contributors working on the w3-kit repository, use the dev config to run the MCP server from
          local source files instead of the published package:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <code className="text-gray-800 dark:text-gray-200">{`{
  "mcpServers": {
    "w3-kit": {
      "command": "node",
      "args": ["ui/packages/mcp-server/dist/index.js", "--dev"]
    }
  }
}`}</code>
        </pre>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Dev mode reads live source files from the monorepo, so changes to component definitions and design
          tokens are reflected immediately without republishing.
        </p>

        {/* npm package link */}
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">npm Package</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The MCP server is available as{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">@w3-kit/mcp</code> on npm. You can
          install it globally or run it directly with <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">npx</code> as shown in the Quick Setup above.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <code className="text-gray-800 dark:text-gray-200">npm install -g @w3-kit/mcp</code>
        </pre>

      </section>
    </div>
  );
}
