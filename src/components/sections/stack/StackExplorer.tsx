"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import type { StackCategory, StackCategoryId } from "@/content/profile";
import { useDictionary } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Technologies with a Simple Icons mark in /images/tech/. */
const TECH_ICONS: Record<string, string> = {
  React: "react",
  "Next.js": "nextdotjs",
  TypeScript: "typescript",
  JavaScript: "javascript",
  HTML5: "html5",
  CSS3: "css",
  "Tailwind CSS": "tailwindcss",
  Bootstrap: "bootstrap",
  AngularJS: "angularjs",
  "Node.js": "nodedotjs",
  "C#": "csharp",
  ".NET": "dotnet",
  PHP: "php",
  "API REST": "api",
  PostgreSQL: "postgresql",
  "Prisma ORM": "prisma",
  Neon: "neon",
  "Microsoft SQL Server": "microsoftsqlserver",
  "T-SQL": "microsoftsqlserver",
  MySQL: "mysql",
  Git: "git",
  GitHub: "github",
  "GitHub Actions": "githubactions",
  Vercel: "vercel",
  Cloudflare: "cloudflare",
  "Windows Server": "windows",
  IIS: "iis",
  PM2: "pm2",
  PowerShell: "powershell",
};

interface StackExplorerProps {
  categories: readonly StackCategory[];
}

export function StackExplorer({ categories }: StackExplorerProps) {
  const dict = useDictionary();
  const [activeId, setActiveId] = useState<StackCategoryId>(categories[0]?.id ?? "frontend");
  const baseId = useId();
  const tabRefs = useRef<Map<StackCategoryId, HTMLButtonElement>>(new Map());
  const active = categories.find((category) => category.id === activeId) ?? categories[0];

  if (!active) return null;

  const focusTab = (index: number) => {
    const category = categories.at(index % categories.length);
    if (!category) return;
    setActiveId(category.id);
    tabRefs.current.get(category.id)?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = categories.length - 1;
    const actions: Record<string, () => void> = {
      ArrowDown: () => focusTab(index + 1),
      ArrowRight: () => focusTab(index + 1),
      ArrowUp: () => focusTab(index - 1 + categories.length),
      ArrowLeft: () => focusTab(index - 1 + categories.length),
      Home: () => focusTab(0),
      End: () => focusTab(last),
    };
    const action = actions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className="grid-editorial gap-y-10">
      <div
        role="tablist"
        aria-label={dict.stack.categoriesAria}
        className="col-span-12 -mx-gutter flex gap-2 overflow-x-auto px-gutter pb-2 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-line lg:px-0 lg:pb-0"
      >
        {categories.map((category, index) => {
          const selected = category.id === activeId;
          return (
            <button
              key={category.id}
              ref={(node) => {
                if (node) tabRefs.current.set(category.id, node);
                else tabRefs.current.delete(category.id);
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${category.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${category.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(category.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "group/tab relative shrink-0 border px-4 py-3 text-left transition-colors duration-300 ease-out-expo",
                "lg:w-full lg:border-x-0 lg:border-t-0 lg:border-b lg:border-line lg:px-0 lg:py-6",
                selected
                  ? "border-ink bg-ink text-paper lg:bg-transparent lg:text-ink"
                  : "border-line text-steel hover:border-ink hover:text-ink lg:hover:border-line",
              )}
            >
              <span className="flex items-baseline gap-4">
                <span
                  aria-hidden="true"
                  className={cn(
                    "hidden size-2 shrink-0 translate-y-[-0.15em] transition-[background-color,transform] duration-300 ease-out-expo lg:block",
                    selected ? "scale-100 bg-vermilion" : "scale-0 bg-ink",
                  )}
                />
                <span className="text-sm font-semibold tracking-[-0.01em] whitespace-nowrap lg:text-display-sm">
                  {category.label}
                </span>
                <span className="label ml-auto hidden tabular lg:block">
                  {String(category.technologies.length).padStart(2, "0")}
                </span>
              </span>
              <span className="mt-2 hidden text-sm text-steel lg:block">
                {category.description}
              </span>
            </button>
          );
        })}
      </div>

      <div className="col-span-12 lg:col-span-7 lg:col-start-6">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={active.id}
            role="tabpanel"
            id={`${baseId}-panel-${active.id}`}
            aria-labelledby={`${baseId}-tab-${active.id}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <p className="label text-steel lg:hidden">{active.description}</p>
            <ul className="mt-4 grid grid-cols-1 gap-x-10 border-t border-line sm:grid-cols-2 lg:mt-0">
              {active.technologies.map((technology) => (
                <li
                  key={technology.name}
                  className="group/tech flex flex-col gap-1 border-b border-line py-4 lg:py-5"
                >
                  <div className="flex items-center gap-3">
                    {TECH_ICONS[technology.name] && (
                      <Image
                        src={`/images/tech/${TECH_ICONS[technology.name]}.svg`}
                        alt=""
                        aria-hidden="true"
                        width={20}
                        height={20}
                        className="size-5 shrink-0 transition duration-300"
                      />
                    )}
                    <span
                      className={cn(
                        "text-xl font-semibold tracking-[-0.02em] transition-colors duration-300 ease-out-expo lg:text-2xl",
                        "group-hover/tech:text-vermilion-deep",
                      )}
                    >
                      {technology.name}
                    </span>
                    {technology.favorite && (
                      <span
                        className="size-1.5 shrink-0 rounded-full bg-vermilion"
                        role="img"
                        aria-label={dict.stack.favoriteTechAria}
                      />
                    )}
                    {technology.learning && (
                      <span className="label ml-auto border border-line px-1.5 py-0.5 text-steel">
                        {dict.stack.learningBadge}
                      </span>
                    )}
                  </div>
                  {technology.note && (
                    <p className="text-sm text-pretty text-steel">{technology.note}</p>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-2 text-meta text-steel">
              <span
                aria-hidden="true"
                className="inline-block size-1.5 rounded-full bg-vermilion"
              />
              {dict.stack.favoriteFootnote}
            </p>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
