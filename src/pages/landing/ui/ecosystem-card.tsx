import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/shared/ui/card";

interface EcosystemCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  label: string;
}

export function EcosystemCard({ icon, title, description, href, label }: EcosystemCardProps) {
  return (
    <a href={href} className="group block transition-transform duration-300 hover:scale-[1.02]">
      <Card
        data-reveal
        className="h-full border-none bg-transparent ring-1"
        style={{
          background: "var(--w3-surface-translucent)",
          ["--tw-ring-color" as string]: "var(--w3-border-subtle)",
        }}
      >
        <CardHeader>
          <div
            className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg"
            style={{
              background: "var(--w3-accent-subtle)",
              color: "var(--w3-accent)",
            }}
          >
            {icon}
          </div>
          <CardTitle className="text-xl font-semibold" style={{ color: "var(--w3-gray-900)" }}>
            {title}
          </CardTitle>
          <CardDescription className="leading-relaxed" style={{ color: "var(--w3-gray-600)" }}>
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-auto">
          <span
            className="inline-flex items-center gap-1 text-sm font-medium"
            style={{ color: "var(--w3-accent)" }}
          >
            {label}
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </CardContent>
      </Card>
    </a>
  );
}
