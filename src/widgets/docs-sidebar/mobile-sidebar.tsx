import { Menu } from "lucide-react";
import { getDocItemHref } from "../../shared/lib/urls";
import { type DocNavSection } from "../../entities/guide/model/docs-nav.gen";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "../../shared/ui/sheet";

interface MobileSidebarProps {
  sections: DocNavSection[];
  activeSlug: string;
}

export function MobileSidebar({ sections, activeSlug }: MobileSidebarProps) {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger className="flex items-center gap-2 rounded-lg border border-w3-border-subtle bg-w3-surface-elevated px-3 py-2 text-sm font-medium text-w3-gray-700">
          <Menu size={16} />
          Menu
        </SheetTrigger>
        <SheetContent side="left" className="w-72 bg-w3-gray-100 p-6">
          <SheetHeader className="p-0">
            <SheetTitle className="text-sm font-semibold text-w3-gray-900">
              Documentation
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-5">
            {sections.map((section) => (
              <div key={section.title} className="flex flex-col gap-1">
                <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-w3-gray-500">
                  {section.title}
                </span>
                {section.items.map((item) => {
                  const isActive = activeSlug === item.slug;
                  return (
                    <a
                      key={item.slug}
                      href={getDocItemHref(item)}
                      className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm ${
                        isActive
                          ? "bg-w3-surface-elevated font-medium text-w3-gray-900"
                          : "text-w3-gray-600"
                      }`}
                    >
                      <span
                        className={`h-4 w-0.5 shrink-0 rounded-full ${
                          isActive ? "bg-w3-accent" : "bg-transparent"
                        }`}
                      />
                      {item.label}
                    </a>
                  );
                })}
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
