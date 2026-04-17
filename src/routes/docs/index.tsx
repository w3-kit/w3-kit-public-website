import { createFileRoute } from "@tanstack/react-router";
import { DocsHomePage } from "../../pages/docs-home";

export const Route = createFileRoute("/docs/")({
  component: DocsHomePage,
});
