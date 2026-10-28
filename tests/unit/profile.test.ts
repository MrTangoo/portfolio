import { describe, expect, it } from "vitest";
import {
  certifications,
  education,
  experiences,
  identity,
  socials,
  stack,
  type Period,
} from "@/content/profile";
import { NAV_ITEMS } from "@/content/site";

/**
 * Guards against accidental content drift: the brief forbids inflated titles
 * and requires every date to be coherent.
 */

const FORBIDDEN_TITLES = ["cto", "tech lead", "senior engineer", "architecte"];

function toMonths({ year, month }: { year: number; month: number }) {
  return year * 12 + month;
}

function isChronological(period: Period) {
  return period.end === null || toMonths(period.end) >= toMonths(period.start);
}

describe("profile content", () => {
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
    const titles = [identity.jobTitle, ...experiences.map((experience) => experience.role)];
    for (const title of titles) {
      for (const forbidden of FORBIDDEN_TITLES) {
        expect(title.toLowerCase()).not.toContain(forbidden);
      }
    }
  });

  it("has exactly one ongoing experience, the current employer", () => {
    const ongoing = experiences.filter((experience) => experience.period.end === null);
    expect(ongoing).toHaveLength(1);
    expect(ongoing[0]?.company).toBe(identity.employer);
  });

  it("keeps every period chronological", () => {
    for (const item of [...experiences, ...education]) {
      expect(isChronological(item.period), item.id).toBe(true);
    }
  });

  it("marks the federal diploma as ongoing, not obtained", () => {
    const iseig = education.find((item) => item.id === "iseig");
    expect(iseig?.status).toBe("ongoing");
  });

  it("does not list GitHub Actions as an obtained certification", () => {
    for (const certification of certifications) {
      expect(certification.name.toLowerCase()).not.toContain("github actions");
    }
  });

  it("does not attribute numeric skill levels", () => {
    for (const category of stack) {
      for (const technology of category.technologies) {
        expect(technology.note ?? "").not.toMatch(/\d+\s?%/);
      }
    }
  });

  it("exposes unique navigation anchors", () => {
    const ids = NAV_ITEMS.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
