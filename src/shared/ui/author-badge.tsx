interface AuthorBadgeProps {
  author: string;
  prefix?: string;
  className?: string;
}

export function AuthorBadge({ author, prefix, className }: AuthorBadgeProps) {
  if (!author) return null;

  return (
    <a
      href={`https://github.com/${author}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-xs transition-colors hover:underline ${className ?? ""}`}
      style={{ color: "var(--w3-gray-500)" }}
    >
      <img
        src={`https://github.com/${author}.png?size=40`}
        alt={author}
        className="h-4 w-4 rounded-full"
      />
      {prefix && `${prefix} `}
      {author}
    </a>
  );
}
