import { useState, useEffect, useRef, useCallback } from "react";
import { Search, FileText, BookOpen, Code, X } from "lucide-react";
import { searchDocs, type SearchItem } from "../model/search-index";
import { getSectionUrl } from "../../../shared/lib/urls";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../shared/ui/dialog";

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
      }
    },
    [results, selectedIndex, onClose],
  );

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="top-[15%] max-w-[560px] translate-y-0 gap-0 overflow-hidden rounded-xl border-w3-border-subtle bg-w3-gray-100 p-0 shadow-[0_25px_50px_rgba(0,0,0,0.15)]"
      >
        <DialogTitle className="sr-only">Search documentation</DialogTitle>

        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-w3-border-subtle px-4 py-3">
          <Search size={18} className="text-w3-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation..."
            className="flex-1 bg-transparent text-sm text-w3-gray-900 outline-none"
          />
          <button onClick={onClose} className="rounded p-1 transition-colors">
            <X size={16} className="text-w3-gray-500" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto p-2">
          {query && results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-w3-gray-500">
                No results for &ldquo;{query}&rdquo;
              </p>
            </div>
          )}

          {results.map((item, index) => (
            <a
              key={item.href}
              href={`${getSectionUrl("docs")}${item.href.replace("/docs", "")}`}
              className={`flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                index === selectedIndex ? "bg-w3-surface-elevated" : ""
              }`}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={onClose}
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-w3-accent-subtle text-w3-accent">
                {typeIcons[item.type]}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-w3-gray-900">{item.title}</span>
                  <span className="rounded bg-w3-surface-elevated px-1.5 py-0.5 text-[10px] font-medium text-w3-gray-500">
                    {typeLabels[item.type]}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-xs text-w3-gray-500">{item.description}</p>
              </div>
            </a>
          ))}

          {!query && (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-w3-gray-500">Start typing to search...</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="flex items-center gap-4 border-t border-w3-border-subtle px-4 py-2 font-mono text-[11px] text-w3-gray-500">
            <span>&uarr;&darr; navigate</span>
            <span>&crarr; select</span>
            <span>esc close</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
