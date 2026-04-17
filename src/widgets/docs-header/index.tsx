import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronRight, Search } from "lucide-react";
import { Button } from "../../shared/ui/button";
import { Logo } from "../../shared/ui/logo";
import { cn } from "../../shared/lib/utils";
import { getSectionUrl, getDocItemHref } from "../../shared/lib/urls";
import { docsNavSections, type DocNavSection } from "../../entities/guide/model/docs-nav.gen";
import { GitHubIcon } from "../../shared/ui/github-icon";

// Group nav sections for the 3 dropdowns
const docsSections = docsNavSections.filter(
  (s) => !s.title.startsWith("Recipes:") && !s.title.startsWith("Guides"),
);
const guideSections = docsNavSections.filter((s) => s.title.startsWith("Guides"));
const recipeSections = docsNavSections.filter((s) => s.title.startsWith("Recipes:"));

function DropdownSection({ section }: { section: DocNavSection }) {
  const [open, setOpen] = useState(true);
  const displayTitle = section.title.replace(/^(Guides|Recipes):\s*/i, "");

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-1 text-[11px] font-medium uppercase tracking-wider transition-colors"
        style={{ color: "var(--w3-gray-500)" }}
      >
        <ChevronRight
          size={10}
          className={cn("shrink-0 transition-transform", open && "rotate-90")}
          style={{ color: "var(--w3-gray-400)" }}
        />
        {displayTitle}
      </button>
      {open && (
        <div className="ml-3 flex flex-col gap-0.5">
          {section.items.map((item) => (
            <a
              key={item.slug}
              href={getDocItemHref(item)}
              className="rounded-md px-2 py-1 text-[13px] transition-colors hover:bg-[var(--w3-surface-elevated)]"
              style={{ color: "var(--w3-gray-600)" }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function CollapsibleMobileSection({ section }: { section: DocNavSection }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between px-4 text-[10px] font-semibold uppercase tracking-wider"
        style={{ color: "var(--w3-gray-500)" }}
      >
        {section.title}
        <ChevronDown
          size={12}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      {open &&
        section.items.map((item) => (
          <a
            key={item.slug}
            href={getDocItemHref(item)}
            className="rounded-lg px-4 py-2 text-sm transition-colors"
            style={{ color: "var(--w3-gray-700)" }}
          >
            {item.label}
          </a>
        ))}
    </div>
  );
}

type ActiveDropdown = "docs" | "guides" | "recipes" | null;

function NavDropdown({
  label,
  id,
  active,
  onToggle,
}: {
  label: string;
  id: ActiveDropdown;
  active: ActiveDropdown;
  onToggle: (id: ActiveDropdown) => void;
}) {
  return (
    <button
      onClick={() => onToggle(active === id ? null : id)}
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        active === id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
      <ChevronDown
        size={12}
        className={cn("transition-transform", active === id && "rotate-180")}
      />
    </button>
  );
}

export function DocsHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!activeDropdown) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [activeDropdown]);

  return (
    <>
      <header
        className="sticky top-0 z-50 flex shrink-0 items-center justify-between border-b px-6 py-3 backdrop-blur-xl"
        style={{
          borderColor: "var(--w3-border-subtle)",
          background: "color-mix(in srgb, var(--w3-gray-100) 80%, transparent)",
        }}
      >
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

        <nav className="hidden items-center gap-0 md:flex" ref={navRef}>
          <NavDropdown label="Docs" id="docs" active={activeDropdown} onToggle={setActiveDropdown} />
          <NavDropdown label="Guides" id="guides" active={activeDropdown} onToggle={setActiveDropdown} />
          <NavDropdown label="Recipes" id="recipes" active={activeDropdown} onToggle={setActiveDropdown} />

          <button
            onClick={() => {
              document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
            }}
            className="ml-3 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Search"
          >
            <Search size={16} />
          </button>

          <a
            href="https://github.com/w3-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <GitHubIcon size={16} />
          </a>

          {/* Documentation dropdown */}
          {activeDropdown === "docs" && (
            <DropdownPanel>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {docsSections.map((section) => (
                  <DropdownSection key={section.title} section={section} />
                ))}
              </div>
            </DropdownPanel>
          )}

          {/* Guides dropdown */}
          {activeDropdown === "guides" && (
            <DropdownPanel>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {guideSections.map((section) => (
                  <DropdownSection key={section.title} section={section} />
                ))}
              </div>
            </DropdownPanel>
          )}

          {/* Recipes dropdown */}
          {activeDropdown === "recipes" && (
            <DropdownPanel>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {recipeSections.map((section) => (
                  <DropdownSection key={section.title} section={section} />
                ))}
              </div>
            </DropdownPanel>
          )}
        </nav>

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

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto pt-14 backdrop-blur-xl md:hidden"
          style={{
            background: "color-mix(in srgb, var(--w3-gray-100) 95%, transparent)",
          }}
        >
          <nav className="flex flex-col gap-4 px-6 py-6">
            {docsNavSections.map((section) => (
              <CollapsibleMobileSection key={section.title} section={section} />
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

function DropdownPanel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute inset-x-0 top-full z-50 max-h-[70vh] overflow-y-auto border-b backdrop-blur-xl"
      style={{
        background: "color-mix(in srgb, var(--w3-gray-100) 95%, transparent)",
        borderColor: "var(--w3-border-subtle)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 py-6 lg:px-16">
        {children}
      </div>
    </div>
  );
}
