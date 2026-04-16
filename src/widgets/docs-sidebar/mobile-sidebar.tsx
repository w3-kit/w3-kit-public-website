import { useState } from "react";
import { Menu, X } from "lucide-react";
import { getSectionUrl } from "../../shared/lib/urls";

interface DocNavItem {
  label: string;
  slug: string;
  type: "markdown" | "guide" | "recipe";
}

interface DocNavSection {
  title: string;
  items: DocNavItem[];
}

function getItemHref(item: DocNavItem): string {
  const base = getSectionUrl("docs");
  if (item.type === "guide") return `${base}/guide/${item.slug}`;
  if (item.type === "recipe") return `${base}/recipe/${item.slug}`;
  return `${base}/${item.slug}`;
}

interface MobileSidebarProps {
  sections: DocNavSection[];
  activeSlug: string;
}

export function MobileSidebar({ sections, activeSlug }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
        style={{
          background: "var(--w3-surface-elevated)",
          border: "1px solid var(--w3-border-subtle)",
          color: "var(--w3-gray-700)",
        }}
      >
        <Menu size={16} />
        Menu
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.4)" }}
            onClick={() => setOpen(false)}
          />
          {/* Drawer */}
          <div
            className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto p-6"
            style={{ background: "var(--w3-gray-100)" }}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-semibold" style={{ color: "var(--w3-gray-900)" }}>
                Documentation
              </span>
              <button onClick={() => setOpen(false)}>
                <X size={20} style={{ color: "var(--w3-gray-600)" }} />
              </button>
            </div>
            <div className="flex flex-col gap-5">
              {sections.map((section) => (
                <div key={section.title} className="flex flex-col gap-1">
                  <span
                    className="px-3 text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color: "var(--w3-gray-500)" }}
                  >
                    {section.title}
                  </span>
                  {section.items.map((item) => (
                    <a
                      key={item.slug}
                      href={getItemHref(item)}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm"
                      style={{
                        color: activeSlug === item.slug ? "var(--w3-gray-900)" : "var(--w3-gray-600)",
                        background:
                          activeSlug === item.slug ? "var(--w3-surface-elevated)" : "transparent",
                        fontWeight: activeSlug === item.slug ? 500 : 400,
                      }}
                    >
                      <span
                        className="h-4 w-0.5 shrink-0 rounded-full"
                        style={{
                          background:
                            activeSlug === item.slug ? "var(--w3-accent)" : "transparent",
                        }}
                      />
                      {item.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
