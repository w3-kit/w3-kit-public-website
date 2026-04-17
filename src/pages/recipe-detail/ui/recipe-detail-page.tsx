import { useMemo } from "react";
import { useParams } from "@tanstack/react-router";
import { DocsContentLayout } from "../../../widgets/docs-content-layout";
import { DocsNotFound } from "../../../shared/ui/docs-not-found";
import { DocsShell } from "../../../widgets/docs-shell";
import { CodeBlock } from "../../../widgets/code-block";
import { MarkdownRenderer } from "../../../widgets/markdown-renderer";
import { extractHeadings } from "../../../widgets/markdown-renderer/extract-headings";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../shared/ui/tabs";
import { useRecipe } from "../../../entities/recipe";
import { getSectionUrl } from "../../../shared/lib/urls";
import { AuthorBadge } from "../../../shared/ui/author-badge";

export function RecipeDetailPage() {
  const { recipeSlug } = useParams({ strict: false });
  const slug = recipeSlug ?? "";
  const recipe = useRecipe(slug);

  if (!recipe) {
    return (
      <DocsShell>
        <DocsNotFound entityType="Recipe" slug={slug} />
      </DocsShell>
    );
  }

  const hasEvm = recipe.chains.includes("evm");
  const hasSolana = recipe.chains.includes("solana");
  const defaultTab = hasEvm ? "evm" : "solana";

  const headings = useMemo(
    () => (recipe.learnContent ? extractHeadings(recipe.learnContent) : []),
    [recipe.learnContent],
  );

  return (
    <DocsContentLayout
      activeSlug={slug}
      breadcrumbs={[
        { label: "Docs", href: getSectionUrl("docs") },
        { label: "Recipes" },
        { label: recipe.name },
      ]}
      headings={headings}
    >
      <h1 className="mb-2 text-3xl font-semibold tracking-tight text-w3-gray-900">
        {recipe.name}
      </h1>
      <p className="mb-6 text-base leading-relaxed text-w3-gray-600">{recipe.description}</p>

      <AuthorBadge author={recipe.author} prefix="by" className="mb-4" />

      {/* Chain badges */}
      <div className="mb-6 flex items-center gap-2">
        {recipe.chains.map((chain) => (
          <span
            key={chain}
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
              chain === "evm"
                ? "bg-w3-chain-evm-subtle text-w3-chain-evm"
                : "bg-w3-chain-solana-subtle text-w3-chain-solana"
            }`}
          >
            {chain}
          </span>
        ))}
      </div>

      {/* Dependencies */}
      {Object.keys(recipe.dependencies).length > 0 && (
        <div className="mb-8">
          <h3 className="mb-3 text-sm font-semibold text-w3-gray-900">Dependencies</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(recipe.dependencies).map(([chain, deps]) =>
              deps.map((dep) => (
                <span
                  key={`${chain}-${dep}`}
                  className="rounded-md bg-w3-surface-elevated px-2 py-1 font-mono text-xs text-w3-gray-700"
                >
                  {dep}
                </span>
              )),
            )}
          </div>
        </div>
      )}

      {/* Code tabs */}
      <Tabs defaultValue={defaultTab}>
        <TabsList variant="line" className="mb-4">
          {hasEvm && <TabsTrigger value="evm">EVM</TabsTrigger>}
          {hasSolana && <TabsTrigger value="solana">Solana</TabsTrigger>}
        </TabsList>
        {hasEvm && (
          <TabsContent value="evm">
            <CodeBlock code={recipe.evmCode} language="tsx" filename={`${recipe.slug}/evm.tsx`} />
          </TabsContent>
        )}
        {hasSolana && (
          <TabsContent value="solana">
            <CodeBlock
              code={recipe.solanaCode}
              language="tsx"
              filename={`${recipe.slug}/solana.tsx`}
            />
          </TabsContent>
        )}
      </Tabs>

      {/* Learn content */}
      {recipe.learnContent && (
        <div className="mt-12 border-t border-w3-border-subtle pt-10">
          <MarkdownRenderer content={recipe.learnContent} />
        </div>
      )}
    </DocsContentLayout>
  );
}
