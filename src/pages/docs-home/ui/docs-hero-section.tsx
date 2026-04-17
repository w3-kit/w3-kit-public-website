import { Search } from "lucide-react";
import { SectionContainer } from "../../../shared/ui/section-container";
import { useEntranceAnimation } from "../../../shared/lib/use-scroll-animation";
import { getSectionUrl } from "../../../shared/lib/urls";
import { useSearch } from "../../../features/search";

const quickLinks = [
  { label: "UI Library", slug: "ui-library" },
  { label: "Registry", slug: "registry" },
  { label: "CLI", slug: "cli" },
  { label: "Contracts", slug: "contracts" },
];

export function DocsHeroSection() {
  const containerRef = useEntranceAnimation({ stagger: 0.18, y: 30, delay: 0.3 });
  const { openSearch } = useSearch();

  return (
    <div
      className="relative flex min-h-[70svh] items-center pb-20 md:pb-28"
      style={{ background: "var(--w3-hero-gradient)" }}
    >
      <SectionContainer className="relative z-10">
        <div ref={containerRef} className="flex flex-col items-center gap-8 text-center">
          <h1
            data-entrance
            className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-w3-gray-900 sm:text-5xl md:text-6xl"
          >
            W3 Kit Documentation
          </h1>

          <p data-entrance className="max-w-lg text-lg leading-relaxed text-w3-gray-600 md:text-xl">
            Everything you need to build Web3 apps. Guides, API reference, and code examples.
          </p>

          <button
            type="button"
            data-entrance
            onClick={openSearch}
            aria-label="Search documentation"
            className="glass-bg flex w-full max-w-[560px] cursor-pointer items-center gap-3 rounded-xl px-5 py-3.5 transition-all hover:scale-[1.01]"
          >
            <Search size={18} className="text-w3-gray-400" aria-hidden="true" />
            <span className="flex-1 text-left text-sm text-w3-gray-500">
              Search documentation...
            </span>
            <kbd className="hidden rounded-md border border-w3-border-subtle bg-w3-surface-elevated px-2 py-0.5 font-mono text-[11px] font-medium text-w3-gray-500 sm:inline-block">
              Cmd+K
            </kbd>
          </button>

          <div data-entrance className="flex flex-wrap items-center justify-center gap-2">
            {quickLinks.map((link) => (
              <a
                key={link.slug}
                href={`${getSectionUrl("docs")}/${link.slug}`}
                className="rounded-full bg-w3-accent-subtle px-3 py-1 font-mono text-xs font-medium text-w3-accent transition-all hover:scale-105"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
