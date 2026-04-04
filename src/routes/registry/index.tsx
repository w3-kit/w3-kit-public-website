import { createFileRoute } from "@tanstack/react-router";
import { UnderConstructionLayout } from "../../pages/under-construction/layout";
import { RegistryAnimation } from "../../pages/under-construction/registry-animation";

export const Route = createFileRoute("/registry/")({
  component: () => (
    <UnderConstructionLayout
      section="registry"
      title="Registry"
      description="Browse chains, tokens, and contracts."
      animation={<RegistryAnimation />}
    />
  ),
});
