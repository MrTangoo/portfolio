/**
 * Site-wide configuration.
 *
 * The public URL defaults to the production domain so that canonical URLs,
 * the sitemap and JSON-LD are always correct, even when `NEXT_PUBLIC_SITE_URL`
 * is not set. Set the variable only to preview the site under another origin.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://maxime-derbigny.ch").replace(
  /\/$/,
  "",
);

/** Search Console verification token, emitted as a meta tag when set. */
export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined;

/**
 * Optional `owner/repo` of this portfolio on GitHub. When set, the Engineering
 * section links to the real CI workflow status. Left unset by default.
 */
export const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO || undefined;

export const SITE_NAME = "Maxime Derbigny";
export const SITE_TITLE = "Maxime Derbigny — Développeur d'applications en Suisse";
export const SITE_DESCRIPTION =
  "Portfolio de Maxime Derbigny, développeur d'applications en Suisse romande. Découvrez son parcours, ses compétences en développement web et ses certifications.";
export const SITE_LOCALE = "fr_CH";

export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: "a-propos", label: "À propos" },
  { id: "expertise", label: "Expertise" },
  { id: "stack", label: "Stack" },
  { id: "parcours", label: "Parcours" },
  { id: "certifications", label: "Certifications" },
  { id: "approche", label: "Approche" },
  { id: "contact", label: "Contact" },
] as const;
