import "../../../shared/lib/gsap-plugins";

import { PageShell } from "../../../widgets/page-shell";
import { HeroSection } from "./hero-section";
import { BentoSection } from "./bento-section";
import { EcosystemMapSection } from "./ecosystem-map-section";
import { CtaSection } from "./cta-section";

export function LandingPage() {
  return (
    <PageShell section="landing" transparentHeader>
      <HeroSection />
      <BentoSection />
      <EcosystemMapSection />
      <CtaSection />
    </PageShell>
  );
}
