import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
  test("desktop anchors scroll to their sections", async ({ page, isMobile }) => {
    test.skip(isMobile, "Desktop navigation is hidden on small viewports");
    await page.goto("/");

    const nav = page.getByRole("navigation", { name: "Navigation principale" });
    await nav.getByRole("link", { name: "Parcours" }).click();
    await expect(page).toHaveURL(/#parcours$/);
    await expect(page.locator("section#parcours")).toBeInViewport();

    await nav.getByRole("link", { name: "Contact" }).click();
    await expect(page.locator("section#contact")).toBeInViewport();
  });

  test("hero call-to-actions lead to the journey and contact sections", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Découvrir mon parcours" }).click();
    await expect(page.locator("section#parcours")).toBeInViewport();

    await page.goto("/");
    await page.getByRole("link", { name: "Me contacter" }).click();
    await expect(page.locator("section#contact")).toBeInViewport();
  });

  test("mobile menu opens, navigates and closes with Escape", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile navigation is only rendered on small viewports");
    await page.goto("/");

    const toggle = page.getByRole("button", { name: /le menu/ });
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    const menu = page.getByRole("navigation", { name: "Navigation mobile" });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: /À propos/ })).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();

    await toggle.click();
    await menu.getByRole("link", { name: /Certifications/ }).click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("section#certifications")).toBeInViewport();
  });

  test("skip link moves focus to the main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Aller au contenu" });
    await expect(skipLink).toBeFocused();
    await skipLink.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });
});
