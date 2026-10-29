import { describe, expect, it } from "vitest";
import { de } from "@/i18n/dictionaries/de";
import { en } from "@/i18n/dictionaries/en";
import { fr, type Dictionary } from "@/i18n/dictionaries/fr";
import { identity, socials, type Period } from "@/content/profile";

/**
 * Guards against accidental content drift: the brief forbids inflated titles
 * and requires every date to be coherent — checked in every locale.
 */

const FORBIDDEN_TITLES = ["cto", "tech lead", "senior engineer", "architecte"];
const DICTIONARIES: [string, Dictionary][] = [
  ["fr", fr],
  ["en", en],
  ["de", de],
];

function toMonths({ year, month }: { year: number; month: number }) {
  return year * 12 + month;
}

function isChronological(period: Period) {
  return period.end === null || toMonths(period.end) >= toMonths(period.start);
}

describe.each(DICTIONARIES)("profile content (%s)", (_locale, dict) => {
  it("uses the real identity and contact details", () => {
    expect(identity.fullName).toBe("Maxime Derbigny");
    expect(identity.email).toBe("maxime.derbigny@gmail.com");
    expect(socials.find((social) => social.id === "github")?.href).toBe(
      "https://github.com/MrTangoo",
    );
    expect(socials.find((social) => social.id === "linkedin")?.href).toBe(
      "https://www.linkedin.com/in/maxime-derbigny",
    );
  });

  it("never claims a leadership title as the current role", () => {
    const titles = [
      dict.identity.jobTitle,
      ...dict.experiences.map((experience) => experience.role),
    ];
    for (const title of titles) {
      for (const forbidden of FORBIDDEN_TITLES) {
        expect(title.toLowerCase()).not.toContain(forbidden);
      }
    }
  });

  it("has exactly one ongoing experience, the current employer", () => {
    const ongoing = dict.experiences.filter((experience) => experience.period.end === null);
    expect(ongoing).toHaveLength(1);
    expect(ongoing[0]?.company).toBe(identity.employer);
  });

  it("keeps every period chronological", () => {
    for (const item of [...dict.experiences, ...dict.education]) {
      expect(isChronological(item.period), item.id).toBe(true);
    }
  });

  it("marks the federal diploma as ongoing, not obtained", () => {
    const iseig = dict.education.find((item) => item.id === "iseig");
    expect(iseig?.status).toBe("ongoing");
  });

  it("does not list GitHub Actions as an obtained certification", () => {
    for (const certification of dict.certifications.items) {
      expect(certification.name.toLowerCase()).not.toContain("github actions");
    }
  });

  it("does not attribute numeric skill levels", () => {
    for (const category of dict.stack.categories) {
      for (const technology of category.technologies) {
        expect(technology.note ?? "").not.toMatch(/\d+\s?%/);
      }
    }
  });

  it("exposes unique navigation anchors", () => {
    const ids = dict.nav.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
