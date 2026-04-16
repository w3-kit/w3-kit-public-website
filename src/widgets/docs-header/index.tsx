import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Search, BookOpen, Code, FileText } from "lucide-react";
import { Button } from "../../shared/ui/button";
import { Logo } from "../../shared/ui/logo";
import { cn } from "../../shared/lib/utils";
import { getSectionUrl } from "../../shared/lib/urls";
import { docsNavSections, type DocNavSection } from "../../entities/guide/model/docs-nav.gen";
import { GitHubIcon } from "../../shared/ui/github-icon";

interface DocsHeaderProps {
  variant?: "default" | "transparent";
}

// Group nav sections for the mega menu columns
const docsSections = docsNavSections.filter(
  (s) => !s.title.startsWith("Recipes:") && s.title !== "Guides",
);
const guideSection = docsNavSections.find((s) => s.title === "Guides");
const recipeSections = docsNavSections.filter((s) => s.title.startsWith("Recipes:"));

function getItemHref(item: { slug: string; type: string }): string {
  const base = getSectionUrl("docs");
  if (item.type === "guide") return `${base}/guide/${item.slug}`;
  if (item.type === "recipe") return `${base}/recipe/${item.slug}`;
  return `${base}/${item.slug}`;
}

function MegaMenuColumn({ section }: { section: DocNavSection }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span
        className="px-2 text-[10px] font-semibold uppercase tracking-wider"
        style={{ color: "var(--w3-gray-500)" }}
      >
        {section.title}
      </span>
      {section.items.map((item) => (
        <a
          key={item.slug}
          href={getItemHref(item)}
          className="rounded-md px-2 py-1 text-sm transition-colors hover:bg-[var(--w3-surface-elevated)]"
          style={{ color: "var(--w3-gray-700)" }}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

export function DocsHeader({ variant = "default" }: DocsHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const isTransparent = variant === "transparent";

  useEffect(() => {
    if (!isTransparent) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isTransparent]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close mega menu on outside click
  useEffect(() => {
    if (!megaOpen) return;
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [megaOpen]);

  const showBackground = !isTransparent || scrolled;

  return (
    <>
      <header
        className={cn(
          "z-50 flex items-center justify-between px-6 py-4 transition-all duration-300",
          isTransparent ? "fixed inset-x-0 top-0" : "sticky top-0",
          showBackground && "border-b backdrop-blur-xl",
        )}
        style={{
          borderColor: showBackground ? "var(--w3-border-subtle)" : "transparent",
          background: showBackground
            ? "color-mix(in srgb, var(--w3-gray-100) 80%, transparent)"
            : "transparent",
        }}
      >
        {/* Logo */}
        <a href={getSectionUrl("docs")} className="flex items-center gap-2">
          <Logo size={24} className="text-[var(--w3-accent)]" />
          <span className="text-sm font-semibold" style={{ color: "var(--w3-gray-900)" }}>
            w3-kit
          </span>
          <span
            className="rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
            style={{ background: "var(--w3-accent-subtle)", color: "var(--w3-accent)" }}
          >
            docs
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" ref={megaRef}>
          {/* Mega menu trigger */}
          <button
            onClick={() => setMegaOpen(!megaOpen)}
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              megaOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            Menu
            <ChevronDown
              size={14}
              className={cn("transition-transform", megaOpen && "rotate-180")}
            />
          </button>

          {/* Quick links */}
          <a
            href={`${getSectionUrl("docs")}/introduction`}
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Quick Start
          </a>
          <a
            href={`${getSectionUrl("docs")}/components-api`}
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            API
          </a>
          <a
            href={`${getSectionUrl("docs")}/guide/what-is-a-wallet`}
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Guides
          </a>
          <a
            href={`${getSectionUrl("docs")}/recipe/connect-wallet`}
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Recipes
          </a>

          {/* Search trigger */}
          <button
            onClick={() => {
              document.getElementById("docs-search-trigger")?.click();
              // Also dispatch Cmd+K manually
              document.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true }),
              );
            }}
            className="ml-2 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Search"
          >
            <Search size={16} />
          </button>

          {/* GitHub */}
          <a
            href="https://github.com/w3-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <GitHubIcon size={16} />
          </a>

          {/* Mega menu dropdown */}
          {megaOpen && (
            <div
              className="absolute inset-x-0 top-full z-50 border-b backdrop-blur-xl"
              style={{
                background: "color-mix(in srgb, var(--w3-gray-100) 95%, transparent)",
                borderColor: "var(--w3-border-subtle)",
              }}
            >
              <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-8 sm:grid-cols-2 md:grid-cols-4 lg:px-16">
                {/* Column 1: Docs sections */}
                <div className="flex flex-col gap-6">
                  {docsSections.map((section) => (
                    <MegaMenuColumn key={section.title} section={section} />
                  ))}
                </div>

                {/* Column 2: Guides */}
                <div className="flex flex-col gap-6">
                  {guideSection && <MegaMenuColumn section={guideSection} />}
                </div>

                {/* Column 3: Recipes (Wallet + Tokens) */}
                <div className="flex flex-col gap-6">
                  {recipeSections.slice(0, 2).map((section) => (
                    <MegaMenuColumn key={section.title} section={section} />
                  ))}
                </div>

                {/* Column 4: Recipes (NFTs + DeFi + Utils) */}
                <div className="flex flex-col gap-6">
                  {recipeSections.slice(2).map((section) => (
                    <MegaMenuColumn key={section.title} section={section} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto pt-16 backdrop-blur-xl md:hidden"
          style={{
            background: "color-mix(in srgb, var(--w3-gray-100) 95%, transparent)",
          }}
        >
          <nav className="flex flex-col gap-6 px-6 py-6">
            {docsNavSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-1">
                <span
                  className="px-4 text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: "var(--w3-gray-500)" }}
                >
                  {section.title}
                </span>
                {section.items.map((item) => (
                  <a
                    key={item.slug}
                    href={getItemHref(item)}
                    className="rounded-lg px-4 py-2 text-sm transition-colors"
                    style={{ color: "var(--w3-gray-700)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
