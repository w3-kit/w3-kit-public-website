import { useState, useEffect, useRef } from "react";
import { DOCS_CONTENT_SELECTOR } from "../../shared/lib/constants";

export function useActiveHeading(headingIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(headingIds[0] ?? "");
  const containerRef = useRef<Element | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!headingIds.length) return;

    const scrollContainer = document.querySelector(DOCS_CONTENT_SELECTOR);
    if (!scrollContainer) return;
    containerRef.current = scrollContainer;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const offset = 120;
      let current = headingIds[0] ?? "";

      for (const id of headingIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const relativeTop = el.getBoundingClientRect().top - containerRect.top;
        if (relativeTop <= offset) {
          current = id;
        }
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    // Throttle with requestAnimationFrame
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(handleScroll);
    };

    handleScroll();
    scrollContainer.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [headingIds]);

  return activeId;
}
