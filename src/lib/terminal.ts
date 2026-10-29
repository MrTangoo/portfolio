/**
 * Controlled interpreter for the portfolio's simulated terminal.
 *
 * Security contract: this is NOT a shell. Inputs are parsed as plain text and
 * matched against an explicit allow-list of commands. The output is a list of
 * typed segments (text or link) that the UI renders as text nodes — never as
 * HTML — so no input can inject markup or execute code.
 */

import { externalSocials, identity } from "@/content/profile";
import { format } from "@/i18n/format";
import type { Dictionary } from "@/i18n";
import { LOCALE_META } from "@/i18n/locales";
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

/** Command names — the fixed allow-list, localized descriptions live in the dictionary. */
export const TERMINAL_COMMAND_NAMES = [
  "help",
  "about",
  "projects",
  "stack",
  "experience",
  "contact",
  "cv",
  "date",
  "whoami",
  "echo",
  "clear",
  "exit",
] as const;

const MAX_ARGUMENT_LENGTH = 500;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: string): Segment[] {
  return [{ text: value }];
}

const BLANK: OutputLine = [{ text: " " }];

function helpLines(dict: Dictionary): OutputLine[] {
  const width = Math.max(...dict.terminal.commands.map((command) => command.name.length));
  return dict.terminal.commands.map((command) => [
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

function stackLines(dict: Dictionary): OutputLine[] {
  const lines: OutputLine[] = [];
  for (const category of dict.stack.categories) {
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
  lines.push([{ text: `  ${dict.terminal.outputs.favoriteNote}`, tone: "muted" }]);
  return lines;
}

function formatPeriod(
  dict: Dictionary,
  start: Parameters<typeof formatYearMonth>[0],
  end: typeof start | null,
) {
  return `${formatYearMonth(start, "short", dict.locale)} → ${end ? formatYearMonth(end, "short", dict.locale) : dict.dates.today}`;
}

function experienceLines(dict: Dictionary): OutputLine[] {
  const lines: OutputLine[] = [];
  for (const exp of dict.experiences) {
    lines.push([{ text: `  ${exp.role}`, tone: "strong" }]);
    lines.push([
      {
        text: `  ${exp.company} · ${formatPeriod(dict, exp.period.start, exp.period.end)}`,
        tone: "muted",
      },
    ]);
    lines.push(BLANK);
  }
  const journey = dict.nav.find((item) => item.id === "parcours");
  lines.push([
    { text: `  ${dict.terminal.outputs.experienceFooter}` },
    { text: journey?.label ?? "Journey", href: "#parcours" },
  ]);
  return lines;
}

function contactLines(dict: Dictionary): OutputLine[] {
  const width = Math.max(
    ...[dict.terminal.outputs.emailLabel, ...externalSocials.map((social) => social.label)].map(
      (l) => l.length,
    ),
  );
  const contact = dict.nav.find((item) => item.id === "contact");
  const lines: OutputLine[] = [
    [
      { text: `  ${dict.terminal.outputs.emailLabel.padEnd(width)}`, tone: "strong" },
      { text: `  ${identity.email}`, href: `mailto:${identity.email}` },
    ],
    ...externalSocials.map((social): OutputLine => [
      { text: `  ${social.label.padEnd(width)}`, tone: "strong" },
      { text: `  ${social.display}`, href: social.href },
    ]),
    BLANK,
    [
      { text: `  ${dict.terminal.outputs.sectionLink}` },
      { text: contact?.label ?? "Contact", href: "#contact" },
    ],
  ];
  return lines;
}

function projectsLines(dict: Dictionary): OutputLine[] {
  const github = externalSocials.find((social) => social.id === "github");
  const lines: OutputLine[] = [text(`  ${dict.terminal.outputs.noProjects}`)];
  if (github) {
    lines.push([
      { text: `  ${dict.terminal.outputs.githubMeanwhile}` },
      { text: github.display, href: github.href },
    ]);
  }
  return lines;
}

function dateLine(dict: Dictionary): OutputLine[] {
  const formatted = new Intl.DateTimeFormat(LOCALE_META[dict.locale].htmlLang, {
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
export function execute(rawInput: string, dict: Dictionary): ExecResult {
  const input = rawInput.trim().replace(/\s+/g, " ");
  if (!input) return { lines: [] };

  const spaceIndex = input.indexOf(" ");
  const command = (spaceIndex === -1 ? input : input.slice(0, spaceIndex)).toLowerCase();
  const args = spaceIndex === -1 ? "" : input.slice(spaceIndex + 1).slice(0, MAX_ARGUMENT_LENGTH);

  const about = dict.nav.find((item) => item.id === "a-propos");

  switch (command) {
    case "help":
      return { lines: helpLines(dict) };
    case "about":
      return {
        lines: [
          text(`  ${dict.about.paragraphs[0]}`),
          [
            { text: `  ${dict.terminal.outputs.sectionLink}` },
            { text: about?.label ?? "About", href: "#a-propos" },
          ],
        ],
      };
    case "projects":
      return { lines: projectsLines(dict) };
    case "stack":
      return { lines: stackLines(dict) };
    case "experience":
      return { lines: experienceLines(dict) };
    case "contact":
      return { lines: contactLines(dict) };
    case "cv":
      return {
        lines: [
          [
            { text: `  ${dict.terminal.outputs.openingCv}` },
            { text: "cv.pdf", href: "/cv.pdf" },
            { text: " …" },
          ],
        ],
        action: "open-cv",
      };
    case "date":
      return { lines: dateLine(dict) };
    case "whoami":
      return {
        lines: [
          [
            { text: `  ${identity.fullName}`, tone: "strong" },
            {
              text:
                ` — ${dict.identity.jobTitle}, ${dict.identity.location.display}. ` +
                `${dict.terminal.outputs.atEmployer} ${identity.employer}.`,
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
      return { lines: [text(`  ${dict.terminal.outputs.sudoDenied}`)] };
    default: {
      // A bare e-mail or URL typed by mistake still gets a helpful answer.
      if (EMAIL_PATTERN.test(command)) {
        return { lines: [text(`  ${dict.terminal.outputs.emailHint}`)] };
      }
      return {
        lines: [text(`  ${format(dict.terminal.outputs.commandNotFound, { command })}`)],
        error: true,
      };
    }
  }
}

/** Welcome block shown when the terminal opens. */
export function getWelcomeLines(dict: Dictionary): OutputLine[] {
  return [
    [{ text: `  ${identity.fullName} — portfolio`, tone: "strong" }],
    [{ text: `  ${dict.terminal.welcome.intro}`, tone: "muted" }],
    text(`  ${dict.terminal.welcome.hint}`),
  ];
}
