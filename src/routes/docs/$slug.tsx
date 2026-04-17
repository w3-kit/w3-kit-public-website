import { createFileRoute } from "@tanstack/react-router";
import { DocPage } from "../../pages/doc-page";

export const Route = createFileRoute("/docs/$slug")({
  component: DocPage,
});
