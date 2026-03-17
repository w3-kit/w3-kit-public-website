"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getComponentList } from "@/config/docs";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Data Display", value: "Data Display" },
  { label: "Inputs & Actions", value: "Inputs & Actions" },
  { label: "DeFi Tools", value: "DeFi Tools" },
  { label: "Analytics", value: "Analytics" },
  { label: "Advanced", value: "Advanced" },
];

const CATEGORY_MAP: Record<string, string> = {
  "NFT Card": "Data Display",
  "Token Card": "Data Display",
  "Price Ticker": "Data Display",
  "NFT Collection Grid": "Data Display",
  "Token List": "Data Display",
  "Wallet Balance": "Data Display",
  "Transaction History": "Data Display",
  "Token Swap": "Inputs & Actions",
  "Bridge": "Inputs & Actions",
  "Network Switcher": "Inputs & Actions",
  "Connect Wallet": "Inputs & Actions",
  "Contract Interaction": "Inputs & Actions",
  "Address Book": "Inputs & Actions",
  "Token Airdrop": "Inputs & Actions",
  "Subscription Payments": "Inputs & Actions",
  "DeFi Position Manager": "DeFi Tools",
  "Limit Order & Stop-Loss Manager": "DeFi Tools",
  "Flash Loan Executor": "DeFi Tools",
  "Token Vesting": "DeFi Tools",
  "Staking Interface": "DeFi Tools",
  "Liquidity Pool Stats": "DeFi Tools",
  "Asset Portfolio": "Analytics",
  "Gas Calculator": "Analytics",
  "Smart Contract Scanner": "Analytics",
  "NFT Marketplace Aggregator": "Analytics",
  "Multisignature Wallets": "Advanced",
  "ENS Resolver": "Advanced",
};

export function ComponentGallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const components = getComponentList();

  const filtered = activeFilter === "all"
    ? components
    : components.filter((c) => CATEGORY_MAP[c.title] === activeFilter);

  return (
    <section className="px-6 lg:px-8 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">
            Components for every Web3 use case
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From NFT displays to DeFi dashboards, everything you need to build production-ready Web3 interfaces
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                activeFilter === cat.value
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((component) => (
            <Link
              key={component.href}
              href={component.href}
              className="group block p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                {CATEGORY_MAP[component.title] || "Component"}
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">
                {component.title}
              </h3>
              {component.description && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {component.description}
                </p>
              )}
              {component.isNew && (
                <span className="mt-2 inline-block px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-xs font-medium text-blue-700 dark:text-blue-300">
                  New
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
