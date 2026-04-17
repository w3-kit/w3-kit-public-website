import { createFileRoute } from "@tanstack/react-router";
import { GuideDetailPage } from "../../../pages/guide-detail";

export const Route = createFileRoute("/docs/guide/$guideSlug")({
  component: GuideDetailPage,
});
