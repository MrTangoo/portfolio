"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Monogram } from "@/components/ui/Monogram";
import { NAV_ITEMS } from "@/content/site";
import { externalSocials, socials } from "@/content/profile";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/components/layout/use-active-section";

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
} as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const active = useActiveSection(NAV_ITEMS.map((item) => item.id));

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
    const mql = window.matchMedia("(min-width: 1024px)");
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
        <div className="container-page flex h-16 items-center justify-between lg:h-20">
          <a
            href="#top"
            className="inline-block text-xl leading-none transition-transform duration-300 ease-out-expo hover:scale-110"
            onClick={close}
          >
            <Monogram srLabel="Maxime Derbigny — retour en haut de page" />
          </a>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
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
            </ul>
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
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
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 flex size-12 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
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

      {/* Mobile menu */}
      <div
        id={menuId}
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 flex flex-col overflow-y-auto bg-paper transition-[opacity,transform] duration-300 ease-out-expo lg:hidden",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0",
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Navigation mobile" className="container-page flex-1 pt-6">
          <ol className="divide-y divide-line border-y border-line">
            {NAV_ITEMS.map((item, index) => (
              <li key={item.id}>
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={`#${item.id}`}
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
