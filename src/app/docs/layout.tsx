"use client";

import React from "react";
import { Navbar } from "@/components/docs/navbar";
import { Sidebar } from "@/components/docs/sidebar";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { Footer } from "@/components/docs/footer";
import { RightSidebar } from "@/components/docs/right-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <div className="container mx-auto flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr_200px] lg:gap-10">
        <Sidebar />
        <main className="relative py-6">
          <div className="mx-auto">
            <Breadcrumbs />
            {children}
          </div>
        </main>
        <RightSidebar className="hidden lg:block" />
      </div>
      <Footer />
    </div>
  );
}
