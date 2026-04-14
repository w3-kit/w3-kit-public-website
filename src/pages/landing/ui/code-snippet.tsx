import { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "~/shared/ui/button";
import { Separator } from "~/shared/ui/separator";

interface CodeSnippetProps {
  code: string;
  language?: string;
}

export function CodeSnippet({ code, language = "bash" }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{
        background: "var(--w3-gray-200)",
        border: "1px solid var(--w3-border-subtle)",
      }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">{language}</span>
        </div>
        <Button variant="ghost" size="xs" onClick={handleCopy} className="gap-1">
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>

      <Separator />

      {/* Code content */}
      <pre className="overflow-x-auto p-5">
        <code
          className="text-sm leading-relaxed"
          style={{
            color: "var(--w3-gray-900)",
            fontFamily: '"Geist Mono", ui-monospace, monospace',
          }}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}
