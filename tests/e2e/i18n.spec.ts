import { expect, test } from "@playwright/test";

test.describe("Internationalization", () => {
  test("redirects / to the preferred locale", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/fr$/);
  });

  test("honours Accept-Language on the root redirect", async ({ browser }) => {
    const context = await browser.newContext({ locale: "de-CH" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/de$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Präzision");
    await context.close();
  });

  test("switches language from the nav dropdown", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Design with precision.");

    await page.getByRole("button", { name: "Choose language" }).first().click();
    await page.getByRole("menuitem", { name: "Deutsch" }).click();

    await expect(page).toHaveURL(/\/de/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Präzision");
    await expect(page.locator("html")).toHaveAttribute("lang", "de-CH");
  });

  test("exposes hreflang alternates for every locale", async ({ page }) => {
    await page.goto("/fr");
    for (const locale of ["fr", "en", "de", "x-default"]) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${locale}"]`)).toHaveCount(1);
    }
  });
});
