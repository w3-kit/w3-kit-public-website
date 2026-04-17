import { ArrowRight } from "lucide-react";
import type { RecipeMeta } from "../model/types";
import { getDocItemHref } from "../../../shared/lib/urls";
import { cn } from "../../../shared/lib/utils";

const chainStyles: Record<string, string> = {
  evm: "bg-w3-chain-evm-subtle text-w3-chain-evm",
  solana: "bg-w3-chain-solana-subtle text-w3-chain-solana",
};

const defaultChainStyle = "bg-w3-surface-elevated text-w3-gray-600";

export function RecipeCard({ recipe }: { recipe: RecipeMeta }) {
  return (
    <a
      href={getDocItemHref({ slug: recipe.slug, type: "recipe" })}
      className="glass-bg group flex flex-col gap-3 rounded-xl p-5 transition-all hover:scale-[1.01]"
    >
      <div className="flex flex-wrap gap-1.5">
        {recipe.chains.map((chain) => (
          <span
            key={chain}
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
              chainStyles[chain] ?? defaultChainStyle,
            )}
          >
            {chain}
          </span>
        ))}
      </div>

      <h3 className="text-base font-semibold text-w3-gray-900">{recipe.name}</h3>

      <p className="text-sm leading-relaxed text-w3-gray-600">{recipe.description}</p>

      {Object.keys(recipe.dependencies).length > 0 && (
        <div className="flex flex-wrap gap-1 pt-0.5">
          {Object.values(recipe.dependencies)
            .flat()
            .slice(0, 3)
            .map((dep) => (
              <span
                key={dep}
                className="rounded-md bg-w3-surface-elevated px-1.5 py-0.5 font-mono text-[10px] text-w3-gray-600"
              >
                {dep}
              </span>
            ))}
        </div>
      )}

      <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-w3-accent transition-all group-hover:gap-2">
        View recipe <ArrowRight size={14} />
      </span>
    </a>
  );
}
