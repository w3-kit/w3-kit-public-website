import { SectionContainer } from "~/shared/ui/section-container";
import { useScrollReveal } from "~/shared/lib/use-scroll-animation";
import { CodeSnippet } from "./code-snippet";
import { StepItem } from "./step-item";

const QUICK_START_CODE = `# Install w3-kit in your project
npx w3-kit init

# Add a component
npx w3-kit add connect-wallet

# Start building
npm run dev`;

const steps = [
  {
    number: 1,
    title: "Install the CLI",
    description:
      "One command bootstraps your project with the right config, chains, and dependencies.",
  },
  {
    number: 2,
    title: "Pick your components",
    description:
      "Choose from wallets, chain selectors, token displays, and more — all typed and themed.",
  },
  {
    number: 3,
    title: "Start building",
    description:
      "Components drop into your codebase. No lock-in, full ownership, ready for production.",
  },
];

export function QuickStartSection() {
  const stepsRef = useScrollReveal({ stagger: 0.15, y: 30 });

  return (
    <SectionContainer className="py-20 md:py-32 lg:py-40" id="quickstart">
      <div className="flex flex-col gap-16">
        {/* Section header */}
        <div className="flex max-w-xl flex-col gap-4">
          <p
            className="text-sm font-medium uppercase tracking-wider"
            style={{ color: "var(--w3-accent)" }}
          >
            Quick Start
          </p>
          <h2
            className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
            style={{
              color: "var(--w3-gray-900)",
              letterSpacing: "-0.02em",
            }}
          >
            Up and running
            <br />
            in seconds.
          </h2>
        </div>

        {/* Content: code + steps */}
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Code block */}
          <div data-reveal>
            <CodeSnippet code={QUICK_START_CODE} language="terminal" />
          </div>

          {/* Steps */}
          <div ref={stepsRef} className="flex flex-col gap-8 lg:pt-4">
            {steps.map((step) => (
              <StepItem key={step.number} {...step} />
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
