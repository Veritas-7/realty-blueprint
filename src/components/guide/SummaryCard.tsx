import { ReactNode } from "react";

interface SummaryCardProps {
  items: string[];
  title?: string;
}

export const SummaryCard = ({ items, title = "핵심 요약" }: SummaryCardProps) => {
  return (
    <div className="bg-primary/5 border border-primary/15 rounded-lg p-5 mb-8">
      <h3 className="text-sm font-semibold text-primary mb-3">{title}</h3>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
            <span className="text-primary font-bold mt-0.5">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
