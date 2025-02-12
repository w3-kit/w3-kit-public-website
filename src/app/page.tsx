"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Code, Palette, Zap, Box, Layers, Shield, Download, Star, Users } from 'lucide-react'

const stats = [
  { number: '2.5M', label: 'downloads / month' },
  { number: '38.5K', label: 'github stars' },
  { number: '8.9K', label: 'discord members' }
]

const features = [
  {
    icon: <Code className="h-6 w-6" />,
    title: 'TypeScript First',
    description: 'Built with TypeScript for better developer experience and type safety'
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: 'Customizable',
    description: 'Fully customizable components with Tailwind CSS'
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'High Performance',
    description: 'Optimized for speed and efficiency with minimal bundle size'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative px-6 pt-14 lg:px-8 overflow-hidden">
        <div className="mx-auto max-w-2xl py-28 sm:py-32">
          <div className="text-center">
            <div className="relative z-10">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Build faster with Web3 Components
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                A comprehensive library of accessible React components for building high-quality Web3 applications and dApps
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/docs/components"
                  className="rounded-full bg-gray-900 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-gray-900 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100"
                >
                  Get Started
                </Link>
                <pre className="hidden md:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-full">
                  <code>npm i @w3-kit/react</code>
                  <button className="hover:text-gray-900 dark:hover:text-white transition-colors" onClick={() => navigator.clipboard.writeText('npm i @w3-kit/react')}>
                    <span className="sr-only">Copy to clipboard</span>
                    <Code className="h-4 w-4" />
                  </button>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Component Preview Grid */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200 dark:border-gray-800" />
          </div>
          <div className="relative flex justify-center">
            <div className="grid grid-cols-3 gap-4 bg-white dark:bg-gray-950 px-4">
              {['Token Swap', 'Smart Contract Scanner', 'Asset Portfolio'].map((name) => (
                <div
                  key={name}
                  className="flex items-center justify-center h-32 w-48 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600 dark:text-gray-400">{stat.label}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                  {stat.number}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Built for modern dApps
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              From next-gen startups to established enterprises, W3-Kit provides the building blocks for your Web3 applications
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                      {feature.icon}
                    </div>
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Start building today
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-400">
              Join thousands of developers building amazing Web3 experiences with W3-Kit
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/docs"
                className="rounded-full bg-gray-900 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-gray-900 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100"
              >
                Get Started
              </Link>
              <Link
                href="https://github.com/w3-kit"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
              >
                View on GitHub <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 