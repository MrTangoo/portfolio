import Image from "next/image";
import { Monogram } from "@/components/ui/Monogram";
import { cn } from "@/lib/utils";

export interface PortraitSource {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface PortraitProps {
  source: PortraitSource | null;
  className?: string;
  /** CSS `object-position` applied to the photo. */
  focal?: string;
  sizes?: string;
  preload?: boolean;
}

/**
 * Editorial portrait. Falls back to the monogram when no photo is provided,
 * so the layout never shows a broken image.
 */
export function Portrait({
  source,
  className,
  focal = "70% 30%",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  preload = false,
}: PortraitProps) {
  return (
    <figure className={cn("relative overflow-hidden bg-paper-deep", className)}>
      {source ? (
        <Image
          src={source.src}
          alt={source.alt}
          fill
          preload={preload}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: focal }}
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-ink text-paper"
        >
          <Monogram className="text-display-xl" srLabel="" />
        </div>
      )}
    </figure>
  );
}
