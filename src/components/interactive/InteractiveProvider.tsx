"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { CommandPalette } from "@/components/interactive/CommandPalette";
import { Terminal } from "@/components/interactive/Terminal";

interface InteractiveContextValue {
  openPalette: () => void;
  openTerminal: () => void;
  notify: (message: string) => void;
}

const InteractiveContext = createContext<InteractiveContextValue | null>(null);

export function useInteractive() {
  const context = useContext(InteractiveContext);
  if (!context) {
    throw new Error("useInteractive must be used within InteractiveProvider");
  }
  return context;
}

/**
 * Mounts the command palette and the simulated terminal once, above the page,
 * and owns the global Ctrl/Cmd+K shortcut plus transient action feedback.
 */
export function InteractiveProvider({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalMinimized, setTerminalMinimized] = useState(false);
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  const notify = useCallback((message: string) => {
    window.clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message });
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const openTerminal = useCallback(() => {
    setPaletteOpen(false);
    setTerminalOpen(true);
    setTerminalMinimized(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key?.toLowerCase() === "k" &&
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        !event.shiftKey
      ) {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const value = useMemo(
    () => ({ openPalette, openTerminal, notify }),
    [openPalette, openTerminal, notify],
  );

  return (
    <InteractiveContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {paletteOpen && (
          <CommandPalette
            key="palette"
            onClose={() => setPaletteOpen(false)}
            context={{ openTerminal, notify }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {terminalOpen && (
          <Terminal
            key="terminal"
            onClose={() => setTerminalOpen(false)}
            minimized={terminalMinimized}
            onMinimize={setTerminalMinimized}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <m.p
            key={toast.id}
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 bg-ink px-4 py-3 font-mono text-sm text-paper shadow-lg"
          >
            {toast.message}
          </m.p>
        )}
      </AnimatePresence>
    </InteractiveContext.Provider>
  );
}
