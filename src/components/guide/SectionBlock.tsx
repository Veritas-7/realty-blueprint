import { ReactNode } from "react";

interface SectionBlockProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const SectionBlock = ({ id, title, subtitle, children }: SectionBlockProps) => {
  return (
    <section id={id} className="mb-10">
      <h2 className="text-xl font-bold text-foreground mb-1 scroll-mt-20">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>}
      {!subtitle && <div className="mb-4" />}
      {children}
    </section>
  );
};
