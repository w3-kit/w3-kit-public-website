import { ArrowRight } from "lucide-react";
import { Button } from "../../../shared/ui/button";
import { SectionContainer } from "../../../shared/ui/section-container";
import { useScrollReveal } from "../../../shared/lib/use-scroll-animation";
import { GitHubIcon } from "./github-icon";

export function CtaSection() {
  const containerRef = useScrollReveal({ y: 20 });

  return (
    <SectionContainer className="py-20 md:py-32 lg:py-40">
      <div ref={containerRef} className="relative">
        {/* Accent glow behind the card */}
        <div
          className="pointer-events-none absolute -inset-4 rounded-3xl opacity-50 blur-3xl"
          style={{ background: "var(--w3-glow-accent)" }}
          aria-hidden="true"
        />

        {/* Card */}
        <div
          data-reveal
          className="relative flex flex-col items-center gap-6 rounded-2xl px-8 py-16 text-center backdrop-blur-xl md:px-16 md:py-20"
          style={{
            background: "var(--w3-glass-bg)",
            border: "1px solid var(--w3-glass-border)",
            boxShadow: "var(--w3-glass-shadow)",
          }}
        >
          <h2
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ color: "var(--w3-gray-900)", letterSpacing: "-0.02em" }}
          >
            Ready to build?
          </h2>

          <p
            className="max-w-md text-base"
            style={{ color: "var(--w3-gray-600)", lineHeight: 1.6 }}
          >
            Open source and free forever.
            <br />
            Start shipping in minutes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="gap-2 px-6 py-5 text-sm"
              render={<a href="https://docs.w3-kit.com/getting-started" />}
            >
              Get Started
              <ArrowRight size={16} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 px-6 py-5 text-sm"
              render={
                <a href="https://github.com/w3-kit" target="_blank" rel="noopener noreferrer" />
              }
            >
              <GitHubIcon size={16} />
              Star on GitHub
            </Button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
