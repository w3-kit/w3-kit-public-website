import { useActiveHeading } from "./use-active-heading";

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

  if (!headings.length) return null;

  return (
    <aside className="hidden w-48 shrink-0 xl:block">
      <div className="sticky top-20 py-8 pl-6">
        <span
          className="mb-3 block text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: "var(--w3-gray-500)" }}
        >
          On This Page
        </span>
        <nav className="flex flex-col gap-1">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className="block text-[13px] leading-relaxed transition-colors"
              style={{
                paddingLeft: heading.level === 3 ? 12 : 0,
                color: activeId === heading.id ? "var(--w3-accent)" : "var(--w3-gray-500)",
                fontWeight: activeId === heading.id ? 500 : 400,
                borderLeft:
                  activeId === heading.id
                    ? "2px solid var(--w3-accent)"
                    : "2px solid transparent",
                paddingTop: 2,
                paddingBottom: 2,
                paddingRight: 0,
                marginLeft: 0,
              }}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
