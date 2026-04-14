import type { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../../../shared/ui/card";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card
      data-reveal
      className="border-none bg-transparent ring-1"
      style={{
        background: "var(--w3-surface-translucent)",
        ["--tw-ring-color" as string]: "var(--w3-border-subtle)",
      }}
    >
      <CardHeader>
        <div
          className="mb-1 flex h-10 w-10 items-center justify-center rounded-lg"
          style={{
            background: "var(--w3-accent-subtle)",
            color: "var(--w3-accent)",
          }}
        >
          {icon}
        </div>
        <CardTitle className="font-semibold" style={{ color: "var(--w3-gray-900)" }}>
          {title}
        </CardTitle>
        <CardDescription className="leading-relaxed" style={{ color: "var(--w3-gray-600)" }}>
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
