import { Separator } from "../../shared/ui/separator";
import { Logo } from "../../shared/ui/logo";
import { getSectionUrl } from "../../shared/lib/urls";
import { GitHubIcon } from "../../shared/ui/github-icon";
import { ThemeToggle } from "../site-footer/theme-toggle";

function getItemHref(slug: string, type: string): string {
  const base = getSectionUrl("docs");
  if (type === "guide") return `${base}/guide/${slug}`;
  if (type === "recipe") return `${base}/recipe/${slug}`;
  return `${base}/${slug}`;
}

const gettingStartedLinks = [
  { label: "Introduction", slug: "introduction", type: "markdown" },
  { label: "Installation", slug: "installation", type: "markdown" },
  { label: "Components", slug: "components", type: "markdown" },
  { label: "CLI", slug: "cli", type: "markdown" },
];

const guidesLinks = [
  { label: "What Is a Wallet", slug: "what-is-a-wallet", type: "guide" },
  { label: "Smart Contracts", slug: "what-are-smart-contracts", type: "guide" },
  { label: "Gas Explained", slug: "gas-explained", type: "guide" },
  { label: "Glossary", slug: "glossary", type: "guide" },
];

const recipesLinks = [
  { label: "Connect Wallet", slug: "connect-wallet", type: "recipe" },
  { label: "Swap Tokens", slug: "swap-tokens", type: "recipe" },
  { label: "Mint NFT", slug: "mint-nft", type: "recipe" },
  { label: "Stake Tokens", slug: "stake-tokens", type: "recipe" },
];

const communityLinks = [
  { label: "GitHub", href: "https://github.com/w3-kit" },
  { label: "Contributing", href: "https://github.com/w3-kit/website/blob/main/CONTRIBUTING.md" },
  { label: "Issues", href: "https://github.com/w3-kit/website/issues" },
];

function FooterSection({
  title,
  links,
}: {
  title: string;
  links: { label: string; slug?: string; type?: string; href?: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-medium" style={{ color: "var(--w3-gray-900)" }}>
        {title}
      </h4>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href ?? getItemHref(link.slug!, link.type!)}
              className="text-sm transition-colors hover:text-foreground"
              style={{ color: "var(--w3-gray-600)" }}
              {...(link.href?.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DocsFooter() {
  return (
    <footer className="mt-auto" style={{ borderTop: "1px solid var(--w3-border-subtle)" }}>
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-12 sm:grid-cols-2 md:grid-cols-5 md:px-8 lg:px-16">
        {/* Brand column */}
        <div className="flex flex-col gap-4 sm:col-span-2 md:col-span-1">
          <a href={getSectionUrl("docs")} className="flex items-center gap-2">
            <Logo size={28} className="text-[var(--w3-accent)]" />
            <span className="text-sm font-semibold" style={{ color: "var(--w3-gray-900)" }}>
              w3-kit
            </span>
          </a>
          <p className="max-w-[200px] text-sm" style={{ color: "var(--w3-gray-600)" }}>
            Documentation, guides, and recipes for building Web3 apps.
          </p>
          <a
            href="https://github.com/w3-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-foreground"
            style={{ color: "var(--w3-gray-600)" }}
          >
            <GitHubIcon size={16} />
            GitHub
          </a>
        </div>

        <FooterSection title="Getting Started" links={gettingStartedLinks} />
        <FooterSection title="Guides" links={guidesLinks} />
        <FooterSection title="Recipes" links={recipesLinks} />

        {/* Community + Theme */}
        <div className="flex flex-col gap-6">
          <FooterSection title="Community" links={communityLinks} />
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-medium" style={{ color: "var(--w3-gray-900)" }}>
              Theme
            </h4>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <Separator />

      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:px-8 lg:px-16">
        <p className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
          &copy; {new Date().getFullYear()} w3-kit. MIT License.
        </p>
      </div>
    </footer>
  );
}
