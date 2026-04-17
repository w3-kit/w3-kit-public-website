import "../../../shared/lib/gsap-plugins";

import { DocsShell } from "../../../widgets/docs-shell";
import { DocsHeroSection } from "./docs-hero-section";
import { DocsFeaturesBento } from "./docs-features-bento";
import { DocsEcosystemSection } from "./docs-ecosystem-section";
import { DocsGridSection } from "./docs-grid-section";
import { DocsCtaSection } from "./docs-cta-section";

export function DocsHomePage() {
  return (
    <DocsShell>
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute right-[-15%] top-[-5%] h-[700px] w-[700px] rounded-full bg-w3-glow-accent opacity-40 blur-[160px]" />
          <div className="absolute left-[-10%] top-[5%] h-[500px] w-[500px] rounded-full bg-w3-accent-subtle opacity-35 blur-[140px]" />
          <div className="absolute right-[-5%] top-[30%] h-[600px] w-[600px] rounded-full bg-w3-glow-accent opacity-25 blur-[180px]" />
          <div className="absolute left-[-10%] top-[55%] h-[500px] w-[500px] rounded-full bg-w3-accent-subtle opacity-20 blur-[160px]" />
          <div className="absolute bottom-[10%] left-[20%] h-[500px] w-[600px] rounded-full bg-w3-glow-accent opacity-35 blur-[160px]" />
          <div className="absolute bottom-0 right-[-10%] h-[400px] w-[400px] rounded-full bg-w3-accent-subtle opacity-25 blur-[140px]" />
        </div>

        <DocsHeroSection />
        <DocsFeaturesBento />
        <DocsEcosystemSection />
        <DocsGridSection />
        <DocsCtaSection />
      </div>
    </DocsShell>
  );
}
