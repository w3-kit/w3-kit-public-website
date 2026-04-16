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
            {i > 0 && <ChevronRight size={12} style={{ color: "var(--w3-gray-400)" }} />}
            {isLast || !item.href ? (
              <span
                style={{
                  color: isLast ? "var(--w3-gray-900)" : "var(--w3-gray-500)",
                  fontWeight: isLast ? 500 : 400,
                }}
              >
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="transition-colors hover:underline"
                style={{ color: "var(--w3-gray-500)" }}
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
