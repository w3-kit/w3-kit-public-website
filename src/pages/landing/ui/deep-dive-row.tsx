import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface DeepDiveRowProps {
  icon: ReactNode;
  overline: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  visual: ReactNode;
  reverse?: boolean;
}

export function DeepDiveRow({
  icon,
  overline,
  title,
  description,
  href,
  linkLabel,
  visual,
  reverse = false,
}: DeepDiveRowProps) {
  return (
    <div
      data-reveal
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${reverse ? "lg:[direction:rtl]" : ""}`}
    >
      {/* Text block */}
      <div className={`flex flex-col gap-5 ${reverse ? "lg:[direction:ltr]" : ""}`}>
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            style={{
              background: "var(--w3-accent-subtle)",
              color: "var(--w3-accent)",
            }}
          >
            {icon}
          </div>
          <span
            className="text-sm font-medium uppercase tracking-wider"
            style={{ color: "var(--w3-accent)" }}
          >
            {overline}
          </span>
        </div>

        <h3
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
          style={{ color: "var(--w3-gray-900)", letterSpacing: "-0.02em" }}
        >
          {title}
        </h3>

        <p className="text-base leading-relaxed" style={{ color: "var(--w3-gray-600)" }}>
          {description}
        </p>

        <a
          href={href}
          className="group inline-flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: "var(--w3-accent)" }}
        >
          {linkLabel}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {/* Visual block */}
      <div className={reverse ? "lg:[direction:ltr]" : ""}>
        <div
          className="flex aspect-[4/3] items-center justify-center rounded-xl"
          style={{
            background: "var(--w3-surface-translucent)",
            border: "1px solid var(--w3-border-subtle)",
          }}
        >
          {visual}
        </div>
      </div>
    </div>
  );
}
