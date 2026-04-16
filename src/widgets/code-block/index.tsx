import { Check, Copy, FileCode } from "lucide-react";
import { useCopyToClipboard } from "../../shared/lib/use-copy-to-clipboard";
import { useHighlight } from "./use-highlight";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = "tsx", filename }: CodeBlockProps) {
  const html = useHighlight(code.trim(), language);
  const [copied, handleCopy] = useCopyToClipboard(code.trim());

  return (
    <div
      className="group relative overflow-hidden rounded-xl"
      style={{
        background: "var(--w3-gray-200)",
        border: "1px solid var(--w3-border-subtle)",
      }}
    >
      {/* Header */}
      {filename && (
        <div
          className="flex items-center gap-2 px-4 py-2 text-xs"
          style={{
            borderBottom: "1px solid var(--w3-border-subtle)",
            color: "var(--w3-gray-600)",
          }}
        >
          <FileCode size={14} />
          <span style={{ fontFamily: '"Geist Mono", monospace' }}>{filename}</span>
        </div>
      )}

      {/* Code */}
      <div className="relative overflow-x-auto p-4">
        {html ? (
          <div
            className="text-sm [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!bg-transparent"
            style={{ fontFamily: '"Geist Mono", monospace' }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre
            className="text-sm"
            style={{ fontFamily: '"Geist Mono", monospace', color: "var(--w3-gray-700)" }}
          >
            <code>{code.trim()}</code>
          </pre>
        )}
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded-lg p-1.5 opacity-0 transition-all group-hover:opacity-100"
        style={{
          background: "var(--w3-surface-elevated)",
          border: "1px solid var(--w3-border-subtle)",
          color: copied ? "var(--w3-accent)" : "var(--w3-gray-600)",
        }}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}
