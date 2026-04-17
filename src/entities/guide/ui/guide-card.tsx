import { ArrowRight } from "lucide-react";
import type { GuideMeta } from "../model/types";
import type { GuideCategory } from "../model/types";
import { getDocItemHref } from "../../../shared/lib/urls";
import { cn } from "../../../shared/lib/utils";

const categoryStyles: Record<string, { badge: string; text: string }> = {
  concepts: { badge: "bg-w3-accent-subtle text-w3-accent", text: "text-w3-accent" },
  evm: { badge: "bg-w3-chain-evm-subtle text-w3-chain-evm", text: "text-w3-chain-evm" },
  solana: { badge: "bg-w3-chain-solana-subtle text-w3-chain-solana", text: "text-w3-chain-solana" },
  security: { badge: "bg-red-500/10 text-red-500", text: "text-red-500" },
  glossary: { badge: "bg-w3-surface-elevated text-w3-gray-600", text: "text-w3-gray-600" },
};

const defaultStyle = { badge: "bg-w3-accent-subtle text-w3-accent", text: "text-w3-accent" };

function getCategoryStyle(category: GuideCategory) {
  return categoryStyles[category] ?? defaultStyle;
}

export function GuideCard({ guide }: { guide: GuideMeta }) {
  const style = getCategoryStyle(guide.category);

  return (
    <a
      href={getDocItemHref({ slug: guide.slug, type: "guide" })}
      className="glass-bg group flex flex-col gap-3 rounded-xl p-5 transition-all hover:scale-[1.01]"
    >
      <span
        className={cn(
          "w-fit rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
          style.badge,
        )}
      >
        {guide.category}
      </span>
      <h3 className="text-base font-semibold text-w3-gray-900">{guide.title}</h3>
      <p className="text-sm leading-relaxed text-w3-gray-600">{guide.description}</p>
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-w3-accent transition-all group-hover:gap-2">
        Read guide <ArrowRight size={14} />
      </span>
    </a>
  );
}
