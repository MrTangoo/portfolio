import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: ReactNode;
  /** Optional two-digit index, e.g. "01". */
  index?: string;
  inverse?: boolean;
  className?: string;
}

/** Small monospace label with a vermilion square — the recurring Swiss marker. */
export function Eyebrow({ children, index, inverse = false, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "label flex items-center gap-3",
        inverse ? "text-paper/75" : "text-steel",
        className,
      )}
    >
      <span aria-hidden="true" className="block size-2 shrink-0 bg-vermilion" />
      {index && <span className="tabular">{index}</span>}
      {index && <span aria-hidden="true">-</span>}
      <span>{children}</span>
    </p>
  );
}
