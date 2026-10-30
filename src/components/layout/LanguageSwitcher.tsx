"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import { useDictionary, useLocale } from "@/i18n/provider";
import { LOCALE_META, LOCALES, type Locale } from "@/i18n/locales";
import { cn } from "@/lib/utils";

const FLAG_PATHS: Record<Locale, React.ReactNode> = {
  fr: (
    <>
      <rect width="20" height="14" fill="#fff" />
      <rect width="6.7" height="14" fill="#0055A4" />
      <rect x="13.3" width="6.7" height="14" fill="#EF4135" />
    </>
  ),
  en: (
    <>
      <rect width="20" height="14" fill="#012169" />
      <path d="M0 0L20 14M20 0L0 14" stroke="#fff" strokeWidth="2.8" />
      <path d="M0 0L20 14M20 0L0 14" stroke="#C8102E" strokeWidth="0.9" />
      <path d="M10 0V14M0 7H20" stroke="#fff" strokeWidth="4.6" />
      <path d="M10 0V14M0 7H20" stroke="#C8102E" strokeWidth="2.7" />
    </>
  ),
  de: (
    <>
      <rect width="20" height="14" fill="#FFCE00" />
      <rect width="20" height="4.7" fill="#000" />
      <rect y="4.7" width="20" height="4.6" fill="#DD0000" />
    </>
  ),
};

function Flag({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <svg viewBox="0 0 20 14" aria-hidden="true" className={cn("h-2.5 w-3.5 shrink-0", className)}>
      {FLAG_PATHS[locale]}
      <rect width="20" height="14" fill="none" stroke="currentColor" strokeOpacity="0.25" />
    </svg>
  );
}

/**
 * Dropdown language switcher. Routes live under `/[lang]`, so switching swaps
 * the first path segment and starts the new page at the top.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const dict = useDictionary();
  const locale = useLocale();
  const pathname = usePathname() ?? "/fr";
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>('[aria-current="true"]')?.focus();
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
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

  const onMenuKeyDown = (event: ReactKeyboardEvent<HTMLUListElement>) => {
    const items = [
      ...event.currentTarget.querySelectorAll<HTMLAnchorElement>('a[role="menuitem"]'),
    ];
    const index = items.findIndex((item) => item === document.activeElement);
    let next: number;
    switch (event.key) {
      case "ArrowDown":
        next = (index + 1) % items.length;
        break;
      case "ArrowUp":
        next = (index - 1 + items.length) % items.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = items.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    items[next]?.focus();
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        // The visible locale tag must be part of the accessible name (WCAG
        // label-content-name-mismatch) — never in parentheses, which axe
        // strips before comparing.
        aria-label={`${dict.switcher.label} ${locale.toUpperCase()}`}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className="flex items-center gap-1.5 border border-line px-3 py-1.5 text-steel transition-colors duration-150 hover:border-line-strong hover:text-ink"
      >
        <Flag locale={locale} />
        <span className="font-mono text-[11px] leading-none font-medium tracking-[0.08em] uppercase">
          {locale}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn("size-3 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <ul
        ref={menuRef}
        id={menuId}
        role="menu"
        aria-label={dict.switcher.label}
        aria-hidden={!open}
        inert={!open}
        onKeyDown={onMenuKeyDown}
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
                prefetch={false}
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
                <span className="flex items-center gap-2.5">
                  <Flag locale={target} />
                  {LOCALE_META[target].name}
                </span>
                {active && <Check aria-hidden="true" className="size-3.5 text-vermilion" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
