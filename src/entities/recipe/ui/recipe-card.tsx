import { ArrowRight } from "lucide-react";
import type { RecipeMeta } from "../model/types";
import { getSectionUrl } from "../../../shared/lib/urls";

const chainColors: Record<string, { bg: string; color: string }> = {
  evm: { bg: "#627EEA15", color: "#627EEA" },
  solana: { bg: "#9945FF15", color: "#9945FF" },
};

export function RecipeCard({ recipe }: { recipe: RecipeMeta }) {
  return (
    <a
      href={`${getSectionUrl("docs")}/recipe/${recipe.slug}`}
      className="group flex flex-col gap-3 rounded-xl p-5 transition-all hover:scale-[1.01]"
      style={{
        background: "var(--w3-glass-bg)",
        border: "1px solid var(--w3-glass-border)",
        boxShadow: "var(--w3-glass-shadow)",
      }}
    >
      {/* Chain badges */}
      <div className="flex flex-wrap gap-1.5">
        {recipe.chains.map((chain) => {
          const colors = chainColors[chain] ?? {
            bg: "var(--w3-surface-elevated)",
            color: "var(--w3-gray-600)",
          };
          return (
            <span
              key={chain}
              className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{ background: colors.bg, color: colors.color }}
            >
              {chain}
            </span>
          );
        })}
      </div>

      {/* Name */}
      <h3 className="text-base font-semibold" style={{ color: "var(--w3-gray-900)" }}>
        {recipe.name}
      </h3>

      {/* Description */}
      <p className="text-sm" style={{ color: "var(--w3-gray-600)", lineHeight: 1.6 }}>
        {recipe.description}
      </p>

      {/* Dependencies preview */}
      {Object.keys(recipe.dependencies).length > 0 && (
        <div className="flex flex-wrap gap-1 pt-0.5">
          {Object.values(recipe.dependencies)
            .flat()
            .slice(0, 3)
            .map((dep) => (
              <span
                key={dep}
                className="rounded-md px-1.5 py-0.5 font-mono text-[10px]"
                style={{
                  background: "var(--w3-surface-elevated)",
                  color: "var(--w3-gray-600)",
                }}
              >
                {dep}
              </span>
            ))}
        </div>
      )}

      <span
        className="mt-auto inline-flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2"
        style={{ color: "var(--w3-accent)" }}
      >
        View recipe <ArrowRight size={14} />
      </span>
    </a>
  );
}
