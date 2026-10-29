/**
 * Supported locales for the site. Every route lives under `app/[lang]` and
 * `proxy.ts` redirects bare paths to the visitor's preferred locale.
 */
export const LOCALES = ["fr", "en", "de"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

export const hasLocale = (locale: string): locale is Locale =>
  (LOCALES as readonly string[]).includes(locale);

export interface LocaleMeta {
  /** Value for `<html lang>` and `Intl` formatting. */
  htmlLang: string;
  /** Open Graph `og:locale`. */
  ogLocale: string;
  /** Native language name shown in the switcher. */
  name: string;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  fr: { htmlLang: "fr-CH", ogLocale: "fr_CH", name: "Français" },
  en: { htmlLang: "en", ogLocale: "en_US", name: "English" },
  de: { htmlLang: "de-CH", ogLocale: "de_CH", name: "Deutsch" },
};

/**
 * Best match for an `Accept-Language` header value, e.g.
 * "de-CH,de;q=0.9,en;q=0.8" → "de". Falls back to the default locale.
 */
export function matchLocale(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((param) => param.trim()).find((param) => param.startsWith("q="));
      return { tag: (tag ?? "").toLowerCase(), q: q ? Number.parseFloat(q.slice(2)) || 0 : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const language = tag.split("-")[0] ?? "";
    if (hasLocale(language)) return language;
    if (tag === "*") return DEFAULT_LOCALE;
  }
  return DEFAULT_LOCALE;
}
