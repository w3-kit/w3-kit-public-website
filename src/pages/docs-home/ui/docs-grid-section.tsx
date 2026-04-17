import { ArrowRight, Blocks, BookOpen, Code, Palette, Rocket, Terminal } from "lucide-react";
import type { ReactNode } from "react";
import { SectionContainer } from "../../../shared/ui/section-container";
import { useScrollReveal } from "../../../shared/lib/use-scroll-animation";
import { getSectionUrl } from "../../../shared/lib/urls";

interface DocCard {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
}

const docCards: DocCard[] = [
  {
    icon: <Rocket size={24} />,
    title: "Quick Start",
    description: "Get up and running in under 5 minutes",
    href: "/introduction",
  },
  {
    icon: <Blocks size={24} />,
    title: "Components",
    description: "Explore 27+ production-ready Web3 components",
    href: "/components",
  },
  {
    icon: <Code size={24} />,
    title: "API Reference",
    description: "Complete API documentation for all packages",
    href: "/components-api",
  },
  {
    icon: <BookOpen size={24} />,
    title: "Recipes & Examples",
    description: "Copy-paste code for common Web3 patterns",
    href: "/recipe/connect-wallet",
  },
  {
    icon: <Palette size={24} />,
    title: "Theming & Tokens",
    description: "Customize colors, fonts, and design tokens",
    href: "/theming",
  },
  {
    icon: <Terminal size={24} />,
    title: "CLI Reference",
    description: "w3-kit init, add, and more",
    href: "/cli-commands",
  },
];

function DocCardItem({ icon, title, description, href }: DocCard) {
  const docsBase = getSectionUrl("docs");

  return (
    <a
      href={`${docsBase}${href}`}
      className="glass-bg group flex flex-col gap-4 rounded-xl p-6 transition-all hover:scale-[1.02]"
    >
      <div className="text-w3-accent" aria-hidden="true">
        {icon}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-w3-gray-900">{title}</h3>
          <ArrowRight
            size={14}
            className="flex-shrink-0 translate-x-0 text-w3-accent opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>
        <p className="text-sm leading-relaxed text-w3-gray-600">{description}</p>
      </div>
    </a>
  );
}

export function DocsGridSection() {
  const containerRef = useScrollReveal({ stagger: 0.08, start: "top 88%" });

  return (
    <SectionContainer className="py-20 md:py-32" id="documentation">
      <div ref={containerRef} className="flex flex-col gap-10">
        <div data-reveal className="flex flex-col gap-3">
          <p className="text-sm font-medium uppercase tracking-wider text-w3-accent">
            DOCUMENTATION
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-w3-gray-900 sm:text-4xl">
            Everything in One Place
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {docCards.map((card) => (
            <div key={card.href} data-reveal>
              <DocCardItem {...card} />
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
