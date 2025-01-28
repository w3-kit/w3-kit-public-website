"use client";

import React from "react";
import { Navbar } from "@/components/docs/navbar";
import { Sidebar } from "@/components/docs/sidebar";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { Footer } from "@/components/docs/footer";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <main className="flex-1 p-8">
            <Breadcrumbs />
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
