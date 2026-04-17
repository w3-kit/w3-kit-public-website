import { useCallback, useRef, useEffect } from "react";
import { useActiveHeading } from "./use-active-heading";
import { DOCS_CONTENT_SELECTOR } from "../../shared/lib/constants";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface DocsTocProps {
  headings: Heading[];
}

export function DocsToc({ headings }: DocsTocProps) {
  const activeId = useActiveHeading(headings.map((h) => h.id));
  const containerRef = useRef<Element | null>(null);

  useEffect(() => {
    containerRef.current = document.querySelector(DOCS_CONTENT_SELECTOR);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    const scrollContainer = containerRef.current;
    if (el && scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const offset = elRect.top - containerRect.top + scrollContainer.scrollTop - 20;
      scrollContainer.scrollTo({ top: offset, behavior: "smooth" });
    }
  }, []);

  if (!headings.length) return null;

  return (
    <aside className="hidden w-52 shrink-0 overflow-y-auto border-l border-w3-border-subtle xl:block">
      <div className="py-6 pl-5">
        <span className="mb-4 block text-[11px] font-semibold uppercase tracking-wider text-w3-gray-500">
          On this page
        </span>
        <nav className="flex flex-col gap-0.5">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`block py-1 text-[12.5px] leading-snug transition-colors ${
                  isActive
                    ? "border-l-2 border-w3-accent font-medium text-w3-accent"
                    : "border-l-2 border-transparent text-w3-gray-500"
                }`}
                style={{
                  paddingLeft: heading.level === 3 ? 16 : heading.level >= 4 ? 28 : 8,
                }}
              >
                {heading.text}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
