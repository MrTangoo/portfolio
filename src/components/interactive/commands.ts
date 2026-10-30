import type { ComponentType } from "react";
import { AppWindow, Copy, Download, Hash, Mail, SquareTerminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { externalSocials, identity } from "@/content/profile";
import { format } from "@/i18n/format";
import type { Dictionary } from "@/i18n";

export type PaletteCategory = "navigation" | "actions" | "links";

export const PALETTE_CATEGORY_ORDER: readonly PaletteCategory[] = [
  "navigation",
  "actions",
  "links",
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

function scrollToSection(id: string, locale: string, navigate: (href: string) => void) {
  const element = document.getElementById(id);
  if (!element) {
    navigate(`/${locale}#${id}`);
    return;
  }
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

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
} as const;

/** Builds the palette's commands for the active locale. */
export function buildPaletteCommands(
  dict: Dictionary,
  navigate: (href: string) => void,
): PaletteCommand[] {
  const strings = dict.palette.commands;

  const navigationCommands: PaletteCommand[] = [
    {
      id: "nav-top",
      label: strings.home.label,
      category: "navigation",
      icon: Hash,
      keywords: strings.home.keywords,
      run: () => scrollToSection("top", dict.locale, navigate),
    },
    ...dict.nav.map((item): PaletteCommand => ({
      id: `nav-${item.id}`,
      label: item.label,
      category: "navigation",
      icon: Hash,
      keywords: [`#${item.id}`, ...strings.sectionKeywords],
      run: () => scrollToSection(item.id, dict.locale, navigate),
    })),
    {
      id: "nav-applications",
      label: dict.applications.label,
      category: "navigation",
      icon: AppWindow,
      keywords: ["apps", "applications"],
      run: () => navigate(`/${dict.locale}/applications`),
    },
  ];

  const actionCommands: PaletteCommand[] = [
    {
      id: "action-cv",
      label: strings.downloadCv.label,
      category: "actions",
      icon: Download,
      keywords: strings.downloadCv.keywords,
      run: () => openExternal("/cv.pdf"),
    },
    {
      id: "action-send-email",
      label: strings.sendEmail.label,
      category: "actions",
      icon: Mail,
      keywords: strings.sendEmail.keywords,
      run: () => {
        const form = document.getElementById("contact-form");
        if (!form) {
          scrollToSection("contact", dict.locale, navigate);
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
      label: strings.copyEmail.label,
      category: "actions",
      icon: Copy,
      keywords: [...strings.copyEmail.keywords, identity.email],
      run: async ({ notify }) => {
        const ok = await copyText(identity.email);
        notify(ok ? format(strings.copySuccess, { value: identity.email }) : strings.copyFailure);
      },
    },
    {
      id: "action-terminal",
      label: strings.openTerminal.label,
      category: "actions",
      icon: SquareTerminal,
      keywords: strings.openTerminal.keywords,
      hint: "help",
      run: ({ openTerminal }) => openTerminal(),
    },
  ];

  const externalCommands: PaletteCommand[] = externalSocials.map((social) => ({
    id: `link-${social.id}`,
    label: social.label,
    category: "links",
    icon: socialIcons[social.id as keyof typeof socialIcons] ?? Hash,
    keywords: [
      social.id,
      social.display,
      ...((strings.socialKeywords as Record<string, readonly string[]>)[social.id] ?? []),
    ],
    run: () => openExternal(social.href),
  }));

  return [...navigationCommands, ...actionCommands, ...externalCommands];
}

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/** Accent- and case-insensitive filter, best match first. */
export function filterCommands(
  commands: readonly PaletteCommand[],
  dict: Dictionary,
  query: string,
): PaletteCommand[] {
  const q = normalize(query.trim());
  if (!q) return [...commands];

  const categoryLabels = dict.palette.categories;
  const scored: { command: PaletteCommand; score: number }[] = [];
  for (const command of commands) {
    const label = normalize(command.label);
    const haystack = normalize(
      [command.label, categoryLabels[command.category], ...(command.keywords ?? [])].join(" "),
    );
    let score = -1;
    if (label.startsWith(q)) score = 0;
    else if (label.includes(q)) score = 1;
    else if (haystack.includes(q)) score = 2;
    if (score >= 0) scored.push({ command, score });
  }
  return scored
    .sort((a, b) => a.score - b.score || commands.indexOf(a.command) - commands.indexOf(b.command))
    .map((entry) => entry.command);
}
