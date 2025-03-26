import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Installation | W3-Kit",
  description: "Learn how to install and set up W3-Kit in your Web3 application. Simple setup instructions for npm, yarn, and other package managers.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Installation | W3-Kit",
    description: "Learn how to install and set up W3-Kit in your Web3 application.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
};
export default function InstallationPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Installation</h1>
      
      <section className="prose dark:prose-invert prose-slate max-w-none">
        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
          Install and configure W3-Kit for your Web3 application.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Create project</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Run the following command to create a new project or set up an existing one:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <code className="text-gray-800 dark:text-gray-200">npx w3-kit@latest init</code>
        </pre>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Add Components</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          You can now start adding components to your project. For example, to add the NFT Collection Grid component:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <code className="text-gray-800 dark:text-gray-200">npx w3-kit@latest add nft-collection-grid</code>
        </pre>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The command above will:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
          <li>Create a <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">components/ui</code> directory in your project</li>
          <li>Copy the selected component to <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">components/ui/nft-collection-grid</code></li>
          <li>Create a config directory and copy the <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">tokens.ts</code> file</li>
          <li>Add all necessary dependencies to your <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">package.json</code></li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Example Usage</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          You can then import and use the component in your code like this:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <code className="text-gray-800 dark:text-gray-200">import &#123; NFTCollectionGrid &#125; from &apos;@/components/ui/nft-collection-grid&apos;</code>
        </pre>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <code className="text-gray-800 dark:text-gray-200">export default function Home() &#123;
  return (
    &lt;div&gt;
      &lt;NFTCollectionGrid /&gt;
    &lt;/div&gt;
  )
&#125;</code>
        </pre>
      </section>
    </div>
  )
} 