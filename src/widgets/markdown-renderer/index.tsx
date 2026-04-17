import type React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { Components } from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

function isBlockCode(props: Record<string, unknown>): boolean {
  return typeof props.className === "string" && props.className.startsWith("language-");
}

const components: Components = {
  h1: ({ children, ...props }: React.ComponentPropsWithoutRef<"h1">) => (
    <h1
      {...props}
      className="font-sans text-4xl font-bold tracking-tight text-w3-gray-900 mt-12 mb-4"
    >
      {children}
    </h1>
  ),

  h2: ({ children, ...props }: React.ComponentPropsWithoutRef<"h2">) => (
    <h2
      {...props}
      className="font-sans text-[28px] font-semibold tracking-tight text-w3-gray-900 mt-10 mb-3 pb-2 border-b border-w3-border-subtle"
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }: React.ComponentPropsWithoutRef<"h3">) => (
    <h3
      {...props}
      className="font-sans text-[22px] font-semibold text-w3-gray-900 mt-8 mb-2"
    >
      {children}
    </h3>
  ),

  h4: ({ children, ...props }: React.ComponentPropsWithoutRef<"h4">) => (
    <h4
      {...props}
      className="font-sans text-lg font-semibold text-w3-gray-900 mt-6 mb-2"
    >
      {children}
    </h4>
  ),

  p: ({ children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
    <p {...props} className="leading-[1.7] text-w3-gray-700 mb-4">
      {children}
    </p>
  ),

  a: ({ children, ...props }: React.ComponentPropsWithoutRef<"a">) => (
    <a {...props} className="text-w3-accent hover:underline">
      {children}
    </a>
  ),

  ul: ({ children, ...props }: React.ComponentPropsWithoutRef<"ul">) => (
    <ul {...props} className="mb-4 pl-6 list-disc">
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: React.ComponentPropsWithoutRef<"ol">) => (
    <ol {...props} className="mb-4 pl-6 list-decimal">
      {children}
    </ol>
  ),

  li: ({ children, ...props }: React.ComponentPropsWithoutRef<"li">) => (
    <li {...props} className="mb-1 text-w3-gray-700 leading-[1.7]">
      {children}
    </li>
  ),

  blockquote: ({ children, ...props }: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      {...props}
      className="border-l-[3px] border-w3-accent bg-w3-accent-subtle p-4 rounded-lg mb-4 text-w3-gray-800"
    >
      {children}
    </blockquote>
  ),

  code: ({ children, ...props }: React.ComponentPropsWithoutRef<"code">) => {
    if (isBlockCode(props)) {
      return <code {...props}>{children}</code>;
    }
    return (
      <code
        {...props}
        className="font-mono bg-w3-surface-elevated px-1.5 py-0.5 rounded text-[0.875em] text-w3-gray-800"
      >
        {children}
      </code>
    );
  },

  pre: ({ children, ...props }: React.ComponentPropsWithoutRef<"pre">) => (
    <pre {...props} className="bg-w3-gray-200 rounded-xl px-5 py-4 overflow-x-auto mb-4">
      {children}
    </pre>
  ),

  table: ({ children, ...props }: React.ComponentPropsWithoutRef<"table">) => (
    <div className="overflow-x-auto mb-4">
      <table
        {...props}
        className="w-full border-collapse border border-w3-border-subtle rounded-lg"
      >
        {children}
      </table>
    </div>
  ),

  th: ({ children, ...props }: React.ComponentPropsWithoutRef<"th">) => (
    <th
      {...props}
      className="text-left px-3 py-2 font-semibold bg-w3-surface-elevated text-w3-gray-900 border-b border-w3-border-subtle"
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }: React.ComponentPropsWithoutRef<"td">) => (
    <td {...props} className="px-3 py-2 border-b border-w3-border-subtle text-w3-gray-700">
      {children}
    </td>
  ),

  hr: (props: React.ComponentPropsWithoutRef<"hr">) => (
    <hr {...props} className="border-w3-border-subtle my-8" />
  ),

  img: (props: React.ComponentPropsWithoutRef<"img">) => (
    <img {...props} alt={props.alt ?? ""} className="max-w-full rounded-lg" />
  ),
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="docs-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
