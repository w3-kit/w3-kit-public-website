import "~/shared/lib/gsap-plugins";

import { PageShell } from "~/widgets/page-shell";
import { HeroSection } from "./hero-section";
import { EcosystemSection } from "./ecosystem-section";
import { QuickStartSection } from "./quick-start-section";
import { DeepDiveSection } from "./deep-dive-section";
import { FeaturesGridSection } from "./features-grid-section";
import { OpenSourceSection } from "./open-source-section";
import { CtaSection } from "./cta-section";

export function LandingPage() {
  return (
    <PageShell section="landing">
      <HeroSection />
      <EcosystemSection />
      <QuickStartSection />
      <DeepDiveSection />
      <FeaturesGridSection />
      <OpenSourceSection />
      <CtaSection />
    </PageShell>
  );
}
