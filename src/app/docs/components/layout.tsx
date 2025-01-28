"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { DocNavigation } from "@/components/docs/navigation";
import { getPageNavigation } from "@/config/docs";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const navigation = getPageNavigation(pathname);

  return (
    <div>
      {children}
      <DocNavigation {...navigation} />
    </div>
  );
}
