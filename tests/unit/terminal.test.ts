import { describe, expect, it } from "vitest";
import { execute, TERMINAL_COMMAND_NAMES, WELCOME_LINES, type OutputLine } from "@/lib/terminal";
import { experiences, identity, stack } from "@/content/profile";

const toText = (lines: OutputLine[]) =>
  lines.map((line) => line.map((segment) => segment.text).join("")).join("\n");

describe("terminal interpreter", () => {
  it("lists every documented command in help", () => {
    const { lines } = execute("help");
    const text = toText(lines);
    for (const name of TERMINAL_COMMAND_NAMES) {
      expect(text).toContain(name);
    }
  });

  it("exposes a stable allow-list of command names", () => {
    for (const required of [
      "help",
      "about",
      "projects",
      "stack",
      "experience",
      "contact",
      "cv",
      "clear",
      "date",
      "whoami",
      "echo",
      "exit",
    ]) {
      expect(TERMINAL_COMMAND_NAMES).toContain(required);
    }
  });

  it("answers projects without inventing entries and links to GitHub", () => {
    const { lines } = execute("projects");
    const text = toText(lines);
    expect(text).toMatch(/aucun projet/i);
    const hrefs = lines.flat().flatMap((segment) => (segment.href ? [segment.href] : []));
    expect(hrefs).toContain("https://github.com/MrTangoo");
  });

  it("echoes user input back as plain text, markup included", () => {
    const { lines } = execute("echo <img src=x onerror=alert(1)>");
    const text = toText(lines);
    expect(text).toContain("<img src=x onerror=alert(1)>");
    // The payload stays inert: it is a text segment, never a link or HTML.
    expect(lines.flat().every((segment) => !segment.href)).toBe(true);
  });

  it("trims input and collapses whitespace", () => {
    expect(execute("   ").lines).toEqual([]);
    const { lines } = execute("  echo   hello   world  ");
    expect(toText(lines)).toContain("hello world");
  });

  it("reports unknown commands with an error flag", () => {
    const result = execute("rm -rf /");
    expect(result.error).toBe(true);
    expect(toText(result.lines)).toContain("commande introuvable");
  });

  it("maps clear and exit to UI actions without output", () => {
    expect(execute("clear")).toEqual({ lines: [], action: "clear" });
    expect(execute("exit")).toEqual({ lines: [], action: "close" });
  });

  it("points cv at the real PDF and asks the UI to open it", () => {
    const result = execute("cv");
    expect(result.action).toBe("open-cv");
    const hrefs = result.lines.flat().flatMap((s) => (s.href ? [s.href] : []));
    expect(hrefs).toContain("/cv.pdf");
  });

  it("derives contact, stack and experience output from profile data", () => {
    expect(toText(execute("contact").lines)).toContain(identity.email);
    const stackText = toText(execute("stack").lines);
    for (const category of stack) {
      expect(stackText).toContain(category.label);
    }
    const experienceText = toText(execute("experience").lines);
    for (const exp of experiences) {
      expect(experienceText).toContain(exp.company);
    }
  });

  it("prints a localised date and a whoami identity", () => {
    expect(toText(execute("date").lines)).toMatch(/\d{4}/);
    expect(toText(execute("whoami").lines)).toContain(identity.fullName);
  });

  it("shows welcome guidance mentioning help", () => {
    expect(toText(WELCOME_LINES)).toContain("help");
  });
});
