import { describe, expect, it } from "vitest";
import { matchLocale } from "@/i18n/locales";

describe("language negotiation", () => {
  it("uses the highest supported quality value", () => {
    expect(matchLocale("es, de-CH;q=0.9, en;q=0.7")).toBe("de");
  });
  it.each(["de;q=0,en;q=0.5", "de;q=2,en;q=0.5", "de;q=NaN,en;q=0.5"])(
    "ignores excluded or invalid preferences: %s",
    (header) => {
      expect(matchLocale(header)).toBe("en");
    },
  );
  it("falls back to French when no supported language is accepted", () => {
    expect(matchLocale(null)).toBe("fr");
    expect(matchLocale("es, de;q=0")).toBe("fr");
  });
});
