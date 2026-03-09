import { useEffect } from "react";
import { StatusBadge, type BadgeVariant } from "./StatusBadge";

interface PageHeaderProps {
  title: string;
  description: string;
  badges?: { label: string; variant: BadgeVariant }[];
}

export const PageHeader = ({ title, description, badges }: PageHeaderProps) => {
  useEffect(() => {
    document.title = `${title} — 부동산/공인중개 웹 제작 가이드`;
  }, [title]);

  return (
    <div className="border-b border-border bg-card px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto">
        {badges && badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {badges.map((b, i) => (
              <StatusBadge key={i} variant={b.variant}>{b.label}</StatusBadge>
            ))}
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{title}</h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl">{description}</p>
      </div>
    </div>
  );
};
