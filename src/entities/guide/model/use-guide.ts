import { guideRegistry } from "./guide-registry.gen";
import type { GuideMeta } from "./types";

export function useGuide(slug: string): GuideMeta | undefined {
  return guideRegistry.find((g) => g.slug === slug);
}
