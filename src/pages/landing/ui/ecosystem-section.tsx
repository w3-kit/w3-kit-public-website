import { Blocks, BookOpen, Database } from "lucide-react";
import { SectionContainer } from "~/shared/ui/section-container";
import { useScrollReveal } from "~/shared/lib/use-scroll-animation";
import { getSectionUrl } from "~/shared/lib/urls";
import { EcosystemCard } from "./ecosystem-card";

const pillars = [
  {
    icon: <Blocks size={24} />,
    title: "UI Components",
    description:
      "Production-ready React components for wallets, chains, tokens, and more. Fully typed, theme-aware, and tree-shakeable.",
    section: "ui",
    label: "Explore components",
  },
  {
    icon: <BookOpen size={24} />,
    title: "Docs & Recipes",
    description:
      "Step-by-step guides from connecting a wallet to building a full dApp. Battle-tested patterns for real-world applications.",
    section: "docs",
    label: "Read the docs",
  },
  {
    icon: <Database size={24} />,
    title: "Registry",
    description:
      "Browse chains, tokens, contracts, and ABIs. A curated, typed registry powering every component in the toolkit.",
    section: "registry",
    label: "Browse registry",
  },
];

export function EcosystemSection() {
  const containerRef = useScrollReveal({ stagger: 0.15 });

  return (
    <SectionContainer className="py-20 md:py-32 lg:py-40" id="ecosystem">
      <div className="flex flex-col gap-16">
        {/* Section header */}
        <div className="flex max-w-xl flex-col gap-4">
          <p
            className="text-sm font-medium uppercase tracking-wider"
            style={{ color: "var(--w3-accent)" }}
          >
            Ecosystem
          </p>
          <h2
            className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
            style={{
              color: "var(--w3-gray-900)",
              letterSpacing: "-0.02em",
            }}
          >
            One toolkit.
            <br />
            Three pillars.
          </h2>
          <p className="text-lg" style={{ color: "var(--w3-gray-600)", lineHeight: 1.6 }}>
            Everything you need to build, learn, and ship web3 applications — organized, typed, and
            ready to use.
          </p>
        </div>

        {/* Cards grid */}
        <div ref={containerRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <EcosystemCard
              key={pillar.section}
              icon={pillar.icon}
              title={pillar.title}
              description={pillar.description}
              href={getSectionUrl(pillar.section)}
              label={pillar.label}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
