import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "required"
  | "recommended"
  | "optional"
  | "conditional"
  | "prohibited"
  | "proof"
  | "review"
  | "info";

const variantStyles: Record<BadgeVariant, string> = {
  required: "bg-primary text-primary-foreground",
  recommended: "bg-trust text-trust-foreground",
  optional: "bg-secondary text-secondary-foreground",
  conditional: "bg-warm/20 text-warm-foreground",
  prohibited: "bg-destructive text-destructive-foreground",
  proof: "bg-trust/15 text-trust border border-trust/30",
  review: "bg-warning/15 text-warm-foreground border border-warning/30",
  info: "bg-info/15 text-foreground border border-info/30",
};

const variantLabels: Record<BadgeVariant, string> = {
  required: "필수",
  recommended: "권장",
  optional: "선택",
  conditional: "조건부",
  prohibited: "금지",
  proof: "증빙 필요",
  review: "검토 필요",
  info: "참고",
};

interface StatusBadgeProps {
  variant: BadgeVariant;
  children?: ReactNode;
}

export const StatusBadge = ({ variant, children }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium",
        variantStyles[variant]
      )}
    >
      {children || variantLabels[variant]}
    </span>
  );
};
