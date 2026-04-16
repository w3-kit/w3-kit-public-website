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

function SidebarLink({ item, active }: { item: DocNavItem; active: boolean }) {
  return (
    <a
      href={getItemHref(item)}
      className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-all"
      style={{
        color: active ? "var(--w3-gray-900)" : "var(--w3-gray-600)",
        background: active ? "var(--w3-surface-elevated)" : "transparent",
        fontWeight: active ? 500 : 400,
      }}
    >
      <span
        className="h-4 w-0.5 shrink-0 rounded-full transition-all"
        style={{
          background: active ? "var(--w3-accent)" : "transparent",
        }}
      />
      {item.label}
    </a>
  );
}

interface DocsSidebarProps {
  sections: DocNavSection[];
  activeSlug: string;
}

export function DocsSidebar({ sections, activeSlug }: DocsSidebarProps) {
  return (
    <aside className="hidden w-60 shrink-0 md:block">
      <div className="sticky top-20 flex max-h-[calc(100vh-6rem)] flex-col gap-5 overflow-y-auto py-8 pr-2">
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-1">
            <span
              className="px-3 text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--w3-gray-500)" }}
            >
              {section.title}
            </span>
            {section.items.map((item) => (
              <SidebarLink
                key={item.slug}
                item={item}
                active={activeSlug === item.slug}
              />
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
