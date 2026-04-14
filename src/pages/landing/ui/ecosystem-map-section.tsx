import { SectionContainer } from "../../../shared/ui/section-container";
import { useScrollReveal } from "../../../shared/lib/use-scroll-animation";
import { getSectionUrl } from "../../../shared/lib/urls";

const subdomains = [
  {
    label: "UI",
    description: "50+ components",
    section: "ui",
  },
  {
    label: "Docs",
    description: "Guides & recipes",
    section: "docs",
  },
  {
    label: "Registry",
    description: "Chains & tokens",
    section: "registry",
  },
  {
    label: "Learn",
    description: "Interactive courses",
    section: "learn",
  },
];

export function EcosystemMapSection() {
  const containerRef = useScrollReveal({ stagger: 0.1, y: 30 });

  return (
    <SectionContainer className="py-20 md:py-32 lg:py-40" id="ecosystem">
      <div ref={containerRef} className="flex flex-col items-center gap-12 text-center">
        {/* Section header */}
        <div data-reveal className="flex max-w-md flex-col gap-4">
          <p
            className="text-sm font-medium uppercase tracking-wider"
            style={{ color: "var(--w3-accent)" }}
          >
            Ecosystem
          </p>
          <h2
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ color: "var(--w3-gray-900)", letterSpacing: "-0.02em" }}
          >
            One toolkit. Five tools.
          </h2>
          <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
            Everything connects. Pick what you need.
          </p>
        </div>

        {/* Map */}
        <div data-reveal className="flex w-full max-w-2xl flex-col items-center gap-8">
          {/* Central hub */}
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-sm font-bold text-white"
            style={{ background: "var(--w3-accent)" }}
          >
            w3
          </div>

          {/* Connection line */}
          <div className="h-8 w-px" style={{ background: "var(--w3-border-standard)" }} />

          {/* Subdomain nodes */}
          <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {subdomains.map((sub) => (
              <a
                key={sub.section}
                href={getSectionUrl(sub.section)}
                className="group flex flex-col items-center gap-2 rounded-xl p-5 transition-all duration-200 hover:scale-[1.03]"
                style={{
                  background: "var(--w3-surface-translucent)",
                  border: "1px solid var(--w3-border-subtle)",
                }}
              >
                <span className="text-base font-semibold" style={{ color: "var(--w3-gray-900)" }}>
                  {sub.label}
                </span>
                <span className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
                  {sub.description}
                </span>
                {/* Connection dot */}
                <div
                  className="mt-1 h-1.5 w-1.5 rounded-full transition-colors group-hover:scale-150"
                  style={{ background: "var(--w3-accent)" }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
