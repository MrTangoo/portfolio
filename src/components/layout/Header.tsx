"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Search } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { useInteractive } from "@/components/interactive/InteractiveProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Monogram } from "@/components/ui/Monogram";
import { externalSocials, socials } from "@/content/profile";
import { useDictionary, useLocale } from "@/i18n/provider";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/components/layout/use-active-section";

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
} as const;

function NewBadge() {
  return (
    <span
      lang="en"
      className="applications-new-badge inline-flex items-center justify-center rounded-full bg-vermilion-deep px-1.5 py-0.5 font-sans text-[9px] leading-none font-semibold tracking-[0.08em] text-white"
    >
      NEW
    </span>
  );
}

export function Header() {
  const dict = useDictionary();
  const locale = useLocale();
  // Section anchors only exist on the home page — point back to it otherwise.
  const pathname = usePathname() ?? `/${locale}`;
  const onHome = pathname === `/${locale}`;
  const applicationsHref = `/${locale}/applications`;
  const onApplications = pathname === applicationsHref;
  const sectionHref = (id: string) => (onHome ? `#${id}` : `/${locale}#${id}`);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const active = useActiveSection(dict.nav.map((item) => item.id));
  const { openPalette } = useInteractive();

  // ⌘ on Apple platforms, Ctrl elsewhere — the server snapshot keeps the
  // hydration consistent and the client value replaces it after mount.
  const modKey = useSyncExternalStore(
    () => () => {},
    () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl"),
    () => "Ctrl",
  );

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    // Keep keyboard focus inside the menu while it is open.
    const background = document.querySelectorAll<HTMLElement>("main, footer");
    background.forEach((element) => (element.inert = true));
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };
    const mql = window.matchMedia("(min-width: 1280px)");
    const onChange = (event: MediaQueryListEvent) => event.matches && close();

    window.addEventListener("keydown", onKeyDown);
    mql.addEventListener("change", onChange);
    return () => {
      body.style.overflow = previousOverflow;
      background.forEach((element) => (element.inert = false));
      window.removeEventListener("keydown", onKeyDown);
      mql.removeEventListener("change", onChange);
    };
  }, [open, close]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* The blur lives on an inner element: a backdrop-filter on the header
          itself would turn it into the containing block of the fixed menu. */}
      <div
        className={cn(
          "transition-[background-color,border-color] duration-300 ease-out-expo",
          scrolled || open
            ? "border-b border-line bg-paper/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-6 xl:h-20">
          <a
            href={onHome ? "#top" : `/${locale}`}
            className="inline-block text-xl leading-none transition-transform duration-300 ease-out-expo hover:scale-110"
            onClick={close}
          >
            <Monogram srLabel={dict.header.monogramLabel} />
          </a>

          <nav aria-label={dict.header.navAriaLabel} className="hidden xl:block">
            <ul className="flex items-center gap-5 2xl:gap-8">
              {dict.nav.map((item) => {
                const isActive = onHome && active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={sectionHref(item.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "link-reveal py-2 text-sm font-medium tracking-[-0.005em] transition-colors duration-150",
                        isActive ? "text-ink" : "text-steel hover:text-ink",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
              <li className="pr-5">
                <Link
                  href={applicationsHref}
                  aria-current={onApplications ? "page" : undefined}
                  className={cn(
                    "link-reveal py-2 text-sm font-medium tracking-[-0.005em] transition-colors duration-150",
                    onApplications ? "text-ink" : "text-steel hover:text-ink",
                  )}
                >
                  {dict.applications.label}
                  <span className="absolute -top-1 -right-5 flex">
                    <NewBadge />
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="hidden shrink-0 items-center gap-3 xl:flex 2xl:gap-5">
            <button
              type="button"
              onClick={openPalette}
              // The visible shortcut text must be part of the accessible name
              // (WCAG label-content-name-mismatch) — never in parentheses,
              // which axe strips before comparing.
              aria-label={`${dict.header.openPalette} ${modKey} K`}
              aria-keyshortcuts="Control+K Meta+K"
              className="flex items-center gap-2 border border-line px-3 py-1.5 text-steel transition-colors duration-150 hover:border-line-strong hover:text-ink"
            >
              <Search aria-hidden="true" className="size-3.5" />
              <kbd aria-hidden="true" className="font-mono text-[10px] leading-none">
                {modKey} K
              </kbd>
            </button>
            {externalSocials.map((social) => {
              const Icon = socialIcons[social.id as keyof typeof socialIcons];
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="text-steel transition-colors duration-150 hover:text-ink"
                >
                  {Icon ? <Icon className="size-5" /> : social.label}
                </a>
              );
            })}
            <LanguageSwitcher />
          </div>

          <div className="flex items-center xl:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={openPalette}
              // The visible shortcut text must be part of the accessible name
              // (WCAG label-content-name-mismatch) — never in parentheses,
              // which axe strips before comparing.
              aria-label={`${dict.header.openPalette} ${modKey} K`}
              aria-keyshortcuts="Control+K Meta+K"
              className="flex size-12 items-center justify-center text-ink"
            >
              <Search aria-hidden="true" className="size-5" />
            </button>
            <button
              ref={toggleRef}
              type="button"
              className="-mr-2 flex size-12 flex-col items-center justify-center gap-1.5"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? dict.header.closeMenu : dict.header.openMenu}
              onClick={() => setOpen((value) => !value)}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "block h-px w-6 bg-ink transition-transform duration-300 ease-out-expo",
                  open && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                aria-hidden="true"
                className={cn(
                  "block h-px w-6 bg-ink transition-transform duration-300 ease-out-expo",
                  open && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id={menuId}
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 flex flex-col overflow-y-auto bg-paper transition-[opacity,transform] duration-300 ease-out-expo xl:hidden",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0",
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label={dict.header.mobileNavAriaLabel} className="container-page flex-1 pt-6">
          <ol className="divide-y divide-line border-y border-line">
            {dict.nav.map((item, index) => (
              <li key={item.id}>
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={sectionHref(item.id)}
                  onClick={close}
                  className="group flex items-baseline justify-between py-5"
                >
                  <span className="text-display-sm font-semibold tracking-[-0.02em]">
                    {item.label}
                  </span>
                  <span className="label text-steel tabular transition-colors duration-150 group-hover:text-vermilion-deep">
                    0{index + 1}
                  </span>
                </a>
              </li>
            ))}
            <li>
              <Link
                href={applicationsHref}
                onClick={close}
                aria-current={onApplications ? "page" : undefined}
                className="group flex items-center justify-between gap-4 py-5"
              >
                <span className="relative mr-5 text-display-sm font-semibold tracking-[-0.02em]">
                  {dict.applications.label}
                  <span className="absolute -top-2 -right-5 flex">
                    <NewBadge />
                  </span>
                </span>
                <span className="label text-steel tabular transition-colors duration-150 group-hover:text-vermilion-deep">
                  {String(dict.nav.length + 1).padStart(2, "0")}
                </span>
              </Link>
            </li>
          </ol>
        </nav>
        <div className="container-page flex items-center justify-between gap-6 py-8">
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.href}
              {...(social.id !== "email" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="label text-steel hover:text-ink"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
