import type React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { Components } from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

// Helper to extract plain text from ReactNode for the pre/code child check
function isInsidePre(node: React.ComponentPropsWithoutRef<"code">): boolean {
  // react-markdown passes a `node` prop with the hast node; the parent context
  // is inferred by whether className contains "language-*" (block code fences).
  const className = (node as { className?: string }).className ?? "";
  return className.startsWith("language-");
}

const components: Components = {
  h1: ({ children, ...props }: React.ComponentPropsWithoutRef<"h1">) => (
    <h1
      {...props}
      style={{
        fontFamily: '"Geist Sans", sans-serif',
        fontSize: 36,
        fontWeight: 700,
        color: "var(--w3-gray-900)",
        marginTop: 48,
        marginBottom: 16,
        letterSpacing: "-0.02em",
      }}
    >
      {children}
    </h1>
  ),

  h2: ({ children, ...props }: React.ComponentPropsWithoutRef<"h2">) => (
    <h2
      {...props}
      style={{
        fontFamily: '"Geist Sans", sans-serif',
        fontSize: 28,
        fontWeight: 600,
        color: "var(--w3-gray-900)",
        marginTop: 40,
        marginBottom: 12,
        letterSpacing: "-0.02em",
        paddingBottom: 8,
        borderBottom: "1px solid var(--w3-border-subtle)",
      }}
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }: React.ComponentPropsWithoutRef<"h3">) => (
    <h3
      {...props}
      style={{
        fontFamily: '"Geist Sans", sans-serif',
        fontSize: 22,
        fontWeight: 600,
        color: "var(--w3-gray-900)",
        marginTop: 32,
        marginBottom: 8,
      }}
    >
      {children}
    </h3>
  ),

  h4: ({ children, ...props }: React.ComponentPropsWithoutRef<"h4">) => (
    <h4
      {...props}
      style={{
        fontFamily: '"Geist Sans", sans-serif',
        fontSize: 18,
        fontWeight: 600,
        color: "var(--w3-gray-900)",
        marginTop: 24,
        marginBottom: 8,
      }}
    >
      {children}
    </h4>
  ),

  p: ({ children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
    <p
      {...props}
      style={{
        lineHeight: 1.7,
        color: "var(--w3-gray-700)",
        marginBottom: 16,
      }}
    >
      {children}
    </p>
  ),

  a: ({ children, ...props }: React.ComponentPropsWithoutRef<"a">) => (
    <a {...props} className="hover:underline" style={{ color: "var(--w3-accent)" }}>
      {children}
    </a>
  ),

  ul: ({ children, ...props }: React.ComponentPropsWithoutRef<"ul">) => (
    <ul
      {...props}
      style={{
        marginBottom: 16,
        paddingLeft: 24,
        listStyleType: "disc",
      }}
    >
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: React.ComponentPropsWithoutRef<"ol">) => (
    <ol
      {...props}
      style={{
        marginBottom: 16,
        paddingLeft: 24,
        listStyleType: "decimal",
      }}
    >
      {children}
    </ol>
  ),

  li: ({ children, ...props }: React.ComponentPropsWithoutRef<"li">) => (
    <li
      {...props}
      style={{
        marginBottom: 4,
        color: "var(--w3-gray-700)",
        lineHeight: 1.7,
      }}
    >
      {children}
    </li>
  ),

  blockquote: ({ children, ...props }: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      {...props}
      style={{
        borderLeft: "3px solid var(--w3-accent)",
        background: "var(--w3-accent-subtle)",
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        color: "var(--w3-gray-800)",
      }}
    >
      {children}
    </blockquote>
  ),

  // Inline code — only applied when NOT inside a fenced code block.
  // react-markdown gives block code a "language-*" className; inline code has none.
  code: ({ children, ...props }: React.ComponentPropsWithoutRef<"code">) => {
    if (isInsidePre(props)) {
      // Block code child — no inline styling; parent <pre> handles the container
      return <code {...props}>{children}</code>;
    }
    return (
      <code
        {...props}
        style={{
          fontFamily: '"Geist Mono", monospace',
          background: "var(--w3-surface-elevated)",
          padding: "2px 6px",
          borderRadius: 4,
          fontSize: "0.875em",
          color: "var(--w3-gray-800)",
        }}
      >
        {children}
      </code>
    );
  },

  pre: ({ children, ...props }: React.ComponentPropsWithoutRef<"pre">) => (
    <pre
      {...props}
      style={{
        background: "var(--w3-gray-200)",
        borderRadius: 12,
        padding: "16px 20px",
        overflowX: "auto",
        marginBottom: 16,
      }}
    >
      {children}
    </pre>
  ),

  table: ({ children, ...props }: React.ComponentPropsWithoutRef<"table">) => (
    <div style={{ overflowX: "auto", marginBottom: 16 }}>
      <table
        {...props}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid var(--w3-border-subtle)",
          borderRadius: 8,
        }}
      >
        {children}
      </table>
    </div>
  ),

  th: ({ children, ...props }: React.ComponentPropsWithoutRef<"th">) => (
    <th
      {...props}
      style={{
        textAlign: "left",
        padding: "8px 12px",
        fontWeight: 600,
        background: "var(--w3-surface-elevated)",
        color: "var(--w3-gray-900)",
        borderBottom: "1px solid var(--w3-border-subtle)",
      }}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }: React.ComponentPropsWithoutRef<"td">) => (
    <td
      {...props}
      style={{
        padding: "8px 12px",
        borderBottom: "1px solid var(--w3-border-subtle)",
        color: "var(--w3-gray-700)",
      }}
    >
      {children}
    </td>
  ),

  hr: (props: React.ComponentPropsWithoutRef<"hr">) => (
    <hr
      {...props}
      style={{
        borderColor: "var(--w3-border-subtle)",
        margin: "32px 0",
      }}
    />
  ),

  img: (props: React.ComponentPropsWithoutRef<"img">) => (
    <img {...props} alt={props.alt ?? ""} style={{ maxWidth: "100%", borderRadius: 8 }} />
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
