import { fr, type Dictionary } from "./dictionaries/fr";
import { en } from "./dictionaries/en";
import { de } from "./dictionaries/de";
import { DEFAULT_LOCALE, hasLocale, type Locale } from "./locales";

const dictionaries: Record<Locale, Dictionary> = { fr, en, de };

/** Dictionary for an explicit locale — usable anywhere, including route handlers. */
export function getDictionaryFor(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Dictionary for the `[lang]` param, falling back to the default locale. */
export function getDictionarySafe(langParam: string): Dictionary {
  return getDictionaryFor(hasLocale(langParam) ? langParam : DEFAULT_LOCALE);
}

export type { Dictionary, Locale };
export { DEFAULT_LOCALE, hasLocale, LOCALE_META, LOCALES } from "./locales";
export { format } from "./format";
