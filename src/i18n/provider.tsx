"use client";

import { createContext, useContext, type ReactNode } from "react";
import { fr, type Dictionary } from "./dictionaries/fr";
import type { Locale } from "./locales";

/**
 * The dictionary travels from the `[lang]` layout to every Client Component.
 * The French dictionary is the context default so consumers (e.g. the error
 * boundary) still render something sensible if the provider is missing.
 */
const DictionaryContext = createContext<Dictionary>(fr);

export function DictionaryProvider({ dict, children }: { dict: Dictionary; children: ReactNode }) {
  return <DictionaryContext.Provider value={dict}>{children}</DictionaryContext.Provider>;
}

export function useDictionary(): Dictionary {
  return useContext(DictionaryContext);
}

export function useLocale(): Locale {
  return useContext(DictionaryContext).locale;
}
