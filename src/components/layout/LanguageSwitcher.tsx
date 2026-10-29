"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Languages } from "lucide-react";
import { useDictionary, useLocale } from "@/i18n/provider";
import { LOCALE_META, LOCALES } from "@/i18n/locales";
import { cn } from "@/lib/utils";

/**
 * Dropdown language switcher. Routes live under `/[lang]`, so switching swaps
 * the first path segment — the current hash is preserved on click.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const dict = useDictionary();
  const locale = useLocale();
  const pathname = usePathname() ?? "/fr";
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const hrefFor = (target: string) => {
    const rest = pathname.replace(/^\/[^/]+/, "");
    return `/${target}${rest}`;
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        // The visible locale tag must be part of the accessible name (WCAG
        // label-content-name-mismatch) — never in parentheses, which axe
        // strips before comparing.
        aria-label={`${dict.switcher.label} ${locale.toUpperCase()}`}
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-1.5 border border-line px-3 py-1.5 text-steel transition-colors duration-150 hover:border-line-strong hover:text-ink"
      >
        <Languages aria-hidden="true" className="size-3.5" />
        <span className="font-mono text-[11px] leading-none font-medium tracking-[0.08em] uppercase">
          {locale}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn("size-3 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <ul
        id={menuId}
        role="menu"
        aria-label={dict.switcher.label}
        className={cn(
          "absolute top-[calc(100%+8px)] right-0 min-w-36 border border-line bg-paper py-1 shadow-lg transition-[opacity,transform] duration-200 ease-out-expo",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        {LOCALES.map((target) => {
          const active = target === locale;
          return (
            <li key={target} role="none">
              <Link
                role="menuitem"
                href={hrefFor(target)}
                hrefLang={LOCALE_META[target].htmlLang}
                lang={LOCALE_META[target].htmlLang}
                aria-current={active ? "true" : undefined}
                onClick={() => {
                  setOpen(false);
                  // The Journey's pinned GSAP timeline can't reliably restore
                  // mid-animation after a remount — scroll back to the top so
                  // it rebuilds cleanly at t=0 and replays on scroll.
                  // "instant" is required: "auto" would honour the CSS
                  // scroll-behavior: smooth and race the navigation.
                  window.scrollTo({ top: 0, behavior: "instant" });
                }}
                className={cn(
                  "flex items-center justify-between gap-3 px-3.5 py-2.5 text-sm transition-colors duration-150",
                  active ? "font-medium text-ink" : "text-steel hover:bg-paper-deep hover:text-ink",
                )}
              >
                {LOCALE_META[target].name}
                {active && <Check aria-hidden="true" className="size-3.5 text-vermilion" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
