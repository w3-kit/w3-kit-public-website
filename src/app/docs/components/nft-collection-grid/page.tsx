"use client";

import React, { useState } from "react";
import { NFTCollectionGrid } from "./component";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";
import { NFT } from "../nft-card/types";

export default function NFTCollectionGridPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");

  // Mock data for preview
  const mockNFTs: NFT[] = [
    {
      id: "1",
      name: "Bored Ape #1234",
      description: "A unique Bored Ape NFT with laser eyes",
      image: "https://i.seadn.io/gae/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ7TtZ_oWyYgISQcF9Ov2f3A4mRk5k9enzV6Dqa3xNfGUkK_hqFnQt4Qly1P4WYw?auto=format&w=1000",
      owner: "0x1234567890abcdef1234567890abcdef12345678",
      collection: "Bored Ape Yacht Club",
      tokenId: "1234",
      contractAddress: "0x123456789abcdef123456789abcdef1234567890",
      chainId: 1,
      attributes: [
        { trait_type: "Background", value: "Blue" },
        { trait_type: "Fur", value: "Golden" },
        { trait_type: "Eyes", value: "Laser" },
      ],
    },
    {
      id: "2",
      name: "Azuki #5678",
      description: "A mysterious Azuki warrior",
      image: "https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&w=1000",
      owner: "0x9876543210fedcba9876543210fedcba98765432",
      collection: "Azuki",
      tokenId: "5678",
      contractAddress: "0x123456789abcdef123456789abcdef1234567890",
      chainId: 1,
      attributes: [
        { trait_type: "Background", value: "Red" },
        { trait_type: "Type", value: "Human" },
        { trait_type: "Clothing", value: "Kimono" },
      ],
    },
    {
      id: "3",
      name: "Doodle #9012",
      description: "A colorful Doodle character",
      image: "https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&w=1000",
      owner: "0xabcdef1234567890abcdef1234567890abcdef12",
      collection: "Doodles",
      tokenId: "9012",
      contractAddress: "0x123456789abcdef123456789abcdef1234567890",
      chainId: 1,
      attributes: [
        { trait_type: "Background", value: "Yellow" },
        { trait_type: "Face", value: "Happy" },
        { trait_type: "Body", value: "Rainbow" },
      ],
    },
    {
      id: "4",
      name: "Moonbird #3456",
      description: "A mystical Moonbird in flight",
      image: "https://i.seadn.io/gae/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2GxODupqm?auto=format&w=1000",
      owner: "0x567890abcdef1234567890abcdef1234567890ab",
      collection: "Moonbirds",
      tokenId: "3456",
      contractAddress: "0x123456789abcdef123456789abcdef1234567890",
      chainId: 1,
      attributes: [
        { trait_type: "Background", value: "Night" },
        { trait_type: "Feathers", value: "Cosmic" },
        { trait_type: "Eyes", value: "Glowing" },
      ],
    },
    {
      id: "5",
      name: "CloneX #7890",
      description: "A futuristic CloneX avatar",
      image: "https://i.seadn.io/gae/XN0XuD8Uh3jyRWGtfunGqWpBWuz2Zqqer4rqAfhAuxJ4s0iBqeC8tq12CMeVDyqtw4E6y4ATxV1MpwOAvsVB-tsYGB5VgWLbQyYrYs0?auto=format&w=1000",
      owner: "0x234567890abcdef1234567890abcdef1234567890",
      collection: "CloneX",
      tokenId: "7890",
      contractAddress: "0x123456789abcdef123456789abcdef1234567890",
      chainId: 1,
      attributes: [
        { trait_type: "Background", value: "Cyber" },
        { trait_type: "Skin", value: "Robot" },
        { trait_type: "Outfit", value: "Future Tech" },
      ],
    },
    {
      id: "6",
      name: "Pudgy Penguin #2345",
      description: "An adorable Pudgy Penguin",
      image: "https://i.seadn.io/gae/yNi-XdGxsgQCPpqSio4o31ygAV6wURdIdInWRcFIl46UjUQ1eV7BEndGe8L661OoG-clRi7EgInLX4LPu9Jfw4fq0bnVYHqg7RFi?auto=format&w=1000",
      owner: "0x890abcdef1234567890abcdef1234567890abcdef",
      collection: "Pudgy Penguins",
      tokenId: "2345",
      contractAddress: "0x123456789abcdef123456789abcdef1234567890",
      chainId: 1,
      attributes: [
        { trait_type: "Background", value: "Ice" },
        { trait_type: "Outfit", value: "Scarf" },
        { trait_type: "Face", value: "Happy" },
      ],
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            NFT Collection Grid
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A responsive grid component for displaying NFT collections with customizable layouts and interactive features.
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
              <NFTCollectionGrid
                nfts={mockNFTs}
                variant="default"
                columns={{
                  default: 1,
                  sm: 2,
                  md: 3,
                  lg: 4,
                }}
                onNFTClick={(nft) => console.log("NFT clicked:", nft)}
                onOwnerClick={(owner) => console.log("Owner clicked:", owner)}
              />
            ) : (
              <CodeBlock
                code={`import { NFTCollectionGrid } from "@w3-kit/nft-collection-grid";

export default function Page() {
  return (
    <NFTCollectionGrid
      nfts={nfts}
      variant="default"
      columns={{
        default: 1,
        sm: 2,
        md: 3,
        lg: 4,
      }}
      onNFTClick={(nft) => console.log("NFT clicked:", nft)}
      onOwnerClick={(owner) => console.log("Owner clicked:", owner)}
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
                <CodeBlock code="npx w3-kit@latest add nft-collection-grid" id="cli" />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      1. Install the package using npm:
                    </p>
                    <CodeBlock code="npm install @w3-kit/nft-collection-grid" id="npm" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      2. Import and use the component:
                    </p>
                    <CodeBlock
                      code={`import { NFTCollectionGrid } from "@w3-kit/nft-collection-grid";

const nfts = [
  {
    id: "1",
    name: "Bored Ape #1234",
    description: "A unique NFT",
    image: "https://example.com/nft.png",
    owner: "0x1234...",
    collection: "Bored Ape Yacht Club",
    tokenId: "1234",
    contractAddress: "0x1234...",
    chainId: 1,
    attributes: [
      { trait_type: "Background", value: "Blue" },
      { trait_type: "Eyes", value: "Laser" }
    ]
  }
];

export default function Page() {
  return (
    <NFTCollectionGrid
      nfts={nfts}
      variant="default"
      columns={{
        default: 1,
        sm: 2,
        md: 3,
        lg: 4
      }}
      onNFTClick={(nft) => console.log("NFT clicked:", nft)}
      onOwnerClick={(owner) => console.log("Owner clicked:", owner)}
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
