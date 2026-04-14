interface StepItemProps {
  number: number;
  title: string;
  description: string;
}

export function StepItem({ number, title, description }: StepItemProps) {
  return (
    <div data-reveal className="flex gap-4">
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
        style={{ background: "var(--w3-accent)" }}
      >
        {number}
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-base font-medium" style={{ color: "var(--w3-gray-900)" }}>
          {title}
        </h4>
        <p className="text-sm leading-relaxed" style={{ color: "var(--w3-gray-600)" }}>
          {description}
        </p>
      </div>
    </div>
  );
}
