import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Must match the parent `<Section id>` so `aria-labelledby` resolves. */
  sectionId: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  inverse?: boolean;
  className?: string;
  /** Visual size of the title. */
  size?: "lg" | "md";
}

export function SectionHeading({
  sectionId,
  index,
  eyebrow,
  title,
  description,
  inverse = false,
  size = "lg",
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("grid-editorial items-start", className)}>
      <div className="col-span-12 flex items-center gap-4 lg:col-span-3 lg:pt-[0.6em]">
        <Eyebrow index={index} inverse={inverse}>
          {eyebrow}
        </Eyebrow>
      </div>
      <div className="col-span-12 mt-6 lg:col-span-9 lg:mt-0">
        <h2
          id={`${sectionId}-title`}
          className={cn(
            "font-semibold text-balance",
            size === "lg" ? "text-display-lg" : "text-display-md",
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-6 max-w-[60ch] text-lead text-pretty",
              inverse ? "text-paper/70" : "text-steel",
            )}
          >
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
