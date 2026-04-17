import { ArrowLeft, ArrowRight } from "lucide-react";

interface PrevNextProps {
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
}

export function DocsPrevNext({ prev, next }: PrevNextProps) {
  return (
    <div className="mt-16 flex items-stretch gap-4 border-t border-w3-border-subtle pt-8">
      {prev ? (
        <a
          href={prev.href}
          className="glass-bg group flex flex-1 items-center gap-3 rounded-xl p-4 transition-all hover:scale-[1.01]"
        >
          <ArrowLeft
            size={16}
            className="text-w3-gray-500 transition-transform group-hover:-translate-x-0.5"
          />
          <div className="flex flex-col">
            <span className="text-xs text-w3-gray-500">Previous</span>
            <span className="text-sm font-medium text-w3-gray-900">{prev.label}</span>
          </div>
        </a>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <a
          href={next.href}
          className="glass-bg group flex flex-1 items-center justify-end gap-3 rounded-xl p-4 text-right transition-all hover:scale-[1.01]"
        >
          <div className="flex flex-col">
            <span className="text-xs text-w3-gray-500">Next</span>
            <span className="text-sm font-medium text-w3-gray-900">{next.label}</span>
          </div>
          <ArrowRight
            size={16}
            className="text-w3-gray-500 transition-transform group-hover:translate-x-0.5"
          />
        </a>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
