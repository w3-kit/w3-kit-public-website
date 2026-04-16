import { ArrowRight, Check, Copy } from "lucide-react";
import { Button } from "../../../shared/ui/button";
import { SectionContainer } from "../../../shared/ui/section-container";
import { useScrollReveal } from "../../../shared/lib/use-scroll-animation";
import { useCopyToClipboard } from "../../../shared/lib/use-copy-to-clipboard";
import { GitHubIcon } from "../../../shared/ui/github-icon";
import { getSectionUrl } from "../../../shared/lib/urls";

export function DocsCtaSection() {
  const containerRef = useScrollReveal({ y: 20 });
  const [copied, handleCopy] = useCopyToClipboard("npx w3-kit init");

  return (
    <SectionContainer className="py-16 md:py-24">
      <div ref={containerRef}>
        <div
          data-reveal
          className="flex flex-col items-center gap-8 rounded-2xl px-8 py-12 text-center backdrop-blur-xl md:px-16 md:py-16"
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
            Start Building Today
          </h2>

          <p className="max-w-md text-base" style={{ color: "var(--w3-gray-600)", lineHeight: 1.6 }}>
            Open source and free forever. Get started in minutes.
          </p>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-3 rounded-lg px-5 py-2.5 text-sm transition-all active:scale-95"
            style={{
              background: "var(--w3-glass-inner-bg)",
              border: "1px solid var(--w3-border-subtle)",
              color: "var(--w3-gray-700)",
              fontFamily: '"Geist Mono", ui-monospace, monospace',
            }}
            aria-label="Copy install command: npx w3-kit init"
          >
            npx w3-kit init
            {copied ? (
              <Check size={14} style={{ color: "var(--w3-accent)" }} aria-hidden="true" />
            ) : (
              <Copy size={14} style={{ color: "var(--w3-gray-400)" }} aria-hidden="true" />
            )}
          </button>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="gap-2 px-6 py-5 text-sm"
              render={<a href={`${getSectionUrl("docs")}/introduction`} />}
            >
              Get Started <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 px-6 py-5 text-sm"
              render={
                <a href="https://github.com/w3-kit" target="_blank" rel="noopener noreferrer" />
              }
            >
              <GitHubIcon size={16} /> Star on GitHub
            </Button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
