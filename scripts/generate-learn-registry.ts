/**
 * Auto-discovery script for the learn repo.
 *
 * Scans ../learn/guides/, ../learn/recipes/, and ../learn/docs/ at build time,
 * then generates:
 *   - src/entities/guide/model/guide-registry.gen.ts
 *   - src/entities/recipe/model/recipe-registry.gen.ts
 *   - src/entities/guide/model/docs-nav.gen.ts
 *   - src/entities/guide/model/doc-content.gen.ts
 *
 * Run: npx tsx scripts/generate-learn-registry.ts
 * Wired into: "prebuild" and "predev" npm scripts
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const REPO_ROOT = path.resolve(import.meta.dirname, "..");

const WORKSPACE_ROOTS = Array.from(
  new Set(
    [
      process.env.W3_KIT_WORKSPACE_ROOT,
      REPO_ROOT,
      path.resolve(REPO_ROOT, ".."),
      path.resolve(REPO_ROOT, "../.."),
      path.resolve(REPO_ROOT, "../../.."),
    ]
      .filter((root): root is string => Boolean(root))
      .map((root) => path.resolve(root)),
  ),
);

function findExistingDirectory(relativePaths: string[]): string | null {
  for (const relativePath of relativePaths) {
    for (const root of WORKSPACE_ROOTS) {
      const candidate = path.join(root, relativePath);
      if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
        return candidate;
      }
    }
  }
  return null;
}

const LEARN_DIR = findExistingDirectory(["learn", "w3-kit-learn/mirror"]);
const GUIDES_DIR = LEARN_DIR ? path.join(LEARN_DIR, "guides") : "";
const RECIPES_DIR = LEARN_DIR ? path.join(LEARN_DIR, "recipes") : "";
const DOCS_DIR = LEARN_DIR ? path.join(LEARN_DIR, "docs") : "";

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
const DOC_CONTENT_OUT = path.resolve(
  import.meta.dirname,
  "../src/entities/guide/model/doc-content.gen.ts",
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
  return slug.replace(/-(.)/g, (_, c) => c.toUpperCase());
}

// Map git author names to GitHub usernames
const GIT_NAME_TO_GITHUB: Record<string, string> = {
  "Petar Stoev": "PetarStoev02",
  "Raad05": "Raad05",
};

function getGitAuthor(filePath: string): string {
  if (!LEARN_DIR) return "PetarStoev02";
  try {
    const result = execSync(
      `git -C ${JSON.stringify(LEARN_DIR)} log --diff-filter=A --format=%an -- ${JSON.stringify(filePath)}`,
      { encoding: "utf-8" },
    ).trim();
    if (!result) return "PetarStoev02";
    // Map git name to GitHub username
    return GIT_NAME_TO_GITHUB[result] ?? result;
  } catch {
    return "PetarStoev02";
  }
}

// ── Discover Guides ─────────────────────────────────────────────────────────

interface GuideInfo {
  slug: string;
  category: string;
  title: string;
  author: string;
  content: string;
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

      // Resolve author from git log on the original file commit
      const relPath = path.join("guides", category, file);
      const author = getGitAuthor(relPath);

      guides.push({
        slug,
        category,
        title,
        author,
        content,
      });
    }
  }

  return guides;
}

// ── Discover Recipes ────────────────────────────────────────────────────────

interface RecipeInfo {
  slug: string;
  category: string; // derived from meta.json chains or manual grouping
  meta: {
    name: string;
    description: string;
    chains: string[];
    dependencies: Record<string, string[]>;
    author?: string;
  };
  evmCode: string;
  solanaCode: string;
  learnContent: string;
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
    const evmPath = path.join(recipeDir, "evm.tsx");
    const solanaPath = path.join(recipeDir, "solana.tsx");
    const learnFile = fs
      .readdirSync(recipeDir)
      .find((f) => f.endsWith(".learn.md"));

    recipes.push({
      slug: dir,
      category: getRecipeCategory(dir, meta),
      meta,
      evmCode: fs.existsSync(evmPath) ? fs.readFileSync(evmPath, "utf-8") : "",
      solanaCode: fs.existsSync(solanaPath) ? fs.readFileSync(solanaPath, "utf-8") : "",
      learnContent: learnFile
        ? fs.readFileSync(path.join(recipeDir, learnFile), "utf-8")
        : "",
    });
  }

  return recipes;
}

// ── Discover Docs ────────────────────────────────────────────────────────────

interface DocInfo {
  slug: string;
  content: string;
}

function discoverDocs(): DocInfo[] {
  if (!fs.existsSync(DOCS_DIR)) {
    return Object.keys(DOC_SECTION_MAP).map((slug) => ({
      slug,
      content: `# ${slugToTitle(slug)}\n\nDocumentation for this page is being migrated into the website build.\n`,
    }));
  }

  const docs: DocInfo[] = [];

  const files = fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  for (const file of files) {
    docs.push({
      slug: file.replace(/\.md$/, ""),
      content: fs.readFileSync(path.join(DOCS_DIR, file), "utf-8"),
    });
  }

  return docs;
}

// ── Generate guide-registry.gen.ts ──────────────────────────────────────────

function generateGuideRegistry(guides: GuideInfo[]): string {
  const lines: string[] = [
    '// AUTO-GENERATED by scripts/generate-learn-registry.ts — do not edit manually',
    'import type { GuideMeta } from "./types";',
    "",
  ];
  lines.push("export const guideRegistry: GuideMeta[] = [");

  for (const g of guides) {
    lines.push("  {");
    lines.push(`    id: ${JSON.stringify(g.slug)},`);
    lines.push(`    title: ${JSON.stringify(g.title)},`);
    lines.push(
      `    description: ${JSON.stringify(`Learn about ${g.title.toLowerCase()}`)},`,
    );
    lines.push(`    category: ${JSON.stringify(g.category)} as GuideMeta["category"],`);
    lines.push(`    slug: ${JSON.stringify(g.slug)},`);
    lines.push(`    content: ${JSON.stringify(g.content)},`);
    lines.push(`    author: ${JSON.stringify(g.author)},`);
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
  lines.push("export const recipeRegistry: RecipeMeta[] = [");

  for (const r of recipes) {
    lines.push("  {");
    lines.push(`    id: ${JSON.stringify(r.meta.name)},`);
    lines.push(`    name: ${JSON.stringify(r.meta.name)},`);
    lines.push(`    description: ${JSON.stringify(r.meta.description)},`);
    lines.push(`    slug: ${JSON.stringify(r.meta.name)},`);
    lines.push(`    chains: ${JSON.stringify(r.meta.chains)},`);
    lines.push(`    dependencies: ${JSON.stringify(r.meta.dependencies)},`);
    lines.push(`    evmCode: ${JSON.stringify(r.evmCode)},`);
    lines.push(`    solanaCode: ${JSON.stringify(r.solanaCode)},`);
    lines.push(`    learnContent: ${JSON.stringify(r.learnContent)},`);
    lines.push(`    author: ${JSON.stringify(r.meta.author ?? "")},`);
    lines.push("  },");
  }

  lines.push("];");
  lines.push("");
  return lines.join("\n");
}

// ── Generate doc-content.gen.ts ──────────────────────────────────────────────

function generateDocContent(docs: DocInfo[]): string {
  const lines: string[] = [
    '// AUTO-GENERATED by scripts/generate-learn-registry.ts — do not edit manually',
    "",
  ];
  lines.push("export const docContentMap: Record<string, string> = {");

  for (const doc of docs) {
    lines.push(`  ${JSON.stringify(doc.slug)}: ${JSON.stringify(doc.content)},`);
  }

  lines.push("};");
  lines.push("");
  return lines.join("\n");
}

// ── Generate docs-nav.gen.ts ────────────────────────────────────────────────

// Static mapping of doc slug → section title
const DOC_SECTION_MAP: Record<string, string> = {
  introduction: "Getting Started",
  installation: "Getting Started",
  "project-structure": "Getting Started",
  configuration: "Getting Started",
  components: "Core Concepts",
  theming: "Core Concepts",
  "design-tokens": "Core Concepts",
  accessibility: "Core Concepts",
  "ui-library": "Ecosystem",
  registry: "Ecosystem",
  cli: "Ecosystem",
  contracts: "Ecosystem",
  "components-api": "API Reference",
  "hooks-utilities": "API Reference",
  "cli-commands": "API Reference",
};

// Preserve display order within each section
const SECTION_ORDER = ["Getting Started", "Core Concepts", "Ecosystem", "API Reference", "Other"];

function generateDocsNav(
  docs: DocInfo[],
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

  // Build doc sections from discovered docs, grouped by the static map
  const sectionMap = new Map<string, DocInfo[]>();
  for (const doc of docs) {
    const section = DOC_SECTION_MAP[doc.slug] ?? "Other";
    const list = sectionMap.get(section) ?? [];
    list.push(doc);
    sectionMap.set(section, list);
  }

  for (const sectionTitle of SECTION_ORDER) {
    const sectionDocs = sectionMap.get(sectionTitle);
    if (!sectionDocs?.length) continue;
    lines.push("  {");
    lines.push(`    title: ${JSON.stringify(sectionTitle)},`);
    lines.push("    items: [");
    for (const doc of sectionDocs) {
      lines.push(
        `      { label: ${JSON.stringify(slugToTitle(doc.slug))}, slug: ${JSON.stringify(doc.slug)}, type: "markdown" },`,
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
const outFiles = [GUIDE_OUT, RECIPE_OUT, NAV_OUT, DOC_CONTENT_OUT];

if (!LEARN_DIR) {
  if (outFiles.every((file) => fs.existsSync(file))) {
    console.warn("  learn repo not found, reusing committed generated registries");
    process.exit(0);
  }
  console.warn("  learn repo not found, generating empty registries");
}

const guides = discoverGuides();
console.log(`  Found ${guides.length} guides`);

const recipes = discoverRecipes();
console.log(`  Found ${recipes.length} recipes`);

const docs = discoverDocs();
console.log(`  Found ${docs.length} doc pages`);

// Write files
fs.writeFileSync(GUIDE_OUT, generateGuideRegistry(guides));
console.log(`  Wrote ${path.relative(process.cwd(), GUIDE_OUT)}`);

fs.writeFileSync(RECIPE_OUT, generateRecipeRegistry(recipes));
console.log(`  Wrote ${path.relative(process.cwd(), RECIPE_OUT)}`);

fs.writeFileSync(NAV_OUT, generateDocsNav(docs, guides, recipes));
console.log(`  Wrote ${path.relative(process.cwd(), NAV_OUT)}`);

fs.writeFileSync(DOC_CONTENT_OUT, generateDocContent(docs));
console.log(`  Wrote ${path.relative(process.cwd(), DOC_CONTENT_OUT)}`);

// Format generated files so format:check passes in CI
execSync(`npx prettier --write ${outFiles.map((f) => JSON.stringify(f)).join(" ")}`, {
  stdio: "ignore",
});

console.log("Done!");
