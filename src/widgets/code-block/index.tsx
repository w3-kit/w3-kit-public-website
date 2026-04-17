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
    <div className="group relative overflow-hidden rounded-xl border border-w3-border-subtle bg-w3-gray-200">
      {filename && (
        <div className="flex items-center gap-2 border-b border-w3-border-subtle px-4 py-2 font-mono text-xs text-w3-gray-600">
          <FileCode size={14} />
          <span>{filename}</span>
        </div>
      )}

      <div className="relative overflow-x-auto p-4">
        {html ? (
          <div
            className="font-mono text-sm [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!bg-transparent"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="font-mono text-sm text-w3-gray-700">
            <code>{code.trim()}</code>
          </pre>
        )}
      </div>

      <button
        onClick={handleCopy}
        className={`absolute right-3 top-3 rounded-lg border border-w3-border-subtle bg-w3-surface-elevated p-1.5 opacity-0 transition-all group-hover:opacity-100 ${
          copied ? "text-w3-accent" : "text-w3-gray-600"
        }`}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}
