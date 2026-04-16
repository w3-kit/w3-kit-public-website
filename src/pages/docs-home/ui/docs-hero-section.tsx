import { Search } from "lucide-react";
import { SectionContainer } from "../../../shared/ui/section-container";
import { useEntranceAnimation } from "../../../shared/lib/use-scroll-animation";
import { getSectionUrl } from "../../../shared/lib/urls";

const quickLinks = [
  { label: "UI Library", slug: "ui-library" },
  { label: "Registry", slug: "registry" },
  { label: "CLI", slug: "cli" },
  { label: "Contracts", slug: "contracts" },
];

export function DocsHeroSection() {
  const containerRef = useEntranceAnimation({ stagger: 0.18, y: 30, delay: 0.3 });

  return (
    <div
      className="relative flex min-h-[70svh] items-center pb-20 md:pb-28"
      style={{ background: "var(--w3-hero-gradient)" }}
    >
      <SectionContainer className="relative z-10">
        <div ref={containerRef} className="flex flex-col items-center gap-8 text-center">
          {/* Main headline */}
          <h1
            data-entrance
            className="max-w-2xl text-4xl font-semibold sm:text-5xl md:text-6xl"
            style={{
              color: "var(--w3-gray-900)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            W3 Kit Documentation
          </h1>

          {/* Subtitle */}
          <p
            data-entrance
            className="max-w-lg text-lg md:text-xl"
            style={{ color: "var(--w3-gray-600)", lineHeight: 1.6 }}
          >
            Everything you need to build Web3 apps. Guides, API reference, and code examples.
          </p>

          {/* Search bar — visual only, wired to search dialog via id */}
          <div
            data-entrance
            id="docs-search-trigger"
            role="button"
            tabIndex={0}
            aria-label="Search documentation"
            className="flex w-full max-w-[560px] cursor-pointer items-center gap-3 rounded-xl px-5 py-3.5 transition-all hover:scale-[1.01]"
            style={{
              background: "var(--w3-glass-bg)",
              border: "1px solid var(--w3-glass-border)",
              boxShadow: "var(--w3-glass-shadow)",
              backdropFilter: "blur(20px)",
            }}
          >
            <Search size={18} style={{ color: "var(--w3-gray-400)" }} aria-hidden="true" />
            <span className="flex-1 text-left text-sm" style={{ color: "var(--w3-gray-500)" }}>
              Search documentation...
            </span>
            <kbd
              className="hidden rounded-md px-2 py-0.5 text-[11px] font-medium sm:inline-block"
              style={{
                background: "var(--w3-surface-elevated)",
                border: "1px solid var(--w3-border-subtle)",
                color: "var(--w3-gray-500)",
                fontFamily: '"Geist Mono", monospace',
              }}
            >
              Cmd+K
            </kbd>
          </div>

          {/* Quick link tags */}
          <div data-entrance className="flex flex-wrap items-center justify-center gap-2">
            {quickLinks.map((link) => (
              <a
                key={link.slug}
                href={`${getSectionUrl("docs")}/${link.slug}`}
                className="rounded-full px-3 py-1 text-xs font-medium transition-all hover:scale-105"
                style={{
                  background: "var(--w3-accent-subtle)",
                  color: "var(--w3-accent)",
                  fontFamily: '"Geist Mono", monospace',
                }}
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
