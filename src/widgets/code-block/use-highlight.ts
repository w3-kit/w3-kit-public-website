import { useState, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let highlighterPromise: Promise<any> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getHighlighter(): Promise<any> {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki").then((shiki) =>
      shiki.createHighlighter({
        themes: ["github-light", "github-dark"],
        langs: ["tsx", "typescript", "solidity", "bash", "json", "markdown"],
      })
    );
  }
  return highlighterPromise;
}

export function useHighlight(code: string, lang: string = "tsx") {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    getHighlighter().then((highlighter) => {
      if (cancelled) return;
      const result = highlighter.codeToHtml(code, {
        lang,
        themes: { light: "github-light", dark: "github-dark" },
      });
      setHtml(result);
    });
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  return html;
}
