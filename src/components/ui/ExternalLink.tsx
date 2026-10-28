import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "label" | "link";

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  /**
   * `label` — small mono caps (header, hero).
   * `link` — body text with animated underline (footer).
   */
  variant?: Variant;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  label: "label text-steel hover:text-ink",
  link: "link-reveal text-sm font-medium",
};

const iconSizes: Record<Variant, string> = {
  label: "size-3",
  link: "size-3.5",
};

/** External anchor with the site's animated northeast arrow. */
export function ExternalLink({
  href,
  variant = "label",
  className,
  children,
  ...rest
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-1 transition-colors duration-150",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className={cn(
          iconSizes[variant],
          "transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
        )}
      />
    </a>
  );
}
