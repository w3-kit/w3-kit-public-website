import { useMemo } from "react";
import { useParams } from "@tanstack/react-router";
import { DocsContentLayout } from "../../../widgets/docs-content-layout";
import { DocsNotFound } from "../../../shared/ui/docs-not-found";
import { DocsShell } from "../../../widgets/docs-shell";
import { MarkdownRenderer } from "../../../widgets/markdown-renderer";
import { extractHeadings } from "../../../widgets/markdown-renderer/extract-headings";
import { useGuide } from "../../../entities/guide";
import { getSectionUrl } from "../../../shared/lib/urls";
import { AuthorBadge } from "../../../shared/ui/author-badge";

export function GuideDetailPage() {
  const { guideSlug } = useParams({ strict: false });
  const slug = guideSlug ?? "";
  const guide = useGuide(slug);

  if (!guide) {
    return (
      <DocsShell>
        <DocsNotFound entityType="Guide" slug={slug} />
      </DocsShell>
    );
  }

  const headings = useMemo(() => extractHeadings(guide.content), [guide.content]);
  const readTime = Math.max(1, Math.ceil(guide.content.split(/\s+/).length / 200));

  return (
    <DocsContentLayout
      activeSlug={slug}
      breadcrumbs={[
        { label: "Docs", href: getSectionUrl("docs") },
        { label: "Guides" },
        { label: guide.title },
      ]}
      headings={headings}
    >
      <div className="mb-8 flex items-center gap-3">
        <span className="rounded-full bg-w3-accent-subtle px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-w3-accent">
          {guide.category}
        </span>
        <span className="text-xs text-w3-gray-500">{readTime} min read</span>
        <AuthorBadge author={guide.author} />
      </div>

      <MarkdownRenderer content={guide.content} />
    </DocsContentLayout>
  );
}
