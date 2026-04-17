import { getSectionUrl } from "../lib/urls";

interface DocsNotFoundProps {
  entityType: "Page" | "Guide" | "Recipe";
  slug: string;
}

export function DocsNotFound({ entityType, slug }: DocsNotFoundProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-semibold text-w3-gray-900">
          {entityType} Not Found
        </h1>
        <p className="mb-6 text-sm text-w3-gray-600">
          The {entityType.toLowerCase()} &ldquo;{slug}&rdquo; doesn&apos;t exist.
        </p>
        <a
          href={getSectionUrl("docs")}
          className="text-sm font-medium text-w3-accent transition-colors hover:underline"
        >
          Back to docs
        </a>
      </div>
    </div>
  );
}
