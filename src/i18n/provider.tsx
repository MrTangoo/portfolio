"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Dictionary } from "./dictionaries/fr";
import type { Locale } from "./locales";

/**
 * The dictionary travels from the `[lang]` layout to every Client Component.
 * Only the active locale is sent by the layout; no fallback dictionary is
 * bundled into every client route.
 */
const DictionaryContext = createContext<Dictionary | null>(null);

export function DictionaryProvider({ dict, children }: { dict: Dictionary; children: ReactNode }) {
  return <DictionaryContext.Provider value={dict}>{children}</DictionaryContext.Provider>;
}

export function useDictionary(): Dictionary {
  const dictionary = useContext(DictionaryContext);
  if (!dictionary) throw new Error("useDictionary must be used within DictionaryProvider");
  return dictionary;
}

export function useLocale(): Locale {
  return useDictionary().locale;
}
