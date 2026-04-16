import { ArrowLeft, ArrowRight } from "lucide-react";

interface PrevNextProps {
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
}

export function DocsPrevNext({ prev, next }: PrevNextProps) {
  return (
    <div
      className="mt-16 flex items-stretch gap-4 pt-8"
      style={{ borderTop: "1px solid var(--w3-border-subtle)" }}
    >
      {prev ? (
        <a
          href={prev.href}
          className="group flex flex-1 items-center gap-3 rounded-xl p-4 transition-all hover:scale-[1.01]"
          style={{
            background: "var(--w3-glass-bg)",
            border: "1px solid var(--w3-glass-border)",
          }}
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-0.5"
            style={{ color: "var(--w3-gray-500)" }}
          />
          <div className="flex flex-col">
            <span className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
              Previous
            </span>
            <span className="text-sm font-medium" style={{ color: "var(--w3-gray-900)" }}>
              {prev.label}
            </span>
          </div>
        </a>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <a
          href={next.href}
          className="group flex flex-1 items-center justify-end gap-3 rounded-xl p-4 text-right transition-all hover:scale-[1.01]"
          style={{
            background: "var(--w3-glass-bg)",
            border: "1px solid var(--w3-glass-border)",
          }}
        >
          <div className="flex flex-col">
            <span className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
              Next
            </span>
            <span className="text-sm font-medium" style={{ color: "var(--w3-gray-900)" }}>
              {next.label}
            </span>
          </div>
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
            style={{ color: "var(--w3-gray-500)" }}
          />
        </a>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
