/**
 * Controlled interpreter for the portfolio's simulated terminal.
 *
 * Security contract: this is NOT a shell. Inputs are parsed as plain text and
 * matched against an explicit allow-list of commands. The output is a list of
 * typed segments (text or link) that the UI renders as text nodes — never as
 * HTML — so no input can inject markup or execute code.
 */

import { about, experiences, externalSocials, identity, stack } from "@/content/profile";
import { formatYearMonth } from "@/lib/dates";

export interface Segment {
  text: string;
  href?: string;
  /** `strong` brightens (keys, titles); `muted` dims (descriptions, meta). */
  tone?: "muted" | "strong";
}

export type OutputLine = Segment[];

/** Side effects the UI layer executes on behalf of a command. */
export type TerminalAction = "clear" | "close" | "open-cv";

export interface ExecResult {
  lines: OutputLine[];
  action?: TerminalAction;
  /** True when the input could not be matched to a command. */
  error?: boolean;
}

export interface CommandDef {
  name: string;
  description: string;
}

/** Allow-list — also used for `help` and Tab completion. */
export const TERMINAL_COMMANDS: readonly CommandDef[] = [
  { name: "help", description: "Liste les commandes disponibles" },
  { name: "about", description: "Présentation du site et de son auteur" },
  { name: "projects", description: "Projets publiés" },
  { name: "stack", description: "Technologies utilisées" },
  { name: "experience", description: "Expériences professionnelles" },
  { name: "contact", description: "Moyens de contact" },
  { name: "cv", description: "Ouvre le CV au format PDF" },
  { name: "date", description: "Affiche la date et l'heure locales" },
  { name: "whoami", description: "Qui suis-je ?" },
  { name: "echo", description: "echo <texte> — réaffiche le texte fourni" },
  { name: "clear", description: "Efface l'historique du terminal" },
  { name: "exit", description: "Ferme le terminal" },
];

export const TERMINAL_COMMAND_NAMES = TERMINAL_COMMANDS.map((command) => command.name);

const MAX_ARGUMENT_LENGTH = 500;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: string): Segment[] {
  return [{ text: value }];
}

function formatPeriod(start: Parameters<typeof formatYearMonth>[0], end: typeof start | null) {
  return `${formatYearMonth(start)} → ${end ? formatYearMonth(end) : "aujourd'hui"}`;
}

const BLANK: OutputLine = [{ text: " " }];

function helpLines(): OutputLine[] {
  const width = Math.max(...TERMINAL_COMMANDS.map((command) => command.name.length));
  return TERMINAL_COMMANDS.map((command) => [
    { text: `  ${command.name.padEnd(width)}`, tone: "strong" },
    { text: `  ${command.description}`, tone: "muted" },
  ]);
}

/**
 * Wraps a list of segments on item boundaries with a hanging indent —
 * like a properly formatted CLI list instead of a raw text dump.
 */
function wrapItems(
  items: Segment[],
  indent: string,
  separator: string,
  width: number,
): OutputLine[] {
  const lines: OutputLine[] = [];
  let line: Segment[] = [{ text: indent }];
  let length = indent.length;

  for (const item of items) {
    const extra = (length === indent.length ? 0 : separator.length) + item.text.length;
    if (length > indent.length && length + extra > width) {
      lines.push(line);
      line = [{ text: indent }];
      length = indent.length;
    }
    if (length > indent.length) {
      line.push({ text: separator, tone: "muted" });
      length += separator.length;
    }
    line.push(item);
    length += item.text.length;
  }
  lines.push(line);
  return lines;
}

function stackLines(): OutputLine[] {
  const lines: OutputLine[] = [];
  for (const category of stack) {
    lines.push([{ text: `  ${category.label}`, tone: "strong" }]);
    lines.push(
      ...wrapItems(
        category.technologies.map((tech) => ({
          text: tech.favorite ? `${tech.name}*` : tech.name,
          tone: tech.favorite ? ("strong" as const) : undefined,
        })),
        "    ",
        " · ",
        72,
      ),
    );
    lines.push(BLANK);
  }
  lines.push([{ text: "  * technologie de prédilection", tone: "muted" }]);
  return lines;
}

function experienceLines(): OutputLine[] {
  const lines: OutputLine[] = [];
  for (const exp of experiences) {
    lines.push([{ text: `  ${exp.role}`, tone: "strong" }]);
    lines.push([
      {
        text: `  ${exp.company} · ${formatPeriod(exp.period.start, exp.period.end)}`,
        tone: "muted",
      },
    ]);
    lines.push(BLANK);
  }
  lines.push([{ text: "  → Détails dans la section " }, { text: "Parcours", href: "#parcours" }]);
  return lines;
}

function contactLines(): OutputLine[] {
  const width = Math.max(
    ...["Email", ...externalSocials.map((social) => social.label)].map((l) => l.length),
  );
  const lines: OutputLine[] = [
    [
      { text: `  ${"Email".padEnd(width)}`, tone: "strong" },
      { text: `  ${identity.email}`, href: `mailto:${identity.email}` },
    ],
    ...externalSocials.map((social): OutputLine => [
      { text: `  ${social.label.padEnd(width)}`, tone: "strong" },
      { text: `  ${social.display}`, href: social.href },
    ]),
    BLANK,
    [{ text: "  → Section " }, { text: "Contact", href: "#contact" }],
  ];
  return lines;
}

function projectsLines(): OutputLine[] {
  const github = externalSocials.find((social) => social.id === "github");
  const lines: OutputLine[] = [
    text("  Aucun projet n'est encore publié sur ce site — section en préparation."),
  ];
  if (github) {
    lines.push([
      { text: "  En attendant, mes dépôts sont sur " },
      { text: github.display, href: github.href },
    ]);
  }
  return lines;
}

function dateLine(): OutputLine[] {
  const formatted = new Intl.DateTimeFormat("fr-CH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
  return [text(`  ${formatted}`)];
}

/**
 * Executes one input line against the allow-list.
 * Returns the output lines and an optional side-effect action for the UI.
 */
export function execute(rawInput: string): ExecResult {
  const input = rawInput.trim().replace(/\s+/g, " ");
  if (!input) return { lines: [] };

  const spaceIndex = input.indexOf(" ");
  const command = (spaceIndex === -1 ? input : input.slice(0, spaceIndex)).toLowerCase();
  const args = spaceIndex === -1 ? "" : input.slice(spaceIndex + 1).slice(0, MAX_ARGUMENT_LENGTH);

  switch (command) {
    case "help":
      return { lines: helpLines() };
    case "about":
      return {
        lines: [
          text(`  ${about.paragraphs[0]}`),
          [{ text: "  → Section " }, { text: "À propos", href: "#a-propos" }],
        ],
      };
    case "projects":
      return { lines: projectsLines() };
    case "stack":
      return { lines: stackLines() };
    case "experience":
      return { lines: experienceLines() };
    case "contact":
      return { lines: contactLines() };
    case "cv":
      return {
        lines: [[{ text: "  Ouverture de " }, { text: "cv.pdf", href: "/cv.pdf" }, { text: " …" }]],
        action: "open-cv",
      };
    case "date":
      return { lines: dateLine() };
    case "whoami":
      return {
        lines: [
          [
            { text: `  ${identity.fullName}`, tone: "strong" },
            {
              text:
                ` — ${identity.jobTitle}, ${identity.location.display}. ` +
                `Actuellement chez ${identity.employer}.`,
            },
          ],
        ],
      };
    case "echo":
      // Echoed back as a text segment only — never interpreted as markup.
      return { lines: args ? [text(`  ${args}`)] : [] };
    case "clear":
      return { lines: [], action: "clear" };
    case "exit":
      return { lines: [], action: "close" };
    case "sudo":
      return { lines: [text("  Permission refusée : ce terminal est une simulation.")] };
    default: {
      // A bare e-mail or URL typed by mistake still gets a helpful answer.
      if (EMAIL_PATTERN.test(command)) {
        return {
          lines: [text(`  Pour m'écrire : « contact » ou « echo » pour afficher du texte.`)],
        };
      }
      return {
        lines: [text(`  commande introuvable : « ${command} » — tapez « help ».`)],
        error: true,
      };
    }
  }
}

/** Welcome block shown when the terminal opens. */
export const WELCOME_LINES: OutputLine[] = [
  [{ text: `  ${identity.fullName} — portfolio`, tone: "strong" }],
  [
    {
      text: "  Terminal simulé — les commandes sont limitées à une liste prédéfinie.",
      tone: "muted",
    },
  ],
  text("  Tapez « help » pour les découvrir, « exit » pour quitter."),
];
