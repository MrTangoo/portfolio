import type { ComponentType } from "react";
import { Copy, Download, Hash, Mail, SquareTerminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { externalSocials, identity } from "@/content/profile";
import { NAV_ITEMS } from "@/content/site";

export type PaletteCategory = "Navigation" | "Actions" | "Liens externes";

export const PALETTE_CATEGORY_ORDER: readonly PaletteCategory[] = [
  "Navigation",
  "Actions",
  "Liens externes",
];

export interface PaletteCommandContext {
  openTerminal: () => void;
  notify: (message: string) => void;
}

export interface PaletteCommand {
  id: string;
  label: string;
  category: PaletteCategory;
  icon: ComponentType<{ className?: string }>;
  /** Extra terms matched by the search filter. */
  keywords?: readonly string[];
  /** Right-aligned shortcut hint shown on the row. */
  hint?: string;
  run: (context: PaletteCommandContext) => void | Promise<void>;
}

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

function openExternal(href: string) {
  window.open(href, "_blank", "noopener,noreferrer");
}

/** Clipboard API with a legacy fallback for non-secure contexts. */
async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      textarea.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

const navigationCommands: PaletteCommand[] = [
  {
    id: "nav-top",
    label: "Accueil",
    category: "Navigation",
    icon: Hash,
    keywords: ["top", "haut", "hero", "home"],
    run: () =>
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      }),
  },
  ...NAV_ITEMS.map((item): PaletteCommand => ({
    id: `nav-${item.id}`,
    label: item.label,
    category: "Navigation",
    icon: Hash,
    keywords: [`#${item.id}`, "section", "aller"],
    run: () => scrollToSection(item.id),
  })),
];

const actionCommands: PaletteCommand[] = [
  {
    id: "action-cv",
    label: "Télécharger le CV",
    category: "Actions",
    icon: Download,
    keywords: ["cv", "pdf", "resume", "curriculum"],
    run: () => openExternal("/cv.pdf"),
  },
  {
    id: "action-send-email",
    label: "M'envoyer un email",
    category: "Actions",
    icon: Mail,
    keywords: ["email", "mail", "message", "contact", "formulaire", "écrire", "envoyer"],
    run: () => {
      const form = document.getElementById("contact-form");
      if (!form) {
        scrollToSection("contact");
        return;
      }
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      form.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      setTimeout(
        () => document.getElementById("contact-name")?.focus({ preventScroll: true }),
        reduce ? 50 : 550,
      );
    },
  },
  {
    id: "action-copy-email",
    label: "Copier l'adresse email",
    category: "Actions",
    icon: Copy,
    keywords: ["email", "mail", "copier", "contact", identity.email],
    run: async ({ notify }) => {
      const ok = await copyText(identity.email);
      notify(ok ? `Copié : ${identity.email}` : "La copie a échoué — réessayez.");
    },
  },
  {
    id: "action-terminal",
    label: "Ouvrir le terminal",
    category: "Actions",
    icon: SquareTerminal,
    keywords: ["terminal", "console", "shell", "cli", "commande"],
    hint: "help",
    run: ({ openTerminal }) => openTerminal(),
  },
];

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
} as const;

const socialKeywords: Record<string, readonly string[]> = {
  github: ["code", "repo", "profil"],
  linkedin: ["profil", "réseau"],
};

const externalCommands: PaletteCommand[] = externalSocials.map((social) => ({
  id: `link-${social.id}`,
  label: social.label,
  category: "Liens externes",
  icon: socialIcons[social.id as keyof typeof socialIcons] ?? Hash,
  keywords: [social.id, social.display, ...(socialKeywords[social.id] ?? [])],
  run: () => openExternal(social.href),
}));

export const PALETTE_COMMANDS: readonly PaletteCommand[] = [
  ...navigationCommands,
  ...actionCommands,
  ...externalCommands,
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/** Accent- and case-insensitive filter, best match first. */
export function filterCommands(query: string): PaletteCommand[] {
  const q = normalize(query.trim());
  if (!q) return [...PALETTE_COMMANDS];

  const scored: { command: PaletteCommand; score: number }[] = [];
  for (const command of PALETTE_COMMANDS) {
    const label = normalize(command.label);
    const haystack = normalize(
      [command.label, command.category, ...(command.keywords ?? [])].join(" "),
    );
    let score = -1;
    if (label.startsWith(q)) score = 0;
    else if (label.includes(q)) score = 1;
    else if (haystack.includes(q)) score = 2;
    if (score >= 0) scored.push({ command, score });
  }
  return scored
    .sort(
      (a, b) =>
        a.score - b.score ||
        PALETTE_COMMANDS.indexOf(a.command) - PALETTE_COMMANDS.indexOf(b.command),
    )
    .map((entry) => entry.command);
}
