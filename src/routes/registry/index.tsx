import { createFileRoute } from "@tanstack/react-router";
import { UnderConstruction } from "../../shared/ui/under-construction";

export const Route = createFileRoute("/registry/")({
  component: () => (
    <UnderConstruction
      section="Registry"
      description="Browse chains, tokens, and contracts."
    />
  ),
});
