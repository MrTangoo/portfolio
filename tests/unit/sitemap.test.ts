import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  const urls = sitemap().map((entry) => entry.url);

  it("lists the home and applications pages in every locale", () => {
    for (const locale of ["fr", "en", "de"]) {
      expect(urls).toContain(`https://maxime-derbigny.ch/${locale}`);
      expect(urls).toContain(`https://maxime-derbigny.ch/${locale}/applications`);
    }
  });

  it("leaves out the noindex legal pages", () => {
    expect(urls.some((url) => url.includes("/legal"))).toBe(false);
  });
});
