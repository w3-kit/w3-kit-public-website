import {
  Code2,
  Globe,
  TreePine,
  Palette,
  Layers,
  FileType2,
  GitFork,
  Puzzle,
  Zap,
} from "lucide-react";
import { SectionContainer } from "~/shared/ui/section-container";
import { useScrollReveal } from "~/shared/lib/use-scroll-animation";
import { FeatureCard } from "./feature-card";

const features = [
  {
    icon: <Code2 size={20} />,
    title: "TypeScript-First",
    description:
      "Every component, hook, and utility is written in TypeScript with full type safety.",
  },
  {
    icon: <Globe size={20} />,
    title: "Multi-Chain Support",
    description: "Built for Ethereum, Polygon, Arbitrum, Base, and any EVM-compatible chain.",
  },
  {
    icon: <TreePine size={20} />,
    title: "Tree-Shakeable",
    description: "Import only what you use. No bloated bundles — every byte is intentional.",
  },
  {
    icon: <Palette size={20} />,
    title: "Theme-Aware",
    description:
      "Light and dark mode out of the box. Seamless integration with your design system.",
  },
  {
    icon: <Layers size={20} />,
    title: "DDD Architecture",
    description: "Domain-driven design patterns keep your codebase clean as it scales.",
  },
  {
    icon: <FileType2 size={20} />,
    title: "Fully Typed APIs",
    description: "Contract ABIs, chain configs, and token metadata — all typed end to end.",
  },
  {
    icon: <GitFork size={20} />,
    title: "Open Source",
    description: "MIT licensed. Fork it, extend it, contribute back. Built by the community.",
  },
  {
    icon: <Puzzle size={20} />,
    title: "Framework Agnostic",
    description: "Works with Next.js, Vite, Remix, and any React-based framework.",
  },
  {
    icon: <Zap size={20} />,
    title: "Zero Config",
    description:
      "Sensible defaults that work. Override only when you want to — not because you have to.",
  },
];

export function FeaturesGridSection() {
  const containerRef = useScrollReveal({ stagger: 0.08, start: "top 85%" });

  return (
    <SectionContainer className="py-20 md:py-32 lg:py-40" id="why">
      <div className="flex flex-col gap-16">
        {/* Section header */}
        <div className="flex max-w-xl flex-col gap-4">
          <p
            className="text-sm font-medium uppercase tracking-wider"
            style={{ color: "var(--w3-accent)" }}
          >
            Why w3-kit
          </p>
          <h2
            className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
            style={{ color: "var(--w3-gray-900)", letterSpacing: "-0.02em" }}
          >
            Built for the
            <br />
            way you work.
          </h2>
          <p className="text-lg" style={{ color: "var(--w3-gray-600)", lineHeight: 1.6 }}>
            Every decision in w3-kit is made with developer experience in mind.
          </p>
        </div>

        {/* Grid */}
        <div ref={containerRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
