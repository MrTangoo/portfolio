/**
 * Shared types and locale-neutral data for the portfolio.
 *
 * All displayed text lives in the per-locale dictionaries under `src/i18n/`
 * — this file keeps only the shapes and the values identical in every
 * language (names, contact links, period structure, icon names).
 */

export interface YearMonth {
  year: number;
  /** 1–12 */
  month: number;
}

export interface Period {
  start: YearMonth;
  /** `null` means "today" (ongoing). */
  end: YearMonth | null;
}

export interface SocialLink {
  id: "github" | "linkedin" | "email";
  label: string;
  href: string;
  /** Human-readable form, e.g. without protocol. */
  display: string;
}

export interface Logo {
  /** Path under /public. Rendered in grayscale, coloured on hover. */
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: Period;
  summary: string;
  highlights: readonly string[];
  logo?: Logo;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  institutionFull?: string;
  location: string;
  period: Period;
  status: "ongoing" | "completed";
  summary: string;
  topics: readonly string[];
  note?: string;
  logo?: Logo;
}

export interface Certification {
  id: string;
  name: string;
  shortName?: string;
  issuer: string;
  obtained: YearMonth;
  description: string;
  score?: string;
  /** Official verification URL, added when available. */
  verificationUrl?: string;
  logo?: Logo;
}

export type StackCategoryId = "frontend" | "backend" | "data" | "tooling";

export interface Technology {
  name: string;
  /** Technologies I actively favour and want to work with. */
  favorite?: boolean;
  /** Technologies I'm actively learning. */
  learning?: boolean;
  note?: string;
}

export interface StackCategory {
  id: StackCategoryId;
  label: string;
  description: string;
  technologies: readonly Technology[];
}

export interface ExpertiseArea {
  id: string;
  index: string;
  title: string;
  description: string;
  keywords: readonly string[];
  /** Lucide icon id, mapped in the section component. */
  icon?: string;
}

export interface Principle {
  title: string;
  description: string;
  /** Lucide icon id, mapped in the section component. */
  icon?: string;
}

export interface Language {
  name: string;
  flag?: string;
  /** ISO code used for JSON-LD `knowsLanguage`. */
  code: string;
}

export const identity = {
  firstName: "Maxime",
  lastName: "Derbigny",
  fullName: "Maxime Derbigny",
  monogram: "MD.",
  employer: "MICRO Informatic Systems SA",
  email: "maxime.derbigny@gmail.com",
} as const;

export const socials: readonly SocialLink[] = [
  {
    id: "email",
    label: "Email",
    href: `mailto:${identity.email}`,
    display: identity.email,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/MrTangoo",
    display: "github.com/MrTangoo",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/maxime-derbigny",
    display: "linkedin.com/in/maxime-derbigny",
  },
];

/** External profiles — everything except email. */
export const externalSocials = socials.filter((social) => social.id !== "email");
