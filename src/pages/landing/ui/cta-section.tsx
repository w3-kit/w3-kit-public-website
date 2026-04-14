import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "../../../shared/ui/button";
import { SectionContainer } from "../../../shared/ui/section-container";
import { useScrollReveal } from "../../../shared/lib/use-scroll-animation";
import { getSectionUrl } from "../../../shared/lib/urls";

export function CtaSection() {
  const containerRef = useScrollReveal({ y: 20 });

  return (
    <SectionContainer className="py-20 md:py-32 lg:py-40">
      <div
        ref={containerRef}
        className="flex flex-col items-center gap-8 rounded-2xl px-8 py-16 text-center md:px-16 md:py-24"
        style={{
          background: "var(--w3-surface-translucent)",
          border: "1px solid var(--w3-border-subtle)",
        }}
      >
        <h2
          data-reveal
          className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          style={{ color: "var(--w3-gray-900)", letterSpacing: "-0.02em" }}
        >
          Ready to build?
        </h2>

        <p
          data-reveal
          className="max-w-md text-lg"
          style={{ color: "var(--w3-gray-600)", lineHeight: 1.6 }}
        >
          Get started with w3-kit in minutes. Install the CLI, pick your components, and ship.
        </p>

        <div data-reveal className="flex flex-wrap items-center justify-center gap-3">
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
            render={<a href={getSectionUrl("docs")} />}
          >
            <BookOpen size={16} />
            Read the Docs
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
