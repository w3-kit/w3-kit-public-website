import { ArrowRight } from "lucide-react";
import type { GuideMeta } from "../model/types";
import { getSectionUrl } from "../../../shared/lib/urls";

const categoryColors: Record<string, string> = {
  concepts: "var(--w3-accent)",
  evm: "#627EEA",
  solana: "#9945FF",
  security: "#EF4444",
  glossary: "var(--w3-gray-600)",
};

export function GuideCard({ guide }: { guide: GuideMeta }) {
  return (
    <a
      href={`${getSectionUrl("docs")}/guide/${guide.slug}`}
      className="group flex flex-col gap-3 rounded-xl p-5 transition-all hover:scale-[1.01]"
      style={{
        background: "var(--w3-glass-bg)",
        border: "1px solid var(--w3-glass-border)",
        boxShadow: "var(--w3-glass-shadow)",
      }}
    >
      <span
        className="w-fit rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
        style={{
          background: `${categoryColors[guide.category] || "var(--w3-accent)"}15`,
          color: categoryColors[guide.category] || "var(--w3-accent)",
        }}
      >
        {guide.category}
      </span>
      <h3 className="text-base font-semibold" style={{ color: "var(--w3-gray-900)" }}>
        {guide.title}
      </h3>
      <p className="text-sm" style={{ color: "var(--w3-gray-600)", lineHeight: 1.6 }}>
        {guide.description}
      </p>
      <span
        className="mt-auto inline-flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2"
        style={{ color: "var(--w3-accent)" }}
      >
        Read guide <ArrowRight size={14} />
      </span>
    </a>
  );
}
