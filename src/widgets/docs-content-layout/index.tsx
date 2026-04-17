import type { ReactNode } from "react";
import { DocsShell } from "../docs-shell";
import { DocsSidebar } from "../docs-sidebar";
import { MobileSidebar } from "../docs-sidebar/mobile-sidebar";
import { DocsToc } from "../docs-toc";
import { Breadcrumbs } from "../../shared/ui/breadcrumbs";
import { docsNavSections } from "../../entities/guide/model/docs-nav.gen";

interface DocsContentLayoutProps {
  activeSlug: string;
  breadcrumbs: { label: string; href?: string }[];
  headings: { id: string; text: string; level: number }[];
  children: ReactNode;
}

export function DocsContentLayout({
  activeSlug,
  breadcrumbs,
  headings,
  children,
}: DocsContentLayoutProps) {
  return (
    <DocsShell>
      <div className="mx-auto flex h-[calc(100vh-57px)] max-w-[1440px] gap-0 px-6 md:px-8 lg:px-12">
        <DocsSidebar sections={docsNavSections} activeSlug={activeSlug} />

        <div
          data-docs-content
          className="min-w-0 flex-1 overflow-y-auto border-w3-border-subtle py-8 md:border-l md:px-10"
        >
          <MobileSidebar sections={docsNavSections} activeSlug={activeSlug} />
          <Breadcrumbs items={breadcrumbs} />
          {children}
        </div>

        <DocsToc headings={headings} />
      </div>
    </DocsShell>
  );
}
