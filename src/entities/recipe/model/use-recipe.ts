import { recipeRegistry } from "./recipe-registry.gen";
import type { RecipeMeta } from "./types";

export function useRecipe(slug: string): RecipeMeta | undefined {
  return recipeRegistry.find((r) => r.slug === slug);
}
