import { Code, Eye, Globe, Moon, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { SectionContainer } from "../../../shared/ui/section-container";
import { useScrollReveal } from "../../../shared/lib/use-scroll-animation";

interface FeatureCard {
  icon: ReactNode;
  title: string;
  description: string;
}

const features: FeatureCard[] = [
  {
    icon: <Globe size={20} />,
    title: "Framework Agnostic",
    description:
      "Works with any React framework. Next.js, Remix, Vite — just install and use.",
  },
  {
    icon: <Zap size={20} />,
    title: "Lightweight",
    description:
      "Zero runtime dependencies. Tree-shakable exports. Only pay for what you use.",
  },
  {
    icon: <Eye size={20} />,
    title: "Accessible",
    description:
      "WCAG 2.1 AA compliant. Full keyboard navigation. Screen reader tested.",
  },
  {
    icon: <Code size={20} />,
    title: "TypeScript-First",
    description:
      "End-to-end type safety. IntelliSense everywhere. No @types packages needed.",
  },
  {
    icon: <Moon size={20} />,
    title: "Dark Mode",
    description:
      "Beautiful light and dark themes built in. System preference detection. CSS variable tokens.",
  },
];

function FeatureCardItem({ icon, title, description }: FeatureCard) {
  return (
    <div
      className="flex h-full flex-col gap-4 rounded-xl p-8"
      style={{
        background: "var(--w3-glass-bg)",
        border: "1px solid var(--w3-glass-border)",
        boxShadow: "var(--w3-glass-shadow)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Icon box */}
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{
          background: "var(--w3-accent-subtle)",
          color: "var(--w3-accent)",
        }}
        aria-hidden="true"
      >
        {icon}
      </div>

      <div className="flex flex-col gap-2">
        <h3
          className="text-lg font-semibold"
          style={{ color: "var(--w3-gray-900)" }}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--w3-gray-600)" }}>
          {description}
        </p>
      </div>
    </div>
  );
}

export function DocsFeaturesBento() {
  const containerRef = useScrollReveal({ stagger: 0.08, start: "top 90%" });

  return (
    <SectionContainer className="py-20 md:py-32">
      <div ref={containerRef} className="flex flex-col gap-10">
        {/* Section header */}
        <div data-reveal className="flex flex-col gap-3">
          <p
            className="text-sm font-medium uppercase tracking-wider"
            style={{ color: "var(--w3-accent)" }}
          >
            WHY W3 KIT
          </p>
          <h2
            className="text-3xl font-semibold sm:text-4xl"
            style={{ color: "var(--w3-gray-900)", letterSpacing: "-0.02em" }}
          >
            Built for Web3 Developers
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Row 1: 2-col card + 1-col card */}
          <div data-reveal className="md:col-span-2">
            <FeatureCardItem {...features[0]} />
          </div>
          <div data-reveal>
            <FeatureCardItem {...features[1]} />
          </div>

          {/* Row 2: 3 equal cards */}
          <div data-reveal>
            <FeatureCardItem {...features[2]} />
          </div>
          <div data-reveal>
            <FeatureCardItem {...features[3]} />
          </div>
          <div data-reveal>
            <FeatureCardItem {...features[4]} />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
