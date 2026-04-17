import Fuse from "fuse.js";
import { docContentMap } from "../../../entities/guide/model/doc-content.gen";
import { guideRegistry } from "../../../entities/guide";
import { recipeRegistry } from "../../../entities/recipe";
import { allDocNavItems } from "../../../entities/guide/model/docs-nav.gen";

export interface SearchItem {
  title: string;
  description: string;
  href: string;
  type: "doc" | "guide" | "recipe";
}

function buildSearchItems(): SearchItem[] {
  const items: SearchItem[] = [];

  // Doc pages
  for (const item of allDocNavItems) {
    const content = docContentMap[item.slug] ?? "";
    const firstParagraph = content
      .split("\n")
      .filter((line) => line && !line.startsWith("#") && !line.startsWith("```"))
      .slice(0, 2)
      .join(" ")
      .slice(0, 150);
    items.push({
      title: item.label,
      description: firstParagraph || `Documentation for ${item.label}`,
      href: `/docs/${item.slug}`,
      type: "doc",
    });
  }

  // Guides
  for (const guide of guideRegistry) {
    items.push({
      title: guide.title,
      description: guide.description,
      href: `/docs/guide/${guide.slug}`,
      type: "guide",
    });
  }

  // Recipes
  for (const recipe of recipeRegistry) {
    items.push({
      title: recipe.name,
      description: recipe.description,
      href: `/docs/recipe/${recipe.slug}`,
      type: "recipe",
    });
  }

  return items;
}

let searchItems: SearchItem[] | null = null;
let fuse: Fuse<SearchItem> | null = null;

function getIndex() {
  if (!fuse) {
    searchItems = buildSearchItems();
    fuse = new Fuse(searchItems, {
      keys: [
        { name: "title", weight: 2 },
        { name: "description", weight: 1 },
      ],
      threshold: 0.3,
      includeScore: true,
    });
  }
  return { fuse, searchItems: searchItems! };
}

export function searchDocs(query: string): SearchItem[] {
  if (!query.trim()) return [];
  return getIndex()
    .fuse.search(query)
    .map((result) => result.item);
}

export function getSearchItems(): SearchItem[] {
  return getIndex().searchItems;
}
