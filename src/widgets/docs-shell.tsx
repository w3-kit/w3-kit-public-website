import type { ReactNode } from "react";
import { DocsHeader } from "./docs-header";
import { DocsFooter } from "./docs-footer";
import { SearchProvider } from "../features/search";

interface DocsShellProps {
  children: ReactNode;
  transparentHeader?: boolean;
}

export function DocsShell({ children, transparentHeader }: DocsShellProps) {
  return (
    <SearchProvider>
      <div
        className="flex min-h-screen flex-col overflow-x-hidden"
        style={{ background: "var(--w3-gray-100)" }}
      >
        <DocsHeader variant={transparentHeader ? "transparent" : "default"} />
        <main className="flex-1">{children}</main>
        <DocsFooter />
      </div>
    </SearchProvider>
  );
}
