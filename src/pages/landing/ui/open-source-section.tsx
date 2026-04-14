import { Heart, Star } from "lucide-react";
import { GitHubIcon } from "./github-icon";
import { Button } from "~/shared/ui/button";
import { SectionContainer } from "~/shared/ui/section-container";
import { useScrollReveal } from "~/shared/lib/use-scroll-animation";

export function OpenSourceSection() {
  const containerRef = useScrollReveal({ y: 30 });

  return (
    <SectionContainer
      className="py-20 md:py-32 lg:py-40"
      wrapperClassName="relative overflow-hidden"
      id="community"
    >
      {/* Subtle accent background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--w3-accent-subtle) 50%, transparent 100%)",
        }}
      />

      <div ref={containerRef} className="relative flex flex-col items-center gap-8 text-center">
        <div
          data-reveal
          className="flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{
            background: "var(--w3-accent-subtle)",
            color: "var(--w3-accent)",
          }}
        >
          <Heart size={28} />
        </div>

        <h2
          data-reveal
          className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          style={{ color: "var(--w3-gray-900)", letterSpacing: "-0.02em" }}
        >
          Built in the open.
          <br />
          Free forever.
        </h2>

        <p
          data-reveal
          className="max-w-lg text-lg"
          style={{ color: "var(--w3-gray-600)", lineHeight: 1.6 }}
        >
          w3-kit is open source and MIT licensed. Every line of code is public, every decision is
          transparent. We believe the best developer tools are built together.
        </p>

        <div data-reveal className="flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className="gap-2 px-6 py-5 text-sm"
            render={
              <a href="https://github.com/w3-kit" target="_blank" rel="noopener noreferrer" />
            }
          >
            <GitHubIcon size={16} />
            Star on GitHub
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 px-6 py-5 text-sm"
            render={
              <a
                href="https://github.com/w3-kit/website/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <Star size={16} />
            Contribute
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
