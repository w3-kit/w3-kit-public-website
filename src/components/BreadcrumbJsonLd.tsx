import { JsonLd } from "./JsonLd";

type BreadcrumbJsonLdProps = {
  path: string;
};

const LABELS: Record<string, string> = {
  docs: "Documentation",
  components: "Components",
  installation: "Installation",
};

function toLabel(slug: string): string {
  return (
    LABELS[slug] ||
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}

export function BreadcrumbJsonLd({ path }: BreadcrumbJsonLdProps) {
  const segments = path.split("/").filter(Boolean);
  const baseUrl = "https://w3-kit.com";

  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    },
    ...segments.map((segment, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: toLabel(segment),
      item: `${baseUrl}/${segments.slice(0, i + 1).join("/")}`,
    })),
  ];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items,
      }}
    />
  );
}
