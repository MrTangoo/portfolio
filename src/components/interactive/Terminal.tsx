"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import * as m from "motion/react-m";
import { X } from "lucide-react";
import {
  execute,
  getWelcomeLines,
  TERMINAL_COMMAND_NAMES,
  type OutputLine,
  type Segment,
} from "@/lib/terminal";
import { useDictionary } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const PROMPT = "❯";
const MAX_LINES = 300;
const MAX_HISTORY = 100;
const MAX_INPUT = 240;

interface TermLine {
  id: number;
  kind: "in" | "out" | "err";
  segments: OutputLine;
}

let nextId = 0;
const makeLine = (kind: TermLine["kind"], segments: OutputLine): TermLine => ({
  id: nextId++,
  kind,
  segments,
});

const initialLines = (dict: Parameters<typeof getWelcomeLines>[0]): TermLine[] =>
  getWelcomeLines(dict).map((segments) => makeLine("out", segments));

interface TerminalProps {
  onClose: () => void;
  /** Hides the whole window while keeping state (history, size) alive. */
  minimized: boolean;
  onMinimize: (minimized: boolean) => void;
}

const MIN_WIDTH = 300;
const MIN_HEIGHT = 220;
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Simulated developer terminal. Every input goes through the allow-list
 * interpreter in `@/lib/terminal` — nothing is ever executed.
 */
export function Terminal({ onClose, minimized, onMinimize }: TerminalProps) {
  const dict = useDictionary();
  const [lines, setLines] = useState<TermLine[]>(() => initialLines(dict));
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [maximized, setMaximized] = useState(false);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  // Explicit top/left anchor set on first resize — the window then grows
  // down and to the right, following the corner grip like a real window.
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    rect: DOMRect;
  } | null>(null);
  const resizeRef = useRef<{
    startX: number;
    startY: number;
    w: number;
    h: number;
    left: number;
    top: number;
  } | null>(null);

  // Non-modal but self-contained: dim the page, keep focus inside, restore it.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    return () => previous?.focus?.();
  }, []);

  // Follow the output as it grows.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // Drag the window by its title bar, clamped so a handle always stays in view.
  useEffect(() => {
    if (!dragging) return;
    const onMove = (event: PointerEvent) => {
      const state = dragRef.current;
      if (!state) return;
      const { rect, origX, origY, startX, startY } = state;
      const left = clamp(
        rect.left + event.clientX - startX,
        -rect.width + 96,
        window.innerWidth - 96,
      );
      const top = clamp(rect.top + event.clientY - startY, 0, window.innerHeight - 48);
      setDrag({ x: origX + left - rect.left, y: origY + top - rect.top });
    };
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragging]);

  // Resize from the bottom-right corner, like a real window.
  useEffect(() => {
    if (!resizing) return;
    const onMove = (event: PointerEvent) => {
      const state = resizeRef.current;
      if (!state) return;
      setSize({
        w: clamp(
          state.w + event.clientX - state.startX,
          MIN_WIDTH,
          window.innerWidth - state.left - 8,
        ),
        h: clamp(
          state.h + event.clientY - state.startY,
          MIN_HEIGHT,
          window.innerHeight - state.top - 8,
        ),
      });
    };
    const onUp = () => setResizing(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [resizing]);

  // Avoid stray text selection while moving or resizing the window.
  useEffect(() => {
    if (!dragging && !resizing) return;
    const previous = document.body.style.userSelect;
    document.body.style.userSelect = "none";
    return () => {
      document.body.style.userSelect = previous;
    };
  }, [dragging, resizing]);

  // Hand focus back to the page while hidden, to the input when restored.
  useEffect(() => {
    if (minimized) {
      (document.activeElement as HTMLElement | null)?.blur?.();
    } else {
      inputRef.current?.focus();
    }
  }, [minimized]);

  const onDragStart = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (maximized) return;
    if ((event.target as HTMLElement).closest("button")) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      origX: drag.x,
      origY: drag.y,
      rect,
    };
    setDragging(true);
  };

  const onResizeStart = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (maximized) return;
    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;
    event.preventDefault();
    // Anchor the top-left corner (minus the drag translation) so resizing
    // expands downward/rightward instead of up from the bottom edge.
    setPos({ x: rect.left - drag.x, y: rect.top - drag.y });
    resizeRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      w: rect.width,
      h: rect.height,
      left: rect.left,
      top: rect.top,
    };
    setResizing(true);
  };

  const toggleMaximize = () => {
    setMaximized((value) => !value);
    setDrag({ x: 0, y: 0 });
  };

  const scrollToAnchor = (hash: string) => {
    onClose();
    if (window.location.pathname !== `/${dict.locale}`) {
      window.location.assign(`/${dict.locale}${hash}`);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById(hash.slice(1))
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const submit = (raw: string) => {
    const value = raw.slice(0, MAX_INPUT);
    const echoed = makeLine("in", [{ text: value }]);
    const result = execute(value, dict);

    setHistory((h) => (value.trim() ? [...h, value].slice(-MAX_HISTORY) : h));
    setHistoryIndex(null);
    setInput("");

    if (result.action === "clear") {
      setLines([]);
      return;
    }
    setLines((current) =>
      [
        ...current,
        echoed,
        ...result.lines.map((segments) => makeLine(result.error ? "err" : "out", segments)),
      ].slice(-MAX_LINES),
    );

    if (result.action === "close") onClose();
    if (result.action === "open-cv") window.open("/cv.pdf", "_blank", "noopener,noreferrer");
  };

  const complete = () => {
    const value = input.trim();
    if (!value || value.includes(" ")) return;
    const matches = TERMINAL_COMMAND_NAMES.filter((name) => name.startsWith(value));
    if (matches.length === 1) {
      setInput(`${matches[0]} `);
    } else if (matches.length > 1) {
      setLines((current) =>
        [
          ...current,
          makeLine("in", [{ text: value }]),
          makeLine("out", [{ text: `  ${matches.join("   ")}` }]),
        ].slice(-MAX_LINES),
      );
    }
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        submit(input);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!history.length) break;
        setHistoryIndex((index) => {
          const next = index === null ? history.length - 1 : Math.max(index - 1, 0);
          setInput(history[next] ?? "");
          return next;
        });
        break;
      case "ArrowDown":
        event.preventDefault();
        if (historyIndex === null) break;
        setHistoryIndex((index) => {
          if (index === null) return null;
          const next = index + 1;
          if (next >= history.length) {
            setInput("");
            return null;
          }
          setInput(history[next] ?? "");
          return next;
        });
        break;
      case "Tab":
        event.preventDefault();
        complete();
        break;
      case "Escape":
        event.preventDefault();
        onClose();
        break;
    }
  };

  const onDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };

  // Clicking empty space focuses the input — without stealing a text selection.
  const onBodyClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget || !window.getSelection()?.toString()) {
      inputRef.current?.focus();
    }
  };

  const toneClass = (tone?: Segment["tone"]) =>
    tone === "strong" ? "text-paper" : tone === "muted" ? "text-paper/50" : "";

  const renderSegment = (segment: Segment, index: number) => {
    if (!segment.href) {
      return (
        <span key={index} className={toneClass(segment.tone)}>
          {segment.text}
        </span>
      );
    }
    const internal = segment.href.startsWith("#");
    return (
      <a
        key={index}
        href={segment.href}
        {...(internal
          ? {
              onClick: (e: MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                scrollToAnchor(segment.href!);
              },
            }
          : { target: "_blank", rel: "noopener noreferrer" })}
        className={cn(
          "underline decoration-line-inverse-strong underline-offset-2 transition-colors duration-150 hover:text-vermilion",
          toneClass(segment.tone),
        )}
      >
        {segment.text}
      </a>
    );
  };

  return (
    <>
      <m.div
        ref={containerRef}
        role="dialog"
        aria-modal="false"
        aria-label={dict.terminal.dialogAria}
        style={{
          ...(pos && !maximized ? { left: pos.x, top: pos.y, right: "auto", bottom: "auto" } : {}),
          ...(size && !maximized && !minimized ? { width: size.w } : {}),
        }}
        className={cn(
          "fixed z-[80]",
          minimized && "hidden",
          maximized
            ? "inset-2 sm:inset-6"
            : pos
              ? ""
              : "inset-x-2 bottom-2 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[42rem]",
        )}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.985 }}
        transition={{ duration: 0.22, ease: EASE }}
        onKeyDown={onDialogKeyDown}
      >
        <div
          ref={windowRef}
          style={{
            translate: `${drag.x}px ${drag.y}px`,
            ...(size && !maximized ? { height: size.h } : {}),
          }}
          className={cn(
            "relative flex flex-col overflow-hidden border border-line-inverse bg-ink text-paper shadow-2xl",
            maximized ? "h-full" : size ? "" : "h-[26rem] max-h-[72svh]",
          )}
        >
          {/* Title bar — also the drag handle (double-click toggles maximize). */}
          <div
            onPointerDown={onDragStart}
            onDoubleClick={toggleMaximize}
            className={cn(
              "flex shrink-0 touch-none items-center gap-3 border-b border-line-inverse bg-ink-soft px-4 py-2.5 select-none",
              maximized ? "cursor-default" : dragging ? "cursor-grabbing" : "cursor-grab",
            )}
          >
            <span className="flex gap-2" role="group" aria-label={dict.terminal.controlsAria}>
              <button
                type="button"
                onClick={onClose}
                aria-label={dict.terminal.closeTerminal}
                title={dict.terminal.close}
                className="group relative size-3 rounded-full bg-[#ff5f57] transition-transform duration-150 hover:scale-125"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center text-[9px] leading-none text-ink/70 opacity-0 transition-opacity duration-100 group-hover:opacity-100"
                >
                  ×
                </span>
              </button>
              <button
                type="button"
                onClick={() => onMinimize(true)}
                aria-label={dict.terminal.minimizeTerminal}
                title={dict.terminal.minimize}
                className="group relative size-3 rounded-full bg-[#febc2e] transition-transform duration-150 hover:scale-125"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center text-[9px] leading-none text-ink/70 opacity-0 transition-opacity duration-100 group-hover:opacity-100"
                >
                  −
                </span>
              </button>
              <button
                type="button"
                onClick={toggleMaximize}
                aria-label={maximized ? dict.terminal.restoreSize : dict.terminal.maximizeTerminal}
                title={maximized ? dict.terminal.restore : dict.terminal.maximize}
                className="group relative size-3 rounded-full bg-[#28c840] transition-transform duration-150 hover:scale-125"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center text-[9px] leading-none text-ink/70 opacity-0 transition-opacity duration-100 group-hover:opacity-100"
                >
                  +
                </span>
              </button>
            </span>
            <p className="label min-w-0 flex-1 truncate text-paper/60 normal-case">
              maxime@derbigny - zsh
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label={dict.terminal.closeTerminal}
              className="-mr-1 flex size-8 items-center justify-center text-paper/60 transition-colors duration-150 hover:text-paper"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>

          {/* Output + input live in one scroll region, like a real terminal. */}
          <div
            ref={scrollRef}
            onClick={onBodyClick}
            className="min-h-0 flex-1 cursor-text overflow-y-auto overscroll-contain px-4 py-3 font-mono text-[13px] leading-relaxed"
          >
            {lines.map((line) =>
              line.kind === "in" ? (
                <p key={line.id} className="break-all whitespace-pre-wrap">
                  <span className="text-vermilion">{PROMPT} </span>
                  {line.segments.map(renderSegment)}
                </p>
              ) : (
                <p
                  key={line.id}
                  className={cn(
                    "break-all whitespace-pre-wrap",
                    line.kind === "err" ? "text-vermilion" : "text-paper/85",
                  )}
                >
                  {line.segments.map(renderSegment)}
                </p>
              ),
            )}

            <div className="flex items-baseline gap-0">
              <span aria-hidden="true" className="text-vermilion">
                {PROMPT}&nbsp;
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => {
                  setInput(event.target.value.slice(0, MAX_INPUT));
                  setHistoryIndex(null);
                }}
                onKeyDown={onInputKeyDown}
                maxLength={MAX_INPUT}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label={dict.terminal.inputAria}
                className="min-w-0 flex-1 border-none bg-transparent p-0 font-mono text-[13px] text-paper caret-[#28c840] outline-none placeholder:text-paper/40"
                placeholder={dict.terminal.inputPlaceholder}
              />
            </div>
          </div>

          {/* Resize grip — bottom-right corner. */}
          {!maximized && (
            <div
              aria-hidden="true"
              onPointerDown={onResizeStart}
              className="absolute right-0 bottom-0 size-4 cursor-nwse-resize"
            >
              <svg
                viewBox="0 0 16 16"
                className="size-4 text-paper/25"
                fill="none"
                stroke="currentColor"
              >
                <path d="M4 16 16 4 M8 16 16 8 M12 16 16 12" />
              </svg>
            </div>
          )}
        </div>
      </m.div>

      {/* Restore pill shown while the window is hidden (history is kept). */}
      {minimized && (
        <button
          type="button"
          onClick={() => onMinimize(false)}
          aria-label={dict.terminal.restoreTerminal}
          className="fixed right-2 bottom-2 z-[80] flex items-center gap-2.5 border border-line-inverse bg-ink px-4 py-2.5 font-mono text-xs text-paper shadow-2xl transition-colors duration-150 hover:border-line-inverse-strong sm:right-6 sm:bottom-6"
        >
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2 rounded-full bg-[#ff5f57]" />
            <span className="size-2 rounded-full bg-[#febc2e]" />
            <span className="size-2 rounded-full bg-[#28c840]" />
          </span>
          maxime@derbigny - zsh
        </button>
      )}
    </>
  );
}
