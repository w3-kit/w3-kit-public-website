import { createFileRoute } from "@tanstack/react-router";
import { RecipeDetailPage } from "../../../pages/recipe-detail";

export const Route = createFileRoute("/docs/recipe/$recipeSlug")({
  component: RecipeDetailPage,
});
