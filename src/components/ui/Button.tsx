import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Icon = "arrow" | "down" | "download" | "none";

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  icon?: Icon;
  children: ReactNode;
}

const base =
  "group/btn inline-flex min-h-12 items-center justify-center gap-3 border px-6 py-3 text-sm font-medium tracking-[-0.005em] transition-[background-color,color,border-color] duration-300 ease-out-expo";

const variants: Record<Variant, string> = {
  primary: "border-ink bg-ink text-paper hover:bg-vermilion hover:border-vermilion",
  secondary:
    "border-line-strong bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper",
  ghost: "border-transparent bg-transparent px-0 text-ink hover:text-vermilion-deep",
};

const icons = { arrow: ArrowUpRight, down: ArrowDown, download: Download } as const;

export function ButtonLink({
  href,
  variant = "primary",
  icon = "arrow",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const isExternal = /^https?:\/\//.test(href);
  const Icon = icon === "none" ? null : icons[icon];

  return (
    <a
      href={href}
      className={cn(base, variants[variant], className)}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      <span>{children}</span>
      {Icon && (
        <Icon
          aria-hidden="true"
          className={cn(
            "size-4 shrink-0 transition-transform duration-300 ease-out-expo",
            icon === "down" || icon === "download"
              ? "group-hover/btn:translate-y-0.5"
              : "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5",
          )}
        />
      )}
    </a>
  );
}
