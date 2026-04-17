import { ArrowRight, Blocks, BookOpen, Database, GraduationCap } from "lucide-react";
import type { ReactNode } from "react";
import { SectionContainer } from "../../../shared/ui/section-container";
import { useScrollReveal } from "../../../shared/lib/use-scroll-animation";
import { getSectionUrl } from "../../../shared/lib/urls";

interface EcosystemCard {
  icon: ReactNode;
  title: string;
  tagline: string;
  features: string[];
  section: string;
  isCurrent?: boolean;
}

const ecosystemCards: EcosystemCard[] = [
  {
    icon: <Blocks size={20} />,
    title: "UI Library",
    tagline: "Production-ready Web3 components",
    features: ["50+ React components", "Wallet, chain, token UIs", "Fully typed & themed"],
    section: "ui",
  },
  {
    icon: <BookOpen size={20} />,
    title: "Documentation",
    tagline: "Guides & API reference",
    features: ["Step-by-step tutorials", "Full API documentation", "Code examples"],
    section: "docs",
    isCurrent: true,
  },
  {
    icon: <Database size={20} />,
    title: "Registry",
    tagline: "Chain & token data",
    features: ["14 chains, 18 tokens", "RPC URLs & explorers", "Typed & queryable"],
    section: "registry",
  },
  {
    icon: <GraduationCap size={20} />,
    title: "Learn",
    tagline: "Interactive courses",
    features: ["Hands-on recipes", "Build real dApps", "Beginner to advanced"],
    section: "learn",
  },
];

function EcosystemCardItem({ icon, title, tagline, features, section, isCurrent }: EcosystemCard) {
  return (
    <div
      className={`flex h-full flex-col gap-5 rounded-xl p-6 backdrop-blur-xl transition-all ${
        isCurrent
          ? "border border-w3-accent bg-w3-accent-subtle shadow-[var(--w3-glass-shadow)]"
          : "glass-bg"
      }`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${
          isCurrent ? "bg-w3-accent text-white" : "bg-w3-accent-subtle text-w3-accent"
        }`}
        aria-hidden="true"
      >
        {icon}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-w3-gray-900">
          {title}
          {isCurrent && (
            <span className="ml-2 rounded-full bg-w3-accent px-2 py-0.5 align-middle text-[10px] font-medium text-white">
              You are here
            </span>
          )}
        </h3>
        <p className="text-xs text-w3-gray-500">{tagline}</p>
      </div>

      <ul className="flex flex-col gap-1.5">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-xs text-w3-gray-600">
            <span
              className="inline-block h-1 w-1 flex-shrink-0 rounded-full bg-w3-accent"
              aria-hidden="true"
            />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <a
          href={getSectionUrl(section)}
          className="group inline-flex items-center gap-1.5 text-xs font-medium text-w3-accent transition-all"
        >
          Explore
          <ArrowRight
            size={12}
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  );
}

export function DocsEcosystemSection() {
  const containerRef = useScrollReveal({ stagger: 0.1, y: 30 });

  return (
    <SectionContainer className="py-20 md:py-32" id="ecosystem">
      <div ref={containerRef} className="flex flex-col gap-10">
        <div data-reveal className="flex flex-col gap-3">
          <p className="text-sm font-medium uppercase tracking-wider text-w3-accent">ECOSYSTEM</p>
          <h2 className="text-3xl font-semibold tracking-tight text-w3-gray-900 sm:text-4xl">
            The W3 Ecosystem
          </h2>
          <p className="max-w-md text-base text-w3-gray-600">
            One toolkit. Five tools. Everything connects.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ecosystemCards.map((card) => (
            <div key={card.section} data-reveal className="h-full">
              <EcosystemCardItem {...card} />
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
