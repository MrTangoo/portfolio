import { expect, test } from "@playwright/test";

const LOCALES = [
  { locale: "fr", title: "Mentions légales", htmlLang: "fr-CH" },
  { locale: "en", title: "Legal notice", htmlLang: "en" },
  { locale: "de", title: "Impressum", htmlLang: "de-CH" },
] as const;

test.describe("Legal page", () => {
  for (const { locale, title, htmlLang } of LOCALES) {
    test(`renders in ${locale}`, async ({ page }) => {
      await page.goto(`/${locale}/legal`);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(title);
      await expect(page.locator("html")).toHaveAttribute("lang", htmlLang);
      // Every section renders its title.
      await expect(page.getByRole("heading", { level: 2 })).toHaveCount(6);
    });
  }

  test("is reachable from the footer", async ({ page }) => {
    await page.goto("/fr");
    await page.getByRole("contentinfo").getByRole("link", { name: "Mentions légales" }).click();
    await expect(page).toHaveURL(/\/fr\/legal$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Mentions légales");
  });

  test("links back to home sections from the header", async ({ page, isMobile }) => {
    test.skip(isMobile, "Desktop navigation is hidden on small viewports");
    await page.goto("/fr/legal");
    await expect(page.getByRole("link", { name: "Contact" }).first()).toHaveAttribute(
      "href",
      "/fr#contact",
    );
  });

  test("offers a way back to the site", async ({ page }) => {
    await page.goto("/fr/legal");
    await page.getByRole("link", { name: "Retour au site" }).first().click();
    await expect(page).toHaveURL(/\/fr$/);
  });

  test("stays at the top when switching locale", async ({ page }) => {
    await page.goto("/fr/legal");
    await page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }),
    );
    await page.getByRole("button", { name: "Choisir la langue" }).click();
    await page.getByRole("menuitem", { name: "English" }).click();
    await expect(page).toHaveURL(/\/en\/legal$/);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(100);
  });

  test("shows a privacy notice under the contact form", async ({ page }) => {
    await page.goto("/fr");
    const notice = page.locator("#contact-form").getByRole("link", {
      name: "Mentions légales",
    });
    await expect(notice).toHaveAttribute("href", "/fr/legal");
  });
});
