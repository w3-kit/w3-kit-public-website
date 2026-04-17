import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="mb-6 flex items-center gap-1.5 text-[13px]">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={12} className="text-w3-gray-400" />}
            {isLast || !item.href ? (
              <span
                className={
                  isLast ? "font-medium text-w3-gray-900" : "text-w3-gray-500"
                }
              >
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="text-w3-gray-500 transition-colors hover:underline"
              >
                {item.label}
              </a>
            )}
          </span>
        );
      })}
    </nav>
  );
}
