import { expect, test, type Page } from "@playwright/test";

/**
 * The Journey section's pinned scroll timeline (GSAP ScrollTrigger) reshapes
 * the document when it initializes — scenes collapse from a stacked layout to
 * absolute overlays, moving every anchor target below them. Anchor clicks must
 * wait for the `.pin-spacer` wrapper ScrollTrigger creates, or the smooth
 * scroll lands where the section used to be.
 */
async function waitForPinnedJourney(page: Page) {
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
}

test.describe("Navigation", () => {
  test("desktop anchors scroll to their sections", async ({ page, isMobile }) => {
    test.skip(isMobile, "Desktop navigation is hidden on small viewports");
    await page.goto("/fr");
    await waitForPinnedJourney(page);

    const nav = page.getByRole("navigation", { name: "Navigation principale" });
    await nav.getByRole("link", { name: "Parcours" }).click();
    await expect(page).toHaveURL(/#parcours$/);
    await expect(page.locator("section#parcours")).toBeInViewport();

    await nav.getByRole("link", { name: "Contact" }).click();
    await expect(page.locator("section#contact")).toBeInViewport();
  });

  test("hero call-to-actions lead to the journey and contact sections", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/fr");
    // The pin only exists at xl+; the mobile layout never shifts.
    if (!isMobile) await waitForPinnedJourney(page);
    await page.getByRole("link", { name: "Découvrir mon parcours" }).click();
    await expect(page.locator("section#parcours")).toBeInViewport();

    await page.goto("/fr");
    if (!isMobile) await waitForPinnedJourney(page);
    await page.getByRole("link", { name: "Me contacter" }).click();
    await expect(page.locator("section#contact")).toBeInViewport();
  });

  test("mobile menu opens, navigates and closes with Escape", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile navigation is only rendered on small viewports");
    await page.goto("/fr");

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
    await page.goto("/fr");
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Aller au contenu" });
    await expect(skipLink).toBeFocused();
    await skipLink.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });
});
