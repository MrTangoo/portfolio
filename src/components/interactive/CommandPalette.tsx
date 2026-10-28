"use client";

import { Fragment, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import * as m from "motion/react-m";
import { CornerDownLeft, Search, X } from "lucide-react";
import {
  filterCommands,
  PALETTE_CATEGORY_ORDER,
  type PaletteCommand,
  type PaletteCommandContext,
} from "@/components/interactive/commands";
import { cn } from "@/lib/utils";

interface CommandPaletteProps {
  onClose: () => void;
  context: PaletteCommandContext;
}

const EASE = [0.16, 1, 0.3, 1] as const;

function Kbd({ children }: { children: string }) {
  return (
    <kbd className="inline-flex min-w-5 items-center justify-center border border-line bg-paper-deep px-1.5 py-0.5 font-mono text-[10px] leading-none text-steel">
      {children}
    </kbd>
  );
}

/**
 * VS Code / Raycast-style command palette. Rendered only while open — the
 * parent wraps it in `AnimatePresence` for the exit transition.
 */
export function CommandPalette({ onClose, context }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => filterCommands(query), [query]);

  const grouped = useMemo(
    () =>
      PALETTE_CATEGORY_ORDER.map((category) => ({
        category,
        commands: visible.filter((command) => command.category === category),
      })).filter((group) => group.commands.length > 0),
    [visible],
  );

  // Stable listbox index for every visible command (for aria-activedescendant).
  const optionIndices = useMemo(
    () => new Map(visible.map((command, index) => [command, index])),
    [visible],
  );

  // Lock the page, keep focus inside the dialog, restore focus on close.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const background = document.querySelectorAll<HTMLElement>("header, main, footer");
    const previousOverflow = document.body.style.overflow;
    background.forEach((element) => (element.inert = true));
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      background.forEach((element) => (element.inert = false));
      document.body.style.overflow = previousOverflow;
      previous?.focus?.();
    };
  }, []);

  // Keep the keyboard-highlighted option in view.
  useEffect(() => {
    document
      .getElementById(`${listId}-option-${activeIndex}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, listId]);

  const run = (command: PaletteCommand) => {
    void Promise.resolve(command.run(context));
    onClose();
  };

  const clampIndex = (index: number) =>
    ((index % visible.length) + visible.length) % visible.length;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "Escape":
        event.preventDefault();
        onClose();
        return;
      case "ArrowDown":
        event.preventDefault();
        if (visible.length) setActiveIndex((index) => clampIndex(index + 1));
        return;
      case "ArrowUp":
        event.preventDefault();
        if (visible.length) setActiveIndex((index) => clampIndex(index - 1));
        return;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        return;
      case "End":
        event.preventDefault();
        setActiveIndex(Math.max(visible.length - 1, 0));
        return;
      case "Enter": {
        event.preventDefault();
        const command = visible[activeIndex];
        if (command) run(command);
        return;
      }
      case "Tab": {
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          'input, button, a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables?.length) return;
        const list = [...focusables].filter((el) => !el.hasAttribute("disabled"));
        const first = list[0];
        const last = list[list.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }
  };

  return (
    <m.div
      role="dialog"
      aria-modal="true"
      aria-label="Palette de commandes"
      className="fixed inset-0 z-[90]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onKeyDown={onKeyDown}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
        onClick={onClose}
      />

      <m.div
        ref={panelRef}
        initial={{ opacity: 0, y: -8, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.99 }}
        transition={{ duration: 0.18, ease: EASE }}
        className="absolute inset-x-4 top-[12svh] mx-auto flex max-h-[70svh] max-w-xl flex-col overflow-hidden border border-line bg-paper shadow-2xl sm:top-[16svh]"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search aria-hidden="true" className="size-4 shrink-0 text-steel" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={visible.length ? `${listId}-option-${activeIndex}` : undefined}
            aria-label="Rechercher une commande"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            placeholder="Rechercher une commande…"
            className="h-13 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-steel-soft"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la palette de commandes"
            className="-mr-2 flex size-10 items-center justify-center text-steel transition-colors duration-150 hover:text-ink"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>

        <ul
          id={listId}
          role="listbox"
          aria-label="Commandes"
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-2"
        >
          {grouped.map((group) => (
            <Fragment key={group.category}>
              <li
                role="presentation"
                className="label px-4 pt-3 pb-1.5 text-steel-soft first:pt-1.5"
              >
                {group.category}
              </li>
              {group.commands.map((command) => {
                const index = optionIndices.get(command) ?? 0;
                const isActive = index === activeIndex;
                const Icon = command.icon;
                return (
                  <li
                    key={command.id}
                    id={`${listId}-option-${index}`}
                    role="option"
                    aria-selected={isActive}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => run(command)}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-100",
                      isActive ? "bg-paper-deep text-ink" : "text-ink/80",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-4 shrink-0 transition-colors duration-100",
                        isActive ? "text-vermilion-deep" : "text-steel",
                      )}
                    />
                    <span className="min-w-0 flex-1 truncate">{command.label}</span>
                    {command.hint && (
                      <span className="label text-[10px] text-steel-soft">{command.hint}</span>
                    )}
                    {isActive && (
                      <CornerDownLeft aria-hidden="true" className="size-3.5 text-steel" />
                    )}
                  </li>
                );
              })}
            </Fragment>
          ))}

          {visible.length === 0 && (
            <li role="presentation" className="px-4 py-10 text-center text-sm text-steel">
              Aucun résultat pour «&nbsp;{query}&nbsp;»
            </li>
          )}
        </ul>

        <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-steel">
          <span className="flex items-center gap-1.5 text-xs">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            naviguer
          </span>
          <span className="flex items-center gap-1.5 text-xs">
            <Kbd>↵</Kbd>
            exécuter
          </span>
          <span className="ml-auto flex items-center gap-1.5 text-xs">
            <Kbd>esc</Kbd>
            fermer
          </span>
        </div>
      </m.div>
    </m.div>
  );
}
