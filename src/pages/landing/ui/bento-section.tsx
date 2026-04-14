import { SectionContainer } from "../../../shared/ui/section-container";
import { useScrollReveal } from "../../../shared/lib/use-scroll-animation";
import {
  CliCell,
  EcosystemCell,
  OwnCodeCell,
  Web3Cell,
  ThemeCell,
  RecipesCell,
  OpenSourceCell,
} from "./bento-cells";

export function BentoSection() {
  const containerRef = useScrollReveal({ stagger: 0.08, start: "top 90%" });

  return (
    <SectionContainer className="-mt-24 relative z-20 md:-mt-32" id="whats-inside">
      <div ref={containerRef} className="grid auto-rows-[minmax(180px,_1fr)] gap-4 md:grid-cols-3">
        {/* Row 1: CLI (large) + Ecosystem (medium) */}
        <div data-reveal className="md:col-span-2">
          <CliCell />
        </div>
        <div data-reveal>
          <EcosystemCell />
        </div>

        {/* Row 2: Own Code (small) + Built for Web3 (medium) + Themes (small) */}
        <div data-reveal>
          <OwnCodeCell />
        </div>
        <div data-reveal>
          <Web3Cell />
        </div>
        <div data-reveal>
          <ThemeCell />
        </div>

        {/* Row 3: Recipes (large) + Open Source (medium) */}
        <div data-reveal className="md:col-span-2">
          <RecipesCell />
        </div>
        <div data-reveal>
          <OpenSourceCell />
        </div>
      </div>
    </SectionContainer>
  );
}
