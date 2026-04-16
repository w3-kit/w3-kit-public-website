import { useState, useEffect, useRef, useCallback } from "react";
import { Search, FileText, BookOpen, Code, X } from "lucide-react";
import { searchDocs, type SearchItem } from "../model/search-index";
import { getSectionUrl } from "../../../shared/lib/urls";

const typeIcons: Record<string, React.ReactNode> = {
  doc: <FileText size={14} />,
  guide: <BookOpen size={14} />,
  recipe: <Code size={14} />,
};

const typeLabels: Record<string, string> = {
  doc: "Docs",
  guide: "Guide",
  recipe: "Recipe",
};

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
      // Focus input after a brief delay for animation
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const items = searchDocs(query);
    setResults(items.slice(0, 10));
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        window.location.href = `${getSectionUrl("docs")}${results[selectedIndex].href.replace("/docs", "")}`;
        onClose();
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [results, selectedIndex, onClose],
  );

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50"
        style={{ background: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-x-0 top-[15%] z-50 mx-auto w-full max-w-[560px] px-4">
        <div
          className="overflow-hidden rounded-xl"
          style={{
            background: "var(--w3-gray-100)",
            border: "1px solid var(--w3-border-subtle)",
            boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
          }}
        >
          {/* Search input */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{ borderBottom: "1px solid var(--w3-border-subtle)" }}
          >
            <Search size={18} style={{ color: "var(--w3-gray-400)" }} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search documentation..."
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: "var(--w3-gray-900)" }}
            />
            <button onClick={onClose} className="rounded p-1 transition-colors">
              <X size={16} style={{ color: "var(--w3-gray-500)" }} />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto p-2">
            {query && results.length === 0 && (
              <div className="px-4 py-8 text-center">
                <p className="text-sm" style={{ color: "var(--w3-gray-500)" }}>
                  No results for &ldquo;{query}&rdquo;
                </p>
              </div>
            )}

            {results.map((item, index) => (
              <a
                key={item.href}
                href={`${getSectionUrl("docs")}${item.href.replace("/docs", "")}`}
                className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors"
                style={{
                  background:
                    index === selectedIndex ? "var(--w3-surface-elevated)" : "transparent",
                }}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={onClose}
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                  style={{
                    background: "var(--w3-accent-subtle)",
                    color: "var(--w3-accent)",
                  }}
                >
                  {typeIcons[item.type]}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--w3-gray-900)" }}
                    >
                      {item.title}
                    </span>
                    <span
                      className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                      style={{
                        background: "var(--w3-surface-elevated)",
                        color: "var(--w3-gray-500)",
                      }}
                    >
                      {typeLabels[item.type]}
                    </span>
                  </div>
                  <p
                    className="mt-0.5 truncate text-xs"
                    style={{ color: "var(--w3-gray-500)" }}
                  >
                    {item.description}
                  </p>
                </div>
              </a>
            ))}

            {!query && (
              <div className="px-4 py-6 text-center">
                <p className="text-sm" style={{ color: "var(--w3-gray-500)" }}>
                  Start typing to search...
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {results.length > 0 && (
            <div
              className="flex items-center gap-4 px-4 py-2 text-[11px]"
              style={{
                borderTop: "1px solid var(--w3-border-subtle)",
                color: "var(--w3-gray-500)",
                fontFamily: '"Geist Mono", monospace',
              }}
            >
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
