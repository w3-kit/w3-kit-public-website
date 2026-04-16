/**
 * Auto-discovery script for the learn repo.
 *
 * Scans ../learn/guides/ and ../learn/recipes/ at build time,
 * then generates:
 *   - src/entities/guide/model/guide-registry.gen.ts
 *   - src/entities/recipe/model/recipe-registry.gen.ts
 *   - src/entities/guide/model/docs-nav.gen.ts
 *
 * Run: npx tsx scripts/generate-learn-registry.ts
 * Wired into: "prebuild" and "predev" npm scripts
 */

import fs from "node:fs";
import path from "node:path";

const LEARN_DIR = path.resolve(import.meta.dirname, "../../learn");
const GUIDES_DIR = path.join(LEARN_DIR, "guides");
const RECIPES_DIR = path.join(LEARN_DIR, "recipes");

const GUIDE_OUT = path.resolve(
  import.meta.dirname,
  "../src/entities/guide/model/guide-registry.gen.ts",
);
const RECIPE_OUT = path.resolve(
  import.meta.dirname,
  "../src/entities/recipe/model/recipe-registry.gen.ts",
);
const NAV_OUT = path.resolve(
  import.meta.dirname,
  "../src/entities/guide/model/docs-nav.gen.ts",
);

// ── Helpers ─────────────────────────────────────────────────────────────────

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function categoryToTitle(cat: string): string {
  return slugToTitle(cat);
}

function toCamelCase(slug: string): string {
  // Replace hyphens followed by any character (including digits) with uppercase
  return slug.replace(/-(.)/g, (_, c) => c.toUpperCase());
}

// ── Discover Guides ─────────────────────────────────────────────────────────

interface GuideInfo {
  slug: string;
  category: string;
  filePath: string; // relative to learn repo for @learn alias
  title: string;
}

function discoverGuides(): GuideInfo[] {
  const guides: GuideInfo[] = [];
  if (!fs.existsSync(GUIDES_DIR)) return guides;

  const categories = fs
    .readdirSync(GUIDES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  for (const category of categories) {
    const catDir = path.join(GUIDES_DIR, category);
    const files = fs
      .readdirSync(catDir)
      .filter((f) => f.endsWith(".md"))
      .sort();

    for (const file of files) {
      const slug = file.replace(/\.md$/, "");
      // Read first line to extract title from markdown # heading
      const content = fs.readFileSync(path.join(catDir, file), "utf-8");
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1].trim() : slugToTitle(slug);

      guides.push({
        slug,
        category,
        filePath: `@learn/guides/${category}/${file}`,
        title,
      });
    }
  }

  return guides;
}

// ── Discover Recipes ────────────────────────────────────────────────────────

interface RecipeInfo {
  slug: string;
  metaPath: string;
  hasEvm: boolean;
  hasSolana: boolean;
  hasLearn: boolean;
  learnFilename: string;
  category: string; // derived from meta.json chains or manual grouping
}

// Recipe category grouping based on the recipe name patterns
function getRecipeCategory(slug: string, meta: { chains: string[] }): string {
  const walletRecipes = ["connect-wallet", "disconnect-wallet", "sign-message", "switch-network"];
  const tokenRecipes = [
    "create-token",
    "transfer-tokens",
    "approve-spending",
    "get-balance",
    "fetch-metadata",
    "watch-transfers",
  ];
  const nftRecipes = [
    "mint-nft",
    "fetch-nft-collection",
    "buy-nft",
    "display-nft-metadata",
    "onchain-svg-nft",
  ];
  const defiRecipes = ["swap-tokens", "provide-liquidity", "stake-tokens", "claim-rewards"];

  if (walletRecipes.includes(slug)) return "wallet";
  if (tokenRecipes.includes(slug)) return "tokens";
  if (nftRecipes.includes(slug)) return "nfts";
  if (defiRecipes.includes(slug)) return "defi";
  return "utils";
}

function discoverRecipes(): RecipeInfo[] {
  const recipes: RecipeInfo[] = [];
  if (!fs.existsSync(RECIPES_DIR)) return recipes;

  const dirs = fs
    .readdirSync(RECIPES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  for (const dir of dirs) {
    const recipeDir = path.join(RECIPES_DIR, dir);
    const metaPath = path.join(recipeDir, "meta.json");
    if (!fs.existsSync(metaPath)) continue;

    const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
    const hasEvm = fs.existsSync(path.join(recipeDir, "evm.tsx"));
    const hasSolana = fs.existsSync(path.join(recipeDir, "solana.tsx"));
    const learnFile = fs
      .readdirSync(recipeDir)
      .find((f) => f.endsWith(".learn.md"));

    recipes.push({
      slug: dir,
      metaPath: `@learn/recipes/${dir}/meta.json`,
      hasEvm,
      hasSolana,
      hasLearn: !!learnFile,
      learnFilename: learnFile || "",
      category: getRecipeCategory(dir, meta),
    });
  }

  return recipes;
}

// ── Generate guide-registry.gen.ts ──────────────────────────────────────────

function generateGuideRegistry(guides: GuideInfo[]): string {
  const lines: string[] = [
    '// AUTO-GENERATED by scripts/generate-learn-registry.ts — do not edit manually',
    'import type { GuideMeta } from "./types";',
    "",
  ];

  // Imports
  for (const g of guides) {
    const varName = toCamelCase(g.slug) + "Content";
    lines.push(`import ${varName} from "${g.filePath}?raw";`);
  }

  lines.push("");
  lines.push("export const guideRegistry: GuideMeta[] = [");

  for (const g of guides) {
    const varName = toCamelCase(g.slug) + "Content";
    lines.push("  {");
    lines.push(`    id: ${JSON.stringify(g.slug)},`);
    lines.push(`    title: ${JSON.stringify(g.title)},`);
    lines.push(
      `    description: ${JSON.stringify(`Learn about ${g.title.toLowerCase()}`)},`,
    );
    lines.push(`    category: ${JSON.stringify(g.category)} as GuideMeta["category"],`);
    lines.push(`    slug: ${JSON.stringify(g.slug)},`);
    lines.push(`    content: ${varName},`);
    lines.push("  },");
  }

  lines.push("];");
  lines.push("");
  return lines.join("\n");
}

// ── Generate recipe-registry.gen.ts ─────────────────────────────────────────

function generateRecipeRegistry(recipes: RecipeInfo[]): string {
  const lines: string[] = [
    '// AUTO-GENERATED by scripts/generate-learn-registry.ts — do not edit manually',
    'import type { RecipeMeta } from "./types";',
    "",
  ];

  // Imports
  for (const r of recipes) {
    const prefix = toCamelCase(r.slug);
    lines.push(`import ${prefix}Meta from "@learn/recipes/${r.slug}/meta.json";`);
    if (r.hasEvm) {
      lines.push(`import ${prefix}Evm from "@learn/recipes/${r.slug}/evm.tsx?raw";`);
    }
    if (r.hasSolana) {
      lines.push(
        `import ${prefix}Solana from "@learn/recipes/${r.slug}/solana.tsx?raw";`,
      );
    }
    if (r.hasLearn) {
      lines.push(
        `import ${prefix}Learn from "@learn/recipes/${r.slug}/${r.learnFilename}?raw";`,
      );
    }
  }

  lines.push("");
  lines.push("export const recipeRegistry: RecipeMeta[] = [");

  for (const r of recipes) {
    const prefix = toCamelCase(r.slug);
    lines.push("  {");
    lines.push(`    id: ${prefix}Meta.name,`);
    lines.push(`    name: ${prefix}Meta.name,`);
    lines.push(`    description: ${prefix}Meta.description,`);
    lines.push(`    slug: ${prefix}Meta.name,`);
    lines.push(`    chains: ${prefix}Meta.chains,`);
    lines.push(`    dependencies: ${prefix}Meta.dependencies,`);
    lines.push(`    evmCode: ${r.hasEvm ? `${prefix}Evm` : '""'},`);
    lines.push(`    solanaCode: ${r.hasSolana ? `${prefix}Solana` : '""'},`);
    lines.push(`    learnContent: ${r.hasLearn ? `${prefix}Learn` : '""'},`);
    lines.push("  },");
  }

  lines.push("];");
  lines.push("");
  return lines.join("\n");
}

// ── Generate docs-nav.gen.ts ────────────────────────────────────────────────

function generateDocsNav(
  guides: GuideInfo[],
  recipes: RecipeInfo[],
): string {
  const lines: string[] = [
    '// AUTO-GENERATED by scripts/generate-learn-registry.ts — do not edit manually',
    "",
    "export interface DocNavItem {",
    "  label: string;",
    "  slug: string;",
    '  type: "markdown" | "guide" | "recipe";',
    "}",
    "",
    "export interface DocNavSection {",
    "  title: string;",
    "  items: DocNavItem[];",
    "}",
    "",
    "export const docsNavSections: DocNavSection[] = [",
  ];

  // Static doc sections (these don't change with learn repo)
  const staticSections = [
    {
      title: "Getting Started",
      items: [
        { label: "Introduction", slug: "introduction", type: "markdown" },
        { label: "Installation", slug: "installation", type: "markdown" },
        { label: "Project Structure", slug: "project-structure", type: "markdown" },
        { label: "Configuration", slug: "configuration", type: "markdown" },
      ],
    },
    {
      title: "Core Concepts",
      items: [
        { label: "Components", slug: "components", type: "markdown" },
        { label: "Theming", slug: "theming", type: "markdown" },
        { label: "Design Tokens", slug: "design-tokens", type: "markdown" },
        { label: "Accessibility", slug: "accessibility", type: "markdown" },
      ],
    },
    {
      title: "Ecosystem",
      items: [
        { label: "UI Library", slug: "ui-library", type: "markdown" },
        { label: "Registry", slug: "registry", type: "markdown" },
        { label: "CLI", slug: "cli", type: "markdown" },
        { label: "Contracts", slug: "contracts", type: "markdown" },
      ],
    },
    {
      title: "API Reference",
      items: [
        { label: "Components API", slug: "components-api", type: "markdown" },
        { label: "Hooks & Utilities", slug: "hooks-utilities", type: "markdown" },
        { label: "CLI Commands", slug: "cli-commands", type: "markdown" },
      ],
    },
  ];

  for (const section of staticSections) {
    lines.push("  {");
    lines.push(`    title: ${JSON.stringify(section.title)},`);
    lines.push("    items: [");
    for (const item of section.items) {
      lines.push(
        `      { label: ${JSON.stringify(item.label)}, slug: ${JSON.stringify(item.slug)}, type: ${JSON.stringify(item.type)} },`,
      );
    }
    lines.push("    ],");
    lines.push("  },");
  }

  // Group guides by category
  const guidesByCategory = new Map<string, GuideInfo[]>();
  for (const g of guides) {
    const list = guidesByCategory.get(g.category) || [];
    list.push(g);
    guidesByCategory.set(g.category, list);
  }

  // Add guide sections
  for (const [category, categoryGuides] of guidesByCategory) {
    const title =
      guidesByCategory.size === 1
        ? "Guides"
        : `Guides: ${categoryToTitle(category)}`;
    lines.push("  {");
    lines.push(`    title: ${JSON.stringify(title)},`);
    lines.push("    items: [");
    for (const g of categoryGuides) {
      lines.push(
        `      { label: ${JSON.stringify(g.title)}, slug: ${JSON.stringify(g.slug)}, type: "guide" },`,
      );
    }
    lines.push("    ],");
    lines.push("  },");
  }

  // Group recipes by category
  const recipesByCategory = new Map<string, RecipeInfo[]>();
  const categoryOrder = ["wallet", "tokens", "nfts", "defi", "utils"];
  for (const r of recipes) {
    const list = recipesByCategory.get(r.category) || [];
    list.push(r);
    recipesByCategory.set(r.category, list);
  }

  for (const cat of categoryOrder) {
    const catRecipes = recipesByCategory.get(cat);
    if (!catRecipes?.length) continue;
    const title = `Recipes: ${categoryToTitle(cat)}`;
    lines.push("  {");
    lines.push(`    title: ${JSON.stringify(title)},`);
    lines.push("    items: [");
    for (const r of catRecipes) {
      lines.push(
        `      { label: ${JSON.stringify(slugToTitle(r.slug))}, slug: ${JSON.stringify(r.slug)}, type: "recipe" },`,
      );
    }
    lines.push("    ],");
    lines.push("  },");
  }

  lines.push("];");
  lines.push("");
  lines.push("/** Flat ordered list of all nav items (useful for prev/next navigation) */");
  lines.push("export const allDocNavItems = docsNavSections.flatMap((s) =>");
  lines.push('  s.items.map((item) => ({ ...item, section: s.title })),');
  lines.push(");");
  lines.push("");

  return lines.join("\n");
}

// ── Main ────────────────────────────────────────────────────────────────────

console.log("Scanning learn repo...");

const guides = discoverGuides();
console.log(`  Found ${guides.length} guides`);

const recipes = discoverRecipes();
console.log(`  Found ${recipes.length} recipes`);

// Write files
fs.writeFileSync(GUIDE_OUT, generateGuideRegistry(guides));
console.log(`  Wrote ${path.relative(process.cwd(), GUIDE_OUT)}`);

fs.writeFileSync(RECIPE_OUT, generateRecipeRegistry(recipes));
console.log(`  Wrote ${path.relative(process.cwd(), RECIPE_OUT)}`);

fs.writeFileSync(NAV_OUT, generateDocsNav(guides, recipes));
console.log(`  Wrote ${path.relative(process.cwd(), NAV_OUT)}`);

console.log("Done!");
