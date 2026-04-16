import { useState, useEffect, useCallback } from "react";
import { SearchDialog } from "./search-dialog";

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

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

  // Also listen for clicks on the hero search trigger
  useEffect(() => {
    const trigger = document.getElementById("docs-search-trigger");
    if (trigger) {
      const handler = () => setOpen(true);
      trigger.addEventListener("click", handler);
      return () => trigger.removeEventListener("click", handler);
    }
  }, []);

  return (
    <>
      {children}
      <SearchDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
