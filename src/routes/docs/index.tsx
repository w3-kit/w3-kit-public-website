import { createFileRoute } from "@tanstack/react-router";
import { UnderConstruction } from "../../shared/ui/under-construction";

export const Route = createFileRoute("/docs/")({
  component: () => (
    <UnderConstruction
      section="Documentation"
      description="Guides, recipes, and API reference."
    />
  ),
});
