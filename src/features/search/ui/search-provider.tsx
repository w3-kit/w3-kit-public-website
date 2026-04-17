import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { SearchDialog } from "./search-dialog";

const SearchContext = createContext<{ openSearch: () => void }>({
  openSearch: () => {},
});

export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openSearch = useCallback(() => setOpen(true), []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <SearchContext.Provider value={{ openSearch }}>
      {children}
      <SearchDialog open={open} onClose={() => setOpen(false)} />
    </SearchContext.Provider>
  );
}
